import React from "react";
import { SectionTag } from "./SectionTag";
import { Reveal } from "./Reveal";

interface PageHeaderProps {
  tag: string;
  color?: string;
  lines: string[];
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  tag,
  color = "#3B82F6",
  lines,
  description,
}) => {
  return (
    <section
      data-testid="page-header"
      className="relative overflow-hidden px-6 pb-14 pt-32 lg:px-10 lg:pb-20 lg:pt-40"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] animate-orb-drift rounded-full bg-gradient-to-br from-blue-200/50 to-violet-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[380px] w-[380px] animate-orb-drift rounded-full bg-gradient-to-br from-cyan-200/40 to-emerald-200/30 blur-3xl"
        style={{ animationDelay: "6s" }}
        aria-hidden="true"
      />
      
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionTag color={color}>{tag}</SectionTag>
        </Reveal>

        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tighter text-[#0F172A] sm:text-5xl lg:text-6xl">
          {lines.map((line, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <span className="block">{line}</span>
            </Reveal>
          ))}
        </h1>

        {description && (
          <Reveal delay={0.15 + lines.length * 0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
