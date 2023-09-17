import React from 'react';
import { useNavigate } from 'react-router-dom';
function SignIn() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <button className="signin-button" onClick={handleLoginClick}>
      Sign in
    </button>
  );
}

export default SignIn;
