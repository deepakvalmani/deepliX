import React, { useState, useEffect } from "react";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";

interface CookieBannerProps {
  onNavigate: (view: string) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("deeplix_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("deeplix_cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-banner"
      className="fixed bottom-5 left-5 right-5 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-[#0F172A]/95 p-4 shadow-soft-2xl backdrop-blur-xl text-white sm:p-5 animate-slide-up"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cookie size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              Essential Cookie &amp; Privacy Notice
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
              We use essential cookies to maintain system architecture state and admin authentication. Learn more in our{" "}
              <button
                type="button"
                onClick={() => onNavigate("privacy")}
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                Privacy Policy
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => onNavigate("cookies")}
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                Cookie Policy
              </button>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={accept}
            data-testid="cookie-accept-btn"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-glow-cyan hover:opacity-95 transition-all"
          >
            <Check size={13} strokeWidth={3} /> Accept
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss cookie notice"
            className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
