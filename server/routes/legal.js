/**
 * LEGAL ROUTES
 * Handles generation and validation of legal notices (Section 8, Section 21).
 * 
 * CRITICAL: Performs "Deregulation Act 2015" validity checks.
 * A notice is invalid if:
 * 1. Gas Safety Cert was missing/expired at start.
 * 2. EPC is below band E.
 * 3. Deposit is not protected (for S21).
 * 4. "How to Rent" guide wasn't served (not fully checked here yet, but implied).
 */

const express = require('express');
const router = express.Router();
const PossessionNotice = require('../../models/tenant/PossessionNotice');
const Tenancy = require('../../models/tenant/Tenancy');
const Property = require('../../models/tenant/Property');
const Document = require('../../models/tenant/Document');
const { authenticateToken } = require('./auth');
const logger = require('../../lib/logger');

router.use(authenticateToken);

// @route   POST /api/legal/section8/validate
// @desc    Pre-flight check: Can we strictly legally serve a notice?
// Returns a list of reasons why a notice might fail in court.
router.post('/section8/validate', async (req, res) => {
    try {
        const { tenancyId, grounds } = req.body;
        const errors = [];

        const tenancy = await Tenancy.findOne({ _id: tenancyId, userId: req.user.userId }).populate('propertyId');
        if (!tenancy) return res.status(404).json({ error: 'Tenancy not found' });

        const propertyId = tenancy.propertyId._id;

        // 1. Deregulation Act 2015 Checks (Apply to S21, but good practice/often required for S8 defensibility too)

        // Check Gas Safety
        // Find a gas cert that covers the START date of the tenancy? Or just current?
        // Strict: Must have been valid at start + current.
        const gasCert = await Document.findOne({
            propertyId,
            type: 'gas_certificate',
            expiryDate: { $gte: new Date() } // Must be valid now
        });
        if (!gasCert) errors.push('Current Gas Safety Certificate not found or expired.');

        // Check EPC
        // Must be E or above.
        const epc = tenancy.propertyId.compliance?.epcRating;
        if (!epc || ['F', 'G'].includes(epc)) {
            // Check for exemption doc? For MVP, just flag it.
            errors.push('EPC Rating is below E. Possession claim may fail.');
        }

        // Check Deposit Protection
        // Mandatory Ground 8 (Arrears) often fails if deposit not protected within 30 days.
        if (!tenancy.propertyId.compliance?.depositProtected) {
            errors.push('Deposit is not marked as protected. Risk of counter-claim.');
        }

        // Ground Specific Checks
        // If Ground 4A (Student), check if it's a student let? (Hard to validate auto, maybe warn)
        // If Ground 8 (Arrears), check arrears amount?
        // (We would need Payment logic here. For now, we trust user input but warn).

        // Calculate Earliest Date
        // Most grounds = 2 weeks or 2 months. 
        // Selling (Ground 1A) = 4 months (Renters Rights Act).
        let noticePeriodMonths = 2;
        if (grounds.includes('1') || grounds.includes('1A')) noticePeriodMonths = 4;
        if (grounds.includes('8') || grounds.includes('10')) noticePeriodMonths = 0.5; // 2 weeks (approx)

        const validDate = new Date();
        validDate.setMonth(validDate.getMonth() + noticePeriodMonths);

        res.json({
            isValid: errors.length === 0,
            errors,
            earliestPossessionDate: validDate
        });

    } catch (err) {
        logger.error('Legal Validation Error', err);
        res.status(500).json({ error: 'Validation failed' });
    }
});

// @route   POST /api/legal/section8/create
// @desc    Generate and save the notice
router.post('/section8/create', async (req, res) => {
    try {
        const { tenancyId, propertyId, grounds, noticeContent } = req.body;

        // Create the record
        const notice = new PossessionNotice({
            userId: req.user.userId,
            tenancyId,
            propertyId,
            type: 'section_8',
            grounds,
            status: 'issued',
            servedDate: new Date(),
            noticeContent // In real app, we might generate PDF here
        });

        await notice.save();
        res.status(201).json(notice);

    } catch (err) {
        logger.error('Notice Creation Error', err);
        res.status(500).json({ error: 'Failed to create notice' });
    }
});

module.exports = router;
