/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SERVICES_LIST } from '../data/servicesData';
import { 
  Database, 
  Cpu, 
  LayoutGrid, 
  BrainCircuit, 
  Network, 
  Check, 
  Terminal, 
  FileCode, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PageType } from '../types';

interface ServicesProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Services({ setCurrentPage }: ServicesProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_LIST[0].id);

  const activeService = SERVICES_LIST.find(s => s.id === selectedServiceId) || SERVICES_LIST[0];

  // Map service ID to React Icon
  const getServiceIcon = (id: string, className: string = "h-5 w-5 text-cyan-400") => {
    switch(id) {
      case 'data-engineering':
        return <Database className={className} />;
      case 'workflow-automation':
        return <Cpu className={className} />;
      case 'internal-systems':
        return <LayoutGrid className={className} />;
      case 'cognitive-ai':
        return <BrainCircuit className={className} />;
      case 'system-integration':
        return <Network className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <div className="space-y-16 pb-16 font-sans text-zinc-300" id="deeplix-services-page">
      
      {/* Page Header */}
      <section className="relative pt-12 text-center space-y-4" id="services-header">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">Our Services</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Simple Digital Services
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Check our services below to see how we help. We build clean, robust solutions that make your business run easily. We build to last.
        </p>
      </section>

      {/* Main split system specification layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="services-splitter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Service Menu Sidebar */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-20" id="services-sidebar-menu">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-3 mb-2 block">
              Choose a Service
            </span>
            {SERVICES_LIST.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center space-x-3.5 ${
                  selectedServiceId === service.id
                    ? 'bg-zinc-900 border-zinc-800 text-white shadow-md'
                    : 'bg-zinc-950/20 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/10'
                }`}
                id={`btn-service-${service.id}`}
              >
                <div className={`h-9 w-9 rounded flex items-center justify-center border transition-colors ${
                  selectedServiceId === service.id
                    ? 'bg-cyan-950/40 border-cyan-800/80'
                    : 'bg-zinc-900/60 border-zinc-800/80'
                }`}>
                  {getServiceIcon(service.id, selectedServiceId === service.id ? 'h-4 w-4 text-cyan-400' : 'h-4 w-4 text-zinc-500')}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold leading-tight truncate">{service.title}</h4>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5 truncate">{service.shortDesc}</p>
                </div>
              </button>
            ))}

            {/* Quick architectural consult card */}
            <div className="border border-zinc-900 bg-zinc-950 p-4 rounded-xl mt-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block">Custom Solutions</span>
              <h5 className="text-xs font-bold text-white">Have a custom software problem?</h5>
              <p className="text-[11px] text-zinc-400 leading-normal">
                If your company uses custom legacy tools, offline databases, or unique software systems, we can build custom connectors just for you.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-mono text-[10px] text-cyan-400 hover:text-white flex items-center space-x-1.5 pt-1.5 cursor-pointer"
              >
                <span>Talk to an Engineer</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right Spec Sheet Diagnostic Detail */}
          <div className="lg:col-span-8 border border-zinc-800 bg-zinc-950/60 rounded-xl p-6 lg:p-8 space-y-8" id="services-details-pane">
            
            {/* Spec sheet header */}
            <div className="border-b border-zinc-900 pb-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-11 w-11 bg-cyan-950/30 border border-cyan-900/60 flex items-center justify-center rounded-lg">
                  {getServiceIcon(activeService.id, "h-5 w-5 text-cyan-400")}
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-medium">Service Detail</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{activeService.title}</h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {activeService.description}
              </p>
            </div>

            {/* Grid details (Business Value + Tech Stack) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Business Value focus area */}
              <div className="space-y-3 bg-zinc-900/20 border border-zinc-900 p-5 rounded-lg text-left">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  How this helps your business
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans font-medium">
                  {activeService.businessValue}
                </p>
                <div className="h-px bg-zinc-950 my-1"></div>
                <div className="text-[10px] text-zinc-500 leading-normal">
                  Our setups are built to save you time and decrease manual mistakes immediately.
                </div>
              </div>

              {/* Technologies list */}
              <div className="space-y-3 bg-zinc-900/20 border border-zinc-900 p-5 rounded-lg text-left">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
                  What tools we use
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded hover:border-zinc-700 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="h-px bg-zinc-950 my-1"></div>
                <div className="text-[10px] text-zinc-500 leading-normal">
                  We use safe, well-tested technologies that are fast and reliable.
                </div>
              </div>

            </div>

            {/* Deep Technical Specifications */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                What this system can do:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeService.specs.map((spec) => (
                  <li key={spec} className="flex items-start text-zinc-300 gap-2">
                    <Check className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-left">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded transition-all cursor-pointer"
                id="btn-service-inquire"
              >
                <span>Inquire About This Service</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* CTA section bottom */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center" id="services-bottom-cta">
        <div className="border border-zinc-900 bg-zinc-950 rounded-xl p-8 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white tracking-tight">Need a custom digital system?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We are experts at connecting databases and business tools. Schedule a quick call today to get a free plan for your business needs.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded transition-all cursor-pointer"
              >
                Schedule a Quick Call
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
