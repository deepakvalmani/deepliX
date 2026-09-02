import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // ----------------------------------------------------
  // API ROUTES
  // ----------------------------------------------------

  // Health check & Database Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'DeepliX Core Systems API'
    });
  });

  app.get('/api/db-status', (req, res) => {
    res.json(db.getDbStatus());
  });

  // Authentication API
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const verification = db.verifyCredentials(email, password);
    if (!verification.success || !verification.user) {
      return res.status(401).json({ error: verification.message || 'Invalid credentials.' });
    }

    const token = `dpx-session-${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const { passwordHash, ...userProfile } = verification.user;

    res.json({
      success: true,
      token,
      user: userProfile
    });
  });

  app.get('/api/auth/me', (req, res) => {
    res.json({
      authenticated: true,
      user: db.getAdminUser()
    });
  });

  app.post('/api/auth/password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required.' });
    }

    const result = db.updateAdminPassword(currentPassword, newPassword);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.json({ success: true, message: result.message });
  });

  // Inquiries & Consultation Requests API
  app.get('/api/inquiries', async (req, res) => {
    const { status, industry, search } = req.query;
    const inquiries = await db.getInquiries({
      status: status as string,
      industry: industry as string,
      search: search as string
    });
    res.json(inquiries);
  });

  app.get('/api/inquiries/:id', async (req, res) => {
    const inquiry = await db.getInquiryById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.json(inquiry);
  });

  app.post('/api/inquiries', async (req, res) => {
    const { name, company, industry, email, phone, message, type, notes } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const newInquiry = await db.createInquiry({
      type: type || 'consultation',
      name,
      company: company || name,
      industry: industry || 'Businesses',
      email,
      phone: phone || '',
      message,
      notes: notes || ''
    });

    res.status(201).json(newInquiry);
  });

  app.patch('/api/inquiries/:id', async (req, res) => {
    const updated = await db.updateInquiry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/inquiries/:id', async (req, res) => {
    const success = await db.deleteInquiry(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully.' });
  });

  app.post('/api/inquiries/:id/convert', async (req, res) => {
    const client = await db.convertInquiryToClient(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Inquiry not found or could not be converted.' });
    }
    res.status(201).json(client);
  });

  // Client Directory API
  app.get('/api/clients', async (req, res) => {
    const { industry, search } = req.query;
    const clients = await db.getClients({
      industry: industry as string,
      search: search as string
    });
    res.json(clients);
  });

  app.post('/api/clients', async (req, res) => {
    const { companyName, contactPerson, industry, email, phone, status, contractValue, monthlySupport, startDate, modules, notes } = req.body;
    if (!companyName || !contactPerson || !email) {
      return res.status(400).json({ error: 'Company name, contact person, and email are required.' });
    }

    const newClient = await db.createClient({
      companyName,
      contactPerson,
      industry: industry || 'Businesses',
      email,
      phone: phone || '',
      status: status || 'Onboarding',
      contractValue: contractValue || 'PKR 850,000',
      monthlySupport: monthlySupport || 'PKR 45,000/mo',
      startDate: startDate || new Date().toISOString().split('T')[0],
      modules: modules || ['Core Operations Dashboard'],
      notes: notes || ''
    });

    res.status(201).json(newClient);
  });

  app.put('/api/clients/:id', async (req, res) => {
    const updated = await db.updateClient(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Client not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/clients/:id', async (req, res) => {
    const success = await db.deleteClient(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Client not found.' });
    }
    res.json({ success: true, message: 'Client deleted successfully.' });
  });

  // Case Studies CMS API
  app.get('/api/case-studies', async (req, res) => {
    const items = await db.getCaseStudies();
    res.json(items);
  });

  app.post('/api/case-studies', async (req, res) => {
    const { title, industry, summary, before, after, keyOutcome, isPublished } = req.body;
    if (!title || !summary || !keyOutcome) {
      return res.status(400).json({ error: 'Title, summary, and key outcome are required.' });
    }

    const newCS = await db.createCaseStudy({
      title,
      industry: industry || 'Commercial & Distribution',
      summary,
      before: Array.isArray(before) ? before : [],
      after: Array.isArray(after) ? after : [],
      keyOutcome,
      isPublished: isPublished !== false,
      displayOrder: 99
    });

    res.status(201).json(newCS);
  });

  app.put('/api/case-studies/:id', async (req, res) => {
    const updated = await db.updateCaseStudy(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Case study not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/case-studies/:id', async (req, res) => {
    const success = await db.deleteCaseStudy(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Case study not found.' });
    }
    res.json({ success: true, message: 'Case study deleted successfully.' });
  });

  // Settings API
  app.get('/api/settings', async (req, res) => {
    const settings = await db.getSettings();
    res.json(settings);
  });

  app.put('/api/settings', async (req, res) => {
    const updated = await db.updateSettings(req.body);
    res.json(updated);
  });

  // Activity Feed API
  app.get('/api/activities', async (req, res) => {
    const activities = await db.getActivities();
    res.json(activities);
  });

  // System Reset API
  app.post('/api/admin/reset', async (req, res) => {
    await db.resetData();
    res.json({ success: true, message: 'All datastores have been reset to defaults.' });
  });

  // ----------------------------------------------------
  // VITE & STATIC FILE SERVING
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DeepliX Core] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
