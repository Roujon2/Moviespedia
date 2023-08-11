import React from 'react'

import './searchForm.css'

// Molecule component for the movie search form, containing the input for the movie title search,
// the dropdown for the watch region, and the submit button

// Input component import
import InputTitleSearch from '../../atoms/inputTitleSearch/InputTitleSearch'
import WatchRegionDropdown from '../../atoms/watchRegionDropdown/WatchRegionDropdown'

const MovieSearchForm = ({handleSubmit, handleInputChange, watchRegion, handleRegionChange, movieQuery, inputRef}) => {

    return (
        <div className='fields_container'>
            <form action="" className='fields' onSubmit={handleSubmit}>
                <div className="input_container">
                    <InputTitleSearch 
                        handleInputChange={handleInputChange}
                        value={movieQuery}
                        inputRef={inputRef} // Passing the ref to the input component by assigning inputRef directly to ref attribute
                    />
                    <WatchRegionDropdown 
                        selectedRegion={watchRegion} 
                        onChange={handleRegionChange} 
                    />
                </div>
                <div className="submit_button_container">
                    <button type='submit' className='btn btn-primary'>Search</button>
                </div>
            </form>

        </div>
    )
}

export default MovieSearchForm