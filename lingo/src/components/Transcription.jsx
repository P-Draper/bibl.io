import React, {useState, useEffect} from 'react';
import axios from 'axios'

const LeftContainer = () => {

  const [currentTranscription, setcurrentTranscription] = useState([]);
  useEffect(()=>{
      axios.get('http://localhost:3001/getTranscription')
      .then(currentTranscription => setcurrentTranscription(currentTranscription.data))
      .catch(err => console.log(err))
      console.log(currentTranscription)
  }, [])

  return (
    <div className="container">
      <h2>Transcription</h2>
      {currentTranscription}
    </div>
  );
};

export default LeftContainer;