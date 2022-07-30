import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreatePetDto } from "./dto/pet.create-pet-dto";
import { UpdatePetDto } from "./dto/pet.update-pet.dto";
import { PetService } from "./pet.service";

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) { }
    @Get('')
    getAllPet() {
        return this.petService.getAllPet()
    }
    // @Post('')
    // createPet(@Body() createPetDto: CreatePetDto) {
    //     return this.petService.createPet(createPetDto)
    // }

    // @Patch(':id')
    // updatePet(@Param() id, @Body() updatePetDto: UpdatePetDto) {
    //     return this.petService.updatePet(id, updatePetDto)
    // }
}