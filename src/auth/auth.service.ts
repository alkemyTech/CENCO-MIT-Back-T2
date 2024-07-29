import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, PartialUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async login(user: PartialUserDto) {
    try {
      if (!user.password || !user.email) {
        throw new BadRequestException('Email and password are required');
      }
      const foundUser = await this.usersService.findByEmail(user.email);
      const isPasswordValid = await bcrypt.compare(
        user.password,
        foundUser.password,
      );
      if (!isPasswordValid) {
        throw new ForbiddenException('Invalid credentials');
      }
      this.logger.log(`User successfully logged in`);
      return {
        message: 'Login successful',
        token: this.jwt.sign(
          {
            id: foundUser.id,
            role: foundUser.role,
            name: foundUser.name,
            surname: foundUser.surname,
            country: foundUser.country,
          },
          {
            secret: process.env.JWT_SECRET,
          },
        ),
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  validateToken(token: string) {
    return this.jwt.verify(token, { secret: process.env.JWT_SECRET });
  }
}
