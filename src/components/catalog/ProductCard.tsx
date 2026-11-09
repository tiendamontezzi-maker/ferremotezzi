import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../../types/database';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  showStars?: boolean;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  showStars = true,
  priority = false
}) => {
  const { addItem } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isLowStock = product.stock <= (product.min_stock_alert ?? 8) && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  // Derive subtle color dots from product specs (memoized per product finish)
  const finishDots = useMemo(() => {
    const finish = (product.technical_specs?.acabado || '').toLowerCase();
    if (finish.includes('negro') || finish.includes('antracita')) {
      return ['#1C1B1A', '#4A4744'];
    }
    if (finish.includes('cromo') || finish.includes('platead')) {
      return ['#D4D4D8', '#A1A1AA', '#1C1B1A'];
    }
    if (finish.includes('oro') || finish.includes('dorad')) {
      return ['#B68A48', '#1C1B1A'];
    }
    if (finish.includes('cuero') || finish.includes('madera') || finish.includes('nogal')) {
      return ['#5A3927', '#8B5A2B', '#1C1B1A'];
    }
    return ['#1C1B1A', '#B68A48'];
  }, [product.technical_specs?.acabado]);

  const formattedPrice = useMemo(() => product.price.toLocaleString('es-CO'), [product.price]);

  return (
    <div className={`group relative flex flex-col space-y-3 ${priority ? '' : 'product-card-contain'}`}>
      {/* Product Image Square Container */}
      <Link
        to={`/producto/${product.code}`}
        className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#EAE7E1] flex items-center justify-center p-5 transition-transform duration-200 group-hover:shadow-md group-hover:-translate-y-0.5"
      >
        <img
          src={product.image_url || '/images/products/kdj-60.jpg'}
          alt={product.name}
          width={360}
          height={360}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/products/kdj-60.jpg';
          }}
          className="w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-105"
        />

        {/* Small subtle badge on top left */}
        {product.is_featured ? (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#18181B] text-white text-[9px] font-sans font-bold uppercase tracking-wider rounded-full shadow-2xs">
            Destacado
          </span>
        ) : isLowStock ? (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-[9px] font-sans font-semibold uppercase tracking-wider rounded-full shadow-2xs">
            Stock Bajo
          </span>
        ) : null}

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className="absolute bottom-3 right-3 p-2.5 glass-button text-obsidian rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md cursor-pointer"
          title="Añadir a la bolsa"
          aria-label="Añadir a la bolsa"
        >
          {added ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </Link>

      {/* Product Metadata beneath the card */}
      <div className="space-y-1">
        <Link to={`/producto/${product.code}`} className="block">
          <h3 className="text-xs font-sans text-[#18181B] group-hover:text-black transition-colors truncate font-semibold">
            {product.name}
          </h3>
        </Link>

        {/* Price & Code */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-sans font-bold text-[#18181B]">
            ${formattedPrice} <span className="text-[10px] text-[#71717A] font-normal">COP</span>
          </div>

          {/* Color swatch dots */}
          <div className="flex items-center gap-1 opacity-85">
            {finishDots.map((color, idx) => (
              <span
                key={idx}
                className="w-2 h-2 rounded-full border border-black/10 inline-block"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Subtle gold rating stars */}
        {showStars && (
          <div className="flex items-center gap-0.5 pt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-[#CCA362] text-[#CCA362] stroke-none"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
