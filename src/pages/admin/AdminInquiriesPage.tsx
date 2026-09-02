import React, { useState, useEffect } from 'react';
import { PageRoute, InquiryItem, InquiryStatus, InquiryType } from '../../types';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminStore } from '../../lib/adminStore';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Trash2, 
  UserPlus, 
  ExternalLink,
  MessageSquare,
  FileText,
  X,
  Send,
  Plus,
  Inbox
} from 'lucide-react';

interface AdminInquiriesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminInquiriesPage: React.FC<AdminInquiriesPageProps> = ({ onNavigate }) => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  
  // Filters & search
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | InquiryType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [showArchived, setShowArchived] = useState(false);

  // Note editor in modal
  const [activeNotes, setActiveNotes] = useState('');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    if (!adminStore.isAuthenticated()) {
      onNavigate('/admin/login');
      return;
    }
    loadInquiries();
  }, [onNavigate]);

  const loadInquiries = () => {
    const list = adminStore.getInquiries();
    setInquiries(list);
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSelectInquiry = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setActiveNotes(inq.notes || '');
    if (!inq.isRead) {
      adminStore.markInquiryRead(inq.id);
      loadInquiries();
    }
  };

  const handleStatusChange = (id: string, status: InquiryStatus) => {
    adminStore.updateInquiryStatus(id, status);
    loadInquiries();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status } : null);
    }
    showToast(`Status updated to ${status.toUpperCase()}`);
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    adminStore.updateInquiryNotes(selectedInquiry.id, activeNotes);
    loadInquiries();
    setSelectedInquiry(prev => prev ? { ...prev, notes: activeNotes } : null);
    showToast('Internal notes saved');
  };

  const handleConvertToClient = (inq: InquiryItem) => {
    const client = adminStore.convertInquiryToClient(inq.id);
    loadInquiries();
    if (selectedInquiry && selectedInquiry.id === inq.id) {
      setSelectedInquiry(prev => prev ? { ...prev, status: 'completed' } : null);
    }
    showToast(`Client record created for "${client?.companyName}"!`);
  };

  const handleToggleArchive = (id: string) => {
    adminStore.toggleArchiveInquiry(id);
    loadInquiries();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
    showToast('Inquiry archive state updated');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this inquiry?')) {
      adminStore.deleteInquiry(id);
      loadInquiries();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      showToast('Inquiry removed');
    }
  };

  // Add dummy test consultation to simulate live customer requests
  const handleAddTestConsultation = () => {
    const industries = ['Clinics', 'Schools', 'Businesses'] as const;
    const pickedIndustry = industries[Math.floor(Math.random() * industries.length)];
    adminStore.addInquiry({
      type: 'consultation',
      name: 'Dr. Test Provider',
      company: `${pickedIndustry.slice(0, -1)} Operations Group`,
      industry: pickedIndustry,
      email: 'operations@example.com',
      phone: '+1 (555) 998-1002',
      message: `We need assistance organizing our daily ${pickedIndustry.toLowerCase()} operations and staff schedule records.`
    });
    loadInquiries();
    showToast('New test consultation inquiry added');
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter(item => {
    if (!showArchived && item.isArchived) return false;
    if (showArchived && !item.isArchived) return false;

    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (industryFilter !== 'all' && item.industry !== industryFilter) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(term);
      const matchCompany = (item.company || '').toLowerCase().includes(term);
      const matchEmail = item.email.toLowerCase().includes(term);
      const matchMessage = item.message.toLowerCase().includes(term);
      if (!matchName && !matchCompany && !matchEmail && !matchMessage) return false;
    }

    return true;
  });

  const statusBadgeStyle = {
    new: 'bg-blue-50 text-[#2563EB] border-blue-200',
    contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return (
    <AdminLayout
      currentRoute="/admin/inquiries"
      onNavigate={onNavigate}
      title="Consultations & Inquiries"
      subtitle="Manage all incoming consultation requests, contact messages, and lead workflows."
    >
      <div className="space-y-4">
        {/* Toast */}
        {successToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast('')} className="text-emerald-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Header & Filtering Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search by name, company, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            {/* Quick Test button & Archive toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors flex items-center gap-1.5 ${
                  showArchived
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-[#475569] border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                <Archive className="w-3.5 h-3.5" />
                <span>{showArchived ? 'Showing Archived' : 'View Archive'}</span>
              </button>

              <button
                onClick={handleAddTestConsultation}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-semibold rounded-md hover:bg-blue-100 transition-colors"
                title="Simulate a new incoming consultation"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simulate Lead</span>
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F1F5F9] text-xs">
            <span className="font-semibold text-[#64748B] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>

            {/* Type selector */}
            <div className="flex rounded-md border border-[#E5E7EB] overflow-hidden bg-white">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-2.5 py-1 font-medium transition-colors ${
                  typeFilter === 'all' ? 'bg-[#2563EB] text-white' : 'text-[#475569] hover:bg-slate-50'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setTypeFilter('consultation')}
                className={`px-2.5 py-1 font-medium transition-colors border-l border-[#E5E7EB] ${
                  typeFilter === 'consultation' ? 'bg-[#2563EB] text-white' : 'text-[#475569] hover:bg-slate-50'
                }`}
              >
                Consultations
              </button>
              <button
                onClick={() => setTypeFilter('contact')}
                className={`px-2.5 py-1 font-medium transition-colors border-l border-[#E5E7EB] ${
                  typeFilter === 'contact' ? 'bg-[#2563EB] text-white' : 'text-[#475569] hover:bg-slate-50'
                }`}
              >
                Messages
              </button>
            </div>

            {/* Status Selector */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-md font-medium text-[#334155] focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="new">Status: New</option>
              <option value="contacted">Status: Contacted</option>
              <option value="completed">Status: Completed</option>
              <option value="rejected">Status: Rejected</option>
            </select>

            {/* Industry Selector */}
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-md font-medium text-[#334155] focus:outline-hidden"
            >
              <option value="all">All Industries</option>
              <option value="Clinics">Clinics & Healthcare</option>
              <option value="Schools">Schools & Education</option>
              <option value="Businesses">Growing Businesses</option>
            </select>

            <span className="ml-auto text-[#94A3B8]">
              Showing {filteredInquiries.length} of {inquiries.length} items
            </span>
          </div>
        </div>

        {/* Main Split Layout: Inquiries Table / List + Detail Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* List Column */}
          <div className={`${selectedInquiry ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden`}>
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-[#64748B]">
                  <Inbox className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A]">No Inquiries Found</h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                  No consultation forms or messages match your selected search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setTypeFilter('all');
                    setStatusFilter('all');
                    setIndustryFilter('all');
                  }}
                  className="text-xs text-[#2563EB] font-semibold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {filteredInquiries.map(inq => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  const dateStr = new Date(inq.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <div
                      key={inq.id}
                      onClick={() => handleSelectInquiry(inq)}
                      className={`p-4 transition-colors cursor-pointer text-xs ${
                        isSelected 
                          ? 'bg-blue-50/50 border-l-4 border-l-[#2563EB]' 
                          : inq.status === 'new'
                          ? 'bg-white hover:bg-[#F8FAFC] font-semibold'
                          : 'bg-white hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-[#0F172A] truncate">
                              {inq.name}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusBadgeStyle[inq.status]}`}>
                              {inq.status}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-[#475569]">
                              {inq.industry}
                            </span>
                            {inq.type === 'consultation' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#2563EB]">
                                Consultation
                              </span>
                            )}
                          </div>

                          <div className="text-[#475569] font-medium flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                            <span>{inq.company || 'Individual / Direct'}</span>
                          </div>

                          <p className="text-[#64748B] line-clamp-2 text-xs font-normal pt-1">
                            {inq.message}
                          </p>
                        </div>

                        {/* Right side metadata */}
                        <div className="text-right space-y-2 shrink-0">
                          <div className="text-[11px] text-[#94A3B8] flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{dateStr}</span>
                          </div>

                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConvertToClient(inq);
                              }}
                              className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                              title="Convert to Client Record"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleArchive(inq.id);
                              }}
                              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                              title={inq.isArchived ? 'Unarchive' : 'Archive'}
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail View Panel */}
          {selectedInquiry && (
            <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-6 space-y-5 sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Inquiry Details
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {selectedInquiry.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] rounded-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E5E7EB] space-y-2">
                <label className="text-[11px] font-bold text-[#334155] uppercase tracking-wider block">
                  Workflow Status
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['new', 'contacted', 'completed', 'rejected'] as InquiryStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`py-1.5 text-xs font-semibold rounded capitalize border transition-all ${
                        selectedInquiry.status === st
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#475569] border-[#E5E7EB] hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information Fields */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
                    <div className="text-[#64748B] text-[11px] font-medium">Organization</div>
                    <div className="font-bold text-[#0F172A] mt-0.5">{selectedInquiry.company || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
                    <div className="text-[#64748B] text-[11px] font-medium">Target Industry</div>
                    <div className="font-bold text-[#0F172A] mt-0.5">{selectedInquiry.industry}</div>
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] space-y-1">
                  <div className="text-[#64748B] text-[11px] font-medium">Email Address</div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0F172A]">{selectedInquiry.email}</span>
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=DeepliX Systems Consultation`}
                      className="text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] space-y-1">
                  <div className="text-[#64748B] text-[11px] font-medium">Phone Number</div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0F172A]">{selectedInquiry.phone || 'Not provided'}</span>
                    {selectedInquiry.phone && (
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-1 pt-1">
                  <label className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
                    Submitted Business Challenge / Message
                  </label>
                  <div className="p-3.5 bg-white rounded-lg border border-[#CBD5E1] text-[#334155] leading-relaxed text-xs">
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Internal Notes Section */}
                <div className="space-y-1 pt-2">
                  <label className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
                    Internal Team Notes
                  </label>
                  <textarea
                    rows={3}
                    value={activeNotes}
                    onChange={(e) => setActiveNotes(e.target.value)}
                    placeholder="Add team notes on follow-ups, requirements, or proposed systems..."
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleSaveNotes}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-900 transition-colors"
                    >
                      Save Internal Note
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleConvertToClient(selectedInquiry)}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Convert to Client</span>
                </button>

                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md border border-red-200 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
