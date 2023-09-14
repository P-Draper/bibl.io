import React from 'react';
import './App.css';
import Header from './components/Header';
import Transcription from './components/Transcription';
import Translation from './components/Translation';
import Player from './components/Player';
import { useEffect, useState } from 'react';
import axios from 'axios'



function App() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/getUsers')
    .then(users => setUsers(users.data))
    .catch(err => console.log(err))
  }, [])

/*
  const [requestedAudio, setRequestedAudio] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/getAudio')
    .then(()=> console.log('wow'))
    .then(requestedAudio => setRequestedAudio(requestedAudio.data))
    .catch(err => console.log(err))
    console.log("anything", requestedAudio)
  }, [])
*/
  return (
    <div className="App">
      <Header />
      <Player />
      <div className="containers">
        <Transcription/>
        <Translation/>
      </div>
    </div>
  );
}

export default App;