import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePetInput, UpdatePetInput } from "./input/pet.input";

import { Pet } from "./model/pet.model";

@Injectable()
export class PetService {
    constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) { }
    async getAllPet() {
        const listPets = await this.petModel.find({ status: true })
        // console.log('listPets', listPets)
        return listPets
    }
    async createPet(createPetInput: CreatePetInput) {
        const pet = await this.petModel.create(createPetInput)
        return pet
    }
    async updatePet(updatePetInput: UpdatePetInput, id: string) {
        const pet = await this.petModel.findByIdAndUpdate(id, updatePetInput)
        return pet
    }
    async findPetById(id: string) {
        const pet = await this.petModel.findById(id)
        return pet
    }
    async findPetByTags(tag: string) {
        const pets = await this.petModel.find({ tags: tag, status: true })
        return pets
    }
    async getByStatus(status: boolean) {
        const pets = await this.petModel.find({ status: status })
        return pets
    }
    async deletePet(id: string) {
        const pet = await this.petModel.findByIdAndDelete(id)
        return pet
    }

    async uploadImg(path: string, id: string) {
        return await this.petModel.findByIdAndUpdate(id, { img: path })
    }
}