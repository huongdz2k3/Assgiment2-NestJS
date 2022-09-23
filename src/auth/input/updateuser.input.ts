import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    username: string
    @Field({ nullable: true })
    firstName: string
    @Field({ nullable: true })
    lastName: string
    @Field({ nullable: true })
    email: string
    @Field({ nullable: true })
    phone: string
}