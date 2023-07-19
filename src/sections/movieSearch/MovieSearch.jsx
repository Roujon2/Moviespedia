import React from 'react'
import './movieSearch.css'
import { useState, useEffect } from 'react'
import { axiosRequest } from '../../api.js';


var api_key = process.env.REACT_APP_TMDB_API_KEY;


const MovieSearch = () => {
    // Tracking the input of the user
    const [movieId, setMovieId] = useState('');
    const [posterPath, setPosterPath] = useState("https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg");


    const [data, setData] = useState(null);

    const handleInputChange = (event) => {
        setMovieId(event.target.value.toString());
    }

    // When the submit button is clicked
    const getData = async (event) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault();

        // Reset the text input field
        setMovieId('');

        axiosRequest.get(`/movie/${movieId}?api_key=${api_key}`)
        .then((response) => {
            setData(response.data);

            // Check if the poster_path is available in the response
            const posterPath = response.data.poster_path || '';
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
                <h3>Search movie with ID</h3>
                <div className='fields_container'>
                    <form action="" className='fields' onSubmit={getData}>
                        <input type="number" onChange={handleInputChange} name="movie_id" placeholder="Enter movie ID" value={movieId} required/>
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