const mongoose = require('mongoose');
const logger = require('./logger');

let cachedConnection = null;

async function connectToMongoDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set. Please set it in your .env file or environment variables.');
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    
    cachedConnection = connection;
    logger.info('Connected to MongoDB');
    return connection;
  } catch (error) {
    logger.error('MongoDB connection error', error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
