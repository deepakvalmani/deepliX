import React, { useEffect } from "react";
import { Cookie, ArrowLeft, CheckCircle2 } from "lucide-react";
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
    <section data-testid="cookie-policy-page" className="relative overflow-hidden px-6 pb-28 pt-28 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <Reveal>
          <SectionTag color="#8B5CF6">Cookie Declaration</SectionTag>
          <h1 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-3 font-mono text-xs text-slate-500">
            Last Updated: August 12, 2026 · Effective Date: January 1, 2026
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 rounded-[2.5rem] border card-border bg-white p-8 shadow-soft-md sm:p-12 text-slate-700 leading-relaxed text-sm">
          <div className="flex items-center gap-3 rounded-2xl bg-violet-50/80 p-4 text-xs font-semibold text-violet-900 border border-violet-100">
            <Cookie size={20} className="shrink-0 text-violet-600" />
            <p>
              deepliX uses essential first-party cookies to remember your blueprint builder selections and maintain admin session authentication state.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">1. What Are Cookies?</h2>
            <p className="mt-2 text-slate-600">
              Cookies are small text files stored in your web browser when you visit websites. They help recognize your device across page views and maintain interactive application state.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">2. Cookies We Set</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Cookie Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-3 font-mono text-blue-600 font-bold">deeplix_admin_auth</td>
                    <td className="p-3 font-semibold text-slate-700">Essential</td>
                    <td className="p-3">Removes login prompt for authenticated admin sessions.</td>
                    <td className="p-3">Session</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-blue-600 font-bold">deeplix_cookie_consent</td>
                    <td className="p-3 font-semibold text-slate-700">Preferences</td>
                    <td className="p-3">Remembers your cookie consent banner acknowledgment.</td>
                    <td className="p-3">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">3. Managing Cookies</h2>
            <p className="mt-2 text-slate-600">
              You can configure your browser settings to block or delete cookies at any time. However, disabling essential session storage may affect admin console authentication or blueprint builder persistence.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} deepliX Systems Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <button type="button" onClick={() => onNavigate("privacy")} className="hover:text-blue-600">Privacy Policy</button>
              <button type="button" onClick={() => onNavigate("terms")} className="hover:text-blue-600">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
