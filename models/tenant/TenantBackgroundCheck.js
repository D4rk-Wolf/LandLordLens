const mongoose = require('mongoose');

const backgroundCheckSchema = new mongoose.Schema({
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
  checkDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  creditCheck: {
    performed: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
    },
    score: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['passed', 'failed', 'conditional', 'pending'],
    },
    reportUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  employmentCheck: {
    performed: {
      type: Boolean,
      default: false,
    },
    employerName: {
      type: String,
    },
    employerContact: {
      type: String,
    },
    position: {
      type: String,
    },
    salary: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['verified', 'unverified', 'pending'],
    },
    notes: {
      type: String,
    },
  },
  previousLandlordReference: {
    performed: {
      type: Boolean,
      default: false,
    },
    landlordName: {
      type: String,
    },
    landlordContact: {
      type: String,
    },
    propertyAddress: {
      type: String,
    },
    tenancyPeriod: {
      start: Date,
      end: Date,
    },
    rentPaidOnTime: {
      type: Boolean,
    },
    propertyMaintained: {
      type: Boolean,
    },
    wouldRentAgain: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ['positive', 'negative', 'neutral', 'pending'],
    },
    notes: {
      type: String,
    },
  },
  criminalRecordCheck: {
    performed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['clear', 'issues_found', 'pending'],
    },
    notes: {
      type: String,
    },
  },
  overallStatus: {
    type: String,
    enum: ['approved', 'rejected', 'conditional', 'pending'],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

backgroundCheckSchema.index({ tenancyId: 1 });
backgroundCheckSchema.index({ checkDate: -1 });

module.exports = mongoose.model('TenantBackgroundCheck', backgroundCheckSchema);
