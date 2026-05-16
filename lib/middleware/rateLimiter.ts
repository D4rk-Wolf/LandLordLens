/**
 * Rate limiting middleware
 * Prevents abuse and DDoS attacks by limiting request rates
 */

import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import logger from '../logger';

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
    } as any, // Cast to any because the type definition expects specific message format or string
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req: Request, res: Response) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Too many requests from this IP, please try again later.',
        });
    },
});

/**
 * Strict rate limiter for authentication endpoints
 * Development: 100 requests per 15 minutes per IP (relaxed for HMR)
 * Production: 5 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: process.env.NODE_ENV === 'production' ? 5 : 100, // Relaxed for development
    message: {
        error: 'Too many authentication attempts, please try again later.',
    } as any,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
        logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Too many authentication attempts, please try again later.',
        });
    },
});

/**
 * Strict rate limiter for password reset and sensitive operations
 * 3 requests per hour per IP
 */
export const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 3, // Limit each IP to 3 requests per hour
    message: {
        error: 'Too many requests for this operation, please try again later.',
    } as any,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
        logger.warn(`Strict rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Too many requests for this operation, please try again later.',
        });
    },
});

// Default export if needed, or named exports are fine
export default {
    generalLimiter,
    authLimiter,
    strictLimiter,
};
