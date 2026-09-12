import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { TechnicalTable } from '../components/ui/TechnicalTable';
import { BenefitIcons } from '../components/ui/BenefitIcons';
import { PreInstallationNotice } from '../components/ui/PreInstallationNotice';
import { ProductCard } from '../components/catalog/ProductCard';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { ShoppingBag, Plus, Minus, Check, ArrowLeft, Truck, ShieldCheck, Compass } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { getProductByCode, products } = useProducts();
  const { addItem } = useCart();

  const product = code ? getProductByCode(code) : undefined;
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  // Set active image when product is found or changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image_url);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="font-serif text-3xl text-obsidian">Referencia no encontrada</h1>
        <p className="text-sm text-obsidian/60 font-sans">
          El código especificado no se encuentra en el catálogo oficial de Montezzi.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 px-6 py-3 bg-montezzigold text-white text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products from same collection or category
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category_id === product.category_id || p.main_collection === product.main_collection))
    .slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-[#FAF8F5]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-obsidian/50 font-sans">
        <Link to="/" className="hover:text-montezzigold">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-montezzigold">Catálogo</Link>
        <span>/</span>
        <Link
          to={`/catalogo?coleccion=${product.main_collection}`}
          className="hover:text-montezzigold capitalize"
        >
          {product.main_collection.replace('_', ' ')}
        </Link>
        <span>/</span>
        <span className="text-montezzigold font-mono font-bold">{product.code}</span>
      </div>

      {/* Main Grid: Gallery & Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery & Previews */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white border border-[#E2DDD4] shadow-md flex items-center justify-center p-8">
            <img
              src={selectedImage || product.image_url}
              alt={product.name}
              className="w-full h-full object-contain object-center transition-all duration-500 hover:scale-105"
            />
            <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/95 backdrop-blur-md border border-montezzigold/40 text-xs font-mono font-bold tracking-widest text-montezzigold uppercase shadow-sm">
              {product.code}
            </span>

            {product.is_featured && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-montezzigold text-white text-[10px] font-sans font-bold uppercase tracking-widest shadow-sm">
                Destacado Oficial
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery_urls && product.gallery_urls.length > 1 && (
            <div className="flex gap-3">
              {product.gallery_urls.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-sm overflow-hidden border bg-white p-2 transition-all ${
                    selectedImage === imgUrl
                      ? 'border-montezzigold ring-2 ring-montezzigold/50'
                      : 'border-[#DDD6C8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Vista ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Architecture Visual Note */}
          <div className="p-4 bg-[#F3EEE5] border border-[#DDD6C8] rounded-sm text-xs text-obsidian/75 flex items-center gap-3">
            <Compass className="w-4 h-4 text-montezzigold shrink-0" />
            <span>
              Fotografía técnica oficial de producto: acabados arquitectónicos de alta gama y tolerancias de precisión milimétrica.
            </span>
          </div>
        </div>

        {/* Right Column: Information, Specs, Price, CTA */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] text-montezzigold uppercase font-bold">
              {product.category_name}
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-obsidian mt-1 leading-snug font-bold">
              {product.name}
            </h1>
            <p className="text-sm text-obsidian/75 font-sans mt-3 leading-relaxed">
              {product.short_description}
            </p>
          </div>

          {/* Price Block */}
          <div className="p-5 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-sm">
            <span className="text-[11px] text-obsidian/50 uppercase tracking-widest font-sans font-semibold">
              Precio al Detal con IVA
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl text-obsidian font-semibold">
                ${product.price.toLocaleString('es-CO')}
              </span>
              <span className="text-xs text-montezzigold uppercase tracking-wider font-sans font-bold">
                COP
              </span>
            </div>

            {product.price >= 500000 && (
              <p className="text-xs text-montezzigold font-medium flex items-center gap-1.5 pt-1">
                <Truck className="w-3.5 h-3.5" /> Este producto califica automáticamente para <strong>Envío Gratuito Nacional</strong>.
              </p>
            )}
          </div>

          {/* Benefit Icons */}
          <BenefitIcons benefits={product.benefits} />

          {/* Add to Cart Controls */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#DDD6C8] rounded-sm bg-white w-full sm:w-36 justify-between px-3 py-2.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:text-montezzigold text-obsidian/70 transition-colors"
                  aria-label="Restar una unidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono text-sm text-obsidian font-semibold px-4">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 hover:text-montezzigold text-obsidian/70 transition-colors"
                  aria-label="Añadir una unidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3.5 px-6 font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : product.stock === 0
                    ? 'bg-[#EDE7DC] text-obsidian/30 cursor-not-allowed'
                    : 'bg-montezzigold text-white hover:bg-montezzigold-dark'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado a tu selección!</span>
                  </>
                ) : product.stock === 0 ? (
                  <span>Agotado temporalmente</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar al Carrito</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Consultation for Architects */}
            <div className="flex items-center justify-between text-xs text-obsidian/70 pt-2 font-sans border-t border-[#EFEAE2]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-montezzigold" /> Garantía de fábrica de 30 días
              </span>
              <Link to="/distribucion" className="text-montezzigold hover:underline font-medium">
                ¿Cotizar volumen para proyectos?
              </Link>
            </div>
          </div>

          {/* Official Technical Table */}
          <div className="pt-4">
            <TechnicalTable specs={product.technical_specs} />
          </div>

          {/* Mandatory Pre-Installation Module */}
          <PreInstallationNotice defaultOpen={true} />
        </div>
      </div>

      <GoldenDivider variant="gradient" className="my-16" />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-sans tracking-[0.2em] text-montezzigold uppercase font-bold">
                Sinergia Arquitectónica
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-obsidian mt-1">
                Ideal para complementar tu proyecto
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="text-xs uppercase tracking-[0.18em] text-montezzigold font-bold hover:text-montezzigold-dark"
            >
              Ver todas las soluciones
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
