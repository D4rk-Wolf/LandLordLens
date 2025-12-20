const mongoose = require('mongoose');

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
    console.log('✅ Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
