import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { config } from './server/config';
import { connectDB, isDBConnected } from './server/db/connection';

// Route imports
import healthRoutes from './server/routes/healthRoutes';
import contactRoutes from './server/routes/contactRoutes';
import careerRoutes from './server/routes/careerRoutes';
import bookingRoutes from './server/routes/bookingRoutes';
import aiRoutes from './server/routes/aiRoutes';
import simulatorRoutes from './server/routes/simulatorRoutes';
import analyticsRoutes from './server/routes/analyticsRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bootstrap() {
  const app = express();
  const PORT = config.port;

  // Global Middlewares
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Request logger
  app.use((req, _res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path} - ${new Date().toLocaleTimeString()}`);
    }
    next();
  });

  // Initialize Mongoose Database with Global Connection Caching
  if (config.mongo.uri) {
    connectDB()
      .then(() => console.log('[Server] Mongoose ODM ready with active connection pool.'))
      .catch((err) => console.warn('[Server] MongoDB background connect notice:', err.message));
  } else {
    console.log('[Server] Notice: MONGODB_URI not provided. Operating with persistent local file store fallback.');
  }

  // Mount API Endpoints FIRST (before Vite middleware)
  app.use('/api', healthRoutes);
  app.use('/api', contactRoutes);
  app.use('/api', careerRoutes);
  app.use('/api', bookingRoutes);
  app.use('/api', aiRoutes);
  app.use('/api', simulatorRoutes);
  app.use('/api', analyticsRoutes);

  // Frontend Serving (Vite dev middleware vs. compiled production bundle)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(` deepliX Fullstack Server Online `);
    console.log(` URL: http://0.0.0.0:${PORT} `);
    console.log(` Environment: ${config.nodeEnv} `);
    console.log(` MongoDB (Mongoose): ${config.mongo.uri ? 'Configured' : 'Local JSON Fallback'} `);
    console.log(` Email Service: ${config.email.resendApiKey ? 'Resend' : config.email.smtp.host ? 'SMTP' : 'Dev Console'} `);
    console.log(` AI Gemini Engine: ${config.gemini.apiKey ? 'Active (Gemini 2.5 Flash)' : 'Rules Engine Fallback'} `);
    console.log(`=========================================`);
  });
}

bootstrap().catch((err) => {
  console.error('[Fatal Startup Error]:', err);
  process.exit(1);
});
