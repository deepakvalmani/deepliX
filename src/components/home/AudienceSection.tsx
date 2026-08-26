import React from "react";
import { TrendingUp, Repeat, BarChart3, Layers } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const audiences = [
  { icon: TrendingUp, color: "#00BFFF", title: "Scaling Enterprises", text: "When spreadsheets and manual ad-hoc procedures start becoming operational bottlenecks." },
  { icon: Repeat, color: "#FB7185", title: "Operations-Heavy Teams", text: "When cross-functional teams lose hours to repetitive data handoffs and dual-entry." },
  { icon: BarChart3, color: "#10B981", title: "Data-Driven Companies", text: "When mission-critical business decisions require verifiable, live executive metrics." },
  { icon: Layers, color: "#8B5CF6", title: "Multi-System Infrastructures", text: "When disconnected SaaS tools, ERPs, and APIs start creating critical data silos." },
];

export const AudienceSection: React.FC = () => {
  return (
    <section data-testid="audience-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionTag color="#00BFFF">Target Partners</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
            Built for companies outgrowing manual processes.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div
                data-testid={`audience-card-${a.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group h-full rounded-3xl bg-[#1E1E1E] border border-white/10 p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00BFFF]/40 hover:shadow-glow-blue"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl text-[#121212] group-hover:scale-105 transition-transform" style={{ background: a.color }}>
                  <a.icon size={20} strokeWidth={2.4} />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug text-[#E4E4E7]">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

