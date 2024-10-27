<template>
    <div class="flex flex-col items-center gap-6">
        <div class="flex flex-col items-center gap-2">
            <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 text-center drop-shadow-lg">
                Your Personalized Movie Guide
            </h1>
            <p class="text-lg md:text-xl font-medium text-orange-200 text-center drop-shadow-md tracking-wide">
                Discover your next binge-worthy film for Netflix, HBO, Amazon, etc.
            </p>
        </div>
        <PrimaryButton 
            text="Search a film" 
            :onClick="changeToFormScreen"
            icon="mdiArrowRightBoldCircleOutline"
            iconPosition="right"
        />
        <!-- <PrimaryButton 
            text="Insert data" 
            :onClick="storeData"
            :isLoading="loading"
            loadingText="Inserting data..."
        /> -->
    </div>
</template>

<script setup>
// Imports
import { Screen } from '@/types/screen'
import { useNuxtApp } from '#app'

// Initializations
const appStore = useAppStore()
const { setCurrentScreen } = appStore
const { $toast } = useNuxtApp()
const { storeDocument, error, loading, successMessage } = useEmbedder()

const changeToFormScreen = () => {
    setCurrentScreen(Screen.Form)
}

const storeData = async () => {
    await storeDocument()

    if (error.value == null) { 
        $toast.success(successMessage.value, { toastId: 'embed-success' })
    } else {
        $toast.error(error.value || 'An unexpected error occurred', { toastId: 'embed-error' })
    }
}
</script>
