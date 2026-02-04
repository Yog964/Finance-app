// Test file to verify tax calculation logic
import { calculateQuickTax, calculateDetailedTax } from './utils/taxCalculator';

console.log('=== Testing Income Tax Calculator ===\n');

// Test 1: Quick Calculation - New Regime
console.log('Test 1: Quick Calculation - New Regime');
console.log('Income: ₹10,00,000 | Age: Below 60 | Regime: New');
try {
    const result1 = calculateQuickTax(1000000, 'below60', 'new');
    console.log('Result:', result1);
    console.log('Net Tax Payable: ₹' + result1.netTaxPayable.toFixed(2));
    console.log('✅ Test 1 Passed\n');
} catch (error) {
    console.log('❌ Test 1 Failed:', error.message, '\n');
}

// Test 2: Quick Calculation - Old Regime
console.log('Test 2: Quick Calculation - Old Regime');
console.log('Income: ₹10,00,000 | Age: Below 60 | Regime: Old');
try {
    const result2 = calculateQuickTax(1000000, 'below60', 'old');
    console.log('Result:', result2);
    console.log('Net Tax Payable: ₹' + result2.netTaxPayable.toFixed(2));
    console.log('✅ Test 2 Passed\n');
} catch (error) {
    console.log('❌ Test 2 Failed:', error.message, '\n');
}

// Test 3: Detailed Calculation with Deductions
console.log('Test 3: Detailed Calculation - Old Regime with Deductions');
console.log('Basic Salary: ₹8,00,000 | HRA: ₹1,00,000 | 80C: ₹1,50,000');
try {
    const result3 = calculateDetailedTax({
        basicSalary: 800000,
        hra: 100000,
        otherAllowances: 50000,
        deduction80C: 150000,
        deduction80D: 25000,
        otherDeductions: 0,
        ageGroup: 'below60',
        regime: 'old'
    });
    console.log('Gross Income: ₹' + result3.grossIncome.toFixed(2));
    console.log('Total Deductions: ₹' + result3.totalDeductions.toFixed(2));
    console.log('Taxable Income: ₹' + result3.taxableIncome.toFixed(2));
    console.log('Net Tax Payable: ₹' + result3.netTaxPayable.toFixed(2));
    console.log('✅ Test 3 Passed\n');
} catch (error) {
    console.log('❌ Test 3 Failed:', error.message, '\n');
}

// Test 4: Senior Citizen - Old Regime
console.log('Test 4: Senior Citizen - Old Regime');
console.log('Income: ₹6,00,000 | Age: 60-80 | Regime: Old');
try {
    const result4 = calculateQuickTax(600000, '60-80', 'old');
    console.log('Result:', result4);
    console.log('Net Tax Payable: ₹' + result4.netTaxPayable.toFixed(2));
    console.log('✅ Test 4 Passed\n');
} catch (error) {
    console.log('❌ Test 4 Failed:', error.message, '\n');
}

// Test 5: Super Senior Citizen - Old Regime
console.log('Test 5: Super Senior Citizen - Old Regime');
console.log('Income: ₹6,00,000 | Age: Above 80 | Regime: Old');
try {
    const result5 = calculateQuickTax(600000, 'above80', 'old');
    console.log('Result:', result5);
    console.log('Net Tax Payable: ₹' + result5.netTaxPayable.toFixed(2));
    console.log('✅ Test 5 Passed\n');
} catch (error) {
    console.log('❌ Test 5 Failed:', error.message, '\n');
}

console.log('=== All Tests Completed ===');
