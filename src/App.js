import './App.css';
import React, { useState, useEffect } from 'react';

var test_key = process.env.REACT_APP_TEST_API_KEY;


function App() {

  const [data, setData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Api from https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/
    fetch(test_key)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setDataLoaded(true);})
      .catch(error => console.error(error));
  }, []);

  if (!dataLoaded) {
    return(
      <div>
        <h1>Loading... {test_key}</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Fetching Data from an API</h1>
      {
        data.map((item) => (
          <ol key={item.id}>
            User_Name: {item.username},
            Full_Name: { item.name },
            User_Email: { item.email }
          </ol>
        ))
      }
    </div>
  );
}

export default App;
