import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Tag, Plus, CheckCircle2, Clock, Percent, DollarSign, Copy, Check } from 'lucide-react';

export const DiscountsTab: React.FC = () => {
  const { coupons } = useProducts();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-sans text-[#18181B] tracking-tight">
            Discounts & Coupons
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Manage promotional discount codes, VIP privileges, and bundle pricing rules
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((cpn) => (
          <div
            key={cpn.id}
            className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm bg-[#F4F4F5] px-3 py-1 rounded-full text-[#18181B] tracking-wider border border-black/5">
                {cpn.code}
              </span>
              <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                cpn.is_active ? 'bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]' : 'bg-[#FEF2F2] text-[#EF4444]'
              }`}>
                {cpn.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold font-sans text-[#18181B]">
                {cpn.discount_type === 'percentage' ? `${cpn.discount_value}% OFF` : `$${cpn.discount_value.toLocaleString()} COP`}
              </div>
              <p className="text-xs text-[#71717A]">
                Min. purchase: ${cpn.min_purchase ? cpn.min_purchase.toLocaleString() : '0'} COP
              </p>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#71717A]">
              <span>Redeemed: <strong className="text-[#18181B]">{cpn.usage_count || 0} times</strong></span>
              <button
                onClick={() => handleCopy(cpn.code)}
                className="flex items-center gap-1 text-[11px] font-medium text-black hover:underline"
              >
                {copiedCode === cpn.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === cpn.code ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
