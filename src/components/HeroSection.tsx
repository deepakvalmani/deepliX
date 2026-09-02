import React, { useState, useEffect } from 'react';
import { PageRoute, WebsiteSettings } from '../types';
import { adminStore } from '../lib/adminStore';
import { BusinessDashboardMockup } from './dashboards/BusinessDashboardMockup';
import { ClinicDashboardMockup } from './dashboards/ClinicDashboardMockup';
import { EducationDashboardMockup } from './dashboards/EducationDashboardMockup';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(adminStore.getSettings());

  useEffect(() => {
    setSettings(adminStore.getSettings());
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E5E7EB]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E5E7EB]">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>{settings.announcementBadge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0F172A] leading-[1.12]">
                {settings.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
                {settings.heroSubtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-md font-semibold text-sm sm:text-base transition-colors shadow-xs"
                id="hero-primary-cta"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/solutions')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E5E7EB] px-7 py-3.5 rounded-md font-semibold text-sm sm:text-base transition-colors"
                id="hero-secondary-cta"
              >
                <span>Explore Solutions</span>
              </button>
            </div>

            {/* Bottom 3-Column Focus Block */}
            <div className="pt-6 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button 
                onClick={() => onNavigate('/industries/clinics')} 
                className="text-left group hover:opacity-80 transition-opacity"
              >
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#2563EB] mb-1 transition-colors">
                  01. Clinics
                </p>
                <p className="text-xs font-semibold text-[#0F172A] leading-snug">
                  {settings.clinicDescription}
                </p>
              </button>

              <button 
                onClick={() => onNavigate('/industries/schools')} 
                className="text-left group hover:opacity-80 transition-opacity"
              >
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#2563EB] mb-1 transition-colors">
                  02. Schools
                </p>
                <p className="text-xs font-semibold text-[#0F172A] leading-snug">
                  {settings.schoolDescription}
                </p>
              </button>

              <button 
                onClick={() => onNavigate('/industries/business')} 
                className="text-left group hover:opacity-80 transition-opacity"
              >
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#2563EB] mb-1 transition-colors">
                  03. Businesses
                </p>
                <p className="text-xs font-semibold text-[#0F172A] leading-snug">
                  {settings.businessDescription}
                </p>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Minimalist SaaS Product Dashboard Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Main Window Frame */}
            <div className="w-full bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden flex flex-col">
              {/* Browser / System Chrome Bar */}
              <div className="h-10 border-b border-[#E5E7EB] bg-white flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></div>
                </div>
                <div className="mx-auto bg-[#F1F5F9] px-4 py-1 rounded text-[11px] font-medium text-[#64748B] w-56 text-center border border-[#E2E8F0]/60">
                  deeplix.cloud/business-system
                </div>
              </div>

              {/* Main DeepliX Business System Dashboard Mockup */}
              <div className="relative bg-white overflow-hidden">
                <BusinessDashboardMockup />
              </div>
            </div>

            {/* Floating Preview Card 1: Clinic System */}
            <div className="hidden sm:block absolute -top-8 -right-4 z-20 w-60 shadow-lg rounded-xl border border-[#E5E7EB] bg-white transition-transform hover:-translate-y-0.5 duration-150">
              <ClinicDashboardMockup isMini />
            </div>

            {/* Floating Preview Card 2: Education System */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 z-20 w-60 shadow-lg rounded-xl border border-[#E5E7EB] bg-white transition-transform hover:-translate-y-0.5 duration-150">
              <EducationDashboardMockup isMini />
            </div>

            {/* Mobile Stacked Mini Cards for small devices */}
            <div className="grid sm:hidden grid-cols-1 gap-3 mt-4">
              <ClinicDashboardMockup isMini />
              <EducationDashboardMockup isMini />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
