import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class HashPasswordService {
    async encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    async compare(password: string, hashPassword: string): Promise<Boolean> {
        return await bcrypt.compare(password, hashPassword)
    }
}
