import React, { useState, useEffect } from 'react';
import '../../App.css';
import Header from '../../components/Header';
import Transcription from '../../components/Transcription';
import Translation from '../../components/Translation';
import Player from '../../components/Player';
import Footer from '../../components/Footer';
import ContainerHead from '../../components/ContainerHead';
import axios from 'axios';

function App() {
  const [wordList, setWordList] = useState([]);
  const addWord = (word) => {
    if (word.trim() !== '') {
      setWordList([...wordList, { text: word, isCompleted: false }]);
    }
  };

  const toggleWordCompletion = (index) => {
    const updatedWordList = [...wordList];
    if (updatedWordList[index].isCompleted) {
      updatedWordList.splice(index, 1);
    } else {
      updatedWordList[index].isCompleted = true;
    }
    setWordList(updatedWordList);
  };

  const [url, setUrl] = useState('');

  const handleUrlChange = (newUrl) => {
    setUrl(newUrl);
  };

const [videoTitle, setVideoTitle] = useState('');

useEffect(() => {
  if (url.trim() !== '') {
    const apiKey = 'AIzaSyDoufgxgfWbxd5YywuHm5WBYGxNP9r1oIU'
    const videoId = url.split('=')[1];
    const apiEndpoint = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    
    axios
      .get(apiEndpoint)
      .then((response) => {
        if (response.status === 200) {
          const title = response.data.items[0].snippet.title;
          setVideoTitle(title);
          console.log(`${title}`);
        } else {
          console.log('Failed to retrieve video title.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}, [url]);
  return (
    <div className="App">
      <Header wordList={wordList} addWord={addWord} toggleWordCompletion={toggleWordCompletion} url={url} setUrl={handleUrlChange}/>
      <Player />
      <div>
        <ContainerHead videoTitle={videoTitle}/>
      </div>
      <div className="containers">
        <Transcription wordList={wordList}/>
        <Translation />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
