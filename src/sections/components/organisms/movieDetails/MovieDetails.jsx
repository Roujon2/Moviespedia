import React, { useRef } from 'react'
import { useState } from 'react';
import './movieDetails.css'
import {HiCursorClick} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'

// Importing atom components
import WatchProviders from '../../atoms/watchProviders/WatchProviders.jsx'

// Importing molecule components
import MovieHeader from '../../molecules/movieHeader/MovieHeader.jsx'
import MovieCard from '../../molecules/movieCard/MovieCard.jsx'

/*
  - Add runtime as a movie detail 
  - Add IMDB rating as a movie detail
*/

const MovieDetails = ({movieData}) => {
  // Component reference
  const movieDetailsRef = useRef(null);

  // State variable tracking the loading poster
  const [isLoading, setIsLoading] = useState(true);

  // Execute when the poster image is loaded
  const handleImageLoad = () => {
    // To display the image
    setIsLoading(false);

    // Scroll down to the movie details section with a timeout
    setTimeout(() => {
      // Scroll to the MovieDetails section after a short delay
      movieDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Adjust the delay time as needed
  };
  
  // Handle null movie data
  if (!movieData.state) {
    return <div className='null_movie'>
      <h2>Movie not found</h2>
    </div>;
  }

  // Extracting information from the movieData object
  const title = movieData.original_title;
  // Getting the genres (if it exists) and mapping through it to get the genre names in an array
  const genres = movieData.genres?.map((genre) => genre.name);
  const posterPath = movieData.poster_path ? "https://image.tmdb.org/t/p/w500" + movieData.poster_path : null;
  const synopsis = movieData.overview;
  const credits = movieData.credits;
  const runtime = movieData.runtime;
  const rating = movieData.rating;

  return (
    <section>
      <div ref={movieDetailsRef} className={`containter movie_info_container`}>
        
        {/* Movie header */}
        <MovieHeader title={title} genres={genres}/>

        <div className={`movie_info`}>
          <div className="movie_card_providers_container">
            <div className="movie_card_container">
              
              <MovieCard
                posterPath={posterPath}
                credits={credits}
                isLoading={isLoading}
                handleImageLoad={handleImageLoad}
              />

              {/* Little cursor icon */}
              {posterPath && <HiCursorClick className='cursor_icon'/>}
            </div>
            
            {/* Watch providers */}
            <WatchProviders watchProviders={movieData.watchProviders}/>
          </div>
          
          <div className='extra_details_container'>
            <div className="synopsis_container">
              <p className='synopsis'>{synopsis}</p>
            </div>
            <div className="runtime_rating_container">
              <h3 className='runtime'>Runtime: {runtime}</h3>
              <h3>{rating}<AiFillStar/></h3>
            </div>
          </div>
      
        </div>
      </div>
    </section>
  )
}

export default MovieDetails