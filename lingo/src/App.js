import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Transcription from './components/Transcription';
import Translation from './components/Translation';
import Player from './components/Player';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const [wordList, setWordList] = useState([]); // Create the wordList state

  // Function to add a word to the wordList
  const addWord = (word) => {
    if (word.trim() !== '') {
      setWordList([...wordList, { text: word, isCompleted: false }]);
    }
  };

  // Function to toggle word completion
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
    <div className="App">
      <Header wordList={wordList} addWord={addWord} toggleWordCompletion={toggleWordCompletion} />
      <Player />
      <div className="containers">
        <Transcription wordList={wordList} />
        <Translation />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
