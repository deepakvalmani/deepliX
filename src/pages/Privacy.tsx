/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Lock, Eye, CheckCircle, Database } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 text-left" id="privacy-policy-page">
      <div className="space-y-8 animate-fade-in">
        
        {/* Header section */}
        <div className="border-b border-zinc-900 pb-8">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Shield className="h-4 w-4" />
            <span>Operational Trust</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">
            Last Modified: June 18, 2026 · Version 1.9
          </p>
        </div>

        {/* Introduction text */}
        <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
          <p>
            At <strong className="text-white">deepliX</strong>, information isolation and security are core values of our system layouts. We understand how critical private corporate specs and client data pipelines are to your company. This Privacy Policy details exactly how we safeguard and process details when you visit our website, submit specs through our Inquiry Forms, or utilize our diagnostics platform.
          </p>
          <p>
            This policy applies only to the information collected directly by our website and during custom client intake workflows.
          </p>
        </div>

        {/* Dynamic points grid */}
        <div className="space-y-8 pt-4">
          
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">1</span>
              What Data We Capture & Why
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We collect minimal information to help assess engineering needs and route communications:
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-400 pl-7 list-disc">
              <li><strong>Inbound Client Specifications:</strong> Names, business emails, company size category, identified bottlenecks, and description logs. We use this to sketch custom architectural pipelines.</li>
              <li><strong>Local Session Settings:</strong> Interface theme preference (light vs. dark), temporary calculator metrics, and diagnostic drafts are cached safely directly inside your browser's <code className="text-cyan-400 font-mono bg-zinc-900 px-1 rounded">LocalStorage</code>. This keeps settings local and secure.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">2</span>
              Information Isolation and Protection
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We enforce a strict policy of <strong>no advertising sales</strong>. Your structural bottlenecks, data pipelines, email addresses, and server layouts are treated as confidential intellectual material. They are never sold, rented, or distributed to any third-party marketing companies. Data is accessed only by authorized principals evaluating your system.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">3</span>
              Cookie & Cache Utilization
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our website does not use invasive trackers or sell visitor analytics profiles. We utilize standard client-side sandbox cache files solely to preserve functional setups (for instance, rendering the correct light or dark page backgrounds seamlessly without screen flickers).
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">4</span>
              Your Legal Data Rights
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You maintain full control of your shared messages. You can request changes to our status columns, ask to purge historical correspondence tags, or inspect the stored parameters of your submitted specifications at any time by coordinating directly with our admins.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">5</span>
              Updates and Notifications
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              As we deploy additional security pipelines or update our platform code, this privacy document may undergo technical refinement. We encourage corporate clients to review this path regularly.
            </p>
          </section>

        </div>

        {/* Security assurance banner */}
        <div className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-5 mt-10 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Database className="h-4 w-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Storage Statement</span>
          </div>
          <p className="text-xs text-zinc-400">
            All database connections are encapsulated and SSL-protected. If you need a signed Non-Disclosure Agreement (NDA) before sharing complex custom architecture blueprints, contact our principal team.
          </p>
        </div>

      </div>
    </div>
  );
}
