import React from 'react';
import './ResultCard.css';
import { formatCurrency } from '../utils/taxCalculator';

const ResultCard = ({ result, showBreakdown = false }) => {
    if (!result) return null;

    return (
        <div className="result-card">
            {/* New Distinct Header for Main Result */}
            <div className="result-header">
                <h2 className="result-title">Net Tax Payable</h2>
                <div className="result-primary-value">{formatCurrency(result.netTaxPayable)}</div>
                <div className="result-primary-label">Includes all taxes & cess</div>
            </div>

            <div className="result-body">
                <div className="result-grid">
                    {result.grossIncome !== undefined && (
                        <div className="result-item">
                            <span className="result-label">Gross Income</span>
                            <span className="result-value">{formatCurrency(result.grossIncome)}</span>
                        </div>
                    )}

                    {result.totalDeductions !== undefined && (
                        <div className="result-item">
                            <span className="result-label">Total Deductions</span>
                            <span className="result-value success">{formatCurrency(result.totalDeductions)}</span>
                        </div>
                    )}

                    <div className="result-item">
                        <span className="result-label">Taxable Income</span>
                        <span className="result-value">{formatCurrency(result.taxableIncome)}</span>
                    </div>
                </div>

                <div className="result-item">
                    <span className="result-label">Total Tax</span>
                    <span className="result-value">{formatCurrency(result.totalTax)}</span>
                </div>

                {result.rebate > 0 && (
                    <div className="result-item">
                        <span className="result-label">Rebate u/s 87A</span>
                        <span className="result-value success">-{formatCurrency(result.rebate)}</span>
                    </div>
                )}

                {result.marginalRelief > 0 && (
                    <div className="result-item">
                        <span className="result-label">Marginal Relief</span>
                        <span className="result-value success">-{formatCurrency(result.marginalRelief)}</span>
                    </div>
                )}

                <div className="result-item">
                    <span className="result-label">Health & Education Cess (4%)</span>
                    <span className="result-value">{formatCurrency(result.cess)}</span>
                </div>
                {showBreakdown && result.breakdown && result.breakdown.length > 0 && (
                    <div className="tax-breakdown">
                        <h3 className="breakdown-title">Tax Slab Breakdown</h3>
                        <div className="breakdown-table">
                            <div className="breakdown-header">
                                <span>Income Range</span>
                                <span>Rate</span>
                                <span>Taxable Amount</span>
                                <span>Tax</span>
                            </div>
                            {result.breakdown.map((slab, index) => (
                                <div key={index} className="breakdown-row">
                                    <span className="breakdown-range">{slab.range}</span>
                                    <span className="breakdown-rate">{slab.rate}</span>
                                    <span className="breakdown-amount">{formatCurrency(slab.taxableAmount)}</span>
                                    <span className="breakdown-tax">{formatCurrency(slab.tax)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {result.deductionBreakdown && (
                    <div className="deduction-breakdown">
                        <h3 className="breakdown-title">Deduction Breakdown</h3>
                        <div className="deduction-list">
                            {result.deductionBreakdown.section80C !== undefined && (
                                <div className="deduction-item">
                                    <span>Section 80C</span>
                                    <span>{formatCurrency(result.deductionBreakdown.section80C)}</span>
                                </div>
                            )}
                            {result.deductionBreakdown.section80D !== undefined && (
                                <div className="deduction-item">
                                    <span>Section 80D</span>
                                    <span>{formatCurrency(result.deductionBreakdown.section80D)}</span>
                                </div>
                            )}
                            {result.deductionBreakdown.otherDeductions !== undefined && result.deductionBreakdown.otherDeductions > 0 && (
                                <div className="deduction-item">
                                    <span>Other Deductions</span>
                                    <span>{formatCurrency(result.deductionBreakdown.otherDeductions)}</span>
                                </div>
                            )}
                            <div className="deduction-item">
                                <span>Standard Deduction</span>
                                <span>{formatCurrency(result.deductionBreakdown.standardDeduction)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultCard;
