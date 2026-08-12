import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  X,
  Database,
  Search,
  FileText,
  Activity,
  ArrowRight,
  Sparkles,
  Bot,
  RefreshCw,
  Zap,
  Server,
  Layers,
} from "lucide-react";

interface SimulatorModalProps {
  demoId: string;
  onClose: () => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({
  demoId,
  onClose,
}) => {
  return (
    <div
      data-testid="simulator-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-700 bg-[#0B1220] text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          data-testid="simulator-close-btn"
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          {demoId === "automated-reporting" && <AutomatedReportingSim />}
          {demoId === "data-pipeline" && <DataPipelineSim />}
          {demoId === "ai-assistant" && <AIAssistantSim />}
          {demoId === "operations-dashboard" && <OperationsDashboardSim />}
          {demoId === "crm-integration" && <CrmIntegrationSim />}
        </div>
      </div>
    </div>
  );
};

/* 1. Automated Business Reporting Simulator */
const AutomatedReportingSim: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const runSimulation = () => {
    setRunning(true);
    setProgress(0);
    setCompleted(false);

    let val = 0;
    const interval = setInterval(() => {
      val += 20;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setRunning(false);
        setCompleted(true);
      }
    }, 400);
  };

  return (
    <div data-testid="sim-automated-reporting">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/20 text-blue-400">
          <FileText size={20} />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-white">
            Automated Business Reporting Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Live pipeline simulation: Extracting multi-source records &amp; generating executive PDF.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-slate-400">Pipeline Status</span>
          <span className="font-mono text-xs font-bold text-blue-400">
            {running
              ? `Compiling Report... ${progress}%`
              : completed
              ? "Report Generated (0.8s)"
              : "Ready"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pipeline Nodes */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div
            className={`rounded-xl border p-3 transition-colors ${
              progress >= 20
                ? "border-blue-500/50 bg-blue-500/10 text-white"
                : "border-white/5 bg-white/5 text-slate-500"
            }`}
          >
            <p className="font-mono text-[10px] uppercase">1. Extract Sources</p>
            <p className="mt-1 text-xs font-bold">Salesforce + Stripe</p>
          </div>
          <div
            className={`rounded-xl border p-3 transition-colors ${
              progress >= 60
                ? "border-cyan-500/50 bg-cyan-50/10 text-white"
                : "border-white/5 bg-white/5 text-slate-500"
            }`}
          >
            <p className="font-mono text-[10px] uppercase">2. Calculate KPIs</p>
            <p className="mt-1 text-xs font-bold">ARR, Churn, LTV</p>
          </div>
          <div
            className={`rounded-xl border p-3 transition-colors ${
              progress >= 100
                ? "border-emerald-500/50 bg-emerald-500/10 text-white"
                : "border-white/5 bg-white/5 text-slate-500"
            }`}
          >
            <p className="font-mono text-[10px] uppercase">3. Dispatch PDF</p>
            <p className="mt-1 text-xs font-bold">Email + Slack</p>
          </div>
        </div>

        {/* Output Preview */}
        {completed && (
          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 size={16} /> Generated Report: Weekly_Executive_Summary.pdf
              </span>
              <span className="font-mono text-[10px] text-slate-400">100% Verified</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-left">
              <div className="rounded-lg bg-black/40 p-2.5">
                <p className="font-mono text-[9px] text-slate-400">Monthly Revenue</p>
                <p className="text-sm font-bold text-white">$142,850 (+14%)</p>
              </div>
              <div className="rounded-lg bg-black/40 p-2.5">
                <p className="font-mono text-[9px] text-slate-400">Active Subscriptions</p>
                <p className="text-sm font-bold text-white">1,482 accounts</p>
              </div>
              <div className="rounded-lg bg-black/40 p-2.5">
                <p className="font-mono text-[9px] text-slate-400">Data Freshness</p>
                <p className="text-sm font-bold text-emerald-400">Just Now</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={runSimulation}
          disabled={running}
          data-testid="sim-reporting-run-btn"
          className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-glow-blue transition-all hover:bg-blue-500 disabled:opacity-50"
        >
          {running ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
          {running ? "Compiling..." : "Trigger Live Compilation"}
        </button>
      </div>
    </div>
  );
};

/* 2. Data Pipeline Architecture Simulator */
const DataPipelineSim: React.FC = () => {
  const [rows, setRows] = useState(0);
  const [active, setActive] = useState(false);

  const startStream = () => {
    setActive(true);
    setRows(0);
    let count = 0;
    const timer = setInterval(() => {
      count += Math.floor(Math.random() * 45) + 15;
      setRows(count);
      if (count > 500) {
        clearInterval(timer);
        setActive(false);
      }
    }, 300);
  };

  return (
    <div data-testid="sim-data-pipeline">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/20 text-cyan-400">
          <Database size={20} />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-white">
            Realtime Data Pipeline Stream
          </h3>
          <p className="text-xs text-slate-400">
            Extracting, schema validating, and writing records to the Warehouse.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-emerald-400 animate-ping" : "bg-slate-500"}`} />
            <span className="font-mono text-xs font-bold text-white">
              {active ? "Stream Active" : "Stream Idle"}
            </span>
          </div>
          <span className="font-mono text-xs text-cyan-400">
            {rows} records processed
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 font-mono text-[11px]">
          <div className="rounded-lg bg-black/40 p-3">
            <p className="text-slate-500">Source Event</p>
            <p className="mt-1 font-bold text-slate-200">PostgreSQL Log</p>
          </div>
          <div className="rounded-lg bg-black/40 p-3">
            <p className="text-slate-500">Validator</p>
            <p className="mt-1 font-bold text-emerald-400">Zod Strict Schema</p>
          </div>
          <div className="rounded-lg bg-black/40 p-3">
            <p className="text-slate-500">Latency</p>
            <p className="mt-1 font-bold text-cyan-400">&lt; 18ms</p>
          </div>
          <div className="rounded-lg bg-black/40 p-3">
            <p className="text-slate-500">Destination</p>
            <p className="mt-1 font-bold text-blue-400">Snowflake / DB</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-[10px] text-slate-300">
          <p className="text-slate-500">// Live Pipeline Log Stream</p>
          <p className="text-emerald-400">[07:46:12] Connected CDC connector stream</p>
          <p className="text-cyan-300">[07:46:13] Batch validation passed: {rows} items normalized</p>
          <p className="text-slate-400">[07:46:14] Commit log flushed to warehouse with zero dropped records</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={startStream}
          disabled={active}
          data-testid="sim-pipeline-run-btn"
          className="flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-glow-cyan transition-all hover:bg-cyan-400 disabled:opacity-50"
        >
          {active ? <RefreshCw size={14} className="animate-spin" /> : <Zap size={14} />}
          {active ? "Streaming Records..." : "Simulate Stream Burst"}
        </button>
      </div>
    </div>
  );
};

/* 3. AI Knowledge Assistant (RAG) Simulator */
const AIAssistantSim: React.FC = () => {
  const [query, setQuery] = useState("What is our enterprise SLA policy?");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setLoading(false);
      setResponse(
        "Based on Section 4.2 of the Enterprise Agreement document: deepliX provides a 99.99% Uptime SLA for all production pipelines with a 15-minute response window for P1 critical tickets."
      );
    }, 1200);
  };

  return (
    <div data-testid="sim-ai-assistant">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/20 text-violet-400">
          <Bot size={20} />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-white">
            AI Knowledge Assistant (RAG)
          </h3>
          <p className="text-xs text-slate-400">
            Verifiable semantic query against private vector document index.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-xs text-white focus:border-violet-500 focus:outline-none"
              placeholder="Ask a question about internal docs..."
            />
          </div>
          <button
            type="button"
            onClick={handleAsk}
            disabled={loading}
            data-testid="sim-ai-ask-btn"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-500 disabled:opacity-50"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
            Ask AI
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-3 py-6 text-xs text-violet-300">
            <RefreshCw size={16} className="animate-spin text-violet-400" />
            Searching vector embeddings &amp; retrieving cited document chunks...
          </div>
        )}

        {response && (
          <div className="rounded-xl border border-violet-500/30 bg-violet-950/30 p-4 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-[10px] text-violet-300">
                <Sparkles size={13} /> Verified RAG Answer
              </span>
              <span className="rounded-full bg-violet-900/60 px-2.5 py-0.5 font-mono text-[9px] text-violet-200">
                Citation: Enterprise_Agreement_v2.pdf (p. 14)
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-200">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* 4. Operations Command Dashboard Simulator */
const OperationsDashboardSim: React.FC = () => {
  const [nodeActive, setNodeActive] = useState(true);

  return (
    <div data-testid="sim-operations-dashboard">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <Activity size={20} />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-white">
            Operations Command Control
          </h3>
          <p className="text-xs text-slate-400">
            Real-time multi-service system metrics and instant failover toggle.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-black/40 p-3">
            <p className="font-mono text-[9px] text-slate-400">Primary Core Node</p>
            <div className="mt-1 flex items-center justify-between">
              <span className={`text-xs font-bold ${nodeActive ? "text-emerald-400" : "text-amber-400"}`}>
                {nodeActive ? "Healthy (100%)" : "Standby Switch"}
              </span>
              <button
                type="button"
                onClick={() => setNodeActive(!nodeActive)}
                className="rounded-md bg-white/10 px-2 py-1 font-mono text-[9px] text-white hover:bg-white/20"
              >
                Toggle
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-black/40 p-3">
            <p className="font-mono text-[9px] text-slate-400">Active API Workers</p>
            <p className="mt-1 text-sm font-bold text-white">12 / 12 Operational</p>
          </div>
          <div className="rounded-xl bg-black/40 p-3">
            <p className="font-mono text-[9px] text-slate-400">Pending Tasks</p>
            <p className="mt-1 text-sm font-bold text-cyan-400">0 in queue</p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-xs text-slate-300">
          <p className="font-bold text-emerald-400 mb-1">Live Telemetry Feedback</p>
          <p>
            System latency averaged <strong>12.4ms</strong> across all 6 connected business tools. Zero manual interventions required in the last 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

/* 5. CRM & ERP Integration Gateway Simulator */
const CrmIntegrationSim: React.FC = () => {
  const [synced, setSynced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSync = () => {
    setLoading(true);
    setSynced(false);
    setTimeout(() => {
      setLoading(false);
      setSynced(true);
    }, 1000);
  };

  return (
    <div data-testid="sim-crm-integration">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
          <Layers size={20} />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-white">
            CRM &amp; ERP Bi-Directional Gateway
          </h3>
          <p className="text-xs text-slate-400">
            Sync record modifications instantly across Salesforce, SAP, and Stripe.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="rounded-xl bg-black/40 p-4 font-mono text-xs">
          <p className="text-slate-400">// Modified Customer Record in Salesforce</p>
          <p className="mt-1 text-white">Account: "Acme Corp" · Tier: "Enterprise" · Billing: "$50,000/yr"</p>
        </div>

        {synced && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-4 space-y-2 font-mono text-xs text-rose-300 animate-fade-in">
            <p className="font-bold text-white">Sync Status: Propagated</p>
            <p>✓ SAP ERP updated: Invoicing terms set to Net 30</p>
            <p>✓ Stripe Customer updated: Default currency USD</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSync}
          disabled={loading}
          data-testid="sim-crm-sync-btn"
          className="flex items-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-rose-400 disabled:opacity-50"
        >
          {loading ? <RefreshCw size={14} className="animate-spin" /> : <ArrowRight size={14} />}
          {loading ? "Propagating Changes..." : "Trigger Bi-directional Sync"}
        </button>
      </div>
    </div>
  );
};
