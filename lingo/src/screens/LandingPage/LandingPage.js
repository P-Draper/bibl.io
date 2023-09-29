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
  const [newRender, setNewRender] = useState(true)
  const [loading, setLoading] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [username, setUsername] = useState('')
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

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const userUsername = userInfo.username;
      setUsername(userUsername);
    }
  }, []);

const [videoTitle, setVideoTitle] = useState('');

useEffect(() => {
  if (url.trim() !== '') {
    const apiKey = ''
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
    <Header wordList={wordList} addWord={addWord} toggleWordCompletion={toggleWordCompletion} url={url} setUrl={handleUrlChange} username={username} loading={loading} setLoading={setLoading} newRender={newRender} setNewRender={setNewRender}/>
    <Player newRender={newRender} setNewRender={setNewRender}/>
    <div>
      <ContainerHead videoTitle={videoTitle} newRender={newRender} setNewRender={setNewRender}/>
    </div>
    {
      !newRender && 
      <div className="containers">
        <Transcription wordList={wordList} loading={loading} setLoading={setLoading} newRender={newRender} setNewRender={setNewRender}/>
        <Translation loading={loading} setLoading={setLoading} newRender={newRender} setNewRender={setNewRender}/>
      </div>
    }
    <div>
      <Footer/>
    </div>
  </div>
);

}

export default App;
