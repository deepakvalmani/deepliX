import React, { useEffect, useState } from "react";
import { 
  Check, ArrowRight, ShieldCheck, Lock, Eye, TrendingUp, 
  Infinity as InfinityIcon, Sparkles, Workflow, Database, 
  BrainCircuit, BarChart3, Layers, Terminal, ChevronRight
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";
import { capabilities } from "../data/capabilities";

const expectations = [
  { icon: ShieldCheck, label: "Transparent scoping with fixed deliverables — no surprise invoices" },
  { icon: Eye, label: "Full architectural visibility — you always know what is being built and why" },
  { icon: Lock, label: "Enterprise-grade data security & compliance at every pipeline stage" },
  { icon: TrendingUp, label: "Modular, decoupled systems designed to scale as transaction volume grows" },
  { icon: InfinityIcon, label: "Continuous telemetry, SLA monitoring, and proactive support after launch" },
];

export const processSteps = [
  {
    num: "01",
    title: "Understand",
    sub: "Discovery & Alignment",
    desc: "We start with your business problem, not tools. We map how work actually moves through your teams, identify friction points, and define unambiguous success metrics.",
    deliverables: ["Process maps", "Pain point inventory", "Value metric targets"],
    duration: "Week 1",
  },
  {
    num: "02",
    title: "Audit",
    sub: "Technical Inspection",
    desc: "We inspect your existing tools, databases, APIs, and data structures. We locate where data gets trapped, where manual work is hiding, and where security gaps exist.",
    deliverables: ["System audit report", "Data health scorecard", "Risk & security log"],
    duration: "Week 1-2",
  },
  {
    num: "03",
    title: "Design",
    sub: "Architecture Blueprint",
    desc: "We produce an exact, understandable system architecture diagram and implementation blueprint. You see every connection, pipeline, and automated flow before code is written.",
    deliverables: ["Architecture diagrams", "Data flow schemas", "Fixed milestone plan"],
    duration: "Week 2-3",
  },
  {
    num: "04",
    title: "Build",
    sub: "Engineering Execution",
    desc: "We engineer the data pipelines, unified databases, APIs, and AI models using modern, maintainable stacks. Everything is built modularly so your team is never locked into proprietary black boxes.",
    deliverables: ["Modular codebase", "Automated pipelines", "Documentation & test suites"],
    duration: "Week 3-6",
  },
  {
    num: "05",
    title: "Automate",
    sub: "Orchestration & Triggers",
    desc: "We configure the automated triggers, error handlers, and business logic that remove manual busywork. We test edge cases and establish rigorous data validation guards.",
    deliverables: ["Live automations", "Notification hooks", "Failover runbooks"],
    duration: "Week 6-7",
  },
  {
    num: "06",
    title: "Improve",
    sub: "Telemetry & Evolution",
    desc: "Once deployed, we monitor system throughput, latency, and adoption. We refine dashboards, tune model precision, and adapt pipelines as your business expands.",
    deliverables: ["Live telemetry dashboards", "Quarterly optimization", "Dedicated SLA support"],
    duration: "Ongoing",
  },
];

interface SolutionsViewProps {
  initialHash?: string;
  onNavigate: (view: string, hash?: string) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({
  initialHash,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialHash || capabilities[0].slug);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (initialHash) {
      setActiveTab(initialHash);
      const el = document.getElementById(initialHash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [initialHash]);

  return (
    <div data-testid="solutions-view" className="min-h-screen bg-[#121212] text-[#E4E4E7]">
      <PageHeader
        tag="Solutions & Methodology"
        color="#00BFFF"
        lines={["What We Build.", "How We Deliver."]}
        description="A unified operational perspective: 5 core technical capabilities integrated seamlessly with a predictable, transparent 6-step engineering lifecycle."
      />

      {/* Quick Nav Anchors */}
      <div className="sticky top-[72px] z-40 border-y border-white/10 bg-[#121212]/90 px-6 py-3 backdrop-blur-xl lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#71717A] shrink-0">Capabilities:</span>
            {capabilities.map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  setActiveTab(c.slug);
                  const el = document.getElementById(c.slug);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  activeTab === c.slug
                    ? "bg-[#00BFFF]/15 text-[#00BFFF] border border-[#00BFFF]/40 shadow-glow-blue"
                    : "text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7]"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <a
            href="#methodology"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-[#1E1E1E] px-3.5 py-1 text-xs font-bold text-[#00BFFF] hover:border-[#00BFFF]/40 transition-colors"
          >
            Jump to 6-Step Process <ArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* PART 1: WHAT WE DO (CAPABILITIES) */}
      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <SectionTag color="#00BFFF">Core Disciplines</SectionTag>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-4xl">
                  Five pillars of modern connected systems.
                </h2>
                <p className="mt-3 max-w-2xl text-base text-[#A1A1AA]">
                  We build custom software, reliable data pipelines, and intelligence layers designed for high throughput and zero operational downtime.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("blueprint")}
                className="inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/30 bg-[#00BFFF]/10 px-5 py-2.5 text-xs font-bold text-[#00BFFF] hover:bg-[#00BFFF]/20 transition-all shadow-glow-blue"
              >
                <Sparkles size={14} /> Open Architecture Blueprint Tool
              </button>
            </div>
          </Reveal>

          <div className="space-y-10">
            {capabilities.map((c, i) => (
              <section key={c.slug} id={c.slug} data-testid={`capability-detail-${c.slug}`} className="scroll-mt-36">
                <Reveal>
                  <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-[#1E1E1E] p-7 shadow-soft-md transition-all duration-300 hover:border-[#00BFFF]/30 sm:p-10 lg:grid-cols-[1.05fr_1.15fr] lg:p-12">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#121212] text-[#00BFFF] border border-white/10 shadow-glow-blue">
                            <c.icon size={24} strokeWidth={2.2} />
                          </span>
                          <span className="font-mono text-3xl font-extrabold text-[#71717A]">
                            {c.num}
                          </span>
                        </div>
                        <span className="rounded-full border border-white/10 bg-[#121212] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#A1A1AA]">
                          {c.slug.replace("-", " ")}
                        </span>
                      </div>

                      <h3 className="mt-7 text-2xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-3xl">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#A1A1AA]">{c.tagline}</p>

                      <div className="mt-8 rounded-2xl border border-white/10 bg-[#141414] p-5 shadow-soft-sm">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FB7185]">The Business Bottleneck</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-[#E4E4E7]">{c.problem}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00BFFF]">What deepliX Engineers</p>
                        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {c.builds.map((b) => (
                            <li key={b} className="flex items-center gap-2.5 text-sm font-semibold text-[#E4E4E7]">
                              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#00BFFF]/15 text-[#00BFFF]">
                                <Check size={11} strokeWidth={3} />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#71717A]">Target Architecture</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {c.architecture.map((a, j) => (
                            <span key={a} className="flex items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-[#121212] px-3.5 py-1.5 text-xs font-mono font-bold text-[#38BDF8]">
                                {a}
                              </span>
                              {j < c.architecture.length - 1 && <ArrowRight size={13} className="text-[#71717A]" aria-hidden="true" />}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#121212] p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#10B981]">Tangible Business Outcome</p>
                          <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-[#E4E4E7]">{c.outcome}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {c.slug === "ai-systems" && (
                            <button
                              type="button"
                              onClick={() => onNavigate("systems-lab")}
                              data-testid="simulate-ai-assistant-btn"
                              className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-4 py-2 text-xs font-bold text-[#A855F7] hover:bg-[#8B5CF6]/30 transition-colors"
                            >
                              <BrainCircuit size={14} /> Simulate AI Assistant
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onNavigate("contact")}
                            data-testid={`capability-cta-${c.slug}`}
                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-5 py-2.5 text-xs font-bold text-[#121212] shadow-glow-blue transition-all hover:brightness-110"
                          >
                            Discuss this Solution
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* PART 2: HOW WE WORK (METHODOLOGY & 6-STEP PROCESS) */}
      <section id="methodology" className="scroll-mt-28 border-t border-white/10 bg-[#161616] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <SectionTag color="#00BFFF">Engineering Methodology</SectionTag>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
                Six steps. Zero mystery.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                A disciplined lifecycle built for absolute clarity. Each step exists to remove uncertainty, guarantee data integrity, and ensure smooth stakeholder adoption.
              </p>
            </div>
          </Reveal>

          {/* Interactive Timeline & Step Cards */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
            {/* Steps Selector list */}
            <div className="space-y-3">
              {processSteps.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.num}
                    onClick={() => setActiveStep(idx)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#00BFFF]/40 bg-[#1E1E1E] shadow-glow-blue"
                        : "border-white/5 bg-[#121212]/60 hover:bg-[#1E1E1E]/50 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold transition-all ${
                          isActive
                            ? "bg-gradient-to-br from-[#00BFFF] to-[#06B6D4] text-[#121212]"
                            : "bg-[#181818] text-[#71717A]"
                        }`}
                      >
                        {s.num}
                      </span>
                      <div>
                        <p className={`text-base font-bold ${isActive ? "text-[#E4E4E7]" : "text-[#A1A1AA]"}`}>
                          {s.title}
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                          {s.sub} · {s.duration}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        isActive ? "text-[#00BFFF] translate-x-1" : "text-[#71717A]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Step Detail Spotlight Card */}
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-[#1E1E1E] p-8 shadow-soft-xl sm:p-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00BFFF]">
                    Step {processSteps[activeStep].num} of 06
                  </span>
                  <h3 className="mt-1 text-3xl font-extrabold text-[#E4E4E7]">
                    {processSteps[activeStep].title}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-[#121212] px-4 py-1.5 font-mono text-xs font-semibold text-[#38BDF8]">
                  {processSteps[activeStep].duration}
                </span>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#71717A]">Objective</p>
                <p className="mt-2 text-base leading-relaxed text-[#E4E4E7]">
                  {processSteps[activeStep].desc}
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-[#121212] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#10B981]">Tangible Deliverables</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {processSteps[activeStep].deliverables.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400"
                    >
                      <Check size={12} /> {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
                  disabled={activeStep === 0}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-[#A1A1AA] hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous Step
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : prev))}
                  disabled={activeStep === processSteps.length - 1}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#00BFFF]/15 border border-[#00BFFF]/40 px-4 py-2 text-xs font-bold text-[#00BFFF] hover:bg-[#00BFFF]/25 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next Step <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid Overview of all 6 steps */}
          <div className="mt-20">
            <h4 className="text-center font-mono text-xs uppercase tracking-[0.24em] text-[#71717A] mb-8">
              Full Lifecycle Overview
            </h4>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.05}>
                  <div
                    data-testid={`process-detail-${s.num}`}
                    className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#1E1E1E] p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-4xl font-extrabold text-[#71717A] group-hover:text-[#00BFFF] transition-colors">
                        {s.num}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                        {s.duration}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#E4E4E7]">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{s.desc}</p>
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#71717A]">Key Outputs</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {s.deliverables.map((d) => (
                          <span key={d} className="rounded-full bg-[#121212] border border-white/10 px-2.5 py-1 text-[11px] font-medium text-[#A1A1AA]">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Guarantees & Expectations Matrix */}
          <div className="mt-20">
            <Reveal>
              <div className="rounded-[2rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-soft-md sm:p-10">
                <SectionTag color="#10B981">Our Partnership Commitments</SectionTag>
                <h3 className="mt-4 text-2xl font-bold text-[#E4E4E7]">What you can expect from day one</h3>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                  {expectations.map((e) => (
                    <div key={e.label} className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#121212] p-5">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <e.icon size={18} strokeWidth={2.2} />
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-[#E4E4E7]">{e.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
