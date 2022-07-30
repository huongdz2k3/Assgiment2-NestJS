import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PetDocument = Pet & Document
@Schema()
export class Pet {
    @Prop()
    category: string
    @Prop()
    name: string
    @Prop()
    status: boolean
    @Prop()
    tags: string
    @Prop({ default: '' })
    img: string
    @Prop()
    price: number
}

const PetSchema = SchemaFactory.createForClass(Pet)
export { PetSchema }