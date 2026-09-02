import React from 'react';
import { PageRoute } from '../types';
import { Cookie, ShieldCheck, Mail, Phone, CheckCircle2, Settings } from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-8 mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <Cookie className="w-3.5 h-3.5" />
          <span>Cookies & Tracking Technologies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
          Cookie Policy
        </h1>
        <p className="text-sm text-[#64748B]">
          Last Updated: September 2026
        </p>
      </div>

      {/* Main Content Body */}
      <div className="prose prose-slate max-w-none space-y-10 text-sm sm:text-base text-[#334155] leading-relaxed">
        {/* Section 1: What are cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A]">What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device (computer, tablet, or smartphone) by websites that you visit. They are widely used to make websites function efficiently, remember your preferences, and provide aggregated diagnostic information to website operators.
          </p>
        </section>

        {/* Section 2: Why DeepliX uses cookies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A]">Why DeepliX Uses Cookies</h2>
          <p>
            DeepliX uses cookies and local browser storage to provide a secure, seamless, and high-performance experience. We categorize our cookies into three specific tiers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Essential Cookies */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] text-sm">1. Essential Cookies</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Required
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Required for core website functionality, routing, security verification, and form submission integrity. These cannot be disabled.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] text-sm">2. Analytics Cookies</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Used to understand how visitors interact with our pages, helping us identify broken links, measure load speeds, and improve content clarity.
              </p>
            </div>

            {/* Preference Cookies */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] text-sm">3. Preference Cookies</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Remember your custom interface choices, such as dismissed banners, selected industry tabs, and navigation states across sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Managing Cookies */}
        <section className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#0F172A] font-bold text-lg">
            <Settings className="w-5 h-5 text-[#2563EB]" />
            <h2>How You Can Manage Cookies</h2>
          </div>
          <p className="text-sm text-[#475569]">
            You have full control over your cookie preferences at any time:
          </p>
          <ul className="space-y-2.5 list-disc pl-5 text-sm text-[#475569]">
            <li>
              <strong>Consent Banner:</strong> You can configure or update your preferences directly using our on-site cookie manager modal.
            </li>
            <li>
              <strong>Browser Controls:</strong> Most web browsers automatically accept cookies, but you can modify your browser settings to decline or purge cookies if you prefer. Please note that disabling essential cookies may impact certain interactive form behaviors.
            </li>
          </ul>
        </section>

        {/* Section 4: Contact */}
        <section className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">Questions Regarding Our Cookie Policy</h2>
          <p className="text-sm text-[#475569]">
            If you need further clarification on our cookie usage and privacy safeguards, contact us at:
          </p>
          <div className="space-y-2.5 pt-2 text-sm text-[#0F172A]">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <a href="mailto:rajvalmani@gmail.com" className="text-[#2563EB] hover:underline font-semibold">
                rajvalmani@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <a href="tel:+923470315546" className="text-[#0F172A] hover:text-[#2563EB] font-semibold">
                +92 347 0315546
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
        <button
          onClick={() => onNavigate('/privacy-policy')}
          className="text-xs font-semibold text-[#2563EB] hover:underline"
        >
          ← View Privacy Policy
        </button>
        <button
          onClick={() => onNavigate('/')}
          className="text-xs text-[#64748B] hover:text-[#0F172A]"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};
