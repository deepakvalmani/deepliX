import { Router, Request, Response } from 'express';
import { Inquiry, InquiryStatus } from '../models/Inquiry';
import { isDBConnected } from '../db/connection';
import { localStore } from '../db/localStore';
import { emailService } from '../services/emailService';
import { validateBody, validateParams } from '../validation/middleware';
import { InquiryPayloadSchema, InquiryPayload } from '../validation/schemas';
import { z } from 'zod';

const router = Router();

// POST /api/contact - Submit a new inquiry or blueprint scope with Zod validation
router.post(
  '/contact',
  validateBody(InquiryPayloadSchema),
  async (req: Request<{}, {}, InquiryPayload>, res: Response): Promise<void> => {
    try {
      const payload = req.body;
      const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      const hasBlueprint = Boolean(
        payload.hasBlueprint ||
        (payload.tools && payload.tools.length > 0) ||
        (payload.outcomes && payload.outcomes.length > 0) ||
        payload.message.includes('[Attached Blueprint Architecture]')
      );

      const recordData = {
        id: submissionId,
        name: payload.name,
        email: payload.email,
        company: payload.company || '',
        role: payload.role || '',
        interest: payload.interest,
        message: payload.message,
        customOutcome: payload.customOutcome || '',
        tools: payload.tools || [],
        outcomes: payload.outcomes || [],
        hasBlueprint,
        status: payload.status || InquiryStatus.NEW,
        createdAt: new Date().toISOString(),
      };

      console.log(`[ContactRoute] Processing validated inquiry from: ${recordData.email}`);

      // 1. Save using Mongoose Model if connected
      let mongooseSaved = false;
      if (isDBConnected()) {
        try {
          const doc = new Inquiry(recordData);
          await doc.save();
          mongooseSaved = true;
          console.log(`[ContactRoute] Saved Mongoose Inquiry document: ${doc.id}`);
        } catch (dbErr: any) {
          console.warn('[ContactRoute] Mongoose save warning:', dbErr.message);
        }
      }

      // 2. Always persist to durable local file store
      localStore.saveSubmission(recordData);
      localStore.logEvent('contact_submission', {
        id: recordData.id,
        email: recordData.email,
        hasBlueprint,
      });

      // 3. Dispatch admin notification email
      const emailResult = await emailService.send({
        subject: `[Lead Submission] ${recordData.name} from ${recordData.company || 'Direct Client'}`,
        replyTo: recordData.email,
        html: emailService.buildContactNotificationHtml({
          name: recordData.name,
          email: recordData.email,
          company: recordData.company,
          role: recordData.role,
          interest: recordData.interest,
          message: recordData.message,
          tools: recordData.tools,
          outcomes: recordData.outcomes,
        }),
      });

      // 4. Send auto-confirmation to prospect if valid email
      if (recordData.email.includes('@')) {
        emailService
          .send({
            to: recordData.email,
            subject: 'Thank you for reaching out to deepliX',
            html: emailService.buildClientConfirmationHtml(recordData.name),
          })
          .catch((e) => console.warn('[ContactRoute] Auto-reply error:', e.message));
      }

      res.status(200).json({
        success: true,
        message: 'Thank you for reaching out to deepliX. We will be in touch shortly.',
        submissionId: recordData.id,
        savedToDatabase: true,
        mongooseSaved,
        emailSent: emailResult.success,
        emailProvider: emailResult.provider,
      });
    } catch (err: any) {
      console.error('[ContactRoute] Internal error:', err);
      res.status(500).json({
        success: false,
        error: 'An internal error occurred while processing your message.',
        details: err.message,
      });
    }
  }
);

// GET /api/submissions - Retrieve all lead submissions
router.get('/submissions', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      const records = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
      res.json({ source: 'mongoose_mongodb', count: records.length, submissions: records });
      return;
    }

    const records = localStore.getSubmissions();
    res.json({ source: 'local_file', count: records.length, submissions: records });
  } catch (err: any) {
    console.error('[SubmissionsRoute] Fetch error:', err.message);
    const records = localStore.getSubmissions();
    res.json({ source: 'local_file_fallback', count: records.length, submissions: records });
  }
});

const IdParamSchema = z.object({
  id: z.string().min(1, { message: 'Submission ID is required.' }),
});

// DELETE /api/submissions/:id - Delete a lead submission
router.delete(
  '/submissions/:id',
  validateParams(IdParamSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      localStore.deleteSubmission(id);

      if (isDBConnected()) {
        await Inquiry.deleteOne({ id });
      }

      localStore.logEvent('submission_deleted', { id });
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to delete submission', details: err.message });
    }
  }
);

export default router;
