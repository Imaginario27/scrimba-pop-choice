import { useRuntimeConfig } from '#imports'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

// Utility to get OpenAI and Supabase clients with config validation
export const getAppClients = () => {
    const config = useRuntimeConfig()

    const openaiApiKey = config.openaiApiKey
    const supabaseApiKey = config.supabaseApiKey
    const supabaseUrl = config.public.supabaseUrl
    const tmdbApiKey = config.tmdbApiKey

    if (!openaiApiKey) {
        throw new Error('OpenAI API key is missing')
    }
    if (!supabaseApiKey) {
        throw new Error('Supabase API key is missing')
    }
    if (!supabaseUrl) {
        throw new Error('Supabase URL is missing')
    }
    if (!tmdbApiKey) {
        throw new Error('TMDB API key is missing')
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: false,
    })

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseApiKey)

    return { openai, supabase, tmdbApiKey }
}
