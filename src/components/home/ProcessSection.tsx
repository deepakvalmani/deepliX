import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

export const processSteps = [
  { num: "01", title: "Understand", desc: "We learn how your business actually runs — workflows, systems, and pain points.", deliverables: ["Process mapping", "Systems inventory"] },
  { num: "02", title: "Audit", desc: "We identify bottlenecks, data gaps, and unnecessary manual work.", deliverables: ["Bottleneck report", "Data-gap analysis"] },
  { num: "03", title: "Design", desc: "We design the technical architecture and a clear implementation plan.", deliverables: ["Architecture blueprint", "Implementation plan"] },
  { num: "04", title: "Build", desc: "We develop and integrate the required systems.", deliverables: ["Working systems", "Documentation"] },
  { num: "05", title: "Automate", desc: "We remove repetitive processes and connect your tools.", deliverables: ["Automated workflows", "Live integrations"] },
  { num: "06", title: "Improve", desc: "We monitor, maintain, and continuously improve the infrastructure.", deliverables: ["Monitoring", "Iteration cycles"] },
];

interface ProcessSectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="process-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionTag color="#3B82F6">How we work</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              A process built for clarity, not ceremony.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-slate-600">
              Six steps. Each one exists to remove uncertainty — for you and for us.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          {processSteps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => onNavigate("how-we-work")}
                data-testid={`process-step-${s.num}`}
                className={`group grid w-full items-center gap-4 border-t border-slate-200 py-6 text-left transition-colors duration-300 hover:bg-white sm:grid-cols-[90px_1fr_52px] sm:gap-8 sm:px-4 ${
                  i === processSteps.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-mono text-4xl font-bold text-slate-200 transition-colors duration-300 group-hover:text-blue-500 sm:text-5xl">
                  {s.num}
                </span>
                <div>
                  <span className="block text-xl font-bold text-[#0F172A]">{s.title}</span>
                  <span className="mt-1 block max-w-xl text-sm leading-relaxed text-slate-600">{s.desc}</span>
                </div>
                <span className="hidden h-12 w-12 place-items-center rounded-full border border-slate-200 text-[#0F172A] opacity-0 transition-all duration-300 group-hover:bg-[#0F172A] group-hover:text-white group-hover:opacity-100 sm:grid">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
