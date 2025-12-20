const mongoose = require('mongoose');

const inspectionItemSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'needs_attention'],
    required: true,
  },
  notes: {
    type: String,
  },
  actionRequired: {
    type: Boolean,
    default: false,
  },
  photos: [{
    url: String,
    name: String,
    uploadedAt: Date,
  }],
});

const propertyInspectionSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
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
  inspectionType: {
    type: String,
    enum: ['routine', 'check_in', 'check_out', 'maintenance', 'compliance', 'complaint'],
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  actualDate: {
    type: Date,
  },
  conductedBy: {
    type: String,
    required: true,
  },
  tenantPresent: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled',
  },
  items: [inspectionItemSchema],
  overallCondition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
  },
  issuesFound: {
    type: Boolean,
    default: false,
  },
  issues: [{
    description: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
    },
    actionRequired: String,
    resolved: {
      type: Boolean,
      default: false,
    },
    resolvedDate: Date,
  }],
  notes: {
    type: String,
  },
  photos: [{
    url: String,
    name: String,
    uploadedAt: Date,
    area: String,
  }],
  nextInspectionDue: {
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

propertyInspectionSchema.index({ propertyId: 1, scheduledDate: -1 });
propertyInspectionSchema.index({ tenancyId: 1 });
propertyInspectionSchema.index({ status: 1, scheduledDate: 1 });

module.exports = mongoose.model('PropertyInspection', propertyInspectionSchema);
