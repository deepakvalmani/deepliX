import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, Calendar, Linkedin, ExternalLink, Mail } from "lucide-react";
import { Logo } from "./Navbar";
import { capabilities } from "../data/capabilities";

interface FooterProps {
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const linkedinUrl = (import.meta.env.VITE_LINKEDIN_URL as string) || "https://www.linkedin.com/company/111716037/";

  return (
    <footer data-testid="footer" className="border-t border-white/10 bg-[#0A0A0A] text-[#A1A1AA]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand Col */}
          <div>
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="text-left"
            >
              <Logo light />
            </button>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
              deepliX engineers data pipelines, business automations, and unified operational infrastructure for scaling companies.
            </p>
            
            <div className="mt-5 flex items-center gap-3">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121212] px-3.5 py-1.5 text-xs text-[#E4E4E7] hover:border-[#00BFFF]/40 hover:text-[#00BFFF] transition-all"
              >
                <Linkedin size={13} className="text-[#00BFFF]" />
                <span>LinkedIn</span>
                <ExternalLink size={10} />
              </a>
              <a
                href="mailto:rajvalmani@gmail.com"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121212] px-3.5 py-1.5 text-xs text-[#E4E4E7] hover:border-[#00BFFF]/40 hover:text-[#00BFFF] transition-all"
              >
                <Mail size={13} className="text-[#00BFFF]" />
                <span>Email</span>
              </a>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#71717A]">
              deepliX · Founded 2025
            </p>
          </div>

          {/* Solutions Col */}
          <nav aria-label="Solutions">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#00BFFF]">Engineering Disciplines</p>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate("solutions", c.slug)}
                    data-testid={`footer-capability-${c.slug}`}
                    className="text-left text-[#A1A1AA] transition-colors duration-200 hover:text-[#00BFFF]"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Pages Col */}
          <nav aria-label="Company & Legal">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#00BFFF]">Navigation &amp; Tools</p>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              {[
                ["Home", "home"],
                ["Solutions & Architecture", "solutions"],
                ["Methodology & Process", "how-we-work"],
                ["About & Founder", "about"],
                ["Interactive Systems Lab", "systems-lab"],
                ["Architecture Blueprint Tool", "blueprint"],
                ["Careers", "careers"],
                ["Contact & Inquiry", "contact"],
                ["Admin Operations Portal", "admin"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    data-testid={`footer-link-${id}`}
                    className="text-left text-[#A1A1AA] transition-colors duration-200 hover:text-[#E4E4E7] flex items-center gap-1.5"
                  >
                    {id === "blueprint" && <Sparkles size={12} className="text-[#00BFFF]" />}
                    {id === "admin" && <ShieldCheck size={12} className="text-[#00BFFF]" />}
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Col */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#00BFFF]">Instant Booking</p>
            <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
              Schedule a 1-on-1 technical discovery meeting with founder Deepak Raj to map your operations.
            </p>

            <div className="mt-5 space-y-3">
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  data-testid="footer-book-meeting-button"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#00BFFF]/40 bg-[#1E1E1E] px-5 py-2.5 text-xs font-bold text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#121212] transition-all shadow-glow-blue"
                >
                  <Calendar size={14} />
                  <span>Book Instant Call (Calendly)</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigate("contact")}
                data-testid="footer-start-conversation-button"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-5 py-2.5 text-xs font-bold text-[#121212] transition-all duration-300 hover:shadow-glow-blue hover:brightness-110"
              >
                <span>Send Direct Message</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Legal Subfooter */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 deepliX. Built with engineered precision.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => onNavigate("privacy")}
              data-testid="footer-bottom-privacy"
              className="hover:text-[#E4E4E7] transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate("cookies")}
              data-testid="footer-bottom-cookies"
              className="hover:text-[#E4E4E7] transition-colors"
            >
              Cookie Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate("terms")}
              data-testid="footer-bottom-terms"
              className="hover:text-[#E4E4E7] transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00BFFF]">
            Fragmented operations → Connected infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
};
