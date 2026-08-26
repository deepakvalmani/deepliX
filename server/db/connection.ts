import mongoose, { Connection, Mongoose } from 'mongoose';
import { config } from '../config';

/**
 * Interface representing the cached Mongoose connection state.
 * Prevents multiple connections during hot-reloads in development.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment the NodeJS global object with mongooseCache to survive hot-reloading
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize or retrieve existing cached connection
const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB using Mongoose with connection pooling and caching.
 */
export async function connectDB(): Promise<Mongoose> {
  const uri = config.mongo.uri;

  if (!uri) {
    const errorMsg = '[Database] MONGODB_URI environment variable is not defined.';
    console.warn(errorMsg);
    throw new Error(errorMsg);
  }

  // If a connection is already established and ready, reuse it immediately
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection is in-flight, await the ongoing promise to avoid race conditions
  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      dbName: config.mongo.dbName || 'deeplixdb',
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      autoIndex: process.env.NODE_ENV !== 'production', // Build indexes in dev, disable in high-throughput prod
    };

    console.log(`[Database] Initializing Mongoose connection to database: "${options.dbName}"...`);

    cached.promise = mongoose.connect(uri, options).then((mongooseInstance) => {
      console.log('[Database] MongoDB connection established successfully via Mongoose.');
      return mongooseInstance;
    });

    // Register Mongoose connection lifecycle event listeners
    const conn: Connection = mongoose.connection;

    conn.on('connected', () => {
      console.log('[Database:Event] Mongoose connected to MongoDB cluster.');
    });

    conn.on('error', (err) => {
      console.error('[Database:Event] Mongoose connection error:', err.message);
    });

    conn.on('disconnected', () => {
      console.warn('[Database:Event] Mongoose disconnected from MongoDB.');
      cached.conn = null;
      cached.promise = null;
    });

    conn.on('reconnected', () => {
      console.log('[Database:Event] Mongoose reconnected to MongoDB.');
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err: any) {
    cached.promise = null;
    console.error('[Database] Fatal: Failed to connect to MongoDB:', err.message);
    throw err;
  }
}

/**
 * Check if Mongoose connection is actively ready.
 * Ready states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
export function isDBConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Disconnect and release all MongoDB connection pools (useful for graceful shutdown).
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('[Database] Mongoose connection closed gracefully.');
  }
}
