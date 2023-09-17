import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut({ username }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOutClick = () => {
    localStorage.removeItem('userInfo');
    window.location.reload();
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="signout-dropdown">
      <button className="signin-button" onClick={toggleDropdown}>
        {username ? username : 'Sign in'}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <button onClick={handleLogOutClick}>Sign Out</button>
          {/* Add other dropdown items if needed */}
        </div>
      )}
    </div>
  );
}

export default SignOut;
