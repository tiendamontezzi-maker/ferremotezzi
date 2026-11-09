import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Layers, FolderTree, Package, ArrowUpRight } from 'lucide-react';

export const CategoriesTab: React.FC = () => {
  const { categories, products } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-sans text-[#18181B] tracking-tight">
            Product Categories
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Architecture and organization lines for Kitchen & Closet luxury systems
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const productCount = products.filter(p => p.category_id === cat.id || p.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F4F4F5] text-[#71717A]">
                  {cat.main_collection === 'cocina' ? 'Cocina' : 'Clóset & Vestidor'}
                </span>
                <span className="text-xs font-bold text-[#18181B] flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span>{productCount} refs</span>
                </span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-base text-[#18181B]">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#71717A] mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>Slug: /{cat.slug}</span>
                <span className="text-[#10B981] font-sans font-semibold">Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
