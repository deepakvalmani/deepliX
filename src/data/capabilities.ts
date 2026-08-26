import { Database, Workflow, BarChart3, BrainCircuit, Blocks } from "lucide-react";

export interface Capability {
  num: string;
  slug: string;
  title: string;
  color: string;
  pastel: string;
  icon: any;
  tagline: string;
  problem: string;
  builds: string[];
  architecture: string[];
  outcome: string;
}

export const capabilities: Capability[] = [
  {
    num: "01",
    slug: "data-engineering",
    title: "Data Engineering",
    color: "#3B82F6",
    pastel: "#EFF6FF",
    icon: Database,
    tagline: "Reliable pipelines that collect, transform, and organize business data.",
    problem:
      "Critical numbers live in exports, inboxes, and spreadsheets. Every report starts with copy-paste, and nobody fully trusts the final result.",
    builds: ["ETL / ELT pipelines", "Data integration", "Data warehouses", "Data pipelines", "Analytics infrastructure"],
    architecture: ["Sources", "Pipelines", "Warehouse", "Models", "Dashboards"],
    outcome: "One reliable source of truth your whole team can trust for decisions.",
  },
  {
    num: "02",
    slug: "business-automation",
    title: "Business Automation",
    color: "#06B6D4",
    pastel: "#ECFEFF",
    icon: Workflow,
    tagline: "Repetitive operational processes, turned into reliable automated workflows.",
    problem:
      "Your team spends hours every week moving information between tools by hand — work that is slow, error-prone, and invisible until something breaks.",
    builds: ["API integrations", "Workflow automation", "Reporting automation", "Notifications & alerts", "Data synchronization"],
    architecture: ["Trigger", "Rules", "Actions", "Sync", "Monitoring"],
    outcome: "Repetitive work happens automatically — accurately, every single time.",
  },
  {
    num: "03",
    slug: "business-intelligence",
    title: "Business Intelligence",
    color: "#10B981",
    pastel: "#ECFDF5",
    icon: BarChart3,
    tagline: "Scattered data, turned into useful information for decision-making.",
    problem:
      "Decisions get made on stale exports and gut feeling, because producing a current, correct number takes days of manual compilation.",
    builds: ["Executive dashboards", "Operational dashboards", "KPI tracking", "Automated reporting", "Analytics"],
    architecture: ["Data layer", "Metrics", "Dashboards", "Alerts"],
    outcome: "Decisions backed by numbers that are current, correct, and instantly visible.",
  },
  {
    num: "04",
    slug: "ai-systems",
    title: "AI Systems",
    color: "#8B5CF6",
    pastel: "#F5F3FF",
    icon: BrainCircuit,
    tagline: "AI built around the actual context and data of your business.",
    problem:
      "Your company's knowledge is trapped in documents, inboxes, and people's heads. Generic AI tools don't know your business — so they guess.",
    builds: ["RAG systems", "Internal AI assistants", "Knowledge systems", "AI-powered workflows", "Intelligent automation"],
    architecture: ["Knowledge base", "Retrieval", "AI model", "Assistant", "Workflows"],
    outcome: "AI that answers with your business context — not generic guesses.",
  },
  {
    num: "05",
    slug: "systems-integration",
    title: "Systems Integration",
    color: "#FB7185",
    pastel: "#FFF1F2",
    icon: Blocks,
    tagline: "The technology you already use, connected into one cohesive environment.",
    problem:
      "Your CRM, accounting, and inventory systems each hold a different version of reality. People reconcile the differences manually.",
    builds: ["CRM integration", "ERP connection", "Accounting sync", "Database linking", "Custom APIs"],
    architecture: ["CRM", "Integration layer", "ERP", "Accounting", "Internal tools"],
    outcome: "Enter data once, use it everywhere — every system stays in sync.",
  },
];

export const interests = [
  "Data Engineering",
  "Automation",
  "Analytics",
  "AI Systems",
  "System Integration",
  "Internal Software",
  "Not sure yet",
];
