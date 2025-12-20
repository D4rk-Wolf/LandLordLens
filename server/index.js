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

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tenancies', tenanciesRoutes);
app.use('/api/inspections', inspectionsRoutes);
app.use('/api/expenses', expensesRoutes);

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
