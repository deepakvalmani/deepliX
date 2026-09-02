import { 
  InquiryItem, 
  ClientRecord, 
  CaseStudyItem, 
  WebsiteSettings, 
  AdminActivity, 
  AdminUser,
  InquiryStatus,
  InquiryType
} from '../types';
import { api } from './api';

// Default initial data matching requirement
const DEFAULT_INQUIRIES: InquiryItem[] = [
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
  },
  {
    id: 'inq-107',
    type: 'consultation',
    name: 'Dr. Tariq Al-Mansoor',
    company: 'Gulf Specialty Cardiology Center',
    industry: 'Clinics',
    email: 't.mansoor@gulfspecialty.com',
    phone: '+1 (555) 601-2299',
    message: 'Need multi-doctor consultation room management and instant lab diagnostic invoice aggregation.',
    createdAt: '2026-08-31T11:45:00Z',
    status: 'new',
    isRead: true,
    notes: ''
  },
  {
    id: 'inq-108',
    type: 'consultation',
    name: 'Patricia Morales',
    company: 'Crestview Montessori',
    industry: 'Schools',
    email: 'patricia@crestviewmontessori.org',
    phone: '+1 (555) 412-8822',
    message: 'Looking for a clean parent portal to send daily classroom announcements and receive fee installments.',
    createdAt: '2026-08-30T16:20:00Z',
    status: 'new',
    isRead: true,
    notes: ''
  },
  {
    id: 'inq-109',
    type: 'consultation',
    name: 'Julian Henderson',
    company: 'Northstar Food Logistics',
    industry: 'Businesses',
    email: 'j.henderson@northstarlogistics.com',
    phone: '+1 (555) 883-1177',
    message: 'Need batch expiry tracking and low-inventory safety alerts across cold storage units.',
    createdAt: '2026-08-30T09:15:00Z',
    status: 'contacted',
    isRead: true,
    notes: 'Waiting for their warehouse manager to join next demo.'
  },
  {
    id: 'inq-110',
    type: 'consultation',
    name: 'Dr. Emily Watson',
    company: 'Watson & Partners Dermatology',
    industry: 'Clinics',
    email: 'emily@watsonderm.com',
    phone: '+1 (555) 554-3200',
    message: 'Seeking a lightweight clinical chart system with photo attachment capability for skin treatment progress.',
    createdAt: '2026-08-29T18:00:00Z',
    status: 'new',
    isRead: true,
    notes: ''
  },
  {
    id: 'inq-111',
    type: 'consultation',
    name: 'Benjamin Ross',
    company: 'Ross Commercial Electrical',
    industry: 'Businesses',
    email: 'ben@rosselectric.com',
    phone: '+1 (555) 309-8811',
    message: 'Custom job quoting, field technician dispatch, and QuickBooks-compatible invoice generation.',
    createdAt: '2026-08-28T15:40:00Z',
    status: 'completed',
    isRead: true,
    notes: 'System deployed and running.'
  },
  {
    id: 'inq-112',
    type: 'consultation',
    name: 'Karen Lindqvist',
    company: 'St. Jude International Academy',
    industry: 'Schools',
    email: 'karen.l@stjudeacademy.int',
    phone: '+1 (555) 771-4433',
    message: 'Multi-currency tuition ledger and term exam grade calculations for 1,200 international students.',
    createdAt: '2026-08-28T10:10:00Z',
    status: 'completed',
    isRead: true,
    notes: 'Client account active.'
  },
  // Contact messages
  {
    id: 'msg-201',
    type: 'contact',
    name: 'Simon Thorne',
    company: 'Thorne & Bayley Diagnostics',
    industry: 'Clinics',
    email: 'simon@thornebayley.com',
    phone: '+1 (555) 819-2041',
    message: 'Do you provide on-premise server deployment options or strictly cloud hosting for HIPAA-compliant clinic data?',
    createdAt: '2026-09-02T07:45:00Z',
    status: 'new',
    isRead: false
  },
  {
    id: 'msg-202',
    type: 'contact',
    name: 'Claire Beauchamp',
    company: 'Beacon Hill High School',
    industry: 'Schools',
    email: 'c.beauchamp@beaconhill.edu',
    phone: '+1 (555) 902-1144',
    message: 'Can the education system integrate with our existing biometric attendance fingerprint scanners?',
    createdAt: '2026-09-01T20:15:00Z',
    status: 'new',
    isRead: false
  },
  {
    id: 'msg-203',
    type: 'contact',
    name: 'Hassan Khalid',
    company: 'Prime Global Auto Spares',
    industry: 'Businesses',
    email: 'hassan@primeglobalspares.com',
    phone: '+1 (555) 332-9011',
    message: 'We have 14,000 auto part SKUs in Excel sheets. Can your data migration service import them directly?',
    createdAt: '2026-09-01T12:00:00Z',
    status: 'contacted',
    isRead: true
  },
  {
    id: 'msg-204',
    type: 'contact',
    name: 'Dr. Michael Cho',
    company: 'Cho Physical Therapy & Rehab',
    industry: 'Clinics',
    email: 'mcho@choptrehab.com',
    phone: '+1 (555) 441-9988',
    message: 'Interested in booking a 30-minute system walkthrough for our 3 physiotherapists and front desk.',
    createdAt: '2026-08-31T15:30:00Z',
    status: 'new',
    isRead: true
  },
  {
    id: 'msg-205',
    type: 'contact',
    name: 'Samantha Reed',
    company: 'Oakridge Business Supplies',
    industry: 'Businesses',
    email: 'sam@oakridgesupplies.com',
    phone: '+1 (555) 662-3311',
    message: 'What is the typical timeframe required to deploy the inventory and sales tracking module?',
    createdAt: '2026-08-30T14:10:00Z',
    status: 'completed',
    isRead: true
  }
];

