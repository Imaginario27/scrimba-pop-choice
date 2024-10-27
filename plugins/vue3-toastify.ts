// Docs: https://vue3-toastify.js-bridge.com/get-started/introduction.html

import Vue3Toastify, { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, { 
        autoClose: 5000, 
        position: "bottom-center",
        theme: "colored",
    })

    return {
        provide: { toast },
    }
})
