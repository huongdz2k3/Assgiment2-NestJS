import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class PetQL {
    @Field(() => String)
    _id: ObjectId | string;
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