import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

export const useEmbedder = () => {
    const error = ref<string | null>(null)
    const successMessage = ref<string>("")
    const textChunks = ref<Array<string>>([])
    const loading = ref<boolean>(false)

    // Function to split the document into chunks
    const splitDocument = async () => {
        try {
            const response = await fetch('/movies.txt')

            if (!response.ok) {
                throw new Error(`Failed to fetch document: ${response.statusText}`)
            }

            const text = await response.text()

            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 300,
                chunkOverlap: 50,
            })

            const chunksArray = await textSplitter.createDocuments([text])
            textChunks.value = chunksArray.map((chunk) => chunk.pageContent)

        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An unknown error occurred while splitting the document'
            throw new Error(error.value)
        }
    }

    // Function to send chunks to the API to create and store embeddings
    const createAndStoreEmbeddings = async (chunks: Array<string>) => {
        try {
            const response = await $fetch("/api/store-movie-embeddings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(chunks),
            })

            // Use the response message as the success message
            successMessage.value = response.message || "Data successfully stored in the database."

        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An unknown error occurred while creating embeddings'
            throw new Error(error.value)
        }
    }

    // Function to handle splitting and embedding process sequentially
    const storeDocument = async () => {
        loading.value = true
        successMessage.value = ""  // Reset the success message before starting
        error.value = null  // Reset the error message

        try {
            await splitDocument()

            if (textChunks.value.length) {
                await createAndStoreEmbeddings(textChunks.value)
            } else {
                throw new Error("No text chunks generated to create embeddings")
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An unknown error occurred in the process'
            throw new Error(error.value)
        } finally {
            loading.value = false
        }
    }

    return {
        storeDocument,
        loading,  
        error,
        successMessage, 
    }
}