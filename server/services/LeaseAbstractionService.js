const pdf = require('pdf-parse'); // Library to parse PDF text content
const logger = require('../../lib/logger');

/**
 * Parses a lease PDF file and extracts key information using Regex patterns.
 * This is a "Heuristic" based abstraction - it guesses fields based on common patterns.
 * In a production AI app, we might replace this with a Large Language Model (LLM) API.
 * 
 * @param {Buffer} pdfBuffer - The raw PDF data from the uploaded file
 * @returns {Object} Extracted lease details (tenant name, dates, rent, etc.)
 */
const parseLease = async (pdfBuffer) => {
    try {
        const data = await pdf(pdfBuffer);
        const text = data.text; // Start with the raw text from the PDF

        logger.info('PDF parsed, extracting lease details...');

        return extractLeaseDetails(text);
    } catch (error) {
        logger.error('Error parsing PDF lease', error);
        throw new Error('Failed to parse PDF file');
    }
};

const extractLeaseDetails = (text) => {
    // Normalize text: remove excessive whitespace for reliable regex matching
    const cleanText = text.replace(/\s+/g, ' ');

    return {
        tenantName: extractTenantName(cleanText),
        startDate: extractDate(cleanText, ['Commencement Date', 'Start Date', 'Term Start', 'commencing on']),
        endDate: extractDate(cleanText, ['Expiration Date', 'End Date', 'Term End', 'ending on']),
        monthlyRent: extractMoney(cleanText, ['Rent', 'per month', 'monthly']),
        deposit: extractMoney(cleanText, ['Deposit', 'Security Deposit'])
    };
};

// Helper: Extract Tenant Name looking for "Tenant: John Doe" or "BETWEEN X AND Y" patterns
const extractTenantName = (text) => {
    // Try to find "Tenant" section
    // Pattern: "Tenant: [Name]" or "The Tenant: [Name]"
    const tenantRegex = /(?:The )?Tenant:\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/i;
    const match = text.match(tenantRegex);
    if (match && match[1]) return match[1].trim();

    // Fallback: designated space between definitions
    // "BETWEEN [Landlord] AND [Tenant]"
    const betweenRegex = /BETWEEN.*?AND\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/i;
    const betweenMatch = text.match(betweenRegex);
    if (betweenMatch && betweenMatch[1]) return betweenMatch[1].trim();

    return '';
};

// Helper: Find a date near specific keywords
const extractDate = (text, keywords) => {
    // Look for dates near keywords
    // Keywords joined by | to create an "OR" regex
    const keywordPattern = keywords.join('|');
    // Regex to find date (DD/MM/YYYY or similar) within 50 chars of keyword
    const regex = new RegExp(`(?:${keywordPattern}).{0,50}?(\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}|\\d{1,2}\\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\\s\\d{4})`, 'i');

    const match = text.match(regex);
    if (match && match[1]) {
        return parseDateString(match[1]);
    }
    return '';
};

// Helper: Find money amounts (£) near specific keywords
const extractMoney = (text, keywords) => {
    const keywordPattern = keywords.join('|');
    // Look for £ symbol followed by digits near keywords
    const regex = new RegExp(`(?:${keywordPattern}).{0,50}?£\\s?([\\d,]+\\.?\\d{0,2})`, 'i');

    const match = text.match(regex);
    if (match && match[1]) {
        return parseFloat(match[1].replace(/,/g, ''));
    }
    return '';
};

const parseDateString = (dateStr) => {
    try {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            return d.toISOString().split('T')[0];
        }
        // Handle UK format DD/MM/YYYY manually if standard parse fails
        const parts = dateStr.split(/[/-]/);
        if (parts.length === 3 && parts[2].length === 4) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return '';
    } catch (e) {
        return '';
    }
};

module.exports = {
    parseLease
};
