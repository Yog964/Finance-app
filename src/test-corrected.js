// Test file to verify correct tax calculation logic with Rebate 87A and Marginal Relief
import { calculateQuickTax, formatCurrency } from './utils/taxCalculator';

console.log('=== Testing Corrected Tax Logic (FY 2025-26 & 2024-25) ===\n');

// Test 1: New Regime - Income ₹7,00,000
// Should be tax free due to rebate (Limit is 12L)
console.log('Test 1: New Regime (FY 25-26) - Income ₹7,00,000');
try {
    const result = calculateQuickTax(700000, 'below60', 'new');
    console.log(`Income: ${formatCurrency(result.grossIncome)}`);
    console.log(`Taxable Income: ${formatCurrency(result.taxableIncome)} (after 75k std deduction)`);
    console.log(`Total Tax (before rebate): ${formatCurrency(result.totalTax)}`);
    console.log(`Rebate 87A: ${formatCurrency(result.rebate)}`);
    console.log(`Net Tax Payable: ${formatCurrency(result.netTaxPayable)}`);

    if (result.netTaxPayable === 0) {
        console.log('✅ PASSED: Tax is zero as expected.\n');
    } else {
        console.log('❌ FAILED: Tax should be zero.\n');
    }
} catch (error) {
    console.log('❌ ERROR:', error.message, '\n');
}

// Test 2: New Regime - Income ₹12,00,000
// Net Taxable = 11,25,000. Should be tax free.
console.log('Test 2: New Regime (FY 25-26) - Income ₹12,00,000');
try {
    const result = calculateQuickTax(1200000, 'below60', 'new');
    console.log(`Income: ${formatCurrency(result.grossIncome)}`);
    console.log(`Taxable Income: ${formatCurrency(result.taxableIncome)}`);
    console.log(`Total Tax: ${formatCurrency(result.totalTax)}`);
    console.log(`Rebate 87A: ${formatCurrency(result.rebate)}`);
    console.log(`Net Tax Payable: ${formatCurrency(result.netTaxPayable)}`);

    // Taxable income 11,25,000. 
    // Tax: 0-4L (0), 4-8L (20k), 8-11.25L (32.5k) = 52,500
    // Rebate should cover full 52,500.
    if (result.netTaxPayable === 0) {
        console.log('✅ PASSED: Tax is zero (Income <= 12L + Std Ded).\n');
    } else {
        console.log('❌ FAILED: Tax should be zero.\n');
    }
} catch (error) {
    console.log('❌ ERROR:', error.message, '\n');
}

// Test 3: Old Regime - Income ₹7,00,000
// Taxable = 6,50,000. No rebate (Limit 5L). Tax payable.
console.log('Test 3: Old Regime (FY 24-25) - Income ₹7,00,000');
try {
    const result = calculateQuickTax(700000, 'below60', 'old');
    console.log(`Taxable Income: ${formatCurrency(result.taxableIncome)}`);
    console.log(`Rebate 87A: ${formatCurrency(result.rebate)}`);
    console.log(`Net Tax Payable: ${formatCurrency(result.netTaxPayable)}`);

    if (result.netTaxPayable > 0 && result.rebate === 0) {
        console.log('✅ PASSED: Tax is payable, no rebate.\n');
    } else {
        console.log('❌ FAILED: Should have tax and no rebate.\n');
    }
} catch (error) {
    console.log('❌ ERROR:', error.message, '\n');
}

// Test 4: New Regime - Income ₹12,80,000 (Marginal Relief Case?)
// Taxable = 12,05,000. Exceeds 12L by 5,000.
// Tax on 12.05L: 
// 0-4 (0), 4-8 (20k), 8-12 (40k), 12-12.05 (15% of 5k = 750). Total = 60,750.
// Excess income = 5,000.
// Tax (60,750) > Excess Income (5,000).
// Marginal Relief should reduce tax to 5,000.
console.log('Test 4: New Regime (FY 25-26) - Income ₹12,80,000 (Marginal Relief Check)');
try {
    const result = calculateQuickTax(1280000, 'below60', 'new');
    console.log(`Taxable Income: ${formatCurrency(result.taxableIncome)}`); // 12,05,000
    console.log(`Calcd Tax: ${formatCurrency(result.totalTax)}`); // 60,750
    console.log(`Marginal Relief: ${formatCurrency(result.marginalRelief)}`); // Should be 55,750
    console.log(`Rebate: ${formatCurrency(result.rebate)}`);
    console.log(`Net Tax Payable (incl cess): ${formatCurrency(result.netTaxPayable)}`);

    if (result.marginalRelief > 0) {
        console.log('✅ PASSED: Marginal Relief applied.\n');
    } else {
        console.log('❌ FAILED: Marginal Relief logic might be missing/incorrect.\n');
    }
} catch (error) {
    console.log('❌ ERROR:', error.message, '\n');
}
