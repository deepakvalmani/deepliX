/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageType } from '../types';
import { 
  ArrowRight, 
  Database, 
  Cpu, 
  BrainCircuit, 
  LayoutGrid, 
  Network, 
  ShieldAlert, 
  Clock, 
  Layers, 
  Wrench, 
  Workflow, 
  ServerCrash 
} from 'lucide-react';
import InteractiveBlueprint from '../components/InteractiveBlueprint';
import RoiCalculator from '../components/RoiCalculator';

interface HomeProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  
  const handleNavClick = (pageId: PageType) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const focusAreas = [
    {
      title: 'Data Systems',
      desc: 'We build clean data pipelines. We help you move, clean, and organize your business info so you can check it instantly.',
      icon: <Database className="h-5 w-5 text-cyan-400" />,
    },
    {
      title: 'Workflow Automation',
      desc: 'We connect your software. We use simple web triggers and API connecters to stop boring, manual daily work.',
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
    },
    {
      title: 'Easy AI Tools',
      desc: 'We install smart search and automated AI help. We make it easy for your team to ask questions and find internal answers fast.',
      icon: <BrainCircuit className="h-5 w-5 text-cyan-400" />,
    },
    {
      title: 'Custom Dashboards',
      desc: 'We design simple admin screens. We build custom dashboards so your staff can run business tools in one place easily.',
      icon: <LayoutGrid className="h-5 w-5 text-cyan-400" />,
    }
  ];

  return (
    <div className="space-y-24 pb-16 font-sans text-zinc-300" id="deeplix-home-page">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 overflow-hidden" id="section-hero">
        {/* Subtle light blue-gray grid pattern background */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(to_right,#e5edf6_1px,transparent_1px),linear-gradient(to_bottom,#e5edf6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-12 left-1/4 w-[340px] h-[140px] bg-cyan-950/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950/80 backdrop-blur-sm shadow-cyan-glow-intense">
            
            {/* Left Column (Main Hero Content) */}
            <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-zinc-800 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                We Build<br />
                Simple Digital Systems<br />
                for Your Business.
              </h1>
              
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                We design and build clean data pipelines, automatic tool connectors, and simple AI assistants. This stops slow, repetitive work and saves your team time.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="px-6 py-3.5 bg-cyan-800 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider text-xs transition-all flex items-center space-x-2 cursor-pointer rounded shadow-sm"
                >
                  <span>Start today</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5 font-semibold">Active Systems</span>
                  <span className="font-sans text-sm text-zinc-300 font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-800 rounded-full mr-1.5"></span>
                    42+ Active Systems
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Focus areas stack and Bottom metrics bar) */}
            <div className="lg:col-span-5 bg-zinc-900/40 p-8 sm:p-12 flex flex-col justify-between">
              <div className="flex-1 flex flex-col justify-center gap-8 pb-8 lg:pb-0">
                
                <div className="group cursor-default">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">01. Data Pipes</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">SAFE & FAST</span>
                  </div>
                  <div className="h-[1px] w-full bg-zinc-800 mb-3"></div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Simple ways to collect, move, and organize all your company data in one place.
                  </p>
                </div>

                <div className="group cursor-default">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">02. Automation</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">EASY CONNECTORS</span>
                  </div>
                  <div className="h-[1px] w-full bg-zinc-800 mb-3"></div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We connect your daily business systems so they share information automatically.
                  </p>
                </div>

                <div className="group cursor-default">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">03. Simple AI</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">HELPFUL BOT</span>
                  </div>
                  <div className="h-[1px] w-full bg-zinc-800 mb-3"></div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Use simple AI tools to search your files and answer employee questions in seconds.
                  </p>
                </div>

                <div className="group cursor-default">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">04. Admin Screens</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">DASHBOARDS</span>
                  </div>
                  <div className="h-[1px] w-full bg-zinc-800 mb-3"></div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We build easy screens and tools so your staff can monitor and run your business.
                  </p>
                </div>

              </div>

              {/* Bottom statistics panel inside the Split layout block */}
              <div className="h-24 border-t border-zinc-800 flex items-center pt-6 bg-transparent">
                <div className="flex-1 flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">Our Focus</span>
                  <span className="text-xs text-zinc-400">We help you long-term, not just once.</span>
                </div>
                <div className="w-px h-10 bg-zinc-800 mx-6"></div>
                <div className="flex-1 flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">Average Results</span>
                  <span className="text-xs text-cyan-400 font-bold">+32% Work Speed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="section-problem">
        <div className="border border-zinc-900 bg-zinc-950/30 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left intro text */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="font-mono text-xs text-red-400 uppercase tracking-widest flex items-center">
                <ShieldAlert className="h-4 w-4 mr-1.5" />
                The Problem
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Most businesses use too many separate apps.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                As your company grows, you buy more and more software. When these apps do not talk to each other, you have to copy-paste info, use slow spreadsheets, and make manual mistakes.
              </p>
              <p className="text-xs text-zinc-500 italic font-mono">
                This slow work can waste up to 30% of your team's work time.
              </p>
            </div>

            {/* Right bullet blocks */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-2 text-left">
                <div className="h-8 w-8 rounded bg-red-950/20 border border-red-900/40 flex items-center justify-center">
                  <ServerCrash className="h-4 w-4 text-red-400" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Broken Code</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Old programs built by past workers that break without telling anyone. This causes lost client info or database errors.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-2 text-left">
                <div className="h-8 w-8 rounded bg-red-950/20 border border-red-900/40 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-red-200" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Slow Manual Work</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Employees spending hours downloading files, matching invoice lines, and copy-pasting client info manually.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-2 text-left">
                <div className="h-8 w-8 rounded bg-red-950/20 border border-red-900/40 flex items-center justify-center">
                  <Layers className="h-4 w-4 text-red-200" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Delayed Reports</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Managers making important choices using old reports because collecting company data takes too long.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-2 text-left">
                <div className="h-8 w-8 rounded bg-red-950/20 border border-red-900/40 flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-red-200" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Expensive Tools</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Huge monthly bills from general automation tools that charge you more money for every simple step.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. SOLUTION OVERVIEW (deepliX Unified Core) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="section-solution">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">how we help</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How deepliX Makes Things Simple
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We build simple and lasting digital connections for you. We make sure all your apps talk to each other perfectly so your data is always safe and up to date.
          </p>
        </div>

        {/* Bento Focus grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="bento-focus-grid">
          {focusAreas.map((area, idx) => (
            <div 
              key={idx}
              className="border border-zinc-900 bg-zinc-950 p-6 rounded-xl space-y-4 hover:border-zinc-800 transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center rounded">
                  {area.icon}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{area.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{area.desc}</p>
              </div>
              
              <button 
                onClick={() => handleNavClick('services')}
                className="text-left font-mono text-[11px] text-cyan-400 hover:text-white flex items-center space-x-1 border-t border-zinc-900/80 pt-4 mt-2 cursor-pointer w-full"
              >
                <span>Learn More</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE BLUEPRINT DISPLAY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="section-blueprint">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">try it out</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Try our Interactive Sandbox</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Click the blocks below to see how data flows from one app to another automatically.
          </p>
        </div>

        <InteractiveBlueprint />
      </section>

      {/* 5. COOPERATION TRUST MODEL */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center" id="section-trust">
        <div className="border-y border-zinc-900 py-12 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Our Promise to You</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            “We are your long-term technology partner, not just a one-time helper.”
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Standard agencies build a quick software tool and disappear. deepliX stays with you. We help set up, run, and scale your systems. You can email or call us anytime you need help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 font-mono text-[10px] text-zinc-500">
            <span className="flex items-center space-x-1.5"><Workflow className="h-3.5 w-3.5 text-cyan-500" /> <span>99.9% Up-time Guarantee</span></span>
            <span className="flex items-center space-x-1.5"><Layers className="h-3.5 w-3.5 text-cyan-500" /> <span>You Own All of the Code</span></span>
            <span className="flex items-center space-x-1.5"><Network className="h-3.5 w-3.5 text-cyan-500" /> <span>We Check Your Systems 24/7</span></span>
          </div>
        </div>
      </section>

      {/* 6. FRICTION SCORE EVALUATOR (ROI CALCULATOR) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="section-roi-tool">
        <RoiCalculator setCurrentPage={setCurrentPage} />
      </section>

      {/* 7. BOTTOM CTA BRAND SECTION */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pb-8" id="section-cta-bottom">
        <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900/20 p-8 sm:p-12 overflow-hidden">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="relative space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Ready to make your business run cleaner?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Stop wasting time on slow, manual tasks. Talk to our head engineer today. We will look at your systems and hand you a free, simple plan to connect your software.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center px-6 py-3 bg-zinc-100 text-zinc-950 font-bold text-xs hover:bg-zinc-200 rounded transition-all cursor-pointer group"
              >
                <span>Get a Free Blueprint Plan</span>
                <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
