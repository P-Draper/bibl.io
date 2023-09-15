import React, { useState } from 'react';
import LanguageDropdown from './LanguageDropdown';
import SignIn from './SignIn';
import axios from 'axios';
import MyWords from './MyWords';

const Header = ({ wordList, addWord, toggleWordCompletion }) => {
  const [url, setUrl] = useState('');
  const [desiredLanguage, setDesiredLanguage] = useState('');

  const handleLanguageChange = (language) => {
    setDesiredLanguage(language);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Your submit logic here
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
            <button type="submit">bibl.io!</button>
          </form>
        </div>
        <div className="header-right">
          <div className="language-and-signin">
            <LanguageDropdown onLanguageChange={handleLanguageChange} />
            <MyWords wordList={wordList} addWord={addWord} toggleWordCompletion={toggleWordCompletion} />
            <SignIn />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
