import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  BarChart3, 
  ArrowUpRight, 
  DollarSign, 
  Search, 
  Bell, 
  CheckCircle2, 
  Clock, 
  Layers
} from 'lucide-react';

export const BusinessDashboardMockup: React.FC<{ isMini?: boolean }> = ({ isMini = false }) => {
  if (isMini) {
    return (
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-xs text-xs font-sans">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            DeepliX Business System
          </div>
          <span className="text-[10px] text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded font-medium">Live</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-[#F8FAFC] p-2 rounded border border-[#E5E7EB]/60">
            <span className="text-[#64748B] block text-[10px]">Monthly Sales</span>
            <span className="font-bold text-[#0F172A]">PKR 1,480,000</span>
          </div>
          <div className="bg-[#F8FAFC] p-2 rounded border border-[#E5E7EB]/60">
            <span className="text-[#64748B] block text-[10px]">Inventory Active</span>
            <span className="font-bold text-[#0F172A]">1,280 SKUs</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden text-xs sm:text-sm font-sans">
      {/* Top Application Bar */}
      <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
          </div>
          <div className="h-4 w-px bg-[#E5E7EB] mx-1"></div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] text-xs sm:text-sm">DeepliX Business System</span>
            <span className="text-[10px] bg-blue-100 text-[#2563EB] font-medium px-2 py-0.5 rounded-full">v3.4 Production</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#64748B]">
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-md px-2.5 py-1 text-xs">
            <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Search inventory, orders...</span>
          </div>
          <div className="p-1.5 bg-white border border-[#E5E7EB] rounded-md">
            <Bell className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main App Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3 bg-[#FAFAFA] border-r border-[#E5E7EB] p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1">Operations</div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-blue-50 text-[#2563EB] font-medium rounded-md text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Sales Overview</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <Package className="w-4 h-4" />
            <span>Inventory</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <Users className="w-4 h-4" />
            <span>Customer Records</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>Reports & Analytics</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[#475569] hover:bg-slate-100 rounded-md text-xs transition-colors">
            <Layers className="w-4 h-4" />
            <span>Performance</span>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
            <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1">System Health</div>
            <div className="px-2 py-1.5 text-xs text-[#475569] flex items-center justify-between">
              <span>Database Sync</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Real-time
              </span>
            </div>
            <div className="px-2 py-1 text-xs text-[#475569] flex items-center justify-between">
              <span>Backup Status</span>
              <span className="text-[#64748B]">03:00 AM OK</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-9 p-4 sm:p-5 space-y-4 bg-white">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Sales Today</span>
                <DollarSign className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">PKR 148,900</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> +12.4% vs last week
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Inventory Items</span>
                <Package className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">1,842 SKUs</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">
                98.2% In-Stock
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Active Customers</span>
                <Users className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">624 Accounts</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> +8 new this week
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
                <span>Performance</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A]">99.4%</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">
                On-time dispatch
              </div>
            </div>
          </div>

          {/* Real Operational Table & Chart preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Recent Orders Table */}
            <div className="lg:col-span-7 border border-[#E5E7EB] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-semibold text-xs text-[#0F172A]">Recent Dispatches & Invoices</h4>
                <span className="text-[11px] text-[#2563EB] hover:underline cursor-pointer font-medium">View All</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-[#64748B] border-b border-[#E5E7EB] pb-1">
                      <th className="pb-1.5 font-medium">Order ID</th>
                      <th className="pb-1.5 font-medium">Client</th>
                      <th className="pb-1.5 font-medium">Amount</th>
                      <th className="pb-1.5 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    <tr>
                      <td className="py-2 font-mono text-[#0F172A]">#ORD-8942</td>
                      <td className="py-2 text-[#334155]">Indus Cargo & Logistics</td>
                      <td className="py-2 font-semibold text-[#0F172A]">PKR 485,000</td>
                      <td className="py-2 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-medium">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-[#0F172A]">#ORD-8941</td>
                      <td className="py-2 text-[#334155]">Khyber General Supplies</td>
                      <td className="py-2 font-semibold text-[#0F172A]">PKR 129,000</td>
                      <td className="py-2 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-medium">
                          Processing
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-[#0F172A]">#ORD-8940</td>
                      <td className="py-2 text-[#334155]">Al-Rehman Commercial Traders</td>
                      <td className="py-2 font-semibold text-[#0F172A]">PKR 342,000</td>
                      <td className="py-2 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-medium">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inventory Status Summary */}
            <div className="lg:col-span-5 border border-[#E5E7EB] rounded-lg p-3 bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-xs text-[#0F172A]">Inventory Health</h4>
                <span className="text-[10px] text-[#64748B]">Auto-synced</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div>
                  <div className="flex justify-between text-[#475569] mb-1">
                    <span>Main Warehouse</span>
                    <span className="font-medium text-[#0F172A]">84% Capacity</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#475569] mb-1">
                    <span>Regional Distribution</span>
                    <span className="font-medium text-[#0F172A]">62% Capacity</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#38BDF8] h-full rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#2563EB]" /> Next automated reorder run
                  </span>
                  <span className="font-medium text-[#0F172A]">Today, 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
