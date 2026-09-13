import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/database';
import { ProductFormModal } from './ProductFormModal';
import {
  Search, AlertTriangle, Edit2, Plus, Check, Filter, Layers,
  ExternalLink, Trash2, ArrowUpDown
} from 'lucide-react';

export const InventoryManagement: React.FC = () => {
  const {
    products,
    categories,
    updateProductStock,
    updateProductPrice,
    deleteProduct
  } = useProducts();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local inline editing states for instant feedback
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleStockChange = async (p: Product, newStock: number) => {
    setSavingId(p.id);
    await updateProductStock(p.id, newStock);
    setTimeout(() => setSavingId(null), 800);
  };

  const handlePriceChange = async (p: Product, newPrice: number) => {
    setSavingId(p.id);
    await updateProductPrice(p.id, newPrice);
    setTimeout(() => setSavingId(null), 800);
  };

  const handleDelete = async (id: string, code: string) => {
    if (confirm(`¿Estás seguro de eliminar la referencia ${code}?`)) {
      await deleteProduct(id);
    }
  };

  const filtered = products.filter(p => {
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchCode = p.code.toLowerCase().includes(q);
      const matchName = p.name.toLowerCase().includes(q);
      if (!matchCode && !matchName) return false;
    }

    if (selectedCat !== 'all' && p.category_id !== selectedCat) {
      return false;
    }

    if (onlyLowStock) {
      const alertThresh = p.min_stock_alert ?? 8;
      if (p.stock > alertThresh) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-[#E2DDD4] rounded-sm shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          {/* Search by KDJ */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-montezzigold absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por código KDJ o nombre..."
              className="w-full bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs pl-9 pr-3 py-2 focus:outline-none focus:border-montezzigold rounded-xs"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs px-3 py-2 focus:outline-none focus:border-montezzigold rounded-xs"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Low Stock Toggle */}
          <button
            type="button"
            onClick={() => setOnlyLowStock(prev => !prev)}
            className={`px-3 py-2 rounded-xs text-xs font-sans flex items-center gap-1.5 transition-colors ${
              onlyLowStock
                ? 'bg-amber-100 border border-amber-300 text-amber-800 font-semibold'
                : 'bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian/70 hover:text-obsidian'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Stock Crítico (&lt;8)</span>
          </button>
        </div>

        {/* Add Product CTA */}
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/85 transition-all flex items-center justify-center gap-2 rounded-xs shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Referencia</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="glass-card rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-black/[0.03] border-b border-black/[0.08] text-black uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="p-3.5">Código</th>
                <th className="p-3.5">Producto & Categoría</th>
                <th className="p-3.5">Colección</th>
                <th className="p-3.5">Precio (COP)</th>
                <th className="p-3.5">Stock Físico</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] text-obsidian">
              {filtered.map(product => {
                const isLow = product.stock <= (product.min_stock_alert ?? 8) && product.stock > 0;
                const isOut = product.stock === 0;

                return (
                  <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                    {/* Code */}
                    <td className="p-3.5 font-mono text-montezzigold font-bold whitespace-nowrap">
                      {product.code}
                    </td>

                    {/* Name & Cat */}
                    <td className="p-3.5 max-w-xs">
                      <div className="font-serif text-sm text-obsidian font-medium truncate" title={product.name}>
                        {product.name}
                      </div>
                      <div className="text-[10px] text-obsidian/50 truncate">
                        {product.category_name}
                      </div>
                    </td>

                    {/* Collection */}
                    <td className="p-3.5 capitalize text-obsidian/70 whitespace-nowrap">
                      {product.main_collection.replace('_', ' ')}
                    </td>

                    {/* Price with Inline Edit */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-montezzigold font-mono font-bold">$</span>
                        <input
                          type="number"
                          step={1000}
                          defaultValue={product.price}
                          onBlur={e => {
                            const val = Number(e.target.value);
                            if (val !== product.price) handlePriceChange(product, val);
                          }}
                          className="w-28 bg-[#FAF8F5] border border-[#DDD6C8] px-2 py-1 font-mono text-xs text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                        />
                      </div>
                    </td>

                    {/* Stock with Inline Edit */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          defaultValue={product.stock}
                          onBlur={e => {
                            const val = Number(e.target.value);
                            if (val !== product.stock) handleStockChange(product, val);
                          }}
                          className={`w-16 bg-[#FAF8F5] border px-2 py-1 font-mono text-xs focus:border-montezzigold focus:outline-none rounded-xs ${
                            isLow ? 'border-amber-400 text-amber-700 bg-amber-50' : isOut ? 'border-red-400 text-red-700 bg-red-50' : 'border-[#DDD6C8] text-obsidian'
                          }`}
                        />
                        {savingId === product.id && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        )}
                      </div>
                    </td>

                    {/* Stock Status Badge */}
                    <td className="p-3.5 whitespace-nowrap">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded-xs bg-red-50 border border-red-200 text-red-700 text-[10px] uppercase font-bold">
                          Agotado
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-xs bg-amber-50 border border-amber-200 text-amber-800 text-[10px] uppercase font-bold">
                          Crítico ({product.stock})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-xs bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] uppercase font-medium">
                          Disponible
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 text-obsidian/60 hover:text-montezzigold hover:bg-[#FAF8F5] rounded transition-colors"
                        title="Editar referencia técnica"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={`/producto/${product.code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-obsidian/60 hover:text-montezzigold hover:bg-[#FAF8F5] rounded transition-colors inline-block"
                        title="Ver en showroom digital"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(product.id, product.code)}
                        className="p-1.5 text-obsidian/40 hover:text-red-500 hover:bg-[#FAF8F5] rounded transition-colors"
                        title="Eliminar referencia"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#FAF8F5] border-t border-[#E2DDD4] text-xs text-obsidian/60 flex items-center justify-between">
          <span>Mostrando {filtered.length} de {products.length} referencias de catálogo</span>
          <span className="font-mono text-[11px] text-montezzigold font-medium">Los cambios de stock y precio se guardan automáticamente al salir de la celda</span>
        </div>
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
};
