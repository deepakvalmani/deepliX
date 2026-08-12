import React from "react";
import { TrendingUp, Repeat, BarChart3, Layers } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const audiences = [
  { icon: TrendingUp, color: "#3B82F6", bg: "bg-blue-50", title: "Growing Businesses", text: "When spreadsheets and manual processes start becoming bottlenecks." },
  { icon: Repeat, color: "#FB7185", bg: "bg-rose-50", title: "Operations-Heavy Businesses", text: "When teams depend on repetitive workflows and constant data movement." },
  { icon: BarChart3, color: "#10B981", bg: "bg-emerald-50", title: "Data-Driven Organizations", text: "When business decisions depend on reliable, current information." },
  { icon: Layers, color: "#8B5CF6", bg: "bg-violet-50", title: "Companies Scaling Technology", text: "When disconnected systems start becoming difficult to manage." },
];

export const AudienceSection: React.FC = () => {
  return (
    <section data-testid="audience-section" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionTag color="#F59E0B">Who we work with</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Built for businesses that are outgrowing manual operations.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div
                data-testid={`audience-card-${a.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`h-full rounded-3xl ${a.bg} card-border border p-7 shadow-soft-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-xl`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: a.color }}>
                  <a.icon size={20} strokeWidth={2.1} />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug text-[#0F172A]">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
