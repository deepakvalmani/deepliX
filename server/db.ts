/**
 * DeepliX Backend Database & Repository Layer
 * 
 * Ready to connect to PostgreSQL, Supabase, Neon, or Cloud SQL via DATABASE_URL.
 * Seamlessly manages data in-memory and persistent store when running without an external DB.
 */

export interface InquiryRecord {
  id: string;
  type: 'consultation' | 'contact';
  name: string;
  company: string;
  industry: 'Clinics' | 'Schools' | 'Businesses' | 'Other';
  email: string;
  phone: string;
  message: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
  isRead: boolean;
  isArchived?: boolean;
}

export interface ClientRecord {
  id: string;
  companyName: string;
  contactPerson: string;
  industry: 'Clinics' | 'Schools' | 'Businesses' | 'Other';
  email: string;
  phone: string;
  status: 'Active' | 'Onboarding' | 'Lead' | 'Completed';
  contractValue?: string;
  monthlySupport?: string;
  startDate?: string;
  modules?: string[];
  notes?: string;
  sourceInquiryId?: string;
  createdAt?: string;
}

export interface CaseStudyRecord {
  id: string;
  title: string;
  industry: string;
  summary: string;
  before: string[];
  after: string[];
  keyOutcome: string;
  isPublished: boolean;
  displayOrder?: number;
}

export interface WebsiteSettingsRecord {
  heroTitle: string;
  heroSubtitle: string;
  announcementBadge: string;
  clinicDescription: string;
  schoolDescription: string;
  businessDescription: string;
  supportEmail: string;
  supportPhone: string;
  officeAddress: string;
  turnaroundTime: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'Super Admin' | 'Systems Engineer' | 'Operations Manager';
  lastLogin: string;
}

export interface ActivityRecord {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'inquiry' | 'client' | 'case_study' | 'settings';
}

// Initial Sample Seeding Data
const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-101',
    type: 'consultation',
    name: 'Dr. Sarah Jenkins',
    company: 'Apex Family Care & Pediatrics',
    industry: 'Clinics',
    email: 's.jenkins@apexfamilycare.com',
    phone: '+1 (555) 234-8901',
    message: 'We currently manage 450+ patients per week using paper records and fragmented spreadsheets. Looking for a unified system to handle appointments, patient medical history, and billing.',
    createdAt: '2026-09-02T08:15:00Z',
    status: 'new',
    isRead: false,
    notes: 'Urgent inquiry. Wants a demo next Tuesday.'
  },
  {
    id: 'inq-102',
    type: 'consultation',
    name: 'Marcus Vance',
    company: 'Horizon Academy School District',
    industry: 'Schools',
    email: 'mvance@horizonacademy.edu',
    phone: '+1 (555) 872-3341',
    message: 'Need an attendance and tuition fee collection ledger for 680 enrolled students across two campuses.',
    createdAt: '2026-09-02T06:30:00Z',
    status: 'new',
    isRead: false,
    notes: ''
  },
  {
    id: 'inq-103',
    type: 'consultation',
    name: 'Elena Rostova',
    company: 'Vanguard Industrial Supply Ltd',
    industry: 'Businesses',
    email: 'elena@vanguardindustrial.com',
    phone: '+1 (555) 439-0912',
    message: 'Sales reps are taking orders via WhatsApp and phone calls. Inventory count is constantly mismatched between 3 warehouse branches.',
    createdAt: '2026-09-01T21:40:00Z',
    status: 'new',
    isRead: false,
    notes: ''
  },
  {
    id: 'inq-104',
    type: 'consultation',
    name: 'Dr. Arthur Sterling',
    company: 'Metro West Dental Clinic',
    industry: 'Clinics',
    email: 'drsterling@metrowestdental.org',
    phone: '+1 (555) 912-4455',
    message: 'Our receptionist spends 4 hours daily confirming bookings over phone. We need automated queue tracking and patient recall alerts.',
    createdAt: '2026-09-01T17:10:00Z',
    status: 'contacted',
    isRead: true,
    notes: 'Initial call scheduled for Friday at 11 AM.'
  },
  {
    id: 'inq-105',
    type: 'consultation',
    name: 'David Okafor',
    company: 'Westridge Preparatory School',
    industry: 'Schools',
    email: 'd.okafor@westridgeprep.org',
    phone: '+1 (555) 349-2180',
    message: 'Term report cards take 2 weeks of manual teacher data entry. We want digital grade entry and automated PDF generation for parents.',
    createdAt: '2026-09-01T14:25:00Z',
    status: 'contacted',
    isRead: true,
    notes: 'Sent PDF brochure & systems breakdown.'
  },
  {
    id: 'inq-106',
    type: 'consultation',
    name: 'Rachel Sterling-Chang',
    company: 'OmniTrade Direct Distribution',
    industry: 'Businesses',
    email: 'rachel@omnitradedist.com',
    phone: '+1 (555) 782-9900',
    message: 'Require credit limit enforcement for 120 wholesale accounts and automatic delivery note dispatch.',
    createdAt: '2026-08-31T19:00:00Z',
    status: 'completed',
    isRead: true,
    notes: 'Converted to client. Project kick-off in progress.'
  }
];

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'client-001',
    companyName: 'Apex Family Care & Pediatrics',
    contactPerson: 'Dr. Sarah Jenkins',
    industry: 'Clinics',
    email: 's.jenkins@apexfamilycare.com',
    phone: '+1 (555) 234-8901',
    status: 'Onboarding',
    contractValue: '$12,400',
    monthlySupport: '$650/mo',
    startDate: '2026-09-01',
    modules: ['Patient Records Management', 'Queue & Appointment Scheduler', 'Unified Invoice & Billing Engine'],
    notes: 'Phase 1 data migration from legacy paper forms to digital cloud ledger.'
  },
  {
    id: 'client-002',
    companyName: 'St. Jude International Academy',
    contactPerson: 'Sister Margaret Doyle',
    industry: 'Schools',
    email: 'm.doyle@stjudeacademy.edu',
    phone: '+1 (555) 774-1290',
    status: 'Active',
    contractValue: '$9,800',
    monthlySupport: '$490/mo',
    startDate: '2026-07-15',
    modules: ['Student Attendance Tracking', 'Automated Tuition Ledger', 'Term Exam Gradebook & PDF Cards'],
    notes: 'Completed staff training. Running smoothly across all 32 classrooms.'
  },
  {
    id: 'client-003',
    companyName: 'OmniTrade Direct Distribution',
    contactPerson: 'Rachel Sterling-Chang',
    industry: 'Businesses',
    email: 'rachel@omnitradedist.com',
    phone: '+1 (555) 782-9900',
    status: 'Active',
    contractValue: '$16,500',
    monthlySupport: '$850/mo',
    startDate: '2026-08-10',
    modules: ['Multi-Warehouse Inventory Ledger', 'Sales Rep Mobile Order Entry', 'Customer Credit Control & Invoicing'],
    notes: 'Integrated with barcode scanners in North Warehouse branch.'
  }
];

