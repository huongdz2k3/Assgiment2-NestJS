import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class SignupUserInput {
    @Field()
    username: string
    @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    @IsEmail()
    email: string
    @Field()
    phone: string
    @Field()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/, { message: 'password too weak' })
    password: string

}