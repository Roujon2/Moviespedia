import React, {useState} from 'react';
import MovieSearch from '../../organisms/movieSearch/MovieSearch.jsx';
import MovieDetails from '../../../movieDetails/MovieDetails.jsx';

const MovieTemplate = () => {
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // When the movie data is fetched and parsed
    const handleMovieData = (data) => {
        setMovieData(data);
        setIsLoading(false);
    };

    // When the submit button is clicked to handle the loading
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
    </div>
  )
}

export default MovieTemplate