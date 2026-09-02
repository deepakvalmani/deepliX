import React, { useState, useEffect } from 'react';
import { PageRoute, ClientRecord } from '../../types';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminStore } from '../../lib/adminStore';
import { 
  Users, 
  Search, 
  Plus, 
  Building2, 
  Mail, 
  Phone, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X,
  FileText,
  UserCheck
} from 'lucide-react';

interface AdminClientsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminClientsPage: React.FC<AdminClientsPageProps> = ({ onNavigate }) => {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    industry: 'Clinics' as 'Clinics' | 'Schools' | 'Businesses' | 'Other',
    email: '',
    phone: '',
    notes: '',
    status: 'Active' as 'Active' | 'Onboarding' | 'Lead' | 'Completed'
  });

  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!adminStore.isAuthenticated()) {
      onNavigate('/admin/login');
      return;
    }
    loadClients();
  }, [onNavigate]);

  const loadClients = () => {
    setClients(adminStore.getClients());
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAddModal = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      industry: 'Clinics',
      email: '',
      phone: '',
      notes: '',
      status: 'Onboarding'
    });
    setEditingClient(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (client: ClientRecord) => {
    setEditingClient(client);
    setFormData({
      companyName: client.companyName,
      contactPerson: client.contactPerson,
      industry: client.industry,
      email: client.email,
      phone: client.phone,
      notes: client.notes,
      status: client.status
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      alert('Please provide company name, contact person, and email.');
      return;
    }

    if (editingClient) {
      adminStore.updateClient(editingClient.id, formData);
      showToast(`Updated record for ${formData.companyName}`);
    } else {
      adminStore.addClient(formData);
      showToast(`Added client record for ${formData.companyName}`);
    }

    setIsAddModalOpen(false);
    loadClients();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete client record "${name}"?`)) {
      adminStore.deleteClient(id);
      loadClients();
      showToast(`Removed client ${name}`);
    }
  };

  const filteredClients = clients.filter(c => {
    if (industryFilter !== 'all' && c.industry !== industryFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        c.companyName.toLowerCase().includes(term) ||
        c.contactPerson.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.notes.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <AdminLayout
      currentRoute="/admin/clients"
      onNavigate={onNavigate}
      title="Client Records"
      subtitle="Basic directory of active organizations, operational notes, and key contacts."
    >
      <div className="space-y-4">
        {/* Toast */}
        {toast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toast}</span>
            </div>
            <button onClick={() => setToast('')} className="text-emerald-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Header */}
        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search by company, person, email, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-md text-xs font-medium text-[#334155] focus:outline-hidden"
            >
              <option value="all">All Industries</option>
              <option value="Clinics">Clinics</option>
              <option value="Schools">Schools</option>
              <option value="Businesses">Businesses</option>
            </select>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client Record</span>
          </button>
        </div>

        {/* Client Records Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
          {filteredClients.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Users className="w-10 h-10 mx-auto text-[#94A3B8]" />
              <h4 className="text-sm font-bold text-[#0F172A]">No Client Records Found</h4>
              <p className="text-xs text-[#64748B]">
                Create a new record or convert incoming consultations from the Inquiries page.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Company Name</th>
                    <th className="px-5 py-3.5">Contact Person</th>
                    <th className="px-5 py-3.5">Industry</th>
                    <th className="px-5 py-3.5">Contact Details</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Operational Notes</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-[#334155]">
                  {filteredClients.map(c => {
                    const statusBadge = {
                      Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      Onboarding: 'bg-blue-50 text-blue-700 border-blue-200',
                      Lead: 'bg-amber-50 text-amber-700 border-amber-200',
                      Completed: 'bg-purple-50 text-purple-700 border-purple-200'
                    }[c.status] || 'bg-slate-100 text-slate-700 border-slate-200';

                    return (
                      <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-5 py-4 font-bold text-[#0F172A]">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                            <span>{c.companyName}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-[#0F172A]">
                          {c.contactPerson}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-[#334155]">
                            {c.industry}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[#64748B]">
                          <div>{c.email}</div>
                          <div className="text-[11px]">{c.phone}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusBadge}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 max-w-xs text-[#64748B] truncate" title={c.notes}>
                          {c.notes || '—'}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(c)}
                              className="p-1.5 text-slate-600 hover:text-[#2563EB] hover:bg-blue-50 rounded transition-colors"
                              title="Edit Client"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id, c.companyName)}
                              className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete Client"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Client Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h3 className="text-base font-bold text-[#0F172A]">
                  {editingClient ? 'Edit Client Record' : 'Add Basic Client Record'}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-[#94A3B8] hover:text-[#0F172A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g. Apex Family Care & Pediatrics"
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      placeholder="e.g. Dr. Sarah Jenkins"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value as any }))}
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    >
                      <option value="Clinics">Clinics & Healthcare</option>
                      <option value="Schools">Schools & Education</option>
                      <option value="Businesses">Growing Businesses</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="client@organization.com"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                    Operational Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                  >
                    <option value="Onboarding">Onboarding</option>
                    <option value="Active">Active Client</option>
                    <option value="Lead">Lead Stage</option>
                    <option value="Completed">Project Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                    System Requirements & Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Enter key system details, modules required, or internal notes..."
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-[#E5E7EB] rounded-md text-xs font-semibold text-[#475569] hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs"
                  >
                    {editingClient ? 'Save Changes' : 'Create Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
