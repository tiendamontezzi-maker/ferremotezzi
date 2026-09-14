import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { OrderItem, OrderStatus } from '../../types/database';
import { X, Plus, Trash2, Search, Check, ShoppingBag } from 'lucide-react';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated?: (orderId: string) => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onOrderCreated
}) => {
  const { products, createOrder } = useProducts();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Bogotá D.C.');
  const [department, setDepartment] = useState('Cundinamarca');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'tarjeta' | 'efectivo_showroom'>('transferencia');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('aprobado');
  const [shippingCost, setShippingCost] = useState<number>(0);

  // Items State
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [productSearch, setProductSearch] = useState('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter products for dropdown
  const filteredProducts = products.filter(p =>
    p.code.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  ).slice(0, 15);

  const handleAddItem = () => {
    if (!selectedProductId) return;
    const prod = products.find(p => p.id === selectedProductId);
    if (!prod) return;

    if (itemQuantity <= 0) return;

    // Check if item already in order
    const existingIndex = orderItems.findIndex(i => i.product_id === prod.id);
    if (existingIndex >= 0) {
      const updated = [...orderItems];
      const newQty = updated[existingIndex].quantity + itemQuantity;
      updated[existingIndex].quantity = newQty;
      updated[existingIndex].subtotal = newQty * prod.price;
      setOrderItems(updated);
    } else {
      const newItem: OrderItem = {
        product_id: prod.id,
        code: prod.code,
        name: prod.name,
        price: prod.price,
        quantity: itemQuantity,
        image_url: prod.image_url,
        subtotal: prod.price * itemQuantity
      };
      setOrderItems(prev => [...prev, newItem]);
    }

    // Reset selection
    setSelectedProductId('');
    setItemQuantity(1);
    setProductSearch('');
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems(prev => prev.filter(i => i.product_id !== productId));
  };

  const handleUpdateItemQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setOrderItems(prev =>
      prev.map(item =>
        item.product_id === productId
          ? { ...item, quantity: qty, subtotal: qty * item.price }
          : item
      )
    );
  };

  const subtotalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalAmount = subtotalAmount + Number(shippingCost || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (orderItems.length === 0) {
      setErrorMessage('Debes agregar al menos un producto a la orden.');
      return;
    }
    if (!customerName.trim()) {
      setErrorMessage('Por favor ingresa el nombre del cliente o estudio de arquitectura.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Por favor ingresa un teléfono o celular de contacto.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createOrder({
        customer_name: customerName,
        customer_email: customerEmail || 'atencion@montezzi.com',
        customer_phone: customerPhone,
        shipping_address: shippingAddress || 'Retiro en Showroom Medellín',
        city,
        department,
        notes,
        total_amount: totalAmount,
        subtotal_amount: subtotalAmount,
        shipping_cost: shippingCost,
        status: orderStatus,
        items: orderItems,
        payment_method: paymentMethod,
        payment_status: orderStatus === 'aprobado' ? 'acreditado' : 'pendiente_verificacion'
      });

      setSuccessMessage(`Pedido ${created.id} generado exitosamente.`);
      if (onOrderCreated) {
        onOrderCreated(created.id);
      }
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al crear la orden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-black/15 shadow-2xl rounded-sm w-full max-w-4xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-black text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-base text-obsidian uppercase font-bold tracking-wider">
                Crear Nuevo Pedido
              </h3>
              <p className="text-[11px] text-obsidian/60 font-sans">
                Emisión de pedido interno o telefónico con descuento profesional
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-obsidian/50 hover:text-black hover:bg-black/5 rounded-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans rounded-xs">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans rounded-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Section: Client Details */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/60 font-semibold block mb-3">
              1. Información del Cliente o Estudio
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-obsidian/70 font-medium">Nombre Completo / Estudio / Razón Social *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Arq. Felipe Morales · Taller Tres"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Teléfono / WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="+57 300 123 4567"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="contacto@estudio.co"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Ciudad de Entrega</label>
                <input
                  type="text"
                  placeholder="Medellín / Bogotá / Cali"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Dirección de Despacho</label>
                <input
                  type="text"
                  placeholder="Cra 43A # 1-50, Of. 402"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>
            </div>
          </div>

          {/* Section: Product Selection */}
          <div className="pt-2 border-t border-black/10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/60 font-semibold block mb-3">
              2. Agregar Productos del Portafolio (KDJ-1 al KDJ-112)
            </span>

            {/* Product Lookup Bar */}
            <div className="p-3 bg-[#F9F9F8] border border-black/10 rounded-xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs">
                <div className="sm:col-span-7 relative">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
                    <input
                      type="text"
                      placeholder="Buscar por código KDJ o nombre..."
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-xs font-sans"
                    />
                  </div>
                  {productSearch.trim().length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/15 shadow-lg rounded-xs max-h-48 overflow-y-auto z-20 divide-y divide-black/5">
                      {filteredProducts.length === 0 ? (
                        <div className="p-2 text-obsidian/40 text-center italic">Sin coincidencias</div>
                      ) : (
                        filteredProducts.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setSelectedProductId(p.id);
                              setProductSearch(`${p.code} - ${p.name}`);
                            }}
                            className="w-full text-left p-2 hover:bg-black/5 flex items-center justify-between text-xs font-sans"
                          >
                            <span className="font-mono font-semibold text-black">{p.code}</span>
                            <span className="truncate mx-2 text-obsidian/80">{p.name}</span>
                            <span className="font-mono text-obsidian/60">${p.price.toLocaleString('es-CO')}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-3 flex items-center gap-2">
                  <label className="text-obsidian/60 text-[11px] whitespace-nowrap">Cant:</label>
                  <input
                    type="number"
                    min="1"
                    value={itemQuantity}
                    onChange={e => setItemQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-2 py-2 bg-white border border-black/15 rounded-xs focus:outline-hidden focus:border-black font-mono text-center"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!selectedProductId}
                    className="w-full py-2 bg-black text-white text-xs uppercase font-medium tracking-wider rounded-xs hover:bg-black/85 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Added Items Table */}
            <div className="mt-3">
              {orderItems.length === 0 ? (
                <p className="text-xs text-obsidian/40 italic py-4 text-center border border-dashed border-black/15 rounded-xs font-sans">
                  No hay productos en esta orden aún. Busca arriba por KDJ y agrégalos.
                </p>
              ) : (
                <div className="border border-black/10 rounded-xs overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#F6F6F6] text-[10px] font-mono uppercase text-obsidian/60 border-b border-black/10">
                      <tr>
                        <th className="p-2.5">Producto</th>
                        <th className="p-2.5 text-right">Precio Unit.</th>
                        <th className="p-2.5 text-center">Cantidad</th>
                        <th className="p-2.5 text-right">Subtotal</th>
                        <th className="p-2.5 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {orderItems.map(item => (
                        <tr key={item.product_id} className="hover:bg-black/[0.01]">
                          <td className="p-2.5">
                            <div className="flex items-center gap-2">
                              <img
                                src={item.image_url}
                                alt={item.code}
                                className="w-8 h-8 object-cover rounded-xs border border-black/10 bg-white"
                              />
                              <div>
                                <span className="font-mono font-bold text-black block">{item.code}</span>
                                <span className="text-obsidian/70 text-[11px] line-clamp-1">{item.name}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-2.5 text-right font-mono text-obsidian/80">
                            ${item.price.toLocaleString('es-CO')}
                          </td>
                          <td className="p-2.5 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => handleUpdateItemQuantity(item.product_id, parseInt(e.target.value) || 1)}
                              className="w-16 px-1.5 py-1 text-center font-mono border border-black/15 rounded-xs"
                            />
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-obsidian">
                            ${item.subtotal.toLocaleString('es-CO')}
                          </td>
                          <td className="p-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.product_id)}
                              className="p-1 text-obsidian/40 hover:text-red-600 transition-colors"
                              title="Eliminar ítem"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Section: Logistics & Settlement */}
          <div className="pt-2 border-t border-black/10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/60 font-semibold block mb-3">
              3. Modalidad de Pago y Liquidación
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Método de Pago</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black text-obsidian"
                >
                  <option value="transferencia">Transferencia Bancaria (Bancolombia)</option>
                  <option value="tarjeta">Tarjeta Débito / Crédito (Wompi)</option>
                  <option value="efectivo_showroom">Efectivo Showroom Medellín</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Estado Inicial</label>
                <select
                  value={orderStatus}
                  onChange={e => setOrderStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black text-obsidian"
                >
                  <option value="aprobado">Aprobado (Listo para Despacho)</option>
                  <option value="pendiente">Pendiente (En espera de pago)</option>
                  <option value="enviado">Enviado (Con transportadora)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Costo de Envío ($ COP)</label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={shippingCost}
                  onChange={e => setShippingCost(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="0 si es gratis o retiro"
                  className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black font-mono text-obsidian"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-obsidian/70 font-medium">Notas Especiales / Descuento Aplicado</label>
                <input
                  type="text"
                  placeholder="Ej: Descuento 10% B2B para proyecto Torre Laureles, entrega piso 4"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black text-obsidian text-xs"
                />
              </div>
            </div>

            {/* Total Balance Card */}
            <div className="mt-4 p-4 bg-[#FAF9F7] border border-black/10 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
              <div className="text-xs text-obsidian/70">
                <span>Subtotal: </span>
                <strong className="font-mono text-black">${subtotalAmount.toLocaleString('es-CO')} COP</strong>
                <span className="mx-2">·</span>
                <span>Envío: </span>
                <strong className="font-mono text-black">${shippingCost.toLocaleString('es-CO')} COP</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono tracking-widest text-obsidian/50 block">Total a Liquidar</span>
                <span className="text-xl font-mono font-bold text-black">${totalAmount.toLocaleString('es-CO')} <span className="text-xs font-normal text-obsidian/60">COP</span></span>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-obsidian/70 hover:text-black border border-black/15 rounded-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || orderItems.length === 0}
              className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Guardando...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Emitir Pedido</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
