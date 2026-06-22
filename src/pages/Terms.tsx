/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, BookOpen, Scale, FileText, CheckCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 text-left" id="terms-of-service-page">
      <div className="space-y-8 animate-fade-in">
        
        {/* Header section */}
        <div className="border-b border-zinc-900 pb-8">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Scale className="h-4 w-4" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">
            Last Modified: June 18, 2026 · Version 2.1
          </p>
        </div>

        {/* Intro */}
        <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
          <p>
            Welcome to <strong className="text-white">deepliX</strong> ("deepliX", "we", "us", or "our"). These Terms of Service outline the legal and operational boundaries governing your access to and usage of our digital automation frameworks, custom pipeline builders, sandbox utilities, and consultancy software.
          </p>
          <p>
            By working with us, subscribing to our services, or interacting with our automated systems, you acknowledge that you have read, understood, and agreed to be legally bound by this agreement.
          </p>
        </div>

        {/* Core sections */}
        <div className="space-y-8 pt-4">
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">1</span>
              Scope of Engineering Services
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              deepliX provides customized digital integration tools, workflow triggers, and custom data processing blueprints. Our layouts represent software designs that must be configured with your secure keys. We build software frameworks designed to connect distinct third-party interfaces as detailed in individual custom design proposals.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">2</span>
              Client Code Ownership & Licensing
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unless otherwise documented in a signed Service Level Agreement (SLA):
            </p>
            <ul className="space-y-1 text-xs text-zinc-400 pl-7 list-disc">
              <li>All clean automation scripts, database structures, and custom processing flows delivered specifically to the client belong to the client upon full payment clearance.</li>
              <li>General tools, base library scaffolding, and modular design components remain the reusable intellectual property of deepliX.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">3</span>
              Administrative Credentials & Safety
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When utilizing our testing playgrounds or administrative dashboards, you are responsible for maintaining the privacy of temporary admin tokens and keys. You must never insert functional, raw server secrets or live credit cards into visual sandbox calculator forms. All diagnostic values calculated are informational estimates and do not guarantee hard processing schedules.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">4</span>
              Limitation of System Liability
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              deepliX builds software to connect tools. However, third-party software structures change without notice. We provide no direct warranties regarding unexpected third-party API downtimes, pipeline blocks caused by foreign data schema modifications, or database structural shifts created by external services. We offer technical fixes under specified SLA support tickets.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-900/40">5</span>
              Termination of System Access
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We reserve the right to temporarily freeze testing dashboard access or restrict inquiry portal actions for IP addresses submitting malicious code loops, visual script injection packets, or spam messages to our inbound lead queues.
            </p>
          </section>
        </div>

        {/* Contact/Support Box */}
        <div className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-5 mt-10 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <CheckCircle className="h-4 w-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Acceptable System Agreement</span>
          </div>
          <p className="text-xs text-zinc-400">
            If you have questions regarding these guidelines, please click the "Contact Us" button in the menu bar to coordinate our legal and engineering teams.
          </p>
        </div>

      </div>
    </div>
  );
}
