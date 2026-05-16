/**
 * SERVER ENTRY POINT
 * This is the main file where the Express application is initialized and configured.
 * It sets up middleware (security, parsing, logging), connects to the database,
 * registers API routes, and starts the server listening on a specific port.
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

import swaggerUi from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import logger from '../lib/logger';
import { connectToMongoDB } from '../lib/mongodb';
import { sanitizeInput } from '../lib/middleware/sanitize';
import { generalLimiter, authLimiter } from '../lib/middleware/rateLimiter';
import swaggerSpec from '../lib/swagger';

// Load environment variables
dotenv.config();

// Import Route Handlers
// Import Route Handlers
// We use require for routes initially as they are being migrated to TS incrementally
// Once routes are TS, we can switch to import
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
const propertiesRoutes = require('./routes/properties');
const tenanciesRoutes = require('./routes/tenancies');
const inspectionsRoutes = require('./routes/inspections');
const expensesRoutes = require('./routes/expenses');
const subscriptionRoutes = require('./routes/subscription');
const paymentsRoutes = require('./routes/payments');
const webhooksRoutes = require('./routes/webhooks');

// Initialize the Express application
const app = express();

// Initialize Sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        nodeProfilingIntegration(),
        // Add Express integration for tracing
        // Note: In v8, standard integrations are sometimes auto-added, but explicit is safe if needed.
        // If expressIntegration is not available in imports (it was in the list), we use it.
        // Default integrations often cover this, but let's stick to base init first to avoid conflicts.
    ],
    // Capture 10% of transactions in production; 100% in dev for easier debugging
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
});

// Note: Sentry v8 moves away from Handlers.requestHandler()
// Tracing is handled via auto-instrumentation or integrations.

const PORT = process.env.PORT || 5000;

// --- SECURITY MIDDLEWARE ---

// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://js.stripe.com"],
            // unsafe-inline required for style-loader (runtime CSS injection); revisit if migrating to MiniCssExtractPlugin
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "blob:", "https://*.stripe.com"],
            connectSrc: ["'self'", "https://api.stripe.com"],
            frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
        },
    },
}));

app.use(cookieParser());
app.use(hpp());
app.use(compression());

// --- CORS CONFIGURATION ---
const corsOptions: cors.CorsOptions = {
    origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:3000'),
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// --- SPECIAL MIDDLEWARE HANDLING ---

// Stripe webhooks require the RAW request body to verify the signature.
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// --- BODY PARSING ---

// Parse JSON bodies for all other routes
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.startsWith('/api/webhooks/stripe')) {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(express.urlencoded({ extended: true }));

// --- CUSTOM MIDDLEWARE ---

// Input sanitization
app.use(sanitizeInput);

// Rate limiting
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);


// --- ROUTE REGISTRATION ---

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tenancies', tenanciesRoutes);
app.use('/api/inspections', inspectionsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/payments', paymentsRoutes);

// Dynamic/inline route requires
app.use('/api/compliance', require('./routes/compliance'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/legal', require('./routes/legal'));
app.use('/api/services', require('./routes/services'));
app.use('/api/webhooks', webhooksRoutes);

// Database Seeding — development only, never exposed in production
if (process.env.NODE_ENV !== 'production') {
    app.use('/api/seed', require('./routes/seed'));
}

// --- API DOCUMENTATION ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec as any, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'LandlordLens API Documentation',
}));

// --- HEALTH CHECK ---
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'LandlordLens API is running' });
});

// --- ERROR HANDLING ---

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Request error', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});

// --- SERVER STARTUP ---
async function startServer() {
    try {
        await connectToMongoDB();

        const server = app.listen(PORT, () => {
            logger.info(`Server running on http://localhost:${PORT}`);
        });

        server.on('error', (error: any) => {
            if (error.code === 'EADDRINUSE') {
                logger.error(`Port ${PORT} is already in use. Please stop the process using this port or change the PORT environment variable.`);
            } else {
                logger.error('Server error', error);
            }
            process.exit(1);
        });
    } catch (error) {
        logger.error('Failed to start server', error);
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}

export default app;
