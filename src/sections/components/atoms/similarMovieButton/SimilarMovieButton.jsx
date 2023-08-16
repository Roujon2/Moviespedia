import React from 'react'
import './similarMovieButton.css'

// Component handling the display of the similar movie button, turning into a loading text when clicked
const SimilarMovieButton = ({ onClick, isLoading }) => {
  return (
    <div className="similar_button_container">
        {isLoading ? (
            <div className="loading_text">Loading...</div>
        ) : (
            <button className={`btn btn-primary similar_movie_button`} onClick={onClick} disabled={isLoading}>Similar Movies</button>
        )}
    </div>
  )
}

export default SimilarMovieButton