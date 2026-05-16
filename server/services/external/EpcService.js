const logger = require('../../../lib/logger');

/**
 * Service to handle EPC data retrieval
 * In the future, this will connect to the Open Data Communities API
 */
class EpcService {
    /**
     * Fetch EPC data for a given postcode
     * @param {string} postcode 
     * @returns {Promise<Object>} EPC data
     */
    async getEpcData(postcode) {
        logger.info(`Fetching EPC data for postcode: ${postcode}`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock response based on postcode to allow testing different scenarios
        const normalizedPostcode = postcode.replace(/\s/g, '').toUpperCase();

        // Mock data
        const mockData = {
            address: 'Simulated Address',
            postcode: postcode.toUpperCase(),
            currentEnergyRating: 'D',
            potentialEnergyRating: 'B',
            certificateDate: new Date().toISOString(),
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString(),
            certificateNumber: '1234-5678-9012-3456-7890',
            recommendations: [
                {
                    improvement: 'Low energy lighting for all fixed outlets',
                    indicativeCost: '£35',
                    typicalSavingsPerYear: '£55'
                },
                {
                    improvement: 'Replace boiler with new condensing boiler',
                    indicativeCost: '£2,200 - £3,000',
                    typicalSavingsPerYear: '£120'
                }
            ]
        };

        // Simulate different ratings for different postcodes if needed
        if (normalizedPostcode.endsWith('1AA')) {
            mockData.currentEnergyRating = 'A';
        } else if (normalizedPostcode.endsWith('1AB')) {
            mockData.currentEnergyRating = 'G'; // Worst case
        }

        return mockData;
    }
}

module.exports = new EpcService();
