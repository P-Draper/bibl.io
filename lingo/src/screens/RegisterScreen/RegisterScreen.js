import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterScreen.css'; 
import axios from 'axios';

function RegisterScreen() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    }else{
      setMessage(null)
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          }
        }
        setLoading(true)
        const { data } = await axios.post(
          'http://localhost:3001/api/users',
          { username, password },
          config
        )
        setLoading(false)
        localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
        setError(error.response.data.message)
      }

    }
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-screen-container">
      <div className="register-screen-header">
        <a href="/" className="register-screen-home-link" onClick={handleLoginClick}>
          bibl.io
        </a>
      </div>
      <div className="register-screen-box">
        <form onSubmit={handleSubmit}>
          <div className="register-screen-form-group">
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
          <div className="register-screen-form-group">
          </div>
          <div className="register-screen-form-group">
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
          <div className="register-screen-form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-screen-button-container">
            <button type="submit">Register</button>
            <button className="register-screen-login-button" onClick={handleLoginClick}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
