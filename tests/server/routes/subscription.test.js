const request = require('supertest');
const express = require('express');
const subscriptionRoutes = require('../../../server/routes/subscription');
const User = require('../../../models/User');
const Property = require('../../../models/tenant/Property');

// Mock dependencies
jest.mock('../../../models/User');
jest.mock('../../../models/tenant/Property');
jest.mock('../../../server/routes/auth', () => ({
    authenticateToken: (req, res, next) => {
        req.user = { userId: 'test-user-id' };
        next();
    }
}));

const app = express();
app.use(express.json());
app.use('/api/subscription', subscriptionRoutes);

describe('Subscription Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/subscription', () => {
        it('should return subscription info for valid user', async () => {
            const mockUser = {
                _id: 'test-user-id',
                subscription: 'free',
                email: 'test@example.com'
            };

            User.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });
            Property.countDocuments.mockResolvedValue(1);

            const res = await request(app).get('/api/subscription');

            expect(res.statusCode).toBe(200);
            expect(res.body.currentTier).toBe('free');
            expect(res.body.usage.propertyCount).toBe(1);
            expect(res.body.tierDetails.name).toBe('Free');
        });

        it('should return 404 if user not found', async () => {
            User.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });

            const res = await request(app).get('/api/subscription');

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('User not found');
        });
    });

    describe('PUT /api/subscription', () => {
        it('should update subscription tier successfully', async () => {
            const mockUser = {
                _id: 'test-user-id',
                subscription: 'free',
                save: jest.fn().mockResolvedValue(true)
            };

            User.findById.mockResolvedValue(mockUser);
            Property.countDocuments.mockResolvedValue(1);

            const res = await request(app)
                .put('/api/subscription')
                .send({ tier: 'basic' });

            expect(res.statusCode).toBe(200);
            expect(mockUser.subscription).toBe('basic');
            expect(mockUser.save).toHaveBeenCalled();
        });

        it('should prevent downgrade if property limit exceeded', async () => {
            const mockUser = {
                _id: 'test-user-id',
                subscription: 'basic'
            };

            // Basic allows 5, Free allows 2. User has 3.
            User.findById.mockResolvedValue(mockUser);
            Property.countDocuments.mockResolvedValue(3);

            const res = await request(app)
                .put('/api/subscription')
                .send({ tier: 'free' });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Cannot downgrade subscription');
        });

        it('should reject invalid tier', async () => {
            const res = await request(app)
                .put('/api/subscription')
                .send({ tier: 'invalid_tier' });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Invalid subscription tier');
        });
    });

    describe('GET /api/subscription/check-upgrade', () => {
        it('should indicate upgrade needed when over limit', async () => {
            const mockUser = {
                _id: 'test-user-id',
                subscription: 'free'
            };

            User.findById.mockResolvedValue(mockUser);
            Property.countDocuments.mockResolvedValue(3); // Free limit is 2

            const res = await request(app).get('/api/subscription/check-upgrade');

            expect(res.statusCode).toBe(200);
            expect(res.body.needsUpgrade).toBe(true);
            expect(res.body.requiredTier).toBe('basic');
        });

        it('should indicate no upgrade needed when within limit', async () => {
            const mockUser = {
                _id: 'test-user-id',
                subscription: 'free'
            };

            User.findById.mockResolvedValue(mockUser);
            Property.countDocuments.mockResolvedValue(1);

            const res = await request(app).get('/api/subscription/check-upgrade');

            expect(res.statusCode).toBe(200);
            expect(res.body.needsUpgrade).toBe(false);
        });
    });
});