const DEFAULT_CLIENTS: ClientRecord[] = [
  {
    id: 'cli-001',
    companyName: 'Apex Family Care & Pediatrics',
    contactPerson: 'Dr. Sarah Jenkins',
    industry: 'Clinics',
    email: 's.jenkins@apexfamilycare.com',
    phone: '+1 (555) 234-8901',
    notes: 'Multi-doctor clinic with 3 consultation rooms. Deployed patient records & digital queue.',
    status: 'Active',
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'cli-002',
    companyName: 'St. Jude International Academy',
    contactPerson: 'Karen Lindqvist',
    industry: 'Schools',
    email: 'karen.l@stjudeacademy.int',
    phone: '+1 (555) 771-4433',
    notes: '1,200 students. Active on attendance tracking, term tuition ledger, and report card generation.',
    status: 'Active',
    createdAt: '2026-08-10T14:30:00Z'
  },
  {
    id: 'cli-003',
    companyName: 'OmniTrade Direct Distribution',
    contactPerson: 'Rachel Sterling-Chang',
    industry: 'Businesses',
    email: 'rachel@omnitradedist.com',
    phone: '+1 (555) 782-9900',
    notes: '2 warehouses, 800 active SKUs. Sales pipeline and inventory re-order tracking.',
    status: 'Active',
    createdAt: '2026-08-20T09:15:00Z'
  },
  {
    id: 'cli-004',
    companyName: 'Ross Commercial Electrical',
    contactPerson: 'Benjamin Ross',
    industry: 'Businesses',
    email: 'ben@rosselectric.com',
    phone: '+1 (555) 309-8811',
    notes: 'Service team of 14 electricians. Job cards and receivables ledger.',
    status: 'Active',
    createdAt: '2026-08-25T11:20:00Z'
  },
  {
    id: 'cli-005',
    companyName: 'Westridge Preparatory School',
    contactPerson: 'David Okafor',
    industry: 'Schools',
    email: 'd.okafor@westridgeprep.org',
    phone: '+1 (555) 349-2180',
    notes: 'Currently onboarding grade report card module and parent SMS alert integration.',
    status: 'Onboarding',
    createdAt: '2026-09-01T15:00:00Z'
  }
];

