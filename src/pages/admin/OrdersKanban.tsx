import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Order, OrderStatus } from '../../types/database';
import { exportToCSV, exportToJSON } from '../../utils/csvExportImport';
import {
  Clock, CheckCircle2, Truck, PackageCheck, XCircle, Eye, Phone, Mail,
  MapPin, Download, FileCode, ShoppingBag, DollarSign, TrendingUp
} from 'lucide-react';

const COLUMNS: { status: OrderStatus; label: string; icon: any; color: string; pillBg: string }[] = [
  { status: 'pendiente', label: 'Pendiente Pago', icon: Clock, color: 'text-[#D97706]', pillBg: 'bg-[#FFFBEB] text-[#D97706]' },
  { status: 'aprobado', label: 'Aprobado / Alistando', icon: CheckCircle2, color: 'text-[#0284C7]', pillBg: 'bg-[#F0F9FF] text-[#0284C7]' },
  { status: 'enviado', label: 'En Tránsito', icon: Truck, color: 'text-[#6D28D9]', pillBg: 'bg-[#F3EFFE] text-[#6D28D9]' },
  { status: 'entregado', label: 'Entregado', icon: PackageCheck, color: 'text-[#10B981]', pillBg: 'bg-[#ECFDF5] text-[#10B981]' },
  { status: 'cancelado', label: 'Cancelado', icon: XCircle, color: 'text-[#EF4444]', pillBg: 'bg-[#FEF2F2] text-[#EF4444]' },
];

