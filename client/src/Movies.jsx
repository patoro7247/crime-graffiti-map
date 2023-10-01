import React, { useState, useEffect } from 'react';

function Movies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to your API or server endpoint
    fetch('/movies') // Replace with your API endpoint
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the retrieved data
        console.log(responseData.express)
        setData(responseData.express);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Array of Objects</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
