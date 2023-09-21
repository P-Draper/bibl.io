import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import axios from 'axios'

function LoginScreen() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }

        setLoading(true)

        const { data } = await axios.post('http://localhost:3001/api/users/login', {
          username, password 
        },
        config
        )
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      navigate('/');
    } catch(error) {
      setError(error.response.data.message)
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="login-screen-container">
      <div className="login-screen-header">
        <a href="/" className="login-screen-home-link" onClick={handleHomeClick}>
          bibl.io
        </a>
      </div>
      <div className="login-screen-box">
        <form onSubmit={handleSubmit}>
          <div className="login-screen-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-screen-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-screen-button-container">
            <button type="submit">Sign in</button>
            <button className="login-screen-register-button" onClick={handleRegisterClick}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
