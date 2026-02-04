// Tax Slabs for New Regime (FY 2025-26 / AY 2026-27) - Budget 2025
const newRegimeSlabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 5 },
    { min: 800000, max: 1200000, rate: 10 },
    { min: 1200000, max: 1600000, rate: 15 },
    { min: 1600000, max: 2000000, rate: 20 },
    { min: 2000000, max: 2400000, rate: 25 },
    { min: 2400000, max: Infinity, rate: 30 }
];


// Tax Slabs for Old Regime (FY 2024-25 / AY 2025-26)
const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
];

// Senior Citizen (60-80 years) - Old Regime
const seniorCitizenSlabs = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
];

// Super Senior Citizen (Above 80 years) - Old Regime
const superSeniorCitizenSlabs = [
    { min: 0, max: 500000, rate: 0 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
];

/**
 * Get appropriate tax slabs based on regime and age group
 */
export const getTaxSlabs = (regime, ageGroup) => {
    if (regime === 'new') {
        return newRegimeSlabs;
    }

    // Old regime - age-based slabs
    if (ageGroup === 'below60') {
        return oldRegimeSlabs;
    } else if (ageGroup === '60-80') {
        return seniorCitizenSlabs;
    } else {
        return superSeniorCitizenSlabs;
    }
};

/**
 * Calculate tax based on slabs
 */
export const calculateTaxFromSlabs = (taxableIncome, slabs) => {
    let tax = 0;
    const breakdown = [];

    for (let i = 0; i < slabs.length; i++) {
        const slab = slabs[i];

        if (taxableIncome > slab.min) {
            const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
            const slabTax = (taxableAmount * slab.rate) / 100;

            if (taxableAmount > 0) {
                breakdown.push({
                    range: `₹${slab.min.toLocaleString('en-IN')} - ${slab.max === Infinity ? 'Above' : '₹' + slab.max.toLocaleString('en-IN')}`,
                    rate: `${slab.rate}%`,
                    taxableAmount: taxableAmount,
                    tax: slabTax
                });
                tax += slabTax;
            }
        }
    }

    return { tax, breakdown };
};

/**
 * Calculate cess (4% of tax)
 */
export const calculateCess = (tax) => {
    return (tax * 4) / 100;
};

/**
 * Calculate Section 87A Rebate & Marginal Relief
 */
const calculateRebate = (taxableIncome, tax, regime) => {
    let rebate = 0;
    let marginalRelief = 0;

    if (regime === 'new') {
        // New Regime (FY 2025-26): Rebate up to ₹12 Lakhs
        // Tax on 12L is 60,000. So max rebate is 60,000.
        const limit = 1200000;

        if (taxableIncome <= limit) {
            rebate = tax; // Full tax waived off
        } else {
            // Check for Marginal Relief logic for New Regime
            // If Net Income exceeds 12L, tax payable shouldn't exceed (Income - 12L)
            const excessIncome = taxableIncome - limit;
            if (tax > excessIncome) {
                marginalRelief = tax - excessIncome;
                // effectively tax = excessIncome
            }
        }
    } else {
        // Old Regime (FY 2024-25): Rebate up to ₹5 Lakhs
        const limit = 500000;
        if (taxableIncome <= limit) {
            rebate = Math.min(tax, 12500);
        }
        // No marginal relief concept for Old Regime 87A usually applied in this simplified manner
    }

    return { rebate, marginalRelief };
};

/**
 * Quick calculation - minimal inputs
 */
export const calculateQuickTax = (annualIncome, ageGroup, regime) => {
    // Validate inputs
    if (!annualIncome || annualIncome < 0) {
        throw new Error('Please enter a valid annual income');
    }

    const income = parseFloat(annualIncome);

    // Standard Deduction Handling for Quick Mode (implicit)
    // For quick calc, we assume the user enters "Annual Income" BEFORE deduction.
    // So we deduct Standard Deduction automatically.
    let standardDeduction = 0;
    if (regime === 'new') {
        standardDeduction = 75000; // FY 2025-26
    } else {
        standardDeduction = 50000; // FY 2024-25
    }

    const taxableIncome = Math.max(0, income - standardDeduction);

    // Get appropriate tax slabs
    const slabs = getTaxSlabs(regime, ageGroup);

    // Calculate tax from slabs
    const { tax: slabTax, breakdown } = calculateTaxFromSlabs(taxableIncome, slabs);

    // Calculate Rebate & Marginal Relief
    const { rebate, marginalRelief } = calculateRebate(taxableIncome, slabTax, regime);

    const taxAfterRebate = Math.max(0, slabTax - rebate - marginalRelief);

    // Calculate cess (4% on Tax after rebate)
    const cess = calculateCess(taxAfterRebate);

    // Net tax payable
    const netTax = taxAfterRebate + cess;

    return {
        grossIncome: income, // Return gross for display
        taxableIncome: taxableIncome,
        standardDeduction: standardDeduction,
        totalTax: slabTax,
        rebate: rebate,
        marginalRelief: marginalRelief,
        cess: cess,
        netTaxPayable: netTax,
        breakdown: breakdown
    };
};

/**
 * Detailed calculation - with deductions
 */
export const calculateDetailedTax = (inputs) => {
    const {
        basicSalary,
        hra,
        otherAllowances,
        deduction80C,
        deduction80D,
        otherDeductions,
        ageGroup,
        regime
    } = inputs;

    // Validate inputs
    if (!basicSalary || basicSalary < 0) {
        throw new Error('Please enter a valid basic salary');
    }

    // Calculate gross income
    const grossIncome =
        parseFloat(basicSalary || 0) +
        parseFloat(hra || 0) +
        parseFloat(otherAllowances || 0);

    // Calculate total deductions
    let totalDeductions = 0;
    let standardDeduction = 0;

    if (regime === 'old') {
        totalDeductions =
            parseFloat(deduction80C || 0) +
            parseFloat(deduction80D || 0) +
            parseFloat(otherDeductions || 0);

        // Standard deduction for Old Regime
        standardDeduction = 50000;
        totalDeductions += standardDeduction;
    } else {
        // Standard deduction for New Regime
        standardDeduction = 75000;
        totalDeductions = standardDeduction;
    }

    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // Get appropriate tax slabs
    const slabs = getTaxSlabs(regime, ageGroup);

    // Calculate tax
    const { tax: slabTax, breakdown } = calculateTaxFromSlabs(taxableIncome, slabs);

    // Calculate Rebate & Marginal Relief
    const { rebate, marginalRelief } = calculateRebate(taxableIncome, slabTax, regime);

    const taxAfterRebate = Math.max(0, slabTax - rebate - marginalRelief);

    // Calculate cess
    const cess = calculateCess(taxAfterRebate);

    // Net tax payable
    const netTaxPayable = taxAfterRebate + cess;

    return {
        grossIncome: grossIncome,
        totalDeductions: totalDeductions,
        taxableIncome: taxableIncome,
        totalTax: slabTax,
        rebate: rebate,
        marginalRelief: marginalRelief,
        cess: cess,
        netTaxPayable: netTaxPayable,
        breakdown: breakdown,
        deductionBreakdown: regime === 'old' ? {
            section80C: parseFloat(deduction80C || 0),
            section80D: parseFloat(deduction80D || 0),
            otherDeductions: parseFloat(otherDeductions || 0),
            standardDeduction: standardDeduction
        } : {
            standardDeduction: standardDeduction
        }
    };
};

/**
 * Format currency in Indian format
 */
export const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};
