import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CurrentUser } from "src/user/user.decorator.graphql";
import { OrderQL } from "./order.schema";
import { OrderService } from "./order.service";
import { OrderOutputQL } from "./output/order.output";

@Resolver(of => OrderQL)
export class OrderResolver {
    constructor(private orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => OrderQL)
    updateOrder(@Args('id') id: string, @Args('status') status: string) {
        return this.orderService.updateOrder(id, status)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => OrderQL)
    buyPet(@Args('id') id: string, @CurrentUser() username: string, @Args('shipDate') shipDate: string) {
        return this.orderService.buyPet(id, username, shipDate)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(() => OrderQL)
    deleteOrder(@Args('id') id: string) {
        return this.orderService.deleteOrder(id)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => OrderOutputQL)
    getOrder(@Args('id') id: string) {
        return this.orderService.getOrder(id)
    }


}