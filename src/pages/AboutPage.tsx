import React from 'react';
import { PageRoute } from '../types';
import { CTASection } from '../components/CTASection';
import { 
  ShieldCheck, 
  Target, 
  Workflow, 
  HeartHandshake, 
  ArrowRight,
  Code2,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Core Statement Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <span>About DeepliX</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
          Practical digital systems for growing businesses.
        </h1>

        <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 text-left space-y-4">
          <p className="text-lg sm:text-xl font-medium text-[#0F172A] leading-relaxed">
            DeepliX was created to help growing businesses access reliable digital systems without the complexity of traditional enterprise software.
          </p>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Most small and medium enterprises find themselves trapped between two undesirable extremes: rigid spreadsheets that break as transaction volumes grow, or bloated enterprise platforms that cost a fortune and take months of disruptive training. DeepliX provides the ideal middle ground — purpose-built, intuitive systems tailored to your real workflow.
          </p>
        </div>
      </section>

      {/* 2. Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl">
          <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Our Operating Philosophy</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Principles That Guide Our System Design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">1. Fit the Workflow, Not Vice-Versa</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              We design software around how your staff already operates successfully in the real world. We don't force your business into arbitrary tech jargon or unnecessary steps.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">2. Clarity and Speed Over Bloat</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Fast load times, minimal clicks for daily tasks, high data integrity, and intuitive interfaces that any receptionist, teacher, or inventory clerk can learn in 15 minutes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">3. Long-Term Reliability & Partnership</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              We don't just deliver software and disappear. We maintain systems, perform scheduled secure backups, train staff, and expand capabilities as your business scales.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How We Work */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Our Process</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              How DeepliX Builds Your System
            </h2>
            <p className="text-[#475569] text-base mt-2">
              A structured, low-risk engagement process from initial operational discovery to full deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">Stage 01</span>
              <h3 className="font-bold text-base text-[#0F172A]">Workflow Audit</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                We review your existing paper documents, Excel registers, and operational steps to identify core bottlenecks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">Stage 02</span>
              <h3 className="font-bold text-base text-[#0F172A]">System Architecture</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                We configure database schemas, access roles, and tailored user interfaces matching your exact business logic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">Stage 03</span>
              <h3 className="font-bold text-base text-[#0F172A]">Data Migration & Pilot</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                We safely migrate past records into the new system and run a pilot alongside your team to ensure zero disruption.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">Stage 04</span>
              <h3 className="font-bold text-base text-[#0F172A]">Ongoing Support</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Continuous operational monitoring, regular automated backups, and prompt technical support whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        onNavigate={onNavigate}
        title="Speak with a systems engineer today"
        description="Book a direct consultation to discuss your business requirements."
      />
    </div>
  );
};
