const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');

router.use(authenticateToken);

router.get('/portfolio', async (req, res) => {
    try {
        const userId = req.user.userId;

        const { data: properties } = await supabaseAdmin
            .from('properties').select('rent_amount, financials').eq('user_id', userId);

        let totalValuation = 0, totalMortgageBalance = 0, potentialMonthlyRent = 0;
        (properties ?? []).forEach(p => {
            totalValuation += (p.financials?.currentValuation || 0);
            totalMortgageBalance += (p.financials?.mortgageBalance || 0);
            potentialMonthlyRent += (p.rent_amount || 0);
        });

        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const { data: expenses } = await supabaseAdmin
            .from('expenses').select('amount')
            .eq('user_id', userId).gte('date', oneYearAgo.toISOString().split('T')[0]);

        const operatingExpense = (expenses ?? []).reduce((sum, e) => sum + (e.amount || 0), 0);
        const annualGrossRent = potentialMonthlyRent * 12;
        const netOperatingIncome = annualGrossRent - operatingExpense;
        const totalEquity = totalValuation - totalMortgageBalance;
        const loanToValue = totalValuation > 0 ? (totalMortgageBalance / totalValuation) * 100 : 0;
        const netYield = totalValuation > 0 ? (netOperatingIncome / totalValuation) * 100 : 0;
        const grossYield = totalValuation > 0 ? (annualGrossRent / totalValuation) * 100 : 0;

        res.json({
            valuation: { total: totalValuation, equity: totalEquity, ltv: parseFloat(loanToValue.toFixed(2)) },
            performance: { annualGrossRent, operatingExpense, netOperatingIncome, grossYield: parseFloat(grossYield.toFixed(2)), netYield: parseFloat(netYield.toFixed(2)) },
        });
    } catch (err) {
        logger.error('Analytics Error', err);
        res.status(500).json({ error: 'Failed to calculate portfolio analytics' });
    }
});

router.get('/dashboard-stats', async (req, res) => {
    try {
        const userId = req.user.userId;
        const now = new Date().toISOString().split('T')[0];
        const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const [totalProps, activeTenancies, pendingMaint, expiringComp] = await Promise.all([
            supabaseAdmin.from('properties').select('id', { count: 'exact', head: true }).eq('user_id', userId),
            supabaseAdmin.from('tenancies').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'active'),
            supabaseAdmin.from('maintenance_tickets').select('id', { count: 'exact', head: true }).eq('user_id', userId).in('status', ['open', 'in_progress']),
            supabaseAdmin.from('compliance_records').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('expiry_date', now).lte('expiry_date', thirtyDaysFromNow),
        ]);

        res.json({
            stats: {
                totalProperties: totalProps.count ?? 0,
                activeTenancies: activeTenancies.count ?? 0,
                pendingMaintenance: pendingMaint.count ?? 0,
                expiringCompliance: expiringComp.count ?? 0,
            },
        });
    } catch (err) {
        logger.error('Dashboard Stats Error', err);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
});

module.exports = router;
