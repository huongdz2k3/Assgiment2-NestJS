import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { UserSchema } from "src/user/users.model";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
        , PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60d' },
    }),],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule { }