const mongoose = require('mongoose');

const rightToRentSchema = new mongoose.Schema({
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
  tenantName: {
    type: String,
    required: true,
  },
  tenantDateOfBirth: {
    type: Date,
    required: true,
  },
  documentType: {
    type: String,
    enum: [
      'uk_passport',
      'eu_passport',
      'biometric_residence_permit',
      'birth_certificate',
      'driving_licence',
      'other',
    ],
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  checkDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkedBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['passed', 'failed', 'pending', 'expired'],
    default: 'pending',
  },
  notes: {
    type: String,
  },
  documents: [{
    url: String,
    name: String,
    uploadedAt: Date,
  }],
  followUpRequired: {
    type: Boolean,
    default: false,
  },
  followUpDate: {
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

rightToRentSchema.index({ tenancyId: 1 });
rightToRentSchema.index({ checkDate: 1 });
rightToRentSchema.index({ expiryDate: 1 });

module.exports = mongoose.model('RightToRent', rightToRentSchema);
