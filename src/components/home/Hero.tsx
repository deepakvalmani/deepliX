import React from "react";
import { ArrowRight } from "lucide-react";
import { InfrastructureVisual } from "./InfrastructureVisual";
import { SectionTag } from "../SectionTag";
import { Reveal } from "../Reveal";

interface HeroProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section data-testid="hero-section" className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] animate-orb-drift rounded-full bg-gradient-to-br from-blue-300/40 via-cyan-200/40 to-violet-300/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-56 top-40 h-[420px] w-[420px] animate-orb-drift rounded-full bg-gradient-to-br from-cyan-200/40 to-emerald-200/30 blur-3xl" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <SectionTag color="#06B6D4">Data · Automation · AI Infrastructure</SectionTag>
          </Reveal>

          <h1 className="mt-7 text-[2.85rem] font-extrabold leading-[1.04] tracking-tighter text-[#0F172A] sm:text-6xl lg:text-[4.25rem]">
            <Reveal delay={0.1}>
              <span className="block">Build the</span>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="text-gradient-bc block">infrastructure</span>
            </Reveal>
            <Reveal delay={0.3}>
              <span className="block">behind better business.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              deepliX helps businesses design, connect, automate, and manage the technology systems that keep their operations moving.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                data-testid="hero-start-conversation-button"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 bg-[length:160%_160%] px-7 py-3.5 text-sm font-bold text-white shadow-glow-blue transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-cyan"
              >
                Start a Conversation
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("capabilities")}
                data-testid="hero-explore-capabilities-button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-bold text-[#0F172A] backdrop-blur transition-colors duration-300 hover:border-blue-400 hover:text-blue-700"
              >
                Explore Our Capabilities
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.26em] text-slate-400">
              Fragmented operations <span className="text-blue-500">→</span> Connected infrastructure
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40}>
          <InfrastructureVisual />
        </Reveal>
      </div>
    </section>
  );
};
