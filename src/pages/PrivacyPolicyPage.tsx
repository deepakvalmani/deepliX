import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, Mail, Phone, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-8 mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#64748B]">
          Last Updated: September 2026
        </p>
      </div>

      {/* Main Content Body */}
      <div className="prose prose-slate max-w-none space-y-10 text-sm sm:text-base text-[#334155] leading-relaxed">
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <p>
            At DeepliX, we value the trust you place in us when sharing your business and contact information. This Privacy Policy outlines our transparent practices regarding the collection, use, and protection of information submitted through our website and consultation channels.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#0F172A] font-bold text-lg">
            <FileText className="w-5 h-5 text-[#2563EB]" />
            <h2>Information We Collect</h2>
          </div>
          <p className="text-sm text-[#475569]">
            We may collect personal and operational details when you request a consultation, submit an inquiry form, or contact our engineering desk directly:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-medium text-[#0F172A]">
            <li className="flex items-center gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5E7EB]/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Full Name</span>
            </li>
            <li className="flex items-center gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5E7EB]/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Email Address</span>
            </li>
            <li className="flex items-center gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5E7EB]/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Phone Number</span>
            </li>
            <li className="flex items-center gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5E7EB]/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Business / Organization Information</span>
            </li>
            <li className="flex items-center gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5E7EB]/60 sm:col-span-2">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Workflow descriptions & messages submitted through forms</span>
            </li>
          </ul>
        </section>

        {/* Section 3: How We Use Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A]">How We Use Information</h2>
          <p>The information collected is used solely for legitimate business operations:</p>
          <ul className="space-y-2 list-disc pl-5 text-[#475569]">
            <li>To respond promptly to consultation inquiries and support requests.</li>
            <li>To evaluate your business workflow requirements and formulate tailored systems architecture.</li>
            <li>To maintain communication during project scoping and ongoing solution delivery.</li>
            <li>To improve the performance, usability, and responsiveness of our digital platforms.</li>
          </ul>
        </section>

        {/* Section 4: Data Protection */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-[#0F172A] font-bold text-xl">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h2>Data Protection</h2>
          </div>
          <p>
            We take reasonable and industry-standard security measures to safeguard all submitted information against unauthorized access, disclosure, alteration, or misuse. We do not sell, rent, or trade your contact or business data to any third-party marketing companies.
          </p>
        </section>

        {/* Section 5: Third-Party Services */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A]">Third-Party Services</h2>
          <p>
            If analytics or external infrastructure tools are utilized to measure website performance or deliver technical assets, they process limited diagnostic information in accordance with their respective privacy policies.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">Privacy & Data Inquiries</h2>
          <p className="text-sm text-[#475569]">
            If you have any questions regarding this Privacy Policy or wish to request corrections to your information, please reach out to us directly:
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
          onClick={() => onNavigate('/cookie-policy')}
          className="text-xs font-semibold text-[#2563EB] hover:underline"
        >
          View Cookie Policy →
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
