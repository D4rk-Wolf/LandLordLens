const mongoose = require('mongoose');

const maintenanceTicketSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed', 'cancelled'],
    default: 'open',
  },
  reportedBy: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  cost: {
    type: Number,
  },
  completedDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
  images: [{
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

module.exports = mongoose.model('MaintenanceTicket', maintenanceTicketSchema);
