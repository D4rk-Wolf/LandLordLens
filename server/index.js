const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToMongoDB } = require('../lib/mongodb');
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

// Middleware
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LandlordLens API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
