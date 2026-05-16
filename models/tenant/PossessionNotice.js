const mongoose = require('mongoose');

const possessionNoticeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    tenancyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenancy',
        required: true,
    },
    type: {
        type: String,
        enum: ['section_8', 'section_21'], // Keeping 21 for legacy/transition support
        required: true,
        default: 'section_8'
    },
    grounds: [{
        type: String,
        // New Renters Rights Act Grounds included
        enum: [
            '1', '1A', '1B', // Moving in / Selling
            '2', // Mortgage repossession
            '4A', // Student Lets
            '8', // Serious Arrears (Mandatory)
            '10', // Some Arrears
            '11', // Persistent delay in rent
            '12', // Breach of tenancy
            '13', // Deterioration of property
            '14', // Anti-social behaviour
            '17' // False statement
        ]
    }],
    status: {
        type: String,
        enum: ['draft', 'issued', 'served', 'expired', 'possession_order_granted', 'dismissed'],
        default: 'draft'
    },
    servedDate: {
        type: Date,
    },
    expiryDate: {
        type: Date, // When court proceedings can start
    },
    noticeContent: {
        type: String, // The generated legal text
    },
    validationErrors: [{
        type: String // Reasons why it might be invalid (e.g. "Gas Cert Expired")
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('PossessionNotice', possessionNoticeSchema);
