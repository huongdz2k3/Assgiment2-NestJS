import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Roles } from "src/user/decorators/roles.decorator";
import { CurrentUser } from "src/user/decorators/user.decorator.graphql";
import { Role } from "src/user/role/role.enum";
import { BuyPetInput } from "./input/order.input";
import { Order } from "./order.model";

import { OrderService } from "./order.service";
import { OrderOutputQL } from "./output/order.output";

@Resolver(of => Order)
export class OrderResolver {
    constructor(private orderService: OrderService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Customer)
    @Mutation(() => Order)
    updateOrder(@Args('id') id: string, @Args('status') status: string) {
        return this.orderService.updateOrder(id, status)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Customer)
    @Mutation(() => Order)
    buyPet(@Args('BuyPetInput') buyPetInput: BuyPetInput, @CurrentUser() user: any) {
        const { petId, shipDate } = buyPetInput
        const username = user.username
        const userId = user.id
        return this.orderService.buyPet(petId, username, shipDate, userId)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Customer)
    @Mutation(() => Boolean)
    deleteOrder(@Args('id') id: string) {
        return this.orderService.deleteOrder(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Customer)
    @Query(() => Order)
    getOrder(@Args('id') id: string) {
        return this.orderService.getOrder(id)
    }


}