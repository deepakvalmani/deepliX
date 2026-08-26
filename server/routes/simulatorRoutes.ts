import { Router } from 'express';
import { geminiService } from '../services/geminiService';

const router = Router();

// POST /api/simulators/reporting - Trigger report compilation backend task
router.post('/simulators/reporting', async (req, res) => {
  try {
    const { sources = ['Salesforce', 'Stripe', 'PostgreSQL'], format = 'pdf' } = req.body;

    const reportId = `REP_${Date.now()}`;
    const generatedAt = new Date().toISOString();

    const sampleMetrics = {
      monthlyRevenue: 142850,
      revenueGrowthPct: 14.2,
      activeSubscribers: 1240,
      churnRatePct: 0.8,
      syncLatencyMs: 14.6,
    };

    return res.json({
      success: true,
      reportId,
      fileName: 'Weekly_Executive_Summary.pdf',
      format,
      sources,
      generatedAt,
      metrics: sampleMetrics,
      downloadUrl: `/api/simulators/reports/${reportId}.${format}`,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Reporting simulator error', details: err.message });
  }
});

// POST /api/simulators/data-pipeline - Simulate real-time streaming batch
router.post('/simulators/data-pipeline', async (req, res) => {
  try {
    const { batchSize = 120, source = 'PostgreSQL CDC' } = req.body;

    const batchId = `BATCH_${Date.now()}`;
    const validatedRecords = Math.min(1000, Math.max(10, Number(batchSize)));

    return res.json({
      success: true,
      batchId,
      source,
      destination: 'Snowflake / Analytical DB',
      recordsProcessed: validatedRecords,
      throughputPerSec: 1450,
      latencyMs: 16.4,
      schemaStatus: '100% Validated (Zod Schema strict pass)',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Pipeline simulator error', details: err.message });
  }
});

// POST /api/simulators/ai-query - RAG Assistant Query
router.post('/simulators/ai-query', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const answer = await geminiService.queryAssistant(String(query));

    return res.json({
      success: true,
      query,
      answer,
      citation: 'Enterprise_Agreement_v2.pdf (p. 14)',
      latencyMs: 184,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'AI Query simulator error', details: err.message });
  }
});

// POST /api/simulators/crm-sync - Simulate bi-directional CRM / ERP sync
router.post('/simulators/crm-sync', async (req, res) => {
  try {
    const { entity = 'Account', source = 'Salesforce', target = 'Internal Postgres' } = req.body;

    const syncId = `SYNC_${Date.now()}`;

    return res.json({
      success: true,
      syncId,
      entity,
      source,
      target,
      recordsSynced: 1,
      fieldsUpdated: ['Tier', 'Billing', 'Status', 'UpdatedTimestamp'],
      status: 'propagated_bidirectional',
      latencyMs: 38,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'CRM sync simulator error', details: err.message });
  }
});

export default router;
