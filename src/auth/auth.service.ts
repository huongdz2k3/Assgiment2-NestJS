import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/model/users.model";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { LoginUserInput } from "./input/login-user.input";
import { SignupUserInput } from "./input/signup-user.input";
import { UpdatePassInput } from "./input/updatepass.input";
import { UpdateUserInput } from "./input/updateuser.input";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.userService.findUserByEmailOrPhoneOrUsername(loginUserInput.email, loginUserInput.phone, loginUserInput.username)
        if (!user) {
            throw new BadRequestException('User not exist')
        }
        const check = await bcrypt.compare(loginUserInput.password, user.password)
        if (!check) {
            throw new BadRequestException('Password is invalid')
        }
        const [token, refreshToken] = [this.createToken(user), this.createRefreshToken(user)]
        user.status = true
        await Promise.all([this.userService.updateRefreshTokenHashed(user._id, refreshToken)])
        return {
            token,
            refreshToken,
            jwtPayload: {
                _id: user._id,
                user: user
            }
        }
    }

    async signup(singupUserInput: SignupUserInput): Promise<any> {
        const user = await this.userService.findUserByEmailOrPhoneOrUsername(singupUserInput.email, singupUserInput.phone, singupUserInput.username)
        if (user) {
            throw new BadRequestException('Email or phone or username have already used')
        }
        const createUser = await this.userService.create(singupUserInput)
        const [token, refreshToken] = [this.createToken(createUser), this.createRefreshToken(createUser)]
        await this.userService.updateRefreshTokenHashed(createUser._id, refreshToken)
        return {
            token,
            refreshToken,
            jwtPayload: {
                _id: createUser._id,
                user: createUser
            }
        }
    }

    createToken(user: any) {
        const payload = { username: user.username, id: user._id, roles: user.role };
        return this.jwtService.sign(payload, {
            privateKey: jwtConstants.secret,
            expiresIn: 5 * 60
        })
    }
    createRefreshToken(user: any) {
        const payload = { username: user.username, id: user._id, roles: user.role };
        return this.jwtService.sign(payload, {
            privateKey: jwtConstants.secret,
            expiresIn: 30 * 24 * 3660
        })
    }

    async updatePass(updatePassInput: UpdatePassInput, id: string) {
        const { oldPass, newPass } = updatePassInput
        const user = await this.userService.findUserById(id)
        const check = await bcrypt.compare(oldPass, user.password)
        if (!check) {
            throw new BadRequestException('Invalid Password')
        }
        user.password = newPass
        await user.save()
        return user
    }




}