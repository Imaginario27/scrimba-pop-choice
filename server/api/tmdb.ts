import { getAppClients } from '@/utils/config'
import { TmdbResponse } from '@/types/search'


// Define the response structure for this endpoint
type TmdbApiResponse = { posterUrl: string | null } | { error: string }

export default defineEventHandler(async (event): Promise<TmdbApiResponse> => {
    const { tmdbApiKey } = getAppClients()
    const { title } = await readBody<{ title: string }>(event)

    if (!title) {
        return { error: 'Movie title is required' }
    }

    try {
        // TMDB API endpoint to search for a movie by title
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(title)}`

        // Fetch movie details
        const response = await $fetch<TmdbResponse>(url)
        
        // Check if results are found
        if (response.results && response.results.length > 0) {
            const movie = response.results[0] // Take the first result as the best match
            const posterUrl = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : null // Construct the poster URL

            return { posterUrl }
        } else {
            return { error: 'No poster found for the given movie title' }
        }
    } catch (error) {
        console.error('TMDB API error:', error)
        return { error: 'Failed to fetch poster from TMDB' }
    }
})
