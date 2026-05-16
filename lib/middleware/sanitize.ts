/**
 * Input sanitization middleware
 * Sanitizes user inputs to prevent XSS and injection attacks
 */

import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

/**
 * Sanitize string inputs - removes HTML tags and dangerous characters
 */
export const sanitizeString = (value: any): any => {
    if (typeof value !== 'string') return value;

    // Remove HTML tags
    let sanitized = value.replace(/<[^>]*>/g, '');

    // Remove potentially dangerous characters (keeping quotes for text content)
    sanitized = sanitized.replace(/[<>]/g, '');

    // Trim whitespace
    sanitized = sanitized.trim();

    return sanitized;
};

/**
 * Sanitize object recursively
 */
export const sanitizeObject = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        return sanitizeString(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }

    if (typeof obj === 'object') {
        const sanitized: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                sanitized[key] = sanitizeObject(obj[key]);
            }
        }
        return sanitized;
    }

    return obj;
};

/**
 * Middleware to sanitize request body, query, and params
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    if (req.query) {
        const sanitizedQuery = sanitizeObject(req.query);
        // req.query is often read-only, so we mutate keys
        Object.keys(req.query).forEach(key => {
            delete req.query[key];
        });
        Object.assign(req.query, sanitizedQuery);
    }
    if (req.params) {
        const sanitizedParams = sanitizeObject(req.params);
        // req.params might be read-only too
        Object.keys(req.params).forEach(key => {
            // req.params is actually often immutable in newer Express? 
            // But let's try direct assignment to keys or Object.assign
            // Usually params are simple strings.
            // If we can't write to req.params object, we might just skip sanitizing params if they are strict.
            // But let's try Object.assign pattern.
        });
        // Actually, typically params are just strings extracted from URL.
        // Sanitizing them is good.
        Object.assign(req.params, sanitizedParams);
    }
    next();
};

/**
 * Validation error handler
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array(),
        });
    }
    next();
};
