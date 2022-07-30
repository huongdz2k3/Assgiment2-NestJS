import { IsNotEmpty } from "class-validator";

export class CreatePetDto {
    @IsNotEmpty()
    category: string
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    status: boolean
    img: string
    @IsNotEmpty()
    price: number
}