/* This is to separate the api calls from the components */
import axios from 'axios';
import firebaseDatabase from './firebase';

import { ref, child, get } from "firebase/database";

const baseURL = 'https://api.themoviedb.org/3';

const database = firebaseDatabase(); // Initializes Firebase and gets a reference to the database.

// Fetches the tmdb key from the database
export const getTMDBKey = async () => {
    try {
        const dbRef = ref(database);

        const snapshot = await get(child(dbRef, `keys/tmdb-api`));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
            return null; // Default to null
        }
    } catch (error) {
        throw error;
    }
}

// Searches for movies based on the query, returns a list of movies
export const searchMovies = async (query) => {
    try{
        const key = await getTMDBKey();
        const response = await axios.get(`${baseURL}/search/movie`,{
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                api_key: key
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
        const key = await getTMDBKey();
        const response = await axios.get(`${baseURL}/movie/${movie_id}`,{
            params: {
                api_key: key,
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
        const key = await getTMDBKey();
        const response = await axios.get(`${baseURL}/movie/${movie_id}/recommendations`,{
            params: {
                api_key: key,
                language: 'en-US',
            },
        });
        return response.data.results;
    }catch(error){
        throw error;
    }
}
