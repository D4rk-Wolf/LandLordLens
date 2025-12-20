const mongoose = require('mongoose');

const complianceRecordSchema = new mongoose.Schema({
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
  complianceType: {
    type: String,
    enum: [
      'gas_safety',
      'epc',
      'electrical',
      'fire_safety',
      'hmo_license',
      'legionella',
      'pat_testing',
      'smoke_alarm',
      'carbon_monoxide_alarm',
      'landlord_registration',
      'rent_smart_wales',
      'other',
    ],
    required: true,
  },
  region: {
    type: String,
    enum: ['england', 'wales', 'scotland', 'northern_ireland', 'all'],
    default: 'all',
  },
  certificateNumber: {
    type: String,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  issuer: {
    type: String,
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

complianceRecordSchema.index({ expiryDate: 1 });
complianceRecordSchema.index({ propertyId: 1, complianceType: 1 });

module.exports = mongoose.model('ComplianceRecord', complianceRecordSchema);
