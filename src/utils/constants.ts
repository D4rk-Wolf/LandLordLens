/**
 * Application Constants
 * Centralized configuration values
 */

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const COMPLIANCE_EXPIRY_DAYS = 30;

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'DD MMMM YYYY',
};
