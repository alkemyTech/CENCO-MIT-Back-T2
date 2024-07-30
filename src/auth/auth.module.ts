import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';
import { IsUnique } from './decorators/is-unique';

@Module({
  imports: [JwtModule.register({
    signOptions: { expiresIn: '15m' },
  }),
  TypeOrmModule.forFeature([User])
],
  controllers: [AuthController],
  providers: [AuthService, UsersService, IsUnique]
})
export class AuthModule {}
