import React, { useState, useEffect } from 'react';
import { PageRoute, WebsiteSettings } from '../../types';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminStore } from '../../lib/adminStore';
import { api } from '../../lib/api';
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  ExternalLink,
  Database,
  Server,
  Code,
  Copy,
  Check
} from 'lucide-react';

interface AdminSettingsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(adminStore.getSettings());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Security password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!adminStore.isAuthenticated()) {
      onNavigate('/admin/login');
      return;
    }
    setSettings(adminStore.getSettings());
  }, [onNavigate]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.saveSettings(settings);
    showToast('Website content and contact information saved successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    const res = adminStore.changePassword(currentPassword, newPassword);
    if (res.success) {
      showToast(res.message, 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all consultations, inquiries, and settings back to initial sample defaults?')) {
      adminStore.resetAllData();
      setSettings(adminStore.getSettings());
      showToast('All records and settings reset to initial defaults.');
    }
  };

  return (
    <AdminLayout
      currentRoute="/admin/settings"
      onNavigate={onNavigate}
      title="Website & Admin Settings"
      subtitle="Manage public website content, contact parameters, and administrative preferences."
    >
      <div className="space-y-6">
        {/* Toast */}
        {toast && (
          <div className={`p-3.5 border rounded-lg text-xs font-semibold flex items-center justify-between shadow-xs ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}>✕</button>
          </div>
        )}

        {/* Website Content Form */}
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Section 1: Hero & Branding Text */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-base font-bold text-[#0F172A]">
                  Homepage Content & Copy
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-xs text-[#2563EB] hover:underline flex items-center gap-1 font-medium"
              >
                <span>View Live Homepage</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                  Announcement Badge Text
                </label>
                <input
                  type="text"
                  value={settings.announcementBadge}
                  onChange={(e) => setSettings(prev => ({ ...prev, announcementBadge: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Industry Descriptions */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#0F172A]">
                Target Industry Summaries
              </h3>
              <p className="text-xs text-[#64748B]">
                Subtitles displayed across the industry modules on the homepage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                  Clinics & Healthcare
                </label>
                <textarea
                  rows={2}
                  value={settings.clinicDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, clinicDescription: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                  Schools & Education
                </label>
                <textarea
                  rows={2}
                  value={settings.schoolDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, schoolDescription: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                  Growing Businesses
                </label>
                <textarea
                  rows={2}
                  value={settings.businessDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, businessDescription: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Business Information */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#0F172A]">
                Company Contact & Operations Parameters
              </h3>
              <p className="text-xs text-[#64748B]">
                Shown in the contact page, footer, and consultation confirmations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Public Inquiries Email</span>
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Operations Phone Line</span>
                </label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Office Hours & Availability</span>
                </label>
                <input
                  type="text"
                  value={settings.officeHours}
                  onChange={(e) => setSettings(prev => ({ ...prev, officeHours: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Turnaround Commitment</span>
                </label>
                <input
                  type="text"
                  value={settings.turnaroundCommitment}
                  onChange={(e) => setSettings(prev => ({ ...prev, turnaroundCommitment: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Physical Address / Headquarters</span>
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save All Website Settings</span>
              </button>
            </div>
          </div>
        </form>

        {/* Section 4: Security & Password Management */}
        <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-base font-bold text-[#0F172A]">
                Admin Account & Security
              </h3>
            </div>
            <p className="text-xs text-[#64748B]">
              Update your administrative portal password securely.
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="max-w-md space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                New Password (Min 6 characters)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-semibold transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Section 5: Data Reset / Maintenance */}
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-red-900">
              Reset Sample Demo Data
            </h4>
            <p className="text-xs text-[#64748B] max-w-lg">
              Restore initial pre-seeded sample data (12 consultation requests, 25 inquiries, client records, and default case studies).
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 rounded-md text-xs font-semibold transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Store</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
