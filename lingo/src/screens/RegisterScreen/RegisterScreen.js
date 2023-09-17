import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterScreen.css'; // Create a new CSS file for styling if needed

function RegisterScreen() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);


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
