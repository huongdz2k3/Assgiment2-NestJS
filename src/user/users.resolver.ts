import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { LoginUserInput } from "src/auth/input/login-user.input";
import { SignupUserInput } from "src/auth/input/signup-user.input";
import { UpdatePassInput } from "src/auth/input/updatepass.input";
import { UpdateUserInput } from "src/auth/input/updateuser.input";
import { LoggedUserOutput } from "src/auth/output/logged-user.output";
import { CurrentUser } from "./user.decorator.graphql";
import { UserQL } from "./user.schema";
import { User } from "./users.model";
@Resolver(of => UserQL)
export class UserResolver {
    constructor(private authService: AuthService) { }
    @Mutation(() => LoggedUserOutput)
    async loginUser(@Args('LoginUserInput') loginUserInput: LoginUserInput) {
        const user = await this.authService.login(loginUserInput)
        return this.authService.createToken(user)
    }
    @Mutation(() => LoggedUserOutput)
    async signupUser(@Args('SignupUserInput') singupUserInput: SignupUserInput) {
        return await this.authService.createToken(this.authService.signup(singupUserInput))
    }
    @UseGuards(JwtAuthGuard)
    @Query(() => UserQL)
    findUser(@Args('FindUserInput') username: string) {
        return this.authService.findUser(username)
    }

    @Mutation(() => UserQL)
    @UseGuards(JwtAuthGuard)
    updatePass(@Args('UpdatePassInput') updatePassInput: UpdatePassInput, @CurrentUser() user: string) {
        return this.authService.updatePass(updatePassInput.oldPass, updatePassInput.newPass, user)
    }

    @Mutation(() => UserQL)
    @UseGuards(JwtAuthGuard)
    updateUser(@Args('UpdateUserInput') updateUserInput: UpdateUserInput, @CurrentUser() username: string) {
        return this.authService.updateUser(updateUserInput, username)
    }
    @Mutation(() => UserQL)
    @UseGuards(JwtAuthGuard)
    deleteMe(@CurrentUser() username: string) {
        return this.authService.deleteMe(username)
    }

}