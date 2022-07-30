import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Pet } from "src/pet/model/pet.model";
import { User } from "src/user/users.model";
import { Order } from "./order.model";

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private OrderModel: Model<Order>,
        @InjectModel('User') private UserModel: Model<User>,
        @InjectModel('Pet') private PetModel: Model<Pet>) { }
    async buyPet(id: string, username: string, shipDate: string) {
        console.log(username)
        const currentUser = await this.UserModel.findOne({ username: username })
        const order = await this.OrderModel.findOne({ user: currentUser.id })
        const pet = await this.PetModel.findById(id)
        if (!pet) {
            return new BadRequestException('This pet does not exist')
        }
        if (!order) {
            const newOrder = await this.OrderModel.create({
                user: currentUser._id,
                listPets: id,
                shipDate: shipDate
            })
            pet.status = false
            await pet.save()
            return newOrder
        }
        else {
            order.listPets.push(pet.id)
            pet.status = false
            await order.save()
            await pet.save()
            return order
        }
    }
    async getOrder(id: string) {
        const order = (await this.OrderModel.findById(id))
        const user = await this.UserModel.findById(order.user)
        console.log(user)
        const listPets = await Promise.all(order.listPets.map(el => this.PetModel.findById(el)))
        let price = 0
        for (let i = 0; i < listPets.length; i++) price += listPets[i].price
        const orderQL = {
            id: order.id,
            status: order.status,
            User: user,
            shipDate: order.shipDate,
            ListPets: listPets,
            total: price
        }
        return orderQL
    }
    async updateOrder(id: string, status: string) {
        const order = await this.OrderModel.findById(id)
        if (!order) {
            return new BadRequestException('Id is not exist')
        }
        if (order.status === 'approved' || order.status === 'delivered') {
            return new BadRequestException('You can not update this order')
        }
        order.status = status
        order.save()
        return order
    }
    async deleteOrder(id: string) {
        return await this.OrderModel.findByIdAndDelete(id)
    }
}