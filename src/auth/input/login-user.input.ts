import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field({ nullable: true })
    email: string;
    @Field({ nullable: true })
    phone: string
    @Field({ nullable: true })
    username: string
    @Field(() => String, { description: 'password of the user' })
    password: string;
}