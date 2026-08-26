import React from "react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const timeline = [
  { title: "Understand", desc: "We learn how your business actually runs before writing a single line of code.", color: "#00BFFF" },
  { title: "Build", desc: "Modular, decoupled systems designed around your real workflows, not rigid templates.", color: "#38BDF8" },
  { title: "Integrate", desc: "Your existing tools and APIs unite into a single real-time synchronized environment.", color: "#06B6D4" },
  { title: "Automate", desc: "Repetitive, high-friction operational manual tasks quietly disappear.", color: "#10B981" },
  { title: "Operate", desc: "We maintain ongoing engineering responsibility for health, uptime, and data validity.", color: "#8B5CF6" },
  { title: "Scale", desc: "The system dynamically expands with zero degradation as transaction volume multiplies.", color: "#FB7185" },
];

export const PartnershipSection: React.FC = () => {
  return (
    <section data-testid="partnership-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionTag color="#10B981">Long-term Partnership</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
            Technology shouldn't become another thing you have to manage.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#A1A1AA]">
            deepliX is built around committed long-term partnerships. We don't deliver code and vanish. We understand your business, engineer robust infrastructure, and continuously optimize it as you expand.
          </p>
        </Reveal>

        <div className="relative">
          <span
            className="absolute bottom-3 left-[19px] top-3 w-[2px] bg-gradient-to-b from-[#00BFFF] via-[#06B6D4] to-[#8B5CF6]"
            aria-hidden="true"
          />
          <div className="space-y-6">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="flex items-start gap-5" data-testid={`partnership-step-${t.title.toLowerCase()}`}>
                  <span
                    className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 bg-[#121212] font-mono text-[11px] font-bold shadow-soft-sm"
                    style={{ borderColor: t.color, color: t.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-base font-bold text-[#E4E4E7]">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#A1A1AA]">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

