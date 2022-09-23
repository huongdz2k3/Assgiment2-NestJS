import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { User } from "src/user/model/users.model";

export enum AuthErrors {
    REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
    REFRESH_TOKEN_NOTFOUND = 'REFRESH_TOKEN_NOTFOUND',
    TOKENS_PROVIDED_NOT_MATCH = 'TOKENS_PROVIDED_NOT_MATCH',
    TOKEN_IS_EXPIRED_BY_USER_ACTION = 'TOKEN_IS_EXPIRED_BY_USER_ACTION',
}

@ObjectType()
export class JwtTokenPayload {
    @Field()
    _id: string
    @Field(() => User)
    user: User
}

@ObjectType()
export class JWT {
    @Field()
    token: string

    @Field()
    refreshToken: string

    @Field((type) => JwtTokenPayload)
    @IsOptional()
    jwtPayload?: JwtTokenPayload

}

export enum JWTAuthTokenType {
    ID_TOKEN = 'ID_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}