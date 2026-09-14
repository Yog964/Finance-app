import React from 'react';
import './ResultCard.css';
import { formatCurrency } from '../utils/taxCalculator';

const ResultCard = ({ result, showBreakdown = false }) => {
    if (!result) return null;

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="result-card slip-format" id="tax-slip">
            <div className="slip-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="slip-emblem" />
                <div className="slip-title-container">
                    <h2>INCOME TAX DEPARTMENT</h2>
                    <h3>GOVERNMENT OF INDIA</h3>
                    <h4>Tax Computation Slip</h4>
                </div>
                <div className="slip-action hide-on-print">
                    <button onClick={handleDownload} className="btn-download">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download Slip
                    </button>
                </div>
            </div>

            <div className="slip-body">
                <table className="slip-table">
                    <tbody>
                        {result.grossIncome !== undefined && (
                            <tr>
                                <td>Gross Income</td>
                                <td className="amount-col">{formatCurrency(result.grossIncome)}</td>
                            </tr>
                        )}
                        {result.totalDeductions !== undefined && (
                            <tr>
                                <td>Total Deductions</td>
                                <td className="amount-col text-success">{formatCurrency(result.totalDeductions)}</td>
                            </tr>
                        )}
                        <tr className="highlight-row">
                            <td>Taxable Income</td>
                            <td className="amount-col">{formatCurrency(result.taxableIncome)}</td>
                        </tr>
                        <tr>
                            <td>Tax on Income</td>
                            <td className="amount-col">{formatCurrency(result.totalTax)}</td>
                        </tr>
                        {result.rebate > 0 && (
                            <tr>
                                <td>Rebate u/s 87A</td>
                                <td className="amount-col text-success">-{formatCurrency(result.rebate)}</td>
                            </tr>
                        )}
                        {result.marginalRelief > 0 && (
                            <tr>
                                <td>Marginal Relief</td>
                                <td className="amount-col text-success">-{formatCurrency(result.marginalRelief)}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Health & Education Cess (4%)</td>
                            <td className="amount-col">{formatCurrency(result.cess)}</td>
                        </tr>
                        <tr className="total-row" style={{ color: '#d32f2f' }}>
                            <td>Net Tax Payable</td>
                            <td className="amount-col">{formatCurrency(result.netTaxPayable)}</td>
                        </tr>
                    </tbody>
                </table>

                {showBreakdown && result.breakdown && result.breakdown.length > 0 && (
                    <div className="slip-section">
                        <h4>Tax Slab Breakdown</h4>
                        <table className="slip-table-alt">
                            <thead>
                                <tr>
                                    <th>Income Range</th>
                                    <th>Rate</th>
                                    <th>Taxable Amount</th>
                                    <th className="amount-col">Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.breakdown.map((slab, index) => (
                                    <tr key={index}>
                                        <td>{slab.range}</td>
                                        <td>{slab.rate}</td>
                                        <td>{formatCurrency(slab.taxableAmount)}</td>
                                        <td className="amount-col">{formatCurrency(slab.tax)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            <div className="slip-footer">
                <p>Note: This is a provisional computation. Please consult a tax advisor for official filing.</p>
            </div>
        </div>
    );
};

export default ResultCard;
