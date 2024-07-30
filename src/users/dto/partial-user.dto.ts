import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './';
import { UUID } from 'node:crypto';
import { IsEmail } from 'class-validator';

export class PartialUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'rut']),
) {
  id?: UUID;

  @IsEmail()
  email: string;
}
