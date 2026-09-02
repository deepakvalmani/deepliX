import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, X, Check, Cookie, Settings, ArrowRight } from 'lucide-react';

interface CookieConsentProps {
  onNavigate: (route: PageRoute) => void;
}

const STORAGE_KEY = 'deeplix_cookie_consent_v2';

export const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    preferences: true
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Show after a brief delay for clean page load
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: true,
        preferences: true,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
    setIsManaging(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...preferences,
        essential: true, // Always true
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
    setIsManaging(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans">
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-lg p-5 space-y-4 text-left">
        {!isManaging ? (
          <>
            {/* Header & Title */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
                  <Cookie className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Your Privacy Matters
                </h3>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-md transition-colors"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Text */}
            <p className="text-xs text-[#475569] leading-relaxed">
              We use cookies to improve website performance, analyze usage, and provide a better experience. By continuing to use DeepliX, you agree to our{' '}
              <button
                onClick={() => onNavigate('/cookie-policy')}
                className="text-[#2563EB] underline hover:text-[#1D4ED8]"
              >
                cookie policy
              </button>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-xs text-center"
              >
                Accept Cookies
              </button>
              <button
                onClick={() => setIsManaging(true)}
                className="flex-1 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#E5E7EB] px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors text-center"
              >
                Manage Preferences
              </button>
            </div>

            {/* Legal Links Footer */}
            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1 border-t border-[#F1F5F9]">
              <button
                onClick={() => onNavigate('/privacy-policy')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('/cookie-policy')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </>
        ) : (
          /* Manage Preferences Panel */
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#2563EB]" />
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Cookie Categories
                </h4>
              </div>
              <button
                onClick={() => setIsManaging(false)}
                className="text-xs text-[#64748B] hover:text-[#0F172A]"
              >
                Back
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Essential */}
              <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                    <span>Essential Cookies</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">Required</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-tight">
                    Required for website functionality. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="mt-1 h-4 w-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-not-allowed opacity-70"
                />
              </div>

              {/* Analytics */}
              <div className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#0F172A]">
                    Analytics Cookies
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-tight">
                    Used to understand website usage and improve experience.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
              </div>

              {/* Preferences */}
              <div className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#0F172A]">
                    Preference Cookies
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-tight">
                    Used to remember user settings and selected industry preferences.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) => setPreferences(p => ({ ...p, preferences: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#E5E7EB] py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
