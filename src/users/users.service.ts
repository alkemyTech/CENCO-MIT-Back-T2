import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, PartialUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { UUID, randomUUID } from 'crypto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly rounds: number = parseInt(process.env.SALT_ROUNDS!);
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = { id: randomUUID(), ...createUserDto };
      const salt = await genSalt(this.rounds);
      const hashed = await hash(user.password!, salt);
      user.password = hashed;
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      delete user.password;
      this.logger.log('User successfully created');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      // TO DO
      this.logger.log('Returned all users');
      return `This action returns all users`;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findOne(id: UUID) {
    try {
      // TO DO
      this.logger.log('Returned found user');
      return `This action returns a #${id} user`;
    } catch (err) {
      this.logger.error(err);
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

  async update(id: UUID, updateUserDto: PartialUserDto) {
    try {
      // TO DO
      this.logger.log('User successfully updated');
      return `This action updates a #${id} user`;
    } catch (err) {
      this.logger.error(err);
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
      this.logger.error(err);
      throw err;
    }
  }
}
