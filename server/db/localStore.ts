import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

const FILES = {
  submissions: path.join(DATA_DIR, 'submissions.json'),
  applications: path.join(DATA_DIR, 'applications.json'),
  bookings: path.join(DATA_DIR, 'bookings.json'),
  auditLogs: path.join(DATA_DIR, 'audit_logs.json'),
};

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

Object.values(FILES).forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
});

function readFile(key: keyof typeof FILES): any[] {
  try {
    const raw = fs.readFileSync(FILES[key], 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[LocalStore] Failed to read ${key}:`, err);
    return [];
  }
}

function writeFile(key: keyof typeof FILES, data: any[]): boolean {
  try {
    fs.writeFileSync(FILES[key], JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[LocalStore] Failed to write ${key}:`, err);
    return false;
  }
}

export const localStore = {
  // Submissions
  getSubmissions(): any[] {
    return readFile('submissions');
  },
  saveSubmission(submission: any): boolean {
    const list = readFile('submissions');
    list.unshift(submission);
    return writeFile('submissions', list);
  },
  deleteSubmission(id: string): boolean {
    const list = readFile('submissions').filter((item) => item.id !== id);
    return writeFile('submissions', list);
  },

  // Applications
  getApplications(): any[] {
    return readFile('applications');
  },
  saveApplication(application: any): boolean {
    const list = readFile('applications');
    list.unshift(application);
    return writeFile('applications', list);
  },
  updateApplicationStatus(id: string, status: string): boolean {
    const list = readFile('applications').map((app) => (app.id === id ? { ...app, status, updatedAt: new Date().toISOString() } : app));
    return writeFile('applications', list);
  },
  deleteApplication(id: string): boolean {
    const list = readFile('applications').filter((app) => app.id !== id);
    return writeFile('applications', list);
  },

  // Bookings
  getBookings(): any[] {
    return readFile('bookings');
  },
  saveBooking(booking: any): boolean {
    const list = readFile('bookings');
    list.unshift(booking);
    return writeFile('bookings', list);
  },
  updateBookingStatus(id: string, status: string): boolean {
    const list = readFile('bookings').map((b) => (b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b));
    return writeFile('bookings', list);
  },
  deleteBooking(id: string): boolean {
    const list = readFile('bookings').filter((b) => b.id !== id);
    return writeFile('bookings', list);
  },

  // Audit Logs
  logEvent(type: string, payload: any): void {
    const logs = readFile('auditLogs');
    logs.unshift({
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      payload,
      timestamp: new Date().toISOString(),
    });
    // Keep max 500 logs
    writeFile('auditLogs', logs.slice(0, 500));
  },
  getAuditLogs(): any[] {
    return readFile('auditLogs');
  },
};
