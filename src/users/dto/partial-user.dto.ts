import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './';

export class PartialUserDto extends PartialType(CreateUserDto) {}
