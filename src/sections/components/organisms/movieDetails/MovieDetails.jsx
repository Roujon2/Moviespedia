import React, { useRef } from 'react'
import { useState } from 'react';
import './movieDetails.css'
import {HiCursorClick} from 'react-icons/hi'

// Importing atom components
import WatchProviders from '../../atoms/watchProviders/WatchProviders.jsx'

// Importing molecule components
import MovieHeader from '../../molecules/movieHeader/MovieHeader.jsx'
import MovieCard from '../../molecules/movieCard/MovieCard.jsx'

/* TODO:
  - Port all the css and jsx in MovieSearch to this - DONE
  - Fix genres - DONE
  - Design the css (add a flip card effect for poster on hover, displaying the director, actors, etc.) - DONE
  - Scroll down to the section when the button is clicked - DONE (fixed with timeout)
  - Add null movie handler (When the movie doesn't exist)
  - Add a loading screen - DONE
  - Add watch providers (with icons) -> Default US but set a dropbox for region - DONE
  - Customize the watch providers icons - DONE
  - Change up the region dropdown (add more regions)
  - Add scrollable container for similar movies
  - Add similar movies

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
          
          <div className="synopsis_container">
            <p className='synopsis'>{synopsis}</p>
          </div>
      
        </div>
      </div>
    </section>
  )
}

export default MovieDetails