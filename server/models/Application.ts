import mongoose, { Document, Schema, Model } from 'mongoose';

export enum ApplicationStatus {
  NEW = 'new',
  REVIEWING = 'reviewing',
  INTERVIEWING = 'interviewing',
  OFFERED = 'offered',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

export interface IApplication extends Document {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
  resumeText?: string;
  status: ApplicationStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
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
      required: [true, 'Applicant name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Applicant email address is required'],
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      required: [true, 'Target engineering position is required'],
      trim: true,
    },
    experienceYears: {
      type: String,
      required: [true, 'Years of experience is required'],
      default: '1-3',
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
    },
    github: {
      type: String,
      trim: true,
      default: '',
    },
    portfolio: {
      type: String,
      trim: true,
      default: '',
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [5000, 'Cover letter cannot exceed 5000 characters'],
      default: '',
    },
    resumeFileName: {
      type: String,
      default: 'Resume Document',
    },
    resumeDataUrl: {
      type: String,
      default: '',
    },
    resumeText: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: Object.values(ApplicationStatus),
        message: '{VALUE} is not a valid applicant status',
      },
      default: ApplicationStatus.NEW,
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ApplicationSchema.index({ createdAt: -1 });

export const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
