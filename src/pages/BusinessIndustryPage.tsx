import React from 'react';
import { PageRoute } from '../types';
import { BusinessDashboardMockup } from '../components/dashboards/BusinessDashboardMockup';
import { CTASection } from '../components/CTASection';
import { 
  Building2, 
  TrendingUp, 
  Package, 
  Users, 
  BarChart3, 
  FileSpreadsheet, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Truck
} from 'lucide-react';

interface BusinessIndustryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const BusinessIndustryPage: React.FC<BusinessIndustryPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
              <Building2 className="w-3.5 h-3.5" />
              <span>Industry: Growing Businesses</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Digital systems for growing commercial operations.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              A practical, reliable management system designed for wholesalers, distributors, service providers, and growing commercial enterprises to track sales, stock, customers, and margins.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-lg text-sm font-semibold transition-all shadow-xs"
              >
                <span>Book Business Consultation</span>
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
              <BusinessDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-2">Operational Bottlenecks</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Where Growing Businesses Experience Friction
            </h2>
            <p className="text-[#475569] text-sm sm:text-base mt-2">
              Ad-hoc spreadsheets and messaging apps fail when daily order volumes and customer accounts expand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Sales Tracking Delays</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Orders scattered across chat threads, paper pads, and personal notebooks without unified tracking.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Inventory Stockouts</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Warehouse staff selling items already out of stock, causing delayed shipments and unhappy clients.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Customer Disorganization</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                No record of client credit limits, previous quotes, or payment commitments across staff members.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Internal Misalignment</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Sales, billing, and dispatch teams operate blindly without synchronized order milestones.
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
            DeepliX Business System Modules
          </h2>
          <p className="text-[#475569] text-base mt-2">
            A reliable operational hub orchestrating orders, stock levels, receivables, and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">1. Sales Tracking & Order Dispatch</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Capture orders directly from quotation to approval and delivery. Auto-generates delivery notes and itemized invoices upon dispatch.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Live sales pipeline and fulfillment stages</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Sales rep performance tracking</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">2. Real-Time Inventory Control</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Multi-warehouse stock counts updated automatically with every sales dispatch and supplier intake. Set automated minimum re-order thresholds.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> SKU-level tracking with unit margins</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Low stock warning notifications</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">3. Customer Records & Accounts</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Comprehensive client directory with transaction history, approved payment terms, outstanding invoices, and dedicated relationship notes.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Credit limits and overdue invoice aging</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Interaction logs and custom contract pricing</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">4. Operations & Margin Reports</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Real-time gross margin calculations, cash flow forecasting, product velocity reports, and audit-ready quarterly statements.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Daily cash collection ledger</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Top-selling product margin analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onNavigate={onNavigate}
        title="Ready to organize your business workflows?"
        description="Book a consultation with our systems engineer to map your current operational process."
        buttonText="Book Business Consultation"
      />
    </div>
  );
};
