import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsStrongPassword,
  Length,
  Matches,
  Validate,
  IsNumber,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Role } from '../entities';
import { IsUnique } from 'src/auth/decorators/is-unique';

export class CreateUserDto {
  @Matches(/([1-9]{1}[0-9]{6,7}-[0-9|K]{1})/gim, {
    message:
      'Rut must have 7 or 8 digits followed by an hyphen and one verification character (0 to 9, or K)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 10)
  @Validate(IsUnique, ['user', 'rut'])
  rut: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  @Validate(IsUnique, ['user', 'email'])
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000000000)
  @Max(999999999999)
  phone: number;

  @IsNotEmpty()
  @IsEnum(Role, { groups: [Role.ADMIN, Role.USER] })
  role: Role;
}

export class NewPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  newPassword: string;
}
