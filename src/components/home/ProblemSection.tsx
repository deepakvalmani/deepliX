import React from "react";
import { Database, Repeat, Unplug, EyeOff } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const problems = [
  { icon: Database, color: "#00BFFF", title: "Scattered Data", text: "Important information lives across too many disconnected platforms — and none of them agree on truth." },
  { icon: Repeat, color: "#FB7185", title: "Manual Operations", text: "Teams waste hours copying, reconciling, and re-entering records by hand instead of moving business forward." },
  { icon: Unplug, color: "#06B6D4", title: "Disconnected Tools", text: "Your SaaS subscriptions work in isolation. Nothing flows automatically between CRM, ERP, and ops." },
  { icon: EyeOff, color: "#8B5CF6", title: "Limited Visibility", text: "No unified, real-time executive dashboard exists when critical strategic decisions need to be made." },
];

export const ProblemSection: React.FC = () => {
  return (
    <section data-testid="problem-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionTag color="#FB7185">The Operational Friction</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              Your business shouldn't depend on disconnected systems.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-[#A1A1AA]">
              The individual tools usually work fine. The system connecting them doesn't. Growth turns small manual cracks into daily friction and costly errors.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                data-testid={`problem-card-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group h-full rounded-3xl bg-[#1E1E1E] border border-white/10 p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue"
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-[#121212] shadow-soft-md transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.color }}
                >
                  <p.icon size={20} strokeWidth={2.4} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-[#E4E4E7]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

