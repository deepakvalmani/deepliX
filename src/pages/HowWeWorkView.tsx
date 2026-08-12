import React, { useEffect } from "react";
import { ShieldCheck, Lock, Eye, TrendingUp, Infinity as InfinityIcon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";
import { processSteps } from "../components/home/ProcessSection";

const expectations = [
  { icon: ShieldCheck, label: "Honest scoping — no surprise invoices" },
  { icon: Eye, label: "You always know what's being built, and why" },
  { icon: Lock, label: "Your data handled responsibly at every step" },
  { icon: TrendingUp, label: "Systems designed to grow with you" },
  { icon: InfinityIcon, label: "Support that continues after launch" },
];

interface HowWeWorkViewProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const HowWeWorkView: React.FC<HowWeWorkViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader
        tag="How we work"
        color="#06B6D4"
        lines={["Six steps.", "Zero mystery."]}
        description="A process built for clarity. Each step exists to remove uncertainty — for you and for us."
      />

      <section data-testid="process-detail-section" className="px-6 pb-12 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.06}>
              <div
                data-testid={`process-detail-${s.num}`}
                className="group flex h-full flex-col rounded-3xl border bg-white p-7 card-border shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-xl"
              >
                <span className="font-mono text-5xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-blue-100">
                  {s.num}
                </span>
                <h2 className="mt-5 text-xl font-bold text-[#0F172A]">{s.title}</h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">You receive</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.deliverables.map((d) => (
                      <span key={d} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
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

      <section data-testid="expectations-section" className="px-6 py-12 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border card-border bg-white p-8 shadow-soft-sm sm:p-10">
            <SectionTag color="#10B981">What you can expect</SectionTag>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {expectations.map((e) => (
                <div key={e.label} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <e.icon size={16} strokeWidth={2.1} />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-[#0F172A]">{e.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
};
