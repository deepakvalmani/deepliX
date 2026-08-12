import React, { useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { capabilities } from "../data/capabilities";

interface CapabilitiesViewProps {
  initialHash?: string;
  onNavigate: (view: string, hash?: string) => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({
  initialHash,
  onNavigate,
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
    <>
      <PageHeader
        tag="Capabilities"
        color="#3B82F6"
        lines={["The systems behind", "your operations."]}
        description="Five disciplines, one goal: operational technology that quietly works. Business problem first — technical implementation second."
      />

      <div className="space-y-8 px-6 pb-12 lg:px-10">
        {capabilities.map((c, i) => (
          <section key={c.slug} id={c.slug} data-testid={`capability-detail-${c.slug}`} className="scroll-mt-28">
            <Reveal className="mx-auto max-w-7xl">
              <div
                className="grid gap-10 rounded-[2rem] border card-border p-7 shadow-soft-sm sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14"
                style={{ background: i % 2 === 1 ? `${c.pastel}80` : "#FFFFFF" }}
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft-md" style={{ background: c.color }}>
                      <c.icon size={24} strokeWidth={2} />
                    </span>
                    <span className="font-mono text-4xl font-bold" style={{ color: `${c.color}55` }}>
                      {c.num}
                    </span>
                  </div>
                  <h2 className="mt-7 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">{c.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{c.tagline}</p>

                  <div className="mt-8 rounded-2xl border-l-4 bg-white/90 p-5 shadow-soft-sm backdrop-blur" style={{ borderColor: c.color }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">The business problem</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-[#0F172A]">{c.problem}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-7">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">What deepliX builds</p>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {c.builds.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm font-semibold text-[#0F172A]">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: c.pastel, color: c.color }}>
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">Example architecture</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {c.architecture.map((a, j) => (
                        <span key={a} className="flex items-center gap-2">
                          <span className="rounded-full border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: `${c.color}44`, background: "#FFFFFF", color: c.color }}>
                            {a}
                          </span>
                          {j < c.architecture.length - 1 && <ArrowRight size={13} className="text-slate-300" aria-hidden="true" />}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-5 rounded-2xl bg-[#0F172A] p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">Business outcome</p>
                      <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-white">{c.outcome}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate("contact")}
                      data-testid={`capability-cta-${c.slug}`}
                      className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0F172A] transition-colors duration-300 hover:bg-cyan-300"
                    >
                      Discuss this
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      <CTASection onNavigate={onNavigate} />
    </>
  );
};
