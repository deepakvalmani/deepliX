import React, { useEffect } from "react";
import { Cookie, ArrowLeft } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";

interface CookiePolicyViewProps {
  onNavigate: (view: string) => void;
}

export const CookiePolicyView: React.FC<CookiePolicyViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section data-testid="cookie-policy-page" className="relative min-h-screen bg-[#121212] text-[#E4E4E7] overflow-hidden px-6 pb-28 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1AA] hover:text-[#00BFFF] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <Reveal>
          <SectionTag color="#00BFFF">Cookie Declaration</SectionTag>
          <h1 className="mt-4 text-4xl font-extrabold text-[#E4E4E7] sm:text-5xl tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-3 font-mono text-xs text-[#A1A1AA]">
            Last Updated: August 12, 2026 · Effective Date: January 1, 2026
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-2xl sm:p-12 text-[#A1A1AA] leading-relaxed text-sm">
          <div className="flex items-center gap-3 rounded-2xl bg-[#00BFFF]/10 p-4 text-xs font-semibold text-[#E4E4E7] border border-[#00BFFF]/30">
            <Cookie size={20} className="shrink-0 text-[#00BFFF]" />
            <p>
              deepliX uses essential first-party cookies to remember your blueprint builder selections and maintain admin session authentication state.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">1. What Are Cookies?</h2>
            <p className="mt-2 text-[#A1A1AA]">
              Cookies are small text files stored in your web browser when you visit websites. They help recognize your device across page views and maintain interactive application state.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">2. Cookies We Set</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#18181B] text-[#E4E4E7] font-bold uppercase font-mono text-[10px] border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Cookie Name</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Purpose</th>
                    <th className="p-3.5">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#A1A1AA]">
                  <tr>
                    <td className="p-3.5 font-mono text-[#00BFFF] font-bold">deeplix_admin_auth</td>
                    <td className="p-3.5 font-semibold text-[#E4E4E7]">Essential</td>
                    <td className="p-3.5">Removes login prompt for authenticated admin sessions.</td>
                    <td className="p-3.5">Session</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono text-[#00BFFF] font-bold">deeplix_cookie_consent</td>
                    <td className="p-3.5 font-semibold text-[#E4E4E7]">Preferences</td>
                    <td className="p-3.5">Remembers your cookie consent banner acknowledgment.</td>
                    <td className="p-3.5">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#E4E4E7]">3. Managing Cookies</h2>
            <p className="mt-2 text-[#A1A1AA]">
              You can configure your browser settings to block or delete cookies at any time. However, disabling essential session storage may affect admin console authentication or blueprint builder persistence.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
            <span>© {new Date().getFullYear()} deepliX Systems Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <button type="button" onClick={() => onNavigate("privacy")} className="hover:text-[#00BFFF] transition-colors">Privacy Policy</button>
              <button type="button" onClick={() => onNavigate("terms")} className="hover:text-[#00BFFF] transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
