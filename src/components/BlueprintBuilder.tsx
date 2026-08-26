import React, { useState } from "react";
import {
  Boxes,
  Database,
  Users,
  Mail,
  Table,
  Workflow,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  RotateCcw,
  Zap,
  ChevronDown,
  ChevronUp,
  Search,
  ShoppingBag,
  CreditCard,
  MessageCircle,
  Cloud,
  Activity,
  FileSpreadsheet,
  Check,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionTag } from "./SectionTag";

interface ToolOption {
  id: string;
  name: string;
  category: "crm" | "data" | "erp" | "finance" | "support";
  sublabel: string;
  icon: any;
  color: string;
}

const AVAILABLE_TOOLS: ToolOption[] = [
  // Primary visible by default (first 8)
  { id: "salesforce", name: "Salesforce CRM", category: "crm", sublabel: "Leads & Accounts", icon: Users, color: "#00A1E0" },
  { id: "hubspot", name: "HubSpot Marketing", category: "crm", sublabel: "Contacts & Deals", icon: Users, color: "#FF7A59" },
  { id: "sheets", name: "Google Sheets", category: "data", sublabel: "Operational Logs", icon: Table, color: "#0F9D58" },
  { id: "postgres", name: "PostgreSQL DB", category: "data", sublabel: "Transactional DB", icon: Database, color: "#336791" },
  { id: "sap", name: "SAP / Enterprise ERP", category: "erp", sublabel: "Supply Chain & Ops", icon: Boxes, color: "#008FD5" },
  { id: "stripe", name: "Stripe Billing", category: "finance", sublabel: "Subscription Data", icon: Zap, color: "#635BFF" },
  { id: "slack", name: "Slack & Teams", category: "support", sublabel: "Internal Comms", icon: Mail, color: "#4A154B" },
  { id: "zendesk", name: "Zendesk Support", category: "support", sublabel: "Customer Tickets", icon: MessageCircle, color: "#03363D" },

  // Secondary tools (shown on expand)
  { id: "snowflake", name: "Snowflake Warehouse", category: "data", sublabel: "Raw Data Lake", icon: Cloud, color: "#29B5E8" },
  { id: "airtable", name: "Airtable Workspaces", category: "data", sublabel: "Relational Bases", icon: FileSpreadsheet, color: "#F82B60" },
  { id: "mongodb", name: "MongoDB Atlas", category: "data", sublabel: "Document Store", icon: Database, color: "#47A248" },
  { id: "quickbooks", name: "QuickBooks Online", category: "finance", sublabel: "General Ledger", icon: CreditCard, color: "#2CA01C" },
  { id: "netsuite", name: "Oracle NetSuite", category: "erp", sublabel: "Financial ERP", icon: Boxes, color: "#1D3B6A" },
  { id: "shopify", name: "Shopify Store", category: "crm", sublabel: "Orders & Inventory", icon: ShoppingBag, color: "#95BF47" },
  { id: "intercom", name: "Intercom Messenger", category: "support", sublabel: "User Engagement", icon: MessageCircle, color: "#1F8CEB" },
  { id: "jira", name: "Jira / Asana", category: "erp", sublabel: "Project Tracking", icon: Workflow, color: "#0052CC" },
  { id: "s3", name: "AWS S3 / Storage", category: "data", sublabel: "Object Storage", icon: Cloud, color: "#FF9900" },
  { id: "xero", name: "Xero Accounting", category: "finance", sublabel: "Invoices & Payroll", icon: CreditCard, color: "#13B5EA" },
];

interface OutcomeOption {
  id: string;
  title: string;
  desc: string;
  subStatus: string;
  icon: any;
  color: string;
}

