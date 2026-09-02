import React, { useState, useEffect } from 'react';
import { PageRoute } from '../../types';
import { adminStore } from '../../lib/adminStore';
import { 
  LayoutDashboard, 
  Inbox, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Shield, 
  ChevronRight,
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentRoute,
  onNavigate,
  children,
  title,
  subtitle
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);
  const adminUser = adminStore.getAdminUser();

  useEffect(() => {
    // Calculate new inquiries badge
    const inquiries = adminStore.getInquiries();
    const unread = inquiries.filter(i => i.status === 'new' || !i.isRead).length;
    setNewInquiriesCount(unread);
  }, [currentRoute]);

  const handleLogout = () => {
    adminStore.logout();
    onNavigate('/admin/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      route: '/admin/dashboard' as PageRoute,
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: 'Inquiries & Leads',
      route: '/admin/inquiries' as PageRoute,
      icon: Inbox,
      badge: newInquiriesCount > 0 ? newInquiriesCount : null
    },
    {
      label: 'Client Records',
      route: '/admin/clients' as PageRoute,
      icon: Users,
      badge: null
    },
    {
      label: 'Case Studies',
      route: '/admin/case-studies' as PageRoute,
      icon: FileText,
      badge: null
    },
    {
      label: 'Website Settings',
      route: '/admin/settings' as PageRoute,
      icon: Settings,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 text-[#475569]"
            aria-label="Toggle Navigation"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('/admin/dashboard')}
              className="flex items-center gap-2 text-left focus:outline-hidden"
            >
              <div className="w-8 h-8 bg-[#2563EB] rounded flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="font-bold text-lg tracking-tight text-[#0F172A]">DeepliX</span>
            </button>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
              Admin Portal V1
            </span>
          </div>

          <div className="hidden lg:flex items-center text-xs text-[#94A3B8] gap-1.5 pl-2 border-l border-[#E5E7EB]">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F172A] font-medium">{title}</span>
          </div>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] hover:text-[#0F172A] bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-md transition-colors"
            title="Open Public Website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <div className="h-6 w-px bg-[#E5E7EB] hidden sm:block"></div>

          {/* Admin User Info */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] font-bold text-xs flex items-center justify-center border border-blue-200">
              {adminUser?.email ? adminUser.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-[#0F172A] leading-tight">
                {adminUser?.name || 'Admin Team'}
              </div>
              <div className="text-[11px] text-[#64748B] leading-tight">
                {adminUser?.email || 'admin@deeplix.com'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1 border border-transparent hover:border-red-200"
            title="Sign out of Admin Portal"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Shell: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E5E7EB] shrink-0 p-4 justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Navigation
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-[#2563EB]' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>DeepliX Internal</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-normal">
              Private system for DeepliX team members.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#2563EB] rounded flex items-center justify-center text-white font-bold text-sm">
                      D
                    </div>
                    <span className="font-bold text-base">DeepliX Admin</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 text-[#64748B] hover:text-[#0F172A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentRoute === item.route;
                    return (
                      <button
                        key={item.route}
                        onClick={() => {
                          onNavigate(item.route);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                          isActive
                            ? 'bg-[#2563EB] text-white'
                            : 'text-[#475569] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== null && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-white text-[#2563EB]' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center justify-center gap-2 border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setIsMobileOpen(false)} />
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#E5E7EB]">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-[#64748B] mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Injected Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
