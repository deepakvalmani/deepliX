import React from "react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const timeline = [
  { title: "Understand", desc: "We learn how your business runs before we build anything.", color: "#3B82F6" },
  { title: "Build", desc: "Systems designed around your operations, not templates.", color: "#38BDF8" },
  { title: "Integrate", desc: "Your existing tools become one connected environment.", color: "#06B6D4" },
  { title: "Automate", desc: "Repetitive work quietly disappears.", color: "#10B981" },
  { title: "Operate", desc: "We stay responsible for keeping the infrastructure healthy.", color: "#8B5CF6" },
  { title: "Scale", desc: "The system grows as the business grows.", color: "#FB7185" },
];

export const PartnershipSection: React.FC = () => {
  return (
    <section data-testid="partnership-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionTag color="#10B981">Long-term partnership</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Technology shouldn't become another thing you have to manage.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
            deepliX is built around long-term partnerships. We don't deliver a system and disappear. We understand how your business operates, build the right infrastructure, and continue improving it as your business grows.
          </p>
        </Reveal>

        <div className="relative">
          <span
            className="absolute bottom-3 left-[19px] top-3 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-violet-500"
            aria-hidden="true"
          />
          <div className="space-y-6">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="flex items-start gap-5" data-testid={`partnership-step-${t.title.toLowerCase()}`}>
                  <span
                    className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 bg-white font-mono text-[11px] font-bold shadow-soft-sm"
                    style={{ borderColor: t.color, color: t.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-base font-bold text-[#0F172A]">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.desc}</p>
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
