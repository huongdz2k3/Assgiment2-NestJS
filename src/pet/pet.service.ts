import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePetDto } from "./dto/pet.create-pet-dto";
import { UpdatePetDto } from "./dto/pet.update-pet.dto";
import { CreatePetInput } from "./input/createPet.input";
import { UpdatePetInput } from "./input/updatePet.input";
import { Pet } from "./model/pet.model";

@Injectable()
export class PetService {
    constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) { }
    async getAllPet() {
        const listPets = await this.petModel.find()
        // console.log('listPets', listPets)
        return listPets
    }
    async createPet(createPetInput: CreatePetInput) {
        const newPet = await this.petModel.create(createPetInput)
        return newPet
    }
    async updatePet(updatePetInput: UpdatePetInput, id: string) {
        return await this.petModel.findByIdAndUpdate(id, updatePetInput)
    }
    async findPet(id: string) {
        return await this.petModel.findById(id)
    }
    async getByStatus(status: boolean) {
        return await this.petModel.find({ status: status })
    }
    async deletePet(id: string) {
        return await this.petModel.findByIdAndDelete(id)
    }
}