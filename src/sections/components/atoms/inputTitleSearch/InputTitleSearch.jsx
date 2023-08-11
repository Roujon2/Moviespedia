import React from 'react'
import './inputTitleSearch.css'

// Input for the movie title search, having the handleInputChange function, the value, and the ref passed
// as props from a parent component

const InputTitleSearch = ({handleInputChange, value, inputRef}) => {
  return (
    <input
        className='input_title_search'
        type='text'
        onChange={handleInputChange}
        name='movie_title'
        placeholder='Enter movie title'
        autoComplete='off'
        value={value}
        ref={inputRef}
        required/>
  )
}

export default InputTitleSearch