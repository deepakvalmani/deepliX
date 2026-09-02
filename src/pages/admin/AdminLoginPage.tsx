import React, { useState, useEffect } from 'react';
import { PageRoute } from '../../types';
import { adminStore } from '../../lib/adminStore';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';

interface AdminLoginPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (adminStore.isAuthenticated()) {
      onNavigate('/admin/dashboard');
    }
  }, [onNavigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await adminStore.login(email, password);
      setIsLoading(false);
      if (res.success) {
        onNavigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch {
      setIsLoading(false);
      setError('An unexpected login error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo and Brand */}
        <button 
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 mb-6 group focus:outline-hidden"
        >
          <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-xs">
            D
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#0F172A]">DeepliX</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Internal Team Access</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          DeepliX Admin Portal
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          Sign in with your authorized credentials to manage operations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-md rounded-xl border border-[#E5E7EB] sm:px-10 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@domain.com"
                  className="block w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  id="admin-login-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  id="admin-login-password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-xs text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] disabled:opacity-60 transition-colors"
                id="admin-login-submit"
              >
                {isLoading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Enter Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-2 border-t border-[#E5E7EB] text-center">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
