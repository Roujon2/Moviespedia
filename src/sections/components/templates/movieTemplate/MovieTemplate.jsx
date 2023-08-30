import React, { useRef, useState} from 'react';

// Importing organisms
import MovieSearch from '../../organisms/movieSearch/MovieSearch.jsx';
import MovieDetails from '../../organisms/movieDetails/MovieDetails.jsx';
import SimilarMovies from '../../organisms/similarMovies/SimilarMovies.jsx';
import SearchResults from '../../organisms/searchResults/SearchResults.jsx';

// Importing the axiosRequest functions (api calls)
import { getMovieDetails, searchMovies } from '../../../../serverHandle/apiService';
// Importing data parser function
import { parseMovieData } from '../../../../serverHandle/movieDataParser';

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
  - Add scrollable container for similar movies - DONE
  - Add similar movies - DONE
  - Add clickable functionality on the similar movies - DONE
  - Display the first couple of search results when searched

*/

const MovieTemplate = () => {
    const [movieData, setMovieData] = useState(null);
    const [watchRegion, setWatchRegion] = useState('AR'); // Default region
    const [movieSearchResults, setMovieSearchResults] = useState([]); // State variable to hold the list of search results
    const [isLoading, setIsLoading] = useState(false);

    // Ref of the section
    const movieTemplateRef = useRef(null);

    // Function to handle the fetching of the search results
    const handleSearchResultsFetch = async (movieQuery) => {

      // Begin loading for the movie template
      handleLoading();

      // Get the search results
      const searchResults = await searchMovies(movieQuery);

      console.log(searchResults);

      if(searchResults.length === 0){
        // If the search results are empty, display the null movie in the movie details
        const movie = {
          state: false
        }
        handleMovieData(movie);
      }else{
        // Setting the data
        setMovieSearchResults(searchResults);
        setIsLoading(false);
      }
    };

    // Function to handle the fetching of a specific movie by id
    const handleMovieFetch = async (movieId) => {
      // Begin loading for the movie template
      handleLoading();

      // Get the details of the movie
      const movieInfo = await getMovieDetails(movieId);

      // Parsing the data
      const parsedMovieInfo = parseMovieData(movieInfo, watchRegion);

      // Setting the data
      handleMovieData(parsedMovieInfo);
    };

    // When the movie data is fetched and parsed
    const handleMovieData = (data) => {
        setMovieData(data);
        setIsLoading(false);
    };

    // When the region is changed from the dropdown
    const handleRegionChange = (selectedRegion) => {
      setWatchRegion(selectedRegion); // Watch region change for this component
    };

    // When the submit form button is clicked to handle the loading
    const handleLoading = () => {
        // Scroll to the top of the page
      setTimeout(() => {
        // Scroll to the MovieDetails section after a short delay
        movieTemplateRef.current.scrollIntoView({ behavior: 'smooth' });
      }); // Adjust the delay time as needed

        setIsLoading(true);

        // Set the data as null so that movieDetails resets to the default state
        setMovieData(null);

        // Set the seach results as empty so that the search results reset to the default state
        setMovieSearchResults([]);
    };

  return (
    <div className='movie_template_container' ref={movieTemplateRef}>
        {/* Component handling the movie search */}
        <MovieSearch onMovieFetched={handleMovieData} onLoading={handleLoading} isLoading={isLoading} watchRegionChange={handleRegionChange} onSearchResultsFetched={handleSearchResultsFetch} watchRegion={watchRegion}/>

        {/* Component handling the display of the movie search results */}
        {movieSearchResults.length > 0 && <SearchResults searchResults={movieSearchResults} onLoading={handleLoading} onMovieFetched={handleMovieFetch}/>}

        {/* Component handling the display of the movie details */}
        {movieData && <MovieDetails movieData={movieData}/>}

        {/* Component handling the display of the similar movies */}
        {movieData && <SimilarMovies movieData={movieData} onMovieFetched={handleMovieFetch} onLoading={handleLoading}/>}
    </div>
  )
}

export default MovieTemplate