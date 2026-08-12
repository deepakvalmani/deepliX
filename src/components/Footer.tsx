import React from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Navbar";
import { capabilities } from "../data/capabilities";

interface FooterProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer data-testid="footer" className="bg-[#0B1220] text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              deepliX builds data, automation, analytics, and AI infrastructure for modern businesses.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Data · Automation · Intelligence
            </p>
          </div>

          <nav aria-label="Capabilities">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Capabilities</p>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate("capabilities", c.slug)}
                    data-testid={`footer-capability-${c.slug}`}
                    className="text-left transition-colors duration-300 hover:text-white"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Company</p>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              {[
                ["About deepliX", "about"],
                ["How We Work", "how-we-work"],
                ["Systems Lab", "systems-lab"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    data-testid={`footer-link-${id}`}
                    className="text-left transition-colors duration-300 hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Start here</p>
            <p className="mt-5 text-sm leading-relaxed">
              Tell us what you're trying to improve, automate, connect, or understand.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              data-testid="footer-start-conversation-button"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-all duration-300 hover:bg-cyan-300"
            >
              Start a Conversation
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} deepliX. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">Fragmented operations → Connected infrastructure</p>
        </div>
      </div>
    </footer>
  );
};
