import React, { useState } from "react";
import { Heart, AppWindow, Database, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const layers = [
  {
    id: "business",
    name: "Business Layer",
    icon: Heart,
    color: "#FB7185",
    items: ["Customers", "Employees", "Operations"],
    desc: "The people and processes that create value. Everything below exists to serve this layer.",
    work: "We start here — mapping how work actually happens before touching any technology.",
  },
  {
    id: "application",
    name: "Application Layer",
    icon: AppWindow,
    color: "#38BDF8",
    items: ["CRM", "ERP", "Internal Tools"],
    desc: "The software your team uses every day. Powerful alone, often disconnected from each other.",
    work: "We connect and extend the tools you already rely on — rarely replace them.",
  },
  {
    id: "data",
    name: "Data Layer",
    icon: Database,
    color: "#3B82F6",
    items: ["Pipelines", "Databases", "Warehouses"],
    desc: "Where information is collected, cleaned, and organized into one reliable structure.",
    work: "We build the pipelines and warehouses that turn scattered records into a single source of truth.",
  },
  {
    id: "intelligence",
    name: "Intelligence Layer",
    icon: Sparkles,
    color: "#8B5CF6",
    items: ["Analytics", "AI", "Automation"],
    desc: "Where data becomes decisions — dashboards, assistants, and work that runs itself.",
    work: "We build the intelligence layer last, on top of trustworthy data — never the other way around.",
  },
];

export const SystemExplorer: React.FC = () => {
  const [active, setActive] = useState(layers[2]);

  return (
    <section data-testid="system-explorer" className="px-6 py-10 lg:px-10">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0B1220] px-6 py-12 shadow-soft-xl sm:px-12 lg:px-16 lg:py-18">
          <div
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 animate-orb-drift rounded-full bg-blue-600/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 animate-orb-drift rounded-full bg-violet-600/20 blur-3xl"
            style={{ animationDelay: "5s" }}
            aria-hidden="true"
          />

          <div className="relative">
            <SectionTag color="#38BDF8" dark>
              Interactive system map
            </SectionTag>
            <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
              Explore the stack your business runs on.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Select a layer to see what lives there — and what deepliX does inside it.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
              <div className="relative space-y-3">
                <span className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" aria-hidden="true" />
                {layers.map((l, i) => {
                  const isActive = active.id === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      data-testid={`layer-button-${l.id}`}
                      onClick={() => setActive(l)}
                      aria-pressed={isActive}
                      className={`relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-white/25 bg-white/[0.08]"
                          : "border-white/10 bg-transparent hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300"
                        style={{
                          background: isActive ? l.color : "rgba(255,255,255,0.07)",
                          color: isActive ? "#fff" : l.color,
                        }}
                      >
                        <l.icon size={18} strokeWidth={2.1} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                          {l.name}
                        </span>
                        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                          {l.items.join(" · ")}
                        </span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">0{i + 1}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[300px]">
                <div
                  data-testid="layer-detail-panel"
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl"
                      style={{ background: `${active.color}22`, color: active.color }}
                    >
                      <active.icon size={21} strokeWidth={2.1} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      0{layers.findIndex((l) => l.id === active.id) + 1} / 04
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{active.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{active.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-7 border-t border-white/10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: active.color }}>
                      What deepliX does here
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">{active.work}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
