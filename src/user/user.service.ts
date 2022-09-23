import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignupUserInput } from "src/auth/input/signup-user.input";
import { User } from "./model/users.model";
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from "src/auth/input/updateuser.input";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findUserByEmailOrPhoneOrUsername(
        email: string,
        phone: string,
        username: string
    ) {
        const cond: any = {
            $or: [{ email }, { phone }, { username }]
        }
        return await this.userModel.findOne(cond).lean().exec()
    }

    async findUserById(uid: string) {
        return await this.userModel.findById(uid)
    }



    async create(singupUserInput: SignupUserInput) {
        return await this.userModel.create(singupUserInput)
    }

    async updateRefreshTokenHashed(uid: string, refreshToken: string) {
        return await this.userModel.findByIdAndUpdate(uid, {
            refreshToken: await bcrypt.hash(refreshToken, 12)
        })
    }

    async findUserByUsername(username: string) {
        const user = await this.userModel.findOne({ username: username })
        if (!user) {
            throw new BadRequestException('User does not exist')
        }
        return user
    }

    async logout(id: string) {
        await this.userModel.findOneAndUpdate({ _id: id }, { refreshToken: "" })
        return true
    }
    async updateUser(updateUserInput: UpdateUserInput, id: string) {

        return await this.userModel.findOneAndUpdate({ _id: id }, updateUserInput)
    }
    async deleteMe(id: string) {
        await this.logout(id)
        return await this.userModel.findOneAndUpdate({ _id: id }, { status: false })
    }
}