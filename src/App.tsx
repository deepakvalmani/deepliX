import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ClinicIndustryPage } from './pages/ClinicIndustryPage';
import { SchoolIndustryPage } from './pages/SchoolIndustryPage';
import { BusinessIndustryPage } from './pages/BusinessIndustryPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { CookieConsent } from './components/CookieConsent';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminCaseStudiesPage } from './pages/admin/AdminCaseStudiesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');

  // Synchronize initial route from URL path or hash if valid
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      const validRoutes: PageRoute[] = [
        '/',
        '/solutions',
        '/industries',
        '/industries/clinics',
        '/industries/schools',
        '/industries/business',
        '/case-studies',
        '/about',
        '/contact',
        '/privacy-policy',
        '/cookie-policy',
        '/admin/login',
        '/admin/dashboard',
        '/admin/inquiries',
        '/admin/clients',
        '/admin/case-studies',
        '/admin/settings',
      ];
      if (validRoutes.includes(path)) {
        setCurrentRoute(path);
      } else {
        setCurrentRoute('/');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentRoute.startsWith('/admin');

  // Render Admin Layout and Views
  if (isAdminRoute) {
    if (currentRoute === '/admin/login') {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#2563EB] selection:text-white">
          <AdminLoginPage onNavigate={navigateTo} />
        </div>
      );
    }

    switch (currentRoute) {
      case '/admin/dashboard':
        return <AdminDashboardPage onNavigate={navigateTo} />;
      case '/admin/inquiries':
        return <AdminInquiriesPage onNavigate={navigateTo} />;
      case '/admin/clients':
        return <AdminClientsPage onNavigate={navigateTo} />;
      case '/admin/case-studies':
        return <AdminCaseStudiesPage onNavigate={navigateTo} />;
      case '/admin/settings':
        return <AdminSettingsPage onNavigate={navigateTo} />;
      default:
        return <AdminDashboardPage onNavigate={navigateTo} />;
    }
  }

  const renderPage = () => {
    switch (currentRoute) {
      case '/solutions':
        return <SolutionsPage onNavigate={navigateTo} />;
      case '/industries':
        return <IndustriesPage onNavigate={navigateTo} />;
      case '/industries/clinics':
        return <ClinicIndustryPage onNavigate={navigateTo} />;
      case '/industries/schools':
        return <SchoolIndustryPage onNavigate={navigateTo} />;
      case '/industries/business':
        return <BusinessIndustryPage onNavigate={navigateTo} />;
      case '/case-studies':
        return <CaseStudiesPage onNavigate={navigateTo} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/contact':
        return <ContactPage onNavigate={navigateTo} />;
      case '/privacy-policy':
        return <PrivacyPolicyPage onNavigate={navigateTo} />;
      case '/cookie-policy':
        return <CookiePolicyPage onNavigate={navigateTo} />;
      case '/':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Primary Navigation */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="grow">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* GDPR / Cookie Banner */}
      <CookieConsent onNavigate={navigateTo} />
    </div>
  );
}
