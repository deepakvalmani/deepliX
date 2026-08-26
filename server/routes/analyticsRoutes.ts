import { Router } from 'express';
import { getDb } from '../db/mongo';
import { localStore } from '../db/localStore';

const router = Router();

// GET /api/admin/analytics - Platform and lead telemetry
router.get('/admin/analytics', async (_req, res) => {
  try {
    let records: any[] = [];
    const db = await getDb();

    if (db) {
      records = await db.collection('submissions').find({}).sort({ createdAt: -1 }).toArray();
    } else {
      records = localStore.getSubmissions();
    }

    const applications = localStore.getApplications();
    const bookings = localStore.getBookings();

    const totalLeads = records.length;
    const blueprintLeads = records.filter(
      (r) => r.hasBlueprint || r.message?.includes('[Attached Blueprint Architecture]')
    ).length;

    const interestsMap: Record<string, number> = {};
    const toolsMap: Record<string, number> = {};
    const outcomesMap: Record<string, number> = {};

    records.forEach((r) => {
      const area = r.interest || 'General Enquiry';
      interestsMap[area] = (interestsMap[area] || 0) + 1;

      if (Array.isArray(r.tools)) {
        r.tools.forEach((t: string) => {
          toolsMap[t] = (toolsMap[t] || 0) + 1;
        });
      } else if (r.message) {
        ['Salesforce', 'PostgreSQL', 'Google Sheets', 'HubSpot', 'SAP', 'Stripe', 'Slack', 'Zendesk', 'Snowflake', 'MongoDB'].forEach((t) => {
          if (r.message.includes(t)) {
            toolsMap[t] = (toolsMap[t] || 0) + 1;
          }
        });
      }

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
      totalApplications: applications.length,
      totalBookings: bookings.length,
      interestsMap,
      toolsMap,
      outcomesMap,
      recentCount: records.length,
    });
  } catch (err: any) {
    console.error('[AnalyticsRoute] Error:', err);
    return res.status(500).json({ error: 'Failed to compute analytics', details: err.message });
  }
});

// GET /api/admin/export/csv - Export submissions as CSV
router.get('/admin/export/csv', async (_req, res) => {
  try {
    let records: any[] = [];
    const db = await getDb();
    if (db) {
      records = await db.collection('submissions').find({}).sort({ createdAt: -1 }).toArray();
    } else {
      records = localStore.getSubmissions();
    }

    const headers = ['ID', 'Name', 'Email', 'Company', 'Role', 'Interest', 'HasBlueprint', 'Created At'];
    const rows = records.map((r) => [
      r.id,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.company || '').replace(/"/g, '""')}"`,
      `"${(r.role || '').replace(/"/g, '""')}"`,
      `"${(r.interest || '').replace(/"/g, '""')}"`,
      r.hasBlueprint ? 'Yes' : 'No',
      r.createdAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="deeplix_leads_${Date.now()}.csv"`);
    return res.send(csvContent);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to generate CSV export', details: err.message });
  }
});

export default router;