const OUTCOMES: OutcomeOption[] = [
  {
    id: "etl_warehouse",
    title: "Central Data Warehouse",
    desc: "Clean, continuous sync into one single source of truth.",
    subStatus: "Snowflake / BigQuery Warehouse",
    icon: Database,
    color: "#00BFFF",
  },
  {
    id: "automation",
    title: "Workflow Automation",
    desc: "Eliminate manual data transfer between disconnected tools.",
    subStatus: "Real-time Webhooks & Pipelines",
    icon: Workflow,
    color: "#38BDF8",
  },
  {
    id: "ai_rag",
    title: "Internal AI Assistant",
    desc: "Grounded AI answers backed by your private company data.",
    subStatus: "Vector Indexing + RAG Stream",
    icon: BrainCircuit,
    color: "#818CF8",
  },
  {
    id: "dashboards",
    title: "Executive Dashboards",
    desc: "Real-time KPIs and automated weekly leadership reports.",
    subStatus: "Sub-second Metabase / Looker",
    icon: BarChart3,
    color: "#34D399",
  },
];

const INITIAL_VISIBLE_COUNT = 8;

interface BlueprintBuilderProps {
  onAttachToContact?: (blueprintData: {
    tools: string[];
    outcomes: string[];
    diagramSummary: string;
  }) => void;
}

