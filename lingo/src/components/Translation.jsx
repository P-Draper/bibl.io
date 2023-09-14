import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeftContainer = () => {
  const [currentTranslation, setCurrentTranslation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/getTranslation')
      .then((response) => {
        setCurrentTranslation(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div className="container">
      <h2>Translation</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {currentTranslation.map((item) => (
            <div key={item.id}>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftContainer;