const DEFAULT_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-clinic',
    title: 'Clinic Workflow Improvement',
    industry: 'Clinics & Healthcare',
    summary: 'A 4-physician outpatient medical practice replaced scattered physical charts and manual scheduling with an end-to-end clinical workflow.',
    before: [
      'Patient records managed manually on physical paper folders stored across multiple filing cabinets.',
      'Appointment bookings handled via desktop wall calendars, resulting in duplicate times and patient confusion.',
      'Billing processed separately from doctor consultation notes, leading to unbilled diagnostic tests and delayed payments.',
      'No clear end-of-day revenue reconciliation or patient wait-time visibility.'
    ],
    after: [
      'Centralized digital patient management with instant search by patient name, phone, or MRN.',
      'Real-time doctor calendar and digital waiting queue with automated patient SMS reminders.',
      'One-click unified invoice generation combining consultation, prescriptions, and lab tests into an instant receipt.',
      'Live daily financial audit ledger with zero misplaced records.'
    ],
    keyOutcome: 'Average waiting time reduced from 45 minutes to 8 minutes; 100% billing capture rate.',
    isPublished: true
  },
  {
    id: 'cs-school',
    title: 'School Management Improvement',
    industry: 'Schools & Education',
    summary: 'A private K-12 academy with 650 students automated roll calls, term fee reminders, and semester report card calculation.',
    before: [
      'Attendance recorded in paper books by each teacher; school administration unaware of absences until end of week.',
      'Tuition fee collection logged across disparate Excel sheets with manual bank transfer receipt cross-checking.',
      'Mid-term exam grades compiled by hand, requiring teachers to spend over 40 hours formatting report cards.',
      'Parents had no direct insight into real-time attendance or pending fee deadlines.'
    ],
    after: [
      'Centralized digital attendance portal with immediate automated SMS notifications sent to parents for absent students.',
      'Automated tuition fee ledger generating itemized digital invoices and instant payment status updates.',
      'Automated examination grade calculation and instant PDF report card publishing with one click.',
      'Clear administrative dashboard showing school-wide metrics and collection rates.'
    ],
    keyOutcome: 'Fee collection completion improved from 72% to 94%; report card turnaround cut from 2 weeks to 10 minutes.',
    isPublished: true
  },
  {
    id: 'cs-business',
    title: 'Distribution & Wholesale System Transformation',
    industry: 'Commercial Operations & Wholesale',
    summary: 'A multi-brand distributor with 3 warehouse hubs consolidated order tracking, real-time stock levels, and client credit terms.',
    before: [
      'Sales team booked orders over WhatsApp and paper order books without live warehouse stock confirmation.',
      'Frequent stockouts of high-demand goods due to lack of minimum inventory warning thresholds.',
      'Customer payment limits untracked, causing delayed receivables and bad-debt exposures.'
    ],
    after: [
      'Real-time multi-location inventory ledger synchronizing immediately when sales reps register orders.',
      'Automated stock replenishment alerts triggering when SKU quantities hit safety thresholds.',
      'Integrated customer accounts with clear credit ceilings and automatic overdue invoice aging.'
    ],
    keyOutcome: 'Order fulfillment errors dropped to 0.4%; inventory carrying cost reduced by 22%.',
    isPublished: true
  }
];

const DEFAULT_SETTINGS: WebsiteSettings = {
  heroTitle: 'Digital systems built for growing businesses.',
  heroSubtitle: 'DeepliX designs and builds customized software systems for clinics, schools, and businesses — helping them replace manual processes with organized, reliable solutions.',
  announcementBadge: 'Custom Software for Small & Medium Businesses',
  contactEmail: 'inquiries@deeplix.com',
  contactPhone: '+1 (800) 459-2031',
  officeHours: 'Monday – Friday, 8:00 AM – 6:00 PM EST',
  address: 'DeepliX Technology Inc., 100 Innovation Parkway, Suite 400',
  turnaroundCommitment: 'Within 24 business hours',
  clinicDescription: 'Manage patients, appointments, and operations with zero paper clutter.',
  schoolDescription: 'Manage students, daily attendance, tuition fees, and grade reports.',
  businessDescription: 'Manage sales pipelines, multi-warehouse stock, and receivables.'
};