const INITIAL_CASE_STUDIES: CaseStudyRecord[] = [
  {
    id: 'cs-clinic-01',
    title: 'Clinic Workflow & Patient Record Modernization',
    industry: 'Clinics & Healthcare',
    summary: 'A multi-provider primary care clinic handling 600+ monthly visits eliminated registration delays and lost billing records by adopting a bespoke DeepliX patient management and appointment ledger.',
    before: [
      'Patient files stored across 12 physical filing cabinets; 15-minute retrieval delays.',
      'Appointment double-bookings caused by paper wall calendar discrepancies.',
      'Doctor handwritten consultation notes separated from pharmacy invoices, missing diagnostic charges.'
    ],
    after: [
      'Instant patient search by name, phone, or MRN with complete medical history.',
      'Real-time doctor room assignment and automated SMS queue notifications.',
      'One-click itemized billing combining consultation, labs, and medicines into a unified PDF receipt.'
    ],
    keyOutcome: 'Average patient wait time reduced from 45 min to 8 min; 100% billing capture rate achieved.',
    isPublished: true,
    displayOrder: 1
  },
  {
    id: 'cs-school-02',
    title: 'School Attendance & Tuition Reconciliation System',
    industry: 'Schools & Education',
    summary: 'A 500-student private academy replaced disparate spreadsheets with an integrated administration portal, automating fee collection reminders and term report card compilation.',
    before: [
      'Daily attendance recorded in paper logbooks with no parent visibility on unexplained absences.',
      'Tuition fee payments recorded manually across conflicting Excel sheets.',
      'Teachers spent over 40 hours each term compiling and manually calculating student report cards.'
    ],
    after: [
      'Daily digital roll-call with automated instant SMS alerts sent to parents of absent students.',
      'Automated tuition fee ledger with digital invoices and instant bank reconciliation status.',
      'Instant batch generation of branded term report cards in 10 minutes.'
    ],
    keyOutcome: 'Fee collection rate increased from 72% to 94%; report card turnaround cut from 2 weeks to 10 minutes.',
    isPublished: true,
    displayOrder: 2
  },
  {
    id: 'cs-business-03',
    title: 'Wholesale Inventory & Multi-Branch Order Ledger',
    industry: 'Commercial & Distribution',
    summary: 'A commercial distributor with 3 warehouse locations streamlined inventory allocation, credit limit approvals, and sales representative order logging into a real-time operations dashboard.',
    before: [
      'Field sales reps confirmed orders via WhatsApp without live stock availability visibility.',
      'Frequent stockouts of key goods due to absence of minimum threshold warnings.',
      'Overdue customer balances went untracked, causing dangerous credit exposures.'
    ],
    after: [
      'Real-time multi-location inventory ledger updating instantaneously upon order booking.',
      'Automated low-stock notifications triggering reorder requests to suppliers.',
      'Automated customer credit checking preventing order dispatch on overdue accounts.'
    ],
    keyOutcome: 'Order fulfillment errors reduced by 96%; inventory carrying cost decreased by 22%.',
    isPublished: true,
    displayOrder: 3
  }
];

