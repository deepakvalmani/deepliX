import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Stethoscope, 
  GraduationCap, 
  Building2 
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);

  // Close mobile menu on route change or screen resize
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
  }, [currentRoute]);

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xs border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center focus:outline-hidden text-left"
            id="nav-logo"
          >
            <Logo size="md" showTagline />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNavClick('/solutions')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentRoute === '/solutions'
                  ? 'text-[#2563EB] bg-blue-50/60'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              id="nav-link-solutions"
            >
              Solutions
            </button>

            {/* Industries Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                onMouseEnter={() => setIsIndustriesOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  currentRoute.startsWith('/industries')
                    ? 'text-[#2563EB] bg-blue-50/60'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
                id="nav-link-industries-trigger"
              >
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isIndustriesOpen && (
                <div 
                  onMouseLeave={() => setIsIndustriesOpen(false)}
                  className="absolute top-full left-0 w-64 mt-1 p-2 bg-white rounded-lg border border-[#E5E7EB] shadow-md z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button
                    onClick={() => handleNavClick('/industries')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] uppercase tracking-wider border-b border-[#F1F5F9] mb-1"
                  >
                    All Industries Overview
                  </button>
                  <button
                    onClick={() => handleNavClick('/industries/clinics')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-md hover:bg-[#F8FAFC] text-left transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-sky-50 text-[#0284C7] mt-0.5">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">Clinics</div>
                      <div className="text-xs text-[#64748B]">Patients, appointments & billing</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/industries/schools')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-md hover:bg-[#F8FAFC] text-left transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">Schools</div>
                      <div className="text-xs text-[#64748B]">Attendance, fees & records</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/industries/business')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-md hover:bg-[#F8FAFC] text-left transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-blue-50 text-[#2563EB] mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">Growing Businesses</div>
                      <div className="text-xs text-[#64748B]">Sales, inventory & operations</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/case-studies')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentRoute === '/case-studies'
                  ? 'text-[#2563EB] bg-blue-50/60'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              id="nav-link-casestudies"
            >
              Case Studies
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentRoute === '/about'
                  ? 'text-[#2563EB] bg-blue-50/60'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              id="nav-link-about"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentRoute === '/contact'
                  ? 'text-[#2563EB] bg-blue-50/60'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              id="nav-link-contact"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick('/contact')}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-xs"
              id="nav-cta-consultation"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] focus:outline-hidden"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white px-4 pt-2 pb-6 space-y-1">
          <button
            onClick={() => handleNavClick('/solutions')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentRoute === '/solutions' ? 'text-[#2563EB] bg-blue-50' : 'text-[#334155]'
            }`}
          >
            Solutions
          </button>

          <div className="py-1">
            <div className="px-3 py-1.5 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Industries
            </div>
            <div className="pl-2 space-y-1">
              <button
                onClick={() => handleNavClick('/industries')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  currentRoute === '/industries' ? 'text-[#2563EB] font-medium' : 'text-[#475569]'
                }`}
              >
                All Industries Overview
              </button>
              <button
                onClick={() => handleNavClick('/industries/clinics')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  currentRoute === '/industries/clinics' ? 'text-[#2563EB] font-medium' : 'text-[#475569]'
                }`}
              >
                Clinics (Healthcare)
              </button>
              <button
                onClick={() => handleNavClick('/industries/schools')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  currentRoute === '/industries/schools' ? 'text-[#2563EB] font-medium' : 'text-[#475569]'
                }`}
              >
                Schools (Education)
              </button>
              <button
                onClick={() => handleNavClick('/industries/business')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  currentRoute === '/industries/business' ? 'text-[#2563EB] font-medium' : 'text-[#475569]'
                }`}
              >
                Growing Businesses
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('/case-studies')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentRoute === '/case-studies' ? 'text-[#2563EB] bg-blue-50' : 'text-[#334155]'
            }`}
          >
            Case Studies
          </button>

          <button
            onClick={() => handleNavClick('/about')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentRoute === '/about' ? 'text-[#2563EB] bg-blue-50' : 'text-[#334155]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('/contact')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentRoute === '/contact' ? 'text-[#2563EB] bg-blue-50' : 'text-[#334155]'
            }`}
          >
            Contact
          </button>

          <div className="pt-3">
            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white px-4 py-3 rounded-lg text-sm font-semibold"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
