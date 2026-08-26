import React, { useEffect } from "react";
import founderProfileImg from "../assets/images/deepak_exact_profile_1787759968643.jpg";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";
import {
  ShieldCheck,
  Lock,
  Eye,
  TrendingUp,
  Infinity as InfinityIcon,
  ArrowRight,
  ExternalLink,
  Linkedin,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Award,
} from "lucide-react";

const chapters = [
  {
    num: "01",
    title: "Why deepliX Exists",
    text: "Most companies do not have a software shortage. They have an operational integration gap. The SaaS tools, spreadsheets, and databases work in isolation — but the data pipelines and connective tissue between them are broken. deepliX exists to bridge that gap with engineered infrastructure.",
  },
  {
    num: "02",
    title: "The Problem We Solve",
    text: "As businesses scale past early milestones, manual processes become crippling bottlenecks. Data is entered into three different tools, team members spend hours reconciling spreadsheets, and executive decisions are made on stale figures. We automate the toil and unify the data.",
  },
  {
    num: "03",
    title: "Our Engineering Philosophy",
    text: "Understand before writing a single line of code. Reliability over flashy demos. We believe that predictable, well-instrumented, error-tolerant backend infrastructure beats a brittle prototype every single time.",
  },
  {
    num: "04",
    title: "The Long-Term Vision",
    text: "deepliX is built to be a enduring technical partner: the senior team businesses rely on when manual workflows must transform into enterprise-grade systems — and the team that maintains that infrastructure as volume multiplies.",
  },
];

const principles = [
  {
    icon: ShieldCheck,
    title: "Operational Reliability",
    color: "#00BFFF",
    desc: "Systems must execute consistently 24/7 with automatic retries, dead-letter queues, and graceful failovers.",
  },
  {
    icon: Lock,
    title: "Zero-Compromise Security",
    color: "#38BDF8",
    desc: "Business data is encrypted at rest and in transit. Strict role-based access control and isolated tenant permissions.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    color: "#8B5CF6",
    desc: "You own all code, repositories, and architecture diagrams. No black boxes, hidden APIs, or proprietary vendor traps.",
  },
  {
    icon: TrendingUp,
    title: "Modular Scalability",
    color: "#10B981",
    desc: "Architectures are decoupled into composable services and queues that scale smoothly as your operations 10x.",
  },
  {
    icon: InfinityIcon,
    title: "Long-Term Thinking",
    color: "#FB7185",
    desc: "We write clean, typed, and documented code built for longevity, ease of maintenance, and future developer handoff.",
  },
];

const qualityStandards = [
  {
    title: "100% Client IP Ownership",
    desc: "All source code, database migrations, and pipeline configurations are transferred directly to your organization.",
  },
  {
    title: "Observable & Monitored",
    desc: "Every automated pipeline includes structured logs, latency tracing, and immediate alerting on failure.",
  },
  {
    title: "Predictable Milestones",
    desc: "Fixed timelines and clear deliverables at every step of the 6-stage engineering lifecycle.",
  },
  {
    title: "Zero Operational Downtime",
    desc: "We test integrations against staging sandboxes and run parallel validation before migrating live data.",
  },
];

