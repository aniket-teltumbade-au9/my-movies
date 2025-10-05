import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HashPasswordService } from 'src/HashPassword/hash-password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    // CRITICAL: This must be here!
    TypegooseModule.forFeature([User]),
  ],
  providers: [HashPasswordService, UserService, JwtService, UserResolver],
  exports: [UserService],
})
export class UserModule { }