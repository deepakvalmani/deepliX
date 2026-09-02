import React from 'react';
import { PageRoute } from '../types';
import { ClinicDashboardMockup } from '../components/dashboards/ClinicDashboardMockup';
import { CTASection } from '../components/CTASection';
import { 
  Stethoscope, 
  FileSpreadsheet, 
  Clock, 
  Receipt, 
  BarChart, 
  CheckCircle2, 
  UserCheck, 
  Calendar, 
  FileText, 
  Activity, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

interface ClinicIndustryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ClinicIndustryPage: React.FC<ClinicIndustryPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#0284C7] bg-sky-50 border border-sky-100">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Industry: Clinics & Healthcare</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Digital systems for modern healthcare operations.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Replace paper charts, scheduling confusion, and fragmented billing with a unified clinical management system designed for doctor practices, specialty clinics, and medical centers.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-lg text-sm font-semibold transition-all shadow-xs"
              >
                <span>Book Clinic Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/solutions')}
                className="inline-flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-white text-[#0F172A] border border-[#CBD5E1] px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
              >
                <span>Explore All Solutions</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-2 sm:p-3 bg-[#F1F5F9] rounded-2xl border border-[#CBD5E1] shadow-md">
              <ClinicDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-2">Common Operational Bottlenecks</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              The Challenges Facing Growing Clinics
            </h2>
            <p className="text-[#475569] text-sm sm:text-base mt-2">
              When clinic operations rely on manual entries, patient experience and revenue collection suffer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Manual Patient Records</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Physical paper folders and unsynced files cause delays, lost medical histories, and misplaced lab reports.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Appointment Confusion</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Double-booked consultations, missed doctor schedules, and long waiting room queues frustrate patients.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Billing Issues</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Unbilled consultations, lost diagnostic items, and manual receipts lead to persistent cash leaks.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <BarChart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Poor Reporting</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Clinic directors lack real-time visibility into daily patient volume, revenue per doctor, or room utilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution & 4. Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">The Solution</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            DeepliX Clinic System Modules
          </h2>
          <p className="text-[#475569] text-base mt-2">
            A comprehensive, HIPAA-aligned digital workflow linking front-desk check-in directly to the consultation room and billing desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">1. Patient Records Management</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Centralized digital patient charts with medical history, allergy alerts, past prescriptions, and attached diagnostic lab results accessible in one click.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Unique Medical Record Numbers (MRN)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Secure doctor consultation notes</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">2. Appointment & Queue Scheduling</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Real-time schedule coordinator preventing double bookings. Displays live waiting room queues, doctor availability, and automated SMS appointment reminders.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Doctor shift & room allocation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Live patient queue status display</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">3. Billing & Insurance Invoicing</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Instant invoice generation combining consultation fees, pharmacy prescriptions, and diagnostic procedures into a unified receipt.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Co-pay and insurance claim logs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Daily cashier balance reconciliation</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">4. Clinical & Financial Reports</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Executive dashboard summarizing patient throughput, average waiting durations, revenue trends, and departmental performance.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Daily, weekly, monthly revenue audit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Exportable compliance logs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onNavigate={onNavigate}
        title="Ready to organize your clinic's operations?"
        description="Book a technical consultation with our systems engineer to review your practice's workflow."
        buttonText="Book Clinic Consultation"
      />
    </div>
  );
};
