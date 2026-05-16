const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');

const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } });

router.use(authenticateToken);

// Document uploads are stored as JSONB in compliance_records.documents
// Full file storage via Supabase Storage is a future task
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const { title, type, propertyId, tenancyId, date, expiryDate } = req.body;

        const docEntry = {
            id: crypto.randomUUID(),
            title,
            type,
            mime_type: req.file.mimetype,
            size: req.file.size,
            property_id: propertyId,
            tenancy_id: tenancyId,
            date: date || new Date().toISOString(),
            expiry_date: expiryDate || null,
            uploaded_at: new Date().toISOString(),
        };

        if (propertyId) {
            const { data: prop } = await supabaseAdmin.from('properties').select('compliance').eq('id', propertyId).eq('user_id', req.user.userId).single();
            const compliance = prop?.compliance ?? {};
            const docs = Array.isArray(compliance.documents) ? compliance.documents : [];
            docs.push(docEntry);
            await supabaseAdmin.from('properties').update({ compliance: { ...compliance, documents: docs } }).eq('id', propertyId);
        }

        res.status(201).json(docEntry);
    } catch (err) {
        logger.error('Upload Error:', err);
        res.status(500).json({ error: 'Upload failed', details: err.message });
    }
});

router.get('/property/:propertyId', async (req, res) => {
    try {
        const { data: prop, error } = await supabaseAdmin
            .from('properties').select('compliance').eq('id', req.params.propertyId).eq('user_id', req.user.userId).single();
        if (error || !prop) return res.status(404).json({ error: 'Property not found' });

        const docs = prop.compliance?.documents ?? [];
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed' });
    }
});

router.get('/export/ombudsman/:tenancyId', async (req, res) => {
    try {
        const { data: tenancy } = await supabaseAdmin
            .from('tenancies').select('*, properties(address, compliance)')
            .eq('id', req.params.tenancyId).eq('user_id', req.user.userId).single();

        if (!tenancy) return res.status(404).json({ error: 'Tenancy not found' });

        const { data: maintenance } = await supabaseAdmin
            .from('maintenance_tickets').select('title, status, priority, created_at')
            .eq('property_id', tenancy.property_id);

        const compliance = tenancy.properties?.compliance ?? {};
        const docs = compliance.documents ?? [];

        const auditPack = {
            generatedAt: new Date(),
            tenancyDetails: {
                address: tenancy.properties?.address,
                startDate: tenancy.start_date,
                tenant: tenancy.tenant_name,
                rent: tenancy.monthly_rent,
            },
            complianceChecklist: {
                gasSafety: !!compliance.gasCertExpiry,
                epcRating: compliance.epcRating,
                depositProtected: tenancy.deposit_protected,
            },
            documentLog: docs.map(d => ({ date: d.date, title: d.title, type: d.type })),
            maintenanceLog: (maintenance ?? []).map(m => ({ date: m.created_at, issue: m.title, status: m.status, priority: m.priority })),
        };

        res.json(auditPack);
    } catch (err) {
        logger.error('Export Error', err);
        res.status(500).json({ error: 'Export failed' });
    }
});

module.exports = router;
