import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt'
export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    username: string
    @Prop()
    firstName: string
    @Prop()
    lastName: string
    @Prop()
    email: string
    @Prop()
    password: string
    @Prop()
    phone: string
    @Prop()
    status: boolean
}


const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

export { UserSchema }

