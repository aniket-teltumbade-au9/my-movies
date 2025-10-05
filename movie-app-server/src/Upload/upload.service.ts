import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class UploadService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadImage(file: FileUpload | any): Promise<string> {
        console.log('upload.service.ts console.log(file)->', file);

        // Check if it's a FileUpload object (from graphql-upload)
        if (file.createReadStream && typeof file.createReadStream === 'function') {
            const { createReadStream, filename } = await file;

            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'movie-app',
                        public_id: filename,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                createReadStream().pipe(stream);
            });
        }
        // Handle buffer-based file object (from base64 conversion)
        else if (file.buffer && file.originalname) {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'movie-app',
                        public_id: file.originalname,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                ).end(file.buffer);
            });
        }
        // Fallback for other file types
        else {
            throw new Error('Unsupported file type for upload');
        }
    }
}
