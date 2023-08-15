import React from 'react'
import './movieHeader.css'

// Component handling the movie title and genres
const MovieHeader = ({ title, genres }) => {
  return (
    <div className='movie_Header'>
        <h2 className='movie_title'>{title}</h2>
        {/* Displays list of genres if it exists */}
        {genres && (
            <ul className='genre_list'>
                {genres.map((genre, index) => (
                <li key={index}>{genre}</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default MovieHeader