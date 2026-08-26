import { Router } from 'express';
import { isDBConnected } from '../db/connection';
import { isMongoConfigured } from '../db/mongo';
import { config } from '../config';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', async (_req, res) => {
  const mongoConfigured = Boolean(config.mongo.uri) || isMongoConfigured();
  const mongooseConnected = isDBConnected();

  const hasResend = Boolean(config.email.resendApiKey);
  const hasSmtp = Boolean(config.email.smtp.host);
  const hasGemini = Boolean(config.gemini.apiKey);

  const readyStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbState = readyStates[mongoose.connection.readyState] || 'unknown';

  res.json({
    status: 'ok',
    app: config.brand.name,
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    services: {
      database: {
        provider: mongooseConnected ? 'MongoDB Atlas (Mongoose ODM)' : 'Local JSON Store (Durable File Store)',
        mongoConfigured,
        mongooseConnected,
        mongooseReadyState: dbState,
        localPersistence: true,
      },
      email: {
        configured: hasResend || hasSmtp,
        activeProvider: hasResend ? 'Resend' : hasSmtp ? 'SMTP' : 'Console Fallback',
        sender: config.email.senderEmail,
        adminRecipient: config.email.adminNotificationEmail,
      },
      aiEngine: {
        geminiConfigured: hasGemini,
        model: 'gemini-2.5-flash',
      },
    },
  });
});

router.get('/system/status', async (_req, res) => {
  const uptime = process.uptime();
  const memUsage = process.memoryUsage();

  res.json({
    uptimeSeconds: Math.floor(uptime),
    nodeVersion: process.version,
    memoryMb: {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
    },
    mongooseConnections: mongoose.connections.length,
    platform: process.platform,
  });
});

export default router;
