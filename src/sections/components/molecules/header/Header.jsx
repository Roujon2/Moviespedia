import React from 'react'
import './header.css'

// Header component, displays the title and a description

const Header = () => {
  return (
    <div className='header_container'>
        <h1>MoviesPedia</h1>
        <h3>Search movie Title</h3>
    </div>
  )
}

export default Header