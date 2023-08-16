/* This is to separate the api calls from the components */
import axios from 'axios';

const api_key = process.env.REACT_APP_TMDB_API_KEY;
const baseURL = 'https://api.themoviedb.org/3';

// Searches for movies based on the query, returns a list of movies
export const searchMovies = async (query) => {
    try{
        const response = await axios.get(`${baseURL}/search/movie`,{
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                api_key: api_key
            },
        });
        return response.data.results;
    }catch(error){
        throw error;
    }
}

// Gets the movie details based on the movie id
export const getMovieDetails = async (movie_id) => {
    try{
        const response = await axios.get(`${baseURL}/movie/${movie_id}`,{
            params: {
                api_key: api_key,
                language: 'en-US',
                // Appending the cast to the reponse
                append_to_response: 'credits,watch/providers'
            },
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

// Gets the similar movies based on the movie id
export const getSimilarMovies = async (movie_id) => {
    try{
        const response = await axios.get(`${baseURL}/movie/${movie_id}/similar`,{
            params: {
                api_key: api_key,
                language: 'en-US',
            },
        });
        return response.data.results;
    }catch(error){
        throw error;
    }
}
