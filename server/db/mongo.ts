import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

let client: MongoClient | null = null;
let dbInstance: Db | null = null;
let isConnected = false;

export async function connectMongo(): Promise<{ success: boolean; db?: Db; error?: string }> {
  if (!config.mongo.uri) {
    return { success: false, error: 'MONGODB_URI is not set in environment variables' };
  }

  if (isConnected && dbInstance) {
    return { success: true, db: dbInstance };
  }

  try {
    console.log('[MongoDB] Initializing database client connection...');
    client = new MongoClient(config.mongo.uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    dbInstance = client.db(config.mongo.dbName);
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to database: "${config.mongo.dbName}"`);
    return { success: true, db: dbInstance };
  } catch (err: any) {
    console.warn('[MongoDB] Connection failed (using local JSON store fallback):', err.message);
    isConnected = false;
    dbInstance = null;
    return { success: false, error: err.message };
  }
}

export async function getDb(): Promise<Db | null> {
  if (!isConnected || !dbInstance) {
    const conn = await connectMongo();
    if (conn.success && conn.db) {
      return conn.db;
    }
    return null;
  }
  return dbInstance;
}

export function isMongoConfigured(): boolean {
  return Boolean(config.mongo.uri);
}

export function isMongoConnected(): boolean {
  return isConnected;
}

export async function closeMongo(): Promise<void> {
  if (client) {
    await client.close();
    isConnected = false;
    dbInstance = null;
    console.log('[MongoDB] Database connection closed.');
  }
}
