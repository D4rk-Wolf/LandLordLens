const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    county: { type: String },
    country: { type: String, default: 'UK' },
  },
  propertyType: {
    type: String,
    enum: ['house', 'flat', 'apartment', 'bungalow', 'other'],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    default: 1,
  },
  rentAmount: {
    type: Number,
  },
  purchasePrice: {
    type: Number,
  },
  purchaseDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['vacant', 'occupied', 'maintenance'],
    default: 'vacant',
  },
  availabilityStatus: {
    type: String,
    enum: ['free', 'for_sale', 'ready_for_rent', 'rented', 'not_available'],
    default: 'ready_for_rent',
  },
  notes: {
    type: String,
  },
  // UK Compliance Fields
  region: {
    type: String,
    enum: ['england', 'wales', 'scotland', 'northern_ireland'],
    default: 'england',
  },
  isHMO: {
    type: Boolean,
    default: false,
  },
  hmoLicenseNumber: {
    type: String,
  },
  hmoLicenseExpiry: {
    type: Date,
  },
  epcRating: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  epcCertificateNumber: {
    type: String,
  },
  epcExpiryDate: {
    type: Date,
  },
  smokeAlarmsInstalled: {
    type: Boolean,
    default: false,
  },
  smokeAlarmsLastTested: {
    type: Date,
  },
  carbonMonoxideAlarmsInstalled: {
    type: Boolean,
    default: false,
  },
  carbonMonoxideAlarmsLastTested: {
    type: Date,
  },
  legionellaRiskAssessmentDate: {
    type: Date,
  },
  legionellaRiskAssessmentNextDue: {
    type: Date,
  },
  furnished: {
    type: Boolean,
    default: false,
  },
  allowsPets: {
    type: Boolean,
    default: false,
  },
  allowsSmoking: {
    type: Boolean,
    default: false,
  },
  mortgageConsentObtained: {
    type: Boolean,
    default: false,
  },
  mortgageConsentDate: {
    type: Date,
  },
  mortgageConsentExpiry: {
    type: Date,
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

module.exports = mongoose.model('Property', propertySchema);