interface AboutViewProps {
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenBooking }) => {
  const linkedinUrl = (import.meta.env.VITE_LINKEDIN_URL as string) || "https://www.linkedin.com/company/111716037/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#121212] text-[#E4E4E7]">
      <PageHeader
        tag="About deepliX"
        color="#00BFFF"
        lines={["We engineer the systems", "businesses depend on."]}
        description="deepliX is an engineering-first technology partner with a long-term mission: building the reliable data pipelines, automated workflows, and operational backbones behind growing enterprises."
      />

      {/* Chapters Grid */}
      <section data-testid="about-story" className="px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-4">
            {chapters.map((c, i) => (
              <Reveal key={c.num} delay={i * 0.06}>
                <div
                  data-testid={`about-chapter-${c.num}`}
                  className={`grid gap-5 rounded-3xl border border-white/10 bg-[#1E1E1E] p-8 sm:grid-cols-[100px_1fr_1.3fr] sm:gap-10 hover:border-[#00BFFF]/30 transition-colors ${
                    i === 0 ? "border-[#00BFFF]/40 shadow-glow-blue" : ""
                  }`}
                >
                  <span className="font-mono text-4xl font-extrabold text-[#71717A] sm:text-5xl">{c.num}</span>
                  <h2 className="text-xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-2xl">{c.title}</h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#A1A1AA]">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section data-testid="about-founder" className="px-6 py-20 lg:px-10 lg:py-28 border-t border-white/10 bg-[#151515]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              <SectionTag color="#00BFFF">Leadership &amp; Origin</SectionTag>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
                Deepak Raj
              </h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.24em] text-[#00BFFF]">
                Founder &amp; Principal Engineer — deepliX
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#A1A1AA]">
                <p>
                  deepliX started from a clear technical reality: modern companies are running on a messy mosaic of disparate SaaS tools, fragmented databases, and manual spreadsheets that slow down their best people.
                </p>
                <p>
                  Instead of selling another isolated SaaS tool, deepliX was founded to engineer the connective tissue: clean backend pipelines, event-driven automations, synchronized databases, and real-time operational visibility.
                </p>
                <p>
                  Every business partner works directly with senior technical leadership. No generic sales tiers, no junior handoffs, and no inflated promises — just software and infrastructure that works reliably day in and day out.
                </p>
              </div>

              {/* Founder quote box */}
              <div className="mt-8 rounded-2xl border-l-4 border-[#00BFFF] bg-[#1E1E1E] p-6 shadow-soft-sm">
                <p className="text-sm font-semibold leading-relaxed text-[#E4E4E7] italic">
                  "Technology should quietly and flawlessly empower the business. If your team is spending more time troubleshooting data sync errors than serving customers, the architecture needs to be rebuilt."
                </p>
                <span className="mt-3 block font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                  — Deepak Raj, Founder
                </span>
              </div>

              {/* Connect links */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1E1E1E] px-5 py-2.5 text-xs font-bold text-[#E4E4E7] hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all"
                >
                  <Linkedin size={15} className="text-[#00BFFF]" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink size={13} className="text-[#71717A]" />
                </a>

                <button
                  type="button"
                  onClick={onOpenBooking ? onOpenBooking : () => onNavigate("contact")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-5 py-2.5 text-xs font-bold text-[#121212] shadow-glow-blue hover:brightness-110 transition-all"
                >
                  <span>Book a Call with Deepak</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[#00BFFF]/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-[#00BFFF]/50 shadow-glow-blue bg-[#121212]">
                      <img
                        src={founderProfileImg}
                        alt="Deepak Raj"
                        className="h-full w-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#E4E4E7] text-base">Deepak Raj</h4>
                      <span className="font-mono text-xs text-[#00BFFF]">Founder &amp; Principal Engineer</span>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 text-[10px] font-bold text-[#10B981]">
                    Active Lead Architect
                  </span>
                </div>

                <div className="space-y-3.5 text-xs text-[#A1A1AA]">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-[#71717A]">Specialization</span>
                    <span className="font-semibold text-[#E4E4E7]">Data Pipelines &amp; Business Automation</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-[#71717A]">Primary Focus</span>
                    <span className="font-semibold text-[#E4E4E7]">Enterprise Operational Infrastructure</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-[#71717A]">Company Founded</span>
                    <span className="font-semibold text-[#E4E4E7]">2025</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-[#71717A]">Code &amp; Architecture Delivery</span>
                    <span className="font-semibold text-[#10B981]">100% Client Owned</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[#121212] p-4 text-xs text-[#A1A1AA]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#00BFFF] block mb-1">
                    Direct Contact Commitment
                  </span>
                  Every architecture discovery and milestone design is reviewed directly by senior engineering.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering Principles */}
      <section data-testid="about-principles" className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionTag color="#00BFFF">Core Principles</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              Engineering standards we never compromise.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#A1A1AA]">
              We do not borrow credibility from logos or buzzwords. We establish trust through rigorous code quality, predictable milestones, and reliable infrastructure.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-white/10 bg-[#1E1E1E] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-[#121212] border border-white/10 text-[#00BFFF]"
                    style={{ color: p.color }}
                  >
                    <p.icon size={22} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-[#E4E4E7]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{p.desc}</p>
                </div>
              </Reveal>
            ))}

            {/* Additional Standard Card */}
            <Reveal delay={0.35}>
              <div className="h-full rounded-3xl border border-[#00BFFF]/30 bg-gradient-to-br from-[#1E1E1E] to-[#142332] p-7 shadow-glow-blue">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00BFFF] text-[#121212]">
                  <Award size={22} strokeWidth={2.4} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-[#E4E4E7]">Senior Engineering Standard</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                  Clean types, automated regression testing, isolated staging environments, and zero technical debt handoff.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality Standards & Guarantees */}
      <section data-testid="about-standards" className="px-6 py-20 lg:px-10 lg:py-24 border-t border-white/10 bg-[#151515]">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <SectionTag color="#10B981">Our Partnership Standards</SectionTag>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-4xl">
                What you can count on every single engagement.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {qualityStandards.map((q, i) => (
              <Reveal key={q.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/5 bg-[#1E1E1E] p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#10B981] mb-3">
                      <CheckCircle2 size={16} />
                      <span className="font-mono text-[11px] uppercase tracking-wider">Standard</span>
                    </div>
                    <h3 className="text-base font-bold text-[#E4E4E7]">{q.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">{q.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
