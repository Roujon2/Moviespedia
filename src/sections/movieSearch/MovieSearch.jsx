import React from 'react'
import './movieSearch.css'
import { useState, useEffect } from 'react'
import { axiosRequest } from '../../api.js';
import loading from '../../assets/loading_spinner.gif';

import nebula from '../../assets/Helix Nebula.jpg';


var api_key = process.env.REACT_APP_TMDB_API_KEY;


const MovieSearch = () => {
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');
    const [posterPath, setPosterPath] = useState(nebula);


    const [data, setData] = useState(null);

    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    }

    // When the submit button is clicked
    const getData = async (event) => {
        // Set the loading screen
        setPosterPath(loading);

        // Prevents the page from reloading when the form is submitted
        event.preventDefault();

        // Reset the text input field
        setMovieQuery('');

        axiosRequest.get(`/search/movie?query=${movieQuery}&include_adult=false&language=en-US&api_key=${api_key}`)
        .then((response) => {
            setData(response.data);
            console.log(response);

            // Check if the poster_path is available in the response
            const posterPath = response.data.results[0].poster_path || '';
            setPosterPath(posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : '');
        })
        .catch((err) => {
            console.log(err)
        })

    }

    return (
        <section>
            <div className="container movie_search_container">
                <h1>Movie Search</h1>
                <h3>Search movie Title</h3>
                <div className='fields_container'>
                    <form action="" className='fields' onSubmit={getData}>
                        <input type="text" onChange={handleInputChange} name="movie_title" placeholder="Enter movie title" value={movieQuery} required/>
                        <button type='submit' className='btn btn-primary'>Search</button>
                    </form>

                    <div className='movie_img'>
                        <img src={posterPath} alt="" />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieSearch