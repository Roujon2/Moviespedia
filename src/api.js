/* This is to separate the api calls from the components */
import axios from 'axios';

export const axiosRequest = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});