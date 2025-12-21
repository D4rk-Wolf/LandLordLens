const express = require('express');
const cors = require('cors');
require('dotenv').config();

const helmet = require('helmet');
const hpp = require('hpp');
const logger = require('../lib/logger');
const { connectToMongoDB } = require('../lib/mongodb');
const { sanitizeInput } = require('../lib/middleware/sanitize');
const { generalLimiter, authLimiter } = require('../lib/middleware/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../lib/swagger');
const authRoutes = require('./routes/auth');
const propertiesRoutes = require('./routes/properties');
const adminRoutes = require('./routes/admin');
const tenanciesRoutes = require('./routes/tenancies');
const inspectionsRoutes = require('./routes/inspections');
const expensesRoutes = require('./routes/expenses');
const subscriptionRoutes = require('./routes/subscription');
const paymentsRoutes = require('./routes/payments');
const webhooksRoutes = require('./routes/webhooks');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(hpp());

// CORS Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Stripe webhook endpoint needs raw body, register it before JSON parsing
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// JSON parsing for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Input sanitization - sanitize all inputs to prevent XSS
app.use(sanitizeInput);

// Rate limiting - apply general rate limiter to all routes
app.use('/api', generalLimiter);

// Strict rate limiting for authentication routes
app.use('/api/auth', authLimiter);

// Stripe webhook endpoint needs raw body, so it's handled in the route itself
// Other routes use JSON parsing above

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tenancies', tenanciesRoutes);
app.use('/api/inspections', inspectionsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/webhooks', webhooksRoutes);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'LandlordLens API Documentation',
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LandlordLens API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Request error', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
async function startServer() {
  try {
    await connectToMongoDB();

    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
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


module.exports = app;
