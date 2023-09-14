import React, { useState } from 'react';
import './WordContainer.css'; // Import CSS file for styling

function WordContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState('');
  const [wordList, setWordList] = useState([]);

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  const addWord = () => {
    if (word.trim() !== '') {
      setWordList([...wordList, { text: word, isCompleted: false }]);
      setWord('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addWord();
    }
  };

  const toggleWordCompletion = (index) => {
    const updatedWordList = [...wordList];
    if (updatedWordList[index].isCompleted) {
      updatedWordList.splice(index, 1); // Remove the word from the array
    } else {
      updatedWordList[index].isCompleted = true; // Mark the word as completed
    }
    setWordList(updatedWordList);
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
          />
          <button onClick={addWord}>Add</button>
          <ul>
            {wordList.map((item, index) => (
              <li
                key={index}
                onClick={() => toggleWordCompletion(index)}
                style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WordContainer;
