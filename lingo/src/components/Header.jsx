import React, { useState, useEffect } from 'react';
import LanguageDropdown from './LanguageDropdown';
import SignIn from './SignIn';
import axios from 'axios';
import MyWords from './MyWords';
import SignOut from './SignOut';

const Header = ({ wordList, addWord, toggleWordCompletion, url, setUrl, username, loading, setLoading, newRender, setNewRender }) => {
  const [desiredLanguage, setDesiredLanguage] = useState('');

  useEffect(() => {
    if (desiredLanguage === '') {
      setDesiredLanguage('🇺🇸 | English');
    }
  }, []);

  const handleLanguageChange = (language) => {
    setDesiredLanguage(language);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    setNewRender(false)
    try {
      if (url.includes('www.youtube.com')) {
        console.log('URL:', url);
        const response = await axios.post('http://localhost:3001/postUrl', {
          Url: url,
          DesiredLanguage: desiredLanguage,
        });
        console.log('Data posted successfully:', response.data);
      } else {
        console.log('URL does not contain www.youtube.com. Not setting the URL.');
      }
    } catch (error) {
      console.error('Error:', error);
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
            <button className='submit-button' type="submit-button">bibl.io!</button>
          </form>
        </div>
        <div className="header-right">
          <div className="language-and-signin">
            {/*<LanguageDropdown onLanguageChange={handleLanguageChange} newRender={newRender}/>*/}
            <MyWords wordList={wordList} addWord={addWord} toggleWordCompletion={toggleWordCompletion} newRender={newRender} />
            {username ? <SignOut username={username}/> : <SignIn />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
