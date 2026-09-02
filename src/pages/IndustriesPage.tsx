import React from 'react';
import { PageRoute } from '../types';
import { SectionTitle } from '../components/SectionTitle';
import { IndustryCard } from '../components/IndustryCard';
import { CTASection } from '../components/CTASection';
import { Stethoscope, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <span>Target Industry Focus</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
          Solutions for businesses that need better systems.
        </h1>
        <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
          We focus strictly on three core sectors where manual bottlenecks severely impact daily growth. Choose your industry below to inspect the purpose-built system architecture.
        </p>
      </section>

      {/* 3 Industry Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Comparison Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 space-y-8">
          <SectionTitle
            title="Why Industry-Specific Systems Matter"
            description="Generic spreadsheets and off-the-shelf software force businesses into awkward workarounds. DeepliX systems are tailored to your sector's true operating logic."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E5E7EB]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <Stethoscope className="w-5 h-5 text-[#0284C7]" />
                <span>Healthcare Protocols</span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Patient privacy, room availability, physician consultation queues, and complex diagnostic billing require specialized care flow.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
                <span>Academic Calendars</span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Term-based fee installments, classroom roll calls, report card generation, and direct parent communications require strict academic structure.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <Building2 className="w-5 h-5 text-[#2563EB]" />
                <span>Commercial Velocity</span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Multi-SKU inventory reconciliation, customer credit terms, order fulfillment pipelines, and cash-flow reporting need instant operational sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
