const logger = require('../../lib/logger');

// Hardcoded catalog of affiliate partners
// In a real app, this would likely come from a database 'services' table.
const SERVICE_CATALOG = [
    {
        id: 'insurance-alan-boswell',
        category: 'insurance',
        name: 'Alan Boswell Group',
        description: 'Award-winning landlord insurance. 5-star rated cover for your rental property.',
        ctaText: 'Get a Quote',
        icon: '🛡️',
        affiliateUrl: 'https://www.alanboswell.com/landlord-insurance/?ref=landlordlens', // Placeholder
        contextTags: ['compliance', 'risk', 'new-tenancy']
    },
    {
        id: 'gas-local-heroes',
        category: 'maintenance',
        name: 'Local Heroes (Gas Safe)',
        description: 'Book a local Gas Safe engineer for your CP12 certificate.',
        ctaText: 'Book Engineer',
        icon: '🔥',
        affiliateUrl: 'https://www.localheroes.com/?ref=landlordlens', // Placeholder
        contextTags: ['compliance', 'gas-safety', 'maintenance']
    },
    {
        id: 'legal-landlord-action',
        category: 'legal',
        name: 'Landlord Action',
        description: 'Fast and efficient tenant eviction services and legal advice.',
        ctaText: 'Get Legal Help',
        icon: '⚖️',
        affiliateUrl: 'https://www.landlordaction.co.uk/?ref=landlordlens', // Placeholder
        contextTags: ['eviction', 'arrears', 'legal']
    },
    {
        id: 'mortgage-habito',
        category: 'finance',
        name: 'Habito',
        description: 'Free online mortgage broker. Find the best buy-to-let rates.',
        ctaText: 'Compare Rates',
        icon: '💷',
        affiliateUrl: 'https://www.habito.com/?ref=landlordlens', // Placeholder
        contextTags: ['finance', 'mortgage', 'buy-to-let']
    }
];

// In-memory click tracking (would be DB in production)
// Used to analyze which services users are interested in (Lead Gen analytics)
const CLICK_LOGS = [];

const getCatalog = async () => {
    // In future, this could fetch from DB or external CMS
    return SERVICE_CATALOG;
};

const getServiceById = async (id) => {
    return SERVICE_CATALOG.find(s => s.id === id);
};

/**
 * Tracks when a user clicks on a service/affiliate link.
 * Essential for billing partners for leads generated.
 */
const trackClick = async (serviceId, userId, context = {}) => {
    try {
        const service = await getServiceById(serviceId);
        if (!service) {
            logger.warn(`Attempted to track click for unknown service: ${serviceId}`);
            return null;
        }

        const logEntry = {
            timestamp: new Date(),
            serviceId,
            serviceName: service.name,
            userId,
            context
        };

        CLICK_LOGS.push(logEntry);
        logger.info(`[LeadGen] Click tracked: ${service.name} by User ${userId}`, context);

        return { success: true, url: service.affiliateUrl };
    } catch (error) {
        logger.error('Error tracking service click', error);
        throw error;
    }
};

module.exports = {
    getCatalog,
    getServiceById,
    trackClick
};
