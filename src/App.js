import React, { useState } from 'react';
import './App.css';
import './components/Roadmap.css';
import Navbar from './components/Navbar';
import QuickCalc from './components/QuickCalc';
import DetailedCalc from './components/DetailedCalc';

function App() {
  const [activeMode, setActiveMode] = useState('quick');

  return (
    <div className="App">
      <Navbar />

      <main className="main-content">
        <div className="container">
          {/* Mode Selection Tabs */}
          <div className="mode-selector">
            <button
              className={`mode-tab ${activeMode === 'quick' ? 'active' : ''}`}
              onClick={() => setActiveMode('quick')}
            >
              <span className="tab-icon">⚡</span>
              <div className="tab-content">
                <span className="tab-title">Quick Calculation</span>
                <span className="tab-desc">Fast & Simple</span>
              </div>
            </button>
            <button
              className={`mode-tab ${activeMode === 'detailed' ? 'active' : ''}`}
              onClick={() => setActiveMode('detailed')}
            >
              <span className="tab-icon">📋</span>
              <div className="tab-content">
                <span className="tab-title">Detailed Calculation</span>
                <span className="tab-desc">Comprehensive Analysis</span>
              </div>
            </button>
          </div>

          {/* Calculator Content */}
          <div className="calculator-content">
            {activeMode === 'quick' ? <QuickCalc /> : <DetailedCalc />}
          </div>

          {/* Info Section */}
          <div className="info-section">
            <h3>ℹ️ Important Information</h3>
            <div className="info-grid">
              <div className="info-card">
                <h4>📅 Financial Year</h4>
                <p>New Regime: FY 2025-26 | Old Regime: FY 2024-25</p>
              </div>
              <div className="info-card">
                <h4>🆕 New Tax Regime (FY 2025-26)</h4>
                <p>Enhanced slabs with ₹4L exemption. Standard deduction: ₹75,000</p>
              </div>
              <div className="info-card">
                <h4>📜 Old Tax Regime (FY 2024-25)</h4>
                <p>Allows deductions under 80C, 80D, etc. Standard deduction: ₹50,000</p>
              </div>
              <div className="info-card">
                <h4>💊 Health & Education Cess</h4>
                <p>4% cess is applicable on the total tax amount</p>
              </div>
            </div>
          </div>

          {/* Upcoming Features Section */}
          <div className="roadmap-section">
            <div className="roadmap-header">
              <h3>🚀 Upcoming Features</h3>
              <span className="roadmap-badge">Coming Soon</span>
            </div>
            <p className="roadmap-desc">We are working on powerful new tools to help you manage your wealth.</p>

            <div className="roadmap-grid">
              <div className="roadmap-card">
                <span className="roadmap-icon">📈</span>
                <h4>Portfolio Tracking</h4>
              </div>
              <div className="roadmap-card">
                <span className="roadmap-icon">💎</span>
                <h4>Investment Tracker</h4>
              </div>
              <div className="roadmap-card">
                <span className="roadmap-icon">🏦</span>
                <h4>EMI / Loan Calculator</h4>
              </div>
              <div className="roadmap-card">
                <span className="roadmap-icon">💡</span>
                <h4>SIP Investment Planner</h4>
              </div>
              <div className="roadmap-card">
                <span className="roadmap-icon">⚖️</span>
                <h4>Mutual Fund Comparison</h4>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Income Tax Calculator | For informational purposes only | @Yog964 </p>
        <p className="footer-note">Please consult a tax professional for accurate tax planning</p>
      </footer>
    </div>
  );
}

export default App;
