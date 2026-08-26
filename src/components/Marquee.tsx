import React from "react";
import { Asterisk } from "lucide-react";

const items = [
  "Data Engineering",
  "Workflow Automation",
  "Business Intelligence",
  "AI Systems",
  "Systems Integration",
  "Data Pipelines",
  "Executive Dashboards",
  "RAG Assistants",
  "API Integration",
  "Analytics Infrastructure",
];

export const Marquee: React.FC = () => {
  const row = [...items, ...items];
  return (
    <section
      data-testid="marquee-section"
      aria-label="deepliX capability areas"
      className="overflow-hidden border-y border-white/10 bg-[#161616] py-4.5 backdrop-blur"
    >
      <div className="flex w-max animate-marquee items-center gap-2">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#A1A1AA]">
              {item}
            </span>
            <Asterisk size={14} className="text-[#00BFFF]" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
};

