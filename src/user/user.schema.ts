import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class UserQL {
    @Field(() => String)
    _id: ObjectId | string;
    @Field()
    username: string
    @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    email: string
    @Field()
    password: string
    @Field()
    phone: string
    @Field({ nullable: true })
    status: boolean
}