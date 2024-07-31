import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  PartialUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository, Like } from 'typeorm';
import { UUID, randomUUID } from 'node:crypto';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly rounds: number = parseInt(process.env.SALT_ROUNDS!);
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!this.validateRut(createUserDto.rut)) {
      throw new BadRequestException('Rut must be a valid chilean rut');
    }
    try {
      const user: User = { id: randomUUID(), ...createUserDto };
      const salt = await genSalt(this.rounds);
      const hashed = await hash(user.password!, salt);
      user.password = hashed;
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      this.logger.log('User successfully created');
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async findAll(search?: string) {
    let users: User[];
    try {
      if (search) {
        const filters = {
          where: [
            { name: Like(`%${search}%`) },
            { surname: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
            { country: Like(`%${search}%`) },
          ],
        }
        users = await this.usersRepository.find(filters);
      } else {
        users = await this.usersRepository.find();
      }
      this.logger.log('Returned all users found');
      return users;
    } catch (err) {
      throw err;
    }
  }

  async findByCountry(country: string) {
    try {
      const user = await this.usersRepository.find({ where: { country: Like(`%${country}%`)}});
      if (!user) throw new NotFoundException('User not found');
      this.logger.log('Returned all users found');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: UUID) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      this.logger.log('Returned user found');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getInfo(id: UUID, user: PartialUserDto) {
    if (user.id !== id) {
      throw new ForbiddenException(
        'Forbidden resource, users can only see their own information',
      );
    }
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      this.logger.log('Returned user information');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updatePassword(id: UUID, updatePassword: UpdatePasswordDto) {
    try {
      const user = await this.findOne(id);
      const isPasswordValid = await compare(
        updatePassword.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new ForbiddenException('Invalid credentials');
      }
      if (updatePassword.newPassword) {
        const salt = await genSalt(this.rounds);
        const hashed = await hash(updatePassword.newPassword!, salt);
        user.password = hashed;
      }
      this.usersRepository.merge({ ...user, ...updatePassword });
      this.logger.log('Password successfully updated');
      return this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (updateUserDto.name) {
        user.name = updateUserDto.name;
      }
      if (updateUserDto.email) {
        user.email = updateUserDto.email;
      }
      this.usersRepository.merge({ ...user, ...updateUserDto });
      this.logger.log('User successfully updated');
      return this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: UUID) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException('User not found');
      const res = await this.usersRepository.softDelete(id);
      const isUserDeleted = res.affected > 0;
      const message = isUserDeleted
        ? 'User successfully deleted'
        : 'Error deleting user';
      if (!isUserDeleted) throw new InternalServerErrorException(message);
      this.logger.log(message);
      return { message };
    } catch (err) {
      throw err;
    }
  }

  validateRut(rut: string) {
    if (!/([1-9]{1}[0-9]{6,7}-[0-9|K]{1})/gim.test(rut)) return false;
    const series = [2, 3, 4, 5, 6, 7];
    let charToValidate = rut.substring(rut.length - 1);
    if (isNaN(+charToValidate)) {
      charToValidate = charToValidate.toLocaleUpperCase();
    }
    const totalSum = rut
      .substring(0, rut.length - 2)
      .split('')
      .reverse()
      .map(
        (digit, index) =>
          parseInt(digit) * series[index <= 5 ? index : index - 6],
      )
      .reduce((acc, cur) => acc + cur, 0);
    const truncatedSum = Math.trunc(totalSum / 11) * 11;
    const finalNumber = 11 - (totalSum - truncatedSum);
    const resultChar =
      finalNumber >= 11
        ? '0'
        : finalNumber === 10
          ? 'K'
          : finalNumber.toString();
    return resultChar === charToValidate;
  }
}
