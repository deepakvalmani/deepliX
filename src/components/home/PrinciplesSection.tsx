import React from "react";
import { ShieldCheck, Lock, Eye, TrendingUp, Infinity as InfinityIcon, ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const principles = [
  { icon: ShieldCheck, color: "#3B82F6", bg: "bg-blue-50", title: "Reliability", text: "Systems should work consistently — not just on launch day." },
  { icon: Lock, color: "#0EA5E9", bg: "bg-sky-50", title: "Security", text: "Business data must be handled responsibly, end to end." },
  { icon: Eye, color: "#8B5CF6", bg: "bg-violet-50", title: "Transparency", text: "You should always understand what is being built, and why." },
  { icon: TrendingUp, color: "#10B981", bg: "bg-emerald-50", title: "Scalability", text: "Systems are designed to grow with the business." },
  { icon: InfinityIcon, color: "#FB7185", bg: "bg-rose-50", title: "Long-Term Thinking", text: "Technology should remain useful long after the first release." },
];

interface PrinciplesSectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="principles-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <SectionTag color="#0EA5E9">Engineering principles</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Built around engineering principles.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
              We're early-stage, so we don't borrow credibility from logos and numbers. We earn it from how we build.
            </p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div
                  data-testid={`principle-${p.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-colors duration-200 hover:border-slate-200 hover:bg-white"
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${p.bg}`} style={{ color: p.color }}>
                    <p.icon size={19} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div data-testid="founder-card" className="relative h-fit overflow-hidden rounded-[2rem] border card-border bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 shadow-soft-md lg:sticky lg:top-28 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true" />
            <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-500 text-xl font-extrabold text-white shadow-glow-violet">
              DR
            </span>
            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#0F172A]">Deepak Raj</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600">Founder — deepliX</p>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              deepliX is being built with a long-term vision: to become the trusted technology and infrastructure partner behind growing businesses. No inflated claims, no borrowed logos — just systems that work.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("about")}
              data-testid="founder-learn-more-link"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors duration-300 hover:text-blue-800"
            >
              Learn about deepliX
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
