import React, { useState, useEffect } from 'react';
import LanguageDropdown from './LanguageDropdown';
import SignIn from './SignIn';
import axios from 'axios';

const Header = () => {
  const [url, setUrl] = useState('');
  const [desiredLanguage, setDesiredLanguage] = useState('');

  const handleLanguageChange = (language) => {
    setDesiredLanguage(language);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      /*
    POST request to perform audio conversion from client-served data.
    Processes goes like so:

    1.  Client receives URL from user input for high-level translation.
        (***THIS IS WHERE WE START!***)
            Data passed from client to Server Layer #1: MongoDB.
    2.  MongoDB receives URL from client for storage and translation.
            Data passed from Server Layer #1: MongoDB to Server Layer #2: Flask.
    3.  Flask receives URL from MongoDB for algorithmic conversion. 
            Flask invokes custom algorithms to perform conversion 
            from URL to MP3/Chunks, then passes converted audio from
            Flask back up to MongoDB.
    4.  MongoDB receives converted audio from Flask for storage and user serving.
            Data passed from Server Layer #2: Flask to Server Layer #1: MongoDB.
    5.  Client receives converted audio from MongoDB for user serving.
        (***THIS IS ALSO WHERE WE END!***)
            Data passed from Server Layer #1: MongoDB to client.
    */
      const response = await axios.post('http://localhost:3001/postUrl', {
        Url: url,
        DesiredLanguage: desiredLanguage,
      });
      console.log('Data posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <header>
      <div className="header-content">
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              spellCheck="false"
              value={url}
              placeholder="YouTube URL here!"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit">BIBL.IO!</button>
          </form>
        </div>
        <div className="header-right">
          <div className="language-and-signin">
            <LanguageDropdown onLanguageChange={handleLanguageChange} />
            <SignIn />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
