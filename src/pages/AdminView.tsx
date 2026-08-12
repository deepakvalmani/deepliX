import React, { useState, useEffect } from "react";
import {
  Lock,
  Search,
  RefreshCw,
  Download,
  Inbox,
  Building2,
  Mail,
  ShieldCheck,
  Eye,
  X,
  BarChart3,
  PieChart,
  Users,
  Sparkles,
  TrendingUp,
  Database,
  Workflow,
  BrainCircuit,
  CheckCircle2,
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  interest?: string;
  message: string;
  customOutcome?: string;
  tools?: string[];
  outcomes?: string[];
  hasBlueprint?: boolean;
  createdAt: string;
  status?: "new" | "contacted" | "qualified" | "archived";
}

interface AnalyticsData {
  totalLeads: number;
  blueprintLeads: number;
  standardLeads: number;
  interestsMap: Record<string, number>;
  toolsMap: Record<string, number>;
  outcomesMap: Record<string, number>;
}

interface AdminViewProps {
  onNavigate: (view: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("deeplix_admin_auth") === "true";
  });
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState<"inbox" | "analytics">("inbox");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const [subRes, analyticsRes] = await Promise.all([
        fetch("/api/submissions"),
        fetch("/api/admin/analytics"),
      ]);

      const subData = await subRes.json();
      setSubmissions(subData.submissions || []);
      setSource(subData.source || "local");

      if (analyticsRes.ok) {
        const aData = await analyticsRes.json();
        setAnalytics(aData);
      }
    } catch (err) {
      console.error("Failed to fetch submissions or analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "deeplix2026" || passcode.trim() === "admin") {
      sessionStorage.setItem("deeplix_admin_auth", "true");
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("deeplix_admin_auth");
    setIsAuthenticated(false);
  };

  const exportCSV = () => {
    if (submissions.length === 0) return;
    const headers = ["ID", "Date", "Name", "Email", "Company", "Role", "Interest", "Message"];
    const rows = submissions.map((s) => [
      s.id,
      s.createdAt,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.company || "").replace(/"/g, '""')}"`,
      `"${(s.role || "").replace(/"/g, '""')}"`,
      `"${(s.interest || "").replace(/"/g, '""')}"`,
      `"${s.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `deeplix_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = submissions.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.company || "").toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div data-testid="admin-login-view" className="flex min-h-[80vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-[2.5rem] border card-border bg-white p-8 shadow-soft-xl sm:p-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 shadow-soft-sm">
            <Lock size={26} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#0F172A]">Protected Admin Inbox</h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Enter admin passcode to view locally saved contact form submissions and lead records.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: deeplix2026)"
                data-testid="admin-passcode-input"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-[#0F172A] focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {passError && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">
                  Incorrect passcode. (Default passcode: <code>deeplix2026</code>)
                </p>
              )}
            </div>

            <button
              type="submit"
              data-testid="admin-login-btn"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3.5 text-xs font-bold text-white shadow-soft-md hover:bg-blue-600 transition-colors"
            >
              <ShieldCheck size={16} /> Access Inbox
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pre-calculate tool list array for analytics chart
  const toolsArray: [string, number][] = analytics
    ? (Object.entries(analytics.toolsMap) as [string, number][]).sort((a, b) => b[1] - a[1])
    : [];
  const totalToolHits: number = toolsArray.reduce((sum, item) => sum + Number(item[1]), 0) || 1;

  const interestsArray: [string, number][] = analytics
    ? (Object.entries(analytics.interestsMap) as [string, number][]).sort((a, b) => b[1] - a[1])
    : [];
  const totalInterestHits: number = interestsArray.reduce((sum, item) => sum + Number(item[1]), 0) || 1;

  return (
    <div data-testid="admin-dashboard-view" className="min-h-screen bg-[#F8FAFC] px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[10px] font-bold text-blue-700 uppercase">
                Admin Console
              </span>
              <span className="font-mono text-xs text-slate-400">
                Storage: {source === "mongodb" ? "MongoDB Database" : "Local File Backup"}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-[#0F172A]">Lead Management &amp; Analytics</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exportCSV}
              disabled={submissions.length === 0}
              data-testid="admin-export-csv-btn"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-soft-sm hover:bg-slate-50 disabled:opacity-50"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              type="button"
              onClick={fetchSubmissions}
              data-testid="admin-refresh-btn"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-soft-sm hover:bg-blue-500"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("inbox")}
            data-testid="admin-tab-inbox"
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-colors ${
              activeTab === "inbox"
                ? "bg-[#0F172A] text-white shadow-soft-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Inbox size={15} /> Lead Submissions Inbox ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            data-testid="admin-tab-analytics"
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-colors ${
              activeTab === "analytics"
                ? "bg-[#0F172A] text-white shadow-soft-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <BarChart3 size={15} /> Platform &amp; Tech Stack Analytics
          </button>
        </div>

        {/* Tab 1: Inbox */}
        {activeTab === "inbox" && (
          <div className="mt-6">
            {/* Filter Controls */}
            <div className="flex flex-col gap-4 rounded-2xl border card-border bg-white p-4 shadow-soft-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by name, email, company..."
                  data-testid="admin-search-input"
                  className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-xs text-[#0F172A] focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                <span>Showing <strong>{filtered.length}</strong> of <strong>{submissions.length}</strong> entries</span>
              </div>
            </div>

            {/* List */}
            <div className="mt-4 overflow-hidden rounded-2xl border card-border bg-white shadow-soft-sm">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <Inbox size={40} className="text-slate-300" />
                  <p className="mt-4 text-sm font-bold text-[#0F172A]">No submissions found</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Messages submitted through the contact form will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filtered.map((sub) => (
                    <div
                      key={sub.id}
                      data-testid={`admin-lead-${sub.id}`}
                      className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-slate-50/80 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm text-[#0F172A]">{sub.name}</span>
                          {sub.company && (
                            <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                              <Building2 size={12} /> {sub.company}
                            </span>
                          )}
                          {sub.hasBlueprint && (
                            <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-bold text-cyan-800 flex items-center gap-1">
                              <Sparkles size={11} /> Custom Blueprint
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-slate-400">
                            {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Mail size={13} className="text-blue-500" /> {sub.email}
                          </span>
                          {sub.interest && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                              {sub.interest}
                            </span>
                          )}
                        </div>

                        <p className="line-clamp-2 text-xs text-slate-600 pt-1">
                          "{sub.message}"
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSub(sub)}
                          data-testid={`admin-view-lead-${sub.id}`}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-soft-sm hover:bg-slate-50"
                        >
                          <Eye size={13} /> Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Analytics Dashboard */}
        {activeTab === "analytics" && (
          <div className="mt-6 space-y-8" data-testid="admin-analytics-view">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border card-border bg-white p-6 shadow-soft-md">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Total Leads</span>
                  <Users size={18} className="text-blue-600" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[#0F172A]">{analytics?.totalLeads ?? submissions.length}</p>
                <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-500" /> Saved to local/MongoDB
                </p>
              </div>

              <div className="rounded-2xl border card-border bg-white p-6 shadow-soft-md">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Blueprint Submissions</span>
                  <Sparkles size={18} className="text-cyan-500" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-cyan-600">
                  {analytics?.blueprintLeads ?? submissions.filter(s => s.hasBlueprint || s.message.includes('[Attached Blueprint Architecture]')).length}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Attached interactive blueprint
                </p>
              </div>

              <div className="rounded-2xl border card-border bg-white p-6 shadow-soft-md">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Blueprint Conversion Rate</span>
                  <PieChart size={18} className="text-violet-500" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[#0F172A]">
                  {submissions.length > 0
                    ? Math.round(((analytics?.blueprintLeads ?? submissions.filter(s => s.hasBlueprint || s.message.includes('[Attached Blueprint Architecture]')).length) / submissions.length) * 100)
                    : 0}%
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Leads completing blueprint tool
                </p>
              </div>

              <div className="rounded-2xl border card-border bg-white p-6 shadow-soft-md">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Storage Engine</span>
                  <Database size={18} className="text-emerald-600" />
                </div>
                <p className="mt-3 text-xl font-extrabold text-[#0F172A] capitalize">
                  {source === "mongodb" ? "MongoDB Atlas" : "Local JSON File"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Dual persistence active
                </p>
              </div>
            </div>

            {/* Visual Analytics Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Requested Tools Distribution Chart */}
              <div className="rounded-2xl border card-border bg-white p-6 shadow-soft-md">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                      <Workflow size={18} className="text-blue-600" />
                      Client Software Stack Preferences
                    </h3>
                    <p className="text-xs text-slate-500">
                      Most requested source integrations selected in Blueprint Builder
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {toolsArray.length === 0 ? (
                    <p className="py-8 text-center text-xs italic text-slate-400">
                      No tool selection data captured yet. Build a blueprint on the homepage to populate analytics.
                    </p>
                  ) : (
                    toolsArray.map(([toolName, count]) => {
                      const percentage = Math.round((count / totalToolHits) * 100);
                      return (
                        <div key={toolName} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{toolName}</span>
                            <span className="font-mono text-blue-600">{count} requests ({percentage}%)</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                              style={{ width: `${Math.max(percentage, 8)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Interest Areas Breakdown Chart */}
              <div className="rounded-2xl border card-border bg-white p-6 shadow-soft-md">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                      <BrainCircuit size={18} className="text-cyan-600" />
                      Primary Solution Focus Areas
                    </h3>
                    <p className="text-xs text-slate-500">
                      Client interest areas selected during inquiry submission
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {interestsArray.length === 0 ? (
                    <p className="py-8 text-center text-xs italic text-slate-400">
                      No interest area data captured yet.
                    </p>
                  ) : (
                    interestsArray.map(([interestName, count]) => {
                      const percentage = Math.round((count / totalInterestHits) * 100);
                      return (
                        <div key={interestName} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{interestName}</span>
                            <span className="font-mono text-cyan-600">{count} leads ({percentage}%)</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                              style={{ width: `${Math.max(percentage, 8)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedSub(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-[#0F172A]">Lead Details</h3>
            <p className="font-mono text-xs text-slate-400 mt-0.5">Submitted at {new Date(selectedSub.createdAt).toLocaleString()}</p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Name</span>
                <span className="text-sm font-semibold text-[#0F172A]">{selectedSub.name}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Email</span>
                <a href={`mailto:${selectedSub.email}`} className="text-sm font-semibold text-blue-600 hover:underline">
                  {selectedSub.email}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Company</span>
                  <span className="font-semibold text-[#0F172A]">{selectedSub.company || "N/A"}</span>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Role</span>
                  <span className="font-semibold text-[#0F172A]">{selectedSub.role || "N/A"}</span>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Topic of Interest</span>
                <span className="font-semibold text-blue-600">{selectedSub.interest || "General"}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Full Message</span>
                <p className="mt-1 text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedSub.message}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="rounded-xl bg-[#0F172A] px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
