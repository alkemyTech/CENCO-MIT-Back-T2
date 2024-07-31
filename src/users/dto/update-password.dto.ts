import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto, NewPasswordDto, PartialUserDto } from './';

export class UpdatePasswordDto extends IntersectionType(
  PickType(PartialUserDto, ['password'] as const),
  NewPasswordDto,
) {}
