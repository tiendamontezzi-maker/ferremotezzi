import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Check, Star } from 'lucide-react';
import { Product } from '../../types/database';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  showStars?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showStars = true }) => {
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

  // Derive subtle color dots from product specs
  const getFinishDots = () => {
    const finish = (product.technical_specs.acabado || '').toLowerCase();
    if (finish.includes('negro') || finish.includes('antracita')) {
      return ['#1C1B1A', '#4A4744'];
    }
    if (finish.includes('cromo') || finish.includes('platead')) {
      return ['#D4D4D8', '#A1A1AA', '#1C1B1A'];
    }
    if (finish.includes('oro') || finish.includes('dorad')) {
      return ['#B68A48', '#1C1B1A'];
    }
    if (finish.includes('cuero') || finish.includes('madera')) {
      return ['#3D3A37', '#E5DFD4', '#1C1B1A'];
    }
    return ['#1C1B1A', '#B68A48'];
  };

  const finishDots = getFinishDots();

  return (
    <div className="group relative flex flex-col space-y-3">
      {/* Product Image Square Container (Matching the reference image: clean soft studio square) */}
      <Link
        to={`/producto/${product.code}`}
        className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#FAFAFA] border border-black/[0.04] flex items-center justify-center p-6 transition-all duration-300 group-hover:bg-[#F2F2F2] group-hover:shadow-sm"
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-108 mix-blend-multiply"
        />

        {/* Small subtle badge on top left (glassmorphic black badge) */}
        {product.is_featured ? (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/90 backdrop-blur-sm text-white text-[9px] font-sans font-bold uppercase tracking-wider rounded-xs shadow-xs">
            Destacado
          </span>
        ) : isLowStock ? (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/80 backdrop-blur-sm text-white text-[9px] font-sans font-medium uppercase tracking-wider rounded-xs">
            Stock Bajo
          </span>
        ) : null}

        {/* Quick Add Button with Frosted Glassmorphism */}
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className="absolute bottom-3 right-3 p-2 bg-white/85 backdrop-blur-md border border-black/10 hover:bg-black text-obsidian hover:text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
          title="Añadir a la bolsa"
          aria-label="Añadir a la bolsa"
        >
          {added ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </Link>

      {/* Product Metadata beneath the card (exact typography hierarchy from reference) */}
      <div className="space-y-1">
        <Link to={`/producto/${product.code}`} className="block">
          <h3 className="text-[11px] font-sans uppercase tracking-[0.14em] text-obsidian/85 group-hover:text-black transition-colors truncate font-semibold">
            {product.name}
          </h3>
        </Link>

        {/* Price & Code */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-sans font-bold text-obsidian">
            ${product.price.toLocaleString('es-CO')} <span className="text-[10px] text-obsidian/50 font-normal">COP</span>
          </div>

          {/* Color swatch dots (as seen in the reference image) */}
          <div className="flex items-center gap-1 opacity-80">
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
};
