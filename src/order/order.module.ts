import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PetSchema } from "src/pet/model/pet.model";
import { UserSchema } from "src/user/users.model";

import { orderSchema } from "./order.model";
import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }]), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }])],
    providers: [OrderResolver, OrderService]
})

export class OrderModule { }