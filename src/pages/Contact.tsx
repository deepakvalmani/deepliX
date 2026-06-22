/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, 
  Terminal, 
  Send, 
  Building, 
  User, 
  Mail, 
  FileText, 
  Activity 
} from 'lucide-react';
import { InboundInquiry, PageType } from '../types';

interface ContactProps {
  onSubmitLead: (lead: Omit<InboundInquiry, 'id' | 'createdAt' | 'status' | 'referenceId'>) => InboundInquiry;
  setCurrentPage: (page: PageType) => void;
}

export default function Contact({ onSubmitLead, setCurrentPage }: ContactProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [scale, setScale] = useState<InboundInquiry['scale']>('mid-market');
  
  // Selected Bottlenecks
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<string[]>([]);

  // Triage state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<InboundInquiry | null>(null);
  const [errorText, setErrorText] = useState('');

  const bottlenecksOptions = [
    { id: 'data-engineering', label: 'Data Ingestion & Pipelines' },
    { id: 'workflow-automation', label: 'Easy Work Automation' },
    { id: 'cognitive-ai', label: 'Smart AI & Search Assistants' },
    { id: 'internal-systems', label: 'Custom Admin Dashboards' },
    { id: 'system-integration', label: 'Full System Connection' }
  ];

  const handleBottleneckToggle = (optionId: string) => {
    if (selectedBottlenecks.includes(optionId)) {
      setSelectedBottlenecks(selectedBottlenecks.filter(id => id !== optionId));
    } else {
      setSelectedBottlenecks([...selectedBottlenecks, optionId]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name || !email || !company || !title) {
      setErrorText('Please fill in all of the fields (Your Name, Company, Job Title, and Email).');
      return;
    }

    if (selectedBottlenecks.length === 0) {
      setErrorText('Please select at least one service you need help with.');
      return;
    }

    // Submit via parent callback
    const ticket = onSubmitLead({
      name,
      email,
      company,
      title,
      message,
      scale,
      bottlenecks: selectedBottlenecks
    });

    setCreatedTicket(ticket);
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16 font-sans text-zinc-300" id="deeplix-contact-page">
      
      {/* Page Header */}
      <section className="relative pt-12 text-center space-y-4 animate-fade-in" id="contact-header">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">Contact Us</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Start a Conversation with Us
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Tell us about your business systems. Our team will review your info and give you a free, simple plan to connect and automate your software.
        </p>
      </section>

      {/* Main content body */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" id="contact-portal">
        {!formSubmitted ? (
          
          /* ACTIVE ENTRY FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left informational sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">
                How We Work
              </span>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1.5">
                  <span className="text-cyan-400 font-bold block text-[10px]">1. Current System Check</span>
                  <p className="text-zinc-500 leading-normal font-sans">
                    Our team looks at your current apps, spreadsheets, and databases to understand your setup.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1.5">
                  <span className="text-cyan-400 font-bold block text-[10px]">2. Simple Blueprint</span>
                  <p className="text-zinc-500 leading-normal font-sans">
                    We plan a simple graphic diagram showing how we can safely connect all your apps together.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1.5">
                  <span className="text-cyan-400 font-bold block text-[10px]">3. Briefing Call</span>
                  <p className="text-zinc-500 leading-normal font-sans">
                    We host a quick 30-minute call to show you the plan, answer questions, and show how much time you save.
                  </p>
                </div>
              </div>

              {/* Direct email line */}
              <div className="p-4 border border-zinc-900 bg-zinc-950/60 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-white font-sans">Direct Email</h4>
                <a 
                  href="mailto:rajvalmani@gmail.com" 
                  className="font-mono text-xs text-cyan-400 hover:underline block"
                >
                  rajvalmani@gmail.com
                </a>
                <span className="text-[10px] text-zinc-600 font-mono block">We usually reply in less than 4 hours.</span>
              </div>
            </div>

            {/* Right Entry Form Box */}
            <form onSubmit={handleFormSubmit} className="lg:col-span-8 border border-zinc-800 bg-zinc-950 rounded-xl p-6 lg:p-8 space-y-6 text-left shadow-xl" id="intake-form">
              
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-mono text-zinc-400 flex items-center">
                  <Terminal className="h-4 w-4 text-cyan-400 mr-2" />
                  Secure Message Form
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded flex items-center border border-emerald-900">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                  Safe and Secure
                </span>
              </div>

              {errorText && (
                <div className="p-3 bg-red-950/20 border border-red-900 text-red-400 text-xs rounded font-mono leading-relaxed text-left">
                  Error: {errorText}
                </div>
              )}

              {/* Grid metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center">
                    <Building className="h-3 w-3 mr-1.5 text-zinc-500" />
                    Your Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 text-zinc-100 placeholder-zinc-600 rounded px-3 py-2 text-xs focus:outline-none transition-all"
                  />
                </div>

                {/* Company Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center">
                    <FileText className="h-3 w-3 mr-1.5 text-zinc-500" />
                    Your Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 text-zinc-100 placeholder-zinc-600 rounded px-3 py-2 text-xs focus:outline-none transition-all"
                  />
                </div>

                {/* Representative Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center">
                    <User className="h-3 w-3 mr-1.5 text-zinc-500" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 text-zinc-100 placeholder-zinc-600 rounded px-3 py-2 text-xs focus:outline-none transition-all"
                  />
                </div>

                {/* Direct email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center">
                    <Mail className="h-3 w-3 mr-1.5 text-zinc-500" />
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 text-zinc-100 placeholder-zinc-600 rounded px-3 py-2 text-xs focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Segment Scale Select */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Your Company Size
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setScale('startup')}
                    className={`p-2 py-2.5 rounded border text-center transition-all cursor-pointer ${
                      scale === 'startup'
                        ? 'bg-zinc-900 border-zinc-700 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    Small Business
                  </button>
                  <button
                    type="button"
                    onClick={() => setScale('mid-market')}
                    className={`p-2 py-2.5 rounded border text-center transition-all cursor-pointer ${
                      scale === 'mid-market'
                        ? 'bg-zinc-900 border-cyan-800/80 text-cyan-400 font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    Medium Business
                  </button>
                  <button
                    type="button"
                    onClick={() => setScale('enterprise')}
                    className={`p-2 py-2.5 rounded border text-center transition-all cursor-pointer ${
                      scale === 'enterprise'
                        ? 'bg-zinc-900 border-purple-900/60 text-purple-400 font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    Large Enterprise
                  </button>
                </div>
              </div>

              {/* Core Bottleneck Checklists */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  What services do you need help with? (Select all that apply) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {bottlenecksOptions.map((opt) => {
                    const isSelected = selectedBottlenecks.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleBottleneckToggle(opt.id)}
                        className={`flex items-center p-3 rounded border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-zinc-900 border-cyan-800/80 text-white'
                            : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                        }`}
                      >
                        <div className={`h-4 w-4 rounded-sm border mr-3 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-cyan-500 bg-cyan-950 text-cyan-400' : 'border-zinc-800'
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project message block */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Anything else you want to share? (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us a bit about your current apps, files, or tasks..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 text-zinc-100 placeholder-zinc-600 rounded px-3 py-2 text-xs focus:outline-none transition-all resize-y"
                />
              </div>

              {/* Submit trigger */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-sans text-xs font-bold transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Your Message</span>
                </button>
                <span className="text-[10px] text-zinc-600 font-mono text-center block mt-2 leading-relaxed">
                  By sending this message, your request is safely saved in our list so we can review it and get back to you.
                </span>
              </div>

            </form>
          </div>
        ) : (
          
          /* INTAKE INTEL SUCCESS SCREEN */
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-8 max-w-2xl mx-auto space-y-6 text-left" id="intake-success">
            
            <div className="flex items-center space-x-3 text-emerald-400 border-b border-zinc-900 pb-4">
              <div className="h-10 w-10 rounded-full bg-emerald-950/20 border border-emerald-900/60 flex items-center justify-center animate-bounce">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block">Message Sent Successfully!</span>
                <h3 className="text-lg font-bold text-white tracking-tight">We have received your message</h3>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <p className="text-zinc-400 font-sans leading-relaxed">
                Thank you. We have saved your request. A team member is reviewing your parameters right now.
              </p>

              {createdTicket && (
                <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between border-b border-zinc-950 pb-2">
                    <span className="text-zinc-500">Your Ticket Number:</span>
                    <span className="text-white font-bold">#{createdTicket.referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Company:</span>
                    <span className="text-zinc-300">{createdTicket.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Status:</span>
                    <span className="text-emerald-400 font-bold uppercase">Reviewing</span>
                  </div>
                </div>
              )}

              {/* Roadmap steps visual timeline */}
              <div className="space-y-2 border-t border-zinc-900 pt-4">
                <h4 className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest block mb-2">What happens next:</h4>
                <div className="space-y-3.5 pl-2 relative border-l border-zinc-900">
                  <div className="relative">
                    <span className="absolute -left-3.5 h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-emerald-400 block font-bold uppercase">[DONE] Message Received</span>
                    <p className="text-[11px] text-zinc-500 font-sans mt-0.5">We have securely received and organized your system details.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-3.5 h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-[10px] text-amber-500 block font-bold uppercase">[ACTIVE] Assigning to an Engineer</span>
                    <p className="text-[11px] text-zinc-500 font-sans mt-0.5">We are matching your request with an engineer who specializes in your needs.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-3.5 h-2 w-2 rounded-full bg-zinc-800"></span>
                    <span className="text-[10px] text-zinc-600 block font-bold uppercase">[PENDING] Designing Your Plan</span>
                    <p className="text-[11px] text-zinc-500 font-sans mt-0.5">We will draft a simple, visual plan showing how we can connect your apps.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Inquiries monitoring CTA */}
            <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">See Your Message Live</span>
                <p className="text-xs text-zinc-400 mt-1">Click the link below to see how our admin dashboard lists and tracks customer messages in real time.</p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 bg-zinc-900 rounded border border-zinc-800 hover:border-cyan-500 hover:text-cyan-400 text-xs text-zinc-300 font-mono cursor-pointer transition-all font-bold shrink-0"
              >
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                <span>Open Inquiries Hub</span>
              </button>
            </div>

          </div>
        )}
      </section>

    </div>
  );
}
