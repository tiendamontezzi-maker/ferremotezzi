import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp, TrendingDown, ArrowUpRight, Users, UserPlus,
  Crown, Sparkles, ShoppingBag, Eye, Tag, Mail, Megaphone,
  Gift, CheckCircle2, ChevronRight, Percent
} from 'lucide-react';

interface OverviewDashboardProps {
  onNavigateTab: (tab: any) => void;
  onOpenCreateOrder: () => void;
  onOpenCreateProduct: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onOpenCreateOrder,
  onOpenCreateProduct
}) => {
  const { products, orders, abandonedCarts, productClickAnalytics, coupons } = useProducts();
  const { systemUsers } = useAuth();

  const [timeRange, setTimeRange] = useState<'Daily' | 'Weekly' | 'Monthly'>('Monthly');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Sales data for chart (matching the golden bars in the reference image)
  const monthlySales = [
    { month: 'Jan', value: 0, height: 4 },
    { month: 'Feb', value: 3100, height: 31 },
    { month: 'Mar', value: 6800, height: 68 },
    { month: 'Apr', value: 8700, height: 87 },
    { month: 'May', value: 7200, height: 72 },
    { month: 'Jun', value: 5400, height: 54 },
    { month: 'Jul', value: 2800, height: 28 },
    { month: 'Aug', value: 7800, height: 78 },
    { month: 'Sep', value: 6900, height: 69 },
    { month: 'Oct', value: 9600, height: 96 },
    { month: 'Nov', value: 8400, height: 84 },
    { month: 'Dec', value: 4200, height: 42 }
  ];

  const weeklySales = [
    { month: 'Sem 1', value: 5200, height: 52 },
    { month: 'Sem 2', value: 7800, height: 78 },
    { month: 'Sem 3', value: 9400, height: 94 },
    { month: 'Sem 4', value: 8100, height: 81 }
  ];

  const dailySales = [
    { month: 'Lun', value: 4200, height: 42 },
    { month: 'Mar', value: 6300, height: 63 },
    { month: 'Mié', value: 8900, height: 89 },
    { month: 'Jue', value: 7400, height: 74 },
    { month: 'Vie', value: 9800, height: 98 },
    { month: 'Sáb', value: 6100, height: 61 },
    { month: 'Dom', value: 3500, height: 35 }
  ];

  const currentChartData = timeRange === 'Monthly' ? monthlySales : timeRange === 'Weekly' ? weeklySales : dailySales;

  return (
    <div className="space-y-6">
      {/* 1. Quick Action Cards (4 Pastel Pills with Top-Right Arrow) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Create Discount Code */}
        <button
          onClick={() => onNavigateTab('discounts')}
          className="text-left p-4 rounded-2xl bg-[#EEF2F6] hover:bg-[#E5ECF2] border border-[#DCE4EC] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#1E293B] group-hover:text-black">
              Create Discount Code
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#64748B] font-sans">
            Set up percentage or fixed amount discounts
          </p>
        </button>

        {/* Email Campaign */}
        <button
          onClick={() => onNavigateTab('marketing')}
          className="text-left p-4 rounded-2xl bg-[#FFF6E9] hover:bg-[#FEEDD6] border border-[#FDE6C8] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#78350F] group-hover:text-black">
              Email Campaign
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B45309] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#92400E] font-sans">
            Send newsletters and promotional emails
          </p>
        </button>

        {/* Announcement Banner */}
        <button
          onClick={() => onNavigateTab('marketing')}
          className="text-left p-4 rounded-2xl bg-[#EAF8F0] hover:bg-[#DEF3E7] border border-[#D1EFE0] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#065F46] group-hover:text-black">
              Announcement Banner
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#059669] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#047857] font-sans">
            Display site-wide promotional messages
          </p>
        </button>

        {/* Bundle Offers */}
        <button
          onClick={() => onNavigateTab('discounts')}
          className="text-left p-4 rounded-2xl bg-[#F3EFFB] hover:bg-[#ECE5F8] border border-[#E3D9F3] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#5B21B6] group-hover:text-black">
              Bundle Offers
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#7C3AED] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#6D28D9] font-sans">
            Create product bundles with special pricing
          </p>
        </button>
      </div>

      {/* 2. Main Grid: Left Column (Metrics + Chart) | Right Column (Insights + Promotions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT / CENTER (2 Columns): 6 Key Metric Cards + Sales Analytics Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* 6 Metric Cards in 3x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Total Sales */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Total Sales
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                $54,890
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.5% This month</span>
              </div>
            </div>

            {/* 2. Orders */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Orders
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                1,429
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8.2% This month</span>
              </div>
            </div>

            {/* 3. Average Order Value */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Average Order Value
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                $38.42
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+3.1% This month</span>
              </div>
            </div>

            {/* 4. Returning Customers */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Returning Customers
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                68%
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2.4% This month</span>
              </div>
            </div>

            {/* 5. Cart Abandonment */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Cart Abandonment
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                23.8%
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#EF4444]">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-1.8% This month</span>
              </div>
            </div>

            {/* 6. Product Views */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Product Views
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                45,210
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+15.3% This month</span>
              </div>
            </div>
          </div>

          {/* Sales Analytics Chart Card */}
          <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-base font-semibold text-[#18181B]">
                Sales Analytics
              </h3>
              {/* Segmented Controller: Daily | Weekly | Monthly */}
              <div className="flex items-center p-1 bg-[#F4F4F5] rounded-full text-xs font-sans">
                {(['Daily', 'Weekly', 'Monthly'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTimeRange(tab)}
                    className={`px-3 py-1 rounded-full transition-all font-medium ${
                      timeRange === tab
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'text-[#71717A] hover:text-[#18181B]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="pt-4">
              <div className="relative h-64 flex items-end justify-between pl-10 pr-2">
                {/* Y-Axis Grid Lines and Labels */}
                <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[10px] text-[#A1A1AA] font-mono pointer-events-none select-none">
                  <span>10000</span>
                  <span>7500</span>
                  <span>5000</span>
                  <span>2500</span>
                  <span>0</span>
                </div>

                {/* Horizontal reference lines */}
                <div className="absolute inset-x-10 top-0 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-10 top-1/4 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-10 top-2/4 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-10 top-3/4 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-10 bottom-0 border-b border-[#E4E4E7] pointer-events-none" />

                {/* Vertical Bars */}
                {currentChartData.map((item, idx) => {
                  const isHovered = hoveredMonth === idx;
                  return (
                    <div
                      key={item.month}
                      className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer px-1"
                      onMouseEnter={() => setHoveredMonth(idx)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-10 z-20 bg-[#18181B] text-white text-[11px] font-sans font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
                          ${item.value.toLocaleString()} USD
                        </div>
                      )}

                      {/* Bar with Golden/Amber Gradient exactly as reference image */}
                      <div
                        style={{ height: `${item.height}%` }}
                        className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                          isHovered
                            ? 'bg-gradient-to-t from-[#F59E0B] to-[#FCD34D] opacity-100 scale-102'
                            : 'bg-gradient-to-t from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] opacity-80 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Month Labels */}
              <div className="flex justify-between pl-10 pr-2 pt-3 text-[11px] text-[#A1A1AA] font-sans">
                {currentChartData.map(item => (
                  <span key={item.month} className="flex-1 text-center font-medium">
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer Insights + Active Promotions */}
        <div className="space-y-6">
          {/* Card 1: Customer Insights */}
          <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="font-sans text-base font-semibold text-[#18181B]">
              Customer Insights
            </h3>

            {/* 3 Metric Rows */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#18181B]">New Customers</div>
                    <div className="text-[10px] text-[#A1A1AA]">This week</div>
                  </div>
                </div>
                <span className="font-sans font-bold text-sm text-[#18181B]">15</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#18181B]">VIP Customers</div>
                    <div className="text-[10px] text-[#A1A1AA]">Active</div>
                  </div>
                </div>
                <span className="font-sans font-bold text-sm text-[#18181B]">12</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#18181B]">Total Customers</div>
                    <div className="text-[10px] text-[#A1A1AA]">All time</div>
                  </div>
                </div>
                <span className="font-sans font-bold text-sm text-[#18181B]">2,847</span>
              </div>
            </div>

            {/* Top Customers Section */}
            <div className="pt-2 border-t border-[#F4F4F5] space-y-3">
              <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider block">
                Top Customers
              </span>
              <div className="space-y-2.5">
                {[
                  { name: 'Alice Johnson', orders: '23 orders', total: '$2,340', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
                  { name: 'Robert Smith', orders: '19 orders', total: '$1,980', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
                  { name: 'Maria Garcia', orders: '15 orders', total: '$1,850', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
                ].map(cust => (
                  <div key={cust.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={cust.avatar} alt={cust.name} className="w-7 h-7 rounded-full object-cover border border-black/10" />
                      <div>
                        <div className="font-semibold text-[#18181B] leading-tight">{cust.name}</div>
                        <div className="text-[10px] text-[#A1A1AA]">{cust.orders}</div>
                      </div>
                    </div>
                    <span className="font-semibold text-[#10B981]">{cust.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Retention Progress */}
            <div className="pt-2 border-t border-[#F4F4F5] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#18181B]">Customer Retention</span>
                <span className="font-bold text-[#10B981]">60%</span>
              </div>
              <div className="w-full bg-[#F4F4F5] h-2 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full rounded-full" style={{ width: '60%' }} />
              </div>
              <span className="text-[10px] text-[#A1A1AA] block">
                +2.4% from last month
              </span>
            </div>
          </div>

          {/* Card 2: Active Promotions */}
          <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-sans text-base font-semibold text-[#18181B]">
              Active Promotions
            </h3>

            <div className="space-y-3">
              {/* Promo 1 */}
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl border border-black/5">
                <div>
                  <div className="text-xs font-semibold text-[#18181B]">Holiday Sale</div>
                  <div className="text-[10px] text-[#71717A]">Discount Code · 234 used</div>
                </div>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                  Active
                </span>
              </div>

              {/* Promo 2 */}
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl border border-black/5">
                <div>
                  <div className="text-xs font-semibold text-[#18181B]">New Customer Welcome</div>
                  <div className="text-[10px] text-[#71717A]">Email Campaign · 89% open rate</div>
                </div>
                <span className="text-[10px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-full border border-[#BAE6FD]">
                  Running
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
