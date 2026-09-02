export type PageRoute =
  | '/'
  | '/solutions'
  | '/industries'
  | '/industries/clinics'
  | '/industries/schools'
  | '/industries/business'
  | '/case-studies'
  | '/about'
  | '/contact'
  | '/privacy-policy'
  | '/cookie-policy'
  | '/admin/login'
  | '/admin/dashboard'
  | '/admin/inquiries'
  | '/admin/clients'
  | '/admin/case-studies'
  | '/admin/settings';

export interface ConsultationFormData {
  name: string;
  company: string;
  industry: string;
  email: string;
  phone: string;
  businessChallenge: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'completed' | 'rejected';
export type InquiryType = 'consultation' | 'contact';

export interface InquiryItem {
  id: string;
  type: InquiryType;
  name: string;
  company: string;
  industry: 'Clinics' | 'Schools' | 'Businesses' | 'Other';
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
  isRead?: boolean;
  isArchived?: boolean;
}

export interface ClientRecord {
  id: string;
  companyName: string;
  contactPerson: string;
  industry: 'Clinics' | 'Schools' | 'Businesses' | 'Other';
  email: string;
  phone: string;
  notes: string;
  status: 'Lead' | 'Onboarding' | 'Active' | 'Completed';
  createdAt: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  industry: string;
  summary: string;
  before: string[];
  after: string[];
  keyOutcome: string;
  isPublished?: boolean;
}

export interface IndustryModule {
  name: string;
  description: string;
  items: string[];
}

export interface WebsiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  announcementBadge: string;
  contactEmail: string;
  contactPhone: string;
  officeHours: string;
  address: string;
  turnaroundCommitment: string;
  clinicDescription: string;
  schoolDescription: string;
  businessDescription: string;
}

export interface AdminActivity {
  id: string;
  type: 'inquiry_received' | 'status_updated' | 'client_added' | 'case_study_updated' | 'settings_changed';
  description: string;
  timestamp: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  token?: string;
}

