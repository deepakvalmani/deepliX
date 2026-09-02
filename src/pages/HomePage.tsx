import React from 'react';
import { PageRoute } from '../types';
import { HeroSection } from '../components/HeroSection';
import { SectionTitle } from '../components/SectionTitle';
import { FeatureCard } from '../components/FeatureCard';
import { SolutionCard } from '../components/SolutionCard';
import { IndustryCard } from '../components/IndustryCard';
import { DashboardPreview } from '../components/DashboardPreview';
import { CTASection } from '../components/CTASection';
import { 
  Stethoscope, 
  GraduationCap, 
  Building2, 
  Wrench, 
  Sparkles, 
  Headphones, 
  FileSpreadsheet, 
  Database, 
  EyeOff, 
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Section 1: Hero */}
      <HeroSection onNavigate={onNavigate} />

      {/* Section 2: Positioning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Core Positioning"
          title="Built for businesses that want better systems."
          description="We specialize in pragmatic digital tools that fit your actual operations, without unnecessary complexity."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <FeatureCard
            icon={Wrench}
            title="Custom Solutions"
            description="Systems designed around your business workflow."
            badge="Architecture"
          />
          <FeatureCard
            icon={Sparkles}
            title="Simple Operations"
            description="Replace manual processes with organized digital tools."
            badge="Efficiency"
          />
          <FeatureCard
            icon={Headphones}
            title="Long-Term Support"
            description="We help businesses maintain and improve their systems."
            badge="Reliability"
          />
        </div>
      </section>

      {/* Section 3: Problem Section */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Operational Bottlenecks"
            title="Growing businesses often outgrow their current systems."
            description="As transaction volume and team size expand, disconnected legacy tools create friction across daily operations."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            <FeatureCard
              icon={FileSpreadsheet}
              title="Manual Work"
              description="Many businesses still depend on spreadsheets and paperwork."
              variant="problem"
            />
            <FeatureCard
              icon={Database}
              title="Scattered Information"
              description="Important data is stored across different places."
              variant="problem"
            />
            <FeatureCard
              icon={EyeOff}
              title="Limited Visibility"
              description="Owners lack clear information about daily operations."
              variant="problem"
            />
            <FeatureCard
              icon={TrendingDown}
              title="Growth Challenges"
              description="Existing processes cannot support expansion."
              variant="problem"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Productized Systems"
          title="Systems designed around real business needs."
          description="Tailored software platforms built specifically for your sector's operational logic."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {/* Clinic System Card */}
          <SolutionCard
            title="DeepliX Clinic System"
            badge="Healthcare Suite"
            description="A digital system to manage patients, appointments, records, and daily clinic operations."
            features={[
              'Patient records & medical history',
              'Appointment management & scheduling',
              'Billing & invoice processing',
              'Clinical and daily revenue reports',
            ]}
            route="/industries/clinics"
            icon={Stethoscope}
            onNavigate={onNavigate}
          />

          {/* Education System Card */}
          <SolutionCard
            title="DeepliX Education System"
            badge="Education Suite"
            description="A complete management system for schools and educational institutions."
            features={[
              'Student management & admissions',
              'Attendance tracking & registers',
              'Fees collection & receipts',
              'Exam results & automated report cards',
            ]}
            route="/industries/schools"
            icon={GraduationCap}
            onNavigate={onNavigate}
          />

          {/* Business System Card */}
          <SolutionCard
            title="DeepliX Business System"
            badge="Commerce & Ops"
            description="A practical system for managing sales, inventory, customers, and operations."
            features={[
              'Sales tracking & order pipeline',
              'Inventory management & stock alerts',
              'Customer records & interaction history',
              'Operational performance reports',
            ]}
            route="/industries/business"
            icon={Building2}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* Section 5: Product Showcase */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Product Interface"
            title="Built for daily operational clarity."
            description="Explore live interface previews across our three dedicated industry systems."
          />

          <div className="mt-8">
            <DashboardPreview showTabs={true} />
          </div>
        </div>
      </section>

      {/* Section 6: Industries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Focused Industries"
          title="Solutions for businesses that need better systems."
          description="We concentrate our engineering specifically where manual operational processes create severe daily overhead."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
          <IndustryCard
            title="Clinics"
            description="Manage patients, appointments, and operations."
            route="/industries/clinics"
            icon={Stethoscope}
            onNavigate={onNavigate}
          />
          <IndustryCard
            title="Schools"
            description="Manage students, attendance, and administration."
            route="/industries/schools"
            icon={GraduationCap}
            onNavigate={onNavigate}
          />
          <IndustryCard
            title="Businesses"
            description="Manage sales, inventory, and workflows."
            route="/industries/business"
            icon={Building2}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* Section 7: Case Studies Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Demonstration Workflows"
          title="Practical before-and-after operational transformations."
          description="See how structured digital systems replace fragmented workflows with clarity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Example 1: Clinic */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-sky-50 text-[#0284C7]">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Clinic Workflow Improvement</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F8FAFC] text-[#64748B] border border-[#E5E7EB]">
                Demonstration
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-red-700 uppercase tracking-wider text-xs">
                  <XCircle className="w-4 h-4" /> Before DeepliX
                </div>
                <p className="text-[#475569]">
                  Patient records managed manually on paper charts; constant scheduling overlaps and unbilled lab items.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 uppercase tracking-wider text-xs">
                  <CheckCircle2 className="w-4 h-4" /> After DeepliX
                </div>
                <p className="text-[#334155]">
                  Organized digital patient management system with real-time room queues and synchronized instant billing.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/case-studies')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              <span>View full workflow details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Example 2: School */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-emerald-50 text-emerald-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">School Management Improvement</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F8FAFC] text-[#64748B] border border-[#E5E7EB]">
                Demonstration
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-red-700 uppercase tracking-wider text-xs">
                  <XCircle className="w-4 h-4" /> Before DeepliX
                </div>
                <p className="text-[#475569]">
                  Attendance and fees managed through multiple disconnected spreadsheets with slow end-of-term reporting.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 uppercase tracking-wider text-xs">
                  <CheckCircle2 className="w-4 h-4" /> After DeepliX
                </div>
                <p className="text-[#334155]">
                  Centralized school management system with automated parent SMS, fee reconciliation, and instant report cards.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/case-studies')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              <span>View full workflow details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
