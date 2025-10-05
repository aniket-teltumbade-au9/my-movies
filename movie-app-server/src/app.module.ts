// src/app.module.ts (Updated with Connection Checks - Fixed for Typegoose)

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './User/user.module';
import { MovieModule } from './Movie/movie.module';
import { UploadModule } from './Upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLUpload } from 'graphql-upload-ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Optional: Specify custom .env file path
      // envFilePath: ['.env.development', '.env.production'], 
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypegooseModule.forRoot(
      process.env.MONGODB_URL,
      {
        retryWrites: true,
        retryReads: true,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 2,
        connectTimeoutMS: 30000,
      }
    ),
    JwtModule.register({
      secret: process.env.SECRET_KEY, // TODO: move to env variable
      signOptions: { expiresIn: '1h' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      transformAutoSchemaFile: true,
      sortSchema: true,
      playground: true,
      buildSchemaOptions: {
        scalarsMap: [{ type: () => GraphQLUpload, scalar: GraphQLUpload }],
      },
    }),
    UserModule,
    MovieModule,
    UploadModule
  ],
  providers: [AppService],
})
export class AppModule { }