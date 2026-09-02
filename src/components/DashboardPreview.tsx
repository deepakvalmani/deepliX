import React, { useState } from 'react';
import { BusinessDashboardMockup } from './dashboards/BusinessDashboardMockup';
import { ClinicDashboardMockup } from './dashboards/ClinicDashboardMockup';
import { EducationDashboardMockup } from './dashboards/EducationDashboardMockup';
import { Building2, Stethoscope, GraduationCap } from 'lucide-react';

interface DashboardPreviewProps {
  initialTab?: 'business' | 'clinic' | 'education';
  showTabs?: boolean;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ 
  initialTab = 'business', 
  showTabs = true 
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'clinic' | 'education'>(initialTab);

  return (
    <div className="w-full">
      {showTabs && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('business')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
              activeTab === 'business'
                ? 'bg-white text-[#2563EB] border-[#2563EB]/40 shadow-xs ring-2 ring-[#2563EB]/10'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E5E7EB] hover:bg-white hover:text-[#0F172A]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Business Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
              activeTab === 'clinic'
                ? 'bg-white text-[#0284C7] border-[#0284C7]/40 shadow-xs ring-2 ring-[#0284C7]/10'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E5E7EB] hover:bg-white hover:text-[#0F172A]'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Clinic Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
              activeTab === 'education'
                ? 'bg-white text-emerald-700 border-emerald-500/40 shadow-xs ring-2 ring-emerald-500/10'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E5E7EB] hover:bg-white hover:text-[#0F172A]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education Dashboard</span>
          </button>
        </div>
      )}

      {/* Laptop / Product Frame */}
      <div className="relative mx-auto rounded-xl border border-[#CBD5E1] bg-[#0F172A]/5 p-2 sm:p-3 shadow-md">
        {/* Subtle camera notch / top bezel */}
        <div className="flex justify-center pb-1.5 pt-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]/40 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#475569]"></div>
          </div>
        </div>

        {/* Dashboard Display Area */}
        <div className="bg-white rounded-lg overflow-hidden border border-[#E2E8F0]">
          {activeTab === 'business' && <BusinessDashboardMockup />}
          {activeTab === 'clinic' && <ClinicDashboardMockup />}
          {activeTab === 'education' && <EducationDashboardMockup />}
        </div>
      </div>
    </div>
  );
};
