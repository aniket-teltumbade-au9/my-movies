"use client"
import Card from "@/components/ui/movie/Card";
import Header from "@/components/ui/movie/Header";
import MoviePagination from "@/components/ui/movie/Pagination";
import { useAuth } from "@/hooks/use-auth";
import { MovieContext } from "@/Provider/movie-provider";
import { useContext } from "react";
export interface Movie {
    id: string;
    releaseYear?: number;
    poster?: string;
    title: string;
}
export type MovieList = Movie[]
interface ListProps {
    handleAddMovie: () => void;
    movies: Movie[]
}
export default function List({ handleAddMovie, movies }: ListProps) {
    const { handleLogout } = useAuth()
    const { totalPages, page, updatePage } = useContext(MovieContext)
    return (
        <div className="w-full mx-auto px-4 py-6 max-h-screen overflow-y-auto">
            <div className="w-[80vw] m-auto">
                <Header onAddMovie={handleAddMovie} onLogout={handleLogout} />

                <div className="mt-8">
                    {movies.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No movies found. Add your first movie!</p>
                        </div>
                    ) : (
                        <>
                            <div className={`flex flex-wrap ${movies.length < 4 ? "gap-6" : "justify-between"}`} style={{ gap: 24, marginTop: '120px', marginBottom: '120px' }}>
                                {movies.map((movie) => (
                                    <Card
                                        key={movie.id}
                                        {...movie}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center" style={{ marginBottom: '120px' }}>
                                <MoviePagination
                                    currentPage={page}
                                    totalPages={totalPages ?? 0}
                                    onPageChange={updatePage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
