import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { PetQL } from "src/pet/pet.schema";
import { UserQL } from "src/user/user.schema";

@ObjectType()
export class OrderOutputQL {
    @Field()
    id: string
    @Field()
    status: string
    @Field(type => UserQL)
    User: UserQL
    @Field()
    shipDate: string
    @Field(type => [PetQL])
    ListPets: PetQL[]
    @Field(type => Int)
    total: number

}