/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, Shield, Terminal } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: PageType) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 font-sans text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Top visual grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 pb-10 border-b border-zinc-900" id="footer-links-grid">
          
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <div onClick={() => handleLinkClick('home')} className="cursor-pointer flex items-center space-x-2">
              <div className="relative flex h-7 w-7 items-center justify-center rounded bg-cyan-950 border border-cyan-900">
                <span className="font-mono text-[10px] font-semibold text-cyan-400">dX</span>
              </div>
              <span className="text-base font-bold text-white tracking-tight">deepli<span className="text-cyan-400">X</span></span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              We construct clean, unified setups and data pipelines to connect your tools. Our custom automation systems replace messy, manual tasks with simple, reliable computer code.
            </p>
            <div className="flex items-center space-x-4 pt-1">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-medium text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                <span>All Systems Operational</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-medium text-zinc-500">
                <Shield className="h-2.5 w-2.5 text-zinc-400" />
                <span>SSL Encrypted</span>
              </span>
            </div>
          </div>

          {/* Infrastructure Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">Our Services</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Data Pipelines
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Workflow Engines
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Smart AI Tools
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Admin Dashboards
                </button>
              </li>
            </ul>
          </div>

          {/* Engineering Philosophy Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">Company</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  System Reliability
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Get in Touch
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('admin')} className="hover:text-cyan-400 text-left transition-colors cursor-pointer flex items-center">
                  <Terminal className="h-2.5 w-2.5 mr-1" />
                  Admin Page
                </button>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">SLA & Code</h4>
            <ul className="mt-3 space-y-2 text-xs text-zinc-500">
              <li className="flex items-center">
                <span>99.9% Up-time Target</span>
              </li>
              <li className="flex items-center">
                <span>Clean Typed Code</span>
              </li>
              <li className="flex items-center">
                <span>Free Visual Plans</span>
              </li>
              <li className="flex items-center">
                <span>Secure Data Design</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500" id="footer-bottom">
          <div>
            <p>© {currentYear} deepliX digital infrastructure systems. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <button onClick={() => handleLinkClick('terms')} className="hover:text-zinc-300 transition-colors cursor-pointer text-left bg-transparent border-none p-0">Terms of Service</button>
            <button onClick={() => handleLinkClick('privacy')} className="hover:text-zinc-300 transition-colors cursor-pointer text-left bg-transparent border-none p-0">Privacy Policy</button>
            <button onClick={() => handleLinkClick('security')} className="hover:text-zinc-300 transition-colors cursor-pointer text-left bg-transparent border-none p-0">Security Policy</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
