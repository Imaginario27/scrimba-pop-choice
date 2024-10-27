<template>
    <main 
        class="
            min-h-screen 
            w-full 
            bg-[url('@/assets/images/background/movie-posters-bg-gray.jpg')] 
            bg-sky-950 
            bg-blend-multiply 
            bg-center 
            bg-cover 
            flex 
            items-center 
            justify-center
            overflow-y-auto 
            px-4"
    >
        <!-- Content Wrapper -->
        <div class="
            w-full
            max-w-3xl 
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-8 
            py-12" 
        >
            <!-- Logo -->
            <img
                src="/popchoice-logo-inverse.svg"
                alt="PopChoice"
                :class="{
                    'w-[100px] md:w-[150px]': currentScreen === screenType.Splash,
                    'w-24 h-24': currentScreen === screenType.Form || currentScreen === screenType.Results
                }"
            />

            <!-- Content Area -->
            <div class="
                backdrop-blur-md
                bg-transparent
                rounded-xl 
                drop-shadow-xl
                p-4
                md:p-8
                w-full
            ">
                <Splash v-if="currentScreen === screenType.Splash"/>
                <SearchForm v-if="currentScreen === screenType.Form" />
                <Results v-if="currentScreen === screenType.Results"/>
            </div> 
        </div>
    </main>
</template>

<script setup>
// Imports
import { storeToRefs } from 'pinia'
import { Screen } from '@/types/screen'

// Initializations
const appStore = useAppStore()
const { currentScreen } = storeToRefs(appStore)

// State
const screenType = Screen
</script>
