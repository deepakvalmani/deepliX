import React from 'react';
import { PageRoute } from '../types';
import { ContactForm } from '../components/ContactForm';
import { Mail, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <span>Direct Systems Consultation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
          Tell us about your operations.
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
          Whether you manage a medical clinic, school, or growing commercial enterprise, we are ready to discuss your workflow challenges and identify the right digital solution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Direct Info & Consultation Protocol */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] p-6 space-y-5">
            <h3 className="text-base font-bold text-[#0F172A]">What Happens Next?</h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#475569]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-[#0F172A] block font-semibold">Workflow Review</strong>
                  Our technical engineer reviews your specified industry and process bottlenecks.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-[#0F172A] block font-semibold">Initial Systems Architecture</strong>
                  We map out the exact module requirements and estimated timeline.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-[#0F172A] block font-semibold">30-Min Technical Consultation</strong>
                  A focused conversation discussing data migration, timeline, and demo walkthrough.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-4">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Direct Channels</h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#475569]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[#2563EB]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Email Direct</span>
                  <a href="mailto:rajvalmani@gmail.com" className="font-semibold text-[#0F172A] hover:text-[#2563EB]">
                    rajvalmani@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[#2563EB]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Phone & WhatsApp</span>
                  <a href="tel:+923470315546" className="font-semibold text-[#0F172A] hover:text-[#2563EB]">
                    +92 347 0315546
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[#2563EB]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Turnaround Commitment</span>
                  <span className="font-semibold text-[#0F172A]">Within 24 business hours</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[#2563EB]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Privacy & Security</span>
                  <span className="font-semibold text-[#0F172A]">Strict confidentiality on all operational data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
