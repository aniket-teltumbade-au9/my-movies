import { Injectable, ConflictException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Movie } from './movie.model';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { AddMovieInput } from './dto/add-movie.input';
import { ListFilterInput } from './dto/list-movies.input';

interface MovieCache {
  count: number;
  updatedAt: Date;
}

interface MovieCounts {
  [userId: string]: MovieCache;
}

let movieCounts: MovieCounts = {};

// Cache expiry time (5 minutes)
const CACHE_EXPIRY_MS = 5 * 60 * 1000;

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly movieModel: ReturnModelType<typeof Movie>,
  ) { }

  async add(movieInput: AddMovieInput, user?: any): Promise<Movie> {
    try {
      // Create the movie
      const movie = await this.movieModel.create({
        ...movieInput,
        createdBy: user._id
      });

      // Update cache
      if (!movieCounts[user._id]) {
        movieCounts[user._id] = {
          count: 0,
          updatedAt: new Date()
        };
      }

      movieCounts[user._id].count = movieCounts[user._id].count + 1;
      movieCounts[user._id].updatedAt = new Date();

      return movie;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Movie with this title already exists');
      }

      if (error.name === 'ValidationError') {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }

  async list(listFilterInput: ListFilterInput, user: any): Promise<{ movies: Movie[]; totalPages: number; totalMovies: number }> {
    const { page = 0, size = 10 } = listFilterInput;
    const skip = page * size;

    try {
      // Check if cache exists and is valid
      let totalMovies: number;
      const userCache = movieCounts[user._id];
      const isCacheValid = userCache &&
        (new Date().getTime() - userCache.updatedAt.getTime()) < CACHE_EXPIRY_MS;

      if (isCacheValid) {
        // Use cached count
        totalMovies = userCache.count;
      } else {
        // Cache miss or expired - fetch from database
        totalMovies = await this.movieModel.countDocuments({ createdBy: user._id });

        // Update cache
        movieCounts[user._id] = {
          count: totalMovies,
          updatedAt: new Date()
        };
      }

      // Fetch paginated movies
      const movies = await this.movieModel
        .find({ createdBy: user._id })
        .skip(skip)
        .limit(size)
        .sort({ createdAt: -1 }); // Optional: sort by creation date

      // Calculate total pages
      const totalPages = Math.ceil(totalMovies / size);

      return {
        movies,
        totalPages,
        totalMovies
      };
    } catch (error) {
      throw error;
    }
  }

  // Optional: Method to invalidate cache for a user
  async invalidateCache(userId: string): Promise<void> {
    delete movieCounts[userId];
  }

  // Optional: Method to delete a movie (with cache update)
  async delete(movieId: string, user: any): Promise<boolean> {
    try {
      const result = await this.movieModel.deleteOne({
        _id: movieId,
        createdBy: user._id
      });

      if (result.deletedCount > 0) {
        // Update cache
        if (movieCounts[user._id]) {
          movieCounts[user._id].count = Math.max(0, movieCounts[user._id].count - 1);
          movieCounts[user._id].updatedAt = new Date();
        }
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  // Optional: Clear all expired caches periodically
  clearExpiredCaches(): void {
    const now = new Date().getTime();
    Object.keys(movieCounts).forEach(userId => {
      const cache = movieCounts[userId];
      if ((now - cache.updatedAt.getTime()) > CACHE_EXPIRY_MS) {
        delete movieCounts[userId];
      }
    });
  }
}