import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { InventoryManagement } from './InventoryManagement';
import { OrdersKanban } from './OrdersKanban';
import { ProductAnalyticsTab } from './ProductAnalyticsTab';
import { AbandonedCartsTab } from './AbandonedCartsTab';
import { UserManagementTab } from './UserManagementTab';
import { CreateOrderModal } from './CreateOrderModal';
import { CreateUserModal } from './CreateUserModal';
import {
  Package, DollarSign, AlertCircle, ShoppingCart, Users,
  ShieldAlert, LogOut, Plus, MousePointerClick,
  FileSpreadsheet, Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, role, switchRole, logout, systemUsers } = useAuth();
  const { products, orders, wholesaleLeads, abandonedCarts, productClickAnalytics } = useProducts();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'analytics' | 'abandoned_carts' | 'users' | 'inventory' | 'leads'
  >('analytics');

  // Modals state
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Key KPI Calculations
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock <= (p.min_stock_alert ?? 8)).length;
  const totalOrdersAmount = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalProductClicks = productClickAnalytics.reduce((sum, p) => sum + p.clicks, 0);
  const totalValueAtRisk = abandonedCarts
    .filter(c => c.status === 'abandonado')
    .reduce((sum, c) => sum + c.total_amount, 0);

  // Access Control: Client role check
  if (role === 'cliente') {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6 bg-white">
        <div className="w-16 h-16 rounded-full bg-white border border-black/20 flex items-center justify-center mx-auto text-black shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl text-obsidian uppercase font-bold tracking-wider">
          Acceso Restringido
        </h1>
        <p className="text-xs text-obsidian/70 font-sans leading-relaxed">
          Tu usuario actual tiene rol de <strong>Cliente / Profesional</strong>. Las funciones de analítica inteligente, creación de pedidos, carritos abandonados e inventario requieren permisos de <strong>Administrador</strong> o <strong>Colaborador</strong>.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => switchRole('admin')}
            className="w-full sm:w-auto px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/85 transition-all shadow-md"
          >
            Cambiar a Rol Administrador
          </button>
          <button
            onClick={() => switchRole('colaborador')}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-black/20 text-obsidian text-xs uppercase tracking-widest hover:border-black transition-all shadow-xs"
          >
            Cambiar a Colaborador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white min-h-screen">
      {/* Top Banner & Control Center Header */}
      <div className="glass-card p-6 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-4 border-l-[#5A3927]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-black/80 uppercase bg-black/[0.04] border border-black/10 px-2 py-0.5 rounded-xs font-semibold">
              Dashboard Inteligente Montezzi · Sistema 2026
            </span>
            <span className="text-[10px] font-mono uppercase bg-black text-white font-bold px-2 py-0.5 rounded-xs">
              Rol: {role}
            </span>
            <span className="text-[10px] font-mono uppercase bg-[#F2ECE4] text-[#5A3927] border border-[#DDD6C8] px-2 py-0.5 rounded-xs font-medium">
              KDJ-1 al KDJ-112 Sincronizados
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl text-obsidian font-bold uppercase tracking-wider">
            {user?.full_name || 'Dirección de Operaciones & Showroom'}
          </h1>
          <p className="text-xs text-obsidian/60 font-sans">
            Showroom Medellín · Control en tiempo real de interacción de usuarios, pedidos y analítica comercial
          </p>
        </div>

        {/* Global Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsCreateOrderModalOpen(true)}
            className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear Pedido</span>
          </button>

          <button
            onClick={() => setIsCreateUserModalOpen(true)}
            className="px-4 py-2 bg-white text-obsidian border border-black/20 text-xs font-medium uppercase tracking-wider rounded-xs hover:border-black hover:bg-black/[0.02] transition-all shadow-xs flex items-center gap-2"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Crear Usuario</span>
          </button>

          <button
            onClick={logout}
            className="p-2 border border-black/15 bg-white hover:border-black text-obsidian/60 hover:text-black rounded-xs transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div
          onClick={() => setActiveTab('orders')}
          className="glass-card p-5 rounded-sm space-y-1 cursor-pointer hover:border-black/30 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Ventas Facturadas</span>
            <DollarSign className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            ${(totalOrdersAmount / 1000000).toFixed(2)}M <span className="text-xs font-sans font-normal text-obsidian/50">COP</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            {orders.length} pedidos procesados en plataforma
          </span>
        </div>

        {/* Product Clicks & Traction */}
        <div
          onClick={() => setActiveTab('analytics')}
          className="glass-card p-5 rounded-sm space-y-1 cursor-pointer hover:border-black/30 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Productos Más Clickeados</span>
            <MousePointerClick className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {totalProductClicks.toLocaleString('es-CO')} <span className="text-xs font-sans font-normal text-obsidian/50">clics</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Medición de tracción y productos favoritos
          </span>
        </div>

        {/* Abandoned Carts */}
        <div
          onClick={() => setActiveTab('abandoned_carts')}
          className="glass-card p-5 rounded-sm space-y-1 cursor-pointer hover:border-black/30 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Carritos Abandonados</span>
            <ShoppingCart className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-amber-700">
            ${(totalValueAtRisk / 1000000).toFixed(2)}M <span className="text-xs font-sans font-normal text-obsidian/50">COP</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            {abandonedCarts.filter(c => c.status === 'abandonado').length} carritos recuperables vía WhatsApp
          </span>
        </div>

        {/* Inventory Status */}
        <div
          onClick={() => setActiveTab('inventory')}
          className="glass-card p-5 rounded-sm space-y-1 cursor-pointer hover:border-black/30 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Inventario (KDJ)</span>
            {lowStockCount > 0 ? (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            ) : (
              <Package className="w-4 h-4 text-black" />
            )}
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {totalProducts} <span className="text-xs font-sans font-normal text-obsidian/50">refs</span>
            {lowStockCount > 0 && (
              <span className="ml-2 text-xs font-mono font-semibold text-amber-600">({lowStockCount} alertas)</span>
            )}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            KDJ-1 a KDJ-112 en bodega
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-black/[0.08] flex gap-2 sm:gap-6 text-xs uppercase tracking-wider font-sans overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'text-black font-bold'
              : 'text-obsidian/60 hover:text-obsidian font-medium'
          }`}
        >
          <MousePointerClick className="w-3.5 h-3.5" />
          <span>Productos Más Clickeados</span>
          <span className="px-1.5 py-0.2 bg-black text-white rounded-xs text-[10px] font-mono">
            {productClickAnalytics.length}
          </span>
          {activeTab === 'analytics' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'text-black font-bold'
              : 'text-obsidian/60 hover:text-obsidian font-medium'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Gestión de Pedidos</span>
          <span className="px-1.5 py-0.2 bg-black/[0.04] border border-black/15 text-black rounded text-[10px] font-mono font-bold">
            {orders.length}
          </span>
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('abandoned_carts')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'abandoned_carts'
              ? 'text-black font-bold'
              : 'text-obsidian/60 hover:text-obsidian font-medium'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Carritos Abandonados</span>
          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[10px] font-mono font-bold">
            {abandonedCarts.length}
          </span>
          {activeTab === 'abandoned_carts' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'users'
              ? 'text-black font-bold'
              : 'text-obsidian/60 hover:text-obsidian font-medium'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Directorio de Usuarios</span>
          <span className="px-1.5 py-0.2 bg-black/[0.04] border border-black/15 text-black rounded text-[10px] font-mono font-bold">
            {systemUsers.length}
          </span>
          {activeTab === 'users' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'inventory'
              ? 'text-black font-bold'
              : 'text-obsidian/60 hover:text-obsidian font-medium'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Control Inventario (KDJ)</span>
          {activeTab === 'inventory' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'leads'
              ? 'text-black font-bold'
              : 'text-obsidian/60 hover:text-obsidian font-medium'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Prospectos B2B</span>
          <span className="px-1.5 py-0.2 bg-black/[0.04] border border-black/15 text-black rounded text-[10px] font-mono font-bold">
            {wholesaleLeads.length}
          </span>
          {activeTab === 'leads' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="animate-in fade-in duration-150">
        {activeTab === 'analytics' && <ProductAnalyticsTab />}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans text-lg font-bold text-obsidian uppercase tracking-wider">
                  Tablero de Despachos & Logística
                </h3>
                <p className="text-xs text-obsidian/60 font-sans">
                  Gestión integral de pedidos recibidos por web, showroom y cotizaciones telefónicas
                </p>
              </div>
              <button
                onClick={() => setIsCreateOrderModalOpen(true)}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Crear Nuevo Pedido</span>
              </button>
            </div>
            <OrdersKanban />
          </div>
        )}

        {activeTab === 'abandoned_carts' && <AbandonedCartsTab />}

        {activeTab === 'users' && <UserManagementTab />}

        {activeTab === 'inventory' && <InventoryManagement />}

        {activeTab === 'leads' && (
          <div className="bg-white border border-black/10 rounded-sm p-6 space-y-4 shadow-xs">
            <h3 className="font-sans text-lg text-obsidian font-bold uppercase tracking-wider">
              Solicitudes de Distribución y Atención Especializada B2B
            </h3>
            {wholesaleLeads.length === 0 ? (
              <p className="text-xs text-obsidian/50 py-8 text-center font-sans italic">
                No hay solicitudes registradas aún. Las solicitudes enviadas desde la página oficial de distribución aparecerán aquí.
              </p>
            ) : (
              <div className="divide-y divide-black/5">
                {wholesaleLeads.map(lead => (
                  <div key={lead.id} className="py-4 space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-obsidian text-sm">{lead.full_name} · {lead.company}</span>
                      <span className="text-[10px] font-mono text-black uppercase bg-black/5 border border-black/10 px-2 py-0.5 rounded">
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
                    <p className="p-3 bg-black/[0.02] border border-black/10 text-obsidian/90 rounded text-xs mt-1">
                      "{lead.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
        onOrderCreated={() => {
          setActiveTab('orders');
        }}
      />

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onUserCreated={() => {
          setActiveTab('users');
        }}
      />
    </div>
  );
};
