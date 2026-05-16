/**
 * COMPLIANCE ROUTES
 * Aggregates legal compliance data across the portfolio.
 * Calculates "Risk" status (High, Medium, Compliant) based on expiry dates of:
 * - Gas Safety Certificates (CP12)
 * - EICR (Electrical)
 * - EPC (Energy Performance)
 * - Deposit Protection
 * - Licensing (HMO/Select)
 */

const express = require('express');
const router = express.Router();
const Property = require('../../models/tenant/Property');
const { authenticateToken } = require('./auth');
const logger = require('../../lib/logger');
const auditService = require('../services/AuditService');

// @route   GET /api/compliance/summary
// @desc    Get dashboard compliance stats (Red/Amber/Green indicators)
// @access  Private
router.get('/summary', authenticateToken, async (req, res) => {
    try {
        const properties = await Property.find({ userId: req.user.id });

        const summary = {
            totalProperties: properties.length,
            highRisk: 0,
            mediumRisk: 0,
            compliant: 0,
            breakdown: {
                gasSafety: { expired: 0, expiringSoon: 0, valid: 0 },
                eicr: { expired: 0, expiringSoon: 0, valid: 0 },
                epc: { belowC: 0, expired: 0, valid: 0 },
                deposit: { unprotected: 0, valid: 0 },
                license: { expired: 0, valid: 0 }
            }
        };

        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        properties.forEach(prop => {
            let isHighRisk = false;
            let isMediumRisk = false;
            const c = prop.compliance || {};

            // Gas Safety Logic
            if (c.gasCertificateExpiry) {
                if (new Date(c.gasCertificateExpiry) < now) {
                    summary.breakdown.gasSafety.expired++;
                    isHighRisk = true;
                } else if (new Date(c.gasCertificateExpiry) < thirtyDaysFromNow) {
                    summary.breakdown.gasSafety.expiringSoon++;
                    isMediumRisk = true;
                } else {
                    summary.breakdown.gasSafety.valid++;
                }
            } else {
                // Assuming gas required if not specified otherwise? Or just count as missing data?
                // For now, if missing field, we don't count it as risk unless we know it needs gas.
                // Real world: should force user to specify.
            }

            // EICR Logic
            if (c.eicrExpiry) {
                if (new Date(c.eicrExpiry) < now) {
                    summary.breakdown.eicr.expired++;
                    isHighRisk = true;
                } else if (new Date(c.eicrExpiry) < thirtyDaysFromNow) {
                    summary.breakdown.eicr.expiringSoon++;
                    isMediumRisk = true;
                } else {
                    summary.breakdown.eicr.valid++;
                }
            }

            // EPC Logic
            if (['D', 'E', 'F', 'G'].includes(c.epcRating)) {
                summary.breakdown.epc.belowC++;
            }
            if (c.epcExpiryDate && new Date(c.epcExpiryDate) < now) {
                summary.breakdown.epc.expired++;
                isHighRisk = true;
            } else {
                summary.breakdown.epc.valid++;
            }

            // Deposit (Basic logic: if active tenancy, should be protected. 
            // Current property model doesn't link directly to active tenancy easily here without aggregation.
            // But property has depositProtected flag)
            if (c.depositProtected === false) {
                // Check if it's occupied? 
                if (prop.status === 'occupied') {
                    summary.breakdown.deposit.unprotected++;
                    isHighRisk = true;
                }
            } else {
                summary.breakdown.deposit.valid++;
            }

            // Licensing
            if (c.licensingType !== 'None' && c.licenseExpiry) {
                if (new Date(c.licenseExpiry) < now) {
                    summary.breakdown.license.expired++;
                    isHighRisk = true;
                } else {
                    summary.breakdown.license.valid++;
                }
            }

            if (isHighRisk) summary.highRisk++;
            else if (isMediumRisk) summary.mediumRisk++;
            else summary.compliant++;
        });

        res.json(summary);
    } catch (err) {
        logger.error('Error fetching compliance summary', err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   PUT /api/compliance/:propertyId
// @desc    Update compliance fields for a property
// @access  Private
router.put('/:propertyId', authenticateToken, async (req, res) => {
    try {
        const { compliance } = req.body;

        let property = await Property.findOne({ _id: req.params.propertyId, userId: req.user.id });
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        // Merge existing compliance with updates
        property.compliance = { ...property.compliance, ...compliance };

        await property.save();
        res.json(property);
    } catch (err) {
        logger.error('Error updating compliance', err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   GET /api/compliance/export-audit/:tenancyId
// @desc    Export Audit Pack for a tenancy
// @access  Private
router.get('/export-audit/:tenancyId', authenticateToken, async (req, res) => {
    try {
        const { tenancyId } = req.params;
        const auditPack = await auditService.getAuditPack(tenancyId, req.user.userId);

        // Set headers for file download
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename=audit_pack_${tenancyId}.json`);

        res.json(auditPack);
    } catch (err) {
        logger.error('Error exporting audit pack', err);
        if (err.message.includes('not found') || err.message.includes('unauthorized')) {
            return res.status(404).json({ msg: err.message });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
