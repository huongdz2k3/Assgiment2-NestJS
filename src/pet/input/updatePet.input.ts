import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdatePetInput {
    @Field()
    category: string
    @Field({ nullable: true })
    name: string
    @Field()
    status: boolean
    @Field()
    tags: string
    @Field({ nullable: true })
    img: string
    @Field()
    price: number
}