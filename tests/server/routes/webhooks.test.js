const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const webhooksRoutes = require('../../../server/routes/webhooks');
const { stripe } = require('../../../lib/stripe');
const User = require('../../../models/User');
const Payment = require('../../../models/Payment');

// Mock dependencies
jest.mock('../../../lib/stripe');
jest.mock('../../../models/User');
jest.mock('../../../models/Payment');

const app = express();
// Webhook route expects raw body for signature verification in real app,
// but for testing we can just use json if we mock the construction
app.use(express.json());
app.use('/api/webhooks', webhooksRoutes);

describe('Webhook Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default mock for constructEvent
        stripe.webhooks.constructEvent = jest.fn((body) => body);
    });

    it('should handle checkout.session.completed', async () => {
        const event = {
            type: 'checkout.session.completed',
            data: {
                object: {
                    metadata: { userId: 'user-id-123' },
                    subscription: 'sub_123'
                }
            }
        };

        const mockUser = {
            _id: 'user-id-123',
            save: jest.fn()
        };

        User.findById.mockResolvedValue(mockUser);
        stripe.subscriptions.retrieve.mockResolvedValue({
            id: 'sub_123',
            status: 'active',
            items: { data: [{ price: { id: 'price_basic' } }] },
            current_period_start: 1000000,
            current_period_end: 2000000
        });

        stripe.webhooks.constructEvent.mockReturnValue(event);

        const res = await request(app)
            .post('/api/webhooks/stripe')
            .send(event);

        expect(res.statusCode).toBe(200);
        expect(User.findById).toHaveBeenCalledWith('user-id-123');
        // Verify user update logic was called (implicitly via save, or check subscription props)
        // Since updateUserSubscription modifies user object and calls save:
        expect(mockUser.subscription).toBe('basic');
        expect(mockUser.save).toHaveBeenCalled();
    });

    it('should return 400 on signature verification failure', async () => {
        stripe.webhooks.constructEvent.mockImplementation(() => {
            throw new Error('Invalid signature');
        });

        const res = await request(app)
            .post('/api/webhooks/stripe')
            .send({});

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Webhook Error: Invalid signature');
    });

    it('should handle customer.subscription.deleted', async () => {
        const event = {
            type: 'customer.subscription.deleted',
            data: {
                object: {
                    customer: 'cus_123'
                }
            }
        };

        const mockUser = {
            _id: 'user-id-123',
            stripeCustomerId: 'cus_123',
            save: jest.fn()
        };

        User.findOne.mockResolvedValue(mockUser);
        stripe.webhooks.constructEvent.mockReturnValue(event);

        const res = await request(app)
            .post('/api/webhooks/stripe')
            .send(event);

        expect(res.statusCode).toBe(200);
        expect(User.findOne).toHaveBeenCalledWith({ stripeCustomerId: 'cus_123' });
        expect(mockUser.subscription).toBe('free');
        expect(mockUser.subscriptionStatus).toBe('canceled');
        expect(mockUser.save).toHaveBeenCalled();
    });

    it('should handle invoice.paid', async () => {
        const event = {
            type: 'invoice.paid',
            data: {
                object: {
                    id: 'in_123',
                    customer: 'cus_123',
                    amount_paid: 2000,
                    currency: 'usd',
                    charge: 'ch_123',
                    subscription: 'sub_123',
                    period_start: 1000,
                    period_end: 2000
                }
            }
        };

        const mockUser = { _id: 'user-id-123', subscription: 'basic' };
        User.findOne.mockResolvedValue(mockUser);

        const mockSave = jest.fn();
        Payment.mockImplementation(() => ({ save: mockSave }));

        stripe.webhooks.constructEvent.mockReturnValue(event);

        const res = await request(app)
            .post('/api/webhooks/stripe')
            .send(event);

        expect(res.statusCode).toBe(200);
        expect(Payment).toHaveBeenCalledTimes(1);
        expect(mockSave).toHaveBeenCalled();
    });
});
