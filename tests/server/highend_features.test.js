const request = require('supertest');
const express = require('express');
const analyticsRoute = require('../../server/routes/analytics');
const legalRoute = require('../../server/routes/legal');

// Models
const Property = require('../../models/tenant/Property');
const Expense = require('../../models/tenant/Expense');
const Tenancy = require('../../models/tenant/Tenancy');
const Document = require('../../models/tenant/Document');

// Mocks
jest.mock('../../models/tenant/Property');
jest.mock('../../models/tenant/Expense');
jest.mock('../../models/tenant/Tenancy');
jest.mock('../../models/tenant/Document');
jest.mock('../../server/routes/auth', () => ({
    authenticateToken: (req, res, next) => {
        req.user = { userId: 'test-user-id' };
        next();
    }
}));
jest.mock('../../lib/logger', () => ({
    error: jest.fn(),
    info: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/analytics', analyticsRoute);
app.use('/api/legal', legalRoute);

describe('High-End Features Verification', () => {
    beforeEach(() => jest.clearAllMocks());

    describe('Analytics: Portfolio KPIs', () => {
        it('should calculate Valuation, Equity and Yield correctly', async () => {
            // Mock Property: Value 500k, Mortgage 300k, Rent 2000
            Property.find.mockResolvedValue([{
                financials: { currentValuation: 500000, mortgageBalance: 300000 },
                rentAmount: 2000
            }]);

            // Mock Expenses: 5000/year
            Expense.aggregate.mockResolvedValue([{ totalOperatingExpense: 5000 }]);

            const res = await request(app).get('/api/analytics/portfolio');

            expect(res.statusCode).toBe(200);

            // Equity = 500k - 300k = 200k
            expect(res.body.valuation.equity).toBe(200000);

            // Gross Rent = 2000 * 12 = 24000
            expect(res.body.performance.annualGrossRent).toBe(24000);

            // NOI = 24000 - 5000 = 19000
            expect(res.body.performance.netOperatingIncome).toBe(19000);

            // Gross Yield = (24000 / 500000) * 100 = 4.8%
            expect(res.body.performance.grossYield).toBe(4.8);
        });
    });

    describe('Legal: Section 8 Validation', () => {
        it('should return errors if Gas Cert is missing', async () => {
            // Mock Tenancy
            Tenancy.findOne.mockReturnValue({
                populate: jest.fn().mockResolvedValue({
                    propertyId: { _id: 'prop-id', compliance: { epcRating: 'C', depositProtected: true } }
                })
            });

            // Mock Document (Gas Cert Missing -> null)
            Document.findOne.mockResolvedValue(null);

            const res = await request(app).post('/api/legal/section8/validate')
                .send({ tenancyId: 'ten-id', grounds: ['1'] });

            expect(res.statusCode).toBe(200);
            expect(res.body.isValid).toBe(false);
            expect(res.body.errors).toContain('Current Gas Safety Certificate not found or expired.');
        });

        it('should validate successfully if all docs present', async () => {
            // Mock Tenancy
            Tenancy.findOne.mockReturnValue({
                populate: jest.fn().mockResolvedValue({
                    propertyId: { _id: 'prop-id', compliance: { epcRating: 'C', depositProtected: true } }
                })
            });

            // Mock Document (Gas Cert Preset)
            Document.findOne.mockResolvedValue({ type: 'gas_certificate', expiryDate: new Date('2030-01-01') });

            const res = await request(app).post('/api/legal/section8/validate')
                .send({ tenancyId: 'ten-id', grounds: ['1'] });

            expect(res.body.isValid).toBe(true);
            expect(res.body.errors).toHaveLength(0);
        });
    });
});
