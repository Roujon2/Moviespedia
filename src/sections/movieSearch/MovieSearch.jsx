import React, { useEffect, useRef } from 'react'
import './movieSearch.css'
import { useState } from 'react'

// Importing molecule components
import Header from '../components/molecules/header/Header.jsx';
import SearchForm from '../components/molecules/searchForm/SearchForm.jsx';

// Importing the axiosRequest functions (api calls)
import { searchMovies, getMovieDetails } from '../../backend/apiService';
// Importing data parser function
import { parseMovieData } from '../../backend/movieDataParser';

// Importing the movie details component
import MovieDetails from '../movieDetails/MovieDetails.jsx';


const MovieSearch = () => {
    
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');
    // Updating the movieQuery state variable when the user types
    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    };
    // Reference of the movie search input text field
    const movieQueryInputRef = useRef(null);

    // Movie data state variable
    const [data, setData] = useState(null);

    // Selected watch region state variable
    const [watchRegion, setWatchRegion] = useState('US'); // Default region

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
        if (movieQueryInputRef.current) {
            movieQueryInputRef.current.blur();
        }
      
        // Getting data and parsing from backend
        try{
            // Doing the search query and getting the first movie
            const searchResults = await searchMovies(movieQuery);
            const firstMovie = searchResults[0];

            // If the first movie exists, get the details
            if(firstMovie){
                const movieId = firstMovie.id;
                const movieInfo = await getMovieDetails(movieId);

                // Parsing the data
                const parsedMovieInfo = parseMovieData(movieInfo, watchRegion);

                // Setting the data
                setData(parsedMovieInfo);
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
                
                {/* Header component */}
                <Header />
                
                {/* Movie title Search form component*/}
                <SearchForm
                    handleSubmit={getData}
                    handleInputChange={handleInputChange}
                    watchRegion={watchRegion}
                    handleRegionChange={handleRegionChange}
                    movieQuery={movieQuery}
                    inputRef={movieQueryInputRef}
                />

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