import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from 'common-modules';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;
}
