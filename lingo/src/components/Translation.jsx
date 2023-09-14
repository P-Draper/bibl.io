import React, {useState, useEffect} from 'react';
import axios from 'axios'

const RightContainer = () => {

  const [currentTranslation, setcurrentTranslation] = useState([]);
  useEffect(()=>{
      axios.get('http://localhost:3001/getTranslation')
      .then(currentTranslation => setcurrentTranslation(currentTranslation.data))
      .catch(err => console.log(err))
      console.log(currentTranslation)
  }, [])

  return (
    <div className="container">
      <h2>Translation</h2>
      {currentTranslation}
    </div>
  );
};

export default RightContainer;