import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { ProductCard } from '../components/catalog/ProductCard';
import { useProducts } from '../context/ProductContext';
import { MainCollection } from '../types/database';
import { SlidersHorizontal, ArrowUpDown, Search, X } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { filteredProducts, filters, setFilters, resetFilters } = useProducts();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'code_asc' | 'price_asc' | 'price_desc' | 'featured'>('code_asc');

  // Sync URL query params with context filter on mount/update
  useEffect(() => {
    const col = searchParams.get('coleccion') as MainCollection | null;
    const cat = searchParams.get('categoria');
    const search = searchParams.get('q');

    if (col && ['cocina', 'closet', 'herrajes_especiales'].includes(col)) {
      setFilters(prev => ({ ...prev, collection: col }));
    }
    if (cat) {
      setFilters(prev => ({ ...prev, categorySlug: cat }));
    }
    if (search) {
      setFilters(prev => ({ ...prev, searchQuery: search }));
    }
  }, [searchParams, setFilters]);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'featured') {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
    }
    // Default: code_asc (numerical extraction)
    const numA = parseInt(a.code.replace('KDJ-', ''), 10) || 0;
    const numB = parseInt(b.code.replace('KDJ-', ''), 10) || 0;
    return numA - numB;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white">
      {/* Header & Breadcrumb */}
      <div className="space-y-3 pb-6 border-b border-black/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-obsidian/50 font-sans">
          <span>Inicio</span>
          <span>/</span>
          <span className="text-obsidian font-bold">Catálogo Oficial</span>
          {filters.collection !== 'all' && (
            <>
              <span>/</span>
              <span className="text-obsidian capitalize font-medium">{filters.collection.replace('_', ' ')}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-sans text-3xl sm:text-5xl text-obsidian tracking-wider font-bold uppercase">
              Portafolio Arquitectónico
            </h1>
            <p className="text-xs sm:text-sm text-obsidian/70 font-sans mt-1.5 max-w-2xl">
              112 soluciones de organización, bisagras, correderas y accesorios de precisión técnica certificada para proyectos de alta gama.
            </p>
          </div>

          {/* Quick Active Filters button for mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-black border border-black text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-sm rounded-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros ({filteredProducts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Controls Row with Reinforced Glassmorphism */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-5 rounded-xl shadow-lg border border-white/80">
        {/* Real-time search field */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-obsidian/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Filtrar por código (ej: KDJ-14), nombre o material..."
            className="w-full bg-white/90 backdrop-blur-sm border border-black/15 text-obsidian text-xs pl-10 pr-8 py-2.5 rounded-lg focus:outline-none focus:border-black placeholder:text-obsidian/45 shadow-inner"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-obsidian/50 hover:text-obsidian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-obsidian/70 font-sans flex items-center gap-1.5 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-obsidian" /> Ordenar por:
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-white/90 backdrop-blur-sm border border-black/15 text-obsidian text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-black uppercase tracking-wider font-sans font-semibold shadow-xs"
          >
            <option value="code_asc">Código KDJ (1 a 112)</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="featured">Destacados de Colección</option>
          </select>
        </div>
      </div>

      {/* Content Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FilterSidebar />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-6">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-xl space-y-4 shadow-md border border-white/80 p-8">
              <p className="font-sans font-bold uppercase tracking-wider text-xl text-obsidian">No se encontraron referencias</p>
              <p className="text-xs text-obsidian/60 max-w-sm mx-auto">
                No hay productos que coincidan con los filtros seleccionados. Intenta restablecer los filtros para ver el catálogo completo.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-black/85 transition-all shadow-md rounded-xs"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="pt-8 border-t border-black/[0.08] text-center text-xs text-obsidian/50 font-sans">
                Mostrando los {sortedProducts.length} productos disponibles en el catálogo oficial Montezzi 2026.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs glass-drawer p-6 overflow-y-auto border-r border-black/10">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.08]">
                <span className="font-sans text-sm uppercase font-bold tracking-wider text-obsidian">Filtros</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-obsidian/60 hover:text-obsidian"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-black/85 transition-all shadow-md rounded-xs"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
