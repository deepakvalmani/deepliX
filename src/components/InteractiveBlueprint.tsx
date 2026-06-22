/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Check, 
  Copy, 
  Database, 
  Cpu, 
  BrainCircuit, 
  LayoutGrid, 
  FileCode, 
  Activity, 
  Layers 
} from 'lucide-react';
import { BLUEPRINT_CATEGORIES } from '../data/servicesData';

export default function InteractiveBlueprint() {
  const [activeTab, setActiveTab] = useState(BLUEPRINT_CATEGORIES[0].id);
  const [copied, setCopied] = useState(false);
  const [inspectorMode, setInspectorMode] = useState<'flow' | 'code'>('flow');

  const activeBlueprint = BLUEPRINT_CATEGORIES.find(b => b.id === activeTab) || BLUEPRINT_CATEGORIES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeBlueprint.sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Maps custom category icon
  const getCategoryIcon = (id: string) => {
    switch(id) {
      case 'database-cdc':
        return <Database className="h-4 w-4" />;
      case 'automated-ops':
        return <Cpu className="h-4 w-4" />;
      case 'cognitive-rag':
        return <BrainCircuit className="h-4 w-4" />;
      case 'ops-dashboard':
        return <LayoutGrid className="h-4 w-4" />;
      default:
        return <Layers className="h-4 w-4" />;
    }
  };

  return (
    <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl" id="interactive-blueprint-container">
      
      {/* Selector Tabs */}
      <div className="flex flex-wrap border-b border-zinc-900 bg-zinc-900/20 p-2 gap-1.5" id="blueprint-selector-tabs">
        {BLUEPRINT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveTab(category.id);
              setCopied(false);
            }}
            className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === category.id
                ? 'bg-zinc-900 text-cyan-400 border border-zinc-800 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            id={`tab-selector-${category.id}`}
          >
            {getCategoryIcon(category.id)}
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Main split viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        
        {/* Left Specification details */}
        <div className="lg:col-span-5 p-6 border-r border-zinc-900 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-500 font-semibold flex items-center">
                <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block mr-1.5 animate-pulse"></span>
                Simple Blueprint
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                {activeBlueprint.solutionTitle}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              {activeBlueprint.description}
            </p>

            <div className="h-px bg-zinc-900/60 my-2"></div>

            {/* Problem Statement Box */}
            <div className="rounded-lg border border-red-950/40 bg-red-950/10 p-3.5 text-xs">
              <h4 className="font-mono font-bold text-red-400 uppercase tracking-wider text-[10px]">
                The Problem:
              </h4>
              <p className="text-zinc-400 mt-1.5 leading-relaxed font-sans font-medium">
                “{activeBlueprint.bottleneck}”
              </p>
            </div>

            {/* System Overview */}
            <div className="rounded-lg border border-cyan-950/40 bg-cyan-950/5 p-3.5 text-xs">
              <h4 className="font-mono font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                Our Solution:
              </h4>
              <p className="text-zinc-400 mt-1.5 leading-relaxed">
                {activeBlueprint.solutionDesc}
              </p>
            </div>
          </div>

          {/* Toggle Modes */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-950">
            <div className="flex bg-zinc-900 p-0.5 rounded border border-zinc-800">
              <button
                onClick={() => setInspectorMode('flow')}
                className={`px-3 py-1 text-[11px] font-mono rounded cursor-pointer transition-all ${
                  inspectorMode === 'flow'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Pipeline Flow
              </button>
              <button
                onClick={() => setInspectorMode('code')}
                className={`px-3 py-1 text-[11px] font-mono rounded cursor-pointer transition-all ${
                  inspectorMode === 'code'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Code Spec
              </button>
            </div>

            <div className="text-[11px] font-mono text-zinc-600 flex items-center space-x-1">
              <Activity className="h-3 w-3 text-cyan-500 animate-pulse" />
              <span>99.9% Up-time Target</span>
            </div>
          </div>
        </div>

        {/* Right Active Workspace Panel (Interactive Flowchart or Code) */}
        <div className="lg:col-span-7 bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none"></div>

          {inspectorMode === 'flow' ? (
            /* Flow diagram visualization view */
            <div className="flex-1 flex flex-col justify-center space-y-6" id="blueprint-schematic-flow">
              
              {/* Dynamic schema heading status */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono text-xs text-zinc-500 flex items-center">
                  <Terminal className="h-3.5 w-3.5 text-zinc-500 mr-1.5" />
                  Data Flow Map
                </span>
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/30 border border-cyan-900/60 px-2 py-0.5 rounded flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full mr-1.5 animate-ping"></span>
                  Live View
                </span>
              </div>

              {/* Ingestion flowchart nodes */}
              <div className="space-y-5 py-4">
                
                {/* Level 1: Ingest Sources */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">
                      1. Where the data comes from
                    </span>
                  </div>
                  {activeBlueprint.nodes.sources.map((src, i) => (
                    <div 
                      key={src}
                      className="border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 p-2 rounded text-center text-[11px] text-zinc-300 font-mono transition-all truncate"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                      {src}
                    </div>
                  ))}
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-px bg-gradient-to-b from-zinc-800 to-cyan-500"></div>
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-400 rotate-90" />
                  </div>
                </div>

                {/* Level 2: Buffer Routing & Security */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">
                      2. How the data is sent safely
                    </span>
                  </div>
                  {activeBlueprint.nodes.transports.map((trans, i) => (
                    <div 
                      key={trans}
                      className="border border-cyan-950/60 bg-cyan-950/10 hover:bg-cyan-950/15 hover:border-cyan-800/70 p-2.5 rounded text-center text-[11px] text-cyan-300 font-mono transition-all"
                    >
                      {trans}
                    </div>
                  ))}
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-px bg-gradient-to-b from-cyan-800 to-zinc-800"></div>
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-400 rotate-90" />
                  </div>
                </div>

                {/* Level 3: Processing & Transformation */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">
                      3. How the data is cleaned and checked
                    </span>
                  </div>
                  {activeBlueprint.nodes.processors.map((proc) => (
                    <div 
                      key={proc}
                      className="border border-zinc-800 bg-zinc-900/40 p-2.5 rounded text-center text-[11px] text-zinc-300 font-mono"
                    >
                      {proc}
                    </div>
                  ))}
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-px bg-gradient-to-b from-zinc-800 to-emerald-500"></div>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-400 rotate-90" />
                  </div>
                </div>

                {/* Level 4: Destination Warehouse / Automation sync */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">
                      4. Where the data goes
                    </span>
                  </div>
                  {activeBlueprint.nodes.targets.map((tgt) => (
                    <div 
                      key={tgt}
                      className="border border-emerald-950/60 bg-emerald-950/10 hover:bg-emerald-950/20 p-2.5 rounded text-center text-[11px] text-emerald-400 font-mono tracking-tight"
                    >
                      {tgt}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ) : (
            /* Code specification inspect mode */
            <div className="flex-1 flex flex-col justify-between" id="blueprint-code-spec">
              
              {/* Heading inspector */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                <span className="font-mono text-xs text-zinc-500 flex items-center">
                  <FileCode className="h-3.5 w-3.5 text-cyan-500 mr-1.5" />
                  Example Code
                </span>
                
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-[11px] text-zinc-300 transition-all font-mono cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>

              {/* Syntax display code element */}
              <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-4 font-mono text-[11px] text-zinc-100 overflow-x-auto leading-relaxed max-h-[340px] whitespace-pre select-all text-left">
                <code>{activeBlueprint.sampleCode}</code>
              </div>

              <p className="text-[10px] text-zinc-500 mt-4 leading-normal">
                This code shows how we program your system connection. It is simple, fast, and completely safe.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
