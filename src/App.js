import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [windowState, setWindowState] = useState([]);
  const [newNumbers, setNewNumbers] = useState([]);
  const [avg, setAvg] = useState(null);
  const windowSize = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/numbers');
      const fetchedNumbers = response.data;
      console.log(fetchedNumbers);
      const uniqueNewNumbers = fetchedNumbers.filter(num => !windowState.includes(num));

      if (uniqueNewNumbers.length === 0) {
        throw new Error('No new numbers fetched');
      }

      const updatedWindowState = windowState.concat(uniqueNewNumbers).slice(-windowSize);
      setWindowState(updatedWindowState);

      const prevAverage = updatedWindowState.length < windowSize ? null : calculateAverage(updatedWindowState);

      setNewNumbers(uniqueNewNumbers);
      setAvg(prevAverage);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  // Function to calculate average
  const calculateAverage = (arr) => {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return sum / arr.length;
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>Window Prev State: {JSON.stringify(windowState)}</p>
      <p>New Numbers: {JSON.stringify(newNumbers)}</p>
      <p>Average: {avg !== null ? avg.toFixed(2) : 'Not available'}</p>
    </div>
  );
};

export default AverageCalculator;
