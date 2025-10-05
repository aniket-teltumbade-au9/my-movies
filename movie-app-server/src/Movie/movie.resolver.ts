import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { AddMovieInput } from './dto/add-movie.input';
import { ListFilterInput } from './dto/list-movies.input';
import { JwtAuthGuard } from '../User/jwt-auth.guard';
import { MoviesList } from './dto/movies-list.response';

@Resolver(() => Movie)
export class MovieResolver {
    constructor(private readonly movieService: MovieService) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Movie, { description: 'Add a new movie' })
    async addNewMovie(
        @Args('addMovieInput') addMovieInput: AddMovieInput,
        @Context() context: any,
    ): Promise<Movie> {
        const user = context.req.user;
        return this.movieService.add(addMovieInput, user);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => MoviesList, { description: 'List movies' })
    async listMovies(
        @Args('listFilterInput') listMoviesFilterInput: ListFilterInput,
        @Context() context: any,
    ): Promise<MoviesList> {
        const user = context.req.user;
        return this.movieService.list(listMoviesFilterInput, user);
    }
}