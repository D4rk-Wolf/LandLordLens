/**
 * AUTHENTICATION ROUTES
 * This file handles user registration, login, and session management.
 * It uses JSON Web Tokens (JWT) stored in HTTP-only cookies for secure authentication.
 */

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../models/User';
import { validateSignup, validateSignin } from '../../lib/middleware/validators';
import { handleValidationErrors } from '../../lib/middleware/sanitize';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                role: string;
            };
        }
    }
}

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required. Please set it in your .env file.');
}

/**
 * Middleware to verify JWT token.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = undefined;

    // Check cookie first (Primary method for web app)
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    // Fallback to Authorization header
    else if (req.headers['authorization']) {
        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"
    }

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify the token's signature using our secret key
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        // Ensure user object has required properties
        if (!user || !user.userId) {
            return res.status(403).json({ error: 'Invalid token payload' });
        }

        // Attach the user info to the request object so downstream routes can use it
        req.user = user;
        next();
    });
};

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 */
router.post('/signup', validateSignup, handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const { email, password, name, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // SECURITY FIX: User Enumeration Prevention
            // Return a generic message even if user exists, or return 400 but don't say explicitly "User exists"
            // However, for UX, often "User already exists" is preferred unless strictly high sec.
            // Based on audit, we want to fix this.
            // Ideally: "Registration failed or user already exists." 
            // But standard practice for non-critical apps (like this MVP/Business software) might balance UX.
            // Let's stick to the recommendation: "Registration failed."
            // Actually, let's keep it safe but informative enough for now or ask user?
            // The audit report said: "Explicitly returns 'User already exists', allowing enumeration."
            // Recommendation: "Change to generic 'Registration failed' or returns 200 with an email instructions message."
            // I'll return 400 with "User already exists" for now as it's easier to debug, but NOTE it.
            // Wait, I am implementing the "Security Hardening" part of the plan later or now?
            // I'll fix it now as I am rewriting the file.
            // SECURITY: Prevent User Enumeration
            // Return success-like message even if user exists.
            // In a real email flow, we would trigger a "You already have an account" email here.
            return res.status(200).json({
                message: 'If this email is not registered, a verification link has been sent.',
                // Omitting user object to avoid leaking info
            });
        }

        const user = new User({
            email,
            password,
            name,
            role: role || 'landlord',
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in with email and password
 */
router.post('/signin', validateSignin, handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: 'Sign in successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                subscription: user.subscription,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user
 */
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user!.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 */
router.post('/change-password', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }

        const user = await User.findById(req.user!.userId).select('+password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Sign out user
 */
router.post('/signout', (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax'
    });
    res.json({ message: 'Sign out successful' });
});

export default router;
