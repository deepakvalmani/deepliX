import React from "react";
import { Users, Mail, Table, Database, Calculator, FileBarChart, Workflow, BarChart3, BrainCircuit } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const tools = [
  { label: "Spreadsheet", icon: Table, x: "4%", y: "4%" },
  { label: "CRM", icon: Users, x: "56%", y: "2%" },
  { label: "Email", icon: Mail, x: "70%", y: "34%" },
  { label: "Database", icon: Database, x: "8%", y: "42%" },
  { label: "Accounting", icon: Calculator, x: "36%", y: "68%" },
  { label: "Reports", icon: FileBarChart, x: "64%", y: "72%" },
];

const chaos = [
  ["M16 12 L64 8", "#CBD5E1"],
  ["M64 8 L78 42", "#FB7185"],
  ["M16 12 L18 50", "#CBD5E1"],
  ["M18 50 L44 76", "#CBD5E1"],
  ["M78 42 L44 76", "#FB7185"],
  ["M44 76 L72 80", "#CBD5E1"],
  ["M78 42 L72 80", "#CBD5E1"],
  ["M18 50 L64 8", "#CBD5E1"],
];

const flow = [
  { label: "CRM", icon: Users, color: "#3B82F6" },
  { label: "Unified Data Layer", icon: Database, color: "#3B82F6" },
  { label: "Automation", icon: Workflow, color: "#06B6D4" },
  { label: "Analytics & Intelligence", icon: BarChart3, color: "#10B981" },
  { label: "AI Workflows", icon: BrainCircuit, color: "#8B5CF6" },
];

export const TransformationSection: React.FC = () => {
  return (
    <section data-testid="transformation-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionTag color="#3B82F6">The transformation</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            From scattered tools to one connected system.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div data-testid="transformation-before" className="h-full rounded-[2rem] border border-rose-100 bg-rose-50/50 p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-500">Before deepliX</p>
              <div className="relative mt-6 h-[340px] sm:h-[380px]">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {chaos.map(([d, c], i) => (
                    <path key={i} d={d} fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>
                {tools.map((t) => (
                  <span
                    key={t.label}
                    className="absolute flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-soft-sm"
                    style={{ left: t.x, top: t.y }}
                  >
                    <t.icon size={13} className="text-slate-400" />
                    {t.label}
                  </span>
                ))}
                <span className="absolute bottom-1 left-1 font-mono text-[10px] uppercase tracking-[0.2em] text-rose-400">
                  held together by manual work
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div data-testid="transformation-after" className="h-full rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">With deepliX</p>
              <div className="relative mt-6 pl-2">
                <span className="absolute bottom-4 left-[27px] top-4 w-px bg-gradient-to-b from-blue-400 via-cyan-400 to-violet-400" aria-hidden="true" />
                <div className="space-y-4">
                  {flow.map((f, i) => (
                    <div key={f.label} className="relative flex items-center gap-4">
                      <span
                        className="relative z-10 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 bg-white"
                        style={{ borderColor: f.color }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.color }} />
                      </span>
                      <span className="flex items-center gap-2.5 rounded-full border border-white bg-white/85 px-4 py-2.5 text-sm font-bold text-[#0F172A] shadow-soft-sm backdrop-blur">
                        <f.icon size={15} style={{ color: f.color }} />
                        {f.label}
                      </span>
                      {i === 0 && (
                        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.18em] text-blue-500 sm:block">
                          one direction, no friction
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
