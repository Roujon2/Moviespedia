import React, { useRef } from 'react'
import './movieSearch.css'
import { useState } from 'react'

// Importing the loading animation component
import Loading from '../../atoms/loading/Loading.jsx';

// Importing molecule components
import Header from '../../molecules/header/Header.jsx';
import SearchForm from '../../molecules/searchForm/SearchForm.jsx';

const MovieSearch = ({ onSearchResultsFetched, onLoading, isLoading, watchRegionChange, watchRegion }) => {
    // Tracking the input of the user
    const [movieQuery, setMovieQuery] = useState('');
    
    // Updating the movieQuery state variable when the user types
    const handleInputChange = (event) => {
        setMovieQuery(event.target.value.toString());
    };
    // Reference of the movie search input text field
    const movieQueryInputRef = useRef(null);

    // When the region is changed from the dropdown
    const handleRegionChange = (selectedRegion) => {
        watchRegionChange(selectedRegion); // Watch region change for the data in the movie template
    };

    // When the submit button is clicked
    const getData = async (event) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault(); 

        // Setting the loading animation
        onLoading();

        onSearchResultsFetched(movieQuery);

        // Reset the text input field
        setMovieQuery('');

        // Removing the focus from the input field
        if (movieQueryInputRef.current) {
            movieQueryInputRef.current.blur();
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