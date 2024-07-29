import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto, NewPasswordDto } from './';

export class UpdatePasswordDto extends IntersectionType(
  PickType(CreateUserDto, ['password'] as const),
  NewPasswordDto,
) {}
