"use client"

import { Movie } from "@/components/ui/movie/List";
import { GET_MOVIES } from "@/gql/movie"
import { useQuery } from "@apollo/client/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from 'react';


interface MovieContextType {
    movies?: Movie[]; // Array of Movie objects
    page: number;
    refetch: () => void;
    totalPages?: number;
    updatePage: (_: number) => void;
}

export const MovieContext = React.createContext<MovieContextType>({
    page: 0,    // Default starting page
    refetch() { },
    updatePage() { },
});
export default function MoviesProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname()

    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get("page") || "1")
    const size = 10;
    const { data, refetch } = useQuery(GET_MOVIES, { variables: { filter: { page: page - 1, size } } })
    const movies = (data as any)?.listMovies?.movies
    const totalPages = (data as any)?.listMovies?.totalPages ?? 0

    useEffect(() => {
        if (pathname === '/movies') {
            refetch()
        }
    }, [pathname]);
    const updatePage = (p: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', p.toString());
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <MovieContext.Provider value={{ page, movies, refetch, totalPages, updatePage }}>
            {children}
        </MovieContext.Provider>
    )
}