import React, { useState, useEffect, useRef } from "react";
import "./QuickCalc.css";
import { calculateQuickTax } from "../utils/taxCalculator";
import ResultCard from "./ResultCard";

const QuickCalc = () => {
  const resultRef = useRef(null);

  const [formData, setFormData] = useState({
    annualIncome: "",
    ageGroup: "below60",
    regime: "new",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");

    try {
      const calculationResult = calculateQuickTax(
        formData.annualIncome,
        formData.ageGroup,
        formData.regime,
      );
      setResult(calculationResult);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const handleReset = () => {
    setFormData({
      annualIncome: "",
      ageGroup: "below60",
      regime: "new",
    });
    setResult(null);
    setError("");
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  return (
    <div className="gov-form-container">
      <div className="calc-header-gov">
        <div className="calc-icon-gov">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>
        </div>
        <div className="calc-title-gov">
          <h2>Tax Calculator</h2>
          <p>Calculate your estimated income tax based on the latest applicable rules.</p>
        </div>
      </div>
      
      <div className="calc-divider"></div>

      <form onSubmit={handleCalculate} className="calc-form-gov">
        <div className="form-group-gov">
          <label htmlFor="annualIncome">
            Annual Income (₹) <span className="required-star">*</span>
          </label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            placeholder="Enter your annual income"
            min="0"
            step="1000"
            required
            className="input-text-gov"
          />
        </div>

        <div className="form-group-gov">
          <label>
            Age Group <span className="required-star">*</span>
          </label>
          <div className="radio-group-gov">
            <label className="radio-label-gov">
              <input
                type="radio"
                name="ageGroup"
                value="below60"
                checked={formData.ageGroup === "below60"}
                onChange={handleInputChange}
              />
              <span className="radio-text">Below 60 years</span>
            </label>
            <label className="radio-label-gov">
              <input
                type="radio"
                name="ageGroup"
                value="60-80"
                checked={formData.ageGroup === "60-80"}
                onChange={handleInputChange}
              />
              <span className="radio-text">60 - 80 years</span>
            </label>
            <label className="radio-label-gov">
              <input
                type="radio"
                name="ageGroup"
                value="above80"
                checked={formData.ageGroup === "above80"}
                onChange={handleInputChange}
              />
              <span className="radio-text">Above 80 years</span>
            </label>
          </div>
        </div>

        <div className="form-group-gov">
          <label>
            Tax Regime <span className="required-star">*</span>
          </label>
          <div className="regime-group-gov">
            <label className={`regime-box ${formData.regime === "new" ? "active" : ""}`}>
              <input
                type="radio"
                name="regime"
                value="new"
                checked={formData.regime === "new"}
                onChange={handleInputChange}
                className="hidden-radio"
              />
              <div className="custom-radio">
                <div className={`radio-inner ${formData.regime === "new" ? "checked" : ""}`}></div>
              </div>
              <span className="regime-text">New Tax Regime</span>
            </label>
            <label className={`regime-box ${formData.regime === "old" ? "active" : ""}`}>
              <input
                type="radio"
                name="regime"
                value="old"
                checked={formData.regime === "old"}
                onChange={handleInputChange}
                className="hidden-radio"
              />
              <div className="custom-radio">
                <div className={`radio-inner ${formData.regime === "old" ? "checked" : ""}`}></div>
              </div>
              <span className="regime-text">Old Tax Regime</span>
            </label>
          </div>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <div className="form-actions-gov">
          <button type="submit" className="btn-primary-gov">
            Calculate Tax
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary-gov"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div ref={resultRef} className="result-wrapper">
          <ResultCard result={result} showBreakdown={true} />
        </div>
      )}
    </div>
  );
};

export default QuickCalc;
