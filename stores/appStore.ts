import { defineStore } from 'pinia'
import { Screen } from '@/types/screen'

export const useAppStore = defineStore('app', () =>{

    const currentScreen = ref<string>(Screen.Splash)

    const setCurrentScreen = (screenName: string) => {
        currentScreen.value = screenName
    }

    return {
        currentScreen,
        setCurrentScreen,
    }
})