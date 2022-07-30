import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PetController } from "./pet.controller";
import { PetSchema } from "./model/pet.model";
import { PetService } from "./pet.service";
import { PetResolver } from "./pet.resolver";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Pet", schema: PetSchema }])],
    controllers: [PetController],
    providers: [PetService, PetResolver]
})

export class PetModule { }