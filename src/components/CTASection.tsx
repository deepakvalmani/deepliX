import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

interface CTASectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="cta-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] px-8 py-16 shadow-soft-xl sm:px-14 lg:px-20 lg:py-24">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-orb-drift rounded-full bg-[#00BFFF]/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 animate-orb-drift rounded-full bg-[#8B5CF6]/20 blur-3xl"
            style={{ animationDelay: "4s" }}
            aria-hidden="true"
          />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

          <div className="relative max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#00BFFF]">Start Here</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              Let's engineer the systems behind your business.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Tell us what you're trying to automate, integrate, synchronize, or understand. We'll map the exact technical architecture.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                data-testid="cta-start-conversation-button"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-7 py-3.5 text-sm font-bold text-[#121212] shadow-glow-blue transition-all duration-300 hover:brightness-110"
              >
                Start a Conversation
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("solutions")}
                data-testid="cta-explore-capabilities-button"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#121212] px-7 py-3.5 text-sm font-bold text-[#E4E4E7] transition-colors duration-300 hover:border-[#00BFFF]/50 hover:text-[#00BFFF]"
              >
                Explore Solutions &amp; Process
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

