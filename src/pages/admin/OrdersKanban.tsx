import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Order, OrderStatus } from '../../types/database';
import {
  Clock, CheckCircle, Truck, PackageCheck, XCircle, ChevronRight,
  User, MapPin, DollarSign, Calendar
} from 'lucide-react';

export const OrdersKanban: React.FC = () => {
  const { orders, updateOrderStatus } = useProducts();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns: { status: OrderStatus; label: string; icon: any; color: string }[] = [
    { status: 'pendiente', label: 'Pendiente de Pago', icon: Clock, color: 'text-amber-800 border-amber-200 bg-amber-50' },
    { status: 'aprobado', label: 'Aprobado / Alistamiento', icon: CheckCircle, color: 'text-blue-800 border-blue-200 bg-blue-50' },
    { status: 'enviado', label: 'En Despacho / Ruta', icon: Truck, color: 'text-purple-800 border-purple-200 bg-purple-50' },
    { status: 'entregado', label: 'Entregado a Cliente', icon: PackageCheck, color: 'text-emerald-800 border-emerald-200 bg-emerald-50' },
    { status: 'cancelado', label: 'Cancelado', icon: XCircle, color: 'text-red-800 border-red-200 bg-red-50' }
  ];

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {columns.map(col => {
          const colOrders = orders.filter(o => o.status === col.status);
          const ColIcon = col.icon;

          return (
            <div key={col.status} className="bg-white border border-[#E2DDD4] rounded-sm flex flex-col min-h-[450px] shadow-xs">
              {/* Column Header */}
              <div className={`p-3.5 border-b border-[#E2DDD4] flex items-center justify-between ${col.color}`}>
                <div className="flex items-center gap-2">
                  <ColIcon className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {col.label}
                  </h4>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-white border border-[#DDD6C8] font-bold text-obsidian">
                  {colOrders.length}
                </span>
              </div>

              {/* Order Cards */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                {colOrders.length === 0 ? (
                  <p className="text-[11px] text-obsidian/40 text-center py-8 italic font-sans">
                    Sin órdenes
                  </p>
                ) : (
                  colOrders.map(order => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="p-3.5 bg-[#FAF8F5] border border-[#E2DDD4] rounded-xs hover:border-montezzigold transition-all cursor-pointer space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-montezzigold font-bold">
                          {order.id}
                        </span>
                        <span className="text-obsidian/40 font-mono">
                          {new Date(order.created_at).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <div>
                        <h5 className="font-serif text-sm text-obsidian truncate font-medium">
                          {order.customer_name}
                        </h5>
                        <p className="text-[11px] text-obsidian/60 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-montezzigold shrink-0" />
                          <span>{order.city}</span>
                        </p>
                      </div>

                      <div className="text-[11px] text-obsidian/70 border-t border-[#EAE4D9] pt-2 flex items-center justify-between">
                        <span>{order.items.length} {order.items.length === 1 ? 'ítem' : 'ítems'}</span>
                        <span className="font-mono text-montezzigold font-bold">
                          ${order.total_amount.toLocaleString('es-CO')}
                        </span>
                      </div>

                      {/* Quick status progressor */}
                      <div className="pt-1 flex items-center justify-between text-[10px]">
                        <select
                          value={order.status}
                          onClick={e => e.stopPropagation()}
                          onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className="bg-white border border-[#DDD6C8] text-obsidian px-2 py-1 text-[10px] rounded-xs focus:outline-none focus:border-montezzigold font-mono"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="aprobado">Aprobado</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2DDD4] rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
            <div className="flex items-start justify-between border-b border-[#EAE4D9] pb-4">
              <div>
                <span className="text-xs font-mono text-montezzigold font-bold uppercase tracking-widest block">
                  Detalle de Orden · {selectedOrder.id}
                </span>
                <h3 className="font-serif text-2xl text-obsidian mt-1 font-medium">
                  {selectedOrder.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-obsidian/60 hover:text-montezzigold text-xs font-bold uppercase tracking-wider"
              >
                Cerrar
              </button>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans p-4 bg-[#FAF8F5] border border-[#E2DDD4] rounded-sm">
              <div>
                <span className="text-obsidian/50 uppercase tracking-widest block text-[10px] font-semibold">Correo:</span>
                <span className="text-obsidian font-medium">{selectedOrder.customer_email}</span>
              </div>
              <div>
                <span className="text-obsidian/50 uppercase tracking-widest block text-[10px] font-semibold">Teléfono:</span>
                <span className="text-obsidian font-medium">{selectedOrder.customer_phone || 'No registrado'}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-obsidian/50 uppercase tracking-widest block text-[10px] font-semibold">Dirección de Entrega:</span>
                <span className="text-obsidian font-medium">{selectedOrder.shipping_address}, {selectedOrder.city} ({selectedOrder.department})</span>
              </div>
              {selectedOrder.notes && (
                <div className="sm:col-span-2">
                  <span className="text-obsidian/50 uppercase tracking-widest block text-[10px] font-semibold">Notas de Entrega:</span>
                  <span className="text-obsidian/80 italic">{selectedOrder.notes}</span>
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-widest text-montezzigold font-bold">
                Productos Comprados
              </span>
              <div className="border border-[#E2DDD4] rounded-sm divide-y divide-[#EAE4D9] max-h-48 overflow-y-auto">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-3">
                      <img src={it.image_url} alt="" className="w-10 h-10 object-cover rounded border border-[#DDD6C8] bg-[#F6F4F0]" />
                      <div>
                        <span className="font-mono text-montezzigold text-[10px] block font-bold">{it.code}</span>
                        <span className="text-obsidian font-serif font-medium">{it.name}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-obsidian/60">{it.quantity} x ${it.price.toLocaleString('es-CO')}</span>
                      <span className="block text-montezzigold font-bold">${it.subtotal.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and Status Selector */}
            <div className="pt-4 border-t border-[#EAE4D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-obsidian/50 font-sans tracking-widest block font-semibold">
                  Total de la Orden
                </span>
                <span className="font-mono text-2xl text-montezzigold font-bold">
                  ${selectedOrder.total_amount.toLocaleString('es-CO')} COP
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs text-obsidian/70 font-sans uppercase font-semibold">Cambiar Estado:</label>
                <select
                  value={selectedOrder.status}
                  onChange={e => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs px-3 py-2 rounded focus:outline-none focus:border-montezzigold uppercase font-mono"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="aprobado">Aprobado</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
