import React from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const steps = [
  { label: "Discover", color: "#3B82F6" },
  { label: "Design", color: "#38BDF8" },
  { label: "Build", color: "#06B6D4" },
  { label: "Integrate", color: "#10B981" },
  { label: "Automate", color: "#8B5CF6" },
  { label: "Monitor", color: "#FB7185" },
  { label: "Improve", color: "#F59E0B" },
];

export const LifecycleSection: React.FC = () => {
  return (
    <section data-testid="lifecycle-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionTag color="#06B6D4">What we actually do</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-400 sm:text-4xl lg:text-[3.2rem]">
            We don't just build software.{" "}
            <span className="text-gradient-bv">We build the systems businesses depend on.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            deepliX works across the full technology lifecycle — so the infrastructure keeps improving long after launch day.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-5" data-testid="lifecycle-steps">
            {steps.map((s, i) => (
              <span key={s.label} className="flex items-center gap-3">
                <span className="flex items-center gap-3 rounded-full border bg-white px-5 py-3 card-border shadow-soft-sm transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-7 w-7 place-items-center rounded-full font-mono text-[10px] font-bold text-white" style={{ background: s.color }}>
                    {i + 1}
                  </span>
                  <span className="text-sm font-bold text-[#0F172A]">{s.label}</span>
                </span>
                {i < steps.length - 1 && <ArrowRight size={14} className="hidden text-slate-300 sm:block" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
