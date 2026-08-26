import React, { useEffect } from "react";
import { Check, ArrowRight, Sparkles, Terminal, Activity, Layers } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { capabilities } from "../data/capabilities";

interface CapabilitiesViewProps {
  initialHash?: string;
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking?: () => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({
  initialHash,
  onNavigate,
  onOpenBooking,
}) => {
  useEffect(() => {
    if (initialHash) {
      const el = document.getElementById(initialHash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [initialHash]);

  return (
    <div className="bg-[#121212] text-[#E4E4E7]">
      <PageHeader
        tag="Engineering Disciplines"
        color="#00BFFF"
        lines={["The systems behind", "your operations."]}
        description="Five core engineering disciplines, one outcome: resilient operational technology that quietly powers your business day in and day out."
      />

      <div className="space-y-10 px-6 pb-16 lg:px-10">
        {capabilities.map((c, i) => (
          <section key={c.slug} id={c.slug} data-testid={`capability-detail-${c.slug}`} className="scroll-mt-28">
            <Reveal className="mx-auto max-w-7xl">
              <div className="grid gap-10 rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-7 shadow-2xl sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14 transition-colors hover:border-[#00BFFF]/30">
                <div>
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl text-[#121212] shadow-glow-blue"
                      style={{ background: c.color }}
                    >
                      <c.icon size={26} strokeWidth={2.4} />
                    </span>
                    <span className="font-mono text-4xl font-extrabold text-[#71717A]">
                      {c.num}
                    </span>
                  </div>
                  <h2 className="mt-7 text-2xl font-extrabold tracking-tight text-[#E4E4E7] sm:text-3xl">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#A1A1AA]">{c.tagline}</p>

                  <div className="mt-8 rounded-2xl border-l-4 border-[#00BFFF] bg-[#121212] p-5 shadow-soft-sm">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00BFFF]">The Operational Problem</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-[#E4E4E7]">{c.problem}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-7">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#71717A]">What deepliX Engineers</p>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {c.builds.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm font-semibold text-[#E4E4E7]">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#00BFFF]/20 text-[#00BFFF]">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#71717A]">Architecture Pipeline</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {c.architecture.map((a, j) => (
                        <span key={a} className="flex items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-[#121212] px-3.5 py-1.5 text-xs font-mono font-bold text-[#00BFFF]">
                            {a}
                          </span>
                          {j < c.architecture.length - 1 && <ArrowRight size={13} className="text-[#71717A]" aria-hidden="true" />}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#142230] p-6 sm:flex-row sm:items-center sm:justify-between shadow-glow-blue">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00BFFF]">Measurable Business Outcome</p>
                      <p className="mt-1.5 max-w-sm text-sm font-medium leading-relaxed text-[#E4E4E7]">{c.outcome}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {c.slug === "ai-systems" && (
                        <button
                          type="button"
                          onClick={() => onNavigate("systems-lab")}
                          data-testid="simulate-ai-assistant-btn"
                          className="inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/40 bg-[#121212] px-5 py-2.5 text-xs font-bold text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#121212] transition-colors"
                        >
                          <Terminal size={14} />
                          Simulate in Lab
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={onOpenBooking ? onOpenBooking : () => onNavigate("contact")}
                        data-testid={`capability-cta-${c.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-5 py-2.5 text-xs font-bold text-[#121212] transition-all duration-300 hover:brightness-110 shadow-glow-blue"
                      >
                        Discuss Scope
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

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
