import React from 'react';
import './TaxInformation.css';

const TaxInformation = () => {
  return (
    <div className="tax-info-container">
      <div className="tax-info-header">
        <h2>Tax Calculation Logic</h2>
        <p>Understand exactly how your taxes are computed under the hood.</p>
      </div>

      <div className="tax-info-content">
        
        <div className="info-section">
          <h3>1. Gross Income & Standard Deduction</h3>
          <p>The first step is applying the mandatory <strong>Standard Deduction</strong> to your Gross Annual Income.</p>
          <ul>
            <li><strong>New Regime:</strong> Flat deduction of <strong>₹75,000</strong></li>
            <li><strong>Old Regime:</strong> Flat deduction of <strong>₹50,000</strong></li>
          </ul>
          <p><em>Formula: Taxable Income = Gross Income - Standard Deduction (- Other Deductions in Old Regime)</em></p>
        </div>

        <div className="info-section">
          <h3>2. Tax Slabs & Rates</h3>
          <p>Your Taxable Income is then broken down and taxed across the following brackets.</p>
          
          <div className="slab-grids">
            <div className="slab-card new-regime-card">
              <h4>New Regime (FY 2025-26)</h4>
              <p className="slab-note">Same for all age groups.</p>
              <table className="slab-table">
                <thead>
                  <tr><th>Income Bracket</th><th>Tax Rate</th></tr>
                </thead>
                <tbody>
                  <tr><td>Up to ₹4,00,000</td><td>0% (Nil)</td></tr>
                  <tr><td>₹4,00,001 - ₹8,00,000</td><td>5%</td></tr>
                  <tr><td>₹8,00,001 - ₹12,00,000</td><td>10%</td></tr>
                  <tr><td>₹12,00,001 - ₹16,00,000</td><td>15%</td></tr>
                  <tr><td>₹16,00,001 - ₹20,00,000</td><td>20%</td></tr>
                  <tr><td>₹20,00,001 - ₹24,00,000</td><td>25%</td></tr>
                  <tr><td>Above ₹24,00,000</td><td>30%</td></tr>
                </tbody>
              </table>
            </div>

            <div className="slab-card old-regime-card">
              <h4>Old Regime (FY 2024-25)</h4>
              <p className="slab-note">For individuals below 60 years.</p>
              <table className="slab-table">
                <thead>
                  <tr><th>Income Bracket</th><th>Tax Rate</th></tr>
                </thead>
                <tbody>
                  <tr><td>Up to ₹2,50,000</td><td>0% (Nil)</td></tr>
                  <tr><td>₹2,50,001 - ₹5,00,000</td><td>5%</td></tr>
                  <tr><td>₹5,00,001 - ₹10,00,000</td><td>20%</td></tr>
                  <tr><td>Above ₹10,00,000</td><td>30%</td></tr>
                </tbody>
              </table>
              <p className="slab-subnote">* Senior (60-80y): 0% up to ₹3L<br/>* Super Senior (>80y): 0% up to ₹5L</p>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>3. Section 87A Rebate & Marginal Relief</h3>
          <p>The government provides a rebate to waive off tax completely for incomes up to a certain limit.</p>
          <div className="rebate-grid">
            <div className="rebate-box">
              <h4>New Regime</h4>
              <ul>
                <li><strong>Rebate Limit:</strong> Up to ₹12 Lakhs Taxable Income.</li>
                <li><strong>Max Rebate Amount:</strong> ₹60,000.</li>
                <li><strong>Marginal Relief:</strong> If your income barely crosses ₹12 Lakhs, the tax payable will not exceed the income earned above ₹12 Lakhs.</li>
              </ul>
            </div>
            <div className="rebate-box">
              <h4>Old Regime</h4>
              <ul>
                <li><strong>Rebate Limit:</strong> Up to ₹5 Lakhs Taxable Income.</li>
                <li><strong>Max Rebate Amount:</strong> ₹12,500.</li>
                <li><strong>Marginal Relief:</strong> Not applicable in this bracket.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>4. Health & Education Cess</h3>
          <p>After calculating the tax and applying any rebates or marginal relief, a final <strong>4% Health & Education Cess</strong> is added to the computed tax.</p>
          <p><em>Formula: Final Tax Payable = (Computed Tax - Rebate - Marginal Relief) + 4% Cess</em></p>
        </div>

      </div>
    </div>
  );
};

export default TaxInformation;
