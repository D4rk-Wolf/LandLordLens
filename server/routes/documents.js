/**
 * DOCUMENT ROUTES
 * Manages file uploads (Gas Certificates, EPCs, etc.) and exports.
 * Uses Multer for handling multipart/form-data requests.
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Document = require('../../models/tenant/Document');
const Tenancy = require('../../models/tenant/Tenancy');
const Property = require('../../models/tenant/Property');
const MaintenanceTicket = require('../../models/tenant/MaintenanceTicket');
const { authenticateToken } = require('./auth');
const logger = require('../../lib/logger');

// Configure upload - strict 5MB limit to prevent server overload
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MegaBytes
});

// Middleware - Lock down to authenticated users only
router.use(authenticateToken);

// @route   POST /api/documents/upload
// @desc    Upload a document (Zero-config: stores in DB Buffer)
// We store small docs directly in MongoDB for simplicity (BSON limit 16MB).
// For larger apps, we'd use S3/Google Cloud Storage.
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const {
            title,
            type,
            category,
            propertyId,
            tenancyId,
            date,
            expiryDate
        } = req.body;

        const document = new Document({
            userId: req.user.userId,
            propertyId: propertyId || undefined,
            tenancyId: tenancyId || undefined,
            title,
            type,
            category,
            date: date || new Date(),
            expiryDate: expiryDate || undefined,
            mimeType: req.file.mimetype,
            size: req.file.size,
            fileData: req.file.buffer // Storing binary data directly in the database
        });

        await document.save();

        // Don't return the binary data in response (it's too large and unnecessary)
        const docResponse = document.toObject();
        delete docResponse.fileData;

        res.status(201).json(docResponse);
    } catch (err) {
        logger.error('Upload Error:', err);
        res.status(500).json({ error: 'Upload failed', details: err.message });
    }
});

// @route   GET /api/documents/property/:propertyId
// @desc    Get all documents for a property
router.get('/property/:propertyId', async (req, res) => {
    try {
        const docs = await Document.find({
            userId: req.user.userId,
            propertyId: req.params.propertyId
        })
            .select('-fileData') // Exclude heavy binary
            .sort({ date: -1 });

        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed' });
    }
});

// @route   GET /api/documents/:id/download
// @desc    Download a specific document
router.get('/:id/download', async (req, res) => {
    try {
        const doc = await Document.findOne({
            _id: req.params.id,
            userId: req.user.userId
        }).select('+fileData'); // Explicitly select buffer

        if (!doc) return res.status(404).json({ error: 'Not found' });

        res.set('Content-Type', doc.mimeType);
        res.set('Content-Disposition', `attachment; filename="${doc.title}.${doc.mimeType.split('/')[1]}"`);
        res.send(doc.fileData);
    } catch (err) {
        res.status(500).json({ error: 'Download failed' });
    }
});

// @route   GET /api/documents/export/ombudsman/:tenancyId
// @desc    Generate an Audit Code Pack for Ombudsman / Council
router.get('/export/ombudsman/:tenancyId', async (req, res) => {
    try {
        const tenancy = await Tenancy.findOne({
            _id: req.params.tenancyId,
            userId: req.user.userId
        }).populate('propertyId');

        if (!tenancy) return res.status(404).json({ error: 'Tenancy not found' });

        // 1. Gather Compliance Docs (Gas, EICR, EPC, Right to Rent)
        // Look for global property docs OR specific tenancy docs
        const documents = await Document.find({
            userId: req.user.userId,
            $or: [
                { tenancyId: tenancy._id },
                { propertyId: tenancy.propertyId._id, category: 'compliance' }
            ]
        }).select('-fileData');

        // 2. Gather Maintenance History (Crucial for disputes)
        const maintenance = await MaintenanceTicket.find({
            propertyId: tenancy.propertyId._id,
            // Ideally filter by tenancy dates, but for now grab all for property context
            createdAt: { $gte: tenancy.startDate, $lte: tenancy.endDate || new Date() }
        });

        // 3. Build the JSON Summary
        const auditPack = {
            generatedAt: new Date(),
            tenancyDetails: {
                address: tenancy.propertyId.address,
                startDate: tenancy.startDate,
                tenants: tenancy.tenants,
                rent: tenancy.rentAmount
            },
            complianceChecklist: {
                tenancyAgreement: documents.some(d => d.type === 'tenancy_agreement'),
                gasSafety: documents.some(d => d.type === 'gas_certificate'),
                eicr: documents.some(d => d.type === 'eicr'),
                epc: documents.some(d => d.type === 'epc'),
                depositProtected: documents.some(d => d.type === 'deposit_protection'),
            },
            documentLog: documents.map(d => ({
                date: d.date,
                title: d.title,
                type: d.type
            })),
            maintenanceLog: maintenance.map(m => ({
                date: m.createdAt,
                issue: m.title,
                status: m.status,
                priority: m.priority
            }))
        };

        res.json(auditPack);

    } catch (err) {
        logger.error('Export Error', err);
        res.status(500).json({ error: 'Export failed' });
    }
});

module.exports = router;
