const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
    },
    tenancyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenancy',
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [
            'tenancy_agreement',
            'gas_certificate',
            'eicr',
            'epc',
            'right_to_rent',
            'inventory',
            'deposit_protection',
            'correspondence',
            'maintenance_log',
            'invoice',
            'other'
        ],
        required: true,
    },
    category: {
        type: String,
        enum: ['compliance', 'legal', 'finance', 'maintenance', 'tenant_comms'],
        default: 'compliance'
    },
    filePath: {
        type: String, // For this MVP, we might store local path or GridFS ID if implemented. 
        // Plan said "Database-Stored", so we might store base64 in a separate 'content' field 
        // OR simpler: just a path simulation if we aren't hooking up a real file server yet.
        // Wait, user agreed to "Database-Stored". Storing heavy blobs in Mongo is bad practice 
        // but for MVP of small text/pdfs it's okay. 
        // Better: keep it simple. Store metadata here. Content handling will be in the route.
        required: false
    },
    fileData: {
        type: Buffer, // Storing file directly in DB for "Zero Config" requirement
        select: false // Do not return by default on list queries
    },
    mimeType: String,
    size: Number,
    date: {
        type: Date,
        default: Date.now,
        required: true // Issue date
    },
    expiryDate: {
        type: Date,
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

documentSchema.index({ userId: 1, type: 1 });
documentSchema.index({ propertyId: 1 });
documentSchema.index({ tenancyId: 1 });

module.exports = mongoose.model('Document', documentSchema);
