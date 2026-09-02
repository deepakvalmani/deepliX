import React from 'react';
import { PageRoute } from '../types';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { BusinessDashboardMockup } from '../components/dashboards/BusinessDashboardMockup';
import { 
  Building2, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Database, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sliders
} from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <span>Operational Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
          Digital systems designed around your operations.
        </h1>
        <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
          Every growing organization requires structured workflows, consolidated visibility, and reliable automation. We build the exact system your business needs to scale smoothly.
        </p>
      </section>

      {/* Section 1: Business Systems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E5E7EB]">
              <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Core Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Business Systems
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Custom software for daily operations. We engineer unified platforms that map directly to your real-world transactional pipeline, eliminating the chaos of paper folders, unlinked documents, and spreadsheets.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                <span className="text-sm text-[#334155]"><strong>End-to-End Workflow Mapping:</strong> Designed around your exact operational stages from inquiry to settlement.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                <span className="text-sm text-[#334155]"><strong>Single Source of Truth:</strong> Centralized database architecture preventing fragmented or conflicting customer and inventory records.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                <span className="text-sm text-[#334155]"><strong>Role-Based Access:</strong> Clear staff permissions for administrators, clerks, managers, and operational teams.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-4">
              <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">System Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="font-bold text-[#0F172A] block mb-1">Transaction Ledger</span>
                  <span className="text-[#64748B]">Audited tracking of every sale, refund, and invoice.</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="font-bold text-[#0F172A] block mb-1">Inventory Management</span>
                  <span className="text-[#64748B]">Multi-location stock counts with low-threshold warnings.</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="font-bold text-[#0F172A] block mb-1">Customer CRM</span>
                  <span className="text-[#64748B]">Detailed account logs, service history, and notes.</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="font-bold text-[#0F172A] block mb-1">Operational Security</span>
                  <span className="text-[#64748B]">Automated daily cloud backups and encryption.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Dashboards */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#0F172A] bg-white border border-[#E5E7EB]">
                <BarChart3 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Executive Visibility</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Dashboards
              </h2>
              <p className="text-base text-[#475569] leading-relaxed">
                Clear visibility into business performance. Stop waiting until the end of the month to compile spreadsheets. View live revenues, attendance rates, inventory levels, and team metrics in real-time.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#334155]"><strong>Instant Performance Metrics:</strong> Daily sales, cash flow summaries, and operational throughput.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#334155]"><strong>Custom Reporting Filters:</strong> Slice data by date, branch, department, or staff member.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#334155]"><strong>Clean Exporting:</strong> One-click exports to CSV, Excel, or formatted PDF statements.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BusinessDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Automation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">Automated Invoicing</h4>
                <p className="text-xs text-[#475569]">
                  Generate and dispatch receipts upon payment confirmation without manual data re-entry.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">Notification Triggers</h4>
                <p className="text-xs text-[#475569]">
                  Send automated SMS or email reminders for clinic appointments, fee deadlines, or low stock.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">Multi-Step Approvals</h4>
                <p className="text-xs text-[#475569]">
                  Route large purchase orders or fee concessions automatically to management for review.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">Status Pipelines</h4>
                <p className="text-xs text-[#475569]">
                  Auto-advance orders and tickets through stages as physical fulfillment milestones are met.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E5E7EB]">
              <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Workflow Efficiency</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Automation
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Reduce repetitive manual work. We identify error-prone administrative tasks and automate them seamlessly, freeing your staff to focus on customer service, patient care, or education.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-xs"
              >
                <span>Consult on Your Operations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        onNavigate={onNavigate}
        title="Ready to organize your business operations?"
        description="Schedule a technical consultation to map your current processes and plan your custom system."
      />
    </div>
  );
};
