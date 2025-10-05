import { gql } from "@apollo/client";

export const GET_MOVIES = gql(`query GetMovies($filter: ListFilterInput!) {
  listMovies(listFilterInput: $filter) {
    movies {
      _id
      title
      releaseYear
      poster
    }
    totalPages
    totalMovies
  }
}`)

export const ADD_MOVIE = gql`
  mutation AddMovie($input: AddMovieInput!) {
    addNewMovie(addMovieInput: $input) {
      _id
      title
      releaseYear
      poster
    }
  }
`
