import React from 'react';
import { Megaphone, Mail, Tag, Gift, CheckCircle2, TrendingUp, Sparkles, Send } from 'lucide-react';

export const MarketingTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-sans text-[#18181B] tracking-tight">
            Marketing & Growth Campaigns
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Active email broadcasts, seasonal promotions, and site-wide luxury announcements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Campaign 1 */}
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-[#18181B]">New Customer Welcome Series</h3>
                <span className="text-[10px] text-[#A1A1AA]">Email Automation · Target: Nuevos registros</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-full border border-[#BAE6FD]">
              Running
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 bg-[#FAF9F7] rounded-xl border border-black/5 text-center">
            <div>
              <span className="text-lg font-bold text-[#18181B]">89.2%</span>
              <span className="text-[10px] text-[#71717A] block">Open Rate</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#18181B]">34.5%</span>
              <span className="text-[10px] text-[#71717A] block">Click Rate</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#10B981]">14.8%</span>
              <span className="text-[10px] text-[#71717A] block">Conversion</span>
            </div>
          </div>
        </div>

        {/* Campaign 2 */}
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-[#18181B]">Colección 2026 Announcement Banner</h3>
                <span className="text-[10px] text-[#A1A1AA]">Site-wide Banner · Top of site</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
              Active
            </span>
          </div>

          <p className="text-xs text-[#71717A] bg-[#FAF9F7] p-3 rounded-xl border border-black/5">
            "Descubre la Colección Oficial Montezzi 2026: 48 referencias exclusivas de alta arquitectura para cocina y vestidor."
          </p>
        </div>
      </div>
    </div>
  );
};
