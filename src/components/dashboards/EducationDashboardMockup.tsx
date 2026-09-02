import React from 'react';
import { 
  GraduationCap, 
  CalendarCheck, 
  CreditCard, 
  Award, 
  Users, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const EducationDashboardMockup: React.FC<{ isMini?: boolean }> = ({ isMini = false }) => {
  if (isMini) {
    return (
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-xs text-xs font-sans">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            DeepliX Education System
          </div>
          <span className="text-[10px] text-[#16A34A] bg-emerald-50 px-1.5 py-0.5 rounded font-medium">Term 2</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-[#F8FAFC] p-2 rounded border border-[#E5E7EB]/60">
            <span className="text-[#64748B] block text-[10px]">Today's Attendance</span>
            <span className="font-bold text-[#0F172A]">96.8% Overall</span>
          </div>
          <div className="bg-[#F8FAFC] p-2 rounded border border-[#E5E7EB]/60">
            <span className="text-[#64748B] block text-[10px]">Fee Collection</span>
            <span className="font-bold text-[#0F172A]">92% Received</span>
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
            <span className="font-bold text-[#0F172A] text-xs sm:text-sm">DeepliX Education System</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">Academic Portal 2026-27</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#64748B]">
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-md px-2.5 py-1 text-xs">
            <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Search student ID, class, parent...</span>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
            City Grammar Campus
          </span>
        </div>
      </div>

      {/* Main App Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3 bg-[#FAFAFA] border-r border-[#E5E7EB] p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1">School Administration</div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-50 text-emerald-800 font-medium rounded-md text-xs">
            <Users className="w-4 h-4" />
            <span>Student Management</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <CalendarCheck className="w-4 h-4" />
            <span>Attendance & Leaves</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <CreditCard className="w-4 h-4" />
            <span>Fees & Receipts</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <Award className="w-4 h-4" />
            <span>Exams & Results</span>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
            <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1">Communications</div>
            <div className="px-2 py-1 text-xs text-[#475569] flex items-center justify-between">
              <span>Parent SMS Alerts</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sent 08:30 AM
              </span>
            </div>
            <div className="px-2 py-1 text-xs text-[#475569] flex items-center justify-between">
              <span>Staff Logged-In</span>
              <span className="font-semibold text-[#0F172A]">48 Teachers</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-9 p-4 sm:p-5 space-y-4 bg-white">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Enrolled Students</span>
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">1,240 Total</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Across 42 Classrooms</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Attendance Today</span>
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">96.4%</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">1,195 Present / 45 Absent</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Fee Collection</span>
                <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">PKR 4,200,000</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">94.2% collected for Term 2</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Results Published</span>
                <Award className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">Mid-Terms Ready</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Automated Report Cards</div>
            </div>
          </div>

          {/* Classroom Breakdown & Fee Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Class Attendance Summary */}
            <div className="lg:col-span-7 border border-[#E5E7EB] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-semibold text-xs text-[#0F172A]">Grade Attendance Summary</h4>
                <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer font-medium">Export Register</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-[#64748B] border-b border-[#E5E7EB] pb-1">
                      <th className="pb-1.5 font-medium">Grade / Section</th>
                      <th className="pb-1.5 font-medium">Teacher</th>
                      <th className="pb-1.5 font-medium">Present</th>
                      <th className="pb-1.5 font-medium text-right">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    <tr>
                      <td className="py-2 font-medium text-[#0F172A]">Grade 10 - Section A</td>
                      <td className="py-2 text-[#475569]">Mr. Farhan</td>
                      <td className="py-2 text-[#475569]">34 / 35</td>
                      <td className="py-2 text-right font-semibold text-emerald-600">97.1%</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-[#0F172A]">Grade 10 - Section B</td>
                      <td className="py-2 text-[#475569]">Ms. Ayesha</td>
                      <td className="py-2 text-[#475569]">32 / 34</td>
                      <td className="py-2 text-right font-semibold text-emerald-600">94.1%</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-[#0F172A]">Grade 11 - Science</td>
                      <td className="py-2 text-[#475569]">Dr. Kamran</td>
                      <td className="py-2 text-[#475569]">38 / 38</td>
                      <td className="py-2 text-right font-semibold text-emerald-600">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fee Collection Status */}
            <div className="lg:col-span-5 border border-[#E5E7EB] rounded-lg p-3 bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-xs text-[#0F172A]">Fee Collection Progress</h4>
                <span className="text-[10px] text-[#64748B]">Term 2</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div>
                  <div className="flex justify-between text-[#475569] mb-1">
                    <span>Tuition Fees</span>
                    <span className="font-medium text-[#0F172A]">94.2% Paid</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#475569] mb-1">
                    <span>Transport / Lab Fees</span>
                    <span className="font-medium text-[#0F172A]">88.0% Paid</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Automatic parent receipts enabled
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
