import React, {useState} from 'react';

// Importing organisms
import MovieSearch from '../../organisms/movieSearch/MovieSearch.jsx';
import MovieDetails from '../../organisms/movieDetails/MovieDetails.jsx';
import SimilarMovies from '../../organisms/similarMovies/SimilarMovies.jsx';

/* TODO:
  - Port all the css and jsx in MovieSearch to this - DONE
  - Fix genres - DONE
  - Design the css (add a flip card effect for poster on hover, displaying the director, actors, etc.) - DONE
  - Scroll down to the section when the button is clicked - DONE (fixed with timeout)
  - Add null movie handler (When the movie doesn't exist)
  - Add a loading screen - DONE
  - Add watch providers (with icons) -> Default US but set a dropbox for region - DONE
  - Customize the watch providers icons - DONE
  - Change up the region dropdown (add more regions) - DONE
  - Add a similar movies button - DONE
  - Add scrollable container for similar movies
  - Add similar movies

*/

const MovieTemplate = () => {
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // When the movie data is fetched and parsed
    const handleMovieData = (data) => {
        setMovieData(data);
        setIsLoading(false);
    };

    // When the submit form button is clicked to handle the loading
    const handleLoading = () => {
        setIsLoading(true);

        // Set the data as null so that movieDetails resets to the default state
        setMovieData(null);
    };

  return (
    <div className='movie_template_container'>
        {/* Component handling the movie search */}
        <MovieSearch onMovieFetched={handleMovieData} onLoading={handleLoading} isLoading={isLoading}/>

        {/* Component handling the display of the movie details */}
        {movieData && <MovieDetails movieData={movieData}/>}

        {/* Component handling the display of the similar movies */}
        {movieData && <SimilarMovies movieData={movieData}/>}
    </div>
  )
}

export default MovieTemplate