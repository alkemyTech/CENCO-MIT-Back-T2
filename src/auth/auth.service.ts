import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password)
      throw new BadRequestException('Invalid user data');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');
    return {
      message: 'Login successful',
      token: this.jwt.sign(
        {
          id: user.id,
          role: user.role,
          name: user.name,
          surname: user.surname,
          country: user.country
        },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }

  validateToken(token: string) {
    return this.jwt.verify(token, { secret: process.env.JWT_SECRET });
  }
}
