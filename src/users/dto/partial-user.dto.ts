import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './';
import { UUID } from 'node:crypto';
import { IsEmail, IsString } from 'class-validator';

export class PartialUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'rut', 'password']),
) {
  id?: UUID;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
