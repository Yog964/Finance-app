/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import QuickCalc from './components/QuickCalc';
import ContactUs from './components/ContactUs';

function App() {
  const [currentView, setCurrentView] = useState('calculator');

  return (
    <div className="App gov-theme">
      <Navbar setCurrentView={setCurrentView} />
      
      <main id="main" className="gov-main-content">
        <div className="gov-container">
          {currentView === 'calculator' ? <QuickCalc /> : <ContactUs />}
        </div>
      </main>

      <footer className="gov-footer">
        <div className="gov-footer-content">
          <div className="footer-left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="footer-emblem" />
            <div className="footer-logo-text">
              <h4>Income Tax Department</h4>
              <p>Government of India</p>
            </div>
          </div>
          
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms & Conditions</a>
            <span className="separator">|</span>
            <a href="#">Contact Us</a>
            <span className="separator">|</span>
            <a href="#">Accessibility</a>
            <span className="separator">|</span>
            <a href="#">Helpdesk</a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '13px', opacity: 0.8, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
          <p style={{ margin: '0 0 5px 0' }}>For any issues or support, please contact: <a href="mailto:yogbari964@gmail.com" style={{ color: 'white', textDecoration: 'underline' }}>yogbari964@gmail.com</a></p>
          <p style={{ margin: '0 0 5px 0' }}>Aristos Group is managing this app.</p>
          <p style={{ margin: 0 }}>© 2026 Sushant Bari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
