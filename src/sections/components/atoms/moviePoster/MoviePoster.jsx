import React from 'react'
import './moviePoster.css'

// Component dealing with the movie poster image
const MoviePoster = ({ posterPath, alt, onCardClick, onImageLoad, posterStyle }) => {

  // If the posterPath is null, undefined (doesn't exist), show the invalid poster
  return (
    posterPath ? (
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={alt}
        onClick={onCardClick}
        onLoad={onImageLoad}
        style={posterStyle}
        className='poster_image'
      />
    ) : (
      <h3 className='invalid_poster'
          onLoad={onImageLoad}>Poster not found</h3>
    )
  )
}

export default MoviePoster