import { MiddlewareBuilder } from '@nestjs/core';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsEnum
} from 'class-validator';
import { Roles } from 'src/modules/auth/types/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(120)
  @Min(1)
  age: number;


  @IsEnum(Roles)
  role: Roles
}
