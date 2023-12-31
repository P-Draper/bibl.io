import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { franc } from 'franc';

const POLL_INTERVAL = 5000

const LeftContainer = ({ wordList, loading, setLoading, newRender, setNewRender  }) => {
  const [currentTranscription, setCurrentTranscription] = useState(null);
  

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
  const interval = setInterval(fetchTranscription, POLL_INTERVAL); 

    return () => clearInterval(interval);
  }, []);

  const renderHighlightedText = (text) => {
    const detectedLanguage = franc(text);

    const words = text.split(/\b/);

    return (
      <div>
        <p className='detected-lang'>{detectedLanguage.toUpperCase()}</p>
        {words.map((word, index) => {
          const lowerCaseWord = word.toLowerCase();
          if (wordList.includes(lowerCaseWord)) {
            return <span key={index} style={{ backgroundColor: 'red' }}>{word}</span>;
          }
          return <span key={index}>{word}</span>;
        })}
      </div>
    );
  };

  return (
    newRender ? <div></div> : (
      <div className="container">
          <div>{loading ? (
          <div></div>
        ) : (
            <div>
              {currentTranscription && renderHighlightedText(currentTranscription.text)}
            </div>
        )}
          </div>
      </div>
    )
  );
}
export default LeftContainer;
