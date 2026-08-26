import React, { useEffect } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";

interface PrivacyPolicyViewProps {
  onNavigate: (view: string) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section data-testid="privacy-policy-page" className="relative min-h-screen bg-[#121212] text-[#E4E4E7] overflow-hidden px-6 pb-28 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1AA] hover:text-[#00BFFF] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <Reveal>
          <SectionTag color="#00BFFF">Legal &amp; Trust</SectionTag>
          <h1 className="mt-4 text-4xl font-extrabold text-[#E4E4E7] sm:text-5xl tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-xs text-[#A1A1AA]">
            Last Updated: August 12, 2026 · Effective Date: January 1, 2026
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-2xl sm:p-12 text-[#A1A1AA] leading-relaxed text-sm">
          <div className="flex items-center gap-3 rounded-2xl bg-[#00BFFF]/10 p-4 text-xs font-semibold text-[#E4E4E7] border border-[#00BFFF]/30">
            <ShieldCheck size={20} className="shrink-0 text-[#00BFFF]" />
            <p>
              At deepliX, we build enterprise data and automation infrastructure. We treat client system data, architecture blueprints, and contact credentials with strict confidentiality and security.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7] flex items-center gap-2">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-[#A1A1AA]">
              When you interact with our website, request a system audit, or use our System Architecture Blueprint Builder, we may collect the following information:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#A1A1AA]">
              <li>
                <strong className="text-[#E4E4E7]">Contact Information:</strong> Name, work email address, company name, and job title when submitted through our contact forms.
              </li>
              <li>
                <strong className="text-[#E4E4E7]">Architecture Blueprint Specs:</strong> Selected software tool stacks (e.g. Salesforce, SAP, PostgreSQL) and custom business outcomes specified in our blueprint builder.
              </li>
              <li>
                <strong className="text-[#E4E4E7]">Technical Usage Data:</strong> IP address, browser type, device details, and session interactions gathered through essential functional cookies.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">
              2. How We Use Your Information
            </h2>
            <p className="mt-2 text-[#A1A1AA]">
              We process your data exclusively for legitimate business purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#A1A1AA]">
              <li>To evaluate and respond to your technical architecture requests.</li>
              <li>To prepare customized system integration blueprints and proposal estimates.</li>
              <li>To deliver and improve our website performance, security, and developer tools.</li>
              <li>To send relevant operational updates regarding your project or inquiry.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">
              3. Data Protection &amp; Confidentiality
            </h2>
            <p className="mt-2 text-[#A1A1AA]">
              We enforce strict administrative, physical, and technical safeguards. All data transfers are encrypted via SSL/TLS (HTTPS). Submitted lead records and blueprint specifications are stored in secure access-controlled databases with strict role-based authorization.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">
              4. Third-Party Sharing
            </h2>
            <p className="mt-2 text-[#A1A1AA]">
              We <strong className="text-[#E4E4E7]">never sell, rent, or trade</strong> your business data or contact details to third parties. Data is shared with service providers solely for core infrastructure hosting (e.g., MongoDB, Cloud Run) and transaction notifications under standard non-disclosure terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">
              5. Your Rights (GDPR &amp; CCPA)
            </h2>
            <p className="mt-2 text-[#A1A1AA]">
              Depending on your location, you have the right to request access to, correction of, or deletion of your personal and business records stored by deepliX. To exercise these rights, please contact our Data Protection Officer at <a href="mailto:privacy@deeplix.com" className="text-[#00BFFF] underline font-semibold">privacy@deeplix.com</a>.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
            <span>© {new Date().getFullYear()} deepliX Systems Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <button type="button" onClick={() => onNavigate("terms")} className="hover:text-[#00BFFF] transition-colors">Terms of Service</button>
              <button type="button" onClick={() => onNavigate("cookies")} className="hover:text-[#00BFFF] transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
