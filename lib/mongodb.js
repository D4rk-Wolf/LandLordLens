const mongoose = require('mongoose');

let cachedConnection = null;

async function connectToMongoDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://turkish_db_user:pbWP5FB0fAm2YZWl@cluster0.mxt0mn9.mongodb.net/?appName=Cluster0';

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
