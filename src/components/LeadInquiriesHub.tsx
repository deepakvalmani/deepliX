/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Terminal, 
  Activity, 
  User, 
  Mail, 
  Clock, 
  AlertTriangle, 
  Calendar 
} from 'lucide-react';
import { InboundInquiry } from '../types';

interface LeadInquiriesHubProps {
  inboundLeads: InboundInquiry[];
  setInboundLeads: React.Dispatch<React.SetStateAction<InboundInquiry[]>>;
  onContactClick: () => void;
}

export default function LeadInquiriesHub({ inboundLeads, setInboundLeads, onContactClick }: LeadInquiriesHubProps) {
  const [selectedLead, setSelectedLead] = useState<InboundInquiry | null>(null);

  useEffect(() => {
    // If we have leads, select the first one by default if none is selected
    if (inboundLeads.length > 0 && !selectedLead) {
      setSelectedLead(inboundLeads[0]);
    }
  }, [inboundLeads, selectedLead]);

  // Handle changing lead status
  const handleStatusChange = (leadId: string, nextStatus: InboundInquiry['status']) => {
    const updated = inboundLeads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: nextStatus };
      }
      return lead;
    });
    setInboundLeads(updated);
    localStorage.setItem('deeplix_inquiries_db', JSON.stringify(updated));
    
    // update current selected view
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: nextStatus });
    }
  };

  const getStatusBadge = (status: InboundInquiry['status']) => {
    switch (status) {
      case 'pending_review':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border border-amber-900 bg-amber-950/20 text-amber-400">NEW MESSAGE</span>;
      case 'scheduled':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-900 bg-cyan-950/20 text-cyan-400">CALL SET</span>;
      case 'assigned':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-900 bg-emerald-950/20 text-emerald-400">ASSIGNED</span>;
      default:
        return null;
    }
  };

  const getScaleBadge = (scale: InboundInquiry['scale']) => {
    switch (scale) {
      case 'enterprise':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-purple-900/60 text-purple-400">LARGE COMPANY</span>;
      case 'mid-market':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-cyan-950 text-cyan-400">MEDIUM COMPANY</span>;
      default:
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">SMALL COMPANY</span>;
    }
  };

  // Automated Assessment Recommendation based on selected fields
  const generateTechnicalDiagnostic = (lead: InboundInquiry) => {
    const systems: string[] = [];
    if (lead.bottlenecks.includes('data-engineering') || lead.bottlenecks.includes('Data Systems')) {
      systems.push('Build simple database connections & pipeline paths.');
    }
    if (lead.bottlenecks.includes('workflow-automation') || lead.bottlenecks.includes('Automation Systems')) {
      systems.push('Create automatic task and email triggers.');
    }
    if (lead.bottlenecks.includes('cognitive-ai') || lead.bottlenecks.includes('AI Systems')) {
      systems.push('Add custom search tools and simple AI integrations.');
    }
    if (lead.bottlenecks.includes('internal-systems') || lead.bottlenecks.includes('Internal Tools')) {
      systems.push('Unify files and statistics into a clean dashboard.');
    }
    if (systems.length === 0) {
      systems.push('Integrate and align existing business systems cleanly.');
    }
    return systems;
  };

  return (
    <div className="space-y-6" id="lead-inquiries-hub">
      
      {/* Top dashboard metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-zinc-900 bg-zinc-950/50 p-4 rounded-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Total Messages</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-mono font-bold text-white">{inboundLeads.length}</span>
            <span className="text-xs text-zinc-500 font-sans">messages captured</span>
          </div>
        </div>
        <div className="border border-zinc-900 bg-zinc-950/50 p-4 rounded-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Needs Review</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-mono font-bold text-amber-500">
              {inboundLeads.filter(l => l.status === 'pending_review').length}
            </span>
            <span className="text-xs text-zinc-500 font-sans">not reviewed yet</span>
          </div>
        </div>
        <div className="border border-zinc-900 bg-zinc-950/50 p-4 rounded-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Being Worked On</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-mono font-bold text-emerald-500">
              {inboundLeads.filter(l => l.status === 'assigned').length}
            </span>
            <span className="text-xs text-zinc-500 font-sans">active reviews</span>
          </div>
        </div>
      </div>

      {/* Main split dashboard view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of leads */}
        <div className="lg:col-span-5 border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden flex flex-col justify-start">
          <div className="p-4 border-b border-zinc-900 bg-zinc-900/10 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Inbox className="h-4 w-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white font-sans tracking-tight">Inbox</h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">updates automatically</span>
          </div>

          {inboundLeads.length === 0 ? (
            <div className="p-8 text-center space-y-4">
              <AlertTriangle className="h-8 w-8 text-zinc-600 mx-auto" />
              <div>
                <p className="text-sm font-bold text-zinc-400">Inbox is empty</p>
                <p className="text-xs text-zinc-500 mt-1">Use the form on our Contact page to send a new message!</p>
              </div>
              <button 
                onClick={onContactClick}
                className="mx-auto block px-3 py-1.5 bg-cyan-500 text-black font-semibold text-xs rounded hover:bg-cyan-400"
              >
                Write Message
              </button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-900 overflow-y-auto max-h-[500px]">
              {inboundLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-4 hover:bg-zinc-900/40 border-l-2 transition-all block cursor-pointer ${
                    selectedLead?.id === lead.id
                      ? 'bg-zinc-900/60 border-cyan-400'
                      : 'border-transparent bg-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className="text-xs font-bold font-sans text-white leading-snug">{lead.company}</h5>
                      <p className="text-[10px] font-mono text-zinc-400 mt-0.5">{lead.name} · {lead.title}</p>
                    </div>
                    {getScaleBadge(lead.scale)}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {lead.bottlenecks.map(bot => (
                      <span key={bot} className="text-[9px] font-mono px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded">
                        {bot.replace('-systems', '').replace('-engineering', '')}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3 text-[9px] font-mono text-zinc-500">
                    <span className="flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {getStatusBadge(lead.status)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Detail diagnostics pane */}
        <div className="lg:col-span-7 border border-zinc-900 bg-zinc-950 rounded-lg p-6 flex flex-col justify-between min-h-[500px]">
          {selectedLead ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="border-b border-zinc-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">{selectedLead.company}</h3>
                    {getScaleBadge(selectedLead.scale)}
                  </div>
                  <p className="font-mono text-xs text-zinc-500 mt-0.5">Reference ID: {selectedLead.referenceId}</p>
                </div>

                {/* Lead administrative triage controls */}
                <div className="flex gap-1.5 bg-zinc-900 p-0.5 rounded border border-zinc-800 text-xs">
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, 'pending_review')}
                    className={`px-2.5 py-1 font-mono rounded cursor-pointer transition-all ${
                      selectedLead.status === 'pending_review'
                        ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50 font-bold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, 'scheduled')}
                    className={`px-2.5 py-1 font-mono rounded cursor-pointer transition-all ${
                      selectedLead.status === 'scheduled'
                        ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50 font-bold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Set Call
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, 'assigned')}
                    className={`px-2.5 py-1 font-mono rounded cursor-pointer transition-all ${
                      selectedLead.status === 'assigned'
                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 font-bold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Assign
                  </button>
                </div>
              </div>

              {/* Personnel detail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-2 text-zinc-400 bg-zinc-900/30 p-2.5 border border-zinc-900 rounded">
                  <User className="h-4 w-4 text-cyan-500" />
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block">Contact Name</span>
                    <span className="text-zinc-200 font-bold">{selectedLead.name}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-zinc-400 bg-zinc-900/30 p-2.5 border border-zinc-900 rounded">
                  <Mail className="h-4 w-4 text-cyan-500" />
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block">Direct Email</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-cyan-400 underline font-medium">{selectedLead.email}</a>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-xs">
                <span className="font-mono text-zinc-500 uppercase tracking-widest text-[10px]">Customer Message Details:</span>
                <div className="bg-zinc-950 border border-zinc-900 p-4 rounded text-zinc-300 leading-relaxed max-h-[140px] overflow-y-auto italic">
                  “ {selectedLead.message || 'No details shared.'} ”
                </div>
              </div>

              {/* Autogenerated Recommended Architectural Layout */}
              <div className="rounded border border-cyan-950/60 bg-cyan-950/5 p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Suggested Next Steps for Customer
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-left">
                  {generateTechnicalDiagnostic(selectedLead).map((rec, idx) => (
                    <li key={idx} className="flex items-start text-zinc-300 font-mono gap-2">
                      <span className="text-cyan-500 font-black mt-0.5">↳</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3">
              <Activity className="h-10 w-10 text-zinc-700 animate-pulse" />
              <div>
                <p className="text-sm font-bold text-zinc-400">No message selected</p>
                <p className="text-xs text-zinc-600 mt-1">Choose a message from the column on the left to read its details.</p>
              </div>
            </div>
          )}

          {/* Action indicator */}
          {selectedLead && (
            <div className="mt-6 border-t border-zinc-900 pt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Message Details Saved
              </span>
              <span>Ticket ID: #{selectedLead.id.slice(0,6)}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
