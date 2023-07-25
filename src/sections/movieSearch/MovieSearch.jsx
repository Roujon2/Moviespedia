import React, { useRef } from 'react'
import './movieSearch.css'
import { useState } from 'react'
import { axiosRequest } from '../../api.js';

// Importing the movie details component
import MovieDetails from '../movieDetails/MovieDetails.jsx';


var api_key = process.env.REACT_APP_TMDB_API_KEY;


const MovieSearch = () => {
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');

    // Reference of the movie search input text field
    const movieQueryInputRef = useRef(null);


    const [data, setData] = useState(null);

    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    }

    // When the submit button is clicked
    const getData = async (event) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault();

        // Reset the text input field
        setMovieQuery('');

        // Removing the focus from the input field
        movieQueryInputRef.current.blur();

        axiosRequest.get(`/search/movie?query=${movieQuery}&include_adult=false&language=en-US&api_key=${api_key}`)
        .then((response) => {
            // Set the data to the first result
            const firstMovie = response.data.results[0];
            setData(firstMovie);
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
                        <input type="text" onChange={handleInputChange} name="movie_title" placeholder="Enter movie title" autoComplete="off" value={movieQuery} ref={movieQueryInputRef} required/>
                        <button type='submit' className='btn btn-primary'>Search</button>
                    </form>
                </div>

                <div className='movie_details_container'>
                    {/* Render MovieDetails if data is loaded */}
                    {data && <MovieDetails movieData={data}/>}
                </div>
            </div>
        </section>
    )
}

export default MovieSearch