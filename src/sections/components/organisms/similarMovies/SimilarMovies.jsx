import React, { useState } from 'react'
import './similarMovies.css'

// Api fetch method import
import { getSimilarMovies } from '../../../../backend/apiService';

import SimilarMovieButton from '../../atoms/similarMovieButton/SimilarMovieButton.jsx'
import SimilarMovieSwiper from '../../molecules/similarMovieSwiper/SimilarMovieSwiper.jsx'

/* 
  TODO:
  - Handle error when the similar movies are not found
  - Handle when the poster is not found
*/

const SimilarMovies = ({ movieData }) => {
  // State variable to hold the list of similar movies
  const [similarMovies, setSimilarMovies] = useState([]);

  // State variable to handle when the button is clicked to disable it
  const [isSimilarButtonClicked, setIsSimilarButtonClicked] = useState(false);

  // State variable to manage the loading state of the similar movies render
  const [isLoading, setIsLoading] = useState(false);

  // When the get similar movies is clicked
  const handleGetSimilarClick = async () => {
    try{
      // Begin loading
      setIsLoading(true);

      // Get the first 10 similar movies
      const similarMoviesData = await getSimilarMovies(movieData.id);

      // Set the similar movies
      setSimilarMovies(similarMoviesData);
    
    }catch(error){
      console.log(error);
    }finally{
      // End loading
      setIsLoading(false);
      setIsSimilarButtonClicked(true);
    }
  };

  return (
    <section>
        <div className="similar_movies_container">
          {/* Handles when the get similar button is clicked */}
          {isSimilarButtonClicked ? (
            <SimilarMovieSwiper similarMovies={similarMovies}/>
          ) : (
            <SimilarMovieButton onClick={handleGetSimilarClick} isLoading={isLoading}/>
          )}  
        </div>
    </section>
  )
}

export default SimilarMovies