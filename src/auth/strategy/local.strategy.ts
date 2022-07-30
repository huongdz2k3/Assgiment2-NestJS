import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginUserInput } from "../input/login-user.input";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        }
        )
    }
    async validate(loginUserInput: LoginUserInput): Promise<any> {
        const user = this.authService.login(loginUserInput)
        if (!user) {
            throw new UnauthorizedException
        }
        return user
    }
}