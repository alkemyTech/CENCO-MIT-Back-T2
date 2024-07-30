import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'node:crypto';

export class PartialUserDto extends PartialType(CreateUserDto) {
  id?: UUID;
}
