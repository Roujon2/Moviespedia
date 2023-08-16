import React from 'react'
import './similarMovies.css'

import SimilarMovieButton from '../../atoms/similarMovieButton/SimilarMovieButton.jsx'

const SimilarMovies = () => {
  return (
    <section>
        <div className="container similar_movies_container">
            <SimilarMovieButton onClick={() => null} isLoading={true}/>
        </div>
    </section>
  )
}

export default SimilarMovies