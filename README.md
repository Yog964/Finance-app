# Income Tax Calculator
<img width="463" height="175" alt="image" src="https://github.com/user-attachments/assets/fb9d383d-07a7-4fd0-aff6-256cffcf5744" />
<img width="99" height="96" alt="image" src="https://github.com/user-attachments/assets/36a63ef5-ef47-4df8-8cad-ad5e3af7e002" />

A modern, frontend-only Income Tax Calculator web application built with React JS for calculating Indian Income Tax based on FY 2023-24 tax slabs.

## 🚀 Features

### Calculation Modes
- **Quick Calculation**: Fast tax calculation with minimal inputs
- **Detailed Calculation**: Comprehensive calculation with deductions and allowances

### Tax Regimes
- **New Tax Regime**: Lower tax rates with limited deductions
- **Old Tax Regime**: Higher rates but allows various deductions (80C, 80D, etc.)

### Age-Based Tax Slabs
- Below 60 years
- 60-80 years (Senior Citizen)
- Above 80 years (Super Senior Citizen)

### Key Capabilities
- ✅ Instant tax calculation
- ✅ Tax slab breakdown
- ✅ Deduction breakdown
- ✅ 4% Health & Education Cess
- ✅ Responsive design
- ✅ Input validation
- ✅ Clean, modern UI

## 📁 Project Structure

```
income-tax-calculator/
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar component
│   │   ├── Navbar.css
│   │   ├── QuickCalc.js       # Quick calculation component
│   │   ├── QuickCalc.css
│   │   ├── DetailedCalc.js    # Detailed calculation component
│   │   ├── DetailedCalc.css
│   │   ├── ResultCard.js      # Results display component
│   │   └── ResultCard.css
│   ├── utils/
│   │   └── taxCalculator.js   # Tax calculation logic
│   ├── App.js                 # Main application component
│   ├── App.css
│   ├── index.js               # Application entry point
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Navigate to the project directory**
   ```bash
   cd income-tax-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If not, manually navigate to `http://localhost:3000`

## 💻 Usage

### Quick Calculation Mode
1. Select "Quick Calculation" tab
2. Enter your annual income
3. Select your age group
4. Choose tax regime (New/Old)
5. Click "Calculate Tax"
6. View instant results with tax breakdown

### Detailed Calculation Mode
1. Select "Detailed Calculation" tab
2. Enter income details:
   - Basic Salary
   - HRA
   - Other Allowances
3. Choose tax regime
4. If Old Regime, enter deductions:
   - Section 80C (PPF, ELSS, LIC, etc.)
   - Section 80D (Health Insurance)
   - Other Deductions
5. Select age group
6. Click "Calculate Tax"
7. View comprehensive results with breakdowns

## 📊 Tax Calculation Logic

### New Tax Regime (FY 2023-24)
- ₹0 - ₹3,00,000: 0%
- ₹3,00,000 - ₹6,00,000: 5%
- ₹6,00,000 - ₹9,00,000: 10%
- ₹9,00,000 - ₹12,00,000: 15%
- ₹12,00,000 - ₹15,00,000: 20%
- Above ₹15,00,000: 30%

### Old Tax Regime (FY 2023-24)

**Below 60 years:**
- ₹0 - ₹2,50,000: 0%
- ₹2,50,000 - ₹5,00,000: 5%
- ₹5,00,000 - ₹10,00,000: 20%
- Above ₹10,00,000: 30%

**60-80 years (Senior Citizen):**
- ₹0 - ₹3,00,000: 0%
- ₹3,00,000 - ₹5,00,000: 5%
- ₹5,00,000 - ₹10,00,000: 20%
- Above ₹10,00,000: 30%

**Above 80 years (Super Senior Citizen):**
- ₹0 - ₹5,00,000: 0%
- ₹5,00,000 - ₹10,00,000: 20%
- Above ₹10,00,000: 30%

### Additional Charges
- **Health & Education Cess**: 4% on total tax

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Custom radio buttons and toggles
- Responsive design for all devices
- Card-based layout
- Interactive hover effects
- Clean typography

## 🔧 Technologies Used

- **React JS** (v18+)
- **JavaScript** (ES6+)
- **CSS3** (with animations)
- **HTML5**

## 📝 Notes

- This is a frontend-only application with no backend or database
- All calculations are performed client-side
- Tax slabs are based on FY 2023-24
- For accurate tax planning, please consult a tax professional
- Standard deduction of ₹50,000 is automatically applied in both regimes

## 🚀 Build for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## 📄 License

This project is for educational and informational purposes only.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

**Disclaimer**: This calculator is for informational purposes only. Please consult with a qualified tax professional for accurate tax planning and filing.
