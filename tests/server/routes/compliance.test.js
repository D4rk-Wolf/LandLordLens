const request = require('supertest');
const express = require('express');
const complianceRoutes = require('../../../server/routes/compliance');
const Property = require('../../../models/tenant/Property');

// Mock dependencies
jest.mock('../../../models/tenant/Property');
jest.mock('../../../server/routes/auth', () => ({
    authenticateToken: (req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
    }
}));
jest.mock('../../../lib/logger', () => ({
    error: jest.fn(),
    info: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/compliance', complianceRoutes);

describe('Compliance Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/compliance/summary', () => {
        it('should calculate risk levels correctly', async () => {
            const now = new Date();
            const expiredDate = new Date(now.getTime() - 100000);
            const expiringSoonDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days
            const validDate = new Date(now.getTime() + 100 * 24 * 60 * 60 * 1000); // 100 days

            const mockProperties = [
                {
                    // High Risk: Expired Gas
                    userId: 'test-user-id',
                    status: 'occupied',
                    compliance: {
                        gasCertificateExpiry: expiredDate,
                        epcRating: 'C',
                        depositProtected: true
                    }
                },
                {
                    // Medium Risk: Expiring Soon EICR
                    userId: 'test-user-id',
                    status: 'occupied',
                    compliance: {
                        gasCertificateExpiry: validDate,
                        eicrExpiry: expiringSoonDate,
                        epcRating: 'C',
                        depositProtected: true
                    }
                },
                {
                    // Low Risk / Compliant
                    userId: 'test-user-id',
                    status: 'occupied',
                    compliance: {
                        gasCertificateExpiry: validDate,
                        eicrExpiry: validDate,
                        epcRating: 'C',
                        depositProtected: true
                    }
                },
                {
                    // High Risk: Low EPC
                    userId: 'test-user-id',
                    status: 'occupied',
                    compliance: {
                        epcRating: 'E' // Below C
                    }
                }
            ];

            Property.find.mockResolvedValue(mockProperties);

            const res = await request(app).get('/api/compliance/summary');

            expect(res.statusCode).toBe(200);
            expect(res.body.totalProperties).toBe(4);
            // High Risk: Prop 1 (Gas), Prop 4 (EPC < C checks logic? No, current logic only counts EPC < C as 'belowC' stat, but does it flag high risk?
            // Let's check logic: "if (['D', 'E', 'F', 'G'].includes(c.epcRating)) { summary.breakdown.epc.belowC++; }"
            // Does it set isHighRisk? "if (c.epcExpiryDate && ... < now)".
            // So EPC Rating alone doesn't set High Risk (unless it's expired).
            // Prop 1 is High Risk.
            // Prop 2 is Medium Risk.
            // Prop 3 is Compliant.
            // Prop 4 is Compliant (unless EPC expired check fails? It has no date).
            // Wait, let's verify my logic in compliance.js

            // Re-reading logic in compliance.js:
            // if (['D', 'E', 'F', 'G']...) summary.breakdown.epc.belowC++; (Independent of dashboard main risk?)
            // isHighRisk is set by: Gas Expired, EICR Expired, EPC Expired, Deposit Unprotected, License Expired.
            // So Low EPC is NOT High Risk in summary count (it's just a warning/stat).

            expect(res.body.highRisk).toBe(1); // Only Prop 1
            expect(res.body.mediumRisk).toBe(1); // Prop 2
            expect(res.body.compliant).toBe(2); // Prop 3 and 4

            expect(res.body.breakdown.gasSafety.expired).toBe(1);
            expect(res.body.breakdown.eicr.expiringSoon).toBe(1);
            expect(res.body.breakdown.epc.belowC).toBe(1);
        });

        it('should handle undefined compliance object gracefullly', async () => {
            Property.find.mockResolvedValue([{ userId: 'test', compliance: undefined }]);
            const res = await request(app).get('/api/compliance/summary');
            expect(res.statusCode).toBe(200);
            expect(res.body.totalProperties).toBe(1);
            expect(res.body.compliant).toBe(1); // Default safe
        });
    });

    describe('PUT /api/compliance/:id', () => {
        it('should update compliance fields', async () => {
            const mockProperty = {
                _id: 'prop-id',
                userId: 'test-user-id',
                compliance: { epcRating: 'E' },
                save: jest.fn().mockResolvedValue(true)
            };

            Property.findOne.mockResolvedValue(mockProperty);

            const res = await request(app)
                .put('/api/compliance/prop-id')
                .send({ compliance: { epcRating: 'C' } });

            expect(res.statusCode).toBe(200);
            expect(mockProperty.compliance.epcRating).toBe('C');
            expect(mockProperty.save).toHaveBeenCalled();
        });
    });
});
