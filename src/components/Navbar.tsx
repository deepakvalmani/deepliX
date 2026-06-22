/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Activity, CornerDownRight, Terminal } from 'lucide-react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  inquiryCount: number;
}

export default function Navbar({ currentPage, setCurrentPage, inquiryCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
  ] as const;

  const handleNavigate = (pageId: PageType) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex cursor-pointer items-center space-x-3 group"
            id="nav-logo-group"
          >
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)] animate-pulse"></div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 uppercase transition-colors">
                deepli<span className="text-cyan-400">X</span>
              </span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-zinc-500 leading-none">automate smarter work faster</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8" id="desktop-nav-items">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`font-sans text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  currentPage === item.id 
                    ? 'text-cyan-400' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-cyan-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions (Primary CTA) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavigate('contact')}
              className="px-4 py-2 bg-cyan-800 hover:bg-cyan-500 text-white font-sans text-xs font-semibold rounded transition-all cursor-pointer shadow-sm"
              id="nav-cta-contact"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 cursor-pointer"
              id="mobile-hamburger-btn"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950" id="mobile-nav-panel">
          <div className="space-y-2 px-4 pt-3 pb-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left py-2 px-3 rounded text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'bg-zinc-900 text-cyan-400 border-l-2 border-cyan-400 pl-2' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-zinc-800 my-3"></div>
            <div className="flex flex-col space-y-2 px-3 pt-1">
              <button
                onClick={() => handleNavigate('contact')}
                className="mt-2 w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-sans text-xs font-bold rounded text-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
