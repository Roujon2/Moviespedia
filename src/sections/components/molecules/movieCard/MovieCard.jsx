import React, { useState } from 'react'
import './movieCard.css'

import { Ring } from 'react-awesome-spinners'

// Importing atom components 
import MoviePoster from '../../atoms/moviePoster/MoviePoster.jsx'
import CastInfo from '../../atoms/castInfo/CastInfo.jsx'

// Component handling the movie card with poster and cast info with a flipping animation
const MovieCard = ({ posterPath, credits, isLoading, handleImageLoad }) => {
    const [flip, setFlip] = useState(false);

    // The card has a click listener, setting the class name to flipped or not depending on its state 
  return (
    <div className={`movie_card ${flip ? 'flipped' : ''}`}>
        {/* Movie poster component */}
        <MoviePoster
            posterPath={posterPath}
            alt={""}
            onCardClick={() => setFlip(!flip)}
            onImageLoad={handleImageLoad}
            posterStyle={{ display: isLoading ? 'none' : 'block' }}
        />

        {/* For when the poster image is loading */}
        {isLoading && posterPath && <div className="poster_loading">
            <Ring 
            color="#0d0110b5"/>
        </div>}

        {/* Cast info component */}
        <CastInfo
            credits={credits}
            onCardClick={() => setFlip(!flip)}
        />
    </div>
  )
}

export default MovieCard