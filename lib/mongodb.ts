import mongoose from 'mongoose';
import logger from './logger';

let cachedConnection: typeof mongoose | null = null;

export async function connectToMongoDB(): Promise<typeof mongoose> {
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
