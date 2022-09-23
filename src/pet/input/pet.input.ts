import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreatePetInput {
    @Field()
    @IsNotEmpty()
    category: string
    @Field({ nullable: true })
    name: string
    @Field()
    @IsNotEmpty()
    status: boolean
    @Field()
    @IsNotEmpty()
    tags: string
    @Field({ nullable: true })
    img: string
    @Field()
    @IsNotEmpty()
    price: number
}

@InputType()
export class UpdatePetInput {
    @Field({ nullable: true })
    category: string
    @Field({ nullable: true })
    name: string
    @Field({ nullable: true })
    status: boolean
    @Field({ nullable: true })
    tags: string
    @Field({ nullable: true })
    img: string
    @Field({ nullable: true })
    price: number
}