/**
 * SERVICES ROUTES
 * Acts as a gateway/proxy to external data services (EPC, Rent Estimates)
 * and internally manages the Affiliate Service Catalog (Insurance, Mortgages).
 */

const express = require('express');
const { authenticateToken } = require('./auth');
const epcService = require('../services/external/EpcService');
const rentService = require('../services/external/RentService');
const servicesService = require('../services/ServicesService'); // Affiliate Catalog logic
const { validationResult, query, body } = require('express-validator');
const logger = require('../../lib/logger');

const router = express.Router();

// All service routes require authentication
router.use(authenticateToken);

// GET /api/services/epc-lookup?postcode=...
// Proxies request to government EPC API (via EpcService)
router.get('/epc-lookup', [
    query('postcode').trim().notEmpty().withMessage('Postcode is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { postcode } = req.query;
        const data = await epcService.getEpcData(postcode);
        res.json(data);
    } catch (error) {
        logger.error('EPC Lookup Error', error);
        res.status(500).json({ error: 'Failed to fetch EPC data' });
    }
});

// POST /api/services/rent-estimate
router.post('/rent-estimate', [
    body('postcode').trim().notEmpty().withMessage('Postcode is required'),
    body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a positive integer'),
    body('propertyType').isIn(['house', 'flat', 'apartment', 'bungalow', 'other'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { postcode, bedrooms, propertyType } = req.body;
        const data = await rentService.getRentEstimate({ postcode, bedrooms, propertyType });
        res.json(data);
    } catch (error) {
        logger.error('Rent Estimate Error', error);
        res.status(500).json({ error: 'Failed to fetch rent estimate' });
    }
});

// GET /api/services/catalog
router.get('/catalog', async (req, res) => {
    try {
        const catalog = await servicesService.getCatalog();
        res.json(catalog);
    } catch (error) {
        logger.error('Error fetching service catalog', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// POST /api/services/click/:id
router.post('/click/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { context } = req.body; // e.g., { propertyId, source: 'dashboard' }

        const result = await servicesService.trackClick(id, req.user.userId, context);

        if (!result) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json(result);
    } catch (error) {
        logger.error('Error tracking service click', error);
        res.status(500).json({ error: 'Failed to track click' });
    }
});

module.exports = router;

