# PopChoice 🍿

PopChoice is a personalized movie recommendation app that helps you discover your next binge-worthy film tailored to your preferences. Whether you're in the mood for something fun, serious, or inspiring, PopChoice leverages advanced AI technology to suggest movies that best match your unique tastes and time constraints.

## Features

- **Personalized Movie Recommendations**: Enter information about your favorite movie, desired mood, available time, and genre preference (classic or new), and PopChoice will suggest movies that fit your criteria.
- **Responsive Design**: Designed to look great on both desktop and mobile devices with a modern, engaging interface.
- **Powered by AI**: Uses OpenAI's embedding model to find relevant movie recommendations based on user input and an extensive database of movie metadata.
- **Dynamic Poster Retrieval**: Fetches movie posters dynamically from TMDB, making the app visually appealing and engaging.

## Technology Stack

- **Frontend**: Nuxt 3 with Tailwind CSS for fast and responsive UI.
- **Backend**: Nuxt 3 API routes for secure backend API calls.
- **Supabase**: Stores and retrieves movie embeddings, using a vector database to handle similarity searches.
- **OpenAI API**: Utilizes OpenAI's embedding model to convert user preferences into embeddings, enabling the app to find similar movies.
- **LangChain**: Used for text splitting and preprocessing data for embeddings, enhancing the efficiency of the app's recommendation process.
- **TMDB API**: Retrieves movie posters based on the recommended movies, adding visual context to the suggestions.

## How It Works

1. **User Input**: Users fill out a form specifying their preferences:
   - Available time
   - Favorite movie
   - Desired mood
   - Genre preference (classic or new)

2. **Embedding Generation**: The app sends the user input to OpenAI's API to generate an embedding, a numerical representation of the user's preferences.

3. **Similarity Search**: The embedding is compared with embeddings of movies stored in Supabase. Using Supabase's vector search capabilities, the app finds movies with the closest similarity to the user's embedding.

4. **Recommendations**: The app returns a list of personalized movie recommendations, each with a title, description, and a dynamically fetched poster from TMDB.

## Prerequisites

Before running the app, please ensure you have completed the following steps:

1. **Enable Vectors in Supabase**: Ensure that vector support is enabled in your Supabase project.
   
2. **Insert Movie Data**:
   Run the following SQL commands in Supabase to create a table and function for storing and querying movie data:

   ```sql
   -- Create a table to store your documents
   create table movies (
     id bigserial primary key,
     content text, 
     embedding vector(1536) 
   );

   -- Create a function to search for movies
   create or replace function match_movies (
     query_embedding vector(1536),
     match_threshold float,
     match_count int
   )
   returns table (
     id bigint,
     content text,
     similarity float
   )
   language sql stable
   as $$
     select
       movies.id,
       movies.content,
       1 - (movies.embedding <=> query_embedding) as similarity
     from movies
     where 1 - (movies.embedding <=> query_embedding) > match_threshold
     order by similarity desc
     limit match_count;
   $$;
   ```

3. **Create a Supabase Table for Movies**:
   - Uncomment the data insertion button in the splash screen to insert data from `movies.txt` (public folder) into your Supabase `movies` table.
   - After the data has been successfully inserted, comment out the insertion button again to avoid re-adding the data each time the app is run.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/popchoice.git
   cd popchoice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory of the project and add the following variables:

   ```plaintext
   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key

   # Supabase configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_API_KEY=your_supabase_api_key

   # TMDB API Key (for fetching movie posters)
   TMDB_API_KEY=your_tmdb_api_key
   ```


4. Run the application:

   Use the following command to start the development server:

   ```bash
   npm run dev
   ```

## Credits
Special thanks to Scrimba AI Career Path for the inspiration and resources that made this project possible. PopChoice would not have been possible without the knowledge and guidance provided by the course.