export const BlueprintBuilder: React.FC<BlueprintBuilderProps> = ({
  onAttachToContact,
}) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([
    "salesforce",
    "sheets",
    "postgres",
  ]);
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([
    "etl_warehouse",
    "automation",
  ]);
  const [customOutcome, setCustomOutcome] = useState("");
  const [showAllTools, setShowAllTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [synced, setSynced] = useState(false);

  const toggleTool = (id: string) => {
    setSelectedTools((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleOutcome = (id: string) => {
    setSelectedOutcomes((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  // Tool filtering logic
  const filteredTools = AVAILABLE_TOOLS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sublabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedTools =
    showAllTools || searchQuery || activeCategory !== "all"
      ? filteredTools
      : filteredTools.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = AVAILABLE_TOOLS.length - INITIAL_VISIBLE_COUNT;

  const handleGenerate = () => {
    setSynced(true);
    if (onAttachToContact) {
      const toolNames = AVAILABLE_TOOLS.filter((t) =>
        selectedTools.includes(t.id)
      ).map((t) => t.name);
      const outcomeTitles = OUTCOMES.filter((o) =>
        selectedOutcomes.includes(o.id)
      ).map((o) => o.title);

      if (customOutcome.trim()) {
        outcomeTitles.push(`Custom Goal: "${customOutcome.trim()}"`);
      }

      onAttachToContact({
        tools: toolNames,
        outcomes: outcomeTitles,
        diagramSummary: `Source Stack: ${toolNames.join(
          ", "
        )} -> Target Systems: ${outcomeTitles.join(", ")}${
          customOutcome.trim() ? `\nClient Specific Custom Goal: ${customOutcome.trim()}` : ""
        }`,
      });
    }
  };

  const activeToolObjects = AVAILABLE_TOOLS.filter((t) =>
    selectedTools.includes(t.id)
  );
  const activeOutcomeObjects = OUTCOMES.filter((o) =>
    selectedOutcomes.includes(o.id)
  );

  // Calculate dynamic architecture stats for the animated canvas
  const estimatedThroughput = (activeToolObjects.length * 480 + 240).toLocaleString();
  const activePipelines = activeToolObjects.length * activeOutcomeObjects.length;

  return (
    <section
      data-testid="blueprint-builder"
      className="relative min-h-screen bg-[#121212] text-[#E4E4E7] overflow-hidden px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <SectionTag color="#00BFFF">Interactive Architecture Tool</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#E4E4E7] sm:text-4xl lg:text-5xl">
              System Architecture Blueprint Builder
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-[#A1A1AA]">
              Select your current tools and desired outcomes to generate a live, animated proposed technology architecture diagram.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_1.15fr]">
          {/* Controls Column */}
          <div className="space-y-8 rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl sm:p-9">
            {/* Step 1: Tool Selection */}
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#00BFFF]">
                  Step 1: Your Source Software Stack
                </span>
                <span className="rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-2.5 py-0.5 font-mono text-xs font-bold text-[#00BFFF]">
                  {selectedTools.length} selected
                </span>
              </div>
              <p className="mt-1 text-xs text-[#A1A1AA]">
                Choose the operational software tools where your core company data resides.
              </p>

              {/* Optional Category & Search Filter bar */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[140px]">
                  <Search size={13} className="absolute left-3 top-2.5 text-[#71717A]" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141414] pl-8 pr-3 py-1.5 text-xs text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    ["all", "All"],
                    ["crm", "CRM"],
                    ["data", "Data"],
                    ["erp", "ERP"],
                    ["finance", "Finance"],
                  ].map(([cat, label]) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-lg px-2.5 py-1 font-mono text-[10px] font-semibold transition-colors ${
                        activeCategory === cat
                          ? "bg-[#00BFFF] text-[#121212] font-bold"
                          : "bg-white/5 text-[#A1A1AA] hover:bg-white/10 hover:text-[#E4E4E7]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tools Grid */}
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {displayedTools.map((t) => {
                  const isSel = selectedTools.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTool(t.id)}
                      data-testid={`blueprint-tool-${t.id}`}
                      className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                        isSel
                          ? "border-[#00BFFF] bg-[#00BFFF]/10 shadow-glow-blue ring-1 ring-[#00BFFF]/30"
                          : "border-white/10 bg-[#141414] hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white shadow-soft-sm transition-transform duration-200 group-hover:scale-105"
                        style={{ background: t.color }}
                      >
                        <t.icon size={15} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#E4E4E7]">
                          {t.name}
                        </p>
                        <p className="truncate font-mono text-[9px] text-[#A1A1AA]">
                          {t.sublabel}
                        </p>
                      </div>
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all ${
                          isSel
                            ? "border-[#00BFFF] bg-[#00BFFF] text-[#121212]"
                            : "border-white/20 bg-white/5 text-transparent group-hover:border-white/40"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Show More / Show Fewer Expand Toggle */}
              {!searchQuery && activeCategory === "all" && (
                <button
                  type="button"
                  onClick={() => setShowAllTools(!showAllTools)}
                  data-testid="toggle-more-tools-btn"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-[#141414] py-2.5 font-mono text-xs font-bold text-[#A1A1AA] transition-all hover:border-[#00BFFF] hover:bg-[#00BFFF]/5 hover:text-[#00BFFF]"
                >
                  {showAllTools ? (
                    <>
                      <ChevronUp size={14} /> Show Fewer Tools
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} /> Show More Enterprise Tools (+{hiddenCount} more)
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Step 2: Outcomes Selection */}
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#38BDF8]">
                  Step 2: Desired Outcomes
                </span>
                <span className="rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-2.5 py-0.5 font-mono text-xs font-bold text-[#38BDF8]">
                  {selectedOutcomes.length} selected
                </span>
              </div>
              <p className="mt-1 text-xs text-[#A1A1AA]">
                Choose what your connected data infrastructure should automate or deliver.
              </p>

              <div className="mt-4 space-y-2.5">
                {OUTCOMES.map((o) => {
                  const isSel = selectedOutcomes.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => toggleOutcome(o.id)}
                      data-testid={`blueprint-outcome-${o.id}`}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                        isSel
                          ? "border-[#00BFFF] bg-[#00BFFF]/10 shadow-glow-blue ring-1 ring-[#00BFFF]/30"
                          : "border-white/10 bg-[#141414] hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white shadow-soft-sm"
                        style={{ background: o.color }}
                      >
                        <o.icon size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#E4E4E7]">{o.title}</p>
                        <p className="text-[11px] leading-snug text-[#A1A1AA]">{o.desc}</p>
                      </div>
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all ${
                          isSel
                            ? "border-[#00BFFF] bg-[#00BFFF] text-[#121212]"
                            : "border-white/20 bg-white/5 text-transparent"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Client Outcome Box */}
              <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-[#141414] p-3.5 transition-all focus-within:border-[#00BFFF] focus-within:bg-[#00BFFF]/5">
                <label htmlFor="custom-outcome-input" className="block text-xs font-bold text-[#E4E4E7] flex items-center justify-between">
                  <span>Custom Goal or Workflow Requirement</span>
                  <span className="font-mono text-[10px] text-[#00BFFF] font-semibold uppercase">Optional</span>
                </label>
                <p className="mt-0.5 text-[11px] text-[#A1A1AA]">
                  Describe any unique data connection, SLA requirement, or custom workflow you need.
                </p>
                <textarea
                  id="custom-outcome-input"
                  data-testid="blueprint-custom-outcome-input"
                  rows={2}
                  value={customOutcome}
                  onChange={(e) => setCustomOutcome(e.target.value)}
                  placeholder="e.g. Real-time sync from Shopify to SAP with custom Slack alerts on high-value orders..."
                  className="mt-2 w-full rounded-lg border border-white/10 bg-[#1E1E1E] p-2.5 text-xs text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleGenerate}
                data-testid="blueprint-attach-button"
                className="group flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#00BFFF] px-6 py-3.5 text-xs font-bold text-[#121212] shadow-glow-blue transition-all duration-300 hover:bg-[#38BDF8] hover:-translate-y-0.5"
              >
                <Sparkles size={15} className="text-[#121212]" />
                Attach Blueprint &amp; Contact Us
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTools(["salesforce", "sheets", "postgres"]);
                  setSelectedOutcomes(["etl_warehouse", "automation"]);
                  setSearchQuery("");
                  setActiveCategory("all");
                  setSynced(false);
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[#141414] px-4 py-3 text-xs font-semibold text-[#A1A1AA] transition-colors hover:bg-white/10 hover:text-[#E4E4E7]"
                title="Reset choices"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            </div>
          </div>

          {/* Dynamic Animated Architecture Canvas */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0E1520] p-6 shadow-2xl sm:p-8">
            {/* Animated Canvas Backgrounds */}
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-orb-drift rounded-full bg-[#00BFFF]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 animate-orb-drift rounded-full bg-[#38BDF8]/15 blur-3xl" style={{ animationDelay: "4s" }} />

            {/* Canvas Header Telemetry */}
            <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00BFFF] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00BFFF]" />
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#00BFFF] flex items-center gap-1.5">
                  <Layers size={13} /> Live Architecture Stream
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[10px] text-[#A1A1AA]">
                <span className="flex items-center gap-1">
                  <Activity size={12} className="text-emerald-400" /> {estimatedThroughput} rec/sec
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="hidden sm:inline">Pipelines: {activePipelines}</span>
              </div>
            </div>

            {/* Interactive Visual Node Diagram */}
            <div className="relative z-10 space-y-6">
              {/* Row 1: Source Stack */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#71717A]">
                    1. Ingestion Sources ({activeToolObjects.length})
                  </span>
                  <span className="font-mono text-[9px] text-[#00BFFF]/80">
                    Auto-Validated Schemas
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeToolObjects.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-center text-xs italic text-[#71717A]">
                      Select software tools on the left to activate data conduits...
                    </div>
                  ) : (
                    activeToolObjects.map((t) => (
                      <div
                        key={t.id}
                        className="group relative flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-[#E4E4E7] shadow-soft-sm backdrop-blur transition-all duration-300 hover:border-[#00BFFF]/50 hover:bg-white/15"
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full animate-pulse"
                          style={{ background: t.color }}
                        />
                        <span>{t.name}</span>
                        <span className="font-mono text-[9px] text-[#A1A1AA] font-normal">
                          · {t.sublabel}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Animated Data Stream Conduit 1 */}
              <div className="relative py-2">
                <svg className="h-6 w-full overflow-visible" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradient-flow-1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00BFFF" />
                      <stop offset="50%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="12"
                    x2="100%"
                    y2="12"
                    stroke="url(#gradient-flow-1)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-dash-flow opacity-80"
                  />
                </svg>

                <div className="absolute inset-x-0 -top-1 flex justify-center">
                  <div className="flex items-center gap-2 rounded-full border border-[#00BFFF]/30 bg-[#0E1520] px-3.5 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#00BFFF] shadow-glow-blue">
                    <Zap size={11} className="text-amber-400 animate-bounce" />
                    deepliX Core Orchestration Engine
                  </div>
                </div>
              </div>

              {/* Row 2: Central Processing Core */}
              <div className="relative overflow-hidden rounded-2xl border border-[#00BFFF]/30 bg-[#121E2E]/80 p-4.5 backdrop-blur shadow-glow-blue">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#00BFFF] text-[#121212] shadow-glow-blue">
                      <BrainCircuit size={20} className="text-[#121212]" />
                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0E1520]" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#E4E4E7] flex items-center gap-2">
                        Unified Data Model &amp; Event Bus
                        <span className="rounded bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-1.5 py-0.2 font-mono text-[9px] text-[#00BFFF]">
                          Active Sync
                        </span>
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-[#A1A1AA]">
                        Zero data loss · End-to-end encryption · Custom ETL / ELT Transformer
                      </p>
                    </div>
                  </div>

                  <div className="font-mono text-[9px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                    Status: Healthy
                  </div>
                </div>
              </div>

              {/* Animated Data Stream Conduit 2 */}
              <div className="relative py-2">
                <svg className="h-6 w-full overflow-visible" aria-hidden="true">
                  <line
                    x1="0"
                    y1="12"
                    x2="100%"
                    y2="12"
                    stroke="url(#gradient-flow-1)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-dash-flow opacity-80"
                  />
                </svg>

                <div className="absolute inset-x-0 -top-1 flex justify-center">
                  <span className="rounded-full border border-[#818CF8]/30 bg-[#0E1520] px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#818CF8]">
                    Realtime Event Routing
                  </span>
                </div>
              </div>

              {/* Row 3: Target Systems & Deliverables */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#71717A]">
                    2. Target Operational Deliverables ({activeOutcomeObjects.length + (customOutcome.trim() ? 1 : 0)})
                  </span>
                  <span className="font-mono text-[9px] text-[#818CF8]/80">
                    Continuous Delivery
                  </span>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {activeOutcomeObjects.length === 0 && !customOutcome.trim() ? (
                    <div className="col-span-2 rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-center text-xs italic text-[#71717A]">
                      Select target outcomes or write a custom goal to complete your architecture...
                    </div>
                  ) : (
                    <>
                      {activeOutcomeObjects.map((o) => (
                        <div
                          key={o.id}
                          className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur transition-all duration-300 hover:border-[#00BFFF]/50 hover:bg-white/15"
                        >
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white shadow-soft-sm"
                            style={{ background: o.color }}
                          >
                            <o.icon size={15} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-[#E4E4E7]">
                              {o.title}
                            </p>
                            <p className="truncate font-mono text-[9px] text-[#00BFFF]">
                              {o.subStatus}
                            </p>
                          </div>
                          <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                        </div>
                      ))}

                      {customOutcome.trim() && (
                        <div
                          data-testid="blueprint-canvas-custom-outcome-card"
                          className="col-span-1 sm:col-span-2 group flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-950/30 p-3 backdrop-blur transition-all duration-300 hover:border-amber-400"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-500 text-slate-950 font-bold shadow-glow-amber">
                            <Sparkles size={16} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                              Client Specific Custom Goal
                              <span className="rounded bg-amber-900/80 border border-amber-700/80 px-1.5 py-0.2 font-mono text-[8px] text-amber-300 uppercase">Custom Spec</span>
                            </p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[#E4E4E7] line-clamp-2 italic">
                              "{customOutcome.trim()}"
                            </p>
                          </div>
                          <CheckCircle2 size={15} className="shrink-0 text-amber-400 mt-0.5" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Canvas Footer Status Notification */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
              {synced ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-3 text-xs text-emerald-300" data-testid="blueprint-attached-confirm">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                  <div>
                    <p className="font-bold">Architecture attached to your contact request!</p>
                    <p className="text-[11px] text-emerald-400/80">
                      Scroll to the contact form or submit your inquiry to review with our team.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                  <span className="font-mono text-[10px] text-[#A1A1AA] flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#00BFFF]" /> Custom Architecture Spec Ready
                  </span>
                  <span className="font-mono text-[10px] text-[#A1A1AA]">
                    {activeToolObjects.length} sources → {activeOutcomeObjects.length} outcomes
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
