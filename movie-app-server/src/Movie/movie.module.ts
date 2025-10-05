import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    // CRITICAL: This must be here!
    TypegooseModule.forFeature([Movie]),
  ],
  providers: [MovieService, MovieResolver, JwtService],
  exports: [MovieService],
})
export class MovieModule { }
