import React from 'react';
import './styles.css';

const imgBasePath = "img/logos/";

const Navbar = ({ logo }) => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={`${imgBasePath}${logo}.png`} alt="Logo" className="logo" />
      </div>
    </nav>
  );
}

export default Navbar;
