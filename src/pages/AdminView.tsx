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
  Briefcase,
  Phone,
  Linkedin,
  Github,
  Globe,
  FileText,
  Trash2,
  ExternalLink,
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

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
  resumeText?: string;
  status: "new" | "under_review" | "interviewing" | "accepted" | "rejected";
  createdAt: string;
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

  const [activeTab, setActiveTab] = useState<"inbox" | "careers" | "analytics">("inbox");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const [subRes, appRes, analyticsRes] = await Promise.all([
        fetch("/api/submissions"),
        fetch("/api/applications"),
        fetch("/api/admin/analytics"),
      ]);

      const subData = await subRes.json();
      setSubmissions(subData.submissions || []);
      setSource(subData.source || "local");

      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData.applications || []);
      }

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

  const handleUpdateAppStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus as any } : a))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job application?")) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        setSelectedApp(null);
      }
    } catch (err) {
      console.error("Failed to delete application:", err);
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
      <div data-testid="admin-login-view" className="flex min-h-screen items-center justify-center bg-[#121212] px-6 py-16 text-[#E4E4E7]">
        <div className="w-full max-w-md rounded-[2.5rem] border border-white/10 bg-[#1E1E1E] p-8 shadow-2xl sm:p-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/30 shadow-glow-blue">
            <Lock size={26} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#E4E4E7]">Protected Admin Inbox</h1>
          <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">
            Enter admin passcode to view saved contact form submissions and lead records.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                data-testid="admin-passcode-input"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-sm text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
              />
              {passError && (
                <p className="mt-1.5 text-xs text-rose-400 font-medium">
                  Incorrect passcode try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              data-testid="admin-login-btn"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00BFFF] py-3.5 text-xs font-bold text-[#121212] shadow-glow-blue hover:bg-[#38BDF8] transition-colors"
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
    <div data-testid="admin-dashboard-view" className="min-h-screen bg-[#121212] text-[#E4E4E7] px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-3 py-1 font-mono text-[10px] font-bold text-[#00BFFF] uppercase">
                Admin Console
              </span>
              <span className="font-mono text-xs text-[#A1A1AA]">
                Storage: {source === "mongodb" ? "MongoDB Database" : "Local File Backup"}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-[#E4E4E7]">Lead Management &amp; Analytics</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exportCSV}
              disabled={submissions.length === 0}
              data-testid="admin-export-csv-btn"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1E1E1E] px-4 py-2.5 text-xs font-bold text-[#E4E4E7] hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              type="button"
              onClick={fetchSubmissions}
              data-testid="admin-refresh-btn"
              className="flex items-center gap-2 rounded-xl bg-[#00BFFF] px-4 py-2.5 text-xs font-bold text-[#121212] shadow-glow-blue hover:bg-[#38BDF8] transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-white/10 bg-[#141414] px-4 py-2.5 text-xs font-bold text-[#A1A1AA] hover:text-[#E4E4E7] hover:bg-white/5 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("inbox")}
            data-testid="admin-tab-inbox"
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs font-bold transition-colors ${
              activeTab === "inbox"
                ? "bg-[#00BFFF] text-[#121212] shadow-glow-blue"
                : "bg-[#1E1E1E] text-[#A1A1AA] border border-white/10 hover:bg-white/5 hover:text-[#E4E4E7]"
            }`}
          >
            <Inbox size={15} /> Lead Submissions ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("careers")}
            data-testid="admin-tab-careers"
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs font-bold transition-colors ${
              activeTab === "careers"
                ? "bg-[#00BFFF] text-[#121212] shadow-glow-blue"
                : "bg-[#1E1E1E] text-[#A1A1AA] border border-white/10 hover:bg-white/5 hover:text-[#E4E4E7]"
            }`}
          >
            <Briefcase size={15} /> Job Applications ({applications.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            data-testid="admin-tab-analytics"
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs font-bold transition-colors ${
              activeTab === "analytics"
                ? "bg-[#00BFFF] text-[#121212] shadow-glow-blue"
                : "bg-[#1E1E1E] text-[#A1A1AA] border border-white/10 hover:bg-white/5 hover:text-[#E4E4E7]"
            }`}
          >
            <BarChart3 size={15} /> Platform Analytics
          </button>
        </div>

        {/* Tab 1: Inbox */}
        {activeTab === "inbox" && (
          <div className="mt-6">
            {/* Filter Controls */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#1E1E1E] p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-3 text-[#71717A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by name, email, company..."
                  data-testid="admin-search-input"
                  className="w-full rounded-xl border border-white/10 bg-[#141414] py-2 pl-10 pr-4 text-xs text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-[#A1A1AA]">
                <span>Showing <strong className="text-[#E4E4E7]">{filtered.length}</strong> of <strong className="text-[#E4E4E7]">{submissions.length}</strong> entries</span>
              </div>
            </div>

            {/* List */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#1E1E1E] shadow-2xl">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <Inbox size={40} className="text-[#71717A]" />
                  <p className="mt-4 text-sm font-bold text-[#E4E4E7]">No submissions found</p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Messages submitted through the contact form will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filtered.map((sub) => (
                    <div
                      key={sub.id}
                      data-testid={`admin-lead-${sub.id}`}
                      className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-white/5 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm text-[#E4E4E7]">{sub.name}</span>
                          {sub.company && (
                            <span className="flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-[#A1A1AA]">
                              <Building2 size={12} /> {sub.company}
                            </span>
                          )}
                          {sub.hasBlueprint && (
                            <span className="rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#00BFFF] flex items-center gap-1">
                              <Sparkles size={11} /> Custom Blueprint
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-[#71717A]">
                            {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-[#A1A1AA]">
                          <span className="flex items-center gap-1">
                            <Mail size={13} className="text-[#00BFFF]" /> {sub.email}
                          </span>
                          {sub.interest && (
                            <span className="rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 px-2 py-0.5 text-[10px] font-semibold text-[#00BFFF]">
                              {sub.interest}
                            </span>
                          )}
                        </div>

                        <p className="line-clamp-2 text-xs text-[#A1A1AA] pt-1">
                          "{sub.message}"
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSub(sub)}
                          data-testid={`admin-view-lead-${sub.id}`}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#141414] px-3 py-1.5 text-xs font-semibold text-[#E4E4E7] hover:bg-white/10 transition-colors"
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

        {/* Tab 2: Job Applications Inbox */}
        {activeTab === "careers" && (
          <div className="mt-6">
            {/* Filter Controls */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#1E1E1E] p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-3 text-[#71717A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search applicants by name, role, email..."
                  data-testid="admin-careers-search-input"
                  className="w-full rounded-xl border border-white/10 bg-[#141414] py-2 pl-10 pr-4 text-xs text-[#E4E4E7] placeholder:text-[#71717A] focus:border-[#00BFFF] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-[#A1A1AA]">
                <span>Total Applications: <strong className="text-[#E4E4E7]">{applications.length}</strong></span>
              </div>
            </div>

            {/* List */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#1E1E1E] shadow-2xl">
              {applications.filter(a => {
                const q = searchQuery.toLowerCase();
                return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
              }).length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <Briefcase size={40} className="text-[#71717A]" />
                  <p className="mt-4 text-sm font-bold text-[#E4E4E7]">No job applications found</p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Candidates applying via the Careers page will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {applications
                    .filter(a => {
                      const q = searchQuery.toLowerCase();
                      return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
                    })
                    .map((app) => (
                      <div
                        key={app.id}
                        data-testid={`admin-app-${app.id}`}
                        className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-white/5 sm:flex-row sm:items-center"
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-bold text-sm text-[#E4E4E7]">{app.name}</span>
                            <span className="rounded-md bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-2 py-0.5 text-[11px] font-semibold text-[#00BFFF]">
                              {app.role}
                            </span>
                            <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-[#A1A1AA]">
                              {app.experienceYears} yrs exp
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                                app.status === "accepted"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                  : app.status === "rejected"
                                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                                  : app.status === "interviewing"
                                  ? "bg-violet-950 text-violet-300 border border-violet-800"
                                  : app.status === "under_review"
                                  ? "bg-amber-950 text-amber-300 border border-amber-800"
                                  : "bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/30"
                              }`}
                            >
                              {app.status ? app.status.replace("_", " ") : "new"}
                            </span>
                            <span className="font-mono text-[10px] text-[#71717A]">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#A1A1AA] pt-1">
                            <span className="flex items-center gap-1">
                              <Mail size={13} className="text-[#00BFFF]" /> {app.email}
                            </span>
                            {app.phone && (
                              <span className="flex items-center gap-1">
                                <Phone size={13} className="text-[#71717A]" /> {app.phone}
                              </span>
                            )}
                            {app.resumeFileName && (
                              <span className="flex items-center gap-1 text-[#E4E4E7] font-medium">
                                <FileText size={13} className="text-[#00BFFF]" /> {app.resumeFileName}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedApp(app)}
                            data-testid={`admin-view-app-${app.id}`}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#141414] px-3 py-1.5 text-xs font-semibold text-[#E4E4E7] hover:bg-white/10 transition-colors"
                          >
                            <Eye size={13} /> View Resume &amp; Profile
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Analytics Dashboard */}
        {activeTab === "analytics" && (
          <div className="mt-6 space-y-8" data-testid="admin-analytics-view">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl">
                <div className="flex items-center justify-between text-[#A1A1AA]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Total Leads</span>
                  <Users size={18} className="text-[#00BFFF]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[#E4E4E7]">{analytics?.totalLeads ?? submissions.length}</p>
                <p className="mt-1 text-xs text-[#A1A1AA] flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-400" /> Saved to local/MongoDB
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl">
                <div className="flex items-center justify-between text-[#A1A1AA]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Blueprint Submissions</span>
                  <Sparkles size={18} className="text-[#38BDF8]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[#38BDF8]">
                  {analytics?.blueprintLeads ?? submissions.filter(s => s.hasBlueprint || s.message.includes('[Attached Blueprint Architecture]')).length}
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Attached interactive blueprint
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl">
                <div className="flex items-center justify-between text-[#A1A1AA]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Blueprint Conversion Rate</span>
                  <PieChart size={18} className="text-[#818CF8]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[#E4E4E7]">
                  {submissions.length > 0
                    ? Math.round(((analytics?.blueprintLeads ?? submissions.filter(s => s.hasBlueprint || s.message.includes('[Attached Blueprint Architecture]')).length) / submissions.length) * 100)
                    : 0}%
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Leads completing blueprint tool
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl">
                <div className="flex items-center justify-between text-[#A1A1AA]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Storage Engine</span>
                  <Database size={18} className="text-emerald-400" />
                </div>
                <p className="mt-3 text-xl font-extrabold text-[#E4E4E7] capitalize">
                  {source === "mongodb" ? "MongoDB Atlas" : "Local JSON File"}
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Dual persistence active
                </p>
              </div>
            </div>

            {/* Visual Analytics Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Requested Tools Distribution Chart */}
              <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#E4E4E7] flex items-center gap-2">
                      <Workflow size={18} className="text-[#00BFFF]" />
                      Client Software Stack Preferences
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Most requested source integrations selected in Blueprint Builder
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {toolsArray.length === 0 ? (
                    <p className="py-8 text-center text-xs italic text-[#71717A]">
                      No tool selection data captured yet. Build a blueprint on the homepage to populate analytics.
                    </p>
                  ) : (
                    toolsArray.map(([toolName, count]) => {
                      const percentage = Math.round((count / totalToolHits) * 100);
                      return (
                        <div key={toolName} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold text-[#E4E4E7]">
                            <span>{toolName}</span>
                            <span className="font-mono text-[#00BFFF]">{count} requests ({percentage}%)</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#141414]">
                            <div
                              className="h-full rounded-full bg-[#00BFFF] transition-all duration-500"
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
              <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#E4E4E7] flex items-center gap-2">
                      <BrainCircuit size={18} className="text-[#38BDF8]" />
                      Primary Solution Focus Areas
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Client interest areas selected during inquiry submission
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {interestsArray.length === 0 ? (
                    <p className="py-8 text-center text-xs italic text-[#71717A]">
                      No interest area data captured yet.
                    </p>
                  ) : (
                    interestsArray.map(([interestName, count]) => {
                      const percentage = Math.round((count / totalInterestHits) * 100);
                      return (
                        <div key={interestName} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold text-[#E4E4E7]">
                            <span>{interestName}</span>
                            <span className="font-mono text-[#38BDF8]">{count} leads ({percentage}%)</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#141414]">
                            <div
                              className="h-full rounded-full bg-[#38BDF8] transition-all duration-500"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1E1E1E] border border-white/10 p-5 sm:p-6 shadow-2xl text-[#E4E4E7]">
            <button
              type="button"
              onClick={() => setSelectedSub(null)}
              className="absolute right-4 top-4 text-[#A1A1AA] hover:text-[#E4E4E7]"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-[#E4E4E7]">Lead Details</h3>
            <p className="font-mono text-xs text-[#71717A] mt-0.5">Submitted at {new Date(selectedSub.createdAt).toLocaleString()}</p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Name</span>
                <span className="text-sm font-semibold text-[#E4E4E7]">{selectedSub.name}</span>
              </div>
              <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Email</span>
                <a href={`mailto:${selectedSub.email}`} className="text-sm font-semibold text-[#00BFFF] hover:underline break-all">
                  {selectedSub.email}
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Company</span>
                  <span className="font-semibold text-[#E4E4E7]">{selectedSub.company || "N/A"}</span>
                </div>
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Role</span>
                  <span className="font-semibold text-[#E4E4E7]">{selectedSub.role || "N/A"}</span>
                </div>
              </div>
              <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Topic of Interest</span>
                <span className="font-semibold text-[#00BFFF]">{selectedSub.interest || "General"}</span>
              </div>
              <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Full Message</span>
                <p className="mt-1 text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">{selectedSub.message}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="rounded-xl bg-[#00BFFF] px-5 py-2 text-xs font-bold text-[#121212] hover:bg-[#38BDF8] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1E1E1E] border border-white/10 p-5 sm:p-8 text-[#E4E4E7] shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              className="absolute right-4 top-4 sm:right-5 sm:top-5 rounded-full p-1 text-[#A1A1AA] hover:bg-white/10 hover:text-[#E4E4E7] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-3 py-1 font-mono text-[10px] font-bold text-[#00BFFF] uppercase">
                Job Application
              </span>
              <span className="font-mono text-xs text-[#71717A]">{selectedApp.id}</span>
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#E4E4E7]">{selectedApp.name}</h3>
            <p className="text-xs font-bold text-[#00BFFF]">{selectedApp.role}</p>

            <div className="mt-6 space-y-4 text-xs">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Email</span>
                  <a href={`mailto:${selectedApp.email}`} className="font-bold text-[#00BFFF] hover:underline break-all">
                    {selectedApp.email}
                  </a>
                </div>
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Phone</span>
                  <span className="font-semibold text-[#E4E4E7]">{selectedApp.phone || "Not provided"}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Experience Level</span>
                  <span className="font-semibold text-[#E4E4E7]">{selectedApp.experienceYears} Years</span>
                </div>
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Submitted Date</span>
                  <span className="font-semibold text-[#E4E4E7]">{new Date(selectedApp.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Social / Web Profiles */}
              {(selectedApp.linkedin || selectedApp.github || selectedApp.portfolio) && (
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Links &amp; Profiles</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedApp.linkedin && (
                      <a
                        href={selectedApp.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-3 py-1.5 font-bold text-[#00BFFF] hover:bg-[#00BFFF]/20"
                      >
                        <Linkedin size={13} /> LinkedIn <ExternalLink size={11} />
                      </a>
                    )}
                    {selectedApp.github && (
                      <a
                        href={selectedApp.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 font-bold text-[#E4E4E7] hover:bg-white/15"
                      >
                        <Github size={13} /> GitHub <ExternalLink size={11} />
                      </a>
                    )}
                    {selectedApp.portfolio && (
                      <a
                        href={selectedApp.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 font-bold text-emerald-300 hover:bg-emerald-900"
                      >
                        <Globe size={13} /> Portfolio <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Resume File or Text */}
              <div className="rounded-xl border border-white/10 bg-[#141414] p-4">
                <span className="font-bold text-[#A1A1AA] uppercase tracking-wider block text-[10px]">Resume / CV Document</span>
                {selectedApp.resumeDataUrl ? (
                  <div className="mt-2 flex items-center justify-between rounded-xl bg-[#1E1E1E] p-3 border border-white/10">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-[#00BFFF]" />
                      <span className="font-bold text-[#E4E4E7]">{selectedApp.resumeFileName || "Candidate_Resume"}</span>
                    </div>
                    <a
                      href={selectedApp.resumeDataUrl}
                      download={selectedApp.resumeFileName || "Candidate_Resume.pdf"}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#00BFFF] px-3 py-1.5 text-xs font-bold text-[#121212] hover:bg-[#38BDF8]"
                    >
                      <Download size={13} /> Download Resume
                    </a>
                  </div>
                ) : selectedApp.resumeText ? (
                  <div className="mt-2 rounded-xl bg-[#1E1E1E] p-3 border border-white/10 max-h-48 overflow-y-auto font-mono text-[11px] text-[#A1A1AA] whitespace-pre-wrap">
                    {selectedApp.resumeText}
                  </div>
                ) : (
                  <p className="mt-1 text-[#71717A] italic">No resume attached</p>
                )}
              </div>

              {/* Cover Letter */}
              {selectedApp.coverLetter && (
                <div className="rounded-xl bg-[#141414] border border-white/5 p-3">
                  <span className="font-bold text-[#71717A] uppercase tracking-wider block text-[10px]">Cover Letter / Statement</span>
                  <p className="mt-1.5 text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">{selectedApp.coverLetter}</p>
                </div>
              )}

              {/* Application Status Selector */}
              <div className="rounded-xl border border-[#00BFFF]/30 bg-[#00BFFF]/5 p-4">
                <span className="font-bold text-[#00BFFF] uppercase tracking-wider block text-[10px]">Update Application Status</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    ["new", "New"],
                    ["under_review", "Under Review"],
                    ["interviewing", "Interviewing"],
                    ["accepted", "Accepted / Offer"],
                    ["rejected", "Rejected"],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleUpdateAppStatus(selectedApp.id, val)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                        selectedApp.status === val
                          ? "bg-[#00BFFF] text-[#121212] shadow-glow-blue"
                          : "bg-[#1E1E1E] text-[#A1A1AA] border border-white/10 hover:bg-white/10 hover:text-[#E4E4E7]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => handleDeleteApp(selectedApp.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-900 bg-rose-950/60 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900"
              >
                <Trash2 size={14} /> Delete Application
              </button>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-xl bg-[#00BFFF] px-5 py-2 text-xs font-bold text-[#121212] hover:bg-[#38BDF8]"
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
