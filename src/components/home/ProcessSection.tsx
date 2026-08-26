import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

export const processSteps = [
  { num: "01", title: "Understand", desc: "We learn how your business actually runs — workflows, data sources, and organizational pain points.", deliverables: ["Process mapping", "Systems inventory"] },
  { num: "02", title: "Audit", desc: "We identify structural bottlenecks, data silos, API limits, and unnecessary manual toil.", deliverables: ["Bottleneck report", "Data-gap analysis"] },
  { num: "03", title: "Design", desc: "We engineer the technical architecture blueprints, schemas, and a predictable milestone plan.", deliverables: ["Architecture blueprint", "Implementation plan"] },
  { num: "04", title: "Build", desc: "We construct decoupled data pipelines, databases, microservices, and client frontends.", deliverables: ["Working systems", "Documentation"] },
  { num: "05", title: "Automate", desc: "We orchestrate automated triggers, background tasks, and error handling across your stack.", deliverables: ["Automated workflows", "Live integrations"] },
  { num: "06", title: "Improve", desc: "We monitor live telemetry, latency, and throughput, continuously tuning for scale.", deliverables: ["Monitoring", "Iteration cycles"] },
];

interface ProcessSectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="process-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionTag color="#00BFFF">Execution Methodology</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              A process built for clarity, not ceremony.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-[#A1A1AA]">
              Six distinct stages. Each one exists to remove uncertainty and guarantee architectural integrity.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          {processSteps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => onNavigate("solutions", "methodology")}
                data-testid={`process-step-${s.num}`}
                className={`group grid w-full items-center gap-4 border-t border-white/10 py-6 text-left transition-colors duration-300 hover:bg-[#1E1E1E]/60 sm:grid-cols-[90px_1fr_52px] sm:gap-8 sm:px-6 rounded-2xl ${
                  i === processSteps.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-mono text-4xl font-extrabold text-[#71717A] transition-colors duration-300 group-hover:text-[#00BFFF] sm:text-5xl">
                  {s.num}
                </span>
                <div>
                  <span className="block text-xl font-bold text-[#E4E4E7] group-hover:text-[#00BFFF] transition-colors">{s.title}</span>
                  <span className="mt-1 block max-w-xl text-sm leading-relaxed text-[#A1A1AA]">{s.desc}</span>
                </div>
                <span className="hidden h-12 w-12 place-items-center rounded-full border border-white/10 text-[#A1A1AA] opacity-0 transition-all duration-300 group-hover:bg-[#00BFFF] group-hover:text-[#121212] group-hover:opacity-100 sm:grid">
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

