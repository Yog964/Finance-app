# Income Tax Calculator - Logic Update Summary

## ✅ Latest Logic Corrections (Feb 2026)

### 1. New Tax Regime (FY 2025-26 / AY 2026-27)
- **Status**: Updated to Budget 2025 standards.
- **Slabs**:
    - ₹0 - ₹4L: **Nil**
    - ₹4L - ₹8L: **5%**
    - ₹8L - ₹12L: **10%**
    - ₹12L - ₹16L: **15%**
    - ₹16L - ₹20L: **20%**
    - ₹20L - ₹24L: **25%**
    - Above ₹24L: **30%**
- **Standard Deduction**: Increased to **₹75,000**.
- **Section 87A Rebate**:
    - **Limit**: Taxable Income up to **₹12,00,000**.
    - **Outcome**: Zero tax for income up to ₹12L (effectively ₹12.75L salary).
- **Marginal Relief**: Implemented for incomes slightly exceeding ₹12L.

### 2. Old Tax Regime (FY 2024-25 / AY 2025-26)
- **Status**: Maintained previous slab structure.
- **Slabs**: Unchanged (0-2.5L Nil, 2.5-5L 5%, etc.).
- **Standard Deduction**: **₹50,000**.
- **Section 87A Rebate**:
    - **Limit**: Taxable Income up to **₹5,00,000**.
    - **Amount**: Max ₹12,500.

### 3. Key Enhancements
- **Rebate Logic**: The calculator now correctly applies Section 87A rebate, ensuring users with income below limits see ₹0 tax.
- **Marginal Relief**: Added logic to prevent tax from exceeding income earned above the exemption threshold.
- **Detailed Breakdown**: Result card now explicitly shows "Rebate u/s 87A" and "Marginal Relief" reductions.

---

## 🚀 Verification
- **Test Case 1**: Income ₹10,00,000 (New Regime) -> Tax should be **₹0** (Taxable < ₹12L).
- **Test Case 2**: Income ₹7,00,000 (Old Regime) -> Tax payable (Taxable > ₹5L).
- **Test Case 3**: Income ₹12,80,000 (New Regime) -> Marginal relief applies to reduce tax liability.

The application is running at **http://localhost:3000** with these updates.
