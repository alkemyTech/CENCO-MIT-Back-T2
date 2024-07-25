import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Role } from '../entities';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  rut: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEnum(Role, { groups: [Role.ADMIN, Role.USER] })
  role: Role;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
