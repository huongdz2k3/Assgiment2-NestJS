import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { Pet } from "src/pet/model/pet.model";

import { User } from "src/user/model/users.model";


@ObjectType()
export class OrderOutputQL {
    @Field()
    id: string
    @Field()
    status: string
    @Field(type => User)
    User: User
    @Field()
    shipDate: string
    @Field(type => [Pet])
    ListPets: Pet[]
    @Field(type => Int)
    total: number

}