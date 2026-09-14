import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { ShoppingCart, MessageSquare, Mail, CheckCircle2, Clock, AlertOctagon, Filter, ArrowUpRight } from 'lucide-react';

export const AbandonedCartsTab: React.FC = () => {
  const { abandonedCarts, updateAbandonedCartStatus } = useProducts();
  const [filterStatus, setFilterStatus] = useState<'todos' | 'abandonado' | 'contactado' | 'recuperado'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations
  const totalValueAtRisk = abandonedCarts
    .filter(c => c.status === 'abandonado')
    .reduce((sum, c) => sum + c.total_amount, 0);

  const totalRecoveredValue = abandonedCarts
    .filter(c => c.status === 'recuperado')
    .reduce((sum, c) => sum + c.total_amount, 0);

  const recoveredCount = abandonedCarts.filter(c => c.status === 'recuperado').length;
  const contactedCount = abandonedCarts.filter(c => c.status === 'contactado').length;
  const abandonedCount = abandonedCarts.filter(c => c.status === 'abandonado').length;
  const recoveryRate = abandonedCarts.length > 0 ? Math.round((recoveredCount / abandonedCarts.length) * 100) : 0;

  // Filtered List
  const filteredCarts = abandonedCarts.filter(c => {
    const matchesStatus = filterStatus === 'todos' || c.status === filterStatus;
    const matchesSearch =
      c.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const generateWhatsAppLink = (cart: typeof abandonedCarts[0]) => {
    const cleanPhone = (cart.customer_phone || '').replace(/[^0-9]/g, '');
    if (!cleanPhone) return '#';
    const itemNames = cart.items.map(i => `${i.code} (${i.quantity} un.)`).join(', ');
    const message = encodeURIComponent(
      `Estimado/a ${cart.customer_name}, le saludamos de Montezzi Herrajes de Alta Precisión. Notamos su interés en nuestras soluciones arquitectónicas (${itemNames}). ¿Desea asesoría técnica o coordinar una muestra física en su estudio?`
    );
    return `https://wa.me/${cleanPhone.startsWith('57') ? cleanPhone : '57' + cleanPhone}?text=${message}`;
  };

  const generateMailtoLink = (cart: typeof abandonedCarts[0]) => {
    const subject = encodeURIComponent(`Asesoría Técnica y Cotización Montezzi Herrajes`);
    const body = encodeURIComponent(
      `Estimado/a ${cart.customer_name},\n\nLe saludamos desde Montezzi.\nGuardamos la selección de herrajes para su proyecto por valor de $${cart.total_amount.toLocaleString('es-CO')} COP.\n\nQuedamos a su total disposición para coordinar despachos o soporte técnico.\n\nAtentamente,\nEquipo Comercial Montezzi`
    );
    return `mailto:${cart.customer_email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Valor en Riesgo</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-red-600">
            ${(totalValueAtRisk / 1000000).toFixed(2)}M <span className="text-xs font-sans font-normal text-obsidian/50">COP</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            {abandonedCount} carritos sin seguimiento aún
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Tasa de Recuperación</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-700">
            {recoveryRate}%
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            ${(totalRecoveredValue / 1000000).toFixed(2)}M COP recuperados
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">En Gestión Activa</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-amber-700">
            {contactedCount}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Contactados vía WhatsApp / Email
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Total Carritos</span>
            <ShoppingCart className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {abandonedCarts.length}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Sesiones registradas este mes
          </span>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="glass-card p-4 rounded-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-obsidian/50 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap">Filtrar:</span>
          {(['todos', 'abandonado', 'contactado', 'recuperado'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
                filterStatus === st
                  ? 'bg-black text-white'
                  : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
              }`}
            >
              {st} {st === 'todos' ? `(${abandonedCarts.length})` : `(${abandonedCarts.filter(c => c.status === st).length})`}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar por cliente, estudio o ciudad..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 border border-black/15 bg-white rounded-xs focus:outline-hidden focus:border-black text-xs"
          />
        </div>
      </div>

      {/* Abandoned Carts Cards List */}
      <div className="space-y-4">
        {filteredCarts.length === 0 ? (
          <div className="glass-card p-12 text-center text-obsidian/50 font-sans italic text-xs">
            No se encontraron carritos para el criterio seleccionado.
          </div>
        ) : (
          filteredCarts.map(cart => {
            const dateStr = new Date(cart.last_activity || cart.created_at).toLocaleDateString('es-CO', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={cart.id}
                className="glass-card p-5 rounded-sm space-y-4 border border-black/10 hover:border-black/25 transition-all shadow-xs"
              >
                {/* Top Row: Client Info & Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-sm text-obsidian">{cart.customer_name}</span>
                      {cart.company && (
                        <span className="text-xs text-obsidian/60 font-sans">· {cart.company}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-obsidian/50 font-mono mt-0.5">
                      <span>{cart.city || 'Colombia'}</span> · <span>{cart.customer_email}</span>
                      {cart.customer_phone && <span> · {cart.customer_phone}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-obsidian/40 font-mono">
                      {dateStr}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-xs font-semibold ${
                        cart.status === 'recuperado'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : cart.status === 'contactado'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {cart.status}
                    </span>
                  </div>
                </div>

                {/* Items in Cart */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian/50 block">
                    Referencias en el Carrito ({cart.items.reduce((s, i) => s + i.quantity, 0)} unidades):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {cart.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white/70 border border-black/10 rounded-xs flex items-center gap-2 text-xs font-sans"
                      >
                        <img
                          src={item.image_url}
                          alt={item.code}
                          className="w-10 h-10 object-cover rounded-xs border border-black/10 bg-white shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-mono font-bold text-black block text-xs">{item.code}</span>
                          <span className="text-[11px] text-obsidian/70 truncate block">{item.name}</span>
                          <span className="text-[10px] font-mono text-obsidian/50">
                            {item.quantity} un. × ${item.price.toLocaleString('es-CO')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Total & Action Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-black/5">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-obsidian/50 block">Valor Cotizado</span>
                    <span className="text-lg font-mono font-bold text-black">
                      ${cart.total_amount.toLocaleString('es-CO')} <span className="text-xs font-sans font-normal text-obsidian/50">COP</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Changer Buttons */}
                    <div className="flex items-center border border-black/15 rounded-xs overflow-hidden text-[10px] font-mono uppercase">
                      <button
                        onClick={() => updateAbandonedCartStatus(cart.id, 'abandonado')}
                        className={`px-2 py-1.5 transition-colors ${cart.status === 'abandonado' ? 'bg-black text-white font-bold' : 'bg-white hover:bg-black/5 text-obsidian/70'}`}
                      >
                        Pendiente
                      </button>
                      <button
                        onClick={() => updateAbandonedCartStatus(cart.id, 'contactado')}
                        className={`px-2 py-1.5 border-l border-black/15 transition-colors ${cart.status === 'contactado' ? 'bg-black text-white font-bold' : 'bg-white hover:bg-black/5 text-obsidian/70'}`}
                      >
                        Contactado
                      </button>
                      <button
                        onClick={() => updateAbandonedCartStatus(cart.id, 'recuperado')}
                        className={`px-2 py-1.5 border-l border-black/15 transition-colors ${cart.status === 'recuperado' ? 'bg-emerald-700 text-white font-bold' : 'bg-white hover:bg-black/5 text-obsidian/70'}`}
                      >
                        Recuperado
                      </button>
                    </div>

                    {/* Quick WhatsApp Action */}
                    <a
                      href={generateWhatsAppLink(cart)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs hover:bg-[#20b858] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    {/* Quick Mailto Action */}
                    <a
                      href={generateMailtoLink(cart)}
                      className="px-3 py-1.5 bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
