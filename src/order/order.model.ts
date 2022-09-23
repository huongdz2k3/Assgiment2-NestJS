import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Pet } from "src/pet/model/pet.model";
import { User } from "src/user/model/users.model";
export type OrderDocument = Order & Document
@Schema({
    toJSON: {
        virtuals: true,
    }
})
@ObjectType()
export class Order {
    @Field()
    _id: string

    @Prop({
        type: String,
        default: 'placed',
        enum: ['placed', 'approved', 'delivered', 'purchased']
    })
    @Field()
    status: string
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    userId: ObjectId | string

    @Field(() => User)
    user: User

    @Prop()
    @Field()
    shipDate: string

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId || String,
            ref: 'Pet'
        }]
    })

    listPetIds: { pet: string }[]

    @Field(() => [Pet])
    listPets: Pet[]

    @Field()
    total: number
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