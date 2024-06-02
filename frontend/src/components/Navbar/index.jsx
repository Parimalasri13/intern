// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Navbar() {
  return (
    <div className="top-container">
      <div className="header">
        <img src="logo192.png" alt="logo" className="logo" />
        <h3 className="title">For a change</h3>
      </div>
      <div className="options">
        <Link to="/" className='lk'>Home</Link>
        <Link to="/read" className='lk'>Favorites</Link>
        <Link to="/login" className='lk'>Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
