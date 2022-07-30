import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignupUserInput {
    @Field()
    username: string
    @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    email: string
    @Field()
    phone: string
    @Field()
    password: string

}