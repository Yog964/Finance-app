import React, { useState } from 'react';
import './DetailedCalc.css';
import { calculateDetailedTax } from '../utils/taxCalculator';
import ResultCard from './ResultCard';

const DetailedCalc = () => {
    const [formData, setFormData] = useState({
        basicSalary: '',
        hra: '',
        otherAllowances: '',
        deduction80C: '',
        deduction80D: '',
        otherDeductions: '',
        ageGroup: 'below60',
        regime: 'new'
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        setError('');

        try {
            const calculationResult = calculateDetailedTax(formData);
            setResult(calculationResult);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    const handleReset = () => {
        setFormData({
            basicSalary: '',
            hra: '',
            otherAllowances: '',
            deduction80C: '',
            deduction80D: '',
            otherDeductions: '',
            ageGroup: 'below60',
            regime: 'new'
        });
        setResult(null);
        setError('');
    };

    return (
        <div className="detailed-calc">
            <div className="calc-header">
                <h2>📋 Detailed Calculation</h2>
                <p>Comprehensive tax calculation with deductions and allowances</p>
            </div>

            <form onSubmit={handleCalculate} className="calc-form">
                {/* Income Section */}
                <div className="form-section">
                    <h3 className="section-title">💰 Income Details</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="basicSalary">
                                Basic Salary (₹) <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                id="basicSalary"
                                name="basicSalary"
                                value={formData.basicSalary}
                                onChange={handleInputChange}
                                placeholder="Enter basic salary"
                                min="0"
                                step="1000"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hra">HRA (₹)</label>
                            <input
                                type="number"
                                id="hra"
                                name="hra"
                                value={formData.hra}
                                onChange={handleInputChange}
                                placeholder="House Rent Allowance"
                                min="0"
                                step="1000"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="otherAllowances">Other Allowances (₹)</label>
                        <input
                            type="number"
                            id="otherAllowances"
                            name="otherAllowances"
                            value={formData.otherAllowances}
                            onChange={handleInputChange}
                            placeholder="Travel, Medical, etc."
                            min="0"
                            step="1000"
                        />
                    </div>
                </div>

                {/* Tax Regime Selection */}
                <div className="form-section">
                    <h3 className="section-title">📊 Tax Regime</h3>
                    <div className="toggle-group">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.regime === 'new' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, regime: 'new' }))}
                        >
                            New Regime
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.regime === 'old' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, regime: 'old' }))}
                        >
                            Old Regime
                        </button>
                    </div>
                    {formData.regime === 'new' && (
                        <p className="regime-note">
                            ℹ️ New regime has limited deductions. Standard deduction of ₹75,000 applies (FY 2025-26).
                        </p>
                    )}
                </div>

                {/* Deductions Section - Only for Old Regime */}
                {formData.regime === 'old' && (
                    <div className="form-section deductions-section">
                        <h3 className="section-title">💸 Deductions (Old Regime Only)</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="deduction80C">
                                    Section 80C (₹)
                                    <span className="info-text">Max: ₹1,50,000</span>
                                </label>
                                <input
                                    type="number"
                                    id="deduction80C"
                                    name="deduction80C"
                                    value={formData.deduction80C}
                                    onChange={handleInputChange}
                                    placeholder="PPF, ELSS, LIC, etc."
                                    min="0"
                                    max="150000"
                                    step="1000"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="deduction80D">
                                    Section 80D (₹)
                                    <span className="info-text">Health Insurance</span>
                                </label>
                                <input
                                    type="number"
                                    id="deduction80D"
                                    name="deduction80D"
                                    value={formData.deduction80D}
                                    onChange={handleInputChange}
                                    placeholder="Health insurance premium"
                                    min="0"
                                    step="1000"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="otherDeductions">Other Deductions (₹)</label>
                            <input
                                type="number"
                                id="otherDeductions"
                                name="otherDeductions"
                                value={formData.otherDeductions}
                                onChange={handleInputChange}
                                placeholder="80E, 80G, etc."
                                min="0"
                                step="1000"
                            />
                        </div>
                    </div>
                )}

                {/* Age Group */}
                <div className="form-section">
                    <h3 className="section-title">👤 Age Group</h3>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="ageGroup"
                                value="below60"
                                checked={formData.ageGroup === 'below60'}
                                onChange={handleInputChange}
                            />
                            <span className="radio-custom"></span>
                            Below 60 years
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="ageGroup"
                                value="60-80"
                                checked={formData.ageGroup === '60-80'}
                                onChange={handleInputChange}
                            />
                            <span className="radio-custom"></span>
                            60 - 80 years (Senior Citizen)
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="ageGroup"
                                value="above80"
                                checked={formData.ageGroup === 'above80'}
                                onChange={handleInputChange}
                            />
                            <span className="radio-custom"></span>
                            Above 80 years (Super Senior Citizen)
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        ⚠️ {error}
                    </div>
                )}

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Calculate Tax
                    </button>
                    <button type="button" onClick={handleReset} className="btn btn-secondary">
                        Reset
                    </button>
                </div>
            </form>

            {result && <ResultCard result={result} showBreakdown={true} />}
        </div>
    );
};

export default DetailedCalc;
