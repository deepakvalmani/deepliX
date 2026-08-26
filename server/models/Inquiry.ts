import mongoose, { Document, Schema, Model } from 'mongoose';

export enum InquiryInterest {
  GENERAL = 'General Inquiry',
  SYSTEMS_ARCHITECTURE = 'Systems Architecture',
  DATA_PIPELINE = 'Data Pipeline & ETL',
  AI_AUTOMATION = 'AI Automation & RAG',
  CRM_ERP_SYNC = 'CRM & ERP Bi-directional Sync',
  CUSTOM = 'Custom Implementation',
}

export enum InquiryStatus {
  NEW = 'new',
  IN_REVIEW = 'in_review',
  CONTACTED = 'contacted',
  PROPOSAL_SENT = 'proposal_sent',
  CONVERTED = 'converted',
  ARCHIVED = 'archived',
}

export interface IInquiry extends Document {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  interest: InquiryInterest;
  message: string;
  customOutcome?: string;
  tools: string[];
  outcomes: string[];
  hasBlueprint: boolean;
  status: InquiryStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
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
      required: [true, 'Contact name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Contact email address is required'],
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid work email address',
      ],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
      default: '',
    },
    role: {
      type: String,
      trim: true,
      maxlength: [100, 'Role title cannot exceed 100 characters'],
      default: '',
    },
    interest: {
      type: String,
      enum: {
        values: Object.values(InquiryInterest),
        message: '{VALUE} is not a supported inquiry interest type',
      },
      default: InquiryInterest.SYSTEMS_ARCHITECTURE,
    },
    message: {
      type: String,
      required: [true, 'Inquiry message or architectural scope is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters long'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    customOutcome: {
      type: String,
      trim: true,
      default: '',
    },
    tools: {
      type: [String],
      default: [],
    },
    outcomes: {
      type: [String],
      default: [],
    },
    hasBlueprint: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(InquiryStatus),
        message: '{VALUE} is not a valid inquiry status',
      },
      default: InquiryStatus.NEW,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    versionKey: false,
  }
);

// Indexes for query performance
InquirySchema.index({ createdAt: -1 });
InquirySchema.index({ status: 1, createdAt: -1 });

// Avoid model recompilation if already registered in Mongoose cache
export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
