import React, { useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  TrendingUp,
  Infinity as InfinityIcon,
  CheckCircle2,
  Layers,
  ArrowRight,
  GitBranch,
  Terminal,
  Activity,
  Calendar,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";

export const stepsData = [
  {
    num: "01",
    title: "Understand & Map",
    desc: "We analyze your actual day-to-day operations, data touchpoints, third-party APIs, and pain points before proposing solutions.",
    timeline: "Week 1",
    deliverables: ["Process Topology Map", "Data Source Inventory", "Bottleneck Assessment"],
  },
  {
    num: "02",
    title: "Technical Audit",
    desc: "We examine current API rate limits, database schemas, manual touchpoints, and security permissions to isolate structural risk.",
    timeline: "Week 1–2",
    deliverables: ["Data Schema Audit", "Security & Permission Spec", "API Feasibility Matrix"],
  },
  {
    num: "03",
    title: "Architecture Design",
    desc: "We blueprint the end-to-end data pipelines, event triggers, database schemas, and microservice topologies.",
    timeline: "Week 2–3",
    deliverables: ["Interactive Architecture Blueprint", "Schema Migrations Spec", "Milestone Roadmap"],
  },
  {
    num: "04",
    title: "Build & Integrate",
    desc: "We construct decoupled backend microservices, real-time message brokers, database layers, and responsive management dashboards.",
    timeline: "Week 3–6",
    deliverables: ["Production-Ready Source Code", "Automated Test Suite", "Full Documentation"],
  },
  {
    num: "05",
    title: "Automate & Orchestrate",
    desc: "We establish webhook listeners, automated background jobs, retry mechanisms, and live synchronization across your tools.",
    timeline: "Week 6–7",
    deliverables: ["Live Synchronized Stack", "Dead-Letter Queues", "Real-Time Telemetry"],
  },
  {
    num: "06",
    title: "Monitor & Scale",
    desc: "We observe live throughput, error rates, and latency under load, tuning database indexes and scaling workers as volume grows.",
    timeline: "Ongoing",
    deliverables: ["24/7 Health Monitoring", "Performance Optimization", "Scheduled Iteration Sprints"],
  },
];

const expectations = [
  { icon: ShieldCheck, title: "Fixed Scoping", label: "Transparent milestone estimates with zero hidden add-on surprises." },
  { icon: Eye, title: "Full Code Visibility", label: "Direct access to git repositories, commits, and pull requests." },
  { icon: Lock, title: "Strict Data Isolation", label: "Zero customer data used in unauthorized AI training or public models." },
  { icon: TrendingUp, title: "Modular Extensibility", label: "Clean architectures that your in-house team can easily extend." },
  { icon: InfinityIcon, title: "Enduring Support", label: "Proactive monitoring and SLA maintenance after launch." },
];

interface HowWeWorkViewProps {
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking?: () => void;
}

export const HowWeWorkView: React.FC<HowWeWorkViewProps> = ({ onNavigate, onOpenBooking }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#121212] text-[#E4E4E7]">
      <PageHeader
        tag="Engineering Methodology"
        color="#00BFFF"
        lines={["Six Disciplined Stages.", "Zero Guesswork."]}
        description="A predictable, transparent engineering lifecycle designed to eliminate operational uncertainty and deliver resilient systems on schedule."
      />

      {/* Process Steps Grid */}
      <section data-testid="process-detail-section" className="px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stepsData.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.06}>
              <div
                data-testid={`process-detail-${s.num}`}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#1E1E1E] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-5xl font-extrabold text-[#71717A] transition-colors duration-300 group-hover:text-[#00BFFF]">
                    {s.num}
                  </span>
                  <span className="font-mono text-xs text-[#00BFFF] border border-[#00BFFF]/30 bg-[#121212] px-2.5 py-1 rounded-full">
                    {s.timeline}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#E4E4E7] group-hover:text-[#00BFFF] transition-colors">
                  {s.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{s.desc}</p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#71717A]">Tangible Deliverables</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-white/10 bg-[#121212] px-3 py-1 text-xs font-semibold text-[#E4E4E7]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Partnership Guarantees */}
      <section data-testid="expectations-section" className="px-6 py-16 lg:px-10 lg:py-24 border-t border-white/10 bg-[#151515]">
        <Reveal className="mx-auto max-w-7xl">
          <div>
            <SectionTag color="#10B981">Client Guarantees</SectionTag>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-4xl">
              What you can expect throughout every engagement.
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {expectations.map((e) => (
                <div key={e.title} className="rounded-2xl border border-white/5 bg-[#1E1E1E] p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#121212] border border-white/10 text-[#00BFFF] mb-4">
                    <e.icon size={18} strokeWidth={2.2} />
                  </span>
                  <h4 className="text-sm font-bold text-[#E4E4E7]">{e.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#A1A1AA]">{e.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
