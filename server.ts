import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local file storage setup
const DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_STORE_PATH = path.join(DATA_DIR, 'submissions.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LOCAL_STORE_PATH)) {
  fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Database helper functions
  async function saveSubmission(submission: {
    id: string;
    name: string;
    email: string;
    company?: string;
    role?: string;
    interest?: string;
    message: string;
    createdAt: string;
  }) {
    let savedToMongo = false;
    let mongoError: string | null = null;

    // 1. Save to MongoDB if MONGODB_URI is provided
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri) {
      try {
        console.log('[Database] Connecting to MongoDB...');
        const client = new MongoClient(mongoUri);
        await client.connect();
        const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
        const db = client.db(dbName);
        const collection = db.collection('submissions');
        
        await collection.insertOne({
          ...submission,
          _insertedAt: new Date(),
        });
        await client.close();
        console.log('[Database] Successfully saved submission to MongoDB');
        savedToMongo = true;
      } catch (err: any) {
        console.error('[Database Error] Failed to save to MongoDB:', err.message);
        mongoError = err.message;
      }
    }

    // 2. Always save to local JSON file backup
    try {
      const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      const records = JSON.parse(raw);
      records.unshift(submission);
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(records, null, 2));
      console.log('[Database] Saved submission to local backup store:', LOCAL_STORE_PATH);
    } catch (err: any) {
      console.error('[Database Error] Local store backup error:', err.message);
    }

    return { savedToMongo, mongoError };
  }

  // Helper function to handle sending emails
  async function sendNotificationEmail(details: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    interest?: string;
    message: string;
  }) {
    const { name, email, company, role, interest, message } = details;

    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || 'notification@deeplix.com';
    const resendKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;

    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; color: #0F172A; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px;">
        <h2 style="color: #2563EB; margin-top: 0;">New Contact Form Submission — deepliX</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Role:</strong> ${role || 'N/A'}</p>
        <p><strong>Interest Area:</strong> ${interest || 'General Enquiry'}</p>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <blockquote style="background: #F8FAFC; border-left: 4px solid #2563EB; padding: 12px 16px; margin: 0; color: #334155;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
        <p style="font-size: 12px; color: #94A3B8; margin-top: 24px;">Sent automatically from your deepliX website backend.</p>
      </div>
    `;

    // Strategy 1: Resend API
    if (resendKey) {
      console.log('[Email System] Attempting to send email via Resend API...');
      const resend = new Resend(resendKey);
      const sender = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
      const result = await resend.emails.send({
        from: `deepliX Contact <${sender}>`,
        to: [recipient],
        replyTo: email,
        subject: `[Contact Form] ${name} from ${company || 'New Lead'}`,
        html: htmlContent,
      });
      console.log('[Email System] Resend Email Sent Successfully:', result);
      return { provider: 'resend', status: 'sent', result };
    }

    // Strategy 2: Nodemailer (SMTP)
    if (smtpHost) {
      console.log('[Email System] Attempting to send email via SMTP (Nodemailer)...');
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"deepliX" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: email,
        subject: `[Contact Form] ${name} from ${company || 'New Lead'}`,
        html: htmlContent,
      });
      console.log('[Email System] SMTP Email Sent Successfully:', info.messageId);
      return { provider: 'smtp', status: 'sent', messageId: info.messageId };
    }

    // Strategy 3: Fallback (Console logging when no keys configured)
    console.log('[Email System] No email credentials found in environment variables. Set RESEND_API_KEY or SMTP_HOST.');
    return { provider: 'none', status: 'logged_only' };
  }

  // --- API Routes ---

  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, company, role, interest, message, customOutcome, tools, outcomes } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      const submissionRecord = {
        id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name,
        email,
        company: company || '',
        role: role || '',
        interest: interest || '',
        message,
        customOutcome: customOutcome || '',
        tools: tools || [],
        outcomes: outcomes || [],
        hasBlueprint: message.includes('[Attached Blueprint Architecture]') || (tools && tools.length > 0),
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      console.log('[Contact Form Received]:', submissionRecord);

      // Save to database (MongoDB & local backup)
      const dbStatus = await saveSubmission(submissionRecord);

      // Attempt sending email
      const emailResult = await sendNotificationEmail({ name, email, company, role, interest, message });

      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out to deepliX. We will be in touch shortly.',
        dbSaved: true,
        mongoSaved: dbStatus.savedToMongo,
        emailStatus: emailResult.status,
        provider: emailResult.provider,
      });
    } catch (err: any) {
      console.error('[Contact API Error]:', err);
      return res.status(500).json({
        error: 'An error occurred while saving your message.',
        details: err.message,
      });
    }
  });

  // Analytics summary endpoint for admin dashboard
  app.get('/api/admin/analytics', async (_req, res) => {
    try {
      let records: any[] = [];
      const mongoUri = process.env.MONGODB_URI;

      if (mongoUri) {
        try {
          const client = new MongoClient(mongoUri);
          await client.connect();
          const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
          const collection = client.db(dbName).collection('submissions');
          records = await collection.find({}).sort({ createdAt: -1 }).toArray();
          await client.close();
        } catch (mErr: any) {
          console.error('[Analytics API] Mongo query failed:', mErr.message);
        }
      }

      if (records.length === 0 && fs.existsSync(LOCAL_STORE_PATH)) {
        const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
        records = JSON.parse(raw);
      }

      // Compute analytics
      const totalLeads = records.length;
      const blueprintLeads = records.filter(r => r.hasBlueprint || r.message?.includes('[Attached Blueprint Architecture]')).length;

      const interestsMap: Record<string, number> = {};
      const toolsMap: Record<string, number> = {};
      const outcomesMap: Record<string, number> = {};

      records.forEach(r => {
        const area = r.interest || 'General Enquiry';
        interestsMap[area] = (interestsMap[area] || 0) + 1;

        // Extract tools mentioned
        if (Array.isArray(r.tools)) {
          r.tools.forEach((t: string) => {
            toolsMap[t] = (toolsMap[t] || 0) + 1;
          });
        } else if (r.message) {
          ['Salesforce', 'PostgreSQL', 'Google Sheets', 'HubSpot', 'SAP', 'Stripe', 'Slack', 'Zendesk', 'Snowflake', 'MongoDB'].forEach(t => {
            if (r.message.includes(t)) {
              toolsMap[t] = (toolsMap[t] || 0) + 1;
            }
          });
        }

        // Extract outcomes
        if (Array.isArray(r.outcomes)) {
          r.outcomes.forEach((o: string) => {
            outcomesMap[o] = (outcomesMap[o] || 0) + 1;
          });
        }
      });

      return res.json({
        totalLeads,
        blueprintLeads,
        standardLeads: totalLeads - blueprintLeads,
        interestsMap,
        toolsMap,
        outcomesMap,
        recentCount: records.length,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to compute analytics', details: err.message });
    }
  });

  // Get list of saved submissions
  app.get('/api/submissions', async (_req, res) => {
    try {
      const mongoUri = process.env.MONGODB_URI;
      let records = [];

      if (mongoUri) {
        try {
          const client = new MongoClient(mongoUri);
          await client.connect();
          const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
          const collection = client.db(dbName).collection('submissions');
          records = await collection.find({}).sort({ createdAt: -1 }).toArray();
          await client.close();
          return res.json({ source: 'mongodb', count: records.length, submissions: records });
        } catch (mongoErr: any) {
          console.error('[Submissions API] Mongo query failed, falling back to local file:', mongoErr.message);
        }
      }

      // Fallback to local store
      if (fs.existsSync(LOCAL_STORE_PATH)) {
        const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
        records = JSON.parse(raw);
      }

      return res.json({ source: 'local_file', count: records.length, submissions: records });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch submissions', details: err.message });
    }
  });

  // Health and status check endpoint
  app.get('/api/health', (_req, res) => {
    const hasResend = !!process.env.RESEND_API_KEY;
    const hasSmtp = !!process.env.SMTP_HOST;
    const hasMongo = !!process.env.MONGODB_URI;

    res.json({
      status: 'ok',
      app: 'deepliX',
      time: new Date().toISOString(),
      database: {
        mongoConfigured: hasMongo,
        localBackupActive: true,
      },
      email: {
        emailConfigured: hasResend || hasSmtp,
        emailProvider: hasResend ? 'Resend' : hasSmtp ? 'SMTP' : 'Console / Logged only',
      },
    });
  });

  // Vite middleware for development vs static serve for production
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
    console.log(`[deepliX Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
