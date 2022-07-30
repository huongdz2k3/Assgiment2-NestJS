import { IsNotEmpty, Matches } from "class-validator";

export class UpdatePassDto {
    @IsNotEmpty()
    currentPass: string
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    newPass: string
}