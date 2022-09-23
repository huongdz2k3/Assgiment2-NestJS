import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt'
import { Field, ID, ObjectType } from "@nestjs/graphql";
export type UserDocument = User & Document

@Schema()
@ObjectType()
export class User {
    @Field((type) => ID)
    _id: string

    @Prop()
    @Field()
    username: string

    @Prop()
    @Field()
    firstName: string

    @Prop()
    @Field()
    lastName: string

    @Field()
    @Prop()
    email: string

    @Field()
    @Prop()
    password: string

    @Field({ nullable: true })
    @Prop()
    phone: string

    @Field()
    @Prop({ default: true })
    status: boolean

    @Prop(String)
    @Field(() => String, {
        nullable: true,
    })
    facebookId?: string;

    @Prop({ default: "customer" })
    @Field()
    role: string

    @Prop({ default: "" })
    @Field()
    refreshToken: string
}


const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

export { UserSchema }

