import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, Sparkles, SlidersHorizontal, Tag, Zap, 
  ShoppingBag, Check, Truck, ChevronRight, ArrowRight
} from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { MainCollection, Product } from '../../types/database';

export const SmartSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const { products, setFilters: setGlobalCatalogFilters } = useProducts();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedCollection, setSelectedCollection] = useState<MainCollection | 'all'>('all');
  const [selectedPricePreset, setSelectedPricePreset] = useState<'all' | 'under100' | '100to500' | 'above500'>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedMechanism, setSelectedMechanism] = useState<string>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Auto-focus when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    closeSearch();
  };

  // Trending / curated suggestions
  const quickSuggestions = [
    { label: 'KDJ-104 · Watch Winder', query: 'KDJ-104', collection: 'closet' as MainCollection },
    { label: 'KDJ-90 · Condimentero', query: 'KDJ-90', collection: 'cocina' as MainCollection },
    { label: 'KDJ-92 · Bandeja Joyero', query: 'KDJ-92', collection: 'closet' as MainCollection },
    { label: 'KDJ-22 · Bisagra 3D', query: 'KDJ-22', collection: 'herrajes_especiales' as MainCollection },
    { label: 'KDJ-93 · Canasta Elevable', query: 'KDJ-93', collection: 'cocina' as MainCollection },
    { label: 'Cierre Suave', query: 'cierre suave', collection: 'all' as const },
    { label: 'Acabado Negro Mate', query: 'negro', collection: 'all' as const },
  ];

  // Smart Filtering Logic
  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter(product => {
      // 1. Text match (Code, Name, Category, Description, Specs)
      if (q) {
        const codeMatch = product.code.toLowerCase().includes(q);
        const nameMatch = product.name.toLowerCase().includes(q);
        const catMatch = product.category_name.toLowerCase().includes(q);
        const descMatch = (product.short_description || '').toLowerCase().includes(q);
        const finishSpec = (product.technical_specs.acabado || '').toLowerCase();
        const matSpec = (product.technical_specs.material || '').toLowerCase();
        const finishMatch = finishSpec.includes(q) || matSpec.includes(q);

        if (!codeMatch && !nameMatch && !catMatch && !descMatch && !finishMatch) {
          return false;
        }
      }

      // 2. Collection filter
      if (selectedCollection !== 'all' && product.main_collection !== selectedCollection) {
        return false;
      }

      // 3. Price preset filter
      if (selectedPricePreset === 'under100' && product.price > 100000) return false;
      if (selectedPricePreset === '100to500' && (product.price < 100000 || product.price > 500000)) return false;
      if (selectedPricePreset === 'above500' && product.price < 500000) return false;

      // 4. Finish filter
      if (selectedFinish !== 'all') {
        const finishText = (product.technical_specs.acabado || '').toLowerCase();
        if (!finishText.includes(selectedFinish.toLowerCase())) return false;
      }

      // 5. Mechanism filter
      if (selectedMechanism !== 'all') {
        const fullTech = JSON.stringify(product.technical_specs).toLowerCase() + ' ' + (product.short_description || '').toLowerCase();
        if (!fullTech.includes(selectedMechanism.toLowerCase())) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCollection, selectedPricePreset, selectedFinish, selectedMechanism]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1600);
  };

  const handleSelectProduct = (code: string) => {
    handleClose();
    navigate(`/producto/${code}`);
  };

  const handleViewAllInCatalog = () => {
    setGlobalCatalogFilters(prev => ({
      ...prev,
      searchQuery,
      collection: selectedCollection
    }));
    handleClose();
    navigate('/catalogo');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCollection('all');
    setSelectedPricePreset('all');
    setSelectedFinish('all');
    setSelectedMechanism('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCollection !== 'all' || selectedPricePreset !== 'all' || selectedFinish !== 'all' || selectedMechanism !== 'all';

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20 font-sans">
      {/* Frosted Luxury Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Main Intelligent Search Modal */}
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[85vh] transition-all transform duration-200">
        
        {/* Top Input Bar */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] bg-white/75 backdrop-blur-xl flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white shrink-0 shadow-2xs">
            <Search className="w-4 h-4 stroke-[1.5]" />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por código KDJ, nombre, acabado, tecnología..."
              className="w-full bg-transparent text-sm sm:text-base text-obsidian placeholder:text-obsidian/35 focus:outline-none font-sans font-normal tracking-wide"
            />
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1.5 text-obsidian/40 hover:text-black transition-colors rounded-full"
              title="Limpiar texto"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          )}

          <button
            onClick={handleClose}
            className="p-1.5 text-obsidian/50 hover:text-black hover:bg-black/5 rounded-full transition-colors flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 border border-black/10"
            title="Cerrar buscador"
          >
            <span>ESC</span>
          </button>
        </div>

        {/* Smart Filter Pills Row */}
        <div className="px-4 sm:px-6 py-3 bg-white/50 backdrop-blur-md border-b border-black/[0.05] space-y-2.5">
          {/* Row 1: Collections */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[10px] uppercase tracking-[0.16em] text-obsidian/45 font-medium mr-1.5 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-black/70 stroke-[1.5]" /> Colección:
            </span>

            {[
              { id: 'all', label: 'Todas' },
              { id: 'cocina', label: 'Cocina' },
              { id: 'closet', label: 'Clóset & Vestidores' },
              { id: 'herrajes_especiales', label: 'Herrajes Especiales' }
            ].map(col => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id as any)}
                className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all shrink-0 tracking-wide ${
                  selectedCollection === col.id
                    ? 'bg-black text-white font-medium shadow-2xs'
                    : 'glass-pill text-obsidian/70 hover:text-black font-normal'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Row 2: Price Presets & High-End Finishes */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[10px] uppercase tracking-[0.16em] text-obsidian/45 font-medium mr-1.5 shrink-0 flex items-center gap-1">
              <Tag className="w-3 h-3 text-black/70 stroke-[1.5]" /> Filtro:
            </span>

            {/* Presupuesto Chips */}
            {[
              { id: 'all', label: 'Todos los precios' },
              { id: 'under100', label: '< $100K' },
              { id: '100to500', label: '$100K - $500K' },
              { id: 'above500', label: '≥ $500K (Envío Gratis)' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPricePreset(p.id as any)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all shrink-0 tracking-wider ${
                  selectedPricePreset === p.id
                    ? 'bg-black text-white font-medium'
                    : 'glass-pill text-obsidian/65 hover:text-black font-normal'
                }`}
              >
                {p.label}
              </button>
            ))}

            {/* Acabados Chips */}
            {[
              { id: 'negro', label: 'Negro Mate' },
              { id: 'satinad', label: 'Níquel Satinado' },
              { id: 'cromo', label: 'Cromo' },
              { id: 'acero', label: 'Acero Inox' },
            ].map(fin => (
              <button
                key={fin.id}
                onClick={() => setSelectedFinish(prev => prev === fin.id ? 'all' : fin.id)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans transition-all shrink-0 tracking-wide ${
                  selectedFinish === fin.id
                    ? 'bg-black text-white font-medium'
                    : 'glass-pill text-obsidian/65 hover:text-black font-normal'
                }`}
              >
                {fin.label}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-0.5 text-[10px] text-obsidian/45 hover:text-black font-sans underline shrink-0 transition-colors ml-auto font-normal tracking-wide"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-white/40 backdrop-blur-sm">
          {/* When no query and no special filter is set: Show Curated Suggestions */}
          {!hasActiveFilters && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans uppercase font-medium tracking-[0.18em] text-obsidian/50 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black stroke-[1.5]" /> Referencias Recomendadas
                </span>
                <span className="text-[10px] font-mono text-obsidian/40 font-normal">112 Referencias Montezzi</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(sug.query);
                      if (sug.collection !== 'all') setSelectedCollection(sug.collection);
                    }}
                    className="px-3 py-1.5 glass-card rounded-lg text-xs text-obsidian/80 hover:text-black hover:border-black/20 transition-all flex items-center gap-1.5 font-sans font-normal tracking-wide"
                  >
                    <Zap className="w-3 h-3 text-black stroke-[1.5]" />
                    <span>{sug.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-obsidian/50 pb-1 font-sans">
            <span className="font-normal tracking-wide">
              Mostrando <span className="text-black font-mono font-medium">{filteredResults.length}</span> {filteredResults.length === 1 ? 'referencia' : 'referencias'}
            </span>
            {hasActiveFilters && (
              <span className="text-[10px] uppercase font-mono tracking-wider text-obsidian/40">Filtro activo</span>
            )}
          </div>

          {/* Product Rows */}
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 space-y-3 glass-card rounded-xl p-8 border border-white/80">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto text-obsidian/40">
                <Search className="w-5 h-5 stroke-[1.5]" />
              </div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-obsidian">No se encontraron referencias</p>
              <p className="font-serif italic text-xs text-obsidian/60 max-w-sm mx-auto">
                Ninguna referencia coincide con los filtros seleccionados. Modifica el término de búsqueda o restablece los filtros.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2 bg-black text-white text-xs uppercase tracking-[0.18em] font-medium rounded-xs hover:bg-black/85 transition-all shadow-2xs"
              >
                Restablecer Búsqueda
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredResults.slice(0, 15).map(product => {
                const isAdded = addedProductId === product.id;
                const isOver500k = product.price >= 500000;

                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.code)}
                    className="group p-3 rounded-xl glass-card flex items-center justify-between gap-3 cursor-pointer hover:border-black/25 transition-all border border-white/80"
                  >
                    {/* Left: Thumbnail and Details */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-white p-1 border border-black/[0.05] flex items-center justify-center shrink-0 shadow-2xs">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-medium tracking-wider text-black bg-black/[0.04] px-2 py-0.5 rounded border border-black/[0.06]">
                            {product.code}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-obsidian/45 font-sans font-normal truncate">
                            {product.category_name}
                          </span>
                          {isOver500k && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-sans font-medium uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full">
                              <Truck className="w-2.5 h-2.5" /> Envío Gratis
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-sans font-medium text-obsidian uppercase tracking-[0.12em] truncate group-hover:text-black transition-colors">
                          {product.name}
                        </h4>

                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="font-mono font-medium text-black">
                            ${product.price.toLocaleString('es-CO')} <span className="text-[9px] font-normal text-obsidian/45">COP</span>
                          </span>
                          {product.short_description && (
                            <span className="font-serif italic text-obsidian/55 text-[11px] hidden md:inline truncate max-w-xs">
                              · {product.short_description}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`p-2 rounded-full transition-all text-xs flex items-center justify-center ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'glass-button text-obsidian hover:text-white'
                        }`}
                        title="Añadir a la bolsa"
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5 stroke-[1.5]" /> : <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />}
                      </button>

                      <div className="p-1.5 text-obsidian/30 group-hover:text-black group-hover:translate-x-0.5 transition-all">
                        <ChevronRight className="w-4 h-4 stroke-[1.5]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Catalog Action and Shortcuts */}
        <div className="p-4 border-t border-black/[0.06] bg-white/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-serif italic text-obsidian/55 text-[11px]">
            Ingeniería de precisión y herrajes arquitectónicos de alta gama.
          </span>

          <button
            onClick={handleViewAllInCatalog}
            className="w-full sm:w-auto px-5 py-2.5 bg-black text-white font-sans font-medium text-xs uppercase tracking-[0.18em] hover:bg-black/85 transition-all flex items-center justify-center gap-2 rounded-xs shadow-md shrink-0"
          >
            <span>Ver en Catálogo ({filteredResults.length})</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

      </div>
    </div>
  );
};
