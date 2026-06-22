/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Lock, Terminal, Radio, Server, CheckCircle2 } from 'lucide-react';

export default function Security() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 text-left" id="security-policy-page">
      <div className="space-y-8 animate-fade-in">
        
        {/* Header section */}
        <div className="border-b border-zinc-900 pb-8">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Lock className="h-4 w-4" />
            <span>Infrastructure Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Security Policy
          </h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">
            Last Modified: June 18, 2026 · Version 3.4
          </p>
        </div>

        {/* Intro paragraph */}
        <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
          <p>
            Operating robust digital systems demands high-grade physical and logical security frameworks. At <strong className="text-white">deepliX</strong>, we design our software architectures with isolation, least-privilege structures, and modern cryptographic checks in mind.
          </p>
          <p>
            This statement outlines the technical steps we enforce to protect administrative endpoints, secure shared specifications, and guarantee system durability.
          </p>
        </div>

        {/* Security parameters */}
        <div className="space-y-8 pt-4">

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-400" />
              1. Encryption and Transport Standards
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All digital interactions traversing our network pathways are bound over secure SSL/TLS channels. We enforce the following:
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-400 pl-7 list-disc">
              <li>High-grade <strong>AES-256 encryption</strong> for client-facing and storage structures.</li>
              <li>Strict Transport Security (HSTS) flags configured across our hosting load-balancers to reject unencrypted requests.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              2. Strict Isolation of System Secrets
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Our code design follows the rule of strict isolation. We do not write raw access credentials, databases keys, or integration tokens directly directly into public files. If client tasks require custom AI triggers or third-party connections, requests are processed using secure proxy APIs on closed server modules.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              3. Administrative Authentication Controls
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The Administrative Customer Inquiries Hub is fully fortified with an authorization prompt. No customer messages or specs are publicly readable or indexable by search engine crawling crawlers:
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-400 pl-7 list-disc">
              <li>Session validations are assigned securely when passwords match administrative keys or certificates.</li>
              <li>Logs and state records are monitored periodically to alert us to unauthorized, repetitive login failures.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="h-4 w-4 text-cyan-400" />
              4. Software Auditing & Dependency Checks
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We employ automated dependencies audits in our continuous build steps. This guarantees that background packages are checked for known CVE exposures and updated swiftly to maintain pristine operational status.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="h-4 w-4 text-cyan-400" />
              5. Vulnerability Disclosure & Audit Reports
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We embrace responsible security disclosure. If you discover a systemic loophole, custom script error, or operational exposure in our infrastructure code, please do not disclose it publicly. Contact our security principals directly to let us isolate and resolve the issue safely.
            </p>
          </section>

        </div>

        {/* Security badge block */}
        <div className="rounded-lg border border-emerald-950 bg-emerald-950/5 p-5 mt-10 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Verified Infrastructure</span>
          </div>
          <p className="text-xs text-zinc-400">
            Our hosting architecture runs in secure, containerized environments featuring continuous uptime targets, redundant load balancing, and systematic firewall shields.
          </p>
        </div>

      </div>
    </div>
  );
}
