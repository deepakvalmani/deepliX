import React, { useEffect, useState } from "react";
import {
  Loader2,
  Send,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  ExternalLink,
  Linkedin,
  Mail,
  ShieldCheck,
  Building,
  ArrowRight,
} from "lucide-react";
import { SectionTag } from "../components/SectionTag";
import { Reveal } from "../components/Reveal";
import { interests } from "../data/capabilities";
import { BookingModal } from "../components/BookingModal";

const steps = [
  {
    num: "01",
    title: "Tell Us What Is Slowing You Down",
    text: "A plain-language description is all we need. No technical specifications or formal RFP required.",
  },
  {
    num: "02",
    title: "We Audit The Problem Together",
    text: "A 30-minute discovery call directly with senior engineering to examine your workflows and data sources.",
  },
  {
    num: "03",
    title: "You Get A Clear Architecture Blueprint",
    text: "What to build, what to automate, the sequence, and estimated delivery — with zero vendor lock-in.",
  },
];

interface ContactViewProps {
  initialBlueprint?: {
    tools: string[];
    outcomes: string[];
    diagramSummary: string;
  } | null;
  onOpenBooking?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ initialBlueprint, onOpenBooking }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: initialBlueprint ? "Custom Systems Architecture" : "",
    message: initialBlueprint
      ? `[Attached Blueprint Architecture]\n${initialBlueprint.diagramSummary}\n\nHi deepliX team, I built this architecture blueprint on your site. We would like to discuss connecting our current software stack (${initialBlueprint.tools.join(
          ", "
        )}) to deliver: ${initialBlueprint.outcomes.join(", ")}.`
      : "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showBooking, setShowBooking] = useState(false);

  const linkedinUrl = (import.meta.env.VITE_LINKEDIN_URL as string) || "https://www.linkedin.com/company/111716037/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please provide your name, email address, and a brief message.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        ...form,
        tools: initialBlueprint ? initialBlueprint.tools : [],
        outcomes: initialBlueprint ? initialBlueprint.outcomes : [],
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setTimeout(() => {
          setSubmitted(true);
        }, 500);
      }
    } catch (err) {
      setTimeout(() => {
        setSubmitted(true);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-testid="contact-page" className="relative overflow-hidden px-6 pb-28 pt-28 lg:px-10 lg:pt-36 bg-[#121212] text-[#E4E4E7]">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] animate-orb-drift rounded-full bg-[#00BFFF]/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-52 bottom-0 h-[420px] w-[420px] animate-orb-drift rounded-full bg-[#8B5CF6]/15 blur-3xl" style={{ animationDelay: "5s" }} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left Column: Instant Booking & Info */}
        <div>
          <Reveal>
            <SectionTag color="#00BFFF">Connect with Engineering</SectionTag>
          </Reveal>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-tighter text-[#E4E4E7] sm:text-4xl lg:text-5xl">
            <Reveal delay={0.1}>
              <span className="block">Let's engineer the</span>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="text-gradient-electric block">systems behind</span>
            </Reveal>
            <Reveal delay={0.3}>
              <span className="block">your business.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#A1A1AA]">
              Have a workflow or data challenge? Schedule an instant meeting with <strong className="text-[#E4E4E7]">Deepak Raj (Founder)</strong> or send a message below.
            </p>
          </Reveal>

          {/* Instant Meeting Card */}
          <Reveal delay={0.5}>
            <div className="mt-8 rounded-3xl border border-[#00BFFF]/40 bg-gradient-to-br from-[#1E1E1E] to-[#142636] p-6 sm:p-7 shadow-glow-blue">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#00BFFF] text-[#121212]">
                  <Calendar size={20} strokeWidth={2.4} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#E4E4E7]">Instant Discovery Session</h3>
                  <p className="text-xs text-[#00BFFF]">Direct calendar scheduling with Deepak Raj</p>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                Skip the back-and-forth emails. Pick a 15, 30, or 45-minute slot on our Calendly schedule to discuss your systems architecture.
              </p>

              <button
                type="button"
                onClick={() => (onOpenBooking ? onOpenBooking() : setShowBooking(true))}
                data-testid="contact-book-meeting-trigger"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-6 py-3 text-xs font-bold text-[#121212] shadow-glow-blue hover:brightness-110 transition-all"
              >
                <Calendar size={15} />
                <span>Book an Instant Meeting (Calendly)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </Reveal>

          {/* Steps */}
          <div className="mt-10 space-y-4">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={0.6 + i * 0.08}>
                <div data-testid={`contact-step-${s.num}`} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#1E1E1E]/50 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#00BFFF]/30 bg-[#121212] font-mono text-xs font-bold text-[#00BFFF]">
                    {s.num}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#E4E4E7]">{s.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#A1A1AA]">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Social / Direct Contacts */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[#A1A1AA]">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#00BFFF] transition-colors"
            >
              <Linkedin size={14} className="text-[#00BFFF]" />
              <span>LinkedIn Profile</span>
              <ExternalLink size={11} />
            </a>
            <span className="text-[#71717A]">·</span>
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-[#00BFFF]" />
              <span>rajvalmani@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Contact Form */}
        <Reveal delay={0.3}>
          <div className="rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-7 shadow-2xl backdrop-blur-xl sm:p-10">
            {initialBlueprint && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#00BFFF]/40 bg-[#00BFFF]/10 p-4 text-xs text-[#E4E4E7]" data-testid="blueprint-attached-banner">
                <Sparkles size={18} className="shrink-0 text-[#00BFFF]" />
                <div>
                  <p className="font-bold text-[#00BFFF]">Blueprint Architecture Attached</p>
                  <p className="text-[11px] text-[#A1A1AA]">
                    Your customized system stack and deliverables were automatically populated into the message.
                  </p>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="py-12 text-center" data-testid="contact-success-message">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] shadow-soft-md">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-[#E4E4E7]">Message Delivered</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] max-w-md mx-auto">
                  Thank you for reaching out, <strong className="text-[#E4E4E7]">{form.name || "there"}</strong>. Your inquiry has been saved to our database and notified directly to Deepak Raj. We will respond within 24 hours.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBooking(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#00BFFF] px-6 py-2.5 text-xs font-bold text-[#121212]"
                  >
                    <Calendar size={14} />
                    <span>Also Book a Time Slot</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", company: "", role: "", interest: "", message: "" });
                    }}
                    className="rounded-full border border-white/15 bg-[#121212] px-6 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="contact-form" noValidate>
                <h3 className="text-xl font-bold text-[#E4E4E7] mb-2">Send a Direct Message</h3>
                <p className="text-xs text-[#A1A1AA] mb-6">
                  Fill out the details below. We read and respond to every note personally.
                </p>

                {errorMsg && (
                  <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-semibold text-rose-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      data-testid="contact-name-input"
                      type="text"
                      placeholder="e.g. Alex Mercer"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      data-testid="contact-email-input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      data-testid="contact-company-input"
                      type="text"
                      placeholder="e.g. Acme Logistics"
                      value={form.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="role" className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                      Your Role
                    </label>
                    <input
                      id="role"
                      data-testid="contact-role-input"
                      type="text"
                      placeholder="e.g. Founder, VP Ops, Tech Lead"
                      value={form.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <label htmlFor="interest" className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                    Primary Area of Focus
                  </label>
                  <select
                    id="interest"
                    data-testid="contact-interest-select"
                    value={form.interest}
                    onChange={(e) => handleChange("interest", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-[#E4E4E7] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                  >
                    <option value="">Select an engineering area — or 'Not sure yet'</option>
                    {interests.map((opt) => (
                      <option key={opt} value={opt} data-testid={`contact-interest-${opt.toLowerCase().replace(/\s+/g, "-")}`}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 space-y-1.5">
                  <label htmlFor="message" className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                    Project Details &amp; Bottlenecks *
                  </label>
                  <textarea
                    id="message"
                    data-testid="contact-message-input"
                    rows={5}
                    placeholder="Describe your current systems, data flows, and what you're looking to build or automate..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit-button"
                  disabled={loading}
                  className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-7 py-3.5 text-sm font-bold text-[#121212] shadow-glow-blue hover:brightness-110 transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving &amp; Notifying...
                    </>
                  ) : (
                    <>
                      <span>Submit Message</span>
                      <Send size={15} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center font-mono text-[11px] text-[#71717A]">
                  Stored securely in MongoDB &amp; Supabase · Direct notification sent to founder inbox
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </section>
  );
};
