import React from "react";
import { Database, Repeat, Unplug, EyeOff } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const problems = [
  { icon: Database, color: "#3B82F6", bg: "bg-blue-50", title: "Scattered Data", text: "Important information lives across too many systems — and none of them agree." },
  { icon: Repeat, color: "#FB7185", bg: "bg-rose-50", title: "Manual Operations", text: "People move, clean, and re-enter information by hand. Every single day." },
  { icon: Unplug, color: "#06B6D4", bg: "bg-cyan-50", title: "Disconnected Tools", text: "Your tools work alone. Nothing flows between them without manual effort." },
  { icon: EyeOff, color: "#8B5CF6", bg: "bg-violet-50", title: "Limited Visibility", text: "No single, reliable view of the business exists when decisions are made." },
];

export const ProblemSection: React.FC = () => {
  return (
    <section data-testid="problem-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionTag color="#FB7185">The problem</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Your business shouldn't depend on disconnected systems.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-slate-600">
              The tools usually work. The system around them doesn't. Growth turns small cracks into daily friction.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                data-testid={`problem-card-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`group h-full rounded-3xl ${p.bg} card-border border p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-xl`}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-soft-md transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.color }}
                >
                  <p.icon size={20} strokeWidth={2.1} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-[#0F172A]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
