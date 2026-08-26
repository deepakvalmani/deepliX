import React, { useEffect, useState } from "react";
import { Info, Play } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { demos } from "../data/demos";
import { SimulatorModal } from "../components/lab/InteractiveSimulators";

interface SystemsLabViewProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const SystemsLabView: React.FC<SystemsLabViewProps> = ({ onNavigate }) => {
  const [activeSimId, setActiveSimId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#E4E4E7]">
      <PageHeader
        tag="Systems Lab"
        color="#00BFFF"
        lines={["Demonstration systems,", "built by deepliX."]}
        description="We're early-stage, so instead of client case studies we build our own. Click any demo below to test the live interactive simulator."
      />

      <section data-testid="systems-lab-section" className="px-6 pb-12 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4" data-testid="internal-demo-notice">
            <Info size={17} className="mt-0.5 shrink-0 text-amber-400" />
            <p className="text-sm font-medium leading-relaxed text-amber-200">
              Every project here is an <strong>Internal Demonstration</strong> — designed and built by deepliX. Click <strong>"Run Live Simulation"</strong> on any card to test the interactive pipeline.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06}>
              <article
                data-testid={`lab-card-${d.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1E1E1E] shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue"
              >
                <div className="relative">
                  <div className="relative h-44 w-full overflow-hidden bg-[#141414]">
                    <img
                      src={d.image}
                      alt={`${d.title} visual`}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback gracefully if image URL fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = "none";
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = "grid";
                        }
                      }}
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="hidden h-44 w-full place-items-center"
                      style={{ background: "#141414" }}
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#1E1E1E] border border-white/10 shadow-soft-md" style={{ color: d.color }}>
                        <d.icon size={28} strokeWidth={2} style={{ color: d.color }} />
                      </span>
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-[#121212]/90 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#E4E4E7] backdrop-blur shadow-soft-sm border border-white/20">
                    Internal Demonstration
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold leading-snug text-[#E4E4E7]">{d.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{d.desc}</p>

                  {d.metrics && (
                    <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                      {d.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl bg-[#141414] border border-white/5 p-2.5">
                          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#71717A]">{m.label}</p>
                          <p className="mt-0.5 text-xs font-bold text-[#00BFFF]">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span key={t} className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] bg-white/5 border border-white/10 text-[#A1A1AA]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSimId(d.id)}
                    data-testid={`lab-sim-btn-${d.id}`}
                    aria-label={`Run Live Simulation for ${d.title}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all shadow-glow-blue hover:-translate-y-0.5 bg-[#00BFFF] text-[#121212] hover:bg-[#38BDF8]"
                  >
                    <Play size={14} fill="currentColor" /> Run Live Simulation
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {activeSimId && (
        <SimulatorModal
          demoId={activeSimId}
          onClose={() => setActiveSimId(null)}
        />
      )}

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
