/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, Zap, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import { PageType } from '../types';

interface RoiCalculatorProps {
  setCurrentPage: (page: PageType) => void;
}

export default function RoiCalculator({ setCurrentPage }: RoiCalculatorProps) {
  // Assessment choices
  const [dataSync, setDataSync] = useState<'excel' | 'point-scripts' | 'cdc'>('excel');
  const [opsTrigger, setOpsTrigger] = useState<'manual' | 'no-code' | 'state-engine'>('manual');
  const [internalPanel, setInternalPanel] = useState<'csv' | 'saas-reporting' | 'unified'>('csv');
  const [engineeringSize, setEngineeringSize] = useState<number>(12); // Number of operational staff

  // Calculated values
  const calculateResult = () => {
    let score = 100;
    let laborHoursWastedPerStaffAnnually = 0;
    let redundancyCostMultiplier = 0;

    // 1. Data Sync friction
    if (dataSync === 'excel') {
      score -= 35;
      laborHoursWastedPerStaffAnnually += 120; // 120 hours/year manual copying
      redundancyCostMultiplier += 450;
    } else if (dataSync === 'point-scripts') {
      score -= 15;
      laborHoursWastedPerStaffAnnually += 40;  // 40 hours/year script debugging
      redundancyCostMultiplier += 200;
    }

    // 2. Automated triggers friction
    if (opsTrigger === 'manual') {
      score -= 35;
      laborHoursWastedPerStaffAnnually += 150; // Manual emails, billing checks
      redundancyCostMultiplier += 500;
    } else if (opsTrigger === 'no-code') {
      score -= 10;
      laborHoursWastedPerStaffAnnually += 30;  // Fixing broken Zapier integrations
      redundancyCostMultiplier += 350; // Subscription cost creep
    }

    // 3. User operations dashboards
    if (internalPanel === 'csv') {
      score -= 20;
      laborHoursWastedPerStaffAnnually += 80;  // Consolidating files
      redundancyCostMultiplier += 150;
    } else if (internalPanel === 'saas-reporting') {
      score -= 5;
      laborHoursWastedPerStaffAnnually += 20;
      redundancyCostMultiplier += 100;
    }

    // Enforce min score
    score = Math.max(score, 15);

    const totalHoursWastedYr = laborHoursWastedPerStaffAnnually * engineeringSize;
    // Average operational cost estimated at $75/hr
    const potentialSavingsMonth = Math.round(((totalHoursWastedYr * 75) + (redundancyCostMultiplier * 12)) / 12);

    return {
      score,
      hoursLost: totalHoursWastedYr,
      savings: potentialSavingsMonth,
      rating: score < 40 ? 'NEEDS HELP' : score < 75 ? 'COULD BE BETTER' : 'VERY GOOD'
    };
  };

  const results = calculateResult();

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500 bg-red-950/20 border-red-900/60';
    if (score < 75) return 'text-amber-500 bg-amber-950/20 border-amber-900/60';
    return 'text-emerald-500 bg-emerald-950/20 border-emerald-900/60';
  };

  return (
    <div className="border border-zinc-800 bg-zinc-950/60 rounded-xl p-6 lg:p-8 shadow-xl" id="roi-calculator-block">
      
      <div className="text-left mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">Interactive Tool</span>
        <h3 className="text-2xl font-bold text-white tracking-tight mt-1">Waste & Savings Calculator</h3>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
          Calculate how much time your team wastes on manual tasks, and how much money you can save with connected systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Question 1: Data Integration */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>How do you share files and data?</span>
              <span className="text-[10px] text-zinc-600">Q1</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDataSync('excel')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  dataSync === 'excel'
                    ? 'bg-zinc-900 border-red-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Manual Files & CSVs</div>
                <div className="text-[10px] text-zinc-500 mt-1 leading-normal">Our employees manually download sheets and match files weekly.</div>
              </button>
              <button
                type="button"
                onClick={() => setDataSync('point-scripts')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  dataSync === 'point-scripts'
                    ? 'bg-zinc-900 border-amber-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Custom Software Scripts</div>
                <div className="text-[10px] text-zinc-500 mt-1 leading-normal">We use custom computer scripts that break when layouts change.</div>
              </button>
              <button
                type="button"
                onClick={() => setDataSync('cdc')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  dataSync === 'cdc'
                    ? 'bg-zinc-900 border-cyan-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Unified Connection</div>
                <div className="text-[10px] text-emerald-500 mt-1 leading-normal">Everything connects automatically to a central data system.</div>
              </button>
            </div>
          </div>

          {/* Question 2: Operational Triggering */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>How do you trigger company tasks?</span>
              <span className="text-[10px] text-zinc-600">Q2</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOpsTrigger('manual')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  opsTrigger === 'manual'
                    ? 'bg-zinc-900 border-red-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Manual Actions</div>
                <div className="text-[10px] text-zinc-500 mt-1 leading-normal">Employees check emails to manually invite users or create invoices.</div>
              </button>
              <button
                type="button"
                onClick={() => setOpsTrigger('no-code')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  opsTrigger === 'no-code'
                    ? 'bg-zinc-900 border-amber-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Automation Tools</div>
                <div className="text-[10px] text-zinc-500 mt-1 leading-normal">We use third-party links (like Zapier) which get very expensive.</div>
              </button>
              <button
                type="button"
                onClick={() => setOpsTrigger('state-engine')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  opsTrigger === 'state-engine'
                    ? 'bg-zinc-900 border-cyan-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Connected System</div>
                <div className="text-[10px] text-emerald-500 mt-1 leading-normal font-sans">Self-healing software steps that run smoothly behind the scenes.</div>
              </button>
            </div>
          </div>

          {/* Question 3: Internal Admin Panels */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>How do your employees edit data?</span>
              <span className="text-[10px] text-zinc-600">Q3</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setInternalPanel('csv')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  internalPanel === 'csv'
                    ? 'bg-zinc-900 border-red-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Older Databases or Files</div>
                <div className="text-[10px] text-zinc-500 mt-1 leading-normal">Staff writes to tables manually or copies log files directly.</div>
              </button>
              <button
                type="button"
                onClick={() => setInternalPanel('saas-reporting')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  internalPanel === 'saas-reporting'
                    ? 'bg-zinc-900 border-amber-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Separate Website Links</div>
                <div className="text-[10px] text-zinc-500 mt-1 leading-normal">Fragmented views; employees must log into 5 different portals.</div>
              </button>
              <button
                type="button"
                onClick={() => setInternalPanel('unified')}
                className={`p-3 rounded text-left border font-sans text-xs transition-all cursor-pointer ${
                  internalPanel === 'unified'
                    ? 'bg-zinc-900 border-cyan-800/80 text-white'
                    : 'bg-zinc-900/20 border-zinc-900/80 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs">Unified Dashboard</div>
                <div className="text-[10px] text-emerald-500 mt-1 leading-normal">One secure browser screen for all employee operations.</div>
              </button>
            </div>
          </div>

          {/* Operational Team Size */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span>How many employees do manual data tasks?</span>
              <span className="text-white font-bold">{engineeringSize} employees</span>
            </div>
            <input
              type="range"
              min="1"
              max="150"
              value={engineeringSize}
              onChange={(e) => setEngineeringSize(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-zinc-600 font-mono">Move the slider to estimate your team size.</span>
          </div>

        </div>

        {/* Right Outputs / Calculations */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-900 pt-6 lg:pt-0 lg:pl-8 space-y-6">
          <div className="space-y-6">
            
            {/* Score circle */}
            <div className="flex items-center space-x-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                <span className={`text-lg font-mono font-black ${
                  results.score < 40 ? 'text-red-500' : results.score < 75 ? 'text-amber-500' : 'text-emerald-500'
                }`}>
                  {results.score}<span className="text-[10px] text-zinc-500">/100</span>
                </span>
                
                {/* Active visual radar glow */}
                <span className={`absolute -inset-1 rounded-full border opacity-10 animate-pulse ${
                  results.score < 40 ? 'border-red-500 bg-red-500' : results.score < 75 ? 'border-amber-500 bg-amber-500' : 'border-emerald-500 bg-emerald-500'
                }`}></span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">Analysis</span>
                <span className={`inline-block text-xs font-mono font-bold px-2 py-0.5 rounded border mt-0.5 ${getScoreColor(results.score)}`}>
                  {results.rating}
                </span>
              </div>
            </div>

            {/* Metrics group */}
            <div className="space-y-4">
              
              {/* Lost Labor Hours */}
              <div className="bg-zinc-900/30 border border-zinc-900/60 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">Work Time Lost per Year</span>
                    <h4 className="text-2xl font-mono font-bold text-white mt-1">
                      {results.hoursLost.toLocaleString()} <span className="text-xs text-zinc-400 font-sans font-normal">hours/yr</span>
                    </h4>
                  </div>
                  {results.score < 75 && (
                    <AlertTriangle className="h-5 w-5 text-amber-500 animate-bounce" />
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  Calculated based on employees spending time downloading files, fixing broken scripts, or manually matching billing records. We target zero manual steps.
                </p>
              </div>

              {/* Economic Savings */}
              <div className="bg-cyan-950/5 border border-cyan-950/50 p-4 rounded-lg">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">Money Saved per Month</span>
                  <h4 className="text-2xl font-mono font-bold text-white mt-1">
                    ${results.savings.toLocaleString()} <span className="text-xs text-cyan-400 font-sans font-normal">/ month</span>
                  </h4>
                </div>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  Estimated savings from connecting your tools with deepliX. This includes saved software subscriptions, fewer manual mistakes, and saved work hours.
                </p>
              </div>

            </div>

          </div>

          {/* Action trigger */}
          <div className="pt-4 border-t border-zinc-950">
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full flex items-center justify-between p-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-sans text-xs font-bold transition-all group cursor-pointer"
            >
              <span>Get Your Free Blueprint Plan</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
            <span className="text-[10px] text-zinc-600 font-mono text-center block mt-2">
              Includes a simple diagram of your new, connected tools.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
