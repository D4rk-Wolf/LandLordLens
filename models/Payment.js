const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded', 'canceled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank_transfer', 'paypal'],
    default: 'card',
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  stripePaymentIntentId: {
    type: String,
    sparse: true,
  },
  stripeChargeId: {
    type: String,
    sparse: true,
  },
  stripeSubscriptionId: {
    type: String,
    sparse: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['subscription', 'one_time', 'refund'],
    default: 'one_time',
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'basic', 'premium'],
  },
  subscriptionPeriod: {
    type: String,
    enum: ['monthly', 'yearly'],
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
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

// Index for faster queries
paymentSchema.index({ userId: 1, createdAt: -1 });
// Note: stripePaymentIntentId and stripeSubscriptionId use sparse: true which creates sparse indexes automatically.
// If you see duplicate index warnings, you can drop existing indexes in MongoDB and let Mongoose recreate them.

module.exports = mongoose.model('Payment', paymentSchema);
