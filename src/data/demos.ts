import { FileBarChart, Database, MessageSquare, LayoutDashboard, Blocks } from "lucide-react";

export interface SystemDemo {
  id: string;
  title: string;
  icon: any;
  color: string;
  pastel: string;
  desc: string;
  tags: string[];
  image?: string;
  metrics?: { label: string; value: string }[];
}

export const demos: SystemDemo[] = [
  {
    id: "automated-reporting",
    title: "Automated Business Reporting System",
    icon: FileBarChart,
    color: "#3B82F6",
    pastel: "#EFF6FF",
    desc: "Scheduled reports generated automatically from live business data — no manual exports, no Friday spreadsheet compilation ritual.",
    tags: ["Reporting", "Automation", "Scheduled Jobs"],
    metrics: [
      { label: "Compilation time", value: "0 mins" },
      { label: "Data accuracy", value: "100%" }
    ]
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline Architecture",
    icon: Database,
    color: "#06B6D4",
    pastel: "#ECFEFF",
    desc: "A reference pipeline moving data from operational tools into a central warehouse, cleaned and modeled automatically on the way.",
    tags: ["ETL", "Warehousing", "Modeling"],
    image:
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    metrics: [
      { label: "Sync frequency", value: "Realtime" },
      { label: "Schema validation", value: "Strict" }
    ]
  },
  {
    id: "ai-assistant",
    title: "AI Knowledge Assistant",
    icon: MessageSquare,
    color: "#8B5CF6",
    pastel: "#F5F3FF",
    desc: "Ask questions against company documents and get cited, verifiable answers using retrieval-augmented generation (RAG).",
    tags: ["RAG", "LLM", "Knowledge Base"],
    metrics: [
      { label: "Search latency", value: "<1.2s" },
      { label: "Citation rate", value: "100%" }
    ]
  },
  {
    id: "operations-dashboard",
    title: "Operations Command Dashboard",
    icon: LayoutDashboard,
    color: "#10B981",
    pastel: "#ECFDF5",
    desc: "Real-time visibility across orders, active tasks, and cross-departmental teams — one screen instead of five separate logins.",
    tags: ["Dashboards", "Real-time", "KPIs"],
    metrics: [
      { label: "Data freshness", value: "Sub-second" },
      { label: "Unified tools", value: "6 in 1" }
    ]
  },
  {
    id: "crm-integration",
    title: "CRM & ERP Integration Gateway",
    icon: Blocks,
    color: "#FB7185",
    pastel: "#FFF1F2",
    desc: "Bi-directional synchronization between CRM, accounting, and internal tools. Enter customer details once, update everywhere.",
    tags: ["CRM", "Sync", "Custom APIs"],
    image:
      "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    metrics: [
      { label: "Conflict resolution", value: "Automated" },
      { label: "API Uptime", value: "99.99%" }
    ]
  },
];
