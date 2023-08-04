import React, { useRef } from 'react'
import './movieSearch.css'
import { useState } from 'react'

// Importing the axiosRequest functions (api calls)
import { searchMovies, getMovieDetails } from '../../backend/apiService';

// Importing the movie details component
import MovieDetails from '../movieDetails/MovieDetails.jsx';

const MovieSearch = () => {
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');

    // Reference of the movie search input text field
    const movieQueryInputRef = useRef(null);

    const [data, setData] = useState(null);

    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    }

    // State variable tracking the loading (to update MovieDetails)
    const [isLoading, setIsLoading] = useState(false);

    // When the submit button is clicked
    const getData = async (event) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault();

        // Loading is true
        setIsLoading(true);

        // Reset the text input field
        setMovieQuery('');

        // Removing the focus from the input field
        movieQueryInputRef.current.blur();

        // Getting data from backend
        try{
            // Doing the search query and getting the first movie
            const searchResults = await searchMovies(movieQuery);
            const firstMovie = searchResults[0];

            // If the first movie exists, get the details
            if(firstMovie){
                const movieId = firstMovie.id;
                const movieInfo = await getMovieDetails(movieId);

                // Retrieving the cast details from the object
                // Making the credits object template
                const credits = {
                    director: '',
                    actors: []
                }

                // Getting first 2 actors' names
                credits.actors = movieInfo.credits.cast.slice(0, 2).map((actor)=>actor.name);

                // Getting the director's name
                for(const member of movieInfo.credits.crew){
                    if(member.job === 'Director'){
                        credits.director = member.name;
                        break;
                    }
                }

                // Deleting extra data
                delete movieInfo.credits;

                // Adding the cleaned and parsed credits to the movieInfo object
                movieInfo.credits = credits;

                setData(movieInfo);
                setIsLoading(false);
            }

        }catch(error){
            console.error(error);
        }

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
                    {isLoading ? <div>Loading...</div> : (data && <MovieDetails movieData={data} />)}
                </div>
            </div>
        </section>
    )
}

export default MovieSearch