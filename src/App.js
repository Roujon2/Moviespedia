import './App.css';
import React, { useState, useEffect } from 'react';
import MovieSearch from './sections/movieSearch/MovieSearch';


var test_key = process.env.REACT_APP_TEST_API_KEY;


function App(){
  return(
    <div>
      <MovieSearch/>
    </div>
  )
}


export default App;
