export type Movie = {
    content: string,
    similarity: number
}

export type MovieDetails = {
    title: string,
    year: string,
    ageRestriction: string,
    duration: string,
    rating: string,
    description: string,
    similarity: number,
    poster: string | null,
}