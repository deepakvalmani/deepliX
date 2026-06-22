/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, ShieldAlert, Key, User, ArrowRight, Eye, EyeOff, Info } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in both the admin username and login key.');
      return;
    }

    setLoading(true);

    // Simulate database credentials verify
    setTimeout(() => {
      setLoading(false);
      if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
        onLoginSuccess();
      } else {
        setError('Unauthorized Access: Invalid admin credentials entered.');
      }
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto my-16 space-y-10" id="admin-login-interface">
      {/* 1. Main Security Card Form */}
      <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-8 space-y-6 text-left shadow-glow relative overflow-hidden">
        
        {/* Subtle premium light-blue accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-800"></div>
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-zinc-800">
          <div className="h-12 w-12 rounded-full bg-cyan-950 border border-cyan-850 flex items-center justify-center text-cyan-800">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Administrative Portal</h2>
            <p className="text-xs text-zinc-400 mt-1">Authorized Personnel Only</p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-950 border border-red-400 text-red-400 text-xs rounded-lg flex items-start space-x-2">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider flex items-center">
              <User className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-800 text-zinc-100 placeholder-zinc-400 rounded px-3 py-2.5 text-xs focus:outline-none transition-all"
              id="admin-username-input"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider flex items-center">
              <Key className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
              Administrative Seal Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-800 text-zinc-100 placeholder-zinc-400 rounded px-3 pr-10 py-2.5 text-xs focus:outline-none transition-all"
                id="admin-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Trigger button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded bg-cyan-800 hover:bg-cyan-500 disabled:opacity-50 text-white font-sans text-xs font-bold transition-all cursor-pointer mt-6 shadow-sm"
            id="admin-login-submit"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Admin login Reference keys moved to the very bottom to avoid annoying customers */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2 text-xs text-zinc-400 max-w-sm mx-auto text-center" id="admin-reference-keys-footer">
        <div className="flex items-center justify-center space-x-1.5 text-zinc-200 font-semibold mb-1">
          <Info className="h-4 w-4 text-cyan-800" />
          <span>Evaluation Sandbox Keys</span>
        </div>
        <p className="text-[11px] leading-relaxed text-zinc-400">
          To log in as administrator and check customer inquiries, use:
        </p>
        <div className="flex items-center justify-center gap-4 pt-1 font-mono text-[11px]">
          <div>
            <span className="text-zinc-500">Username:</span> <strong className="text-zinc-100 bg-zinc-850 px-1.5 py-0.5 rounded">admin</strong>
          </div>
          <div>
            <span className="text-zinc-500">Password:</span> <strong className="text-zinc-100 bg-zinc-850 px-1.5 py-0.5 rounded">admin</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
