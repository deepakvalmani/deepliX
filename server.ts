import 'dotenv/config';
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
const LOCAL_APPLICATIONS_PATH = path.join(DATA_DIR, 'applications.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LOCAL_STORE_PATH)) {
  fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify([]));
}

if (!fs.existsSync(LOCAL_APPLICATIONS_PATH)) {
  fs.writeFileSync(LOCAL_APPLICATIONS_PATH, JSON.stringify([]));
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

  // Job application database helper
  async function saveApplication(appRecord: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    experienceYears?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    coverLetter?: string;
    resumeFileName?: string;
    resumeDataUrl?: string;
    resumeText?: string;
    status: string;
    createdAt: string;
  }) {
    let savedToMongo = false;
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      try {
        const client = new MongoClient(mongoUri);
        await client.connect();
        const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
        const collection = client.db(dbName).collection('job_applications');
        await collection.insertOne({
          ...appRecord,
          _insertedAt: new Date(),
        });
        await client.close();
        savedToMongo = true;
      } catch (err: any) {
        console.error('[Careers DB Error] Mongo save failed:', err.message);
      }
    }

    try {
      const raw = fs.readFileSync(LOCAL_APPLICATIONS_PATH, 'utf-8');
      const records = JSON.parse(raw);
      records.unshift(appRecord);
      fs.writeFileSync(LOCAL_APPLICATIONS_PATH, JSON.stringify(records, null, 2));
    } catch (err: any) {
      console.error('[Careers DB Error] Local JSON file save failed:', err.message);
    }

    return { savedToMongo };
  }

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

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
    const linkedinUrl = process.env.LINKEDIN_URL || 'https://www.linkedin.com/company/111716037/';
    const websiteUrl = process.env.WEBSITE_URL || 'https://deeplix.com';
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || 'N/A');
    const safeRole = escapeHtml(role || 'N/A');
    const safeInterest = escapeHtml(interest || 'General Enquiry');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const htmlContent = `
      <div style="margin: 0; padding: 32px 16px; background: linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%); font-family: Arial, Helvetica, sans-serif; color: #0F172A;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 60px rgba(15, 23, 42, 0.08);">
          <div style="padding: 24px 28px; background: linear-gradient(135deg, #0F172A 0%, #1D4ED8 52%, #06B6D4 100%);">
            <div style="display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 14px; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.18);">
              <div style="width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #2563EB 0%, #67E8F9 100%); display: grid; place-items: center; font-size: 14px; font-weight: 900; color: white;">dX</div>
              <div style="font-size: 24px; line-height: 1; font-weight: 800; letter-spacing: -0.06em; color: #FFFFFF;">deepli<span style="color: #BAE6FD;">X</span></div>
            </div>
          </div>

          <div style="padding: 32px 28px 20px;">
            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">Hi ${safeName.split(' ')[0] || 'there'},</p>
            <h2 style="margin: 0 0 12px; font-size: 28px; line-height: 1.2; letter-spacing: -0.05em; color: #0F172A;">Thanks for reaching out.</h2>
            <p style="margin: 0 0 18px; font-size: 16px; line-height: 1.7; color: #475569;">
              We’ve received your message and the deepliX team will review it shortly. We’re grateful you reached out to talk about your systems, workflows, and growth goals.
            </p>

            <div style="margin: 20px 0; padding: 18px 20px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #475569;">Submission details</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0F172A;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0F172A;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #2563EB; text-decoration: none;">${safeEmail}</a></p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0F172A;"><strong>Company:</strong> ${safeCompany}</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0F172A;"><strong>Role:</strong> ${safeRole}</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0F172A;"><strong>Interest:</strong> ${safeInterest}</p>
            </div>

            <div style="margin: 18px 0 22px; padding: 18px 20px; background: linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%); border-left: 4px solid #2563EB; border-radius: 12px; color: #334155; font-size: 14px; line-height: 1.7;">
              <strong style="display: block; margin-bottom: 6px; color: #0F172A;">Message:</strong>
              ${safeMessage}
            </div>

            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #475569;">
              We keep every conversation personal, practical, and honest — no automated funnels, no pressure, just a useful conversation about what matters.
            </p>

            <div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 22px 0 8px;">
              <a href="${linkedinUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 999px; background: #0F172A; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 700;">Connect on LinkedIn</a>
              <a href="${websiteUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 999px; background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%); color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 700;">Visit deepliX</a>
            </div>
          </div>

          <div style="padding: 18px 28px 28px; border-top: 1px solid #E2E8F0; background: #F8FAFC;">
            <p style="margin: 0; font-size: 12px; line-height: 1.7; color: #64748B;">
              © ${new Date().getFullYear()} deepliX. Built for systems that keep businesses moving.
            </p>
          </div>
        </div>
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

  // Job application submission endpoint
  app.post('/api/careers/apply', async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        role,
        experienceYears,
        linkedin,
        github,
        portfolio,
        coverLetter,
        resumeFileName,
        resumeDataUrl,
        resumeText,
      } = req.body;

      if (!name || !email || !role) {
        return res.status(400).json({ error: 'Name, email, and position role are required.' });
      }

      const applicationId = `APP_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const appRecord = {
        id: applicationId,
        name,
        email,
        phone: phone || '',
        role: role || 'General Engineering Inquiry',
        experienceYears: experienceYears || 'Not specified',
        linkedin: linkedin || '',
        github: github || '',
        portfolio: portfolio || '',
        coverLetter: coverLetter || '',
        resumeFileName: resumeFileName || 'Resume Document',
        resumeDataUrl: resumeDataUrl || '',
        resumeText: resumeText || '',
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      console.log('[Job Application Received]:', { id: applicationId, name, email, role });

      const dbStatus = await saveApplication(appRecord);

      return res.status(200).json({
        success: true,
        applicationId,
        message: 'Application received successfully.',
        mongoSaved: dbStatus.savedToMongo,
      });
    } catch (err: any) {
      console.error('[Careers API Error]:', err);
      return res.status(500).json({
        error: 'Failed to process job application.',
        details: err.message,
      });
    }
  });

  // Get list of job applications for admin dashboard
  app.get('/api/applications', async (_req, res) => {
    try {
      const mongoUri = process.env.MONGODB_URI;
      let records = [];

      if (mongoUri) {
        try {
          const client = new MongoClient(mongoUri);
          await client.connect();
          const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
          const collection = client.db(dbName).collection('job_applications');
          records = await collection.find({}).sort({ createdAt: -1 }).toArray();
          await client.close();
          return res.json({ source: 'mongodb', count: records.length, applications: records });
        } catch (mErr: any) {
          console.error('[Applications API] Mongo fetch failed:', mErr.message);
        }
      }

      if (fs.existsSync(LOCAL_APPLICATIONS_PATH)) {
        const raw = fs.readFileSync(LOCAL_APPLICATIONS_PATH, 'utf-8');
        records = JSON.parse(raw);
      }

      return res.json({ source: 'local_file', count: records.length, applications: records });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch job applications', details: err.message });
    }
  });

  // Update job application status
  app.patch('/api/applications/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      // Update in local file
      if (fs.existsSync(LOCAL_APPLICATIONS_PATH)) {
        const raw = fs.readFileSync(LOCAL_APPLICATIONS_PATH, 'utf-8');
        let records = JSON.parse(raw);
        records = records.map((r: any) => (r.id === id ? { ...r, status } : r));
        fs.writeFileSync(LOCAL_APPLICATIONS_PATH, JSON.stringify(records, null, 2));
      }

      // Update in Mongo if present
      const mongoUri = process.env.MONGODB_URI;
      if (mongoUri) {
        try {
          const client = new MongoClient(mongoUri);
          await client.connect();
          const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
          await client.db(dbName).collection('job_applications').updateOne({ id }, { $set: { status } });
          await client.close();
        } catch (mErr: any) {
          console.error('[Applications API] Mongo update status failed:', mErr.message);
        }
      }

      return res.json({ success: true, id, status });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update application status', details: err.message });
    }
  });

  // Delete job application
  app.delete('/api/applications/:id', async (req, res) => {
    try {
      const { id } = req.params;

      if (fs.existsSync(LOCAL_APPLICATIONS_PATH)) {
        const raw = fs.readFileSync(LOCAL_APPLICATIONS_PATH, 'utf-8');
        let records = JSON.parse(raw);
        records = records.filter((r: any) => r.id !== id);
        fs.writeFileSync(LOCAL_APPLICATIONS_PATH, JSON.stringify(records, null, 2));
      }

      const mongoUri = process.env.MONGODB_URI;
      if (mongoUri) {
        try {
          const client = new MongoClient(mongoUri);
          await client.connect();
          const dbName = process.env.MONGODB_DB_NAME || 'deeplix_db';
          await client.db(dbName).collection('job_applications').deleteOne({ id });
          await client.close();
        } catch (mErr: any) {
          console.error('[Applications API] Mongo delete failed:', mErr.message);
        }
      }

      return res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete application', details: err.message });
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
