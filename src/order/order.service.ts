import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Pet } from "src/pet/model/pet.model";
import { User } from "src/user/model/users.model";
import { Order } from "./order.model";

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private OrderModel: Model<Order>,
        @InjectModel('User') private UserModel: Model<User>,
        @InjectModel('Pet') private PetModel: Model<Pet>) { }
    caculate(price, quantity) {
        let tax = 0
        if (quantity === 1) tax = 0.1
        else if (quantity > 1 && quantity <= 5) tax = 0.08
        else if (quantity > 5 && quantity <= 10) tax = 0.05
        else if (quantity > 10) {
            price -= price * 0.05
            tax = 0.1
        }
        return price + price * tax
    }
    async buyPet(petId: string, username: string, shipDate: string, userId) {
        const currentUser = await this.UserModel.findOne({ _id: userId })
        const [order, pet] = await Promise.all([this.OrderModel.findOne({ user: currentUser._id }), this.PetModel.findById(petId)])
        if (!pet || pet.status === false) {
            return new BadRequestException('This pet does not exist')
        }
        if (!order) {
            const newOrder = await this.OrderModel.create({
                userId: currentUser._id,
                listPetIds: petId,
                shipDate: shipDate
            })
            pet.status = false
            await pet.save()
            return await this.getOrder(newOrder.id)
        }
        else {
            if (shipDate) {
                await this.OrderModel.findByIdAndUpdate(order.id, { shipDate })
            }
            order.listPetIds.push(pet.id)
            pet.status = false
            await order.save()
            await pet.save()
            return await this.getOrder(order.id)
        }
    }
    async getOrder(id: string) {
        const order = (await this.OrderModel.findById(id))
        const user = await this.UserModel.findById(order.userId)
        const listPets = await Promise.all(order.listPetIds.map(pet => this.PetModel.findById(pet)))
        let price = 0
        for (let i = 0; i < listPets.length; i++) price += listPets[i].price
        price = this.caculate(price, listPets.length)
        const Order = {
            _id: order.id,
            status: order.status,
            user: user,
            shipDate: order.shipDate,
            listPets: listPets,
            total: price
        }
        return Order
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
        await order.save()
        return await this.getOrder(id)
    }
    async deleteOrder(id: string) {
        const order = await this.OrderModel.findById(id)
        if (!order) {
            throw new BadRequestException('Id is not exist')
        }
        if (order.status === 'approved' || order.status === 'delivered') {
            throw new BadRequestException('You can not delete this order')
        }
        await this.OrderModel.findByIdAndDelete(id)
        return true
    }
}