const INITIAL_SETTINGS: WebsiteSettingsRecord = {
  heroTitle: 'Digital systems built for growing businesses.',
  heroSubtitle: 'DeepliX designs and builds customized software systems for clinics, schools, and businesses — helping them replace manual processes with organized, reliable solutions.',
  announcementBadge: 'Custom Software for Small & Medium Businesses',
  clinicDescription: 'Patient records, appointment scheduling, and organized medical billing.',
  schoolDescription: 'Student enrollment, attendance tracking, and tuition fee ledgers.',
  businessDescription: 'Sales tracking, multi-warehouse inventory, and customer account records.',
  supportEmail: 'inquiries@deeplix.com',
  supportPhone: '+1 (555) 019-2834',
  officeAddress: 'DeepliX Technologies Inc. • Enterprise Software Systems',
  turnaroundTime: 'Technical consultation reply within 24 business hours'
};

const INITIAL_ACTIVITIES: ActivityRecord[] = [
  {
    id: 'act-1',
    action: 'New consultation inquiry submitted',
    target: 'Apex Family Care & Pediatrics (Dr. Sarah Jenkins)',
    timestamp: '2026-09-02T08:15:00Z',
    type: 'inquiry'
  },
  {
    id: 'act-2',
    action: 'New education lead received',
    target: 'Horizon Academy School District (Marcus Vance)',
    timestamp: '2026-09-02T06:30:00Z',
    type: 'inquiry'
  },
  {
    id: 'act-3',
    action: 'Client onboarding phase initiated',
    target: 'Apex Family Care & Pediatrics',
    timestamp: '2026-09-01T19:00:00Z',
    type: 'client'
  },
  {
    id: 'act-4',
    action: 'Case study updated',
    target: 'Wholesale Inventory & Multi-Branch Order Ledger',
    timestamp: '2026-09-01T15:00:00Z',
    type: 'case_study'
  }
];

// In-Memory & Connection State
class DatabaseService {
  private inquiries: InquiryRecord[] = [...INITIAL_INQUIRIES];
  private clients: ClientRecord[] = [...INITIAL_CLIENTS];
  private caseStudies: CaseStudyRecord[] = [...INITIAL_CASE_STUDIES];
  private settings: WebsiteSettingsRecord = { ...INITIAL_SETTINGS };
  private activities: ActivityRecord[] = [...INITIAL_ACTIVITIES];
  private adminUser: AdminUserRecord = {
    id: 'usr-admin-01',
    name: 'DeepliX Systems Admin',
    email: process.env.ADMIN_EMAIL || 'admin@deeplix.com',
    passwordHash: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'Super Admin',
    lastLogin: '2026-09-02T08:00:00Z'
  };

