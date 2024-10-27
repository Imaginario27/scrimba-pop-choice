import { getAppClients } from '@/utils/config'

export default defineEventHandler(async (event) => {
    try {
        // Reads the body of the fetch request
        const body = await readBody(event)

        // Initialization
        const { openai, supabase } = getAppClients()

        // Stores chunked data embedding into Supabase DB using OpenAI
        const storeItems = async (chunksData: string[]) => {
            const embeddingsData = await Promise.all(
                chunksData.map(async (textChunk) => {
                    const embeddingResponse = await openai.embeddings.create({
                        model: "text-embedding-ada-002",
                        input: textChunk,
                    })

                    if (!embeddingResponse || embeddingResponse.data.length === 0) {
                        throw new Error("Failed to generate embeddings from OpenAI")
                    }

                    return {
                        content: textChunk,
                        embedding: embeddingResponse.data[0].embedding,
                    }
                })
            )

            const { data: insertedData, error } = await supabase
                .from("movies")
                .insert(embeddingsData)

            if (error) {
                throw new Error(`Failed to insert into Supabase: ${error.message}`)
            }

            return insertedData
        }

        // Inserts the data
        const insertedData = await storeItems(body)

        return {
            message: "Successfully stored movies in the database!",
            insertedData,
        }

    } catch (error) {
        if(error instanceof Error) {
            return {
                message: error.message,
            }
        } else {
            return {
                message: 'An unknown error occurred'
            }
        }
    }
})