import React from "react";
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle2, UserCheck } from "lucide-react";
import { Reveal } from "../Reveal";

interface InstantMeetingBannerProps {
  onOpenBooking: () => void;
  onNavigate: (view: string) => void;
}

export const InstantMeetingBanner: React.FC<InstantMeetingBannerProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <section data-testid="instant-meeting-banner" className="px-6 py-16 lg:px-10 lg:py-20 bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#1E1E1E] via-[#1E1E1E] to-[#16202E] p-8 sm:p-12 lg:p-14 shadow-2xl">
            {/* Ambient gradients */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#00BFFF]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#8B5CF6]/15 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/30 bg-[#121212] px-3.5 py-1 text-xs text-[#00BFFF]">
                  <Calendar size={13} />
                  <span>Instant Discovery &amp; Architecture Review</span>
                </div>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#E4E4E7]">
                  Have a bottleneck in mind? Let's map the solution in 30 minutes.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-xl">
                  Schedule a direct 1-on-1 discovery session with <strong className="text-[#E4E4E7]">Deepak Raj (Founder — deepliX)</strong>. We will review your current systems, data flows, and build a free preliminary architectural roadmap.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    data-testid="banner-book-call-button"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-7 py-3.5 text-sm font-bold text-[#121212] shadow-glow-blue hover:brightness-110 transition-all"
                  >
                    <Calendar size={16} />
                    <span>Book an Instant Meeting</span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate("contact")}
                    data-testid="banner-contact-button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121212] px-6 py-3.5 text-sm font-bold text-[#E4E4E7] hover:border-[#00BFFF]/40 hover:text-[#00BFFF] transition-colors"
                  >
                    Send Direct Message
                  </button>
                </div>
              </div>

              {/* Perks grid */}
              <div className="rounded-3xl border border-white/10 bg-[#121212]/80 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E4E4E7]">Session Guarantees</span>
                  <span className="font-mono text-xs text-[#00BFFF] flex items-center gap-1">
                    <Clock size={13} /> 15–45 Mins
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#A1A1AA]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#E4E4E7] block">Direct Senior Technical Discussion</strong>
                      <span>Talk directly with the founder and engineer — no proxy sales reps.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#E4E4E7] block">Immediate Architecture Feasibility</strong>
                      <span>We evaluate your database, API limits, and webhook sync capabilities on the spot.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#E4E4E7] block">Actionable Blueprint</strong>
                      <span>Walk away with clear next steps and system diagrams regardless of partnership.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
