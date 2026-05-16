/**
 * ANALYTICS ROUTES
 * Calculates high-level portfolio metrics for the Dashboard "Investor View".
 * Key metrics: Gross/Net Yield, Equity, Loan-To-Value (LTV), Net Operating Income (NOI).
 */

const express = require('express');
const router = express.Router();
const Property = require('../../models/tenant/Property');
const Expense = require('../../models/tenant/Expense');
const Tenancy = require('../../models/tenant/Tenancy');
// Note: MaintenanceTicket and ComplianceRecord are required inline to avoid potential circular dependency issues.
const { authenticateToken } = require('./auth');
const logger = require('../../lib/logger');

router.use(authenticateToken);

// @route   GET /api/analytics/portfolio
// @desc    Get high-level portfolio KPIs: Valuation, Equity, Yield, NOI
// Used by: DashboardScreen (Investor View)
router.get('/portfolio', async (req, res) => {
    try {
        const userId = req.user.userId;

        // 1. Fetch Properties (Valuation & Mortgage data)
        const properties = await Property.find({ userId });

        let totalValuation = 0;
        let totalMortgageBalance = 0;
        let potentialMonthlyRent = 0;

        properties.forEach(p => {
            totalValuation += (p.financials?.currentValuation || 0);
            totalMortgageBalance += (p.financials?.mortgageBalance || 0);
            potentialMonthlyRent += (p.rentAmount || 0);
        });

        const totalEquity = totalValuation - totalMortgageBalance;
        const loanToValue = totalValuation > 0 ? (totalMortgageBalance / totalValuation) * 100 : 0;

        // 2. Fetch Financials (Last 12 Month Rolling Window for NOI)
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    userId,
                    date: { $gte: oneYearAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalOperatingExpense: { $sum: "$amount" }
                }
            }
        ]);

        // Calculate Revenue (Real revenue from Tenancies or Estimates?)
        // For "Investor View", we usually want *Realised* Revenue for historical NOI, 
        // but *Projected* Revenue for Yield. Let's do Realised for NOI.
        // Actually, let's grab actual rent Payment transactions if they existed, 
        // but simplifying for this MVP: We'll assume full occupancy revenue for Yield, 
        // and maybe basic estimation for NOI if 'Payment' model isn't fully populated with 12m history yet.
        // Better: Use Tenancy data to project Annual Rent.

        const annualGrossRent = potentialMonthlyRent * 12;
        const operatingExpense = expenses.length > 0 ? expenses[0].totalOperatingExpense : 0;

        const netOperatingIncome = annualGrossRent - operatingExpense;

        // Key Indicator: Net Yield
        // (NOI / Total Cost (or Value)) * 100
        const netYield = totalValuation > 0 ? (netOperatingIncome / totalValuation) * 100 : 0;
        const grossYield = totalValuation > 0 ? (annualGrossRent / totalValuation) * 100 : 0;

        res.json({
            valuation: {
                total: totalValuation,
                equity: totalEquity,
                ltv: parseFloat(loanToValue.toFixed(2))
            },
            performance: {
                annualGrossRent,
                operatingExpense,
                netOperatingIncome,
                grossYield: parseFloat(grossYield.toFixed(2)),
                netYield: parseFloat(netYield.toFixed(2))
            }
        });

    } catch (err) {
        logger.error('Analytics Error', err);
        res.status(500).json({ error: 'Failed to calculate portfolio analytics' });
    }
});

// @route   GET /api/analytics/dashboard-stats
// @desc    Get aggregated dashboard statistics in a single request
router.get('/dashboard-stats', async (req, res) => {
    try {
        const userId = req.user.userId;
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        // Parallelize database queries for performance
        const [
            totalProperties,
            activeTenancies,
            pendingMaintenance,
            expiringCompliance
        ] = await Promise.all([
            // 1. Total Properties
            Property.countDocuments({ userId }),

            // 2. Active Tenancies
            Tenancy.countDocuments({ userId, status: 'active' }),

            // 3. Pending Maintenance (Open or In Progress)
            require('../../models/tenant/MaintenanceTicket').countDocuments({
                userId,
                status: { $in: ['open', 'in_progress'] }
            }),

            // 4. Expiring Compliance (Next 30 Days)
            require('../../models/tenant/ComplianceRecord').countDocuments({
                userId,
                expiryDate: { $gte: now, $lte: thirtyDaysFromNow },
                status: 'valid' // Assuming we only care about valid ones expiring
            })
        ]);

        res.json({
            stats: {
                totalProperties,
                activeTenancies,
                pendingMaintenance,
                expiringCompliance
            }
        });

    } catch (err) {
        logger.error('Dashboard Stats Error', err);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
});

module.exports = router;
