import { IsNotEmpty } from "class-validator";

export class UpdatePetDto {
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