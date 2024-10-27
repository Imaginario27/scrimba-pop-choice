// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-10-12",
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-mdi"],
    runtimeConfig: {
        openaiApiKey: process.env.OPENAI_API_KEY,
        supabaseApiKey: process.env.SUPABASE_API_KEY,
        tmdbApiKey: process.env.TMDB_API_KEY,
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
        },
    },
    components: [ // Auto-import components based only on its name, not path,
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    plugins: [
        "@/plugins/vue3-toastify",
    ],
})