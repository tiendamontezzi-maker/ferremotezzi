import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Megaphone, Mail, Gift, TrendingUp, Sparkles } from 'lucide-react';

export const MarketingTab: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 6);

  return (
    <div className="space-y-6 font-sans">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Campañas Activas</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            3
          </div>
          <div className="text-[11px] font-medium text-[#10B981]">
            Email + Banner Web + Kits B2B
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Tasa de Apertura Email</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            89.2%
          </div>
          <div className="text-[11px] font-medium text-[#10B981] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+6.4% sobre el promedio del sector</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Referencias en Vitrina</span>
            <div className="w-8 h-8 rounded-full bg-[#F3EFFE] text-[#6D28D9] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {products.filter(p => p.is_featured).length}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Promocionadas en inicio y carruseles
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-[#18181B] normal-case">
                  Serie de Bienvenida Arquitectos & Estudios
                </h3>
                <span className="text-[11px] text-[#71717A]">
                  Automatización de Correo · Nuevos registros B2B
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#0284C7] bg-[#F0F9FF] px-3 py-1 rounded-full">
              En Curso
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3.5 bg-[#FAF9F7] rounded-2xl border border-[#EAE7E1] text-center">
            <div>
              <span className="text-lg font-bold text-[#18181B]">89.2%</span>
              <span className="text-[11px] text-[#71717A] block">Apertura</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#18181B]">34.5%</span>
              <span className="text-[11px] text-[#71717A] block">Clics</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#10B981]">14.8%</span>
              <span className="text-[11px] text-[#71717A] block">Conversión</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-[#18181B] normal-case">
                  Banner Anuncio Colección 2026
                </h3>
                <span className="text-[11px] text-[#71717A]">
                  Banner Superior · Visible en toda la tienda
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full">
              Activa
            </span>
          </div>

          <p className="text-xs text-[#52525B] bg-[#FAF9F7] p-4 rounded-2xl border border-[#EAE7E1] leading-relaxed">
            "Descubre la Colección Oficial Montezzi 2026: 48 referencias exclusivas de alta arquitectura para cocina y vestidor."
          </p>
        </div>
      </div>

      {/* Featured Products Showcase with Product Photos */}
      <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-sans font-bold text-sm text-[#18181B] normal-case flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#6D28D9]" />
              <span>Productos Destacados en Campaña (Hero & Bundles)</span>
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              Referencias con prioridad visual en las campañas de marketing activas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredProducts.map(prod => (
            <div
              key={prod.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF9F7] border border-[#EAE7E1]"
            >
              <img
                src={prod.image_url || '/images/products/kdj-60.jpg'}
                alt={prod.name}
                className="w-12 h-12 rounded-xl object-contain bg-white border border-[#EAE7E1] p-1 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold text-[#18181B] bg-white px-2 py-0.5 rounded border border-black/5">
                    {prod.code}
                  </span>
                  <span className="text-[11px] font-bold text-[#10B981]">
                    ${prod.price.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#18181B] truncate mt-1">
                  {prod.name}
                </div>
                <div className="text-[10px] text-[#71717A] truncate">
                  {prod.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
