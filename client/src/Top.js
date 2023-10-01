import React, { useState } from 'react';

function Top() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request using the input value
      const response = await fetch(`movies/${inputValue}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      // Update the state with the fetched data
      setData(responseData.express);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Top;
