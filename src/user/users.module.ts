import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./users.controller";
import { UserSchema } from "./users.model";
import { UserResolver } from "./users.resolver";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), AuthModule],
    controllers: [UserController],
    providers: [UserResolver]
})
export class UserModule { }