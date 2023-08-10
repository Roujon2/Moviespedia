import React, { useEffect, useRef } from 'react'
import './movieSearch.css'
import { useState } from 'react'

// Importing the axiosRequest functions (api calls)
import { searchMovies, getMovieDetails } from '../../backend/apiService';

// Importing the movie details component
import MovieDetails from '../movieDetails/MovieDetails.jsx';

// SOURCE OF WATCH PROVIDER DATA FROM JUSTWATCH AND TMDB
import WatchRegionDropdown from '../components/WatchRegionDropdown';


const MovieSearch = () => {
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');

    // Reference of the movie search input text field
    const movieQueryInputRef = useRef(null);

    // Movie data state variable
    const [data, setData] = useState(null);

    // Selected watch region state variable
    const [watchRegion, setWatchRegion] = useState('US'); // Default region

    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    }

    // State variable tracking the loading (to update MovieDetails)
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState(''); // For the loading dots

    // useEffect hook to update the loading dots
    useEffect(() => {
        if(isLoading){
            const interval = setInterval(() => {
            setLoadingDots((prevDots) => {
                return prevDots.length < 3 ? prevDots + '.' : ''; // Add a dot or reset
            });
            }, 500); // Delay time
            return () => clearInterval(interval); // Clean up the interval on unmount
        }
    }, [isLoading]);


    // When the region is changed from the dropdown
    const handleRegionChange = (selectedRegion) => {
        setWatchRegion(selectedRegion);
    };

    // When the submit button is clicked
    const getData = async (event) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault();

        //Resets the data
        setData(null); 

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

                // Adding the watch region with list of platforms to the movieInfo object
                const watchProviders = movieInfo["watch/providers"].results[watchRegion]?.flatrate;

                console.log(watchProviders);

                // Adding the watch providers list to the movieInfo object (may be undefined)
                movieInfo.watchProviders = watchProviders;

                // Setting the data as valid
                movieInfo.state = true;

                setData(movieInfo);
                setIsLoading(false);

            }else{ // Movie data is undefined (no movie with that search found)
                // Stop loading animation
                setIsLoading(false);

                // Setting the data as invalid
                const movieInfo = {
                    state: false
                };

                setData(movieInfo);
            }

        }catch(error){
            console.error(error);
        }

    }

    return (
        <section>
            <div className="container movie_search_container">
                <h1>Moviespedia</h1>
                <h3>Search movie Title</h3>
                <div className='fields_container'>
                    <form action="" className='fields' onSubmit={getData}>
                        <div className="input_container">
                            <input type="text" onChange={handleInputChange} name="movie_title" placeholder="Enter movie title" autoComplete="off" value={movieQuery} ref={movieQueryInputRef} required/>
                            <WatchRegionDropdown selectedRegion={watchRegion} onChange={handleRegionChange} />
                        </div>
                        <div className="submit_button_container">
                            <button type='submit' className='btn btn-primary'>Search</button>
                        </div>
                    </form>
                </div>

                <div className='movie_details_container'>
                    {/* Render MovieDetails if data is loaded */}
                    {isLoading ? (
                        <div className='loading_container'>
                            Loading{loadingDots}
                        </div>
                    ) : (
                        data && <MovieDetails movieData={data} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default MovieSearch