import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
});

export const STRIPE_PRICES = {
    professional: {
        monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY || '',
        annual: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL || '',
    },
    business: {
        monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || '',
        annual: process.env.STRIPE_PRICE_BUSINESS_ANNUAL || '',
    },
    enterprise: {
        monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || '',
        annual: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL || '',
    },
};

export const TIER_LIMITS = {
    starter: {
        maxProperties: 2,
        maxStorageMB: 100,
        features: ['basic_properties', 'tenancy_tracking', 'compliance_storage'],
    },
    professional: {
        maxProperties: 10,
        maxStorageGB: 5,
        features: [
            'all_starter_features',
            'advanced_filtering',
            'financial_dashboard',
            'automated_reminders',
            'bulk_operations',
            'document_management',
            'maintenance_tracking',
            'export_reports',
        ],
    },
    business: {
        maxProperties: 50,
        maxUsers: 5,
        maxStorageGB: 50,
        features: [
            'all_professional_features',
            'multi_user_access',
            'advanced_analytics',
            'calendar_integration',
            'tenant_portal',
            'custom_categories',
            'priority_support',
        ],
    },
    enterprise: {
        maxProperties: -1, // unlimited
        maxUsers: -1, // unlimited
        maxStorageGB: -1, // unlimited
        features: [
            'all_business_features',
            'unlimited_everything',
            'api_access',
            'white_label',
            'custom_integrations',
            'dedicated_manager',
            'sla_guarantee',
        ],
    },
};
