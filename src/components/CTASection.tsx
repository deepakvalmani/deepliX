import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (route: PageRoute) => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onNavigate,
  title = 'Ready to improve the way your business operates?',
  description = 'Tell us about your current challenges and we will help identify the right digital solution.',
  buttonText = 'Book Consultation',
}) => {
  return (
    <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Systems Assessment</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              onNavigate('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-md text-base font-semibold transition-colors shadow-xs"
            id="final-cta-btn"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onNavigate('/solutions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E5E7EB] px-8 py-3.5 rounded-md text-base font-semibold transition-colors"
          >
            <span>Explore Solutions</span>
          </button>
        </div>
      </div>
    </section>
  );
};

