import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { TechnicalTable } from '../components/ui/TechnicalTable';
import { BenefitIcons } from '../components/ui/BenefitIcons';
import { PreInstallationNotice } from '../components/ui/PreInstallationNotice';
import { ProductCard } from '../components/catalog/ProductCard';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { ShoppingBag, Plus, Minus, Check, ArrowLeft, Truck, ShieldCheck, Compass, Star, MessageSquare, Send } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { getProductByCode, products, reviews, addReview } = useProducts();
  const { addItem } = useCart();

  const product = code ? getProductByCode(code) : undefined;
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(false);

  // Set active image when product is found or changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image_url);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6 bg-white">
        <h1 className="font-sans text-2xl sm:text-3xl text-obsidian uppercase font-bold tracking-wider">Referencia no encontrada</h1>
        <p className="text-sm text-obsidian/60 font-sans">
          El código especificado no se encuentra en el catálogo oficial de Montezzi.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/85 shadow-md"
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

  const productReviews = reviews.filter(r => r.product_id === product.id && r.status === 'approved');
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '5.0';

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;
    setIsSubmittingReview(true);
    try {
      await addReview({
        product_id: product.id,
        user_name: reviewerName,
        user_email: reviewerEmail || undefined,
        rating: reviewRating,
        title: reviewTitle || undefined,
        comment: reviewComment
      });
      setReviewSuccessMessage(true);
      setReviewerName('');
      setReviewerEmail('');
      setReviewTitle('');
      setReviewComment('');
      setTimeout(() => setReviewSuccessMessage(false), 4000);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Related products from same collection or category
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category_id === product.category_id || p.main_collection === product.main_collection))
    .slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-obsidian/50 font-sans">
        <Link to="/" className="hover:text-black">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-black">Catálogo</Link>
        <span>/</span>
        <Link
          to={`/catalogo?coleccion=${product.main_collection}`}
          className="hover:text-black capitalize"
        >
          {product.main_collection.replace('_', ' ')}
        </Link>
        <span>/</span>
        <span className="text-black font-mono font-bold">{product.code}</span>
      </div>

      {/* Main Grid: Gallery & Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery & Previews */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden glass-surface border border-white/80 shadow-lg flex items-center justify-center p-8">
            <img
              src={selectedImage || product.image_url || '/images/products/kdj-60.jpg'}
              alt={product.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/products/kdj-60.jpg';
              }}
              className="w-full h-full object-contain object-center transition-all duration-500 hover:scale-105"
            />
            <span className="absolute top-4 left-4 px-3 py-1 glass-pill text-xs font-mono font-bold tracking-widest text-black uppercase shadow-xs rounded-full">
              {product.code}
            </span>

            {product.is_featured && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-black/90 backdrop-blur-md text-white text-[10px] font-sans font-bold uppercase tracking-widest shadow-xs rounded-full border border-white/20">
                Destacado Oficial
              </span>
            )}
            {product.technical_specs?.nota_imagen && (
              <span className="absolute bottom-3 left-4 right-4 text-[10px] text-[#71717A] font-sans text-center">
                {product.technical_specs.nota_imagen}
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
                  className={`w-20 h-20 rounded-lg overflow-hidden border glass-surface p-2 transition-all ${
                    selectedImage === imgUrl
                      ? 'border-black ring-2 ring-black/20 shadow-md'
                      : 'border-black/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Vista ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Architecture & Woodcraft Visual Note */}
          <div className="p-4 wood-card rounded-xl border border-[#5A3927]/18 text-xs text-obsidian/80 flex items-center gap-3.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full wood-pill flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-[#5A3927]" />
            </div>
            <div className="space-y-0.5">
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#5A3927] font-bold block">
                Sinergia en Ebanistería & Maderas Nobles
              </span>
              <span className="text-[11px] text-obsidian/70 font-serif italic">
                Calibrado con tolerancias milimétricas para ensamble en madera maciza, enchapados de nogal o roble y tableros contemporáneos.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Information, Specs, Price, CTA */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans tracking-[0.25em] text-black/60 uppercase font-bold">
                {product.category_name}
              </span>
              {(product.sku || product.technical_specs?.ref_fabricante) && (
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#B68A48] bg-[#FAF6F0] border border-[#E5D8C8] px-2.5 py-0.5 rounded-full">
                  REF. FABRICANTE {product.technical_specs?.ref_fabricante || product.sku}
                </span>
              )}
            </div>
            <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-obsidian mt-1.5 leading-snug font-bold uppercase tracking-wider">
              {product.name}
            </h1>
            <p className="text-sm text-obsidian/75 font-sans mt-3 leading-relaxed">
              {product.short_description}
            </p>
          </div>

          {/* Price Block with Reinforced Glassmorphism */}
          <div className="glass-card p-6 rounded-xl space-y-2.5 shadow-lg border border-white/80">
            <span className="text-[11px] text-obsidian/50 uppercase tracking-widest font-sans font-semibold">
              Precio al Detal con IVA
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl text-obsidian font-bold">
                ${product.price.toLocaleString('es-CO')}
              </span>
              <span className="text-xs text-obsidian uppercase tracking-wider font-sans font-bold">
                COP
              </span>
            </div>

            {product.price >= 500000 && (
              <p className="text-xs text-obsidian font-medium flex items-center gap-1.5 pt-1">
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
              <div className="flex items-center border border-black/15 rounded-xs bg-white w-full sm:w-36 justify-between px-3 py-2.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:text-black text-obsidian/70 transition-colors"
                  aria-label="Restar una unidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono text-sm text-obsidian font-bold px-4">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 hover:text-black text-obsidian/70 transition-colors"
                  aria-label="Añadir una unidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button in Pure Obsidian Black */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3.5 px-6 font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : product.stock === 0
                    ? 'bg-black/10 text-obsidian/40 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-black/85'
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

            {/* B2B / Wholesale Quick link button in Clean Black Outline */}
            <Link
              to="/distribucion"
              className="w-full block text-center py-3 border border-black text-black hover:bg-black hover:text-white rounded-xs text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all"
            >
              ¿Eres Carpintero, Diseñador o Distribuidor? Consulta Precios por Mayor
            </Link>

            {/* Quick Consultation for Architects */}
            <div className="flex items-center justify-between text-xs text-obsidian/70 pt-2 font-sans border-t border-black/[0.08]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-black" /> Garantía de fábrica de 30 días
              </span>
              <Link to="/distribucion" className="text-black hover:underline font-semibold">
                ¿Cotizar volumen para proyectos?
              </Link>
            </div>
          </div>

          {/* Official Technical Table */}
          <div className="pt-4">
            <TechnicalTable
              specs={product.technical_specs}
              description={product.short_description}
              sku={product.sku}
            />
          </div>

          {/* Mandatory Pre-Installation Module */}
          <PreInstallationNotice defaultOpen={true} />
        </div>
      </div>

      {/* Customer Reviews & Ratings (product_reviews Supabase entity) */}
      <section className="space-y-8 pt-8 border-t border-black/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans tracking-[0.2em] text-black/60 uppercase font-bold">
                Opiniones y Reseñas Verificadas
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-mono text-sm font-bold text-obsidian">{avgRating}</span>
              </div>
            </div>
            <h2 className="font-sans text-xl sm:text-2xl text-obsidian uppercase font-bold tracking-wider mt-1">
              Experiencia de Arquitectos y Clientes
            </h2>
          </div>
          <span className="text-xs font-mono text-obsidian/60">
            {productReviews.length} {productReviews.length === 1 ? 'reseña registrada' : 'reseñas registradas'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {productReviews.length === 0 ? (
              <div className="glass-card p-8 rounded-xl text-center space-y-3 border border-black/10">
                <MessageSquare className="w-8 h-8 mx-auto text-obsidian/30" />
                <p className="text-xs text-obsidian/60 font-sans italic">
                  Aún no hay opiniones registradas para esta referencia. Sé el primer profesional en calificarla.
                </p>
              </div>
            ) : (
              productReviews.map(rev => (
                <div key={rev.id} className="glass-card p-5 rounded-xl border border-white/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-black/15'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-obsidian/40">
                      {new Date(rev.created_at).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  {rev.title && (
                    <h4 className="font-sans text-xs uppercase font-bold text-obsidian tracking-wide">
                      {rev.title}
                    </h4>
                  )}
                  <p className="text-xs text-obsidian/75 font-sans leading-relaxed">
                    {rev.comment}
                  </p>
                  <div className="pt-1 text-[11px] font-medium text-obsidian/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{rev.user_name}</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-xs bg-black/5 text-obsidian/60">
                      Comprador Verificado
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Leave a Review Form */}
          <div className="glass-card p-6 rounded-xl border border-white/80 shadow-md space-y-4">
            <h3 className="font-sans text-xs uppercase font-bold text-obsidian tracking-wider border-b border-black/[0.08] pb-3">
              Calificar este Herraje
            </h3>
            {reviewSuccessMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm text-xs font-sans space-y-1">
                <p className="font-bold">¡Gracias por tu opinión!</p>
                <p className="text-[11px] text-emerald-700">Tu reseña ha sido verificada y publicada con éxito.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs font-sans">
                <div className="space-y-1">
                  <label className="text-obsidian/70 font-semibold uppercase text-[10px]">Puntuación *</label>
                  <div className="flex gap-1.5 items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-black/20'}`} />
                      </button>
                    ))}
                    <span className="font-mono text-xs font-bold text-obsidian ml-1">{reviewRating} / 5</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-obsidian/70 font-semibold uppercase text-[10px]">Tu Nombre / Estudio *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Arq. Andrés Restrepo"
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    className="w-full bg-white border border-black/15 px-3 py-2 rounded-xs text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-obsidian/70 font-semibold uppercase text-[10px]">Correo Electrónico (No será visible)</label>
                  <input
                    type="email"
                    placeholder="contacto@estudio.co"
                    value={reviewerEmail}
                    onChange={e => setReviewerEmail(e.target.value)}
                    className="w-full bg-white border border-black/15 px-3 py-2 rounded-xs text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-obsidian/70 font-semibold uppercase text-[10px]">Título de tu Reseña</label>
                  <input
                    type="text"
                    placeholder="Ej: Acabado y cierre de primera calidad"
                    value={reviewTitle}
                    onChange={e => setReviewTitle(e.target.value)}
                    className="w-full bg-white border border-black/15 px-3 py-2 rounded-xs text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-obsidian/70 font-semibold uppercase text-[10px]">Comentario / Experiencia *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe el funcionamiento del mecanismo, suavidad del cierre y durabilidad en obra..."
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    className="w-full bg-white border border-black/15 p-3 rounded-xs text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full py-2.5 bg-black text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Reseña</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <GoldenDivider variant="gradient" className="my-16" />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-sans tracking-[0.2em] text-black/60 uppercase font-bold">
                Sinergia Arquitectónica
              </span>
              <h2 className="font-sans text-xl sm:text-2xl text-obsidian uppercase font-bold tracking-wider mt-1">
                Ideal para complementar tu proyecto
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="text-xs uppercase tracking-[0.18em] text-black font-bold hover:opacity-70 transition-opacity"
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
