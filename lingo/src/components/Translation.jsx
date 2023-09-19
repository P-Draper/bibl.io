import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { franc } from 'franc';

const LeftContainer = () => {
  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detectedLanguage, setDetectedLanguage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/getTranslation')
      .then((response) => {
        setCurrentTranslation(response.data);
        setLoading(false);
        const language = detectLanguage(response.data.text);
        setDetectedLanguage(language);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const detectLanguage = (text) => {
    return franc(text);
  };

  return (
    <div className="container">
      <p className='detected-translation'>{detectedLanguage.toUpperCase()}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            {currentTranslation.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftContainer;
