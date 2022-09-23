
import { UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Roles } from "src/user/decorators/roles.decorator";
import { Role } from "src/user/role/role.enum";
import { CreatePetInput, UpdatePetInput } from "./input/pet.input";

import { Pet } from "./model/pet.model";

import { PetService } from "./pet.service";
// import { FileUpload } from "graphql-upload"

@Resolver(of => Pet)
export class PetResolver {
    constructor(private petService: PetService) { }

    @Query(returns => Pet)
    async getPet(@Args('id') id: string) {
        return this.petService.findPetById(id)
    }

    @Query(returns => [Pet])
    async getAllPet() {
        return await this.petService.getAllPet()
    }

    @Query(returns => [Pet])
    async getByStatus(@Args('status') status: boolean) {
        return await this.petService.getByStatus(status)
    }

    @Query(returns => [Pet])
    async getByTags(@Args('tag') tag: string) {
        return await this.petService.findPetByTags(tag)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(returns => Pet)
    async createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
        return this.petService.createPet(createPetInput)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(returns => Pet)
    async updatePet(@Args('updatePet') updatePetInput: UpdatePetInput, @Args('id') id: string) {
        return await this.petService.updatePet(updatePetInput, id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(returns => Pet)
    async deletePet(@Args('id') id: string) {
        return await this.petService.deletePet(id)
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(() => Boolean)
    @UseInterceptors(FileInterceptor(__filename))
    async uploadImg(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
    }
}
