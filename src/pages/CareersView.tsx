import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Upload,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  Globe,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  AlertCircle,
  X,
  FileCheck,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionTag } from "../components/SectionTag";

interface CareersViewProps {
  onNavigate: (view: string) => void;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  skills: string[];
}

export const OPEN_JOBS: JobOpening[] = [
  {
    id: "data-pipeline-eng",
    title: "Senior Data Pipeline Engineer",
    department: "Infrastructure & ETL",
    location: "Remote (US / EU)",
    type: "Full-time",
    experience: "5+ Years",
    description:
      "Design, build, and maintain fault-tolerant real-time data pipelines streaming millions of events daily across Snowflake, PostgreSQL, and Kafka.",
    skills: ["Python", "Apache Spark", "Kafka", "PostgreSQL", "Snowflake", "dbt"],
  },
  {
    id: "ai-systems-arch",
    title: "AI Systems Architect (RAG & Vector DBs)",
    department: "AI & Knowledge Systems",
    location: "Remote (Global)",
    type: "Full-time",
    experience: "4+ Years",
    description:
      "Architect enterprise Retrieval-Augmented Generation (RAG) engines, embedding pipelines, and semantic search systems with strict citations and sub-second latency.",
    skills: ["PyTorch / TensorFlow", "Pinecone / Qdrant", "LangChain", "FastAPI", "Docker"],
  },
  {
    id: "fullstack-infra-lead",
    title: "Full-Stack Systems Engineer",
    department: "Platform Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "3+ Years",
    description:
      "Build real-time system monitoring consoles, interactive architecture blueprint design tools, and unified client admin dashboards in React and Node.js.",
    skills: ["TypeScript", "React", "Node.js", "Express", "Tailwind CSS", "MongoDB"],
  },
  {
    id: "solutions-architect",
    title: "Forward Deployed Solutions Architect",
    department: "Client Engineering",
    location: "Remote (US East / West)",
    type: "Full-time",
    experience: "4+ Years",
    description:
      "Partner directly with CTOs and enterprise client engineering teams to map fragmented data environments into resilient deepliX system architectures.",
    skills: ["Enterprise Systems", "Cloud Security", "SQL Analytics", "Technical Advisory"],
  },
];

