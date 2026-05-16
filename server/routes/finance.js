/**
 * FINANCE ROUTES
 * Generates tax reports specifically formatted for HMRC "Making Tax Digital" (MTD).
 * Groups expenses into HMRC-defined categories (e.g., "Rent, Rates & Insurance").
 */

const express = require('express');
const router = express.Router();
const Expense = require('../../models/tenant/Expense');
const { authenticateToken } = require('./auth');
const logger = require('../../lib/logger');

router.use(authenticateToken);

// @route   GET /api/finance/mtd-summary
// @desc    Get quarterly/yearly tax summaries mapped to HMRC buckets
router.get('/mtd-summary', async (req, res) => {
    try {
        const { year } = req.query; // e.g., "2025" for 2025-2026 tax year? Or just taxYear string "2025-2026"

        let matchStage = { userId: req.user.userId };
        if (year) {
            matchStage.taxYear = year;
        }

        const summary = await Expense.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        category: "$category",
                        taxYear: "$taxYear"
                    },
                    total: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.taxYear",
                    categories: {
                        $push: {
                            category: "$_id.category",
                            amount: "$total",
                            count: "$count"
                        }
                    },
                    grandTotal: { $sum: "$total" }
                }
            },
            { $sort: { _id: -1 } } // Sort by Tax Year descending
        ]);

        // Transform into HMRC MTD friendly JSON structure
        const mtdReport = summary.map(yearGroup => {
            // Initialize standard HMRC buckets to 0
            const buckets = {
                rent_rates_insurance: 0,
                repairs_maintenance: 0,
                legal_professional: 0,
                loan_interest: 0,
                other_allowable: 0,
                // ... others
            };

            // Fill buckets
            yearGroup.categories.forEach(c => {
                if (buckets.hasOwnProperty(c.category)) {
                    buckets[c.category] += c.amount;
                } else {
                    // Map legacy or unknowns to 'other'
                    buckets.other_allowable += c.amount;
                }
            });

            return {
                taxYear: yearGroup._id,
                totalExpenses: yearGroup.grandTotal,
                breakdown: yearGroup.categories // Raw breakdown
            };
        });

        res.json(mtdReport);

    } catch (err) {
        logger.error('MTD Summary Error', err);
        res.status(500).json({ error: 'Failed to generate financial summary' });
    }
});

module.exports = router;
