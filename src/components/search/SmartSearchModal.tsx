import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, Sparkles, SlidersHorizontal, Tag, Zap,
  ShoppingBag, Check, Truck, ChevronRight, ArrowRight, RotateCcw
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

  // Auto-focus when modal opens & handle ESC key
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const handleClose = () => {
    closeSearch();
  };

  // Sugerencias rápidas curadas en Español
  const quickSuggestions = [
    { label: 'KDJ-103 · Caja Fuerte & Relojes', query: 'KDJ-103', collection: 'closet' as MainCollection },
    { label: 'KDJ-90 · Canasta Eléctrica', query: 'KDJ-90', collection: 'cocina' as MainCollection },
    { label: 'KDJ-92 · Bandeja Joyero', query: 'KDJ-92', collection: 'closet' as MainCollection },
    { label: 'KDJ-69 · Alacena Madera & Acero', query: 'KDJ-69', collection: 'cocina' as MainCollection },
    { label: 'KDJ-74 · Esquina Mágica Vidrio', query: 'KDJ-74', collection: 'cocina' as MainCollection },
    { label: 'Cierre Suave', query: 'cierre suave', collection: 'all' as const },
    { label: 'Módulo 600mm', query: '600mm', collection: 'all' as const },
  ];

  // Lógica de filtrado inteligente
  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter(product => {
      // 1. Coincidencia de texto (Código, Nombre, Categoría, Descripción, Especificaciones)
      if (q) {
        const codeMatch = product.code.toLowerCase().includes(q);
        const nameMatch = product.name.toLowerCase().includes(q);
        const catMatch = (product.category_name || product.category || '').toLowerCase().includes(q);
        const descMatch = (product.short_description || '').toLowerCase().includes(q);
        const finishSpec = (product.technical_specs?.acabado || '').toLowerCase();
        const matSpec = (product.technical_specs?.material || '').toLowerCase();
        const modSpec = (product.technical_specs?.modulo || '').toLowerCase();
        const finishMatch = finishSpec.includes(q) || matSpec.includes(q) || modSpec.includes(q);

        if (!codeMatch && !nameMatch && !catMatch && !descMatch && !finishMatch) {
          return false;
        }
      }

      // 2. Filtro de Colección
      if (selectedCollection !== 'all' && product.main_collection !== selectedCollection) {
        return false;
      }

      // 3. Filtro de Rango de Precios (COP)
      if (selectedPricePreset === 'under100' && product.price > 100000) return false;
      if (selectedPricePreset === '100to500' && (product.price < 100000 || product.price > 500000)) return false;
      if (selectedPricePreset === 'above500' && product.price < 500000) return false;

      // 4. Filtro de Acabado
      if (selectedFinish !== 'all') {
        const finishText = (
          (product.technical_specs?.acabado || '') +
          ' ' +
          (product.technical_specs?.material || '') +
          ' ' +
          product.name
        ).toLowerCase();
        if (!finishText.includes(selectedFinish.toLowerCase())) return false;
      }

      // 5. Filtro de Mecanismo
      if (selectedMechanism !== 'all') {
        const fullTech =
          JSON.stringify(product.technical_specs || {}).toLowerCase() +
          ' ' +
          (product.short_description || '').toLowerCase();
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

  const handleSelectProduct = (product: Product) => {
    handleClose();
    navigate(`/producto/${product.id}`);
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

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCollection !== 'all' ||
    selectedPricePreset !== 'all' ||
    selectedFinish !== 'all' ||
    selectedMechanism !== 'all';

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 pt-10 sm:pt-16 font-sans antialiased">
      {/* Backdrop suave con desenfoque */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Contenedor Principal del Buscador (Mismo Sistema de Diseño UI/UX Renovado) */}
      <div className="relative w-full max-w-3xl bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.18)] border border-[#EAE7E1] overflow-hidden flex flex-col max-h-[86vh] transition-all">
        
        {/* ============================================================ */}
        {/* 1. BARRA SUPERIOR DE BÚSQUEDA (Pill Input Moderno)           */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#F0EFEA] flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 bg-[#F4F4F5] focus-within:bg-white border border-transparent focus-within:border-black/20 rounded-full px-4 py-2.5 transition-all">
            <div className="w-7 h-7 rounded-full bg-[#18181B] flex items-center justify-center text-white shrink-0">
              <Search className="w-3.5 h-3.5" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por código KDJ, producto, acabado o medida de módulo..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none font-sans font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#A1A1AA] hover:text-[#18181B] transition-colors rounded-full hover:bg-[#EAEAEA]"
                title="Limpiar texto"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="px-3.5 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#71717A] hover:text-[#18181B] rounded-full transition-colors flex items-center gap-1.5 font-sans font-semibold text-xs shrink-0"
            title="Cerrar buscador (ESC)"
          >
            <span>Cerrar</span>
            <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded-md border border-black/10 text-[#18181B]">
              ESC
            </span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* 2. FILTROS RÁPIDOS (Pills sin barras de scroll invasivas)    */}
        {/* ============================================================ */}
        <div className="px-5 py-3.5 bg-[#FAF9F7] border-b border-[#EAE7E1] space-y-2.5">
          {/* Fila 1: Colección */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-[#71717A] font-semibold mr-1 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#18181B]" />
              <span>Colección:</span>
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
                className={`px-3.5 py-1 rounded-full text-xs font-sans transition-all ${
                  selectedCollection === col.id
                    ? 'bg-[#18181B] text-white font-semibold shadow-2xs'
                    : 'bg-white border border-[#EAE7E1] text-[#52525B] hover:text-[#18181B] hover:border-black/20 font-medium'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Fila 2: Rango de Precios COP & Acabados */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-[#71717A] font-semibold mr-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#18181B]" />
              <span>Filtro COP:</span>
            </span>

            {/* Presupuesto en Pesos Colombianos */}
            {[
              { id: 'all', label: 'Todos los precios' },
              { id: 'under100', label: 'Menos de $100.000' },
              { id: '100to500', label: '$100.000 – $500.000' },
              { id: 'above500', label: 'Más de $500.000 (Envío Gratis)' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPricePreset(p.id as any)}
                className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                  selectedPricePreset === p.id
                    ? 'bg-[#18181B] text-white font-semibold shadow-2xs'
                    : 'bg-white border border-[#EAE7E1] text-[#52525B] hover:text-[#18181B] hover:border-black/20 font-medium'
                }`}
              >
                {p.label}
              </button>
            ))}

            {/* Acabados Chips */}
            {[
              { id: 'grafito', label: 'Gris Grafito' },
              { id: 'cuero', label: 'Cuero' },
              { id: 'madera', label: 'Madera' },
              { id: 'acero', label: 'Acero Inox' },
            ].map(fin => (
              <button
                key={fin.id}
                onClick={() => setSelectedFinish(prev => prev === fin.id ? 'all' : fin.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                  selectedFinish === fin.id
                    ? 'bg-[#FFF6E9] text-[#B45309] border border-[#FDE6C8] font-semibold'
                    : 'bg-white border border-[#EAE7E1] text-[#52525B] hover:text-[#18181B] hover:border-black/20 font-medium'
                }`}
              >
                {fin.label}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-1 rounded-full bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEE2E2] text-[11px] font-semibold flex items-center gap-1 transition-colors ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. ÁREA DE RESULTADOS Y SUGERENCIAS                          */}
        {/* ============================================================ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-white">
          {/* Sugerencias rápidas cuando no hay filtros activos */}
          {!hasActiveFilters && (
            <div className="bg-[#FAF9F7] border border-[#EAE7E1] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold text-[#18181B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Referencias Recomendadas</span>
                </span>
                <span className="text-[11px] font-semibold text-[#71717A] bg-white px-2.5 py-0.5 rounded-full border border-[#EAE7E1]">
                  {products.length} Referencias Oficiales
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(sug.query);
                      if (sug.collection !== 'all') setSelectedCollection(sug.collection);
                    }}
                    className="px-3 py-1.5 bg-white border border-[#EAE7E1] hover:border-[#18181B] rounded-full text-xs text-[#18181B] transition-all flex items-center gap-1.5 font-sans font-medium shadow-2xs"
                  >
                    <Zap className="w-3 h-3 text-[#D97706]" />
                    <span>{sug.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cabecera de Conteo de Resultados */}
          <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
            <span>
              Mostrando <strong className="text-[#18181B] font-bold">{filteredResults.length}</strong>{' '}
              {filteredResults.length === 1 ? 'referencia disponible' : 'referencias disponibles'}
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] font-semibold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded-full">
                Filtro activo
              </span>
            )}
          </div>

          {/* Lista de Productos con Miniatura de Foto, Tipografía Limpia y Precios en COP */}
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-[#FAF9F7] rounded-2xl p-8 border border-[#EAE7E1]">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EAE7E1] flex items-center justify-center mx-auto text-[#71717A]">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-sans text-sm font-bold text-[#18181B] normal-case">
                No se encontraron referencias
              </h4>
              <p className="font-sans text-xs text-[#71717A] max-w-sm mx-auto">
                Ningún producto coincide con los filtros seleccionados. Intenta con otro código KDJ o restablece la búsqueda.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#18181B] text-white text-xs font-semibold rounded-full hover:bg-black transition-all shadow-sm"
              >
                Restablecer Búsqueda
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredResults.slice(0, 20).map(product => {
                const isAdded = addedProductId === product.id;
                const isOver500k = product.price >= 500000;
                const totalStock =
                  (product.warehouse_stock ?? 0) +
                  (product.store_stock ?? 0) +
                  (product.web_stock ?? 0) ||
                  product.stock ||
                  0;

                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="group p-3.5 rounded-2xl bg-white hover:bg-[#FAF9F7] border border-[#EAE7E1] hover:border-black/25 flex items-center justify-between gap-3.5 cursor-pointer transition-all shadow-[0_2px_10px_rgba(0,0,0,0.015)]"
                  >
                    {/* Izquierda: Foto del Producto + Información */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-[#FAF9F7] p-1.5 border border-[#EAE7E1] flex items-center justify-center shrink-0 overflow-hidden group-hover:border-black/20 transition-colors">
                        <img
                          src={product.image_url || '/images/products/kdj-60.jpg'}
                          alt={product.name}
                          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold text-[#18181B] bg-[#F4F4F5] px-2.5 py-0.5 rounded-lg border border-black/[0.04]">
                            {product.code}
                          </span>
                          <span className="text-[11px] text-[#71717A] font-sans font-medium truncate">
                            {product.category_name || product.category}
                          </span>
                          {product.technical_specs?.modulo && (
                            <span className="text-[10px] font-mono text-[#52525B] bg-[#F4F4F5] px-2 py-0.5 rounded-md">
                              Mód. {product.technical_specs.modulo}
                            </span>
                          )}
                          {isOver500k && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-sans font-semibold bg-[#ECFDF5] text-[#10B981] px-2.5 py-0.5 rounded-full">
                              <Truck className="w-3 h-3" /> Envío Gratis
                            </span>
                          )}
                        </div>

                        {/* Nombre del producto en Sans-Serif limpia (sin mayúsculas forzadas) */}
                        <h4 className="text-sm font-sans font-semibold text-[#18181B] normal-case tracking-normal truncate group-hover:text-black transition-colors">
                          {product.name}
                        </h4>

                        {/* Precio en Pesos Colombianos + Descripción corta */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-sans font-bold text-[#18181B]">
                            ${product.price.toLocaleString('es-CO')}{' '}
                            <span className="text-[10px] font-normal text-[#71717A]">COP</span>
                          </span>
                          <span className="text-[#D4D4D8]">•</span>
                          <span className="text-[11px] font-medium text-[#10B981]">
                            {totalStock} disp.
                          </span>
                          {product.short_description && (
                            <span className="font-sans text-[#71717A] text-[11px] hidden md:inline truncate max-w-xs">
                              · {product.short_description}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Derecha: Botón Añadir al Carrito + Flecha */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`h-9 px-3.5 rounded-full transition-all text-xs font-semibold flex items-center justify-center gap-1.5 ${
                          isAdded
                            ? 'bg-[#10B981] text-white shadow-xs'
                            : 'bg-[#F4F4F5] text-[#18181B] hover:bg-[#18181B] hover:text-white'
                        }`}
                        title="Añadir al carrito"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Agregado</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Agregar</span>
                          </>
                        )}
                      </button>

                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A1AA] group-hover:text-[#18181B] group-hover:bg-[#F4F4F5] transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* 4. PIE DEL MODAL CON ACCIÓN AL CATÁLOGO                      */}
        {/* ============================================================ */}
        <div className="px-5 py-4 border-t border-[#F0EFEA] bg-[#FAF9F7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-sans text-[#71717A] text-xs">
            Colección Oficial Montezzi 2026 · Herrajes arquitectónicos para cocina y vestidor
          </span>

          <button
            onClick={handleViewAllInCatalog}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#18181B] text-white font-sans font-semibold text-xs hover:bg-black transition-all flex items-center justify-center gap-2 rounded-full shadow-md shrink-0 active:scale-[0.98]"
          >
            <span>Ver en Catálogo ({filteredResults.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
