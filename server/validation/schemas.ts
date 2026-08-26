import { z } from 'zod';
import { InquiryInterest, InquiryStatus } from '../models/Inquiry';
import { ApplicationStatus } from '../models/Application';
import { BookingDuration, BookingStatus } from '../models/Booking';

/**
 * 1. Inquiry / Lead Submission Validation Schema
 * Perfectly mirrors Mongoose Inquiry schema with strict type enforcement and user-friendly error messages.
 */
export const InquiryPayloadSchema = z.object({
  name: z
    .string({ message: 'Full name is required.' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' }),

  email: z
    .string({ message: 'Business email is required.' })
    .trim()
    .toLowerCase()
    .email({ message: 'Please provide a valid work email address (e.g. name@company.com).' })
    .max(255, { message: 'Email address is too long.' }),

  company: z
    .string({ message: 'Company name must be text.' })
    .trim()
    .max(120, { message: 'Company name cannot exceed 120 characters.' })
    .optional()
    .default(''),

  role: z
    .string({ message: 'Role title must be text.' })
    .trim()
    .max(100, { message: 'Role title cannot exceed 100 characters.' })
    .optional()
    .default(''),

  interest: z
    .nativeEnum(InquiryInterest, {
      message: `Please select a valid interest category.`,
    })
    .optional()
    .default(InquiryInterest.SYSTEMS_ARCHITECTURE),

  message: z
    .string({ message: 'Project scope or message is required.' })
    .trim()
    .min(5, { message: 'Message must contain at least 5 characters outlining your requirements.' })
    .max(5000, { message: 'Message cannot exceed 5000 characters.' }),

  customOutcome: z
    .string()
    .trim()
    .max(500, { message: 'Custom outcome cannot exceed 500 characters.' })
    .optional()
    .default(''),

  tools: z
    .array(z.string().trim())
    .optional()
    .default([]),

  outcomes: z
    .array(z.string().trim())
    .optional()
    .default([]),

  hasBlueprint: z
    .boolean()
    .optional()
    .default(false),

  status: z
    .nativeEnum(InquiryStatus, {
      message: 'Invalid submission status provided.',
    })
    .optional()
    .default(InquiryStatus.NEW),
});

export type InquiryPayload = z.infer<typeof InquiryPayloadSchema>;

/**
 * 2. Career Job Application Validation Schema
 */
export const ApplicationPayloadSchema = z.object({
  name: z
    .string({ message: 'Candidate full name is required.' })
    .trim()
    .min(2, { message: 'Candidate name must be at least 2 characters.' })
    .max(100, { message: 'Candidate name cannot exceed 100 characters.' }),

  email: z
    .string({ message: 'Email address is required.' })
    .trim()
    .toLowerCase()
    .email({ message: 'Please enter a valid email address.' }),

  phone: z
    .string()
    .trim()
    .max(30, { message: 'Phone number is too long.' })
    .optional()
    .default(''),

  role: z
    .string({ message: 'Job position role is required.' })
    .trim()
    .min(2, { message: 'Please specify the position applied for.' }),

  experienceYears: z
    .string({ message: 'Years of experience is required.' })
    .trim()
    .min(1, { message: 'Please select or specify experience level.' }),

  linkedin: z
    .string()
    .trim()
    .optional()
    .default(''),

  github: z
    .string()
    .trim()
    .optional()
    .default(''),

  portfolio: z
    .string()
    .trim()
    .optional()
    .default(''),

  coverLetter: z
    .string()
    .trim()
    .max(5000, { message: 'Cover letter cannot exceed 5000 characters.' })
    .optional()
    .default(''),

  resumeFileName: z.string().optional().default('Resume Document'),
  resumeDataUrl: z.string().optional().default(''),
  resumeText: z.string().optional().default(''),

  status: z
    .nativeEnum(ApplicationStatus, {
      message: 'Invalid applicant status.',
    })
    .optional()
    .default(ApplicationStatus.NEW),
});

export type ApplicationPayload = z.infer<typeof ApplicationPayloadSchema>;

/**
 * 3. Discovery Booking Validation Schema
 */
export const BookingPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .optional()
    .default('Scheduled Guest'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Please provide a valid email address.' })
    .optional()
    .or(z.literal('')),

  company: z.string().trim().optional().default(''),

  duration: z
    .nativeEnum(BookingDuration, {
      message: 'Duration must be 15, 30, 45, or 60 minutes.',
    })
    .optional()
    .default(BookingDuration.THIRTY),

  topic: z
    .string()
    .trim()
    .min(3, { message: 'Meeting topic must be at least 3 characters.' })
    .optional()
    .default('Systems Architecture Discovery Call'),

  notes: z.string().trim().max(1000).optional().default(''),

  status: z
    .nativeEnum(BookingStatus, {
      message: 'Invalid booking status.',
    })
    .optional()
    .default(BookingStatus.CONFIRMED),
});

export type BookingPayload = z.infer<typeof BookingPayloadSchema>;

/**
 * 4. AI Blueprint Architecture Evaluation Schema
 */
export const BlueprintEvaluationSchema = z.object({
  tools: z
    .array(z.string().trim())
    .min(1, { message: 'Please select at least 1 architectural component (e.g., PostgreSQL, Salesforce).' }),

  outcomes: z
    .array(z.string().trim())
    .optional()
    .default([]),

  scale: z.string().trim().optional().default('Mid-Market Enterprise'),
  customNotes: z.string().trim().max(2000).optional().default(''),
});

export type BlueprintEvaluationPayload = z.infer<typeof BlueprintEvaluationSchema>;
