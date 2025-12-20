const mongoose = require('mongoose');

const tenancySchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tenantName: {
    type: String,
    required: true,
  },
  tenantEmail: {
    type: String,
    required: true,
  },
  tenantPhone: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
  },
  depositProtected: {
    type: Boolean,
    default: false,
  },
  tenancyType: {
    type: String,
    enum: ['assured_shorthold', 'assured', 'short_assured', 'fixed_term', 'protected'],
    default: 'assured_shorthold',
  },
  status: {
    type: String,
    enum: ['active', 'ended', 'pending'],
    default: 'active',
  },
  // Rent management
  rentReviewDate: {
    type: Date,
  },
  lastRentIncrease: {
    date: Date,
    amount: Number,
    percentage: Number,
  },
  section13NoticeServed: {
    type: Boolean,
    default: false,
  },
  section13NoticeDate: {
    type: Date,
  },
  // Documentation
  howToRentGuideProvided: {
    type: Boolean,
    default: false,
  },
  howToRentGuideDate: {
    type: Date,
  },
  tenantInformationPackProvided: {
    type: Boolean,
    default: false,
  },
  tenantInformationPackDate: {
    type: Date,
  },
  rentBookProvided: {
    type: Boolean,
    default: false,
  },
  // Right to Rent (England)
  rightToRentChecked: {
    type: Boolean,
    default: false,
  },
  notes: {
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

module.exports = mongoose.model('Tenancy', tenancySchema);
