import { Router, Request, Response } from 'express';
import { Booking, BookingStatus } from '../models/Booking';
import { isDBConnected } from '../db/connection';
import { localStore } from '../db/localStore';
import { emailService } from '../services/emailService';
import { validateBody, validateParams } from '../validation/middleware';
import { BookingPayloadSchema, BookingPayload } from '../validation/schemas';
import { z } from 'zod';

const router = Router();

// POST /api/bookings/create - Record a discovery call booking with Zod validation
router.post(
  '/bookings/create',
  validateBody(BookingPayloadSchema),
  async (req: Request<{}, {}, BookingPayload>, res: Response): Promise<void> => {
    try {
      const payload = req.body;
      const bookingId = `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      const bookingRecord = {
        id: bookingId,
        name: payload.name || 'Scheduled Guest',
        email: payload.email || '',
        company: payload.company || '',
        duration: payload.duration,
        topic: payload.topic,
        notes: payload.notes || '',
        status: payload.status || BookingStatus.CONFIRMED,
        createdAt: new Date().toISOString(),
      };

      // Save via Mongoose if available
      if (isDBConnected()) {
        try {
          const doc = new Booking(bookingRecord);
          await doc.save();
        } catch (e: any) {
          console.warn('[BookingRoute] Mongoose save error:', e.message);
        }
      }

      // Save to local storage
      localStore.saveBooking(bookingRecord);
      localStore.logEvent('booking_created', { id: bookingId, email: bookingRecord.email });

      // Send email notification
      if (bookingRecord.email) {
        await emailService.send({
          subject: `[Discovery Call Scheduled] ${bookingRecord.duration} Min with ${bookingRecord.name}`,
          html: `
            <div style="background-color: #121212; color: #E4E4E7; font-family: sans-serif; padding: 24px; border-radius: 12px; border: 1px solid #27272A; max-width: 600px;">
              <h2 style="color: #00BFFF; margin-top: 0;">Discovery Session Scheduled</h2>
              <p><strong>Attendee:</strong> ${bookingRecord.name} (${bookingRecord.email})</p>
              <p><strong>Duration:</strong> ${bookingRecord.duration} Minutes</p>
              <p><strong>Topic:</strong> ${bookingRecord.topic}</p>
              <p><strong>Notes:</strong> ${bookingRecord.notes || 'None'}</p>
            </div>
          `,
        });
      }

      res.status(200).json({
        success: true,
        bookingId,
        booking: bookingRecord,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to record booking', details: err.message });
    }
  }
);

// GET /api/bookings - Get all bookings
router.get('/bookings', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      const records = await Booking.find({}).sort({ createdAt: -1 }).lean();
      res.json({ source: 'mongoose_mongodb', count: records.length, bookings: records });
      return;
    }

    const records = localStore.getBookings();
    res.json({ source: 'local_file', count: records.length, bookings: records });
  } catch (err: any) {
    const records = localStore.getBookings();
    res.json({ source: 'local_file_fallback', count: records.length, bookings: records });
  }
});

const BookingStatusUpdateSchema = z.object({
  status: z.nativeEnum(BookingStatus, {
    message: 'Invalid booking status.',
  }),
});

const IdParamSchema = z.object({
  id: z.string().min(1, { message: 'Booking ID is required.' }),
});

// PATCH /api/bookings/:id/status
router.patch(
  '/bookings/:id/status',
  validateParams(IdParamSchema),
  validateBody(BookingStatusUpdateSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      localStore.updateBookingStatus(id, status);

      if (isDBConnected()) {
        await Booking.updateOne({ id }, { $set: { status, updatedAt: new Date() } });
      }

      res.json({ success: true, id, status });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to update booking', details: err.message });
    }
  }
);

export default router;
