import {IsString, IsNumber, IsEnum, Max, Min, IsEmail, IsNotEmpty, MaxLength, MinLength, IsPositive} from "class-validator"
import { Roles } from "../types/roles.enum"
export class RegisterDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MaxLength(30)
    @MinLength(5)
    password: string

    @MaxLength(30)
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    fullname: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Max(120)
    @Min(1)
    age: number

    @IsEnum(Roles)
    role: Roles
}