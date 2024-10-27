import type { Movie } from "@/types/movie"

export type SimilaritySearchResponse =
    | { response: string; movies: Movie[] }
    | { message: string }

export type TmdbApiResponse = 
    { posterUrl: string | null } 
    | { error: string }

interface TmdbMovie {
    poster_path?: string
}
    
export interface TmdbResponse {
    results: TmdbMovie[]
}