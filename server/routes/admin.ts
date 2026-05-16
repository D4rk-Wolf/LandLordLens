import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from './auth';
import supabaseAdmin from '../../lib/supabase';

const router = express.Router();

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required' });
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
};

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/users', async (_req: Request, res: Response) => {
    try {
        const { data: users, error } = await supabaseAdmin
            .from('profiles').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        res.json({ users });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const { data: user, error } = await supabaseAdmin
            .from('profiles').select('*').eq('id', req.params.id).single();
        if (error || !user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id/subscription', async (req: Request, res: Response) => {
    try {
        const { tier, subscriptionStatus, subscriptionPeriod } = req.body;
        const updates: Record<string, any> = { updated_at: new Date().toISOString() };

        const validTiers = ['free', 'starter', 'professional', 'business', 'enterprise'];
        if (tier && !validTiers.includes(tier)) {
            return res.status(400).json({ error: 'Invalid subscription tier', validTiers });
        }
        if (tier) updates.subscription = tier;

        const validStatuses = ['active', 'canceled', 'past_due', 'trialing', 'incomplete'];
        if (subscriptionStatus && !validStatuses.includes(subscriptionStatus)) {
            return res.status(400).json({ error: 'Invalid subscription status', validStatuses });
        }
        if (subscriptionStatus) {
            updates.subscription_status = subscriptionStatus;
            if (subscriptionStatus === 'canceled') updates.subscription_canceled_at = new Date().toISOString();
        }

        const validPeriods = ['monthly', 'yearly'];
        if (subscriptionPeriod && !validPeriods.includes(subscriptionPeriod)) {
            return res.status(400).json({ error: 'Invalid subscription period', validPeriods });
        }
        if (subscriptionPeriod) updates.subscription_period = subscriptionPeriod;

        const { data: user, error } = await supabaseAdmin
            .from('profiles').update(updates).eq('id', req.params.id).select().single();
        if (error || !user) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User subscription updated successfully', user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', async (_req: Request, res: Response) => {
    try {
        const [usersResult, activeUsersResult, paymentsResult, revenueResult] = await Promise.all([
            supabaseAdmin.from('profiles').select('id', { count: 'exact', head: true }),
            supabaseAdmin.from('profiles').select('id', { count: 'exact', head: true }).eq('is_active', true),
            supabaseAdmin.from('payments').select('id', { count: 'exact', head: true }),
            supabaseAdmin.from('payments').select('amount').eq('status', 'succeeded'),
        ]);

        const totalRevenue = (revenueResult.data ?? []).reduce((sum: number, p: any) => sum + (p.amount ?? 0), 0);

        res.json({
            stats: {
                totalUsers: usersResult.count ?? 0,
                activeUsers: activeUsersResult.count ?? 0,
                totalPayments: paymentsResult.count ?? 0,
                totalRevenue,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
