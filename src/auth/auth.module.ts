import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { UserSchema } from "src/user/model/users.model";
import { UserModule } from "src/user/users.module";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./guard/jwt.strategy";


@Module({
    imports:
        [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
            PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60d' },
        }),
        forwardRef(() => UserModule)
        ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule { }