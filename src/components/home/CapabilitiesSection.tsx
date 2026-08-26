import React from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";
import { capabilities } from "../../data/capabilities";

interface CapabilitiesSectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="capabilities-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionTag color="#00BFFF">Core Disciplines</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              The systems behind your operations.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-[#A1A1AA]">
              Five core engineering disciplines, one single goal: operational technology that quietly works at scale.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {capabilities.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <button
                type="button"
                onClick={() => onNavigate("solutions", c.slug)}
                data-testid={`capability-card-${c.slug}`}
                className="group flex h-full w-full flex-col text-left rounded-3xl border border-white/10 bg-[#1E1E1E] p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#121212] border border-white/10 text-[#00BFFF] shadow-soft-sm group-hover:scale-105 transition-transform">
                    <c.icon size={21} strokeWidth={2.2} />
                  </span>
                  <span className="font-mono text-sm font-bold text-[#71717A] group-hover:text-[#00BFFF] transition-colors">
                    {c.num}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#E4E4E7]">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{c.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.builds.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-[#121212] border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#A1A1AA]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#00BFFF]">
                  Explore Solution
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

