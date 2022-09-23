import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";

import { UserSchema } from "./model/users.model";
import { UserService } from "./user.service";
import { UserResolver } from "./users.resolver";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        forwardRef(() => AuthModule)
    ],
    providers: [UserResolver, UserService],
    exports: [UserService]
})
export class UserModule { }