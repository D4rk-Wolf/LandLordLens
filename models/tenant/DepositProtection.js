const mongoose = require('mongoose');

const depositProtectionSchema = new mongoose.Schema({
  tenancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenancy',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  scheme: {
    type: String,
    enum: [
      // England & Wales
      'dps', // Deposit Protection Service
      'mydeposits', // MyDeposits
      'tds', // Tenancy Deposit Scheme
      // Scotland
      'lps_scotland', // Letting Protection Service Scotland
      'safedeposits_scotland', // Safedeposits Scotland
      'mydeposits_scotland', // My|Deposits Scotland
      // Northern Ireland
      'tds_ni', // TDS Northern Ireland
      'mydeposits_ni', // My|Deposits Northern Ireland
      'lps_ni', // Letting Protection Service NI
    ],
    required: true,
  },
  protectionReference: {
    type: String,
    required: true,
  },
  protectedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['protected', 'returned', 'disputed', 'forfeited'],
    default: 'protected',
  },
  returnDate: {
    type: Date,
  },
  returnAmount: {
    type: Number,
  },
  notes: {
    type: String,
  },
  documents: [{
    url: String,
    name: String,
    uploadedAt: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

depositProtectionSchema.index({ tenancyId: 1 });
depositProtectionSchema.index({ protectedDate: 1 });

module.exports = mongoose.model('DepositProtection', depositProtectionSchema);
