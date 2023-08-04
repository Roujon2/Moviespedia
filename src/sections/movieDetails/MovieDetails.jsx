import React, {useEffect, useRef} from 'react'
import { useState } from 'react';
import './movieDetails.css'
import {HiCursorClick} from 'react-icons/hi'

/* TODO:
  - Port all the css and jsx in MovieSearch to this - DONE
  - Fix genres - DONE
  - Design the css (add a flip card effect for poster on hover, displaying the director, actors, etc.) - DONE
  - Scroll down to the section when the button is clicked - DONE (only works after the initial search)
  - Add null movie handler
  - Add a loading screen (this might solve the scroll down problem)


*/

const MovieDetails = ({movieData}) => {
  // State variable controlling the poster flip
  const [flip, setFlip] = useState(false);

  console.log(movieData);

  const movieDetailsRef = useRef(null);

  // useEffect hook
  useEffect(() => {
    // Scrolling down when the component is rendered
    if (movieData && movieDetailsRef.current) {
      movieDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [movieData]);

  
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

  /*
  // Hardcode cast data for the moment
  const cast = {
    director: 'Fincher',
    actors: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter']
  }
  */
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
            <img src={posterPath} alt="" onClick={() => setFlip(!flip)}/>

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