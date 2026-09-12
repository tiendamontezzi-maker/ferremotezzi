import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    subtotal,
    shippingCost,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress
  } = useCart();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleCheckout = () => {
    closeDrawer();
    navigate('/carrito');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2DDD4] text-obsidian shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E2D8] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-montezzigold stroke-[1.5]" />
              <h2 className="font-serif text-xl tracking-wider text-obsidian">Tu Selección Montezzi</h2>
              <span className="text-xs bg-[#F3EEE5] text-montezzigold px-2.5 py-0.5 rounded-full font-mono font-bold">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-obsidian/60 hover:text-montezzigold hover:bg-[#F3EEE5] rounded-sm transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#F3EEE5] border-b border-[#E2DDD4] text-xs">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-montezzigold shrink-0" />
              {isFreeShipping ? (
                <span className="text-montezzigold font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡Calificas para Envío Gratuito Nacional!
                </span>
              ) : (
                <span className="text-obsidian/80">
                  Agrega <strong className="text-montezzigold">${amountNeededForFreeShipping.toLocaleString('es-CO')} COP</strong> más para <strong className="text-obsidian">Envío Gratuito</strong>
                </span>
              )}
            </div>
            <div className="w-full bg-[#E2DDD4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-montezzigold h-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#FAF8F5]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-obsidian/60 space-y-4">
                <div className="w-16 h-16 rounded-full border border-[#DDD6C8] bg-white flex items-center justify-center text-montezzigold">
                  <ShoppingBag className="w-8 h-8 stroke-[1]" />
                </div>
                <div>
                  <p className="font-serif text-lg text-obsidian">Tu bolsa está vacía</p>
                  <p className="text-xs text-obsidian/60 mt-1 max-w-xs">
                    Descubre nuestras colecciones de herrajes arquitectónicos y soluciones de organización de alta gama.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeDrawer();
                    navigate('/catalogo');
                  }}
                  className="px-5 py-2.5 bg-white text-xs uppercase tracking-[0.2em] text-montezzigold hover:bg-montezzigold hover:text-white border border-montezzigold font-semibold transition-all shadow-sm"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.product_id}
                  className="flex gap-4 p-3 rounded-sm border border-[#E2DDD4] bg-white hover:border-montezzigold/60 transition-colors shadow-sm"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-sm border border-[#E8E2D8] bg-[#FAF8F5] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-montezzigold font-bold">
                          {item.code}
                        </span>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="text-obsidian/40 hover:text-red-500 transition-colors p-0.5"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-serif text-obsidian font-semibold truncate mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-montezzigold font-mono font-medium mt-1">
                        ${item.price.toLocaleString('es-CO')} COP
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFEAE2]">
                      <div className="flex items-center border border-[#DDD6C8] rounded-sm overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EAE4D8] text-obsidian/70 hover:text-obsidian"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono text-obsidian font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1 hover:bg-[#EAE4D8] text-obsidian/70 hover:text-obsidian"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-mono text-obsidian font-semibold">
                        ${item.subtotal.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D8] bg-white space-y-4">
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between text-obsidian/70">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">${subtotal.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between text-obsidian/70">
                  <span>Envío nacional</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? (
                      <span className="text-montezzigold font-bold">GRATIS</span>
                    ) : (
                      `$${shippingCost.toLocaleString('es-CO')} COP`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E2D8] flex justify-between text-sm font-semibold text-obsidian">
                  <span className="font-serif text-base">Total Estimado</span>
                  <span className="font-mono text-montezzigold text-base font-bold">
                    ${total.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-montezzigold text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-montezzigold-dark transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Iniciar Orden de Compra</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeDrawer}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-[0.18em] text-obsidian/60 hover:text-obsidian transition-colors"
                >
                  Continuar Explorando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
