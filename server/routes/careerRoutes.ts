import { Router, Request, Response } from 'express';
import { Application, ApplicationStatus } from '../models/Application';
import { isDBConnected } from '../db/connection';
import { localStore } from '../db/localStore';
import { emailService } from '../services/emailService';
import { validateBody, validateParams } from '../validation/middleware';
import { ApplicationPayloadSchema, ApplicationPayload } from '../validation/schemas';
import { z } from 'zod';

const router = Router();

// POST /api/careers/apply - Submit job application with Zod validation
router.post(
  '/careers/apply',
  validateBody(ApplicationPayloadSchema),
  async (req: Request<{}, {}, ApplicationPayload>, res: Response): Promise<void> => {
    try {
      const payload = req.body;
      const applicationId = `APP_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      const appRecord = {
        id: applicationId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        role: payload.role,
        experienceYears: payload.experienceYears,
        linkedin: payload.linkedin || '',
        github: payload.github || '',
        portfolio: payload.portfolio || '',
        coverLetter: payload.coverLetter || '',
        resumeFileName: payload.resumeFileName || 'Resume Document',
        resumeDataUrl: payload.resumeDataUrl || '',
        resumeText: payload.resumeText || '',
        status: payload.status || ApplicationStatus.NEW,
        createdAt: new Date().toISOString(),
      };

      console.log(`[CareersRoute] Application received for: ${appRecord.role} from ${appRecord.email}`);

      // Save via Mongoose if available
      let mongooseSaved = false;
      if (isDBConnected()) {
        try {
          const doc = new Application(appRecord);
          await doc.save();
          mongooseSaved = true;
        } catch (mErr: any) {
          console.warn('[CareersRoute] Mongoose save error:', mErr.message);
        }
      }

      // Persist to local store
      localStore.saveApplication(appRecord);
      localStore.logEvent('career_application', {
        id: applicationId,
        role: appRecord.role,
        name: appRecord.name,
      });

      // Send admin notification
      await emailService.send({
        subject: `[Job Application] ${appRecord.name} for ${appRecord.role}`,
        replyTo: appRecord.email,
        html: `
          <div style="background-color: #121212; color: #E4E4E7; font-family: sans-serif; padding: 24px; border-radius: 12px; border: 1px solid #27272A; max-width: 600px;">
            <h2 style="color: #00BFFF; margin-top: 0;">New Career Application</h2>
            <p><strong>Candidate:</strong> ${appRecord.name}</p>
            <p><strong>Role:</strong> ${appRecord.role}</p>
            <p><strong>Email:</strong> <a href="mailto:${appRecord.email}" style="color:#00BFFF;">${appRecord.email}</a></p>
            <p><strong>Phone:</strong> ${appRecord.phone || 'N/A'}</p>
            <p><strong>Experience:</strong> ${appRecord.experienceYears} Years</p>
            <p><strong>LinkedIn:</strong> ${appRecord.linkedin || 'N/A'}</p>
            <p><strong>GitHub:</strong> ${appRecord.github || 'N/A'}</p>
            <p><strong>Portfolio:</strong> ${appRecord.portfolio || 'N/A'}</p>
            <hr style="border: none; border-top: 1px solid #27272A; margin: 16px 0;"/>
            <p><strong>Cover Letter:</strong></p>
            <p style="background: #1E1E1E; padding: 12px; border-radius: 8px; font-size: 13px; white-space: pre-wrap;">${appRecord.coverLetter || 'No cover letter provided.'}</p>
          </div>
        `,
      });

      res.status(200).json({
        success: true,
        applicationId,
        message: 'Application received and validated successfully.',
        mongooseSaved,
      });
    } catch (err: any) {
      console.error('[CareersRoute] Error:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to process job application.',
        details: err.message,
      });
    }
  }
);

// GET /api/applications - Get all job applications
router.get('/applications', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      const records = await Application.find({}).sort({ createdAt: -1 }).lean();
      res.json({ source: 'mongoose_mongodb', count: records.length, applications: records });
      return;
    }

    const records = localStore.getApplications();
    res.json({ source: 'local_file', count: records.length, applications: records });
  } catch (err: any) {
    const records = localStore.getApplications();
    res.json({ source: 'local_file_fallback', count: records.length, applications: records });
  }
});

const StatusUpdateSchema = z.object({
  status: z.nativeEnum(ApplicationStatus, {
    message: 'Invalid applicant status.',
  }),
});

const IdParamSchema = z.object({
  id: z.string().min(1, { message: 'Application ID is required.' }),
});

// PATCH /api/applications/:id/status - Update application status
router.patch(
  '/applications/:id/status',
  validateParams(IdParamSchema),
  validateBody(StatusUpdateSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      localStore.updateApplicationStatus(id, status);

      if (isDBConnected()) {
        await Application.updateOne({ id }, { $set: { status, updatedAt: new Date() } });
      }

      localStore.logEvent('application_status_updated', { id, status });
      res.json({ success: true, id, status });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to update application status', details: err.message });
    }
  }
);

// DELETE /api/applications/:id - Delete an application
router.delete(
  '/applications/:id',
  validateParams(IdParamSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      localStore.deleteApplication(id);

      if (isDBConnected()) {
        await Application.deleteOne({ id });
      }

      localStore.logEvent('application_deleted', { id });
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to delete application', details: err.message });
    }
  }
);

export default router;
