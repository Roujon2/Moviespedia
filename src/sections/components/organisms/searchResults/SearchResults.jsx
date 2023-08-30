import React from 'react'
import './searchResults.css'

// Import the movie poster component
import MoviePoster from '../../atoms/moviePoster/MoviePoster.jsx';


// Component in charge of displaying the movie search results in a clickable list
const SearchResults = ({ searchResults, onMovieFetched }) => {
  // When a search result movie is clicked
  const handleSearchMovieClick = async (movieId) => {
    // Callback to the movie template to fetch the movie data and display
    onMovieFetched(movieId);
  }

  return (
    <div className='search_results_list_container'>
        <h2>Search Results</h2>
        <div className="search_results_list">
            {searchResults.map((movie, index) => {
              return(
                <div className="search_result" key={index}>
                    <MoviePoster
                    posterPath={movie.poster_path}
                    alt={movie.title}
                    onImageLoad={null}
                    onCardClick={() => handleSearchMovieClick(movie.id)} // Function to handle when the card is clicked
                    />
                    <h4 className='result_title'>{movie.title}</h4>
                </div>)
            })}
        </div>
    </div>
  )
}

export default SearchResults