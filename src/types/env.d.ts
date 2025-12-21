declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        REACT_APP_API_URL: string;
        FRONTEND_URL: string;
        PORT: string;
        STRIPE_PUBLISHABLE_KEY: string;
        STRIPE_SECRET_KEY: string;
        STRIPE_WEBHOOK_SECRET: string;
        STRIPE_PRICING_TABLE_ID: string;
        STRIPE_PRICE_PROFESSIONAL_MONTHLY: string;
        STRIPE_PRICE_PROFESSIONAL_ANNUAL: string;
        STRIPE_PRICE_BUSINESS_MONTHLY: string;
        STRIPE_PRICE_BUSINESS_ANNUAL: string;
        STRIPE_PRICE_ENTERPRISE_MONTHLY: string;
        STRIPE_PRICE_ENTERPRISE_ANNUAL: string;
    }
}
