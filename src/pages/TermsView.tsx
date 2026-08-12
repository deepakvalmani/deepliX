import React, { useEffect } from "react";
import { Scale, ArrowLeft, Shield } from "lucide-react";
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
    <section data-testid="terms-page" className="relative overflow-hidden px-6 pb-28 pt-28 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <Reveal>
          <SectionTag color="#3B82F6">Terms &amp; Conditions</SectionTag>
          <h1 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono text-xs text-slate-500">
            Last Updated: August 12, 2026 · Effective Date: January 1, 2026
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 rounded-[2.5rem] border card-border bg-white p-8 shadow-soft-md sm:p-12 text-slate-700 leading-relaxed text-sm">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">1. Agreement to Terms</h2>
            <p className="mt-2 text-slate-600">
              By accessing or using the deepliX platform, interactive Systems Architecture Blueprint Builder, or related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">2. Professional Services &amp; Scope</h2>
            <p className="mt-2 text-slate-600">
              deepliX provides custom data infrastructure, pipeline engineering, AI RAG assistants, and operations automation. All formal client engagements are governed by custom Master Services Agreements (MSA) and Statements of Work (SOW) executed separately between deepliX and the client.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">3. Intellectual Property Rights</h2>
            <p className="mt-2 text-slate-600">
              The proprietary visual blueprints, source codes, interactive simulators, logos, and trademarks displayed on this site are the exclusive property of deepliX. Clients retain full ownership of their proprietary business data and software schema specifications submitted through our tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">4. System Architecture Blueprint Tool</h2>
            <p className="mt-2 text-slate-600">
              The Architecture Blueprint Builder is an interactive estimation and planning tool provided for informational purposes. Architecture recommendations generated on the platform are subject to discovery verification during formal technical scoping.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">5. Limitation of Liability</h2>
            <p className="mt-2 text-slate-600">
              In no event shall deepliX or its officers be liable for indirect, incidental, or consequential damages arising from website usage or reliance on exploratory blueprint estimations prior to formal engagement contract execution.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} deepliX Systems Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <button type="button" onClick={() => onNavigate("privacy")} className="hover:text-blue-600">Privacy Policy</button>
              <button type="button" onClick={() => onNavigate("cookies")} className="hover:text-blue-600">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
