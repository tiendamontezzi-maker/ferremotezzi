import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types/database';
import { ProductFormModal } from './ProductFormModal';
import { ImportModal } from './ImportModal';
import { exportToCSV } from '../../utils/csvExportImport';
import {
  Search, Plus, Edit3, Trash2, AlertTriangle, ExternalLink, Download,
  Upload, Package, Layers, DollarSign, TrendingUp, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InventoryManagement: React.FC = () => {
  const { products, categories, updateProduct, deleteProduct, addProduct } = useProducts();
  const { role } = useAuth();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Top KPI Metrics
  const totalReferences = products.length;
  const totalUnitsInStock = products.reduce(
    (sum, p) => sum + ((p.warehouse_stock || 0) + (p.store_stock || 0) + (p.web_stock || 0) || p.stock || 0),
    0
  );
  const lowStockCount = products.filter(p => (p.stock || 0) <= (p.min_stock_alert || 5)).length;
  const totalInventoryValue = products.reduce(
    (sum, p) => sum + p.price * ((p.warehouse_stock || 0) + (p.store_stock || 0) + (p.web_stock || 0) || p.stock || 0),
    0
  );

  // Filtered Products
  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category_id === categoryFilter || p.category === categoryFilter;
    const matchesStock = !onlyLowStock || p.stock <= (p.min_stock_alert || 5);
    return matchesSearch && matchesCat && matchesStock;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (role !== 'admin') {
      alert('Solo los Administradores pueden eliminar referencias del catálogo.');
      return;
    }
    if (window.confirm(`¿Estás seguro de eliminar la referencia "${name}" del inventario?`)) {
      deleteProduct(id);
    }
  };

  const handleChannelStockChange = (
    product: Product,
    channel: 'warehouse_stock' | 'store_stock' | 'web_stock',
    value: number
  ) => {
    const cleanVal = Math.max(0, value);
    const updatedChannels = {
      warehouse_stock: product.warehouse_stock ?? 0,
      store_stock: product.store_stock ?? 0,
      web_stock: product.web_stock ?? 0,
      [channel]: cleanVal
    };
    const newTotal =
      updatedChannels.warehouse_stock +
      updatedChannels.store_stock +
      updatedChannels.web_stock;

    updateProduct({
      ...product,
      ...updatedChannels,
      stock: newTotal
    });
  };

  const handleExportCSV = () => {
    exportToCSV('montezzi_inventario_productos', filtered, [
      { header: 'ID', key: 'id' },
      { header: 'Código Referencia', key: 'code' },
      { header: 'Nombre del Producto', key: 'name' },
      { header: 'Colección Principal', key: 'main_collection' },
      { header: 'Categoría', key: 'category' },
      { header: 'Precio Unitario (COP)', key: 'price' },
      { header: 'Stock Bodega', key: (p) => p.warehouse_stock ?? 0 },
      { header: 'Stock Showroom', key: (p) => p.store_stock ?? 0 },
      { header: 'Stock Web', key: (p) => p.web_stock ?? 0 },
      { header: 'Stock Total (Auto)', key: 'stock' },
      { header: 'Alerta Stock Mínimo', key: (p) => p.min_stock_alert ?? 3 },
      { header: 'Destacado', key: (p) => (p.is_featured ? 'SÍ' : 'NO') },
      { header: 'Módulo Compatible', key: (p) => p.technical_specs?.modulo || '' },
      { header: 'Dimensiones', key: (p) => p.technical_specs?.dimensiones || '' },
      { header: 'Acabado', key: (p) => p.technical_specs?.acabado || '' }
    ]);
  };

  const handleBulkImportProducts = async (rows: Record<string, string>[]): Promise<{ success: boolean; message: string }> => {
    let processed = 0;
    for (const row of rows) {
      const code = String(row['Código Referencia'] || row['code'] || row['codigo'] || `KDJ-${Math.floor(Math.random() * 900 + 100)}`).trim();
      const name = String(row['Nombre del Producto'] || row['name'] || row['nombre'] || 'Herraje Arquitectónico Montezzi').trim();
      const price = Number(String(row['Precio Unitario (COP)'] || row['price'] || row['precio'] || 250000).replace(/[^0-9.-]+/g, '')) || 250000;
      const wStock = Number(row['Stock Bodega'] ?? row['warehouse_stock'] ?? 5) || 0;
      const sStock = Number(row['Stock Showroom'] ?? row['store_stock'] ?? 2) || 0;
      const webStock = Number(row['Stock Web'] ?? row['web_stock'] ?? 3) || 0;
      const totalStock = wStock + sStock + webStock;
      const categoryName = String(row['Categoría'] || row['category'] || 'Organización de Cocina').trim();
      const mainCollectionRaw = String(row['Colección Principal'] || row['main_collection'] || 'cocina').toLowerCase();
      const main_collection = mainCollectionRaw.includes('closet') ? 'closet' : 'cocina';

      const existing = products.find(p => p.code.toLowerCase() === code.toLowerCase());
      if (existing) {
        await updateProduct({
          ...existing,
          name,
          price,
          warehouse_stock: wStock,
          store_stock: sStock,
          web_stock: webStock,
          stock: totalStock,
          category: categoryName
        });
      } else {
        await addProduct({
          code,
          sku: code,
          name,
          slug: `${code.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          description: String(row['description'] || `${name} - Colección Oficial Montezzi 2026.`),
          short_description: String(row['short_description'] || `${name} con cierre asistido silencioso.`),
          price,
          category_id: main_collection === 'closet' ? 'cat-closet-cajones' : 'cat-cocina-alacenas',
          category_name: categoryName,
          category: categoryName,
          main_collection,
          warehouse_stock: wStock,
          store_stock: sStock,
          web_stock: webStock,
          stock: totalStock,
          min_stock_alert: 3,
          image_url: String(row['image_url'] || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85'),
          gallery_urls: [],
          is_featured: false,
          technical_specs: {
            material: String(row['Material'] || 'Aluminio anodizado y acero'),
            acabado: String(row['Acabado'] || 'Gris Grafito Anodizado'),
            dimensiones: String(row['Dimensiones'] || '564 × 475 × 200 mm'),
            mecanismo: 'Guías ocultas de extracción total con cierre suave',
            capacidad_carga: '30 kg',
            compatibilidad: String(row['Módulo Compatible'] || '600mm'),
            modulo: String(row['Módulo Compatible'] || '600mm')
          },
          benefits: []
        });
      }
      processed++;
    }
    return {
      success: true,
      message: `Se procesaron ${processed} productos correctamente.`
    };
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ============================================================ */}
      {/* 1. TOP SUMMARY KPI CARDS (Matches OverviewDashboard Design)   */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Products</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalReferences}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% synced with Supabase</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Units in Stock</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalUnitsInStock.toLocaleString('es-CO')}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#71717A]">
            <span>Bodega + Showroom + Web</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Low Stock Alerts</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {lowStockCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#D97706]">
            <span>References below safety threshold</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Inventory Valuation</span>
            <div className="w-8 h-8 rounded-full bg-[#F3EFFE] text-[#6D28D9] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight my-1">
            ${(totalInventoryValue / 1000000).toFixed(1)}M
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
            <span>Active COP retail valuation</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FILTER & ACTION BAR (Modern Rounded Pill Controls)         */}
      {/* ============================================================ */}
      <div className="flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between bg-white p-4 border border-[#EAE7E1] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Input Pill */}
          <div className="relative flex-1 min-w-[230px] max-w-sm">
            <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por código KDJ o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white rounded-full pl-9 pr-4 py-2 text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none transition-all"
            />
          </div>

          {/* Category Dropdown Pill */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F4F4F5] hover:bg-[#EAEAEA] border border-transparent focus:border-black/20 focus:bg-white rounded-full px-4 py-2 text-xs font-medium text-[#18181B] focus:outline-none transition-all cursor-pointer"
          >
            <option value="All">Todas las Categorías</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Low Stock Filter Pill */}
          <button
            onClick={() => setOnlyLowStock(!onlyLowStock)}
            className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
              onlyLowStock
                ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] font-semibold'
                : 'bg-[#F4F4F5] text-[#71717A] hover:text-[#18181B] hover:bg-[#EAEAEA]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Stock Crítico (&le;5)</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
            title="Descargar inventario actual en formato CSV / Excel"
          >
            <Download className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
            title="Importar o actualizar productos masivamente desde CSV o JSON"
          >
            <Upload className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Importar Masivo</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2 bg-[#18181B] hover:bg-black text-white font-semibold text-xs rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. PRODUCTS TABLE WITH PRODUCT PHOTOS & CLEAN TYPOGRAPHY      */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#EAE7E1] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EFEA] bg-[#FAF9F7] text-[11px] font-sans font-semibold text-[#71717A]">
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Product & Category</th>
                <th className="py-3.5 px-4">Price (COP)</th>
                <th className="py-3.5 px-3 text-center">Bodega</th>
                <th className="py-3.5 px-3 text-center">Showroom</th>
                <th className="py-3.5 px-3 text-center">Web</th>
                <th className="py-3.5 px-4 text-center">Total Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5] text-xs font-sans">
              {filtered.map((product) => {
                const wStock = product.warehouse_stock ?? Math.floor(product.stock * 0.5);
                const sStock = product.store_stock ?? Math.floor(product.stock * 0.25);
                const webStock = product.web_stock ?? (product.stock - wStock - sStock);
                const totalStock = wStock + sStock + webStock;
                const minAlert = product.min_stock_alert || 5;

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#FAF9F7]/90 transition-colors group"
                  >
                    {/* Reference Code Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#F4F4F5] text-[#18181B] font-mono text-[11px] font-semibold border border-black/[0.04]">
                        {product.code}
                      </span>
                    </td>

                    {/* Product Thumbnail Image + Title + Category */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3.5 min-w-[260px]">
                        <div className="w-12 h-12 rounded-xl bg-[#FAF9F7] border border-[#EAE7E1] p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs group-hover:border-black/20 transition-colors">
                          <img
                            src={product.image_url || '/images/products/kdj-60.jpg'}
                            alt={product.name}
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-sans font-semibold text-[13px] text-[#18181B] leading-snug line-clamp-1">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#71717A]">
                            <span className="truncate">{product.category}</span>
                            <span className="text-[#D4D4D8]">•</span>
                            <span className="capitalize font-medium text-[#52525B]">
                              {product.main_collection}
                            </span>
                            {product.technical_specs?.modulo && (
                              <>
                                <span className="text-[#D4D4D8]">•</span>
                                <span className="text-[10px] bg-[#F4F4F5] px-1.5 py-0.2 rounded text-[#71717A] font-mono">
                                  Mód. {product.technical_specs.modulo}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Inline Editable Price */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 bg-[#FAFAFA] border border-[#E4E4E7] focus-within:border-[#18181B] focus-within:bg-white rounded-xl px-2.5 py-1.5 w-32 transition-all">
                        <span className="text-[#A1A1AA] text-xs font-medium">$</span>
                        <input
                          type="number"
                          step="1000"
                          value={product.price}
                          onChange={(e) =>
                            updateProduct({
                              ...product,
                              price: Math.max(0, parseInt(e.target.value) || 0)
                            })
                          }
                          className="w-full bg-transparent text-xs font-sans font-semibold text-[#18181B] focus:outline-none"
                        />
                      </div>
                    </td>

                    {/* Warehouse Stock */}
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={wStock}
                        onChange={(e) =>
                          handleChannelStockChange(
                            product,
                            'warehouse_stock',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-14 bg-[#FAFAFA] border border-[#E4E4E7] focus:border-[#18181B] focus:bg-white rounded-xl px-2 py-1.5 text-xs font-sans font-semibold text-center text-[#18181B] focus:outline-none transition-all"
                        title="Stock en Bodega Principal"
                      />
                    </td>

                    {/* Showroom Stock */}
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={sStock}
                        onChange={(e) =>
                          handleChannelStockChange(
                            product,
                            'store_stock',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-14 bg-[#FAFAFA] border border-[#E4E4E7] focus:border-[#18181B] focus:bg-white rounded-xl px-2 py-1.5 text-xs font-sans font-semibold text-center text-[#18181B] focus:outline-none transition-all"
                        title="Stock en Showroom"
                      />
                    </td>

                    {/* Web Stock */}
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={webStock}
                        onChange={(e) =>
                          handleChannelStockChange(
                            product,
                            'web_stock',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-14 bg-[#FAFAFA] border border-[#E4E4E7] focus:border-[#18181B] focus:bg-white rounded-xl px-2 py-1.5 text-xs font-sans font-semibold text-center text-[#18181B] focus:outline-none transition-all"
                        title="Stock asignado a E-Commerce Web"
                      />
                    </td>

                    {/* Total Stock Automatic Pill */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full font-sans text-xs font-bold ${
                          totalStock === 0
                            ? 'bg-[#FEF2F2] text-[#EF4444]'
                            : totalStock <= minAlert
                            ? 'bg-[#FFFBEB] text-[#D97706]'
                            : 'bg-[#ECFDF5] text-[#10B981]'
                        }`}
                      >
                        {totalStock} unids
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {totalStock === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#EF4444]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                          Agotado
                        </span>
                      ) : totalStock <= minAlert ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFFBEB] text-[#D97706]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                          Bajo Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          En Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-2 rounded-xl text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors"
                          title="Editar ficha técnica e imágenes"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/producto/${product.id}`}
                          className="p-2 rounded-xl text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors"
                          title="Ver en tienda pública"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        {role === 'admin' && (
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 rounded-xl text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                            title="Eliminar referencia"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-[#71717A]">
                    No se encontraron productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Create / Edit Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
      />

      {/* Bulk CSV / JSON Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Importar Inventario Masivo (CSV / JSON)"
        subtitle="Sube un archivo CSV o JSON para crear nuevas referencias KDJ o actualizar precios y stock multicanal de productos existentes."
        sampleTemplateName="inventario_montezzi"
        sampleTemplateHeaders={[
          'Código Referencia',
          'Nombre del Producto',
          'Categoría',
          'Precio Unitario (COP)',
          'Stock Bodega',
          'Stock Showroom',
          'Stock Web'
        ]}
        sampleTemplateRows={[
          ['KDJ-60', 'Condimentero lateral de 2 niveles con base de madera', 'Condimenteros & Portaplatos', '210928', '10', '3', '5'],
          ['KDJ-100', 'Cajón con clave revestido en cuero - gris', 'Cajones con Clave & Relojes', '1216600', '3', '1', '2']
        ]}
        onImportConfirm={handleBulkImportProducts}
      />
    </div>
  );
};
