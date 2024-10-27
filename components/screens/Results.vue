<template>
    <div class="flex flex-col gap-4">
        <!-- Loading Spinner -->
        <div v-if="searchStore.isSearching" class="text-center text-sky-50 flex flex-col items-center gap-2">
            <svg
                class="animate-spin h-8 w-8 text-sky-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.963 7.963 0 01-2-5.291H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <p>Loading...</p>
        </div>

        <!-- Error Message -->
        <div v-else-if="searchStore.searchError" class="text-center text-red-500">
            {{ searchStore.searchError }}
        </div>

        <!-- No Results Found Message -->
        <div v-else-if="!searchStore.isSearching && searchStore.searchResults.length === 0" class="text-center">
            <h1 class="text-3xl font-bold text-orange-400">No results found</h1>
            <p class="text-lg text-orange-50 mt-4">Try searching for a different film or try a different search term.</p>
        </div>

        <!-- Results Section -->
        <div v-else>
            <ResultItem 
                v-if="currentFilm"
                :poster="currentFilm.poster || testFilmPoster" 
                :title="currentFilm.title"
                :year="currentFilm.year"
                :ageRestriction="currentFilm.ageRestriction"
                :duration="currentFilm.duration"
                :rating="currentFilm.rating"
                :description="currentFilm.description"
            />

            <!-- Navigation controls for films -->
            <div class="flex flex-col-reverse justify-between gap-2 mt-4 md:flex-row md:gap-4">
                <SecondaryButton text="New search" @click="changeToFormScreen" />
                <div class="flex flex-col-reverse gap-3 md:flex-row">
                    <PrimaryButton v-if="hasPrevious" text="Previous" @click="showPreviousFilm" />
                    <PrimaryButton v-if="hasNext" text="Next" @click="showNextFilm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import testFilmPoster from '@/assets/images/test-film-poster.jpg'
import { Screen } from '@/types/screen'
import { useSearchStore } from '@/stores/searchStore'

// Initialization
const appStore = useAppStore()
const { setCurrentScreen } = appStore
const searchStore = useSearchStore()

// Navigation logic
const currentIndex = ref(0)
const currentFilm = computed(() => searchStore.searchResults[currentIndex.value] || null)
const hasPrevious = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < searchStore.searchResults.length - 1)

const showPreviousFilm = () => {
    if (hasPrevious.value) {
        currentIndex.value--
    }
}

const showNextFilm = () => {
    if (hasNext.value) {
        currentIndex.value++
    }
}

const changeToFormScreen = () => {
    setCurrentScreen(Screen.Form)
}

onMounted(async () => {
    await searchStore.performSearch()
})
</script>
