import React, { useEffect } from "react";
import { Info } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { demos } from "../data/demos";

interface SystemsLabViewProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const SystemsLabView: React.FC<SystemsLabViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader
        tag="Systems Lab"
        color="#10B981"
        lines={["Demonstration systems,", "built by deepliX."]}
        description="We're early-stage, so instead of client case studies we build our own. Each system below shows how we think and how we build."
      />

      <section data-testid="systems-lab-section" className="px-6 pb-12 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4" data-testid="internal-demo-notice">
            <Info size={17} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-sm font-medium leading-relaxed text-amber-900">
              Every project here is an <strong>Internal Demonstration</strong> — designed and built by deepliX to prove system concepts before production deployment.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06}>
              <article
                data-testid={`lab-card-${d.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-white card-border shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-xl"
              >
                <div className="relative">
                  {d.image ? (
                    <img
                      src={d.image}
                      alt={`${d.title} visual`}
                      loading="lazy"
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-44 place-items-center" style={{ background: d.pastel }}>
                      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-white shadow-soft-md" style={{ color: d.color }}>
                        <d.icon size={26} strokeWidth={1.9} style={{ color: d.color }} />
                      </span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur shadow-soft-sm">
                    Internal Demonstration
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold leading-snug text-[#0F172A]">{d.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">{d.desc}</p>

                  {d.metrics && (
                    <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                      {d.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl bg-slate-50 p-2.5">
                          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">{m.label}</p>
                          <p className="mt-0.5 text-xs font-bold text-[#0F172A]">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span key={t} className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ background: d.pastel, color: d.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
};
