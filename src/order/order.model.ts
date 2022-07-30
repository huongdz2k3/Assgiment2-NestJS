import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Pet } from "src/pet/model/pet.model";
export type OrderDocument = Order & Document
@Schema({
    toJSON: {
        virtuals: true,
    }
})

export class Order {
    @Prop({
        type: String,
        default: 'placed',
        enum: ['placed', 'approved', 'delivered']
    })
    status: string
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: ObjectId | string
    @Prop()
    shipDate: string
    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId || String,
            ref: 'Pet'
        }]
    })
    listPets: { pet: string }[]
}

const orderSchema = SchemaFactory.createForClass(Order)

orderSchema.virtual('User', {
    ref: 'User',
    foreignField: '_id',
    localField: 'user'
})

orderSchema.virtual('ListPets', {
    ref: 'Pet',
    foreignField: '_id',
    localField: 'listPets'
})

export { orderSchema }