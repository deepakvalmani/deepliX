import React, { useState } from "react";
import { Calendar, Clock, ArrowUpRight, CheckCircle2, Shield, Sparkles, X, Link as LinkIcon, ExternalLink, Send, Check } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = "30-Min Systems Architecture Discovery",
}) => {
  const defaultCalendly = (import.meta.env.VITE_CALENDLY_URL as string) || "https://calendly.com/deeplix";
  const [calendlyUrl, setCalendlyUrl] = useState(defaultCalendly);
  const [selectedDuration, setSelectedDuration] = useState<"15" | "30" | "45">("30");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [directBooking, setDirectBooking] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOpenCalendly = async () => {
    try {
      fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName || "Calendly Guest",
          email: guestEmail || "",
          company: guestCompany || "",
          duration: selectedDuration,
          topic: defaultTopic,
          notes: `Initiated via booking modal for ${selectedDuration} min session.`,
        }),
      }).catch((e) => console.warn("Booking record silent error:", e));
    } catch {
      // Non-blocking
    }
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName || "Scheduled Guest",
          email: guestEmail,
          company: guestCompany || "",
          duration: selectedDuration,
          topic: defaultTopic,
          notes: `Direct instant booking request for ${selectedDuration} min technical discovery.`,
        }),
      });
      if (res.ok) {
        setBookingSuccess(true);
      } else {
        // Fallback open Calendly
        handleOpenCalendly();
      }
    } catch {
      handleOpenCalendly();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      data-testid="booking-modal-overlay"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#1E1E1E] p-6 sm:p-8 shadow-2xl text-[#E4E4E7]"
        onClick={(e) => e.stopPropagation()}
        data-testid="booking-modal-content"
      >
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00BFFF]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#8B5CF6]/15 blur-3xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          data-testid="close-booking-modal"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#121212] text-[#A1A1AA] hover:text-[#E4E4E7] hover:border-white/20 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-[#00BFFF] shadow-glow-blue">
              <Calendar size={22} />
            </span>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00BFFF]">Direct Scheduling</span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#E4E4E7]">
                Book an Instant Discovery Call
              </h2>
            </div>
          </div>

          {bookingSuccess ? (
            <div className="mt-8 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#10B981]/20 text-[#10B981] mb-3">
                <Check size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#E4E4E7]">Session Request Confirmed!</h3>
              <p className="mt-2 text-xs text-[#A1A1AA] max-w-md mx-auto">
                We have registered your <strong>{selectedDuration}-minute</strong> discovery session request for <strong>{guestEmail}</strong>. Deepak Raj will reach out directly with calendar invites.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#1E1E1E] border border-white/10 px-5 py-2 text-xs font-semibold text-[#E4E4E7] hover:bg-white/5"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={handleOpenCalendly}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#00BFFF] px-5 py-2 text-xs font-bold text-[#121212]"
                >
                  <span>Also Open in Calendly</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed">
                Connect directly with <strong className="text-[#E4E4E7]">Deepak Raj (Founder — deepliX)</strong>. We will review your current systems, identify manual bottlenecks, and map an automated architecture.
              </p>

              {/* Session Types */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { time: "15", label: "Quick Triage", desc: "High-level feasibility" },
                  { time: "30", label: "Architecture Audit", desc: "Workflow & data mapping" },
                  { time: "45", label: "Full Blueprint", desc: "End-to-end scope" },
                ].map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    onClick={() => setSelectedDuration(s.time as any)}
                    className={`rounded-2xl border p-3.5 text-left transition-all ${
                      selectedDuration === s.time
                        ? "border-[#00BFFF] bg-[#00BFFF]/10 text-[#E4E4E7] shadow-glow-blue"
                        : "border-white/10 bg-[#121212]/60 text-[#A1A1AA] hover:border-white/20 hover:text-[#E4E4E7]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00BFFF]">{s.time} MIN</span>
                      <Clock size={13} className="text-[#A1A1AA]" />
                    </div>
                    <div className="mt-1 text-xs font-bold text-[#E4E4E7]">{s.label}</div>
                    <div className="mt-0.5 text-[10px] text-[#71717A] hidden sm:block">{s.desc}</div>
                  </button>
                ))}
              </div>

              {/* Quick direct booking fields */}
              {directBooking ? (
                <form onSubmit={handleDirectSubmit} className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-[#121212]/80 p-4">
                  <div className="text-xs font-bold text-[#E4E4E7] flex items-center justify-between">
                    <span>Direct Confirmation Info:</span>
                    <button
                      type="button"
                      onClick={() => setDirectBooking(false)}
                      className="text-[11px] text-[#A1A1AA] hover:text-[#00BFFF]"
                    >
                      Use Calendly Instead
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="rounded-xl border border-white/10 bg-[#1E1E1E] px-3.5 py-2 text-xs text-[#E4E4E7] placeholder-[#71717A] focus:border-[#00BFFF] focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="rounded-xl border border-white/10 bg-[#1E1E1E] px-3.5 py-2 text-xs text-[#E4E4E7] placeholder-[#71717A] focus:border-[#00BFFF] focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={guestCompany}
                    onChange={(e) => setGuestCompany(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#1E1E1E] px-3.5 py-2 text-xs text-[#E4E4E7] placeholder-[#71717A] focus:border-[#00BFFF] focus:outline-none"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-5 py-2 text-xs font-bold text-[#121212] shadow-glow-blue hover:brightness-110"
                    >
                      <Send size={12} />
                      <span>{isSubmitting ? "Confirming..." : `Confirm ${selectedDuration}-Min Slot`}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* What to expect */
                <div className="mt-5 rounded-2xl border border-white/5 bg-[#121212]/80 p-4">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#00BFFF]" /> What You Get During The Session:
                  </h4>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs text-[#A1A1AA]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                      <span>Zero sales pressure, pure technical audit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                      <span>Live review of your stack & data sources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                      <span>Identification of data sync bottlenecks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                      <span>Clear deliverable timeline & architecture</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCustomizing(!isCustomizing)}
                    className="text-xs text-[#71717A] hover:text-[#00BFFF] flex items-center gap-1.5 transition-colors"
                  >
                    <LinkIcon size={12} />
                    {isCustomizing ? "Hide link URL" : "Custom Link"}
                  </button>
                  {!directBooking && (
                    <button
                      type="button"
                      onClick={() => setDirectBooking(true)}
                      className="text-xs text-[#00BFFF] hover:underline"
                    >
                      Instant Request Form
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7] transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenCalendly}
                    data-testid="open-calendly-button"
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-6 py-2.5 text-xs font-bold text-[#121212] shadow-glow-blue hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Open Calendly ({selectedDuration} Min)</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Custom URL Editor */}
              {isCustomizing && (
                <div className="mt-4 rounded-xl border border-white/10 bg-[#121212] p-3 text-xs">
                  <label className="block text-[11px] text-[#A1A1AA] mb-1">
                    Configure your active Calendly URL:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={calendlyUrl}
                      onChange={(e) => setCalendlyUrl(e.target.value)}
                      placeholder="https://calendly.com/your-name/30min"
                      className="flex-1 rounded-lg border border-white/10 bg-[#1E1E1E] px-3 py-1.5 text-xs text-[#E4E4E7] focus:border-[#00BFFF] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomizing(false)}
                      className="rounded-lg bg-[#00BFFF] px-3 py-1.5 text-xs font-bold text-[#121212]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

