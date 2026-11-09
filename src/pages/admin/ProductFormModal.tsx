import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertCircle } from 'lucide-react';
import { Product, MainCollection } from '../../types/database';
import { useProducts } from '../../context/ProductContext';
import { ImageUploadDropzone } from '../../components/ui/ImageUploadDropzone';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { categories, addProduct, updateProduct } = useProducts();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mainCollection, setMainCollection] = useState<MainCollection>('cocina');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState<number>(150000);
  const [warehouseStock, setWarehouseStock] = useState<number>(15);
  const [storeStock, setStoreStock] = useState<number>(5);
  const [webStock, setWebStock] = useState<number>(5);
  const totalCalculatedStock = Math.max(0, warehouseStock) + Math.max(0, storeStock) + Math.max(0, webStock);
  const [minStockAlert, setMinStockAlert] = useState<number>(8);
  const [imageUrl, setImageUrl] = useState('');
  const [material, setMaterial] = useState('Acero Inoxidable Quirúrgico AISI 304');
  const [acabado, setAcabado] = useState('Negro Mate Texturizado Soft-Touch');
  const [dimensiones, setDimensiones] = useState('564 x 480 x 550 mm');
  const [mecanismo, setMecanismo] = useState('Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)');
  const [capacidadCarga, setCapacidadCarga] = useState('35 kg');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setCode(productToEdit.code);
      setName(productToEdit.name);
      setCategoryId(productToEdit.category_id);
      setMainCollection(productToEdit.main_collection);
      setShortDescription(productToEdit.short_description);
      setPrice(productToEdit.price);
      setWarehouseStock(productToEdit.warehouse_stock ?? Math.floor(productToEdit.stock * 0.6));
      setStoreStock(productToEdit.store_stock ?? Math.floor(productToEdit.stock * 0.2));
      setWebStock(productToEdit.web_stock ?? (productToEdit.stock - Math.floor(productToEdit.stock * 0.6) - Math.floor(productToEdit.stock * 0.2)));
      setMinStockAlert(productToEdit.min_stock_alert ?? 8);
      setImageUrl(productToEdit.image_url);
      setMaterial(productToEdit.technical_specs.material || '');
      setAcabado(productToEdit.technical_specs.acabado || '');
      setDimensiones(productToEdit.technical_specs.dimensiones || '');
      setMecanismo(productToEdit.technical_specs.mecanismo || '');
      setCapacidadCarga(productToEdit.technical_specs.capacidad_carga || '');
      setIsFeatured(productToEdit.is_featured);
    } else {
      // Default new product values
      setCode('KDJ-113');
      setName('');
      setCategoryId(categories[0]?.id || 'cat-1');
      setMainCollection('cocina');
      setShortDescription('');
      setPrice(180000);
      setWarehouseStock(15);
      setStoreStock(5);
      setWebStock(5);
      setMinStockAlert(8);
      setImageUrl('/images/products/kdj-60.jpg');
      setMaterial('Acero Inoxidable Quirúrgico AISI 304');
      setAcabado('Negro Mate Texturizado Soft-Touch');
      setDimensiones('564 x 480 x 550 mm');
      setMecanismo('Pistón hidráulico de cierre suave');
      setCapacidadCarga('30 kg');
      setIsFeatured(false);
    }
  }, [productToEdit, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const selectedCategory = categories.find(c => c.id === categoryId);
    const finalStock = Number(totalCalculatedStock);
    const status: 'in_stock' | 'low_stock' | 'out_of_stock' = 
      finalStock <= 0 ? 'out_of_stock' : finalStock < (minStockAlert || 5) ? 'low_stock' : 'in_stock';

    const productPayload = {
      code,
      name,
      category_id: categoryId,
      category_name: selectedCategory ? selectedCategory.name : 'General',
      main_collection: mainCollection,
      short_description: shortDescription,
      technical_specs: {
        material,
        acabado,
        dimensiones,
        mecanismo,
        capacidad_carga: capacidadCarga,
        compatibilidad: 'Apta para tableros y gabinetes estándar del mercado.'
      },
      benefits: [
        { label: 'MATERIAL', value: material.split(' ')[0] },
        { label: 'CIERRE', value: 'Soft-Close Pro' },
        { label: 'CARGA', value: capacidadCarga },
        { label: 'DURABILIDAD', value: '50.000 Ciclos' },
        { label: 'ACCESO', value: 'Extracción Total' }
      ],
      price: Number(price),
      stock: finalStock,
      warehouse_stock: Number(warehouseStock),
      store_stock: Number(storeStock),
      web_stock: Number(webStock),
      inventory_status: status,
      min_stock_alert: Number(minStockAlert),
      image_url: imageUrl,
      gallery_urls: [imageUrl],
      is_featured: isFeatured
    };

    try {
      if (productToEdit) {
        await updateProduct({ ...productPayload, id: productToEdit.id, created_at: productToEdit.created_at });
      } else {
        await addProduct(productPayload);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error al guardar el producto');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white border border-[#EAE7E1] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#FAF9F7] border-b border-[#F0EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-sans font-bold text-[#18181B]">
              {productToEdit ? `Editar ${productToEdit.code} · ${productToEdit.name}` : 'Nueva Referencia Oficial Montezzi'}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#EAEAEA] text-[#71717A] hover:text-black transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs font-sans">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#52525B] font-semibold">Código KDJ *</label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="KDJ-113"
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] font-mono font-bold focus:outline-none rounded-xl transition-all"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[#52525B] font-semibold">Nombre Comercial *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Despensa extraíble de 6 niveles en vidrio ahumado"
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#52525B] font-semibold">Colección Principal *</label>
              <select
                value={mainCollection}
                onChange={e => setMainCollection(e.target.value as MainCollection)}
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
              >
                <option value="cocina">Cocina</option>
                <option value="closet">Clóset</option>
                <option value="herrajes_especiales">Herrajes Especiales</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[#52525B] font-semibold">Categoría *</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-[#52525B] font-semibold">Descripción Corta *</label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
                placeholder="Descripción concisa y técnica conforme al manual de redacción Montezzi..."
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white p-3.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
              />
            </div>
          </div>

          {/* Price & Multichannel Reactive Inventory */}
          <div className="p-4 bg-[#FAF9F7] border border-[#EAE7E1] rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Inventario Multicanal Reactivo (Supabase / Postgres Trigger)
              </span>
              <span className="text-[11px] text-[#71717A] font-mono">
                Regla: stock = Bodega + Showroom + Web
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-[#71717A] font-semibold">Precio COP *</label>
                <input
                  type="number"
                  required
                  min={0}
                  step={1000}
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] px-3 py-2 font-sans text-[#18181B] font-bold focus:border-black focus:outline-none rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#71717A] font-semibold">Bodega Principal *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={warehouseStock}
                  onChange={e => setWarehouseStock(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] px-3 py-2 font-sans text-[#18181B] focus:border-black focus:outline-none rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#71717A] font-semibold">Tienda Showroom *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={storeStock}
                  onChange={e => setStoreStock(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] px-3 py-2 font-sans text-[#18181B] focus:border-black focus:outline-none rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#71717A] font-semibold">Canal Web *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={webStock}
                  onChange={e => setWebStock(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] px-3 py-2 font-sans text-[#18181B] focus:border-black focus:outline-none rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#71717A] font-semibold">Stock Total (Auto)</label>
                <div className="w-full bg-[#F4F4F5] border border-[#E4E4E7] px-3 py-2 font-sans text-xs font-bold text-[#18181B] flex items-center justify-between rounded-xl">
                  <span>{totalCalculatedStock} unids</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    totalCalculatedStock <= 0 ? 'bg-[#FEF2F2] text-[#EF4444]' : totalCalculatedStock < minStockAlert ? 'bg-[#FFFBEB] text-[#D97706]' : 'bg-[#ECFDF5] text-[#10B981]'
                  }`}>
                    {totalCalculatedStock <= 0 ? 'Agotado' : totalCalculatedStock < minStockAlert ? 'Bajo' : 'Óptimo'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] text-[#71717A] font-semibold">Umbral Alerta Stock Crítico (&lt; unids)</label>
                <input
                  type="number"
                  min={1}
                  value={minStockAlert}
                  onChange={e => setMinStockAlert(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] px-3 py-2 font-sans text-[#18181B] focus:border-black focus:outline-none rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="accent-black w-4 h-4 rounded"
                />
                <label htmlFor="isFeatured" className="text-[#18181B] font-semibold cursor-pointer text-xs">
                  Destacado en Home Slider & Vitrina Oficial
                </label>
              </div>
            </div>
          </div>

          {/* Technical Specs (Official Montezzi Standard) */}
          <div className="space-y-3">
            <h4 className="font-sans text-sm text-[#18181B] font-bold normal-case">
              Especificaciones Técnicas Oficiales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Acabado</label>
                <input
                  type="text"
                  value={acabado}
                  onChange={e => setAcabado(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Dimensiones (W*D*H mm)</label>
                <input
                  type="text"
                  value={dimensiones}
                  onChange={e => setDimensiones(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Capacidad de Carga</label>
                <input
                  type="text"
                  value={capacidadCarga}
                  onChange={e => setCapacidadCarga(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[#52525B] font-semibold">Mecanismo / Articulación</label>
                <input
                  type="text"
                  value={mecanismo}
                  onChange={e => setMecanismo(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <ImageUploadDropzone
                  value={imageUrl}
                  onChange={setImageUrl}
                  productCode={code}
                />
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0EFEA]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] font-semibold text-xs rounded-full transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#18181B] text-white font-semibold text-xs hover:bg-black flex items-center gap-2 rounded-full shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Guardando...' : 'Guardar Referencia'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
