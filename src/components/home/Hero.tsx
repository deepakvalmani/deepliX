import React from "react";
import { ArrowRight, Calendar, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { InfrastructureVisual } from "./InfrastructureVisual";
import { SectionTag } from "../SectionTag";
import { Reveal } from "../Reveal";

interface HeroProps {
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <section data-testid="hero-section" className="relative overflow-hidden px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-36 bg-[#121212]">
      <div className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] animate-orb-drift rounded-full bg-gradient-to-br from-[#00BFFF]/18 via-[#06B6D4]/12 to-[#8B5CF6]/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-56 top-40 h-[420px] w-[420px] animate-orb-drift rounded-full bg-gradient-to-br from-[#06B6D4]/15 to-[#10B981]/10 blur-3xl" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/30 bg-[#1E1E1E] px-3.5 py-1 text-xs text-[#00BFFF] shadow-glow-blue mb-4">
              <span className="h-2 w-2 rounded-full bg-[#00BFFF] animate-ping" />
              <span>Engineered Operations &amp; Data Infrastructure</span>
            </div>
          </Reveal>

          <h1 className="mt-3 text-[2.85rem] font-extrabold leading-[1.04] tracking-tighter text-[#E4E4E7] sm:text-6xl lg:text-[4.25rem]">
            <Reveal delay={0.1}>
              <span className="block">Build the</span>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="text-gradient-electric block">systems &amp; data pipelines</span>
            </Reveal>
            <Reveal delay={0.3}>
              <span className="block">behind better business.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              deepliX designs, connects, automates, and manages the technology systems that eliminate manual bottlenecks and scale company operations.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  if (typeof onOpenBooking === "function") {
                    onOpenBooking();
                  } else {
                    onNavigate("contact");
                  }
                }}
                data-testid="hero-book-meeting-button"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00BFFF] via-[#38BDF8] to-[#06B6D4] px-6 py-3.5 text-sm font-bold text-[#121212] shadow-glow-blue transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 cursor-pointer"
              >
                <Calendar size={16} />
                <span>Book an Instant Meeting</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("solutions")}
                data-testid="hero-explore-solutions-button"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1E1E1E]/80 px-6 py-3.5 text-sm font-bold text-[#E4E4E7] backdrop-blur transition-all duration-300 hover:border-[#00BFFF]/40 hover:text-[#00BFFF]"
              >
                Explore Solutions
              </button>

              <button
                type="button"
                onClick={() => onNavigate("blueprint")}
                data-testid="hero-open-blueprint-button"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121212] px-4 py-3.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#E4E4E7] hover:border-white/20 transition-all"
              >
                <Sparkles size={14} className="text-[#00BFFF]" />
                <span>Build Blueprint</span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-9 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#71717A]">
              <span>Fragmented Workflows</span>
              <span className="text-[#00BFFF]">→</span>
              <span className="text-[#E4E4E7]">Unified Real-Time Architecture</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40}>
          <InfrastructureVisual />
        </Reveal>
      </div>
    </section>
  );
};
