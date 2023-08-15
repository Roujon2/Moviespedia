import React from 'react'
import './castInfo.css'

// Component handling the display of the movie cast info
const CastInfo = ({ credits, onCardClick }) => {

  return (
    <div className="cast_info" onClick={onCardClick}>
        <h3>Directed by</h3>
        <h2 className='director'>{credits.director}</h2>  
        <ul>
        {credits.actors.map((actor, index) => (
            <li key={index}>{actor}</li>
        ))}
        </ul>
    </div>
  )
}

export default CastInfo