import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertCircle } from 'lucide-react';
import { Product, MainCollection } from '../../types/database';
import { useProducts } from '../../context/ProductContext';

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
  const [stock, setStock] = useState<number>(25);
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
      setStock(productToEdit.stock);
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
      setStock(20);
      setMinStockAlert(8);
      setImageUrl('/images/products/bisagra.jpg');
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
      stock: Number(stock),
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E2DDD4] rounded-sm w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#E2DDD4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-montezzigold uppercase font-bold">
              {productToEdit ? `Editar ${productToEdit.code}` : 'Nueva Referencia Oficial'}
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-obsidian/60 hover:text-montezzigold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs font-sans">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Código KDJ *</label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="KDJ-113"
                className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-montezzigold font-mono font-bold focus:border-montezzigold focus:outline-none rounded-xs"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Nombre Comercial *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Despensa extraíble de 6 niveles en vidrio ahumado"
                className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Colección Principal *</label>
              <select
                value={mainCollection}
                onChange={e => setMainCollection(e.target.value as MainCollection)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none uppercase rounded-xs"
              >
                <option value="cocina">Cocina</option>
                <option value="closet">Clóset</option>
                <option value="herrajes_especiales">Herrajes Especiales</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Categoría *</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Descripción Corta *</label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
                placeholder="Descripción concisa y técnica conforme al manual de redacción Montezzi..."
                className="w-full bg-[#FAF8F5] border border-[#DDD6C8] p-3 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
              />
            </div>
          </div>

          {/* Price, Stock & Alerts */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E2DDD4] rounded-sm grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Precio COP *</label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full bg-white border border-[#DDD6C8] px-3 py-2 font-mono text-montezzigold font-bold focus:border-montezzigold focus:outline-none rounded-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Stock Actual *</label>
              <input
                type="number"
                required
                min={0}
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full bg-white border border-[#DDD6C8] px-3 py-2 font-mono text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Alerta Stock Bajo</label>
              <input
                type="number"
                min={1}
                value={minStockAlert}
                onChange={e => setMinStockAlert(Number(e.target.value))}
                className="w-full bg-white border border-[#DDD6C8] px-3 py-2 font-mono text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="accent-montezzigold w-4 h-4"
              />
              <label htmlFor="isFeatured" className="text-obsidian font-semibold cursor-pointer">
                Destacado en Home
              </label>
            </div>
          </div>

          {/* Technical Specs (Official Montezzi Standard) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-montezzigold tracking-widest uppercase font-bold">
              Especificaciones Técnicas Oficiales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Acabado</label>
                <input
                  type="text"
                  value={acabado}
                  onChange={e => setAcabado(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Dimensiones (W*D*H mm)</label>
                <input
                  type="text"
                  value={dimensiones}
                  onChange={e => setDimensiones(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Capacidad de Carga</label>
                <input
                  type="text"
                  value={capacidadCarga}
                  onChange={e => setCapacidadCarga(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Mecanismo / Articulación</label>
                <input
                  type="text"
                  value={mecanismo}
                  onChange={e => setMecanismo(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-obsidian/70 uppercase tracking-wider font-semibold">URL de Fotografía de Producto</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] px-3 py-2 text-obsidian focus:border-montezzigold focus:outline-none rounded-xs"
                />
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2DDD4]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian/70 hover:text-obsidian uppercase tracking-widest text-xs rounded-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-montezzigold text-white font-bold uppercase tracking-widest text-xs hover:bg-montezzigold-dark flex items-center gap-2 rounded-xs shadow-xs"
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
