import React, { useRef } from 'react'
import './movieSearch.css'
import { useState } from 'react'

// Importing the loading animation component
import Loading from '../../atoms/loading/Loading.jsx';

// Importing molecule components
import Header from '../../molecules/header/Header.jsx';
import SearchForm from '../../molecules/searchForm/SearchForm.jsx';

// Importing the axiosRequest functions (api calls)
import { searchMovies, getMovieDetails } from '../../../../backend/apiService';
// Importing data parser function
import { parseMovieData } from '../../../../backend/movieDataParser';


const MovieSearch = ({ onMovieFetched, onLoading, isLoading }) => {
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');
    // Updating the movieQuery state variable when the user types
    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    };
    // Reference of the movie search input text field
    const movieQueryInputRef = useRef(null);

    // Selected watch region state variable
    const [watchRegion, setWatchRegion] = useState('AR'); // Default region

    // When the region is changed from the dropdown
    const handleRegionChange = (selectedRegion) => {
        setWatchRegion(selectedRegion);
    };

    // When the submit button is clicked
    const getData = async (event) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault(); 

        // Setting the loading animation
        onLoading();

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
                onMovieFetched(parsedMovieInfo);

            }else{ // Movie data is undefined (no movie with that search found)
                // Setting the data as invalid
                const movieInfo = {
                    state: false
                };

                // Setting the data
                onMovieFetched(movieInfo);
            }

        }catch(error){
            console.error(error);
            
            // Setting the data as invalid
            const movieInfo = {
                state: false
            };

            // Setting the data
            onMovieFetched(movieInfo);
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

                {/* Loading component */}
                {isLoading && <Loading/>}
                
            </div>
        </section>
    )
}

export default MovieSearch