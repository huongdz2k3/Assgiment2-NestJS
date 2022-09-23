import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches } from 'class-validator'

@InputType()
export class LoginUserInput {
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
}

@InputType()
export class SignupUserInput {
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
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string

}
@InputType()
export class UpdateUserInput {
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

@InputType()
export class UpdatePassInput {
    @IsNotEmpty()
    currentPass: string
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    newPass: string
}

