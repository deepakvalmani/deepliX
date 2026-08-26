import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";

interface TermsViewProps {
  onNavigate: (view: string) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section data-testid="terms-page" className="relative min-h-screen bg-[#121212] text-[#E4E4E7] overflow-hidden px-6 pb-28 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1AA] hover:text-[#00BFFF] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <Reveal>
          <SectionTag color="#00BFFF">Terms &amp; Conditions</SectionTag>
          <h1 className="mt-4 text-4xl font-extrabold text-[#E4E4E7] sm:text-5xl tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono text-xs text-[#A1A1AA]">
            Last Updated: August 12, 2026 · Effective Date: January 1, 2026
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-2xl sm:p-12 text-[#A1A1AA] leading-relaxed text-sm">
          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">1. Agreement to Terms</h2>
            <p className="mt-2 text-[#A1A1AA]">
              By accessing or using the deepliX platform, interactive Systems Architecture Blueprint Builder, or related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">2. Professional Services &amp; Scope</h2>
            <p className="mt-2 text-[#A1A1AA]">
              deepliX provides custom data infrastructure, pipeline engineering, AI RAG assistants, and operations automation. All formal client engagements are governed by custom Master Services Agreements (MSA) and Statements of Work (SOW) executed separately between deepliX and the client.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">3. Intellectual Property Rights</h2>
            <p className="mt-2 text-[#A1A1AA]">
              The proprietary visual blueprints, source codes, interactive simulators, logos, and trademarks displayed on this site are the exclusive property of deepliX. Clients retain full ownership of their proprietary business data and software schema specifications submitted through our tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">4. System Architecture Blueprint Tool</h2>
            <p className="mt-2 text-[#A1A1AA]">
              The Architecture Blueprint Builder is an interactive estimation and planning tool provided for informational purposes. Architecture recommendations generated on the platform are subject to discovery verification during formal technical scoping.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">5. Limitation of Liability</h2>
            <p className="mt-2 text-[#A1A1AA]">
              In no event shall deepliX or its officers be liable for indirect, incidental, or consequential damages arising from website usage or reliance on exploratory blueprint estimations prior to formal engagement contract execution.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
            <span>© {new Date().getFullYear()} deepliX Systems Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <button type="button" onClick={() => onNavigate("privacy")} className="hover:text-[#00BFFF] transition-colors">Privacy Policy</button>
              <button type="button" onClick={() => onNavigate("cookies")} className="hover:text-[#00BFFF] transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
