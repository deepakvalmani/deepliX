import React, { useState, useEffect } from 'react';
import { PageRoute, CaseStudyItem } from '../types';
import { CTASection } from '../components/CTASection';
import { adminStore } from '../lib/adminStore';
import { 
  Stethoscope, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CaseStudiesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);

  useEffect(() => {
    setCaseStudies(adminStore.getCaseStudies());
  }, []);

  const getIndustryDetails = (industry: string) => {
    const ind = industry.toLowerCase();
    if (ind.includes('clinic') || ind.includes('health')) {
      return {
        icon: Stethoscope,
        colorBg: 'bg-sky-50 text-[#0284C7] border-sky-100',
        textColor: 'text-[#0284C7]',
        route: '/industries/clinics' as PageRoute,
        routeLabel: 'Explore Clinic System'
      };
    }
    if (ind.includes('school') || ind.includes('educat')) {
      return {
        icon: GraduationCap,
        colorBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        textColor: 'text-emerald-800',
        route: '/industries/schools' as PageRoute,
        routeLabel: 'Explore Education System'
      };
    }
    return {
      icon: Building2,
      colorBg: 'bg-blue-50 text-[#2563EB] border-blue-100',
      textColor: 'text-[#2563EB]',
      route: '/industries/business' as PageRoute,
      routeLabel: 'Explore Business System'
    };
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <span>Demonstration Workflows</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
          Operational Transformations
        </h1>
        <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
          Realistic demonstration case studies showing how customized digital systems replace manual friction with organized, auditable operations.
        </p>
      </section>

      {/* Dynamic Case Studies List */}
      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {caseStudies.map((cs) => {
          const details = getIndustryDetails(cs.industry);
          const Icon = details.icon;

          return (
            <section key={cs.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-10 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${details.colorBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${details.textColor}`}>
                      {cs.industry}
                    </span>
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      {cs.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(details.route)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  <span>{details.routeLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-sm text-[#475569] leading-relaxed">
                {cs.summary}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="bg-[#FFF5F5] rounded-xl border border-red-200/70 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-800 uppercase tracking-wider">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>Before DeepliX Implementation</span>
                  </div>
                  <ul className="space-y-3 text-sm text-[#334155]">
                    {cs.before.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="bg-[#F0FDF4] rounded-xl border border-emerald-200/80 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>After DeepliX System Deployment</span>
                  </div>
                  <ul className="space-y-3 text-sm text-[#1E293B]">
                    {cs.after.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-lg border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#475569] gap-2">
                <span className="font-semibold text-[#0F172A]">Core Outcome:</span>
                <span className="text-[#0F172A] font-medium">{cs.keyOutcome}</span>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <CTASection
        onNavigate={onNavigate}
        title="Ready to achieve similar operational improvements?"
        description="Let us audit your current workflow bottlenecks and demonstrate how a customized digital system will work for your business."
      />
    </div>
  );
};

