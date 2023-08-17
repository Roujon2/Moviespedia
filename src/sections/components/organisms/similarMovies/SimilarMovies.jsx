import React, { useRef, useState } from 'react'
import './similarMovies.css'

// Api fetch method import
import { getSimilarMovies } from '../../../../backend/apiService';

import SimilarMovieButton from '../../atoms/similarMovieButton/SimilarMovieButton.jsx'
import SimilarMovieSwiper from '../../molecules/similarMovieSwiper/SimilarMovieSwiper.jsx'

// Importing the axiosRequest functions (api calls)
import { getMovieDetails } from '../../../../backend/apiService';
// Importing data parser function
import { parseMovieData } from '../../../../backend/movieDataParser';

/* 
  TODO:
  - Handle error when the similar movies are not found
  - Handle when the poster is not found - DONE
*/

const SimilarMovies = ({ movieData, onSimilarMovieFetched, onLoading }) => {
  // State variable to hold the list of similar movies
  const [similarMovies, setSimilarMovies] = useState([]);

  // Ref of the section
  const similarMoviesRef = useRef(null);

  // State variable to handle when the button is clicked to disable it
  const [isSimilarButtonClicked, setIsSimilarButtonClicked] = useState(false);

  // State variable to manage the loading state of the similar movies render
  const [isLoading, setIsLoading] = useState(false);

  // Handle null movie data
  if (!movieData.state) {
    return <div className='null_movie'>
    </div>;
  }

  // Execute when the similar movies swiper is loaded
  const handleSwiperLoad = () => {
    // To display the image
    setIsLoading(false);

    // Scroll down to the movie details section with a timeout
    setTimeout(() => {
      // Scroll to the MovieDetails section after a short delay
      similarMoviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Adjust the delay time as needed
  };

  // When the get similar movies is clicked
  const handleGetSimilarClick = async () => {
    try{
      // Begin loading
      setIsLoading(true);

      // Get the first 10 similar movies
      const similarMoviesData = await getSimilarMovies(movieData.id);

      // Just in case the data is null
      if(similarMoviesData){
        // Looping through the list of simiar movies
        for(const movie of similarMoviesData){
          // If the movie doesn't have a poster, remove it from the list
          if(!movie.poster_path){
            similarMoviesData.splice(similarMoviesData.indexOf(movie), 1);
          }
        }

        // Set the similar movies
        setSimilarMovies(similarMoviesData); 
      }else{
        // Set the similar movies as null
        setSimilarMovies(null);
      }
    
    }catch(error){
      console.log(error);
    }finally{
      // End loading
      setIsLoading(false);
      setIsSimilarButtonClicked(true);
    }
  };

  // When a similar movie card is clicked
  const handleSimilarMovieClick = async (movieId) => {
    // Begin loading for the movie template
    onLoading();

    const movieInfo = await getMovieDetails(movieId);

    // Parsing the data
    const parsedMovieInfo = parseMovieData(movieInfo, movieData.watchRegion);

    // Setting the data
    onSimilarMovieFetched(parsedMovieInfo);

  }

  return (
    <section>
        <div className="container similar_movies_container" ref={similarMoviesRef}>
          {/* Handles when the get similar button is clicked */}
          {isSimilarButtonClicked ? (
            <>
            {similarMovies ? (
              <SimilarMovieSwiper similarMovies={similarMovies} onSwiperLoad={handleSwiperLoad} onCardClick={handleSimilarMovieClick}/>
            ) : (
              <h3 className='null_similar'>Similar movies not found</h3>
            )}
          </>
          ) : (
            <SimilarMovieButton onClick={handleGetSimilarClick} isLoading={isLoading}/>
          )}  
        </div>
    </section>
  )
}

export default SimilarMovies