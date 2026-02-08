import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleComingSoon = (e) => {
    if (e) e.preventDefault(); // Prevents page jump on '#' links
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Mobile Menu Toggle */}
          

          <div className="nav-logo">
            <img 
              src="https://github.com/user-attachments/assets/36a63ef5-ef47-4df8-8cad-ad5e3af7e002" 
              alt="FinVue" 
            />
            <span className="logo-text"></span>
          </div>

          {/* Links */}
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li><a href="#" onClick={handleComingSoon}>Dashboard</a></li>
            <li><a href="#" onClick={handleComingSoon}>Markets</a></li>
            <li><a href="#" onClick={handleComingSoon}>Portfolio</a></li>
            <li><a href="#" onClick={handleComingSoon}>Invest</a></li>
          </ul>

          <div className="nav-utils">
            <button className="icon-btn hide-mobile" onClick={handleComingSoon}>🔍</button>
            <button className="icon-btn" onClick={handleComingSoon}>
              🔔<span className="notification-dot"></span>
            </button>
            <div className="divider hide-mobile"></div>
            <div className="avatar" onClick={handleComingSoon}>G</div>
            <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
          </div>
        </div>
      </nav>

      {/* Toast Notification Container */}
      <div className={`toast-container ${showToast ? 'show' : ''}`}>
        <div className="toast-card">
          <div className="toast-icon">🚀</div>
          <div className="toast-body">
            <p className="toast-title">Coming Soon</p>
            <p className="toast-sub">This feature is currently under development.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;