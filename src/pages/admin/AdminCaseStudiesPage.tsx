import React, { useState, useEffect } from 'react';
import { PageRoute, CaseStudyItem } from '../../types';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminStore } from '../../lib/adminStore';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdminCaseStudiesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminCaseStudiesPage: React.FC<AdminCaseStudiesPageProps> = ({ onNavigate }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CaseStudyItem | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('Clinics & Healthcare');
  const [summary, setSummary] = useState('');
  const [beforeText, setBeforeText] = useState('');
  const [afterText, setAfterText] = useState('');
  const [keyOutcome, setKeyOutcome] = useState('');

  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!adminStore.isAuthenticated()) {
      onNavigate('/admin/login');
      return;
    }
    loadCaseStudies();
  }, [onNavigate]);

  const loadCaseStudies = () => {
    setCaseStudies(adminStore.getCaseStudies());
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setIndustry('Clinics & Healthcare');
    setSummary('');
    setBeforeText('• Manual paper record clutter\n• Booking bottlenecks and phone call delays\n• Unbilled charges');
    setAfterText('• Unified digital record search\n• Real-time digital patient queue\n• One-click billing reconciliation');
    setKeyOutcome('Reduced patient waiting time by 75% while capturing 100% of diagnostic billing.');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CaseStudyItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setIndustry(item.industry);
    setSummary(item.summary);
    setBeforeText(item.before.join('\n'));
    setAfterText(item.after.join('\n'));
    setKeyOutcome(item.keyOutcome);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !keyOutcome) {
      alert('Please fill out all required fields.');
      return;
    }

    const beforeArray = beforeText
      .split('\n')
      .map(s => s.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    const afterArray = afterText
      .split('\n')
      .map(s => s.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    if (editingItem) {
      adminStore.updateCaseStudy(editingItem.id, {
        title,
        industry,
        summary,
        before: beforeArray,
        after: afterArray,
        keyOutcome,
        isPublished: true
      });
      showToast(`Updated case study "${title}"`);
    } else {
      adminStore.addCaseStudy({
        title,
        industry,
        summary,
        before: beforeArray,
        after: afterArray,
        keyOutcome,
        isPublished: true
      });
      showToast(`Added and published "${title}"`);
    }

    setIsModalOpen(false);
    loadCaseStudies();
  };

  const handleDelete = (id: string, itemTitle: string) => {
    if (window.confirm(`Delete case study "${itemTitle}"? This will remove it from the public website.`)) {
      adminStore.deleteCaseStudy(id);
      loadCaseStudies();
      showToast(`Deleted "${itemTitle}"`);
    }
  };

  return (
    <AdminLayout
      currentRoute="/admin/case-studies"
      onNavigate={onNavigate}
      title="Case Study Management"
      subtitle="Publish and update demonstration case studies shown on the public website."
    >
      <div className="space-y-4">
        {/* Toast */}
        {toast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toast}</span>
            </div>
            <button onClick={() => setToast('')} className="text-emerald-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#0F172A]">
              Live Website Case Studies ({caseStudies.length})
            </h3>
            <p className="text-xs text-[#64748B]">
              All changes made here are instantly reflected on the public <span className="font-semibold text-[#0F172A]">/case-studies</span> route.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/case-studies')}
              className="px-3 py-2 text-xs font-medium text-[#475569] bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] rounded-md transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Preview Public Page</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Case Study</span>
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB] border border-blue-200">
                    {cs.industry}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cs)}
                      className="p-1 text-slate-500 hover:text-[#2563EB] rounded hover:bg-slate-100 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id, cs.title)}
                      className="p-1 text-slate-500 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#0F172A] leading-snug">
                  {cs.title}
                </h4>

                <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">
                  {cs.summary}
                </p>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] space-y-1">
                  <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                    Key Outcome Metric
                  </div>
                  <p className="text-xs font-semibold text-[#0F172A] leading-snug">
                    {cs.keyOutcome}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#64748B]">
                <span>{cs.before.length} Problems • {cs.after.length} Solutions</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Live
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl max-w-2xl w-full p-6 space-y-4 my-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h3 className="text-base font-bold text-[#0F172A]">
                  {editingItem ? 'Edit Case Study' : 'Create Case Study'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-[#94A3B8] hover:text-[#0F172A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      Case Study Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Clinic Management System"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      Industry Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g. Healthcare, Education, Wholesale"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                    Problem Summary / Overview *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief description of the client's operations and operational challenge..."
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      The Problem / Before (One bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={beforeText}
                      onChange={(e) => setBeforeText(e.target.value)}
                      placeholder="Paper records managed manually&#10;Appointment double-bookings&#10;No revenue audit visibility"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                      The Solution / After (One bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={afterText}
                      onChange={(e) => setAfterText(e.target.value)}
                      placeholder="Centralized digital patient directory&#10;Live doctor calendar and queue&#10;One-click invoice generation"
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#334155] uppercase tracking-wider mb-1">
                    Key Outcome / Metric *
                  </label>
                  <input
                    type="text"
                    required
                    value={keyOutcome}
                    onChange={(e) => setKeyOutcome(e.target.value)}
                    placeholder="e.g. Average waiting time reduced by 75%; 100% billing capture rate."
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] focus:bg-white focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-[#E5E7EB] rounded-md text-xs font-semibold text-[#475569] hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs"
                  >
                    {editingItem ? 'Update Case Study' : 'Publish Case Study'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