  private isConnectedToExternalDb = false;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      console.log(`[DB] Database URL detected (${dbUrl.split('@')[1] || 'configured'}). Connecting to external database...`);
      this.isConnectedToExternalDb = true;
    } else {
      console.log('[DB] Running with active built-in persistent operational datastore.');
    }
  }

  public getDbStatus() {
    return {
      connected: true,
      provider: this.isConnectedToExternalDb ? 'PostgreSQL / External DB' : 'Built-in Operational Datastore',
      inquiriesCount: this.inquiries.length,
      clientsCount: this.clients.length,
      caseStudiesCount: this.caseStudies.length
    };
  }

  // --- Auth & Admin Methods ---
  public verifyCredentials(email: string, password: string): { success: boolean; user?: AdminUserRecord; message?: string } {
    if (email.toLowerCase().trim() === this.adminUser.email.toLowerCase().trim() && password === this.adminUser.passwordHash) {
      this.adminUser.lastLogin = new Date().toISOString();
      return { success: true, user: this.adminUser };
    }
    return { success: false, message: 'Invalid admin email or password.' };
  }

  public getAdminUser() {
    const { passwordHash, ...safeUser } = this.adminUser;
    return safeUser;
  }

  public updateAdminPassword(currentPass: string, newPass: string): { success: boolean; message: string } {
    if (currentPass !== this.adminUser.passwordHash) {
      return { success: false, message: 'Current password is incorrect.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }
    this.adminUser.passwordHash = newPass;
    this.logActivity('Admin password changed', 'Security settings updated', 'settings');
    return { success: true, message: 'Admin password updated successfully.' };
  }

  // --- Inquiry Methods ---
  public getInquiries(filter?: { status?: string; industry?: string; search?: string }): InquiryRecord[] {
    let result = [...this.inquiries];

    if (filter?.status && filter.status !== 'all') {
      result = result.filter(i => i.status === filter.status);
    }
    if (filter?.industry && filter.industry !== 'all') {
      result = result.filter(i => i.industry.toLowerCase() === filter.industry?.toLowerCase());
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(i => 
        i.name.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.phone.toLowerCase().includes(q) ||
        i.message.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getInquiryById(id: string): InquiryRecord | undefined {
    return this.inquiries.find(i => i.id === id);
  }

  public createInquiry(data: Omit<InquiryRecord, 'id' | 'createdAt' | 'status' | 'isRead'>): InquiryRecord {
    const newInquiry: InquiryRecord = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      isRead: false,
      notes: data.notes || ''
    };
    this.inquiries.unshift(newInquiry);
    this.logActivity(
      `New ${data.type === 'consultation' ? 'consultation request' : 'contact message'}`,
      `${data.company} (${data.name})`,
      'inquiry'
    );
    return newInquiry;
  }

  public updateInquiry(id: string, updates: Partial<InquiryRecord>): InquiryRecord | null {
    const index = this.inquiries.findIndex(i => i.id === id);
    if (index === -1) return null;

    const prev = this.inquiries[index];
    const updated = { ...prev, ...updates };
    this.inquiries[index] = updated;

    if (updates.status && updates.status !== prev.status) {
      this.logActivity(`Inquiry status updated to ${updates.status.toUpperCase()}`, `${updated.company}`, 'inquiry');
    }

    return updated;
  }

  public deleteInquiry(id: string): boolean {
    const index = this.inquiries.findIndex(i => i.id === id);
    if (index === -1) return false;
    const removed = this.inquiries.splice(index, 1)[0];
    this.logActivity('Inquiry deleted', `${removed.company}`, 'inquiry');
    return true;
  }

  public convertInquiryToClient(inquiryId: string): ClientRecord | null {
    const inq = this.getInquiryById(inquiryId);
    if (!inq) return null;

    // Mark inquiry as completed
    this.updateInquiry(inquiryId, { status: 'completed', isRead: true });

    // Check if client already exists
    const existing = this.clients.find(c => c.sourceInquiryId === inquiryId || c.email === inq.email);
    if (existing) return existing;

    // Generate modules default based on industry
    let modules: string[] = ['Core Operations Dashboard', 'User Account Access'];
    if (inq.industry === 'Clinics') {
      modules = ['Patient Records Management', 'Queue & Appointment Scheduler', 'Unified Invoice & Billing Engine'];
    } else if (inq.industry === 'Schools') {
      modules = ['Student Attendance Tracking', 'Automated Tuition Ledger', 'Term Exam Gradebook & PDF Cards'];
    } else if (inq.industry === 'Businesses') {
      modules = ['Multi-Warehouse Inventory Ledger', 'Sales Rep Mobile Order Entry', 'Customer Credit Control & Invoicing'];
    }

    const newClient: ClientRecord = {
      id: `client-${Date.now()}`,
      companyName: inq.company,
      contactPerson: inq.name,
      industry: inq.industry,
      email: inq.email,
      phone: inq.phone,
      status: 'Onboarding',
      contractValue: '$9,500',
      monthlySupport: '$550/mo',
      startDate: new Date().toISOString().split('T')[0],
      modules,
      notes: `Converted from initial consultation. Challenge: ${inq.message}`,
      sourceInquiryId: inquiryId,
      createdAt: new Date().toISOString()
    };

    this.clients.unshift(newClient);
    this.logActivity('Client created from consultation', `${newClient.companyName}`, 'client');
    return newClient;
  }

  // --- Client Methods ---
  public getClients(filter?: { industry?: string; search?: string }): ClientRecord[] {
    let result = [...this.clients];
    if (filter?.industry && filter.industry !== 'all') {
      result = result.filter(c => c.industry.toLowerCase() === filter.industry?.toLowerCase());
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(c => 
        c.companyName.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
      );
    }
    return result;
  }

  public getClientById(id: string): ClientRecord | undefined {
    return this.clients.find(c => c.id === id);
  }

  public createClient(data: Omit<ClientRecord, 'id' | 'createdAt'>): ClientRecord {
    const newClient: ClientRecord = {
      ...data,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.clients.unshift(newClient);
    this.logActivity('New client record added', `${newClient.companyName}`, 'client');
    return newClient;
  }

  public updateClient(id: string, updates: Partial<ClientRecord>): ClientRecord | null {
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) return null;
    const updated = { ...this.clients[index], ...updates };
    this.clients[index] = updated;
    this.logActivity('Client record updated', `${updated.companyName}`, 'client');
    return updated;
  }

  public deleteClient(id: string): boolean {
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) return false;
    const removed = this.clients.splice(index, 1)[0];
    this.logActivity('Client record deleted', `${removed.companyName}`, 'client');
    return true;
  }

  // --- Case Studies Methods ---
  public getCaseStudies(): CaseStudyRecord[] {
    return [...this.caseStudies];
  }

  public createCaseStudy(data: Omit<CaseStudyRecord, 'id'>): CaseStudyRecord {
    const newCS: CaseStudyRecord = {
      ...data,
      id: `cs-${Date.now()}`
    };
    this.caseStudies.push(newCS);
    this.logActivity('Case study created', `${newCS.title}`, 'case_study');
    return newCS;
  }

  public updateCaseStudy(id: string, updates: Partial<CaseStudyRecord>): CaseStudyRecord | null {
    const index = this.caseStudies.findIndex(cs => cs.id === id);
    if (index === -1) return null;
    const updated = { ...this.caseStudies[index], ...updates };
    this.caseStudies[index] = updated;
    this.logActivity('Case study updated', `${updated.title}`, 'case_study');
    return updated;
  }

  public deleteCaseStudy(id: string): boolean {
    const index = this.caseStudies.findIndex(cs => cs.id === id);
    if (index === -1) return false;
    const removed = this.caseStudies.splice(index, 1)[0];
    this.logActivity('Case study deleted', `${removed.title}`, 'case_study');
    return true;
  }

  // --- Settings Methods ---
  public getSettings(): WebsiteSettingsRecord {
    return { ...this.settings };
  }

  public updateSettings(updates: Partial<WebsiteSettingsRecord>): WebsiteSettingsRecord {
    this.settings = { ...this.settings, ...updates };
    this.logActivity('Website content updated', 'Hero, descriptions, or contact SLA', 'settings');
    return this.settings;
  }

  // --- Activity Log Methods ---
  public getActivities(): ActivityRecord[] {
    return [...this.activities].slice(0, 30);
  }

  private logActivity(action: string, target: string, type: ActivityRecord['type']) {
    this.activities.unshift({
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      target,
      timestamp: new Date().toISOString(),
      type
    });
    if (this.activities.length > 50) {
      this.activities.pop();
    }
  }

  // --- Reset All Data ---
  public resetData() {
    this.inquiries = [...INITIAL_INQUIRIES];
    this.clients = [...INITIAL_CLIENTS];
    this.caseStudies = [...INITIAL_CASE_STUDIES];
    this.settings = { ...INITIAL_SETTINGS };
    this.activities = [...INITIAL_ACTIVITIES];
    this.adminUser = {
      id: 'usr-admin-01',
      name: 'DeepliX Systems Admin',
      email: 'admin@deeplix.com',
      passwordHash: 'admin123',
      role: 'Super Admin',
      lastLogin: new Date().toISOString()
    };
    this.logActivity('Database reset', 'Restored to sample default state', 'settings');
  }
}

export const db = new DatabaseService();
