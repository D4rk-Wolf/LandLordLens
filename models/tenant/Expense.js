const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
  tenancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenancy',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: [
      // Tax-deductible expenses
      'letting_agent_fees',
      'legal_fees',
      'accountant_fees',
      'insurance',
      'maintenance_repairs',
      'utility_bills',
      'cleaning_services',
      'advertising',
      'stationery',
      'phone_calls',
      'replacement_domestic_items',
      // Non-deductible (improvements)
      'property_improvements',
      'capital_expenditure',
      // Other
      'mortgage_interest',
      'council_tax',
      'ground_rent',
      'service_charges',
      'other',
    ],
    required: true,
  },
  category: {
    type: String,
    enum: [
      'repairs',
      'maintenance',
      'insurance',
      'legal',
      'accounting',
      'advertising',
      'utilities',
      'cleaning',
      'replacement_items',
      'improvements',
      'mortgage',
      'other',
    ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'GBP',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
  },
  invoiceNumber: {
    type: String,
  },
  isTaxDeductible: {
    type: Boolean,
    default: true,
  },
  vatAmount: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'card', 'cash', 'cheque', 'other'],
  },
  receipt: {
    url: String,
    name: String,
    uploadedAt: Date,
  },
  notes: {
    type: String,
  },
  taxYear: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-calculate tax year (UK tax year runs April 6 to April 5)
expenseSchema.pre('save', function (next) {
  if (!this.taxYear && this.date) {
    const date = new Date(this.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    // If date is before April 6, tax year is previous year
    if (month < 4 || (month === 4 && date.getDate() < 6)) {
      this.taxYear = `${year - 1}-${year}`;
    } else {
      this.taxYear = `${year}-${year + 1}`;
    }
  }
  next();
});

expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ propertyId: 1 });
expenseSchema.index({ taxYear: 1 });
expenseSchema.index({ category: 1 });
expenseSchema.index({ isTaxDeductible: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
