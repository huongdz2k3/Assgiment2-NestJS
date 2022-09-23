import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CurrentUser } from "src/user/decorators/user.decorator.graphql";
import { PetService } from "./pet.service";

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './src/pet/img',
            filename: (req, file, callback) => {
                const ext = extname(file.originalname)
                const filename = `${Object.values(req.params)[0]}${ext}`
                callback(null, filename)
            }
        })
    }))
    async uploadImg(
        @UploadedFile() file: Express.Multer.File,
        @Param() id: string
    ) {
        id = Object.values(id)[0]
        await this.petService.uploadImg(file.path, id)
        return true
    }
}