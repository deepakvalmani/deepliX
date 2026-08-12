import React from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface CTASectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="cta-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-600 to-violet-600 px-8 py-16 shadow-soft-xl sm:px-14 lg:px-20 lg:py-24">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-orb-drift rounded-full bg-cyan-400/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 animate-orb-drift rounded-full bg-violet-400/30 blur-3xl"
            style={{ animationDelay: "4s" }}
            aria-hidden="true"
          />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

          <div className="relative max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-cyan-200">Start here</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let's simplify the systems behind your business.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Tell us what you're trying to improve, automate, connect, or understand.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                data-testid="cta-start-conversation-button"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0F172A] transition-all duration-300 hover:bg-cyan-300 hover:shadow-glow-cyan"
              >
                Start a Conversation
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("capabilities")}
                data-testid="cta-explore-capabilities-button"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
              >
                Explore What we do
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
