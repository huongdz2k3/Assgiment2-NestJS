import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
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
}