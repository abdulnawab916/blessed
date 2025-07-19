import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Blessed Detailz</h1>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection('reviews')}>Reviews</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 