import { getAppClients } from '@/utils/config'
import type { Movie } from '@/types/movie'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { query } = body

        if (!query || typeof query !== "string") {
            throw new Error("Query must be a valid string")
        }

        const { openai, supabase } = getAppClients()

        // Generate embedding for the query using OpenAI
        const queryEmbeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: query,
        })

        const queryEmbedding = queryEmbeddingResponse.data[0].embedding

        // Perform a similarity search in Supabase using the query embedding
        const { data: movies, error } = await supabase.rpc("match_movies", {
            query_embedding: queryEmbedding,
            match_threshold: 0.5,
            match_count: 5,
        })

        if (error) {
            throw new Error(`Error during similarity search: ${error.message}`)
        }

        /// Map through the returned movies with explicit typing
        const results = (movies as Movie[]).map((r: Movie) => ({
            content: r.content,
            similarity: r.similarity,
        }))

        // Prepare the system message for ChatGPT to format the recommendations
        const chatMessages: Array<{
            role: 'system' | 'user',
            content: string
        }> = [
            {
                role: 'system',
                content: `You are a highly knowledgeable movie expert. 
                Your task is to recommend movies based on provided user preferences. 
                Each recommendation should be provided in the following structured format:
        
                - Title: ...
                - Year: ...
                - Age Restriction: ...
                - Duration: ...
                - Rating: ...
                - Description: ..."`
            },
            {
                role: 'user',
                content: `Context: ${results.map((movie) => movie.content).join(" ")}.
                Question: Which movies fit to this query: ${query}. Provide each movie recommendation in the specified format.`
            }
        ]

        // Use GPT to generate a response based on the context
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: chatMessages,
            temperature: 0.5,
            frequency_penalty: 0.5,
        })

        // Format the response to match the expected format. Otherwise return 0
        const formattedResponse = chatResponse.choices[0]?.message?.content || 0

        return { response: formattedResponse }
    } catch (error) {
        if (error instanceof Error) {
            return { message: `Error: ${error.message}` }
        } else {
            return { message: "An unknown error occurred" }
        }
    }
})
