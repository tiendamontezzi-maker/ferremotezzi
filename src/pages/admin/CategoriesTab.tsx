import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Layers, Package, CheckCircle2, Sparkles } from 'lucide-react';

export const CategoriesTab: React.FC = () => {
  const { categories, products } = useProducts();

  const totalKitchen = products.filter(p => p.main_collection === 'cocina').length;
  const totalCloset = products.filter(p => p.main_collection === 'closet').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Categorías</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {categories.length}
          </div>
          <div className="text-[11px] font-medium text-[#10B981] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Activas en la navegación principal</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Línea Arquitectura de Cocina</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalKitchen} <span className="text-xs font-normal text-[#71717A]">productos</span>
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Condimenteros, Alacenas, Plateros & Herrajes
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Línea Clóset & Vestidor</span>
            <div className="w-8 h-8 rounded-full bg-[#F3EFFE] text-[#6D28D9] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalCloset} <span className="text-xs font-normal text-[#71717A]">productos</span>
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Cajones con Clave, Pantaloneros & Zapateros
          </div>
        </div>
      </div>

      {/* Categories Grid with Product Photo Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const catProducts = products.filter(
            p => p.category_id === cat.id || p.category === cat.name
          );
          const productCount = catProducts.length;

          return (
            <div
              key={cat.id}
              className="bg-white border border-[#EAE7E1] hover:border-black/20 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                      cat.main_collection === 'cocina'
                        ? 'bg-[#FFF6E9] text-[#B45309]'
                        : 'bg-[#F3EFFE] text-[#6D28D9]'
                    }`}
                  >
                    {cat.main_collection === 'cocina' ? 'Cocina' : 'Clóset & Vestidor'}
                  </span>
                  <span className="text-xs font-bold text-[#18181B] bg-[#F4F4F5] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-[#71717A]" />
                    <span>{productCount} refs</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-base text-[#18181B] normal-case">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Product Photo Previews inside Category Card */}
                {catProducts.length > 0 && (
                  <div className="pt-1">
                    <div className="text-[10px] font-semibold text-[#A1A1AA] mb-2">
                      Referencias Destacadas:
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {catProducts.slice(0, 4).map(prod => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-1.5 bg-[#FAF9F7] border border-[#EAE7E1] rounded-xl p-1 pr-2.5"
                          title={prod.name}
                        >
                          <img
                            src={prod.image_url || '/images/products/kdj-60.jpg'}
                            alt={prod.name}
                            className="w-7 h-7 rounded-lg object-contain bg-white border border-[#EAE7E1] p-0.5 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                          <div className="leading-tight">
                            <span className="font-mono text-[10px] font-semibold text-[#18181B] block">
                              {prod.code}
                            </span>
                            <span className="text-[9px] text-[#71717A] font-medium block">
                              ${prod.price.toLocaleString('es-CO')}
                            </span>
                          </div>
                        </div>
                      ))}
                      {catProducts.length > 4 && (
                        <span className="text-[11px] font-semibold text-[#71717A] pl-1">
                          +{catProducts.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#A1A1AA]">/{cat.slug}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Activa
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
