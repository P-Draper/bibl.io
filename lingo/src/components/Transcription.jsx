import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { franc } from 'franc';

const LeftContainer = ({ wordList }) => {
  const [currentTranscription, setCurrentTranscription] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getTranscription');
        setCurrentTranscription(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTranscription();
  }, []);

  const renderHighlightedText = (text) => {
    const detectedLanguage = franc(text);

    const wordListPattern = new RegExp(`\\b(${wordList.join('|')})\\b`, 'gi');
    const parts = text.split(wordListPattern);
    const filteredParts = parts.filter((part) => {
      return /\D/.test(part);
    });
    return (
      <div>
        <p className='detected-lang'>{detectedLanguage.toUpperCase()}</p>
        {filteredParts.map((part, index) => {
          if (wordList.includes(part.toLowerCase())) {
            return <span key={index} style={{ color: 'red' }}>{part}</span>;
          }
          return part;
        })}
      </div>
    );
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {currentTranscription.map((item) => (
            <div key={item.id}>
              {renderHighlightedText(item.text)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftContainer;
