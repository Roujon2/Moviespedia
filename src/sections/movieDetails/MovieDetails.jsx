import React from 'react'
import { useState } from 'react';
import './movieDetails.css'

/* TODO:
  - Port all the css and jsx in MovieSearch to this - DONE
  - Fix genres
  - Design the css (add a flip card effect for poster on hover, displaying the director, actors, etc.) - Almost done

*/

const MovieDetails = ({movieData}) => {
  // State variable controlling the poster flip
  const [flip, setFlip] = useState(false);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  // Extracting information from the movieData object
  const title = movieData.original_title;
  const genres = movieData.genres || movieData.genre_ids;
  const posterPath = movieData.poster_path ? "https://image.tmdb.org/t/p/w500" + movieData.poster_path : '';
  const synopsis = movieData.overview;

  // Hardcode cast data for the moment
  const cast = {
    director: 'Fincher',
    actors: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter']
  }


  return (
    <div className={`containter movie_info_container`}>
      <h2>{title}</h2>
      {/*<ul className='genre_list'>
        {
          // Creating the list of genres by mapping through the genre list TODO: Fix the genre list
          genres.map((genre, index) => {
            return (<li key={index}>{genre.name}</li>);
          })
        }
      </ul>*/}
      <div className={`movie_info`}>
        <div className="movie_card_container">
          {/* The card has a click listener, setting the class name to flipped or not depending on its state */}
          <div className={`movie_card ${flip ? 'flipped' : ''}`}>
            <img src={posterPath} alt="" onClick={() => setFlip(!flip)}/>

            <div className="cast_info" onClick={() => setFlip(!flip)}>
              <h3>Directed by {cast.director}</h3>
              <ul>
                {cast.actors.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
       
        <p className='synopsis'>{synopsis}</p>
      </div>
    </div>
  )
}

export default MovieDetails