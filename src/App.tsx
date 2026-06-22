/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import LeadInquiriesHub from './components/LeadInquiriesHub';
import AdminLogin from './components/AdminLogin';
import ConsentBanner from './components/ConsentBanner';
import { PageType, InboundInquiry } from './types';
import { Terminal, Shield } from 'lucide-react';

// Seeding standard high-fidelity B2B client requests
const INITIAL_DEMO_LEADS: InboundInquiry[] = [
  {
    id: 'demo-lead-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@vellumchem.com',
    company: 'Vellum Chemical Logistics',
    title: 'VP of Digital Orchestrations',
    bottlenecks: ['data-engineering', 'system-integration'],
    message: 'We have three separate transactional PostgreSQL database shards representing local shipping manifests that suffer from severe synchronization lag. Analytical queries take 24-48 hours to compile due to index friction. We require real-time CDC loops to stage clean rows in our BigQuery analytics core.',
    scale: 'enterprise',
    createdAt: new Date(Date.now() - 3.5 * 3600000).toISOString(), // 3.5 hrs ago
    status: 'pending_review',
    referenceId: 'REF-84249-DX'
  },
  {
    id: 'demo-lead-2',
    name: 'Elena Rostova',
    email: 'e.rostova@solisenergy.io',
    company: 'Solis Energy Analytics',
    title: 'Principal of Automation Systems',
    bottlenecks: ['workflow-automation', 'cognitive-ai'],
    message: 'Engineers manually extract energy throughput reports from static PDFs, referencing an internal wiki before alerting regional maintenance teams. We are seeking to deploy an automated ingestion stage with pgvector, running contextual Gemini API summaries to isolate and dispatch actions.',
    scale: 'mid-market',
    createdAt: new Date(Date.now() - 14 * 3600000).toISOString(), // 14 hours ago
    status: 'scheduled',
    referenceId: 'REF-29204-DX'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [inboundLeads, setInboundLeads] = useState<InboundInquiry[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('deeplix_admin_auth') === 'granted';
    } catch {
      return false;
    }
  });

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem('deeplix_admin_auth', 'granted');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('deeplix_admin_auth');
    } catch (e) {
      console.error(e);
    }
  };
  // Force light theme on mount
  useEffect(() => {
    try {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } catch (e) {
      console.error('Failed to sync light theme on root document:', e);
    }
  }, []);

  // Load and seed inquiries from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('deeplix_inquiries_db');
      if (stored) {
        setInboundLeads(JSON.parse(stored));
      } else {
        localStorage.setItem('deeplix_inquiries_db', JSON.stringify(INITIAL_DEMO_LEADS));
        setInboundLeads(INITIAL_DEMO_LEADS);
      }
    } catch (e) {
      console.error('Failed to resolve LocalStorage registries, defaulting to state:', e);
      setInboundLeads(INITIAL_DEMO_LEADS);
    }
  }, []);

  // Handlers
  const handleAddNewLead = (formInputs: Omit<InboundInquiry, 'id' | 'createdAt' | 'status' | 'referenceId'>) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `REF-${randomSuffix}-DX`;
    const newId = `lead-${Date.now()}`;
    
    const newLead: InboundInquiry = {
      ...formInputs,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'pending_review',
      referenceId
    };

    const updatedLeads = [newLead, ...inboundLeads];
    setInboundLeads(updatedLeads);
    localStorage.setItem('deeplix_inquiries_db', JSON.stringify(updatedLeads));
    return newLead;
  };

  const getPendingAuditCount = () => {
    return inboundLeads.filter(l => l.status === 'pending_review').length;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white" id="deeplix-root-container">
      
      {/* Main navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        inquiryCount={inboundLeads.length}
      />

      {/* Main layout frame */}
      <main className="flex-1">
        
        {/* Render pages depending on active state */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-4">
          {currentPage === 'home' && (
            <Home setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'services' && (
            <Services setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'about' && (
            <About />
          )}

          {currentPage === 'contact' && (
            <Contact 
              onSubmitLead={handleAddNewLead} 
              setCurrentPage={setCurrentPage} 
            />
          )}

          {currentPage === 'terms' && (
            <Terms />
          )}

          {currentPage === 'privacy' && (
            <Privacy />
          )}

          {currentPage === 'security' && (
            <Security />
          )}

          {currentPage === 'admin' && (
            !isAdminLoggedIn ? (
              <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left border-b border-zinc-900 pb-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">Admin Dashboard</span>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">Customer Messages</h1>
                    <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                      Read custom messages sent by website visitors and change their status logs here.
                    </p>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-950/80 border border-red-900/60 text-red-400 font-mono text-[11px] rounded transition-all cursor-pointer inline-flex items-center self-start sm:self-center"
                    id="admin-logout-btn"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 mr-2 animate-pulse"></span>
                    Log Out Admin
                  </button>
                </div>
                
                <LeadInquiriesHub 
                  inboundLeads={inboundLeads}
                  setInboundLeads={setInboundLeads}
                  onContactClick={() => setCurrentPage('contact')}
                />
              </div>
            )
          )}
        </div>

      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* GDPR/Privacy and Cookie Consent Banner */}
      <ConsentBanner onNavigate={setCurrentPage} />

    </div>
  );
}
