import React, {useEffect, useRef} from 'react'
import { useState } from 'react';
import './movieDetails.css'
import {HiCursorClick} from 'react-icons/hi'

import { Ring } from 'react-awesome-spinners'

/* TODO:
  - Port all the css and jsx in MovieSearch to this - DONE
  - Fix genres - DONE
  - Design the css (add a flip card effect for poster on hover, displaying the director, actors, etc.) - DONE
  - Scroll down to the section when the button is clicked - DONE (fixed with timeout)
  - Add null movie handler (When the movie doesn't exist)
  - Add a loading screen - Almost done (need to get a proper loading icon)
  - Add watch providers (with icons) -> Default US but set a dropbox for region

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
  if (!movieData.state) {
    return <div className='null_movie'>
      <h2>Movie not found</h2>
    </div>;
  }

  var providerLogos;

  // If the movie has watch providers
  if(movieData.watchProviders){
    // Function to get the watch provider icons depending on the list, returning the html
    providerLogos = movieData.watchProviders.map((provider, index) => {
      // Extract the logo url from the provider object
      const logoUrl = `https://image.tmdb.org/t/p/w500${provider.logo_path}`;

      // Initialize the provider link
      let providerLink = "";

      // Switch case to link to known providers
      switch(provider.provider_name){
        case "Netflix":
          providerLink = "https://www.netflix.com/";
          break;
        
        case "Amazon Prime Video":
          providerLink = "https://www.primevideo.com/";
          break;

        case "Disney Plus":
          providerLink = "https://www.disneyplus.com/";
          break;

        case "Star Plus":
          providerLink = "https://www.starplus.com/";
          break;

        case "HBO Max":
          providerLink = "https://www.hbomax.com/";
          break;

        case "MUBI":
          providerLink = "https://mubi.com/";
          break;

        case "Crave":
          providerLink = "https://www.crave.ca/";
          break;
        
        case "Hulu":
          providerLink = "https://www.hulu.com/";
          break;
        // Null if the provider is not known
        default:
          providerLink = null;
          break;
      }
      
      return (
        <div key={index} className='logo_container'>
          {/* If the providerLink exists, make it clickable and send it to the specified website */}
          {providerLink ? (
            <a
              href={providerLink}
              target='_blank'
              rel='noopener noreferrer'>
              <img
                key={index}
                src={logoUrl}
                alt={`${provider.provider_name} Logo`}
                className="provider_logo"
              />
            </a>
          ) : (
            <img
              key={index}
              src={logoUrl}
              alt={`${provider.provider_name} Logo`}
              className="provider_logo_unclickable"
            />
          )}
        </div>
      );
    });
  }
  

  // Extracting information from the movieData object
  const title = movieData.original_title;
  // Getting the genres (if it exists) and mapping through it to get the genre names in an array
  const genres = movieData.genres?.map((genre) => genre.name);
  const posterPath = movieData.poster_path ? "https://image.tmdb.org/t/p/w500" + movieData.poster_path : null;
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
        <div className="movie_poster_providers_container">
          <div className="movie_card_container">
            {/* The card has a click listener, setting the class name to flipped or not depending on its state */}
            <div className={`movie_card ${flip ? 'flipped' : ''}`}>
              
              {/* Poster image, display hidden when loading */}
              {posterPath ? ( // Check if posterPath is defined
                <img
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt=""
                    onClick={() => setFlip(!flip)}
                    onLoad={handleImageLoad}
                    style={{ display: isLoading ? 'none' : 'block' }}
                />
              ) : (
                <h3 className='invalid_poster'
                  onLoad={handleImageLoad}>Poster not found</h3>
              )}

              {isLoading && posterPath && <div className="poster_loading">
                <Ring 
                  color="#0d0110b5"/>
              </div>}

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
            {posterPath && <HiCursorClick className='cursor_icon'/>}
          </div>
          <div className="watch_provider_logos">
              {providerLogos}
          </div>
        </div>
        
        <div className="synopsis_container">
          <p className='synopsis'>{synopsis}</p>
        </div>
    
      </div>
    </div>
  )
}

export default MovieDetails