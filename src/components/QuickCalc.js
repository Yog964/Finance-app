import React, { useState } from 'react';
import './QuickCalc.css';
import { calculateQuickTax } from '../utils/taxCalculator';
import ResultCard from './ResultCard';

const QuickCalc = () => {
    const [formData, setFormData] = useState({
        annualIncome: '',
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
            const calculationResult = calculateQuickTax(
                formData.annualIncome,
                formData.ageGroup,
                formData.regime
            );
            setResult(calculationResult);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    const handleReset = () => {
        setFormData({
            annualIncome: '',
            ageGroup: 'below60',
            regime: 'new'
        });
        setResult(null);
        setError('');
    };

    return (
        <div className="quick-calc">
            <div className="calc-header">
                <h2>⚡ Quick Calculation</h2>
                <p>Get instant tax calculation with minimal inputs</p>
            </div>

            <form onSubmit={handleCalculate} className="calc-form">
                <div className="form-group">
                    <label htmlFor="annualIncome">
                        Annual Income (₹) <span className="required">*</span>
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
                    />
                </div>

                <div className="form-group">
                    <label>Age Group <span className="required">*</span></label>
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
                            60 - 80 years
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
                            Above 80 years
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Tax Regime <span className="required">*</span></label>
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

export default QuickCalc;
