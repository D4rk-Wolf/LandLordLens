const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');

router.use(authenticateToken);

router.post('/section8/validate', async (req, res) => {
    try {
        const { tenancyId, grounds = [] } = req.body;

        const { data: tenancy } = await supabaseAdmin
            .from('tenancies').select('*, properties(compliance, financials)')
            .eq('id', tenancyId).eq('user_id', req.user.userId).single();

        if (!tenancy) return res.status(404).json({ error: 'Tenancy not found' });

        const errors = [];
        const compliance = tenancy.properties?.compliance ?? {};

        if (!compliance.gasExpiryDate || new Date(compliance.gasExpiryDate) < new Date()) {
            errors.push('Current Gas Safety Certificate not found or expired.');
        }
        if (!compliance.epcRating || ['F', 'G'].includes(compliance.epcRating)) {
            errors.push('EPC Rating is below E. Possession claim may fail.');
        }
        if (!tenancy.deposit_protected) {
            errors.push('Deposit is not marked as protected. Risk of counter-claim.');
        }

        let noticePeriodMonths = 2;
        if (grounds.includes('1') || grounds.includes('1A')) noticePeriodMonths = 4;
        if (grounds.includes('8') || grounds.includes('10')) noticePeriodMonths = 0.5;

        const validDate = new Date();
        validDate.setMonth(validDate.getMonth() + noticePeriodMonths);

        res.json({ isValid: errors.length === 0, errors, earliestPossessionDate: validDate });
    } catch (err) {
        logger.error('Legal Validation Error', err);
        res.status(500).json({ error: 'Validation failed' });
    }
});

router.post('/section8/create', async (req, res) => {
    try {
        const { tenancyId, propertyId, grounds, noticeContent } = req.body;

        const { data, error } = await supabaseAdmin.from('tenancies')
            .update({ notes: `Section 8 notice issued: ${JSON.stringify({ grounds, noticeContent, servedDate: new Date().toISOString() })}` })
            .eq('id', tenancyId).eq('user_id', req.user.userId).select().single();

        if (error) throw error;
        res.status(201).json({ message: 'Section 8 notice recorded', tenancy: data });
    } catch (err) {
        logger.error('Notice Creation Error', err);
        res.status(500).json({ error: 'Failed to create notice' });
    }
});

module.exports = router;
