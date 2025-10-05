import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../User/jwt-auth.guard';

@Resolver()
export class UploadResolver {
    constructor(private readonly uploadService: UploadService) { }

    @UseGuards(JwtAuthGuard) // ToDo
    @Mutation(() => String, { description: 'Upload an image to Cloudinary' })
    async uploadImage(
        @Args('file') file: string, // base64 encoded file
    ): Promise<string> {
        // Convert base64 to buffer
        const buffer = Buffer.from(file.split(',')[1], 'base64');
        const filename = `upload_${Date.now()}.png`; // You might want to detect the actual file type

        // Create a file-like object
        const fileObject = {
            buffer,
            originalname: filename,
            mimetype: 'image/png',
            size: buffer.length,
        } as any;

        return this.uploadService.uploadImage(fileObject);
    }
}
