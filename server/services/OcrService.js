const { createWorker } = require('tesseract.js'); // Library for Optical Character Recognition
const logger = require('../../lib/logger');

/**
 * Extracts data from receipt images using Tesseract.js (OCR).
 * 
 * @param {Buffer} imageBuffer - The binary image data
 * @returns {Object} Extracted merchant, date, and amount
 */
const extractReceiptData = async (imageBuffer) => {
    let worker = null;
    try {
        logger.info('Starting OCR processing...');
        // Create an OCR worker for English
        worker = await createWorker('eng');

        // Recognize text from the image
        const { data: { text } } = await worker.recognize(imageBuffer);
        logger.info('OCR Text extracted length:', text.length);

        // Parse the raw text string to find structured data
        const extractedData = parseReceiptText(text);

        await worker.terminate(); // Clean up the worker to free memory
        return extractedData;
    } catch (error) {
        logger.error('OCR Processing Error', error);
        if (worker) await worker.terminate();
        throw error;
    }
};

const parseReceiptText = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    // 1. Extract Merchant (Heuristic: First meaningful line that isn't a common header)
    const merchantBlocklist = ['receipt', 'invoice', 'copy', 'customer', 'merchant', 'sale'];
    let merchant = lines.find(l =>
        l.length > 3 && !merchantBlocklist.some(b => l.toLowerCase().includes(b))
    );

    // 2. Extract Date
    // Matches DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD
    const dateRegex = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(\d{4}[/-]\d{1,2}[/-]\d{1,2})\b/;
    const dateMatch = text.match(dateRegex);
    let date = dateMatch ? parseDate(dateMatch[0]) : null;

    // 3. Extract Total Amount
    // Look for £ symbol or "Total" followed by number
    // Matches £12.34, 12.34
    const moneyRegex = /£\s?(\d+\.\d{2})|(\d+\.\d{2})/g;
    const matches = [...text.matchAll(moneyRegex)];

    // Strategy: Usually the largest amount on the receipt is the total
    let maxAmount = 0;
    for (const match of matches) {
        const val = parseFloat(match[1] || match[2]);
        if (val > maxAmount) maxAmount = val;
    }

    return {
        merchant: merchant || 'Unknown Merchant',
        date: date || new Date().toISOString().split('T')[0],
        amount: maxAmount > 0 ? maxAmount.toFixed(2) : '',
        description: `Receipt from ${merchant || 'Unknown'}`
    };
};

const parseDate = (dateStr) => {
    // Attempt to standardize date to YYYY-MM-DD
    try {
        // Simple parser could be improved
        const parts = dateStr.split(/[-/]/);
        if (parts[0].length === 4) return dateStr; // Already YYYY-MM-DD
        // Assume DD-MM-YYYY
        return `${parts[2].length === 2 ? '20' + parts[2] : parts[2]}-${parts[1]}-${parts[0]}`;
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
};

module.exports = {
    extractReceiptData
};
