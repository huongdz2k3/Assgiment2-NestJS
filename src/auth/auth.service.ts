import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/users.model";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { SignupUserDto } from "./dto/auth.signup.dto";
import { UpdateUserDto } from "./dto/auth.update.dto";
import { LoginUserInput } from "./input/login-user.input";
import { SignupUserInput } from "./input/signup-user.input";
import { UpdatePassInput } from "./input/updatepass.input";
import { UpdateUserInput } from "./input/updateuser.input";

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService) { }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.userModel.findOne({ email: loginUserInput.email })
        const check = await bcrypt.compare(loginUserInput.password, user.password)
        if (!user || !check) {
            return null
        }
        return user
    }

    async signup(singupUserInput: SignupUserInput): Promise<any> {
        const newUser = await this.userModel.create(singupUserInput)
        return newUser
    }

    async createToken(user: any) {
        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async updatePass(oldPass: string, newPass: string, username: string) {
        const user = await this.userModel.findOne({ username: username })
        const check = await bcrypt.compare(oldPass, user.password)
        if (!check) {
            throw new BadRequestException('Invalid Password')
        }
        user.password = newPass
        await user.save()
        return user
    }
    async findUser(username: string) {
        const user = await this.userModel.findOne({ username: username })
        if (!user) {
            throw new BadRequestException('User does not exist')
        }
        return user
    }
    async updateUser(updateUserInput: UpdateUserInput, username: string) {
        const currentUser = await this.userModel.findOne({ username: username })
        await currentUser.update(updateUserInput)
        return currentUser
    }
    async deleteMe(username: string) {
        const currentUser = await this.userModel.findOne({ username: username })
        currentUser.status = false
        await currentUser.save()
        return currentUser
    }
}