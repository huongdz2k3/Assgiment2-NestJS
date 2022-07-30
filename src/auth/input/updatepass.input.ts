import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePassInput {
    @Field(() => String)
    oldPass: string
    @Field(() => String)
    newPass: string;
}