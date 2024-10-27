import type { SimilaritySearchResponse, TmdbApiResponse} from "~/types/search"
import type { MovieDetails } from "~/types/movie"

export const useSimilaritySearch = () => {
    const isSearching = ref(false)
    const searchRecommendation = ref<string | null>(null)
    const searchResults = ref<MovieDetails[]>([])
    const searchError = ref<string | null>(null)

    const fetchPoster = async (title: string): Promise<string | null> => {
        try {
            const response = await $fetch<TmdbApiResponse>("/api/tmdb", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: { title }
            })

            // Check if the response contains a posterUrl
            if ('posterUrl' in response) {
                return response.posterUrl || null
            } else {
                // Handle case where there is an error
                console.error(response.error)
                return null
            }
        } catch (error) {
            console.error('Failed to fetch poster:', error)
            return null
        }
    }

    // Function to parse movie details from the structured response
    const parseMovieDetails = async (content: string): Promise<MovieDetails | null> => {
        const titleMatch = content.match(/- Title: (.+)/)
        const yearMatch = content.match(/- Year: (\d{4})/)
        const ageRestrictionMatch = content.match(/- Age Restriction: (.+)/)
        const durationMatch = content.match(/- Duration: (.+)/)
        const ratingMatch = content.match(/- Rating: ([\d.]+)/)
        const descriptionMatch = content.match(/- Description: (.+)/)

        if (titleMatch && yearMatch && ageRestrictionMatch && durationMatch && ratingMatch && descriptionMatch) {
            const title = titleMatch[1].trim()
            const poster = await fetchPoster(title) 
            
            return {
                title,
                year: yearMatch[1].trim(),
                ageRestriction: ageRestrictionMatch[1].trim(),
                duration: durationMatch[1].trim(),
                rating: `${ratingMatch[1].trim()} rating`,
                description: descriptionMatch[1].trim(),
                similarity: 0,
                poster
            }
        }
        return null
    }

    const searchSimilarMovies = async (query: string) => {
        isSearching.value = true
        searchError.value = null
        searchResults.value = []
        searchRecommendation.value = null

        try {
            const response = await $fetch<SimilaritySearchResponse>("/api/similarity-search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            })

            if ("response" in response) {
                searchRecommendation.value = response.response

                // Parse each movie recommendation from the formatted response
                const movieRecommendations = response.response.split("\n\n")
                const results = await Promise.all(
                    movieRecommendations.map((content) => parseMovieDetails(content))
                )
                searchResults.value = results.filter((movie): movie is MovieDetails => movie !== null)
            } else if ("message" in response) {
                searchError.value = response.message
            }
        } catch (err) {
            if (err instanceof Error) {
                searchError.value = err.message || "Error during search"
            }
        } finally {
            isSearching.value = false
        }
    }

    return {
        searchSimilarMovies,
        isSearching,
        searchRecommendation,
        searchResults,
        searchError,
    }
}
