import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { MainCollection } from '../../types/database';

export const FilterSidebar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { categories, filters, setFilters, resetFilters, filteredProducts } = useProducts();

  const collections: { label: string; value: MainCollection | 'all' }[] = [
    { label: 'Todas las Colecciones', value: 'all' },
    { label: 'Cocina', value: 'cocina' },
    { label: 'Clóset', value: 'closet' },
    { label: 'Herrajes Especiales', value: 'herrajes_especiales' },
  ];

  const finishes = [
    { label: 'Todos los acabados', value: 'all' },
    { label: 'Negro Mate', value: 'negro' },
    { label: 'Níquel Satinado', value: 'satinad' },
    { label: 'Cromo Espejo', value: 'cromo' },
    { label: 'Acero Inoxidable', value: 'acero' },
    { label: 'Vidrio Templado Fumé', value: 'vidrio' },
    { label: 'Antracita Deep Space', value: 'antracita' },
    { label: 'Cuero / Ratán', value: 'cuero' },
  ];

  const pricePresets = [
    { label: 'Todos los precios', range: [0, 3000000] as [number, number] },
    { label: 'Hasta $100.000 COP', range: [0, 100000] as [number, number] },
    { label: '$100.000 - $500.000 COP', range: [100000, 500000] as [number, number] },
    { label: '$500.000 - $1.500.000 COP', range: [500000, 1500000] as [number, number] },
    { label: 'Más de $1.500.000 COP (Alta Gama)', range: [1500000, 3000000] as [number, number] },
  ];

  const relevantCategories = filters.collection === 'all'
    ? categories
    : categories.filter(c => c.main_collection === filters.collection);

  return (
    <aside className={`glass-card p-6 rounded-sm space-y-7 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <div className="flex items-center gap-2 text-obsidian">
          <Filter className="w-4 h-4 stroke-[1.5]" />
          <span className="font-sans text-xs tracking-widest uppercase font-bold text-obsidian">
            Filtros Avanzados
          </span>
        </div>
        <button
          onClick={resetFilters}
          className="text-[11px] text-obsidian/50 hover:text-black flex items-center gap-1 transition-colors font-sans font-medium"
          title="Restablecer filtros"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Limpiar</span>
        </button>
      </div>

      {/* Results summary */}
      <div className="text-xs text-obsidian/70 font-sans">
        Mostrando <strong className="text-obsidian font-mono font-bold">{filteredProducts.length}</strong> de 112 referencias oficiales
      </div>

      {/* 1. Colecciones Principales */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-obsidian uppercase">
          Colección
        </h4>
        <div className="space-y-1.5">
          {collections.map(col => (
            <button
              key={col.value}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  collection: col.value,
                  categorySlug: 'all' // Reset category when collection changes
                }));
              }}
              className={`w-full text-left px-3 py-2 text-xs rounded-xs transition-all flex items-center justify-between ${
                filters.collection === col.value
                  ? 'bg-black text-white font-bold shadow-xs'
                  : 'text-obsidian/75 hover:bg-black/5 hover:text-obsidian'
              }`}
            >
              <span>{col.label}</span>
              {filters.collection === col.value && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Categorías de la Matriz */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-obsidian uppercase">
          Categoría Específica
        </h4>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => setFilters(prev => ({ ...prev, categorySlug: 'all' }))}
            className={`w-full text-left px-3 py-1.5 text-xs rounded-xs transition-colors ${
              filters.categorySlug === 'all'
                ? 'bg-black text-white font-semibold'
                : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
            }`}
          >
            Todas las categorías
          </button>
          {relevantCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setFilters(prev => ({ ...prev, categorySlug: cat.slug }))}
              className={`w-full text-left px-3 py-1.5 text-xs rounded-xs transition-colors truncate block ${
                filters.categorySlug === cat.slug
                  ? 'bg-black text-white font-semibold'
                  : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
              }`}
              title={cat.name}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Acabados */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-obsidian uppercase">
          Acabado & Material
        </h4>
        <div className="space-y-1">
          {finishes.map(f => (
            <button
              key={f.value}
              onClick={() => setFilters(prev => ({ ...prev, finish: f.value }))}
              className={`w-full text-left px-3 py-1.5 text-xs rounded-xs transition-colors flex items-center justify-between ${
                filters.finish === f.value
                  ? 'bg-black text-white font-semibold'
                  : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
              }`}
            >
              <span>{f.label}</span>
              {filters.finish === f.value && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Rango de Precios */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-obsidian uppercase">
          Rango de Precio
        </h4>
        <div className="space-y-1.5">
          {pricePresets.map((preset, idx) => {
            const isSelected =
              filters.priceRange[0] === preset.range[0] &&
              filters.priceRange[1] === preset.range[1];
            return (
              <button
                key={idx}
                onClick={() => setFilters(prev => ({ ...prev, priceRange: preset.range }))}
                className={`w-full text-left px-3 py-1.5 text-xs rounded-xs transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-black text-white font-semibold'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
                }`}
              >
                <span>{preset.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
