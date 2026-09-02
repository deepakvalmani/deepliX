import React, { useState } from 'react';
import { ConsultationFormData } from '../types';
import { adminStore } from '../lib/adminStore';
import { Send, CheckCircle2, Shield, Clock, HelpCircle } from 'lucide-react';

interface ContactFormProps {
  initialIndustry?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialIndustry = 'Growing Businesses' }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    company: '',
    industry: initialIndustry,
    email: '',
    phone: '',
    businessChallenge: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.businessChallenge) {
      setErrorMessage('Please fill in all required fields to submit your consultation request.');
      return;
    }

    setIsSubmitting(true);
    
    // Map industry name to standard type
    let normalizedIndustry: 'Clinics' | 'Schools' | 'Businesses' | 'Other' = 'Businesses';
    if (formData.industry.toLowerCase().includes('clinic') || formData.industry.toLowerCase().includes('health')) {
      normalizedIndustry = 'Clinics';
    } else if (formData.industry.toLowerCase().includes('school') || formData.industry.toLowerCase().includes('educat')) {
      normalizedIndustry = 'Schools';
    }

    // Persist into Admin Store
    adminStore.addInquiry({
      type: 'consultation',
      name: formData.name,
      company: formData.company,
      industry: normalizedIndustry,
      email: formData.email,
      phone: formData.phone,
      message: formData.businessChallenge,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 text-center space-y-5 shadow-xs">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#0F172A]">Consultation Request Received</h3>
          <p className="text-sm text-[#475569] max-w-md mx-auto">
            Thank you, <span className="font-semibold text-[#0F172A]">{formData.name}</span>. Our technical systems team will review your workflow challenges at <span className="font-semibold text-[#0F172A]">{formData.company}</span> and reach out within 24 business hours.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-4 max-w-md mx-auto text-left text-xs space-y-1.5 text-[#334155]">
          <div className="font-bold text-[#0F172A] pb-1 border-b border-[#E5E7EB]">Request Summary:</div>
          <div><span className="text-[#64748B]">Industry:</span> {formData.industry}</div>
          <div><span className="text-[#64748B]">Primary Contact:</span> {formData.email} {formData.phone ? `(${formData.phone})` : ''}</div>
          <div><span className="text-[#64748B]">Scope:</span> {formData.businessChallenge}</div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              company: '',
              industry: 'Growing Businesses',
              email: '',
              phone: '',
              businessChallenge: '',
            });
          }}
          className="text-xs text-[#2563EB] font-medium hover:underline pt-2"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs space-y-5">
      <div className="border-b border-[#F1F5F9] pb-4">
        <h3 className="text-xl font-bold text-[#0F172A]">Request a Systems Consultation</h3>
        <p className="text-xs sm:text-sm text-[#475569] mt-1">
          Tell us about your operational requirements. We will prepare an initial workflow evaluation.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Tariq Mahmood"
            required
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-colors"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Organization / Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Crescent Medical Complex"
            required
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Target Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-colors"
          >
            <option value="Clinics">Clinics (Healthcare)</option>
            <option value="Schools">Schools (Education)</option>
            <option value="Growing Businesses">Growing Businesses</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tariq@crescentclinic.com"
            required
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-colors"
          />
        </div>
      </div>

      {/* Business Challenge */}
      <div>
        <label htmlFor="businessChallenge" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
          Current Business Challenge <span className="text-red-500">*</span>
        </label>
        <textarea
          id="businessChallenge"
          name="businessChallenge"
          rows={4}
          value={formData.businessChallenge}
          onChange={handleChange}
          placeholder="Describe your current manual processes, spreadsheet bottlenecks, or operations you want to organize..."
          required
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-colors resize-y"
        />
      </div>

      {/* Trust & Guarantee */}
      <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
          Direct engineering consultation. No sales spam.
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
          24h response time
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg text-sm transition-all shadow-xs"
        id="submit-consultation-btn"
      >
        {isSubmitting ? (
          <span>Submitting Request...</span>
        ) : (
          <>
            <span>Request Consultation</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
