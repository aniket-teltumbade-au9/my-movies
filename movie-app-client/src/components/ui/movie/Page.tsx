"use client"
import MoviesProvider from '@/Provider/movie-provider'
import React from 'react'
import dynamic from 'next/dynamic';

const MovieListWrapper = dynamic(() => import('./MovieListWrapper'), {
    loading: () => <p>Loading User View...</p>,
});

function MoviesPage() {

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <MoviesProvider>
                <MovieListWrapper />
            </MoviesProvider>
        </React.Suspense>
    )
}

export default MoviesPage
