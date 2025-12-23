/**
 * Application Constants
 * Centralized configuration values
 */

// Log configuration on initialization
console.log('App Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  API_URL_ENV: process.env.REACT_APP_API_URL,
  FINAL_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const COMPLIANCE_EXPIRY_DAYS = 30;

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'DD MMMM YYYY',
};
