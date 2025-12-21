/**
 * Input sanitization middleware
 * Sanitizes user inputs to prevent XSS and injection attacks
 */

const { validationResult } = require('express-validator');

/**
 * Sanitize string inputs - removes HTML tags and dangerous characters
 */
const sanitizeString = (value) => {
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
const sanitizeObject = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
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
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  next();
};

/**
 * Validation error handler
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array(),
    });
  }
  next();
};

module.exports = {
  sanitizeInput,
  sanitizeString,
  sanitizeObject,
  handleValidationErrors,
};