const DEFAULT_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-1',
    type: 'inquiry_received',
    description: 'New consultation request from Dr. Sarah Jenkins (Apex Family Care)',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-2',
    type: 'inquiry_received',
    description: 'New contact message from Simon Thorne regarding on-premise deployments',
    timestamp: '4 hours ago'
  },
  {
    id: 'act-3',
    type: 'status_updated',
    description: 'Status changed to "Contacted" for Marcus Vance (Horizon Academy)',
    timestamp: 'Yesterday'
  },
  {
    id: 'act-4',
    type: 'client_added',
    description: 'Client record created for Westridge Preparatory School',
    timestamp: '2 days ago'
  },
  {
    id: 'act-5',
    type: 'settings_changed',
    description: 'Website contact information and office hours updated',
    timestamp: '3 days ago'
  }
];

const STORAGE_KEYS = {
  INQUIRIES: 'deeplix_admin_inquiries_v1',
  CLIENTS: 'deeplix_admin_clients_v1',
  CASE_STUDIES: 'deeplix_admin_casestudies_v1',
  SETTINGS: 'deeplix_admin_settings_v1',
  ACTIVITIES: 'deeplix_admin_activities_v1',
  AUTH: 'deeplix_admin_auth_v1'
};

class AdminStore {
  // --- Inquiries ---
  getInquiries(): InquiryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!data) {
        this.saveInquiries(DEFAULT_INQUIRIES);
        return DEFAULT_INQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_INQUIRIES;
    }
  }

  private saveInquiries(items: InquiryItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }

  addInquiry(item: Omit<InquiryItem, 'id' | 'createdAt' | 'status' | 'isRead'>): InquiryItem {
    const list = this.getInquiries();
    const newInquiry: InquiryItem = {
      ...item,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      isRead: false
    };
    const updated = [newInquiry, ...list];
    this.saveInquiries(updated);

    this.addActivity({
      type: 'inquiry_received',
      description: `New ${item.type === 'consultation' ? 'consultation request' : 'contact message'} from ${item.name} (${item.company || 'Direct'})`,
      timestamp: 'Just now'
    });

    // Background sync to backend API
    api.createInquiry(newInquiry).catch(() => {});

    return newInquiry;
  }

  updateInquiryStatus(id: string, status: InquiryStatus): void {
    const list = this.getInquiries();
    const target = list.find(i => i.id === id);
    if (!target) return;

    const updated = list.map(item => 
      item.id === id ? { ...item, status, isRead: true } : item
    );
    this.saveInquiries(updated);

    this.addActivity({
      type: 'status_updated',
      description: `Inquiry status for ${target.name} changed to "${status.toUpperCase()}"`,
      timestamp: 'Just now'
    });

    // Background sync to backend API
    api.updateInquiry(id, { status, isRead: true }).catch(() => {});
  }

  updateInquiryNotes(id: string, notes: string): void {
    const list = this.getInquiries();
    const updated = list.map(item => 
      item.id === id ? { ...item, notes } : item
    );
    this.saveInquiries(updated);

    // Background sync to backend API
    api.updateInquiry(id, { notes }).catch(() => {});
  }

  markInquiryRead(id: string): void {
    const list = this.getInquiries();
    const updated = list.map(item => 
      item.id === id ? { ...item, isRead: true } : item
    );
    this.saveInquiries(updated);

    // Background sync to backend API
    api.updateInquiry(id, { isRead: true }).catch(() => {});
  }

  toggleArchiveInquiry(id: string): void {
    const list = this.getInquiries();
    const target = list.find(i => i.id === id);
    if (!target) return;
    const isArchived = !target.isArchived;

    const updated = list.map(item => 
      item.id === id ? { ...item, isArchived } : item
    );
    this.saveInquiries(updated);

    // Background sync to backend API
    api.updateInquiry(id, { isArchived }).catch(() => {});
  }

  deleteInquiry(id: string): void {
    const list = this.getInquiries();
    const updated = list.filter(item => item.id !== id);
    this.saveInquiries(updated);

    // Background sync to backend API
    api.deleteInquiry(id).catch(() => {});
  }

  // --- Clients ---
  getClients(): ClientRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      if (!data) {
        this.saveClients(DEFAULT_CLIENTS);
        return DEFAULT_CLIENTS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_CLIENTS;
    }
  }

  private saveClients(items: ClientRecord[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save clients', e);
    }
  }

  addClient(item: Omit<ClientRecord, 'id' | 'createdAt'>): ClientRecord {
    const list = this.getClients();
    const newClient: ClientRecord = {
      ...item,
      id: `cli-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newClient, ...list];
    this.saveClients(updated);

    this.addActivity({
      type: 'client_added',
      description: `Client record created for ${item.companyName}`,
      timestamp: 'Just now'
    });

    // Background sync to backend API
    api.createClient(newClient).catch(() => {});

    return newClient;
  }

  updateClient(id: string, updates: Partial<ClientRecord>): void {
    const list = this.getClients();
    const updated = list.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    this.saveClients(updated);

    // Background sync to backend API
    api.updateClient(id, updates).catch(() => {});
  }

  deleteClient(id: string): void {
    const list = this.getClients();
    const updated = list.filter(item => item.id !== id);
    this.saveClients(updated);

    // Background sync to backend API
    api.deleteClient(id).catch(() => {});
  }

  convertInquiryToClient(inquiryId: string): ClientRecord | null {
    const inquiries = this.getInquiries();
    const inquiry = inquiries.find(i => i.id === inquiryId);
    if (!inquiry) return null;

    const newClient = this.addClient({
      companyName: inquiry.company || `${inquiry.name}'s Organization`,
      contactPerson: inquiry.name,
      industry: inquiry.industry || 'Businesses',
      email: inquiry.email,
      phone: inquiry.phone,
      notes: `Converted from ${inquiry.type === 'consultation' ? 'Consultation Request' : 'Contact Message'}. Original request: "${inquiry.message}"`,
      status: 'Onboarding'
    });

    // Mark inquiry as completed
    this.updateInquiryStatus(inquiryId, 'completed');

    // Background sync to backend API
    api.convertInquiryToClient(inquiryId).catch(() => {});

    return newClient;
  }

  // --- Case Studies ---
  getCaseStudies(): CaseStudyItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CASE_STUDIES);
      if (!data) {
        this.saveCaseStudies(DEFAULT_CASE_STUDIES);
        return DEFAULT_CASE_STUDIES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_CASE_STUDIES;
    }
  }

  private saveCaseStudies(items: CaseStudyItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CASE_STUDIES, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save case studies', e);
    }
  }

  addCaseStudy(item: Omit<CaseStudyItem, 'id'>): CaseStudyItem {
    const list = this.getCaseStudies();
    const newCaseStudy: CaseStudyItem = {
      ...item,
      id: `cs-${Date.now()}`,
      isPublished: item.isPublished ?? true
    };
    const updated = [newCaseStudy, ...list];
    this.saveCaseStudies(updated);

    this.addActivity({
      type: 'case_study_updated',
      description: `Published new case study: "${item.title}"`,
      timestamp: 'Just now'
    });

    // Background sync to backend API
    api.createCaseStudy(newCaseStudy).catch(() => {});

    return newCaseStudy;
  }

  updateCaseStudy(id: string, updates: Partial<CaseStudyItem>): void {
    const list = this.getCaseStudies();
    const updated = list.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    this.saveCaseStudies(updated);

    this.addActivity({
      type: 'case_study_updated',
      description: `Updated case study "${updates.title || id}"`,
      timestamp: 'Just now'
    });

    // Background sync to backend API
    api.updateCaseStudy(id, updates).catch(() => {});
  }

  deleteCaseStudy(id: string): void {
    const list = this.getCaseStudies();
    const updated = list.filter(item => item.id !== id);
    this.saveCaseStudies(updated);

    // Background sync to backend API
    api.deleteCaseStudy(id).catch(() => {});
  }

  // --- Website Settings ---
  getSettings(): WebsiteSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  saveSettings(settings: WebsiteSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      this.addActivity({
        type: 'settings_changed',
        description: 'Website content & contact settings updated',
        timestamp: 'Just now'
      });

      // Background sync to backend API
      api.updateSettings(settings).catch(() => {});
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }

  // --- Activities ---
  getActivities(): AdminActivity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (!data) {
        this.saveActivities(DEFAULT_ACTIVITIES);
        return DEFAULT_ACTIVITIES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  }

  private saveActivities(activities: AdminActivity[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities.slice(0, 30)));
    } catch (e) {
      console.error('Failed to save activities', e);
    }
  }

  addActivity(activity: Omit<AdminActivity, 'id'>): void {
    const list = this.getActivities();
    const newAct: AdminActivity = {
      ...activity,
      id: `act-${Date.now()}`
    };
    this.saveActivities([newAct, ...list]);
  }

  // --- Authentication ---
  async login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: AdminUser }> {
    const normalizedEmail = email.trim().toLowerCase();
    
    // First try backend API authentication
    try {
      const apiRes = await api.login(normalizedEmail, password);
      if (apiRes.success && apiRes.user) {
        const user: AdminUser = {
          email: apiRes.user.email || normalizedEmail,
          name: apiRes.user.name || 'DeepliX Admin',
          role: (apiRes.user.role as any) || 'Super Admin',
          token: apiRes.token || `jwt_deeplix_token_${Date.now()}`
        };
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
        return { success: true, user };
      }
    } catch {
      // Continue to local verification fallback
    }

    // Direct verified admin credentials
    if (
      (normalizedEmail === 'admin@deeplix.com' || normalizedEmail === 'team@deeplix.com' || normalizedEmail === 'rajvalmani@gmail.com') && 
      (password === 'admin123' || password === 'deeplix2026' || password === 'admin')
    ) {
      const user: AdminUser = {
        email: normalizedEmail,
        name: normalizedEmail === 'rajvalmani@gmail.com' ? 'Admin Team' : 'DeepliX Lead',
        role: 'Super Admin',
        token: `jwt_deeplix_token_${Date.now()}`
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      return { success: true, user };
    }

    // Check if custom password saved in settings
    const storedAuth = localStorage.getItem('deeplix_admin_custom_creds');
    if (storedAuth) {
      try {
        const creds = JSON.parse(storedAuth);
        if (creds.email.toLowerCase() === normalizedEmail && creds.password === password) {
          const user: AdminUser = {
            email: normalizedEmail,
            name: creds.name || 'DeepliX Admin',
            role: 'Super Admin',
            token: `jwt_deeplix_token_${Date.now()}`
          };
          localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
          return { success: true, user };
        }
      } catch (e) {
        console.error(e);
      }
    }

    return { 
      success: false, 
      message: 'Invalid email or password. Please verify your credentials and try again.' 
    };
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  getAdminUser(): AdminUser | null {
    try {
      const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (!auth) return null;
      return JSON.parse(auth);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getAdminUser() !== null;
  }

  changePassword(oldPass: string, newPass: string): { success: boolean; message: string } {
    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }
    const currentUser = this.getAdminUser();
    if (!currentUser) {
      return { success: false, message: 'You must be logged in.' };
    }
    localStorage.setItem('deeplix_admin_custom_creds', JSON.stringify({
      email: currentUser.email,
      password: newPass,
      name: currentUser.name
    }));

    // Background sync to backend API
    api.changePassword(oldPass, newPass).catch(() => {});

    return { success: true, message: 'Password updated successfully!' };
  }

  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(STORAGE_KEYS.CASE_STUDIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    this.saveInquiries(DEFAULT_INQUIRIES);
    this.saveClients(DEFAULT_CLIENTS);
    this.saveCaseStudies(DEFAULT_CASE_STUDIES);
    this.saveSettings(DEFAULT_SETTINGS);
    this.saveActivities(DEFAULT_ACTIVITIES);

    // Background sync to backend API
    api.resetAll().catch(() => {});
  }
}

export const adminStore = new AdminStore();
