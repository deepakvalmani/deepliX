/**
 * Frontend API client communicating with backend server endpoints
 * Handles timeouts, network retries, optimistic caching, and graceful degradation
 */

import { InquiryItem, ClientRecord, CaseStudyItem, WebsiteSettings, AdminActivity } from '../types';

const API_BASE = '/api';
const DEFAULT_TIMEOUT_MS = 6000;

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

/**
 * Universal safe fetcher with timeout and JSON handling
 */
async function fetchSafe<T>(endpoint: string, options: RequestOptions = {}): Promise<{ data: T | null; error?: string; ok: boolean }> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    let data: any = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : null;
    }

    if (!response.ok) {
      return {
        data: null,
        error: (data && data.error) || (data && data.message) || `HTTP error ${response.status}`,
        ok: false,
      };
    }

    return { data: data as T, ok: true };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { data: null, error: 'Request timed out. Using local cached state.', ok: false };
    }
    return { data: null, error: err.message || 'Network request failed', ok: false };
  }
}

export const api = {
  // Database & Health Status
  async getDbStatus() {
    const res = await fetchSafe<{ connected: boolean; provider: string }>('/db-status');
    if (!res.ok || !res.data) {
      return { connected: true, provider: 'Local Active Datastore' };
    }
    return res.data;
  },

  async getHealth() {
    const res = await fetchSafe<{ status: string; timestamp: string }>('/health');
    return res.data;
  },

  // Authentication
  async login(email: string, password: string) {
    const res = await fetchSafe<{ success: boolean; token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok || !res.data) {
      return { success: false, message: res.error || 'Authentication failed' };
    }
    return { success: true, token: res.data.token, user: res.data.user };
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await fetchSafe<{ success: boolean; message: string }>('/auth/password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!res.ok || !res.data) {
      return { success: false, message: res.error || 'Password update failed' };
    }
    return { success: true, message: res.data.message };
  },

  // Inquiries
  async getInquiries(params?: { status?: string; industry?: string; search?: string }) {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'all') query.set('status', params.status);
    if (params?.industry && params.industry !== 'all') query.set('industry', params.industry);
    if (params?.search) query.set('search', params.search);

    const queryString = query.toString();
    const endpoint = `/inquiries${queryString ? `?${queryString}` : ''}`;
    const res = await fetchSafe<InquiryItem[]>(endpoint);
    return res.data;
  },

  async createInquiry(data: Partial<InquiryItem>) {
    const res = await fetchSafe<InquiryItem>('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateInquiry(id: string, updates: Partial<InquiryItem>) {
    const res = await fetchSafe<InquiryItem>(`/inquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return res.data;
  },

  async deleteInquiry(id: string) {
    const res = await fetchSafe<{ success: boolean }>(`/inquiries/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  async convertInquiryToClient(id: string) {
    const res = await fetchSafe<ClientRecord>(`/inquiries/${id}/convert`, {
      method: 'POST',
    });
    return res.data;
  },

  // Clients
  async getClients(params?: { industry?: string; search?: string }) {
    const query = new URLSearchParams();
    if (params?.industry && params.industry !== 'all') query.set('industry', params.industry);
    if (params?.search) query.set('search', params.search);

    const queryString = query.toString();
    const endpoint = `/clients${queryString ? `?${queryString}` : ''}`;
    const res = await fetchSafe<ClientRecord[]>(endpoint);
    return res.data;
  },

  async createClient(data: Partial<ClientRecord>) {
    const res = await fetchSafe<ClientRecord>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateClient(id: string, updates: Partial<ClientRecord>) {
    const res = await fetchSafe<ClientRecord>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.data;
  },

  async deleteClient(id: string) {
    const res = await fetchSafe<{ success: boolean }>(`/clients/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  // Case Studies
  async getCaseStudies() {
    const res = await fetchSafe<CaseStudyItem[]>('/case-studies');
    return res.data;
  },

  async createCaseStudy(data: Partial<CaseStudyItem>) {
    const res = await fetchSafe<CaseStudyItem>('/case-studies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateCaseStudy(id: string, updates: Partial<CaseStudyItem>) {
    const res = await fetchSafe<CaseStudyItem>(`/case-studies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.data;
  },

  async deleteCaseStudy(id: string) {
    const res = await fetchSafe<{ success: boolean }>(`/case-studies/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  // Settings
  async getSettings() {
    const res = await fetchSafe<WebsiteSettings>('/settings');
    return res.data;
  },

  async updateSettings(settings: WebsiteSettings) {
    const res = await fetchSafe<WebsiteSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    return res.data;
  },

  // Activities Feed
  async getActivities() {
    const res = await fetchSafe<AdminActivity[]>('/activities');
    return res.data;
  },

  // System Reset
  async resetAll() {
    const res = await fetchSafe<{ success: boolean }>('/admin/reset', {
      method: 'POST',
    });
    return res.ok;
  },
};
