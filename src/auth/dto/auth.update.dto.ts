import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
export class UpdateUserDto {
    @IsNotEmpty()
    @MaxLength(10)
    username: string
    @IsNotEmpty()
    @MaxLength(10)
    firstName: string
    @IsNotEmpty()
    @MaxLength(10)
    lastName: string
    @IsEmail()
    email: string
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    phone: string
}