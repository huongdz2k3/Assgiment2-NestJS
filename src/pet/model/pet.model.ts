import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

export type PetDocument = Pet & Document
@Schema()
@ObjectType()
export class Pet {
    @Field(() => String)
    id: ObjectId | string;
    @Field()
    @Prop()
    category: string
    @Field()
    @Prop()
    name: string
    @Field()
    @Prop()
    status: boolean
    @Field()
    @Prop()
    tags: string
    @Prop({ default: '' })
    img: string
    @Field()
    @Prop()
    price: number
}

const PetSchema = SchemaFactory.createForClass(Pet)
export { PetSchema }