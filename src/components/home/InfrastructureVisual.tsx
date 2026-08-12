import React from "react";
import { Users, Boxes, Mail, Table, Database, Workflow, BrainCircuit, BarChart3 } from "lucide-react";

const apps = [
  { icon: Users, label: "CRM", grad: "from-blue-500 to-sky-400" },
  { icon: Boxes, label: "ERP", grad: "from-rose-400 to-orange-300" },
  { icon: Mail, label: "Email", grad: "from-violet-500 to-purple-400" },
  { icon: Table, label: "Sheets", grad: "from-emerald-500 to-teal-400" },
];

const converge = [
  "M50 0 C 50 34, 200 18, 200 64",
  "M150 0 C 150 30, 200 26, 200 64",
  "M250 0 C 250 30, 200 26, 200 64",
  "M350 0 C 350 34, 200 18, 200 64",
];
const split = ["M200 0 C 200 28, 100 20, 100 56", "M200 0 C 200 28, 300 20, 300 56"];
const merge = ["M100 0 C 100 30, 200 24, 200 56", "M300 0 C 300 30, 200 24, 200 56"];

const Flow: React.FC<{ paths: string[]; color: string; h: string; vb: string; dotOffset?: number }> = ({
  paths,
  color,
  h,
  vb,
  dotOffset = 0,
}) => (
  <svg viewBox={vb} preserveAspectRatio="none" className={`${h} w-full`} aria-hidden="true">
    {paths.map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeDasharray="5 7"
        className="animate-dash-flow"
      />
    ))}
    {paths.map((d, i) => (
      <circle key={`dot-${i}`} r="3.4" fill={color}>
        <animateMotion dur="2.6s" begin={`${i * 0.7 + dotOffset}s`} repeatCount="indefinite" path={d} />
      </circle>
    ))}
  </svg>
);

const Node: React.FC<{ icon: any; title: string; sub: string; grad: string; glow: string }> = ({
  icon: Icon,
  title,
  sub,
  grad,
  glow,
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 p-3.5 shadow-soft-md backdrop-blur">
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${grad} text-white ${glow}`}>
      <Icon size={17} strokeWidth={2.2} />
    </span>
    <div className="min-w-0">
      <p className="truncate text-sm font-bold text-[#0F172A]">{title}</p>
      <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">{sub}</p>
    </div>
  </div>
);

export const InfrastructureVisual: React.FC = () => {
  return (
    <div
      data-testid="infrastructure-visual"
      className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 p-5 shadow-soft-xl backdrop-blur-xl sm:p-7"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" aria-hidden="true" />

      <div className="relative mb-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">System map</span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Connected
        </span>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {apps.map((a, i) => (
            <div
              key={a.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200/70 bg-white/90 p-2.5 shadow-soft-sm transition-transform duration-300 hover:-translate-y-1"
              data-testid={`infra-app-${a.label.toLowerCase()}`}
            >
              <span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${a.grad} text-white`}>
                <a.icon size={14} strokeWidth={2.2} />
              </span>
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500">{a.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">Business applications</p>

        <Flow paths={converge} color="#3B82F6" h="h-14" vb="0 0 400 64" />

        <div className="relative mx-auto w-[88%]">
          <div data-testid="infra-data-layer">
            <Node icon={Database} title="Unified Data Layer" sub="pipelines · warehouse" grad="from-blue-600 to-blue-400" glow="shadow-glow-blue" />
          </div>
        </div>

        <Flow paths={split} color="#06B6D4" h="h-12" vb="0 0 400 56" dotOffset={0.4} />

        <div className="grid grid-cols-2 gap-3">
          <div data-testid="infra-automation-layer">
            <Node icon={Workflow} title="Automation" sub="rules · sync · jobs" grad="from-cyan-500 to-teal-400" glow="shadow-glow-cyan" />
          </div>
          <div data-testid="infra-ai-layer">
            <Node icon={BrainCircuit} title="AI Layer" sub="rag · assistants" grad="from-violet-500 to-purple-400" glow="shadow-glow-violet" />
          </div>
        </div>

        <Flow paths={merge} color="#10B981" h="h-12" vb="0 0 400 56" dotOffset={0.8} />

        <div
          data-testid="infra-bi-layer"
          className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-cyan-50 p-4 shadow-soft-md"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 text-white">
              <BarChart3 size={17} strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">Business Intelligence</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-600/80">dashboards · decisions</p>
            </div>
          </div>
          <div className="flex h-9 items-end gap-1" aria-hidden="true">
            {[14, 24, 18, 30, 22].map((hh, i) => (
              <span
                key={i}
                className="w-1.5 origin-bottom animate-bar-grow rounded-full bg-gradient-to-t from-emerald-400 to-cyan-400"
                style={{ height: hh, animationDelay: `${i * 0.35}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
