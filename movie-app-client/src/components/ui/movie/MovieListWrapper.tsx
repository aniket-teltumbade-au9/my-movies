import { MovieContext } from '@/Provider/movie-provider'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import React from 'react'
const List = dynamic(() => import('./List'), {
    loading: () => <p>Loading User View...</p>,
});

const EmptyList = dynamic(() => import('../movie/Empty'), {
    loading: () => <p>Loading Guest View...</p>,
});
function MovieListWrapper() {
    const { movies } = React.useContext(MovieContext)
    const router = useRouter()
    const handleAddMovie = () => {
        router.push('/movies/add')
    }

    return movies ?
        <List movies={movies} handleAddMovie={handleAddMovie} /> :
        <EmptyList onAddMovie={handleAddMovie} />
}

export default MovieListWrapper