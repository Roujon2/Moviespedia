import React, {useEffect, useRef} from 'react'
import { useState } from 'react';
import './movieDetails.css'
import {HiCursorClick} from 'react-icons/hi'

import loadingIcon from '../../assets/loading_spinner.gif'

/* TODO:
  - Port all the css and jsx in MovieSearch to this - DONE
  - Fix genres - DONE
  - Design the css (add a flip card effect for poster on hover, displaying the director, actors, etc.) - DONE
  - Scroll down to the section when the button is clicked - DONE (fixed with timeout)
  - Add null movie handler
  - Add a loading screen - Almost done (need to get a proper loading icon)


*/

const MovieDetails = ({movieData}) => {
  // State variable controlling the poster flip
  const [flip, setFlip] = useState(false);

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
  if (!movieData) {
    return <div>Loading...</div>;
  }
  

  // Extracting information from the movieData object
  const title = movieData.original_title;
  // Getting the genres (if it exists) and mapping through it to get the genre names in an array
  const genres = movieData.genres?.map((genre) => genre.name);
  const posterPath = movieData.poster_path ? "https://image.tmdb.org/t/p/w500" + movieData.poster_path : '';
  const synopsis = movieData.overview;
  const credits = movieData.credits;


  return (
    <div ref={movieDetailsRef} className={`containter movie_info_container`}>
      <h2>{title}</h2>
      {/* Displays list of genres if it exists */}
      {genres && (
        <ul className='genre_list'>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      )}
      <div className={`movie_info`}>
        <div className="movie_card_container">
          {/* The card has a click listener, setting the class name to flipped or not depending on its state */}
          <div className={`movie_card ${flip ? 'flipped' : ''}`}>
            
            {/* Poster image, display hidden when loading */}
            <img src={posterPath} 
              alt="" 
              onClick={() => setFlip(!flip)}
              onLoad={handleImageLoad}
              style={{display: isLoading ? 'none' : 'block'}}
            />

            {isLoading && <div className="poster_loading">
              <img src={loadingIcon} alt="" /></div>}

            <div className="cast_info" onClick={() => setFlip(!flip)}>
              <h3>Directed by</h3>
              <h2 className='director'>{credits.director}</h2>  
              <ul>
                {credits.actors.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Little cursor icon */}
          <HiCursorClick className='cursor_icon'/>
        </div>
        
        <div className="synopsis_container">
          <p className='synopsis'>{synopsis}</p>
        </div>
    
      </div>
    </div>
  )
}

export default MovieDetails