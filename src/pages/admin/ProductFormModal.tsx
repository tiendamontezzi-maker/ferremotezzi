import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
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
  const [refFabricante, setRefFabricante] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mainCollection, setMainCollection] = useState<MainCollection>('cocina');
  const [shortDescription, setShortDescription] = useState('');
  const [notaTecnica, setNotaTecnica] = useState('');
  const [price, setPrice] = useState<number>(250000);
  const [warehouseStock, setWarehouseStock] = useState<number>(10);
  const [storeStock, setStoreStock] = useState<number>(3);
  const [webStock, setWebStock] = useState<number>(5);
  const totalCalculatedStock = Math.max(0, warehouseStock) + Math.max(0, storeStock) + Math.max(0, webStock);
  const [minStockAlert, setMinStockAlert] = useState<number>(3);
  const [imageUrl, setImageUrl] = useState('');
  const [modulo, setModulo] = useState('600mm');
  const [dimensiones, setDimensiones] = useState('564 × 450 × 200 mm');
  const [material, setMaterial] = useState('Acero al carbono + base antideslizante + MDF; estructura en hierro');
  const [acabado, setAcabado] = useState('Estructura con pintura electrostática');
  const [configuracion, setConfiguracion] = useState('2 niveles');
  const [mecanismo, setMecanismo] = useState('Correderas ocultas con amortiguación');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setCode(productToEdit.code);
      setRefFabricante(productToEdit.technical_specs?.ref_fabricante || productToEdit.sku || '');
      setName(productToEdit.name);
      setCategoryId(productToEdit.category_id);
      setMainCollection(productToEdit.main_collection);
      setShortDescription(productToEdit.short_description);
      setNotaTecnica(productToEdit.technical_specs?.nota_tecnica || '');
      setPrice(productToEdit.price);
      setWarehouseStock(productToEdit.warehouse_stock ?? Math.floor(productToEdit.stock * 0.6));
      setStoreStock(productToEdit.store_stock ?? Math.floor(productToEdit.stock * 0.2));
      setWebStock(productToEdit.web_stock ?? (productToEdit.stock - Math.floor(productToEdit.stock * 0.6) - Math.floor(productToEdit.stock * 0.2)));
      setMinStockAlert(productToEdit.min_stock_alert ?? 3);
      setImageUrl(productToEdit.image_url);
      setModulo(productToEdit.technical_specs?.modulo || '');
      setDimensiones(productToEdit.technical_specs?.dimensiones || '');
      setMaterial(productToEdit.technical_specs?.material || '');
      setAcabado(productToEdit.technical_specs?.acabado || '');
      setConfiguracion(productToEdit.technical_specs?.configuracion || '');
      setMecanismo(productToEdit.technical_specs?.mecanismo || '');
      setIsFeatured(productToEdit.is_featured);
    } else {
      setCode('KDJ-104');
      setRefFabricante('');
      setName('');
      setCategoryId(categories[0]?.id || 'cat-cocina-condimenteros');
      setMainCollection('cocina');
      setShortDescription('');
      setNotaTecnica('');
      setPrice(250000);
      setWarehouseStock(10);
      setStoreStock(3);
      setWebStock(5);
      setMinStockAlert(3);
      setImageUrl('/images/products/kdj-60.jpg');
      setModulo('600mm');
      setDimensiones('564 × 450 × 200 mm');
      setMaterial('Acero al carbono + base antideslizante + MDF; estructura en hierro');
      setAcabado('Estructura con pintura electrostática');
      setConfiguracion('2 niveles');
      setMecanismo('Correderas ocultas con amortiguación');
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
      finalStock <= 0 ? 'out_of_stock' : finalStock < (minStockAlert || 3) ? 'low_stock' : 'in_stock';
    const aplicacionLabel = mainCollection === 'closet' ? 'Clóset' : 'Cocina';
    const fullDesc = notaTecnica.trim()
      ? `${shortDescription.trim()} Nota: ${notaTecnica.trim()}`
      : shortDescription.trim();

    const productPayload = {
      code,
      sku: refFabricante || code,
      name,
      category_id: categoryId,
      category_name: selectedCategory ? selectedCategory.name : 'General',
      category: selectedCategory ? selectedCategory.name : 'General',
      main_collection: mainCollection,
      short_description: shortDescription.trim(),
      full_description: fullDesc,
      description: fullDesc,
      technical_specs: {
        ref_fabricante: refFabricante || code,
        aplicacion: aplicacionLabel,
        modulo,
        dimensiones,
        material,
        acabado,
        configuracion,
        mecanismo,
        ...(notaTecnica.trim() ? { nota_tecnica: notaTecnica.trim() } : {})
      },
      benefits: [
        { label: 'MÓDULO', value: `Módulo ${modulo}` },
        { label: 'CONFIGURACIÓN', value: configuracion },
        { label: 'MATERIAL', value: material },
        { label: 'SISTEMA', value: mecanismo }
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
              {productToEdit ? `Ficha Técnica ${productToEdit.code} · ${productToEdit.name}` : 'Nueva Ficha Técnica Oficial Montezzi 2026'}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#EAEAEA] text-[#71717A] hover:text-black transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs font-sans">
          {/* Main Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#52525B] font-semibold">Código Montezzi *</label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="KDJ-60"
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] font-mono font-bold focus:outline-none rounded-xl transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#52525B] font-semibold">Ref. Fabricante (Importación)</label>
              <input
                type="text"
                value={refFabricante}
                onChange={e => setRefFabricante(e.target.value)}
                placeholder="04SW-01-200"
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] font-mono focus:outline-none rounded-xl transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#52525B] font-semibold">Aplicación *</label>
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
              <label className="text-[#52525B] font-semibold">Nombre del Producto (Dossier 2026) *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Canasta lateral de 2 niveles con base de madera"
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
              />
            </div>

            <div className="space-y-1.5">
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
          </div>

          {/* Price & Multichannel Reactive Inventory */}
          <div className="p-4 bg-[#FAF9F7] border border-[#EAE7E1] rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Inventario Multicanal Reactivo & Precio en COP
              </span>
              <span className="text-[11px] text-[#71717A] font-mono">
                Stock Total = Bodega + Showroom + Web
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
                <label className="text-[11px] text-[#71717A] font-semibold">Bodega *</label>
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
                <label className="text-[11px] text-[#71717A] font-semibold">Showroom *</label>
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
                <label className="text-[11px] text-[#71717A] font-semibold">Umbral Alerta Stock Crítico (&le; unids)</label>
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
                  Destacado en Vitrina Oficial
                </label>
              </div>
            </div>
          </div>

          {/* Especificaciones Confirmadas (Dossier Técnico 2026) */}
          <div className="space-y-3">
            <h4 className="font-sans text-sm text-[#18181B] font-bold normal-case">
              Especificaciones Confirmadas (Dossier Técnico 2026)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Módulo Compatible</label>
                <input
                  type="text"
                  value={modulo}
                  onChange={e => setModulo(e.target.value)}
                  placeholder="Ej: 200mm, 600mm, 800-900mm"
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Dimensiones</label>
                <input
                  type="text"
                  value={dimensiones}
                  onChange={e => setDimensiones(e.target.value)}
                  placeholder="Ej: 145 × 480 × 590 mm"
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Configuración</label>
                <input
                  type="text"
                  value={configuracion}
                  onChange={e => setConfiguracion(e.target.value)}
                  placeholder="Ej: 2 niveles, Esquinero universal"
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[#52525B] font-semibold">Materiales</label>
                <input
                  type="text"
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#52525B] font-semibold">Acabado / Color</label>
                <input
                  type="text"
                  value={acabado}
                  onChange={e => setAcabado(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-[#52525B] font-semibold">Sistema / Mecanismo</label>
                <input
                  type="text"
                  value={mecanismo}
                  onChange={e => setMecanismo(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-[#52525B] font-semibold">Descripción Técnica *</label>
                <textarea
                  required
                  rows={2}
                  value={shortDescription}
                  onChange={e => setShortDescription(e.target.value)}
                  placeholder="Descripción técnica oficial basada en documentación comercial de importación..."
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white p-3.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-[#52525B] font-semibold">Nota de Importación / Verificación (Opcional)</label>
                <input
                  type="text"
                  value={notaTecnica}
                  onChange={e => setNotaTecnica(e.target.value)}
                  placeholder="Ej: Confirmar acabado exacto por variante antes de especificar instalación."
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white px-3.5 py-2.5 text-[#18181B] focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="sm:col-span-3">
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
              <span>{isSaving ? 'Guardando...' : 'Guardar Ficha Técnica'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
