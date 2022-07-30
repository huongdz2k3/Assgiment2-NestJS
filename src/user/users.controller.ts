import { Body, Controller, Get, Post, Request, UseGuards, Response, Param, Patch } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { SignupUserDto } from "src/auth/dto/auth.signup.dto";
import { UpdateUserDto } from "src/auth/dto/auth.update.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/guard/local-auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly authService: AuthService) { }

    // @Post('signup')
    // signup(@Body() signupUserDto: SignupUserDto) {
    //     return this.authService.createToken(this.authService.signup(signupUserDto))
    // }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() request) {
        return this.authService.createToken(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('updatePass')
    updatePass(@Request() req, @Body('oldPass') oldPass, @Body('newPass') newPass) {
        const username = req.user.username
        return this.authService.updatePass(oldPass, newPass, username)
    }
    @UseGuards(JwtAuthGuard)
    @Get('findUser')
    findUser(@Body('username') username) {
        return this.authService.findUser(username)
    }
    @UseGuards(JwtAuthGuard)
    @Patch('updateUser')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
        return this.authService.updateUser(updateUserDto, req.user.username)
    }

}