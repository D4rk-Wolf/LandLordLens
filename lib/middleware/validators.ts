/**
 * Request validation middleware using express-validator
 * Provides reusable validation rules for common inputs
 */

import { body, param, query, ValidationChain } from 'express-validator';

/**
 * Email validation
 */
export const validateEmail = (): ValidationChain => {
    return body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail();
};

/**
 * Password validation
 */
export const validatePassword = (fieldName: string = 'password'): ValidationChain => {
    return body(fieldName)
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .optional({ nullable: true });
};

/**
 * Name validation
 */
export const validateName = (fieldName: string = 'name'): ValidationChain => {
    return body(fieldName)
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes');
};

export const validateUUID = (fieldName: string = 'id'): ValidationChain => {
    return param(fieldName)
        .isUUID()
        .withMessage('Invalid ID format');
};

/**
 * Signup validation
 */
export const validateSignup = [
    validateEmail(),
    validatePassword('password'), // Removed second arg as it wasn't in signature, assuming implementation logic
    validateName('name'),
    body('role')
        .optional()
        .isIn(['landlord', 'admin', 'tenant'])
        .withMessage('Invalid role'),
];

/**
 * Signin validation
 */
export const validateSignin = [
    validateEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

/**
 * Property creation validation
 */
export const validateProperty = [
    body('address.line1')
        .trim()
        .notEmpty()
        .withMessage('Address line 1 is required')
        .isLength({ max: 200 })
        .withMessage('Address line 1 must be less than 200 characters'),
    body('address.city')
        .trim()
        .notEmpty()
        .withMessage('City is required')
        .isLength({ max: 100 })
        .withMessage('City must be less than 100 characters'),
    body('address.postcode')
        .trim()
        .notEmpty()
        .withMessage('Postcode is required')
        .matches(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i)
        .withMessage('Please provide a valid UK postcode'),
    body('propertyType')
        .isIn(['house', 'flat', 'apartment', 'bungalow', 'other'])
        .withMessage('Invalid property type'),
    body('bedrooms')
        .isInt({ min: 0, max: 20 })
        .withMessage('Bedrooms must be a number between 0 and 20'),
    body('bathrooms')
        .optional()
        .isInt({ min: 0, max: 10 })
        .withMessage('Bathrooms must be a number between 0 and 10'),
    body('rentAmount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Rent amount must be a positive number'),
];

/**
 * Pagination validation
 */
export const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
];

export default {
    validateEmail,
    validatePassword,
    validateName,
    validateUUID,
    validateSignup,
    validateSignin,
    validateProperty,
    validatePagination,
};
