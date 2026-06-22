/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Hammer, Activity, Layers, HeartHandshake } from 'lucide-react';

export default function About() {
  const principles = [
    {
      title: 'Clear Visual Plans',
      desc: 'We plan and map every data connection before we write any code. This means no hidden programs and no messy app connections. You will always know how your data moves.',
      icon: <Layers className="h-4.5 w-4.5 text-cyan-400" />
    },
    {
      title: 'No Hidden Errors',
      desc: 'We build systems that do not hide errors. If a connection fails, the system automatically tries again or alerts us immediately. Business is never halted.',
      icon: <Activity className="h-4.5 w-4.5 text-cyan-400" />
    },
    {
      title: 'Unified Systems',
      desc: 'We do not build separate tools that add more work or logins. We connect your databases, accounting sheets, and customer databases into one smooth system.',
      icon: <Hammer className="h-4.5 w-4.5 text-cyan-400" />
    }
  ];

  return (
    <div className="space-y-20 pb-16 font-sans text-zinc-300" id="deeplix-about-page">
      
      {/* 1. Page Header */}
      <section className="relative pt-12 text-center space-y-4" id="about-header">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">About Us</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Our Core Ideas & Goals
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          deepliX is a digital setup company. We build clean technology structures that help growing companies connect and automate their workflows safely and simply.
        </p>
      </section>

      {/* 2. Philosophy Thesis Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" id="about-thesis">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-zinc-900 pt-10">
          <div className="md:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Why we started</span>
            <h3 className="text-lg font-bold text-white tracking-tight">The High Cost of Messy Software</h3>
          </div>
          <div className="md:col-span-8 text-sm text-zinc-400 space-y-5 leading-relaxed">
            <p>
              Modern companies use over 40 separate software apps. Workers copy-paste info all day, or write quick scripts to send data. When these scripts break, or the software changes, folders get corrupted and work stops.
            </p>
            <p>
              This is <span className="text-white font-semibold">software decay</span>. It wastes your team's valuable hours, creates mistakes, and makes your company run slowly.
            </p>
            <p>
              At deepliX, we believe your software tools should work together perfectly. We replace messy standalone apps with simple, centralized setups that connect your systems cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Principles Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10" id="about-principles">
        <div className="text-left max-w-3xl border-t border-zinc-900 pt-10 space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">How we work</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Three Main Rules</h2>
          <p className="text-xs text-zinc-400 max-w-xl">
            We follow three core rules whenever we write code or connect databases for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="principles-grid">
          {principles.map((p, i) => (
            <div 
              key={i}
              className="border border-zinc-900 bg-zinc-950 p-6 rounded-xl space-y-3 relative hover:border-zinc-800 transition-all text-left"
            >
              <div className="h-9 w-9 rounded bg-cyan-950/20 border border-cyan-900/40 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">{p.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Infrastructure Vetting Standards checklist */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" id="about-standards">
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950/30 p-8 space-y-6 text-left">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Testing standards</span>
            <h3 className="text-xl font-bold text-white tracking-tight">How we test your systems</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
            Every data pipeline or setup we build for you is thoroughly tested before it is turned on. We make sure it is fast, safe, and completely ready.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px] text-zinc-400">
            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-2">
              <span className="text-white font-bold block border-b border-zinc-900 pb-1.5 uppercase text-[10px]">1. Safety First</span>
              <p className="text-zinc-500 leading-normal text-[10px]">
                Type-safe code that prevents errors, continuous software checks, and secure fallback paths if the internet drops.
              </p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-2">
              <span className="text-white font-bold block border-b border-zinc-900 pb-1.5 uppercase text-[10px]">2. Information Isolation</span>
              <p className="text-zinc-500 leading-normal text-[10px]">
                Queue lists for problematic records, safe transaction undos, and privacy steps that hide sensitive customer details.
              </p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-2">
              <span className="text-white font-bold block border-b border-zinc-900 pb-1.5 uppercase text-[10px]">3. Easy Monitoring</span>
              <p className="text-zinc-500 leading-normal text-[10px]">
                Clear activity dashboards, system health checks, and instant notifications if something needs your attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Partnership Model */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pb-8" id="about-alignment">
        <div className="border hover:border-zinc-800 border-zinc-900 bg-zinc-950 p-8 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between text-left gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold flex items-center">
              <HeartHandshake className="h-3.5 w-3.5 text-cyan-400 mr-1.5 shrink-0" />
              Our commitment
            </span>
            <h4 className="text-base font-bold text-white tracking-tight">Long-term Support</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We stay by your side. We check your systems 24/7, monitor database safety, and fix any software changes so your business never slows down.
            </p>
          </div>
          <div className="text-center sm:text-right font-mono min-w-[140px]">
            <div className="text-3xl font-black text-cyan-400">99.9%</div>
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Up-time Target</div>
          </div>
        </div>
      </section>

    </div>
  );
}
