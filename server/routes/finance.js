const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');

router.use(authenticateToken);

router.get('/mtd-summary', async (req, res) => {
    try {
        let query = supabaseAdmin
            .from('expenses')
            .select('category, tax_year, amount')
            .eq('user_id', req.user.userId);

        if (req.query.year) query = query.eq('tax_year', req.query.year);

        const { data: expenses, error } = await query;
        if (error) throw error;

        const byYear = {};
        expenses.forEach(e => {
            const yr = e.tax_year || 'unknown';
            if (!byYear[yr]) byYear[yr] = { taxYear: yr, categories: {}, grandTotal: 0 };
            byYear[yr].categories[e.category] = (byYear[yr].categories[e.category] || 0) + e.amount;
            byYear[yr].grandTotal += e.amount;
        });

        const mtdReport = Object.values(byYear).sort((a, b) => b.taxYear.localeCompare(a.taxYear)).map(yr => ({
            taxYear: yr.taxYear,
            totalExpenses: yr.grandTotal,
            breakdown: Object.entries(yr.categories).map(([category, amount]) => ({ category, amount })),
        }));

        res.json(mtdReport);
    } catch (err) {
        logger.error('MTD Summary Error', err);
        res.status(500).json({ error: 'Failed to generate financial summary' });
    }
});

module.exports = router;
