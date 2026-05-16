/**
 * ADMIN ROUTES
 * Restricted to users with 'role: admin'.
 * Allows management of all Users, Subscriptions, and App Updates.
 */

import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from './auth';
import User from '../../models/User';
// @ts-ignore
import Payment from '../../models/Payment';
// @ts-ignore
import AppUpdate from '../../models/AppUpdate';

const router = express.Router();

// Middleware to check admin role
// This runs AFTER authenticateToken, so we know req.user exists.
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ users });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update user
router.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update user subscription tier (admin only)
router.put('/users/:id/subscription', async (req: Request, res: Response) => {
    try {
        const { tier, subscriptionStatus, subscriptionPeriod } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate tier if provided
        if (tier) {
            const validTiers = ['free', 'starter', 'professional', 'business', 'enterprise'];
            if (!validTiers.includes(tier)) {
                return res.status(400).json({
                    error: 'Invalid subscription tier',
                    validTiers: validTiers,
                });
            }
            user.subscription = tier;
        }

        // Update subscription status if provided
        if (subscriptionStatus) {
            const validStatuses = ['active', 'canceled', 'past_due', 'trialing', 'incomplete'];
            if (!validStatuses.includes(subscriptionStatus)) {
                return res.status(400).json({
                    error: 'Invalid subscription status',
                    validStatuses: validStatuses,
                });
            }
            user.subscriptionStatus = subscriptionStatus;

            // Set canceled date if canceling
            if (subscriptionStatus === 'canceled' && !user.subscriptionCanceledAt) {
                user.subscriptionCanceledAt = new Date();
            }
        }

        // Update subscription period if provided
        if (subscriptionPeriod) {
            const validPeriods = ['monthly', 'yearly'];
            if (!validPeriods.includes(subscriptionPeriod)) {
                return res.status(400).json({
                    error: 'Invalid subscription period',
                    validPeriods: validPeriods,
                });
            }
            user.subscriptionPeriod = subscriptionPeriod;
        }

        user.updatedAt = new Date();
        await user.save();

        res.json({
            message: 'User subscription updated successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                subscription: user.subscription,
                subscriptionStatus: user.subscriptionStatus,
                subscriptionPeriod: user.subscriptionPeriod,
                subscriptionStartDate: user.subscriptionStartDate,
                subscriptionEndDate: user.subscriptionEndDate,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get all payments
router.get('/payments', async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        res.json({ payments });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get stats
router.get('/stats', async (req: Request, res: Response) => {
    try {
        const [totalUsers, activeUsers, totalPayments, totalRevenue] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isActive: true }),
            Payment.countDocuments(),
            Payment.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
        ]);

        res.json({
            stats: {
                totalUsers,
                activeUsers,
                totalPayments,
                totalRevenue: totalRevenue[0]?.total || 0,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get all app updates
router.get('/updates', async (req: Request, res: Response) => {
    try {
        const updates = await AppUpdate.find().sort({ releaseDate: -1 });
        res.json({ updates });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create app update
router.post('/updates', async (req: Request, res: Response) => {
    try {
        const update = new AppUpdate(req.body);
        await update.save();
        res.status(201).json({ update });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
