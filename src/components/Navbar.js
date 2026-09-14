/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ setCurrentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const changeFontSize = (size) => {
    if (size === 'decrease') {
      document.body.style.zoom = '90%';
    } else if (size === 'increase') {
      document.body.style.zoom = '110%';
    } else {
      document.body.style.zoom = '100%';
    }
  };

  const handleComingSoon = (e) => {
    if (e) e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <header className="gov-header">
        <div className="gov-top-bar">
          <div className="gov-logo-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="gov-emblem" />
            <div className="gov-logo-text">
              <h1>Income Tax Department</h1>
              <p>Government of India</p>
            </div>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
          <div className={`gov-top-right ${isOpen ? 'open' : ''}`}>
            <div className="gov-top-links">
              <span className="font-resizer" style={{ borderLeft: 'none' }}>
                <button onClick={() => changeFontSize('decrease')}>A-</button>
                <button onClick={() => changeFontSize('normal')}>A</button>
                <button onClick={() => changeFontSize('increase')}>A+</button>
              </span>
              <div className="lang-select">
                English <span className="arrow">▼</span>
              </div>
            </div>
            <div className="gov-search-bar">
              <input type="text" placeholder="Search on Income Tax Portal" />
              <button className="search-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </div>
        </div>
        <nav className="gov-nav-menu">
          <ul className={`gov-nav-links ${isOpen ? 'open' : ''}`}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('calculator'); }}>Home</a></li>
            <li><a href="#main" className="active" onClick={() => setCurrentView('calculator')}>Tax Calculator</a></li>
            <li><a href="#" onClick={handleComingSoon}>Tax Information <span className="arrow">▼</span></a></li>
            <li><a href="#" onClick={handleComingSoon}>Downloads <span className="arrow">▼</span></a></li>
            <li><a href="#" onClick={handleComingSoon}>Help</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('contact'); setIsOpen(false); }}>Contact Us</a></li>
          </ul>
        </nav>
        {showBanner && (
          <div className="gov-announcement">
            <div className="announcement-left">
              <span className="megaphone">📢</span>
              <span className="announcement-text">For the latest updates on Income Tax, please visit the official website of Income Tax Department.</span>
            </div>
            <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noreferrer" className="view-all">View all updates →</a>
          </div>
        )}
      </header>

      <div className={`toast-container ${showToast ? 'show' : ''}`}>
        <div className="toast-card">
          <div className="toast-icon">🚀</div>
          <div className="toast-body">
            <p className="toast-title">Coming Soon</p>
            <p className="toast-sub">This page is currently under development.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;