import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    providers: [UploadService, UploadResolver, JwtService],
})
export class UploadModule { }
