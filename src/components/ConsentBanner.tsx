/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Settings2 } from 'lucide-react';
import { PageType } from '../types';

interface ConsentBannerProps {
  onNavigate: (page: PageType) => void;
}

export default function ConsentBanner({ onNavigate }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    personalization: false,
  });

  useEffect(() => {
    try {
      const consentGiven = localStorage.getItem('deeplix_privacy_consent');
      if (!consentGiven) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('deeplix_privacy_consent', 'accepted_all');
      localStorage.setItem('deeplix_consent_preferences', JSON.stringify({
        essential: true,
        analytics: true,
        personalization: true,
      }));
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('deeplix_privacy_consent', 'customized');
      localStorage.setItem('deeplix_consent_preferences', JSON.stringify(preferences));
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    try {
      localStorage.setItem('deeplix_privacy_consent', 'rejected_optional');
      localStorage.setItem('deeplix_consent_preferences', JSON.stringify({
        essential: true,
        analytics: false,
        personalization: false,
      }));
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in"
      id="privacy-policy-consent-overlay"
    >
      <div 
        className="w-full max-w-xl bg-zinc-950 border border-zinc-850 rounded-2xl shadow-cyan-glow-intense overflow-hidden text-left relative"
        id="privacy-consent-modal-box"
      >
        {/* Apple style blue line header accent */}
        <div className="h-1 bg-cyan-800"></div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Top Title & Icon */}
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-lg bg-cyan-900 border border-cyan-850 text-cyan-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white tracking-tight">
                Privacy & Custom Cookies
              </h3>
              <p className="text-[10px] font-sans text-zinc-400 uppercase tracking-widest">
                Data Sovereignty Protocol
              </p>
            </div>
          </div>

          {/* Policy Intro text */}
          <div className="text-xs sm:text-xs text-zinc-300 leading-relaxed space-y-2">
            <p>
              We protect your digital space. <strong className="font-semibold text-white">deepliX</strong> uses local sandbox parameters to keep your calculators, inquiry histories, and navigation preferences safe and immediate.
            </p>
            <p>
              Check our full{' '}
              <button 
                onClick={() => {
                  onNavigate('privacy');
                  setIsVisible(false);
                }}
                className="text-cyan-800 hover:underline inline font-semibold bg-transparent border-none p-0 cursor-pointer"
              >
                Privacy Policy
              </button>{' '}
              and{' '}
              <button 
                onClick={() => {
                  onNavigate('terms');
                  setIsVisible(false);
                }}
                className="text-cyan-800 hover:underline inline font-semibold bg-transparent border-none p-0 cursor-pointer"
              >
                Terms of Service
              </button>{' '}
              for details.
            </p>
          </div>

          {/* Preferences detail section toggled */}
          {showPreferences && (
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4 animate-slide-in">
              <h4 className="text-xs font-sans font-bold text-cyan-800 uppercase tracking-wide flex items-center">
                <Settings2 className="h-3.5 w-3.5 mr-2 text-cyan-800" />
                Customize Caches
              </h4>
              
              <div className="space-y-3 divide-y divide-zinc-800">
                {/* 1. Essential Settings */}
                <div className="flex items-center justify-between pt-0">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-white flex items-center">
                      Essential Variables
                      <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-sans bg-zinc-800 text-zinc-400 rounded">REQUIRED</span>
                    </span>
                    <p className="text-[11px] text-zinc-400">Stores admin log states, layout configurations, and basic cookies.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={true}
                    disabled={true}
                    className="h-4 w-4 rounded bg-zinc-900 border-zinc-800 text-cyan-800 focus:ring-0 opacity-60"
                  />
                </div>

                {/* 2. Analytical Statistics */}
                <div className="flex items-center justify-between pt-3">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-white">Analytical Metrics</span>
                    <p className="text-[11px] text-zinc-400">Monitors click patterns and helps optimize load speeds.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="h-4 w-4 rounded bg-zinc-900 border-zinc-800 text-cyan-800 focus:ring-cyan-800 cursor-pointer"
                  />
                </div>

                {/* 3. Personalization Cache */}
                <div className="flex items-center justify-between pt-3">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-white">Interactive Personalization</span>
                    <p className="text-[11px] text-zinc-400">Restores previously calculated values inside our system simulators.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.personalization}
                    onChange={(e) => setPreferences({ ...preferences, personalization: e.target.checked })}
                    className="h-4 w-4 rounded bg-zinc-900 border-zinc-800 text-cyan-800 focus:ring-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="text-xs text-zinc-300 hover:text-cyan-850 cursor-pointer inline-flex items-center bg-transparent border-none p-0 font-medium"
              id="toggle-consent-details"
            >
              <Settings2 className="h-4 w-4 mr-1.5 text-cyan-800" />
              {showPreferences ? 'Hide Customization' : 'Customize Caches'}
            </button>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-transparent hover:bg-zinc-950 text-zinc-400 border border-zinc-800 text-xs font-medium rounded transition-all cursor-pointer"
                id="reject-non-essential-con"
              >
                Reject Optional
              </button>

              {showPreferences ? (
                <button
                  onClick={handleSavePreferences}
                  className="px-5 py-2 bg-cyan-800 hover:bg-cyan-500 text-white text-xs font-bold rounded transition-all cursor-pointer"
                  id="save-consent-choices"
                >
                  Save Choices
                </button>
              ) : (
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2 bg-cyan-800 hover:bg-cyan-500 text-white text-xs font-semibold rounded transition-all cursor-pointer flex items-center shadow-xs"
                  id="accept-all-consent-btn"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
                  Accept All
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
