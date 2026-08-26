import mongoose, { Document, Schema, Model } from 'mongoose';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum BookingDuration {
  FIFTEEN = '15',
  THIRTY = '30',
  FORTY_FIVE = '45',
  SIXTY = '60',
}

export interface IBooking extends Document {
  id: string;
  name: string;
  email: string;
  company?: string;
  duration: BookingDuration;
  topic: string;
  notes?: string;
  status: BookingStatus;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Attendee name is required'],
      trim: true,
      default: 'Scheduled Guest',
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    duration: {
      type: String,
      enum: {
        values: Object.values(BookingDuration),
        message: '{VALUE} is not a valid meeting duration (15, 30, 45, 60)',
      },
      default: BookingDuration.THIRTY,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      default: 'Systems Architecture Discovery Call',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: Object.values(BookingStatus),
        message: '{VALUE} is not a valid booking status',
      },
      default: BookingStatus.CONFIRMED,
      index: true,
    },
    scheduledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BookingSchema.index({ createdAt: -1 });

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
