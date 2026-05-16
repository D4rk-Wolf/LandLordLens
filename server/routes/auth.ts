import express, { Request, Response, NextFunction } from 'express';
import supabaseAdmin from '../../lib/supabase';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                role: string;
                subscription: string;
            };
        }
    }
}

const router = express.Router();

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('role, subscription')
        .eq('id', user.id)
        .single();

    req.user = {
        userId: user.id,
        email: user.email ?? '',
        role: profile?.role ?? 'landlord',
        subscription: profile?.subscription ?? 'free',
    };

    next();
};

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', req.user!.userId)
        .single();

    res.json({ user: { id: req.user!.userId, email: req.user!.email, ...profile } });
});

router.post('/signout', (_req: Request, res: Response) => {
    res.json({ message: 'Sign out successful' });
});

export default router;
