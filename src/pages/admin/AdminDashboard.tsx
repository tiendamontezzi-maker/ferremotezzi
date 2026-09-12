import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { InventoryManagement } from './InventoryManagement';
import { OrdersKanban } from './OrdersKanban';
import { BrandLogo } from '../../components/ui/BrandLogo';
import {
  Package, DollarSign, AlertTriangle, ShoppingCart, Users,
  Layers, ShieldAlert, Sparkles, LogOut, Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, role, switchRole, logout } = useAuth();
  const { products, orders, wholesaleLeads } = useProducts();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'leads'>('inventory');

  // Key KPI Metrics calculation
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock <= (p.min_stock_alert ?? 8)).length;
  const inventoryTotalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalOrdersAmount = orders.reduce((sum, o) => sum + o.total_amount, 0);

  // Access Control: Client role check
  if (role === 'cliente') {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6 bg-[#FAF8F5]">
        <div className="w-16 h-16 rounded-full bg-white border border-amber-500/40 flex items-center justify-center mx-auto text-amber-500 shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-obsidian">Acceso Restringido</h1>
        <p className="text-xs text-obsidian/70 font-sans leading-relaxed">
          Tu usuario actual tiene rol de <strong>Cliente / Profesional</strong>. Las funciones de inventario, edición de precios y despacho requieren permisos de <strong>Administrador</strong> o <strong>Colaborador</strong>.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => switchRole('admin')}
            className="w-full sm:w-auto px-6 py-2.5 bg-montezzigold text-white text-xs font-bold uppercase tracking-widest hover:bg-montezzigold-dark transition-all shadow-xs"
          >
            Cambiar a Rol Administrador
          </button>
          <button
            onClick={() => switchRole('colaborador')}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-[#DDD6C8] text-obsidian text-xs uppercase tracking-widest hover:border-montezzigold transition-all shadow-xs"
          >
            Cambiar a Colaborador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-[#FAF8F5]">
      {/* Top Banner & User Profile */}
      <div className="bg-white border border-[#E2DDD4] p-6 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-montezzigold uppercase bg-[#FAF8F5] border border-[#DDD6C8] px-2 py-0.5 rounded-xs font-semibold">
              Panel de Control Montezzi · Sistema 2026
            </span>
            <span className="text-[10px] font-mono uppercase bg-montezzigold text-white font-bold px-2 py-0.5 rounded-xs">
              Rol: {role}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-obsidian font-medium">
            {user?.full_name || 'Dirección de Operaciones'}
          </h1>
          <p className="text-xs text-obsidian/60 font-sans">
            Showroom Medellín & Bodega Central · Portafolio oficial KDJ-1 al KDJ-112
          </p>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-obsidian/70 block">{user?.email}</span>
            <span className="text-[10px] text-obsidian/50 font-mono">{user?.company}</span>
          </div>
          <button
            onClick={logout}
            className="p-2 text-obsidian/50 hover:text-red-500 hover:bg-[#FAF8F5] rounded transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total References */}
        <div className="p-5 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-montezzigold">
            <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-obsidian/60">
              Referencias Catálogo
            </span>
            <Package className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="font-mono text-3xl text-obsidian font-medium">
            {totalProducts}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            KDJ-1 a KDJ-112 precargados
          </span>
        </div>

        {/* Inventory Value */}
        <div className="p-5 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-montezzigold">
            <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-obsidian/60">
              Valor en Bodega
            </span>
            <DollarSign className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl text-montezzigold font-medium">
            ${(inventoryTotalValue / 1000000).toFixed(1)}M <span className="text-xs font-sans text-obsidian/60">COP</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Liquidación de inventario activo
          </span>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-5 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-obsidian/60">
              Alertas de Stock
            </span>
            <AlertTriangle className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="font-mono text-3xl text-amber-600 font-medium">
            {lowStockCount}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Referencias con &lt; 8 unidades
          </span>
        </div>

        {/* Orders Placed */}
        <div className="p-5 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-montezzigold">
            <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-obsidian/60">
              Órdenes Registradas
            </span>
            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="font-mono text-3xl text-obsidian font-medium">
            {orders.length}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            ${(totalOrdersAmount / 1000000).toFixed(2)}M COP procesados
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#E2DDD4] flex gap-6 text-xs uppercase tracking-widest font-sans">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'inventory'
              ? 'text-montezzigold font-bold'
              : 'text-obsidian/60 hover:text-obsidian'
          }`}
        >
          <span>Control de Inventario (KDJ)</span>
          {activeTab === 'inventory' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-montezzigold" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'text-montezzigold font-bold'
              : 'text-obsidian/60 hover:text-obsidian'
          }`}
        >
          <span>Gestión de Pedidos</span>
          <span className="px-1.5 py-0.2 bg-[#FAF8F5] border border-[#DDD6C8] text-montezzigold rounded text-[10px] font-mono">
            {orders.length}
          </span>
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-montezzigold" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 relative transition-colors flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'text-montezzigold font-bold'
              : 'text-obsidian/60 hover:text-obsidian'
          }`}
        >
          <span>Prospectos Mayoristas (B2B)</span>
          <span className="px-1.5 py-0.2 bg-[#FAF8F5] border border-[#DDD6C8] text-montezzigold rounded text-[10px] font-mono">
            {wholesaleLeads.length}
          </span>
          {activeTab === 'leads' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-montezzigold" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'inventory' && <InventoryManagement />}
      {activeTab === 'orders' && <OrdersKanban />}
      {activeTab === 'leads' && (
        <div className="bg-white border border-[#E2DDD4] rounded-sm p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-xl text-obsidian font-medium">
            Solicitudes de Distribución y Atención Especializada
          </h3>
          {wholesaleLeads.length === 0 ? (
            <p className="text-xs text-obsidian/50 py-8 text-center font-sans italic">
              No hay solicitudes registradas aún. Las solicitudes enviadas desde la página oficial de distribución aparecerán aquí.
            </p>
          ) : (
            <div className="divide-y divide-[#EAE4D9]">
              {wholesaleLeads.map(lead => (
                <div key={lead.id} className="py-4 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-obsidian text-sm">{lead.full_name} · {lead.company}</span>
                    <span className="text-[10px] font-mono text-montezzigold uppercase bg-[#FAF8F5] border border-[#DDD6C8] px-2 py-0.5 rounded">
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-obsidian/70 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div><strong>Ciudad:</strong> {lead.city}</div>
                    <div><strong>Teléfono:</strong> {lead.phone}</div>
                    <div><strong>Email:</strong> {lead.email}</div>
                    <div><strong>Tipo de negocio:</strong> {lead.business_type}</div>
                    <div><strong>Volumen estimado:</strong> {lead.estimated_volume}</div>
                    <div><strong>Interés:</strong> {lead.interested_products}</div>
                  </div>
                  <p className="p-3 bg-[#FAF8F5] border border-[#E2DDD4] text-obsidian/90 rounded text-xs mt-1">
                    "{lead.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
