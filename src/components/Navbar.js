import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="navbar-icon">💰</span>
                    <h1 className="navbar-title">Income Tax Calculator</h1>
                </div>
                <div className="navbar-subtitle">
                    Calculate your tax liability instantly
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
