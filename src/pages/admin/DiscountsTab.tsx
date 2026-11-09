import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Tag, CheckCircle2, Percent, Copy, Check, TrendingUp } from 'lucide-react';

export const DiscountsTab: React.FC = () => {
  const { coupons } = useProducts();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usage_count || 0), 0);
  const activeCoupons = coupons.filter(c => c.is_active).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Active Discount Codes</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {activeCoupons} <span className="text-xs font-normal text-[#71717A]">of {coupons.length}</span>
          </div>
          <div className="text-[11px] font-medium text-[#10B981] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Synced with checkout validation</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Redemptions</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalRedemptions}
          </div>
          <div className="text-[11px] font-medium text-[#10B981] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% conversion uplift</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Top Performing Code</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-mono font-bold text-[#18181B] tracking-tight my-1">
            {coupons[0]?.code || 'MONTEZZI10'}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            B2B Architect & Studio privilege
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((cpn) => (
          <div
            key={cpn.id}
            className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm bg-[#F4F4F5] px-3.5 py-1 rounded-full text-[#18181B] tracking-wider border border-black/5">
                {cpn.code}
              </span>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  cpn.is_active
                    ? 'bg-[#ECFDF5] text-[#10B981]'
                    : 'bg-[#FEF2F2] text-[#EF4444]'
                }`}
              >
                {cpn.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold font-sans text-[#18181B]">
                {cpn.discount_type === 'percentage'
                  ? `${cpn.discount_value}% OFF`
                  : `$${cpn.discount_value.toLocaleString('es-CO')} COP`}
              </div>
              <p className="text-xs text-[#71717A]">
                Min. purchase: ${cpn.min_purchase ? cpn.min_purchase.toLocaleString('es-CO') : '0'} COP
              </p>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#71717A]">
              <span>
                Redeemed: <strong className="text-[#18181B]">{cpn.usage_count || 0} times</strong>
              </span>
              <button
                onClick={() => handleCopy(cpn.code)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F5] hover:bg-[#18181B] hover:text-white text-[11px] font-semibold text-[#18181B] transition-colors"
              >
                {copiedCode === cpn.code ? (
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode === cpn.code ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
