const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['landlord', 'admin', 'tenant'],
    default: 'landlord',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subscription: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    default: 'free',
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'canceled', 'past_due', 'trialing', 'incomplete'],
    default: 'active',
  },
  subscriptionPeriod: {
    type: String,
    enum: ['monthly', 'yearly'],
  },
  subscriptionStartDate: {
    type: Date,
  },
  subscriptionEndDate: {
    type: Date,
  },
  subscriptionCanceledAt: {
    type: Date,
  },
  stripeCustomerId: {
    type: String,
    sparse: true,
    unique: true,
  },
  stripeSubscriptionId: {
    type: String,
    sparse: true,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.updatedAt = Date.now();
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
