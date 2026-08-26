import { Router, Request, Response } from 'express';
import { geminiService } from '../services/geminiService';
import { validateBody } from '../validation/middleware';
import { BlueprintEvaluationSchema, BlueprintEvaluationPayload } from '../validation/schemas';
import { z } from 'zod';

const router = Router();

// POST /api/ai/analyze-blueprint - Analyze blueprint architecture using Gemini AI with Zod validation
router.post(
  '/ai/analyze-blueprint',
  validateBody(BlueprintEvaluationSchema),
  async (req: Request<{}, {}, BlueprintEvaluationPayload>, res: Response): Promise<void> => {
    try {
      const { tools, outcomes, scale, customNotes } = req.body;

      const evaluation = await geminiService.evaluateArchitecture({
        tools: Array.isArray(tools) ? tools : [],
        outcomes: Array.isArray(outcomes) ? outcomes : [],
        scale,
        customNotes,
      });

      res.json({
        success: true,
        ...evaluation,
        engine: process.env.GEMINI_API_KEY ? 'gemini-2.5-flash' : 'deterministic_rules_engine',
      });
    } catch (err: any) {
      console.error('[AiRoutes] Analyze error:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze architecture blueprint',
        details: err.message,
      });
    }
  }
);

const AdvisorQuerySchema = z.object({
  query: z
    .string({ message: 'Query string is required.' })
    .trim()
    .min(2, { message: 'Query must be at least 2 characters long.' })
    .max(1000, { message: 'Query cannot exceed 1000 characters.' }),
});

// POST /api/ai/advisor-chat - Ask the AI knowledge assistant
router.post(
  '/ai/advisor-chat',
  validateBody(AdvisorQuerySchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { query } = req.body;
      const answer = await geminiService.queryAssistant(String(query));

      res.json({
        success: true,
        query,
        answer,
        citation: 'deepliX Core Data Architecture v2.4 (SOC2 & Zero Data-Loss Blueprint)',
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to process AI query', details: err.message });
    }
  }
);

export default router;
