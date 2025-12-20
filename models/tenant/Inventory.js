const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'damaged'],
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  photos: [{
    url: String,
    name: String,
    uploadedAt: Date,
  }],
  notes: {
    type: String,
  },
});

const inventorySchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['check_in', 'check_out', 'interim'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  conductedBy: {
    type: String,
    required: true,
  },
  tenantPresent: {
    type: Boolean,
    default: false,
  },
  items: [inventoryItemSchema],
  overallCondition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
  },
  notes: {
    type: String,
  },
  photos: [{
    url: String,
    name: String,
    uploadedAt: Date,
    room: String,
  }],
  signedBy: {
    landlord: {
      name: String,
      signature: String,
      date: Date,
    },
    tenant: {
      name: String,
      signature: String,
      date: Date,
    },
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

inventorySchema.index({ propertyId: 1, date: -1 });
inventorySchema.index({ tenancyId: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);
