import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, PartialUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { UUID, randomUUID } from 'crypto';
import { genSalt, hash } from 'bcrypt';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private readonly rounds: number = parseInt(process.env.SALT_ROUNDS!);

  async create(createUserDto: CreateUserDto) {
    const user: User = { id: randomUUID(), ...createUserDto };
    try {
      const salt = await genSalt(this.rounds);
      const hashed = await hash(user.password!, salt);
      user.password = hashed;
      const newUser = this.usersRepository.create(user);
      this.usersRepository.save(newUser);
      delete user.password;
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: number, updateUserDto: PartialUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: UUID) {
    try {
      const res = await this.usersRepository.softDelete(id);
      const message =
        res.affected > 0 ? 'User deleted successfully' : 'Error deleting user';
      return { message };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
