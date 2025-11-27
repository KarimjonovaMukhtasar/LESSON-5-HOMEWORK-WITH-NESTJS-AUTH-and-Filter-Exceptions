import {IsString, IsNumber, IsMobilePhone, Max, Min, IsEmail, IsNotEmpty, MaxLength, MinLength, IsPositive} from "class-validator"
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
}