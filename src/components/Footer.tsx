import React from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-14 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#E5E7EB]">
          {/* Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <button onClick={() => handleNav('/')} className="text-left focus:outline-hidden">
              <Logo size="md" showTagline />
            </button>
            <p className="text-sm text-[#475569] leading-relaxed max-w-sm">
              DeepliX designs and builds customized software systems for clinics, schools, and businesses — helping them replace manual processes with organized, reliable solutions.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1.5 rounded-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Accepting New Client Consultations</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li>
                <button 
                  onClick={() => handleNav('/solutions')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Business Systems
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/solutions')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Operational Dashboards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/solutions')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Process Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Target Industries</h4>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li>
                <button 
                  onClick={() => handleNav('/industries/clinics')} 
                  className="hover:text-[#2563EB] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Clinics & Healthcare</span>
                  <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/industries/schools')} 
                  className="hover:text-[#2563EB] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Schools & Education</span>
                  <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/industries/business')} 
                  className="hover:text-[#2563EB] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Growing Businesses</span>
                  <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/industries')} 
                  className="text-xs text-[#2563EB] font-medium hover:underline text-left pt-1"
                >
                  View All Industries
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Contact Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Company & Support</h4>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li>
                <button 
                  onClick={() => handleNav('/about')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  About DeepliX
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/case-studies')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/contact')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/privacy-policy')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/cookie-policy')} 
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
            <div className="pt-2 text-xs text-[#64748B] space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <a href="mailto:rajvalmani@gmail.com" className="hover:text-[#2563EB] transition-colors">
                  rajvalmani@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <a href="tel:+923470315546" className="hover:text-[#2563EB] transition-colors">
                  +92 347 0315546
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} DeepliX. All rights reserved. Digital systems built for growing businesses.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#0F172A] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/cookie-policy')} className="hover:text-[#0F172A] transition-colors">
              Cookie Policy
            </button>
            <button onClick={() => handleNav('/contact')} className="hover:text-[#0F172A] transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
