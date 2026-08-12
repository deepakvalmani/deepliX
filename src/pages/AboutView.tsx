import React, { useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";

const chapters = [
  {
    num: "01",
    title: "Why deepliX exists",
    text: "Most businesses don't have a technology problem. They have a connection problem. The tools work — the system around them doesn't. deepliX exists to close that gap.",
  },
  {
    num: "02",
    title: "The problem we solve",
    text: "As companies grow, operations fragment. Spreadsheets multiply, data stops agreeing, and good people spend their days on work a system should be doing.",
  },
  {
    num: "03",
    title: "Our philosophy",
    text: "Understand before building. Reliable over impressive. Boring, dependable infrastructure beats a clever demo — every single time.",
  },
  {
    num: "04",
    title: "The long-term vision",
    text: "deepliX is being built as a long-term partner: the team businesses call when their operations need to become systems — and the team that keeps those systems healthy as the business grows.",
  },
];

interface AboutViewProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader
        tag="About deepliX"
        color="#8B5CF6"
        lines={["We build the systems", "businesses depend on."]}
        description="deepliX is an early-stage technology company with a long-term vision: to become the trusted infrastructure partner behind growing businesses."
      />

      <section data-testid="about-story" className="px-6 pb-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {chapters.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.05}>
              <div
                data-testid={`about-chapter-${c.num}`}
                className={`grid gap-4 border-t border-slate-200 py-9 sm:grid-cols-[110px_1fr_1.2fr] sm:gap-10 ${
                  i === chapters.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-mono text-4xl font-bold text-slate-200 sm:text-5xl">{c.num}</span>
                <h2 className="text-xl font-extrabold tracking-tight text-[#0F172A] sm:text-2xl">{c.title}</h2>
                <p className="text-base leading-relaxed text-slate-600">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-testid="about-founder" className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-200/50 via-cyan-100/40 to-violet-200/40 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-soft-xl">
                <img
                  src="https://images.pexels.com/photos/8204363/pexels-photo-8204363.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="A modern team reviewing system diagrams"
                  className="h-[320px] w-full object-cover sm:h-[400px]"
                  loading="lazy"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
                  Systems, mapped before they're built
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionTag color="#3B82F6">The founder</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">Deepak Raj</h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600">Founder — deepliX</p>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              deepliX started from a simple observation: most businesses don't need more software — they need the software they already have to work together. Data that agrees. Workflows that run themselves. Numbers people can trust.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The company is early in its journey, deliberately. Every partner gets senior attention, honest answers, and systems built properly from day one — not inflated claims and borrowed logos.
            </p>
            <div className="mt-8 rounded-2xl border-l-4 border-blue-500 bg-blue-50/70 p-5">
              <p className="text-sm font-semibold leading-relaxed text-[#0F172A]">
                "Technology should quietly serve the business. If you notice the infrastructure more than the results, something is wrong."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
};