export const CareersView: React.FC<CareersViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedRole, setSelectedRole] = useState<string>("data-pipeline-eng");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Senior Data Pipeline Engineer",
    experienceYears: "3-5",
    linkedin: "",
    github: "",
    portfolio: "",
    coverLetter: "",
    resumeText: "",
  });

  const [resumeFile, setResumeFile] = useState<{
    name: string;
    size: number;
    type: string;
    dataUrl: string;
  } | null>(null);

  const [resumeMode, setResumeMode] = useState<"file" | "text">("file");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleSelect = (job: JobOpening) => {
    setSelectedRole(job.id);
    setForm((prev) => ({ ...prev, role: job.title }));
    const formEl = document.getElementById("job-application-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File size exceeds 5MB limit. Please upload a smaller PDF or document.");
      return;
    }

    setErrorMsg("");
    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please provide your full name and email address.");
      return;
    }

    if (resumeMode === "file" && !resumeFile) {
      setErrorMsg("Please upload your resume document or switch to 'Paste Text' mode.");
      return;
    }

    if (resumeMode === "text" && !form.resumeText.trim()) {
      setErrorMsg("Please paste your resume summary or work history text.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        experienceYears: form.experienceYears,
        linkedin: form.linkedin.trim(),
        github: form.github.trim(),
        portfolio: form.portfolio.trim(),
        coverLetter: form.coverLetter.trim(),
        resumeFileName: resumeFile?.name || "Pasted Resume",
        resumeDataUrl: resumeFile?.dataUrl || "",
        resumeText: form.resumeText.trim(),
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setRefId(data.applicationId || `APP-${Date.now().toString().slice(-6)}`);
      } else {
        setErrorMsg(data.error || "Failed to submit application. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-testid="careers-page" className="relative overflow-hidden px-6 pb-28 pt-28 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <SectionTag color="#3B82F6">Join Our Team</SectionTag>
          <h1 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl lg:text-6xl tracking-tight">
            Build Connected <span className="text-blue-600">Data Infrastructure</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
            deepliX engineers resilient real-time pipelines, AI knowledge assistants, and automated operational architecture. We're hiring thinkers, builders, and systems engineers worldwide.
          </p>
        </Reveal>

        {/* Culture / Value Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Globe,
              title: "100% Remote First",
              desc: "Work asynchronously from anywhere in the world with flexible core hours.",
              color: "#3B82F6",
            },
            {
              icon: Zap,
              title: "High Impact Stack",
              desc: "Solve critical data bottlenecks for enterprise clients using cutting-edge AI & streaming tech.",
              color: "#06B6D4",
            },
            {
              icon: Award,
              title: "Competitive Pay & Equity",
              desc: "Top tier salary compensation packages, equity grants, and annual performance bonuses.",
              color: "#8B5CF6",
            },
            {
              icon: Sparkles,
              title: "Tech & Wellness Stipend",
              desc: "$3,000 annual budget for hardware upgrades, home office setup, and learning courses.",
              color: "#10B981",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl border card-border bg-white p-6 shadow-soft-sm transition-all hover:shadow-soft-md"
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-xl text-white shadow-soft-sm"
                style={{ background: card.color }}
              >
                <card.icon size={20} />
              </span>
              <h3 className="mt-4 text-sm font-bold text-[#0F172A]">{card.title}</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Job Listings */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                Current Opportunities
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                Open Engineering Roles ({OPEN_JOBS.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Select a position below to auto-fill the application form.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {OPEN_JOBS.map((job) => {
              const isSelected = selectedRole === job.id;
              return (
                <div
                  key={job.id}
                  data-testid={`career-job-card-${job.id}`}
                  className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-soft-sm transition-all duration-300 hover:shadow-soft-xl ${
                    isSelected ? "border-blue-600 ring-2 ring-blue-600/20" : "card-border"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] font-bold text-blue-600 uppercase">
                        {job.department}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-medium text-slate-600">
                        {job.location}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-medium text-slate-600">
                        {job.experience}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-slate-500">
                      {job.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRoleSelect(job)}
                      data-testid={`apply-role-btn-${job.id}`}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-glow-blue"
                          : "bg-[#0F172A] text-white hover:bg-blue-600"
                      }`}
                    >
                      Apply Now <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form Section */}
        <div id="job-application-form" className="mt-24 scroll-mt-28">
          <div className="rounded-[2.5rem] border card-border bg-white p-8 shadow-soft-xl sm:p-12">
            {submitted ? (
              <div data-testid="career-application-success" className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500 text-white shadow-glow-emerald">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="mt-6 text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                  Application Submitted Successfully!
                </h2>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for applying to deepliX. Our talent engineering team will review your credentials and get back to you shortly.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-mono font-bold text-slate-700">
                  <span>Reference ID:</span>
                  <span className="text-blue-600">{refId}</span>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        role: "Senior Data Pipeline Engineer",
                        experienceYears: "3-5",
                        linkedin: "",
                        github: "",
                        portfolio: "",
                        coverLetter: "",
                        resumeText: "",
                      });
                      setResumeFile(null);
                    }}
                    className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                    <Briefcase size={14} /> Career Application Form
                  </div>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                    Apply for a Position
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Fill out your contact info, attach your resume, and submit your application directly to our engineering team.
                  </p>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-4 text-xs font-bold text-rose-700 border border-rose-200">
                    <AlertCircle size={18} className="shrink-0 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Form Inputs Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="applicant-name" className="block text-xs font-bold text-[#0F172A]">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <User size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="applicant-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        data-testid="applicant-name-input"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicant-email" className="block text-xs font-bold text-[#0F172A]">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Mail size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="applicant-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@example.com"
                        data-testid="applicant-email-input"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicant-phone" className="block text-xs font-bold text-[#0F172A]">
                      Phone Number
                    </label>
                    <div className="relative mt-1.5">
                      <Phone size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="applicant-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-1234"
                        data-testid="applicant-phone-input"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicant-role" className="block text-xs font-bold text-[#0F172A]">
                      Position Applying For <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="applicant-role"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      data-testid="applicant-role-select"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-xs text-[#0F172A] focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      {OPEN_JOBS.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title} ({j.department})
                        </option>
                      ))}
                      <option value="General Engineering Inquiry">General Engineering Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="applicant-experience" className="block text-xs font-bold text-[#0F172A]">
                      Years of Experience
                    </label>
                    <select
                      id="applicant-experience"
                      value={form.experienceYears}
                      onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                      data-testid="applicant-exp-select"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-xs text-[#0F172A] focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="0-2">0 - 2 Years (Junior / Associate)</option>
                      <option value="3-5">3 - 5 Years (Mid-Level)</option>
                      <option value="5-8">5 - 8 Years (Senior)</option>
                      <option value="8+">8+ Years (Staff / Principal / Lead)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="applicant-linkedin" className="block text-xs font-bold text-[#0F172A]">
                      LinkedIn Profile
                    </label>
                    <div className="relative mt-1.5">
                      <Linkedin size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="applicant-linkedin"
                        type="url"
                        value={form.linkedin}
                        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        data-testid="applicant-linkedin-input"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicant-github" className="block text-xs font-bold text-[#0F172A]">
                      GitHub / Code Repository
                    </label>
                    <div className="relative mt-1.5">
                      <Github size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="applicant-github"
                        type="url"
                        value={form.github}
                        onChange={(e) => setForm({ ...form, github: e.target.value })}
                        placeholder="https://github.com/username"
                        data-testid="applicant-github-input"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicant-portfolio" className="block text-xs font-bold text-[#0F172A]">
                      Portfolio / Personal Website
                    </label>
                    <div className="relative mt-1.5">
                      <Globe size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="applicant-portfolio"
                        type="url"
                        value={form.portfolio}
                        onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                        placeholder="https://alexmorgan.dev"
                        data-testid="applicant-portfolio-input"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Resume Upload Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#0F172A]">
                      Resume / CV Document <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex rounded-lg border border-slate-200 p-0.5 text-[11px] font-semibold bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setResumeMode("file")}
                        className={`rounded-md px-3 py-1 transition-all ${
                          resumeMode === "file" ? "bg-white text-blue-600 shadow-soft-xs" : "text-slate-500"
                        }`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setResumeMode("text")}
                        className={`rounded-md px-3 py-1 transition-all ${
                          resumeMode === "text" ? "bg-white text-blue-600 shadow-soft-xs" : "text-slate-500"
                        }`}
                      >
                        Paste Text
                      </button>
                    </div>
                  </div>

                  {resumeMode === "file" ? (
                    <div>
                      {resumeFile ? (
                        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white shadow-soft-xs">
                              <FileCheck size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-emerald-900">{resumeFile.name}</p>
                              <p className="text-[10px] text-emerald-700 font-mono">
                                {(resumeFile.size / 1024).toFixed(1)} KB · Attached
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setResumeFile(null)}
                            className="rounded-full p-1.5 text-slate-400 hover:bg-emerald-200/50 hover:text-emerald-900 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="resume-upload-file"
                          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/30"
                        >
                          <Upload size={28} className="text-blue-600" />
                          <p className="mt-2 text-xs font-bold text-[#0F172A]">
                            Click to upload or drag &amp; drop your resume
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            Supports PDF, DOC, DOCX, or TXT up to 5MB
                          </p>
                          <input
                            id="resume-upload-file"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileChange}
                            data-testid="applicant-resume-file-input"
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    <div>
                      <textarea
                        rows={6}
                        value={form.resumeText}
                        onChange={(e) => setForm({ ...form, resumeText: e.target.value })}
                        placeholder="Paste your work history, summary, skills, education, and achievements here..."
                        data-testid="applicant-resume-text-input"
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label htmlFor="applicant-cover-letter" className="block text-xs font-bold text-[#0F172A]">
                    Cover Letter / Statement of Interest
                  </label>
                  <textarea
                    id="applicant-cover-letter"
                    rows={4}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    placeholder="Tell us about your technical projects, experience with data infrastructure, and why you'd like to join deepliX..."
                    data-testid="applicant-coverletter-input"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                {/* Submit CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Data processed securely in according to our Privacy Policy.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="submit-job-application-btn"
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-xs font-bold text-white shadow-glow-blue hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Job Application"}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
