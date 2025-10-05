import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Movie } from '../movie.model';

@ObjectType()
export class MoviesList {
    @Field(() => [Movie])
    movies: Movie[];

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    totalMovies: number;
}