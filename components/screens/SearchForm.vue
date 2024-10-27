<template>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
        <!-- Information for user -->
        <p class="text-sm text-orange-300">
            * Please fill out at least one field to proceed with the search.
        </p>

        <InputField 
            v-model="availableTime"
            id="available-time"
            placeholder="Ex.: 2 hours, 30 minutes, 1 hour 30 minutes"
            label="How much time do you have?"
            :maxLength="120"
            required
        />
        <TextareaField 
            v-model="favoriteMovie"
            id="favorite-movie"
            placeholder="Enter your favorite movie and explain why"
            label="What's your favorite movie and why?"
            :maxLength="500"
            required
        />
        <TextareaField 
            v-model="moviePerson"
            id="movie-person"
            placeholder="Enter your favorite movie person and explain why"
            label="Which famous film person would you love to be stranded on an island and why?"
            :maxLength="500"
            required
        />
        <OptionButtonsField
            label="Are you in the mood for something new or a classic?"
            :options="[ { id: 'new', text: 'New' }, { id: 'classic', text: 'Classic' } ]"
            v-model="newOrClassic"
        />
        <OptionButtonsField
            label="What are you in the mood for?"
            :options="[ 
                { id: 'fun', text: 'Fun' }, 
                { id: 'serious', text: 'Serious' },
                { id: 'inspiring', text: 'Inspiring' }, 
                { id: 'scary', text: 'Scary' } 
            ]"
            v-model="mood"
        />

        <!-- Action buttons -->
        <div class="flex flex-col-reverse justify-between mt-4 gap-2 md:flex-row md:gap-4">
            <SecondaryButton 
                text="Go back" 
                @click="changeToSplashScreen" 
                icon="mdiArrowLeft"
            />
            <SecondaryButton 
                text="Reset form" 
                @click="resetForm" 
                icon="mdiRestore"
            />
            <PrimaryButton 
                text="Search films" 
                :onClick="submit" 
                icon="mdiMagnify"
                iconPosition="right"
                :isLoading="searchStore.isSearching"
                :disabled="!isFormFilled"
            />
        </div>
    </form>
</template>

<script setup>
// Imports
import { Screen } from '@/types/screen'
import { useSearchStore } from '@/stores/searchStore'
import { ref, computed } from 'vue'

// Initialization
const appStore = useAppStore()
const { setCurrentScreen } = appStore
const searchStore = useSearchStore()

// States
const availableTime = ref('')
const favoriteMovie = ref('')
const moviePerson = ref('')
const mood = ref('')
const newOrClassic = ref('')

// Computed property to check if the form has any field filled
const isFormFilled = computed(() => 
    availableTime.value || favoriteMovie.value || moviePerson.value || mood.value || newOrClassic.value
)

// Change screens
const changeToSplashScreen = () => {
    setCurrentScreen(Screen.Splash)
}

const changeToResultScreen = () => {
    setCurrentScreen(Screen.Results)
}

// Reset form fields
const resetForm = () => {
    availableTime.value = ''
    favoriteMovie.value = ''
    moviePerson.value = ''
    mood.value = ''
    newOrClassic.value = ''
}

// Handle form submission
const submit = async () => {
    const query = `
        Available time: ${availableTime.value}.
        Favorite movie: ${favoriteMovie.value}.
        Stranded person: ${moviePerson.value}.
        Mood: ${mood.value}.
        Genre preference: ${newOrClassic.value}.
    `    

    // Update search store with query
    searchStore.setQuery(query)

    changeToResultScreen()
}
</script>
