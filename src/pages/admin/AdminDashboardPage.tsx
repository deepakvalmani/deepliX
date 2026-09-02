import React, { useState, useEffect } from 'react';
import { PageRoute, InquiryItem, AdminActivity, ClientRecord } from '../../types';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminStore } from '../../lib/adminStore';
import { api } from '../../lib/api';
import { 
  Inbox, 
  MessageSquare, 
  Stethoscope, 
  GraduationCap, 
  Building2, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle,
  FileText,
  Filter,
  Eye,
  TrendingUp,
  Sparkles,
  Database,
  Server,
  Code
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; provider: string }>({
    connected: true,
    provider: 'Operational Datastore & REST API'
  });

  useEffect(() => {
    if (!adminStore.isAuthenticated()) {
      onNavigate('/admin/login');
      return;
    }
    loadData();
    api.getDbStatus().then(status => {
      if (status) setDbStatus(status);
    });
  }, [onNavigate]);

  const loadData = () => {
    setInquiries(adminStore.getInquiries());
    setClients(adminStore.getClients());
    setActivities(adminStore.getActivities());
  };

  // Stats calculation
  const consultationCount = inquiries.filter(i => i.type === 'consultation').length;
  const contactMessagesCount = inquiries.filter(i => i.type === 'contact').length;
  const newRequestsCount = inquiries.filter(i => i.status === 'new').length;

  const clinicsCount = inquiries.filter(i => i.industry === 'Clinics').length;
  const schoolsCount = inquiries.filter(i => i.industry === 'Schools').length;
  const businessesCount = inquiries.filter(i => i.industry === 'Businesses').length;
  const totalInquiries = inquiries.length || 1;

  const handleStatusChange = (id: string, newStatus: any) => {
    adminStore.updateInquiryStatus(id, newStatus);
    loadData();
  };

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <AdminLayout
      currentRoute="/admin/dashboard"
      onNavigate={onNavigate}
      title="Operations Overview"
      subtitle="Real-time summary of leads, consultation requests, and team activities."
    >
      <div className="space-y-6">
        {/* Top KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New Consultation Requests */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                New Consultations
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {consultationCount}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span>{newRequestsCount} awaiting review</span>
              </div>
            </div>
          </div>

          {/* Contact Messages */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Contact Messages
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {contactMessagesCount}
              </div>
              <div className="text-xs text-[#64748B] mt-1">
                Direct inquiry forms
              </div>
            </div>
          </div>

          {/* Active Clients */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Client Records
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {clients.length}
              </div>
              <div className="text-xs text-[#64748B] mt-1">
                Active business accounts
              </div>
            </div>
          </div>

          {/* Overall Inquiries */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Total Inquiries
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#475569] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {inquiries.length}
              </div>
              <div className="text-xs text-emerald-600 font-medium mt-1">
                100% captured in portal
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Industries Breakdown + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Industries Interested */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#0F172A]">
                  Industries Interested
                </h3>
                <p className="text-xs text-[#64748B]">
                  Distribution of leads and client inquiries
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-[#475569]">
                {inquiries.length} Total
              </span>
            </div>

            <div className="space-y-4">
              {/* Clinics */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A]">
                    <Stethoscope className="w-4 h-4 text-[#2563EB]" />
                    <span>Clinics & Healthcare</span>
                  </div>
                  <div className="text-sm font-bold text-[#0F172A]">
                    {clinicsCount}{' '}
                    <span className="text-xs font-normal text-[#64748B]">
                      ({Math.round((clinicsCount / totalInquiries) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#2563EB] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(clinicsCount / totalInquiries) * 100}%` }}
                  />
                </div>
              </div>

              {/* Schools */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A]">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>Schools & Education</span>
                  </div>
                  <div className="text-sm font-bold text-[#0F172A]">
                    {schoolsCount}{' '}
                    <span className="text-xs font-normal text-[#64748B]">
                      ({Math.round((schoolsCount / totalInquiries) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(schoolsCount / totalInquiries) * 100}%` }}
                  />
                </div>
              </div>

              {/* Businesses */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A]">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    <span>Growing Businesses & Wholesale</span>
                  </div>
                  <div className="text-sm font-bold text-[#0F172A]">
                    {businessesCount}{' '}
                    <span className="text-xs font-normal text-[#64748B]">
                      ({Math.round((businessesCount / totalInquiries) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(businessesCount / totalInquiries) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#64748B]">
              <span>Target markets active</span>
              <button 
                onClick={() => onNavigate('/admin/inquiries')}
                className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Filter by industry</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#0F172A]">
                  Recent Activity
                </h3>
                <p className="text-xs text-[#64748B]">
                  Latest team actions and form arrivals
                </p>
              </div>
              <Clock className="w-4 h-4 text-[#94A3B8]" />
            </div>

            <div className="space-y-3">
              {activities.slice(0, 5).map(act => (
                <div key={act.id} className="flex items-start gap-3 text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-[#0F172A] font-medium leading-snug">
                      {act.description}
                    </p>
                    <span className="text-[11px] text-[#94A3B8]">
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <span className="text-[#64748B]">System log running</span>
              <button
                onClick={() => onNavigate('/admin/inquiries')}
                className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Open full inquiries queue</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Recent Inquiries Table & Quick Actions */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Recent Inquiries & Leads
              </h3>
              <p className="text-xs text-[#64748B]">
                Immediate submissions needing team follow-up
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('/admin/inquiries')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-md hover:bg-[#1D4ED8] transition-colors"
              >
                <span>View All Inquiries ({inquiries.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3">Lead / Organization</th>
                  <th className="px-5 py-3">Industry</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#334155]">
                {recentInquiries.map(inq => {
                  const statusColors = {
                    new: 'bg-blue-50 text-blue-700 border-blue-200',
                    contacted: 'bg-amber-50 text-amber-700 border-amber-200',
                    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    rejected: 'bg-slate-100 text-slate-700 border-slate-200'
                  };

                  return (
                    <tr key={inq.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[#0F172A]">
                        <div>{inq.name}</div>
                        <div className="text-[11px] text-[#64748B]">{inq.company || 'Private Inquiry'}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-[#334155]">
                          {inq.industry}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#64748B]">
                        <div>{inq.email}</div>
                        <div className="text-[11px]">{inq.phone}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="capitalize text-[11px] text-[#475569] font-medium">
                          {inq.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded border ${statusColors[inq.status]} focus:outline-hidden cursor-pointer`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => onNavigate('/admin/inquiries')}
                          className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline font-medium"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
