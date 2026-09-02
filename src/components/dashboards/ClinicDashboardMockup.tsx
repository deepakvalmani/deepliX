import React from 'react';
import { 
  Calendar, 
  Clock, 
  Activity, 
  CheckCircle2, 
  UserCheck, 
  FileText, 
  AlertCircle,
  Search,
  DollarSign
} from 'lucide-react';

export const ClinicDashboardMockup: React.FC<{ isMini?: boolean }> = ({ isMini = false }) => {
  if (isMini) {
    return (
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-xs text-xs font-sans">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span>
            DeepliX Clinic System
          </div>
          <span className="text-[10px] text-[#0284C7] bg-sky-50 px-1.5 py-0.5 rounded font-medium">Active</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-[#F8FAFC] p-2 rounded border border-[#E5E7EB]/60">
            <span className="text-[#64748B] block text-[10px]">Patients Today</span>
            <span className="font-bold text-[#0F172A]">38 Check-ins</span>
          </div>
          <div className="bg-[#F8FAFC] p-2 rounded border border-[#E5E7EB]/60">
            <span className="text-[#64748B] block text-[10px]">Next Consultation</span>
            <span className="font-bold text-[#0F172A]">10:15 AM (Room 2)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden text-xs sm:text-sm font-sans">
      {/* Top Application Bar */}
      <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
          </div>
          <div className="h-4 w-px bg-[#E5E7EB] mx-1"></div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] text-xs sm:text-sm">DeepliX Clinic System</span>
            <span className="text-[10px] bg-sky-100 text-[#0284C7] font-medium px-2 py-0.5 rounded-full">Clinical Suite v2.8</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#64748B]">
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-md px-2.5 py-1 text-xs">
            <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Search patient MRN, name...</span>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200/60 font-medium">
            Dr. Tariq Mahmood (On-Duty)
          </span>
        </div>
      </div>

      {/* Main App Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3 bg-[#FAFAFA] border-r border-[#E5E7EB] p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1">Clinic Modules</div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-sky-50 text-[#0284C7] font-medium rounded-md text-xs">
            <UserCheck className="w-4 h-4" />
            <span>Patients & Intake</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Appointments</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <FileText className="w-4 h-4" />
            <span>Billing & Invoices</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <Activity className="w-4 h-4" />
            <span>Clinical Reports</span>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
            <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1">Shift Overview</div>
            <div className="px-2 py-1 text-xs text-[#475569] flex items-center justify-between">
              <span>Rooms Occupied</span>
              <span className="font-semibold text-[#0F172A]">4 / 6 Rooms</span>
            </div>
            <div className="px-2 py-1 text-xs text-[#475569] flex items-center justify-between">
              <span>Average Wait Time</span>
              <span className="text-emerald-600 font-medium">8.5 mins</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-9 p-4 sm:p-5 space-y-4 bg-white">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Patients Today</span>
                <UserCheck className="w-3.5 h-3.5 text-[#0284C7]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">42 Checked In</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">32 completed, 10 in queue</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Appointments</span>
                <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">56 Scheduled</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">0 no-shows recorded</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Daily Revenue</span>
                <DollarSign className="w-3.5 h-3.5 text-[#0284C7]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">PKR 65,400</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Direct + Insurance claims</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Recent Activity</span>
                <Activity className="w-3.5 h-3.5 text-[#0284C7]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">100% Synced</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Records up to date</div>
            </div>
          </div>

          {/* Clinical Schedule Queue & Recent Records */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Live Queue Table */}
            <div className="lg:col-span-7 border border-[#E5E7EB] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-semibold text-xs text-[#0F172A]">Today's Appointment Queue</h4>
                <span className="text-[11px] text-[#0284C7] hover:underline cursor-pointer font-medium">Manage Schedule</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-[#64748B] border-b border-[#E5E7EB] pb-1">
                      <th className="pb-1.5 font-medium">Time</th>
                      <th className="pb-1.5 font-medium">Patient Name</th>
                      <th className="pb-1.5 font-medium">Reason</th>
                      <th className="pb-1.5 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    <tr>
                      <td className="py-2 font-mono text-[#0F172A]">09:30 AM</td>
                      <td className="py-2 text-[#334155] font-medium">Muhammad Bilal (MRN-4421)</td>
                      <td className="py-2 text-[#64748B]">Routine Follow-up</td>
                      <td className="py-2 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-medium">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-[#0F172A]">10:00 AM</td>
                      <td className="py-2 text-[#334155] font-medium">Fatima Zahra (MRN-4422)</td>
                      <td className="py-2 text-[#64748B]">Prescription Review</td>
                      <td className="py-2 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-50 text-sky-700 font-medium">
                          In Room 2
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-[#0F172A]">10:30 AM</td>
                      <td className="py-2 text-[#334155] font-medium">Hamza Rasheed (MRN-4423)</td>
                      <td className="py-2 text-[#64748B]">Blood Pressure Check</td>
                      <td className="py-2 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-700 font-medium">
                          Waiting (4m)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Billing Log */}
            <div className="lg:col-span-5 border border-[#E5E7EB] rounded-lg p-3 bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-xs text-[#0F172A]">Recent Billing Activity</h4>
                <span className="text-[10px] text-[#64748B]">Instant Receipts</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2 bg-white rounded border border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#0F172A]">Invoice #INV-2041</div>
                    <div className="text-[10px] text-[#64748B]">Muhammad Bilal — General Consultation</div>
                  </div>
                  <span className="font-bold text-[#0F172A]">PKR 3,500 Paid</span>
                </div>
                <div className="p-2 bg-white rounded border border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#0F172A]">Invoice #INV-2040</div>
                    <div className="text-[10px] text-[#64748B]">Diagnostic Lab Panel A</div>
                  </div>
                  <span className="font-bold text-[#0F172A]">PKR 8,500 Paid</span>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Zero pending unfiled records
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
