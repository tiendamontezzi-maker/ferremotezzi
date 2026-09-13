import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, FREE_SHIPPING_THRESHOLD } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck, CheckCircle2,
  Building, CreditCard, Banknote, ShieldCheck, ArrowLeft
} from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress
  } = useCart();

  const { createOrder } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Checkout form state
  const [formData, setFormData] = useState({
    customer_name: user?.full_name || '',
    customer_email: user?.email || '',
    customer_phone: '',
    shipping_address: '',
    city: 'Medellín',
    department: 'Antioquia',
    notes: '',
    payment_method: 'transferencia' as 'transferencia' | 'tarjeta' | 'efectivo_showroom'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        user_id: user?.user_id,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        shipping_address: formData.shipping_address,
        city: formData.city,
        department: formData.department,
        notes: formData.notes,
        subtotal_amount: subtotal,
        shipping_cost: shippingCost,
        total_amount: total,
        status: 'pendiente',
        items: [...items],
        payment_method: formData.payment_method,
        payment_status: 'pendiente_verificacion'
      });

      setCreatedOrder(order);
      clearCart();
      setStep('success');
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Hubo un error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success' && createdOrder) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8 bg-white">
        <div className="w-20 h-20 rounded-full bg-white border border-black/20 flex items-center justify-center mx-auto text-black shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono tracking-widest text-black/60 uppercase font-bold">
            Orden Confirmada: {createdOrder.id}
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-obsidian uppercase font-bold tracking-wider">
            Gracias por elegir Montezzi
          </h1>
          <p className="text-sm text-obsidian/70 font-sans max-w-lg mx-auto">
            Hemos registrado tu pedido exitosamente. Un asesor de cuenta se pondrá en contacto contigo para coordinar el despacho.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="glass-card rounded-sm p-6 text-left space-y-4 max-w-md mx-auto">
          <div className="flex justify-between text-xs pb-3 border-b border-black/[0.06]">
            <span className="text-obsidian/60">Destinatario:</span>
            <span className="text-obsidian font-medium">{createdOrder.customer_name}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-black/[0.06]">
            <span className="text-obsidian/60">Destino:</span>
            <span className="text-obsidian font-medium">{createdOrder.city}, {createdOrder.department}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-black/[0.06]">
            <span className="text-obsidian/60">Método de pago:</span>
            <span className="text-obsidian font-medium capitalize">{createdOrder.payment_method.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 font-semibold">
            <span className="text-obsidian">Total a cancelar:</span>
            <span className="text-black font-mono font-bold">${createdOrder.total_amount.toLocaleString('es-CO')} COP</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/catalogo"
            className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/85 transition-all shadow-sm"
          >
            Seguir Explorando el Catálogo
          </Link>
          <Link
            to="/admin"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-black/20 text-obsidian text-xs uppercase tracking-widest hover:border-black transition-all"
          >
            Ver Pedido en Panel Administrativo
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4 text-center space-y-6 bg-white">
        <div className="w-16 h-16 rounded-full border border-black/15 bg-white flex items-center justify-center mx-auto text-black shadow-xs">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl text-obsidian uppercase font-bold tracking-wider">Tu bolsa está vacía</h1>
        <p className="text-xs text-obsidian/60 font-sans max-w-md mx-auto">
          Explora nuestro catálogo de 112 herrajes arquitectónicos de lujo para iniciar tu pedido.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-black/85 transition-all"
        >
          <span>Ir al Catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white">
      {/* Title & Navigation */}
      <div className="space-y-2 pb-6 border-b border-black/[0.08]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-obsidian/50 font-sans">
          <Link to="/" className="hover:text-black">Inicio</Link>
          <span>/</span>
          <span className="text-black font-semibold">Bolsa de Compra & Despacho</span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-obsidian uppercase font-bold tracking-wider">
          {step === 'cart' ? 'Revisión de tu Selección' : 'Datos de Envío y Facturación'}
        </h1>
      </div>

      {/* Free Shipping Alert Banner */}
      <div className="p-4 glass-panel rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-black shrink-0" />
          <div className="text-xs">
            {isFreeShipping ? (
              <p className="text-black font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Tu orden califica para Envío Gratuito Nacional.
              </p>
            ) : (
              <p className="text-obsidian/80 font-sans">
                Agrega <strong className="text-black font-mono font-bold">${amountNeededForFreeShipping.toLocaleString('es-CO')} COP</strong> adicionales para desbloquear <strong className="text-black font-bold">Envío Gratis</strong> en toda Colombia.
              </p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-48 bg-black/[0.08] h-2 rounded-full overflow-hidden shrink-0">
          <div
            className="bg-black h-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items or Checkout Form + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column (2 cols): Items table or Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {step === 'cart' ? (
            <div className="glass-card rounded-sm overflow-hidden">
              <div className="px-6 py-3.5 bg-black/[0.03] border-b border-black/[0.08] text-xs uppercase tracking-widest text-black font-bold flex justify-between">
                <span>Producto / Referencia</span>
                <span className="hidden sm:inline">Subtotal</span>
              </div>

              <div className="divide-y divide-black/[0.06]">
                {items.map(item => (
                  <div key={item.product_id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-sm border border-black/[0.06] bg-[#FAFAFA] shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-widest text-black/60 uppercase font-bold">
                          {item.code}
                        </span>
                        <h3 className="font-sans text-sm uppercase font-bold text-obsidian">
                          {item.name}
                        </h3>
                        <p className="text-xs text-black font-mono font-semibold">
                          ${item.price.toLocaleString('es-CO')} COP
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-black/[0.06]">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-black/15 rounded-sm bg-white">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1.5 hover:bg-black/5 text-obsidian/70 hover:text-obsidian"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono text-obsidian font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1.5 hover:bg-black/5 text-obsidian/70 hover:text-obsidian"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm text-black font-bold">
                        ${item.subtotal.toLocaleString('es-CO')} COP
                      </span>

                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-obsidian/40 hover:text-red-500 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-black/[0.02] border-t border-black/[0.08] flex justify-between items-center text-xs">
                <button
                  onClick={clearCart}
                  className="text-obsidian/50 hover:text-red-500 transition-colors"
                >
                  Vaciar toda la bolsa
                </button>
                <Link to="/catalogo" className="text-black font-bold hover:underline">
                  + Continuar agregando productos
                </Link>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} id="checkout-form" className="glass-card p-6 sm:p-8 rounded-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.08]">
                <h3 className="font-sans text-base uppercase font-bold text-obsidian tracking-wider">Dirección y Destino de Envío</h3>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-black font-bold hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Modificar productos
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Nombre Completo / Razón Social *</label>
                  <input
                    type="text"
                    required
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    placeholder="Ej: Arq. María Camila Gómez"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Teléfono de Contacto *</label>
                  <input
                    type="tel"
                    required
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    placeholder="+57 300 000 0000"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Ciudad de Entrega *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none uppercase rounded-xs"
                  >
                    <option value="Medellín">Medellín (Entrega estimada: 1 día hábil)</option>
                    <option value="Bogotá D.C.">Bogotá D.C. (Entrega estimada: 2-3 días hábiles)</option>
                    <option value="Cali">Cali (Entrega estimada: 2-3 días hábiles)</option>
                    <option value="Barranquilla">Barranquilla (Entrega estimada: 2-3 días hábiles)</option>
                    <option value="Bucaramanga">Bucaramanga (Entrega estimada: 2-3 días hábiles)</option>
                    <option value="Pereira">Pereira (Entrega estimada: 2-3 días hábiles)</option>
                    <option value="Cartagena">Cartagena (Entrega estimada: 2-3 días hábiles)</option>
                    <option value="Otra Ciudad de Colombia">Otra Ciudad de Colombia (2-3 días hábiles)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Departamento *</label>
                  <input
                    type="text"
                    required
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Antioquia, Cundinamarca, etc."
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Dirección Completa de Despacho *</label>
                  <input
                    type="text"
                    required
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleInputChange}
                    placeholder="Calle / Carrera, Número, Edificio, Apto u Oficina"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-obsidian/70 tracking-wider uppercase font-semibold">Instrucciones Especiales de Entrega</label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Indicaciones para el transportador o recepción en portería..."
                    className="w-full bg-white border border-black/15 px-3 py-2 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-4 border-t border-black/[0.08]">
                <h4 className="font-sans text-sm uppercase font-bold text-obsidian tracking-wider">Método de Pago Preferido</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'transferencia', label: 'Transferencia Bancaria', icon: Building, desc: 'Bancolombia / Nequi' },
                    { id: 'tarjeta', label: 'Tarjeta Débito/Crédito', icon: CreditCard, desc: 'Pasarela Segura' },
                    { id: 'efectivo_showroom', label: 'Pago en Showroom', icon: Banknote, desc: 'Medellín' },
                  ].map(m => (
                    <label
                      key={m.id}
                      className={`p-3 border rounded-sm cursor-pointer transition-all flex flex-col justify-between ${
                        formData.payment_method === m.id
                          ? 'border-black bg-black/[0.04] shadow-xs'
                          : 'border-black/[0.08] bg-white hover:border-black/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <m.icon className={`w-4 h-4 ${formData.payment_method === m.id ? 'text-black' : 'text-obsidian/60'}`} />
                        <input
                          type="radio"
                          name="payment_method"
                          value={m.id}
                          checked={formData.payment_method === m.id}
                          onChange={handleInputChange}
                          className="accent-black"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-obsidian block">{m.label}</span>
                        <span className="text-[10px] text-obsidian/50 font-mono">{m.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Order Summary Box */}
        <div className="glass-card p-6 rounded-sm space-y-6">
          <h3 className="font-sans text-base uppercase font-bold text-obsidian pb-4 border-b border-black/[0.08] tracking-wider">
            Resumen del Pedido
          </h3>

          <div className="space-y-3 text-xs font-sans">
            <div className="flex justify-between text-obsidian/70">
              <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} piezas)</span>
              <span className="font-mono text-obsidian font-semibold">${subtotal.toLocaleString('es-CO')} COP</span>
            </div>

            <div className="flex justify-between text-obsidian/70">
              <span>Envío ({formData.city === 'Medellín' ? 'Medellín 1 día' : 'Nacional'})</span>
              <span className="font-mono">
                {shippingCost === 0 ? (
                  <span className="text-black font-bold">GRATIS</span>
                ) : (
                  `$${shippingCost.toLocaleString('es-CO')} COP`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-black/[0.08] flex justify-between text-base font-semibold text-obsidian">
              <span className="font-sans text-xs uppercase tracking-wider font-bold">Total Liquidado</span>
              <span className="font-mono text-black font-bold text-lg">
                ${total.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-4 bg-black text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/85 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Continuar a Datos de Envío</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/85 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generando Orden...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirmar Orden de Compra</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[11px] text-obsidian/50 text-center font-sans">
              Transacción protegida. Montezzi nunca solicitará contraseñas ni datos sensibles de seguridad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