export const OrdersKanban: React.FC = () => {
  const { orders, products, updateOrderStatus } = useProducts();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Top KPI Metrics
  const totalOrders = orders.length;
  const pendingDispatchCount = orders.filter(o => o.status === 'pendiente' || o.status === 'aprobado').length;
  const deliveredCount = orders.filter(o => o.status === 'entregado').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelado')
    .reduce((sum, o) => sum + o.total_amount, 0);

  // Helper to resolve product image from catalog by product_id, code, or name
  const resolveItemImage = (item: Order['items'][number]) => {
    const match = products.find(
      p =>
        p.id === item.product_id ||
        p.code.toLowerCase() === (item.code || '').toLowerCase() ||
        p.name.toLowerCase() === (item.name || '').toLowerCase()
    );
    return match?.image_url || '/images/products/kdj-60.jpg';
  };

  const handleExportOrdersCSV = () => {
    exportToCSV('montezzi_pedidos_clientes', orders, [
      { header: 'No. Orden', key: 'id' },
      { header: 'Fecha Pedido', key: 'created_at' },
      { header: 'Estado', key: 'status' },
      { header: 'Cliente', key: 'customer_name' },
      { header: 'Email Cliente', key: 'customer_email' },
      { header: 'Teléfono', key: 'customer_phone' },
      { header: 'Ciudad', key: 'city' },
      { header: 'Dirección de Entrega', key: 'shipping_address' },
      { header: 'Total Pagado (COP)', key: 'total_amount' },
      {
        header: 'Productos Solicitados',
        key: (o) => o.items.map(i => `${i.quantity}x ${i.code} (${i.name})`).join(' | ')
      }
    ]);
  };

  const handleExportOrdersJSON = () => {
    exportToJSON('montezzi_pedidos_api_ready', orders);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ============================================================ */}
      {/* 1. TOP SUMMARY KPI CARDS (En Español y Pesos Colombianos)     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total de Pedidos</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalOrders}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
            <span>+8.2% Este mes</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Pendientes & Alistando</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {pendingDispatchCount}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Requieren alistamiento y despacho
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Pedidos Entregados</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {deliveredCount}
          </div>
          <div className="text-[11px] font-medium text-[#10B981]">
            Entregas completadas con éxito
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Volumen de Ventas Activo</span>
            <div className="w-8 h-8 rounded-full bg-[#F3EFFE] text-[#6D28D9] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight my-1">
            ${totalRevenue.toLocaleString('es-CO')}{' '}
            <span className="text-xs font-normal text-[#71717A]">COP</span>
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Pesos colombianos en pedidos activos
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TOP EXPORT BAR                                            */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-[#EAE7E1] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div>
          <h3 className="font-sans text-sm font-bold text-[#18181B]">
            Tablero Logístico de Pedidos & Despachos
          </h3>
          <p className="text-xs text-[#71717A]">
            Gestiona el ciclo de vida de cada pedido con previsualización de productos y sincronización de estados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportOrdersCSV}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={handleExportOrdersJSON}
            className="px-4 py-2 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON API</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. KANBAN BOARD COLUMNS                                      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {COLUMNS.map(col => {
          const colOrders = orders.filter(o => o.status === col.status);
          const Icon = col.icon;

          return (
            <div
              key={col.status}
              className="bg-[#FAF9F7] border border-[#EAE7E1] rounded-2xl p-3.5 flex flex-col h-[640px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE7E1]">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${col.color}`} />
                  <h4 className="text-xs font-sans font-bold text-[#18181B]">
                    {col.label}
                  </h4>
                </div>
                <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full ${col.pillBg}`}>
                  {colOrders.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colOrders.length === 0 ? (
                  <div className="h-32 flex items-center justify-center border border-dashed border-[#E4E4E7] rounded-2xl text-xs text-[#A1A1AA]">
                    Sin pedidos en esta etapa
                  </div>
                ) : (
                  colOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white border border-[#EAE7E1] hover:border-black/25 rounded-2xl p-4 space-y-3 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[11px] text-[#18181B] font-semibold bg-[#F4F4F5] px-2 py-0.5 rounded-lg">
                          {order.order_ref || order.id}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#A1A1AA] hover:text-[#18181B] p-1 rounded-lg hover:bg-[#F4F4F5] transition-colors"
                          title="Ver detalle del pedido"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <div className="font-sans font-bold text-xs text-[#18181B] truncate">
                          {order.customer_name}
                        </div>
                        <div className="text-[11px] text-[#71717A] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#A1A1AA]" />
                          <span>{order.city}</span>
                        </div>
                      </div>

                      {/* Product Thumbnails Preview Strip inside Card */}
                      {order.items && order.items.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 bg-[#FAF9F7] border border-[#F0EFEA] rounded-xl p-1.5"
                            >
                              <img
                                src={resolveItemImage(item)}
                                alt={item.name}
                                className="w-8 h-8 rounded-lg object-contain bg-white border border-[#EAE7E1] p-0.5 shrink-0"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-semibold text-[#18181B] truncate">
                                  {item.name}
                                </div>
                                <div className="text-[10px] text-[#71717A] font-mono">
                                  {item.quantity}x · {item.code}
                                </div>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-[10px] text-[#71717A] font-medium pl-1">
                              +{order.items.length - 2} producto(s) adicional(es)
                            </div>
                          )}
                        </div>
                      )}

                      <div className="pt-2 border-t border-[#F4F4F5] flex items-center justify-between">
                        <span className="text-[11px] text-[#71717A]">
                          {order.items.reduce((sum, i) => sum + i.quantity, 0)} unids
                        </span>
                        <span className="font-sans text-xs font-bold text-[#18181B]">
                          ${order.total_amount.toLocaleString('es-CO')} COP
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="pt-1">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="w-full bg-[#F4F4F5] hover:bg-[#EAEAEA] border border-transparent focus:border-black/20 focus:bg-white rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-[#18181B] focus:outline-none cursor-pointer transition-all"
                        >
                          {COLUMNS.map(c => (
                            <option key={c.status} value={c.status}>
                              Mover a: {c.label}
                            </option>
                          ))}
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

      {/* ============================================================ */}
      {/* 4. ORDER DETAIL MODAL WITH PRODUCT PHOTOS                    */}
      {/* ============================================================ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#EAE7E1] w-full max-w-xl rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#F0EFEA] pb-4">
              <div>
                <span className="text-[11px] font-mono font-semibold text-[#71717A] bg-[#F4F4F5] px-2.5 py-1 rounded-full">
                  Detalle de Orden · {selectedOrder.order_ref || selectedOrder.id}
                </span>
                <h3 className="font-sans text-xl font-bold text-[#18181B] mt-2 normal-case">
                  {selectedOrder.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3 py-1.5 rounded-full bg-[#F4F4F5] hover:bg-[#EAEAEA] text-xs font-semibold text-[#18181B] transition-colors"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAF9F7] p-4 rounded-2xl border border-[#EAE7E1]">
              <div className="flex items-center gap-2 text-[#52525B]">
                <Mail className="w-4 h-4 text-[#18181B]" />
                <span className="truncate">{selectedOrder.customer_email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#52525B]">
                <Phone className="w-4 h-4 text-[#18181B]" />
                <span>{selectedOrder.customer_phone}</span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2 text-[#52525B]">
                <MapPin className="w-4 h-4 text-[#18181B] shrink-0" />
                <span>
                  {selectedOrder.shipping_address} — <strong>{selectedOrder.city}</strong>
                </span>
              </div>
            </div>

            {/* Items List with Product Thumbnails */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-sans font-bold text-[#71717A]">
                Productos en el Pedido
              </h4>
              <div className="divide-y divide-[#F4F4F5] border border-[#EAE7E1] rounded-2xl overflow-hidden bg-white">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={resolveItemImage(item)}
                        alt={item.name}
                        className="w-11 h-11 rounded-xl object-contain bg-[#FAF9F7] border border-[#EAE7E1] p-1 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-semibold text-[#71717A] bg-[#F4F4F5] px-2 py-0.5 rounded-md">
                          {item.code}
                        </span>
                        <div className="text-[#18181B] font-semibold mt-0.5 truncate">
                          {item.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-sans shrink-0">
                      <div className="text-[#71717A] text-[11px]">
                        {item.quantity} × ${item.price.toLocaleString('es-CO')}
                      </div>
                      <div className="text-[#18181B] font-bold">
                        ${(item.quantity * item.price).toLocaleString('es-CO')} COP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Total & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#F0EFEA]">
              <div>
                <span className="text-xs text-[#71717A] block">Total del Pedido</span>
                <span className="text-2xl font-sans font-bold text-[#18181B]">
                  ${selectedOrder.total_amount.toLocaleString('es-CO')} COP
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#71717A]">Estado:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as OrderStatus;
                    updateOrderStatus(selectedOrder.id, nextStatus);
                    setSelectedOrder({ ...selectedOrder, status: nextStatus });
                  }}
                  className="bg-[#18181B] text-white rounded-full px-4 py-2 text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  {COLUMNS.map(c => (
                    <option key={c.status} value={c.status}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
