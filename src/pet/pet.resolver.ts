
import { UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CreatePetInput } from "./input/createPet.input";
import { UpdatePetInput } from "./input/updatePet.input";
import { PetQL } from "./pet.schema"
import { PetService } from "./pet.service";
// import { FileUpload } from "graphql-upload"

@Resolver(of => PetQL)
export class PetResolver {
    constructor(private petService: PetService) { }

    @Query(returns => PetQL)
    async getPet(@Args('id') id: string) {
        return this.petService.findPet(id)
    }
    @Query(returns => [PetQL])
    async getAllPet() {
        return this.petService.getAllPet()
    }
    @Query(returns => [PetQL])
    async getByStatus(@Args('status') status: boolean) {
        return this.petService.getByStatus(status)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(returns => PetQL)
    async createPet(@Args('createPet') createPetInput: CreatePetInput) {
        return this.petService.createPet(createPetInput)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(returns => PetQL)
    async updatePet(@Args('updatePet') updatePetInput: UpdatePetInput, @Args('id') id: string) {
        return this.petService.updatePet(updatePetInput, id)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(returns => PetQL)
    async deletePet(@Args('id') id: string) {
        return this.petService.deletePet(id)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    @UseInterceptors(FileInterceptor(__filename))
    async uploadImg(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
    }
}
