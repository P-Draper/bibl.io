import React, { useState } from 'react';
import './WordContainer.css';

const MyWords = ({ wordList, addWord, toggleWordCompletion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState('');

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!wordList.some((item) => item.text === word)) {
        addWord(word);
      }
      setWord('');
    }
  };

  return (
    <div className="word-container">
      <button className="mywords-button" onClick={toggleContainer}>
        My Words
      </button>
      {isOpen && (
        <div className="word-list-container">
          <input
            type="text"
            placeholder="Enter a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyPress={handleKeyPress}
            className='word-input'
          />
          <button onClick={() => addWord(word)}>Add</button>
          <ul>
            {wordList.map((item, index) => (
              <ul
                key={index}
                onClick={() => toggleWordCompletion(index)}
                style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}
              >
                {item.text}
              </ul>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyWords;
