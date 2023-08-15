import React from 'react'
import './moviePoster.css'

// Component dealing with the movie poster image
const MoviePoster = ({ src, alt, onClick, onLoad, style }) => {
  return (
    <img
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={onLoad}
        style={style}
    />
   
  )
}

export default MoviePoster