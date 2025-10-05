import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../User/jwt-auth.guard';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('image')
    @UseGuards(JwtAuthGuard) // TODO
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: any): Promise<{ url: string }> {
        const url = await this.uploadService.uploadImage(file);
        return { url };
    }
}
