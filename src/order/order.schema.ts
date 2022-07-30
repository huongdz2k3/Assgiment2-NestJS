import { Field, ObjectType } from "@nestjs/graphql";
import mongoose, { ObjectId } from "mongoose";
import { PetQL } from "src/pet/pet.schema";

@ObjectType()
export class OrderQL {
    @Field()
    id: string
    @Field()
    status: string
    @Field(type => String)
    user: ObjectId
    @Field()
    shipDate: string
    @Field(type => [PetQL])
    listPets: PetQL[]
}