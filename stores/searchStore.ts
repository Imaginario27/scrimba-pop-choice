import { defineStore } from 'pinia'
import type { MovieDetails } from '@/types/movie'

export const useSearchStore = defineStore('search', () => {
    const query = ref<string>('')
    const searchResults = ref<MovieDetails[]>([])
    const isSearching = ref<boolean>(false)
    const searchError = ref<string | null>(null)

    const setQuery = (newQuery: string) => {
        query.value = newQuery
    }

    const performSearch = async () => {
        isSearching.value = true
        searchError.value = null
        searchResults.value = [] 

        try {
            const { searchSimilarMovies, searchResults: results, searchError: error } = useSimilaritySearch()
            await searchSimilarMovies(query.value)
            
            searchResults.value = results.value
            searchError.value = error.value
        } catch (err) {
            searchError.value = (err instanceof Error) ? err.message : 'An unexpected error occurred'
        } finally {
            isSearching.value = false
            query.value = '' 
        }
    }

    return {
        query,
        searchResults,
        isSearching,
        searchError,
        setQuery,
        performSearch,
    }
})
