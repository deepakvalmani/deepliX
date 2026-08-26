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
  color = "#00BFFF",
  lines,
  description,
}) => {
  return (
    <section
      data-testid="page-header"
      className="relative overflow-hidden px-6 pb-14 pt-32 lg:px-10 lg:pb-20 lg:pt-40"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] animate-orb-drift rounded-full bg-gradient-to-br from-[#00BFFF]/15 to-[#8B5CF6]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[380px] w-[380px] animate-orb-drift rounded-full bg-gradient-to-br from-[#06B6D4]/12 to-[#10B981]/10 blur-3xl"
        style={{ animationDelay: "6s" }}
        aria-hidden="true"
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionTag color={color}>{tag}</SectionTag>
        </Reveal>

        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tighter text-[#E4E4E7] sm:text-5xl lg:text-6xl">
          {lines.map((line, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <span className="block">{line}</span>
            </Reveal>
          ))}
        </h1>

        {description && (
          <Reveal delay={0.15 + lines.length * 0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};

