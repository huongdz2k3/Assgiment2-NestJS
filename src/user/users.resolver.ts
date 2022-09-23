import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { LoginUserInput } from "src/auth/input/login-user.input";
import { SignupUserInput } from "src/auth/input/signup-user.input";
import { UpdatePassInput } from "src/auth/input/updatepass.input";
import { UpdateUserInput } from "src/auth/input/updateuser.input";
import { LoggedUserOutput } from "src/auth/output/logged-user.output";
import { CurrentUser } from "./decorators/user.decorator.graphql";

import { User } from "./model/users.model";
import { JWT } from "src/auth/dto/auth.dto";
import { UserService } from "./user.service";
@Resolver(of => User)
export class UserResolver {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }
    @Mutation(() => JWT)
    async login(@Args('LoginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.login(loginUserInput)
    }

    @Mutation(() => JWT)
    async signup(@Args('SignupUserInput') singupUserInput: SignupUserInput) {
        return await this.authService.signup(singupUserInput)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User)
    async findUser(@Args('Username') username: string) {
        return await this.userService.findUserByUsername(username)
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    updatePass(@Args('UpdatePassInput') updatePassInput: UpdatePassInput, @CurrentUser() user: any) {
        const { username, id } = user
        return this.authService.updatePass(updatePassInput, id)
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    updateUser(@Args('UpdateUserInput') updateUserInput: UpdateUserInput, @CurrentUser() user: any) {
        const { username, id } = user
        return this.userService.updateUser(updateUserInput, id)
    }
    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    deleteMe(@CurrentUser() user: any) {
        const { username, id } = user
        return this.userService.deleteMe(id)
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    logout(@CurrentUser() user: any) {
        const { username, id } = user
        return this.userService.logout(id)
    }

}