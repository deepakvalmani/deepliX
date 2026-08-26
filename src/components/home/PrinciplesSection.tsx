import React from "react";
import founderProfileImg from "../../assets/images/deepak_exact_profile_1787759968643.jpg";
import { ShieldCheck, Lock, Eye, TrendingUp, Infinity as InfinityIcon, ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionTag } from "../SectionTag";

const principles = [
  { icon: ShieldCheck, color: "#00BFFF", title: "Reliability", text: "Systems should run consistently with automated failovers — not just on launch day." },
  { icon: Lock, color: "#38BDF8", title: "Data Security", text: "Business data must be encrypted, audited, and isolated at every stage." },
  { icon: Eye, color: "#8B5CF6", title: "Full Transparency", text: "You should always understand what is being built, why, and how to operate it." },
  { icon: TrendingUp, color: "#10B981", title: "Modular Scalability", text: "Pipelines and services are designed to scale as operational volume multiples." },
  { icon: InfinityIcon, color: "#FB7185", title: "Long-Term Thinking", text: "Technology must remain performant, modern, and easily maintainable." },
];

interface PrinciplesSectionProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ onNavigate }) => {
  return (
    <section data-testid="principles-section" className="px-6 py-20 lg:px-10 lg:py-28 bg-[#121212]">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <SectionTag color="#00BFFF">Core Principles</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              Built around engineering principles.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#A1A1AA]">
              We earn trust through clean architecture, predictable milestones, and reliable software that quietly powers your business operations.
            </p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div
                  data-testid={`principle-${p.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#1E1E1E]/50 p-4 transition-colors duration-200 hover:border-[#00BFFF]/30 hover:bg-[#1E1E1E]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#121212] border border-white/10 text-[#00BFFF]">
                    <p.icon size={19} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#E4E4E7]">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#A1A1AA]">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div data-testid="founder-card" className="relative h-fit overflow-hidden rounded-[2rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-soft-md lg:sticky lg:top-28 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00BFFF]/10 blur-3xl" aria-hidden="true" />
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-[#00BFFF]/50 shadow-glow-blue bg-[#121212]">
              <img
                src={founderProfileImg}
                alt="Deepak Raj - Founder of deepliX"
                className="h-full w-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#E4E4E7]">Deepak Raj</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#00BFFF]">Founder — deepliX</p>
            <p className="mt-5 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
              deepliX is engineered with a long-term commitment: to become the reliable technical partner behind scaling businesses. Clean code, real-time data flows, and systems that just work.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("about")}
              data-testid="founder-learn-more-link"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#00BFFF] transition-colors duration-300 hover:brightness-125"
            >
              Learn about deepliX
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

