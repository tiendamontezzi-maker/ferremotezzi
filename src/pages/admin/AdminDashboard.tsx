import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { BrandLogo } from '../../components/ui/BrandLogo';
import { InventoryManagement } from './InventoryManagement';
import { OrdersKanban } from './OrdersKanban';
import { ProductAnalyticsTab } from './ProductAnalyticsTab';
import { AbandonedCartsTab } from './AbandonedCartsTab';
import { UserManagementTab } from './UserManagementTab';
import { PieChartsDashboard } from './PieChartsDashboard';
import { ElectronicBillingTab } from './ElectronicBillingTab';
import { ActivityLogsTab } from './ActivityLogsTab';
import { AppointmentsTab } from './AppointmentsTab';
import { CreateOrderModal } from './CreateOrderModal';
import { CreateUserModal } from './CreateUserModal';
import {
  PieChart as PieIcon, MousePointerClick, ShoppingBag, ShoppingCart,
  Users, Package, FileText, FileSpreadsheet, Plus, ShieldAlert,
  LogOut, Menu, X, ChevronRight, Sparkles, Building2, MapPin, UserCheck,
  Calendar, ShieldCheck
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'analytics'
  | 'orders'
  | 'abandoned_carts'
  | 'users'
  | 'inventory'
  | 'billing'
  | 'appointments'
  | 'logs'
  | 'leads';

export const AdminDashboard: React.FC = () => {
  const { user, role, switchRole, logout, systemUsers } = useAuth();
  const { products, orders, wholesaleLeads, abandonedCarts, productClickAnalytics, appointments, activityLogs } = useProducts();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Calculations for sidebar badges
  const lowStockCount = products.filter(p => p.stock <= (p.min_stock_alert ?? 8)).length;
  const abandonedCartsCount = abandonedCarts.filter(c => c.status === 'abandonado').length;

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

  // Navigation Items Definition
  const NAV_ITEMS: {
    id: AdminTab;
    label: string;
    icon: any;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Resumen & Tortas',
      icon: PieIcon,
      badge: '5 Gráficos',
      badgeColor: 'bg-black text-white'
    },
    {
      id: 'analytics',
      label: 'Más Clickeados',
      icon: MousePointerClick,
      badge: `${productClickAnalytics.length} refs`,
      badgeColor: 'bg-black/[0.05] text-black border border-black/10'
    },
    {
      id: 'orders',
      label: 'Gestión de Pedidos',
      icon: ShoppingBag,
      badge: orders.length,
      badgeColor: 'bg-black/[0.05] text-black border border-black/10'
    },
    {
      id: 'abandoned_carts',
      label: 'Carritos Abandonados',
      icon: ShoppingCart,
      badge: abandonedCartsCount > 0 ? `${abandonedCartsCount} en riesgo` : '0',
      badgeColor: abandonedCartsCount > 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-black/5 text-obsidian/60'
    },
    {
      id: 'users',
      label: 'Directorio Clientes',
      icon: Users,
      badge: systemUsers.length,
      badgeColor: 'bg-black/[0.05] text-black border border-black/10'
    },
    {
      id: 'inventory',
      label: 'Control Inventario',
      icon: Package,
      badge: lowStockCount > 0 ? `${lowStockCount} alertas` : `${products.length} KDJ`,
      badgeColor: lowStockCount > 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-black/5 text-obsidian/60'
    },
    {
      id: 'billing',
      label: 'Facturación DIAN',
      icon: FileText,
      badge: 'API Ready',
      badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    },
    {
      id: 'appointments',
      label: 'Citas Showroom',
      icon: Calendar,
      badge: appointments.length > 0 ? `${appointments.length} citas` : '0',
      badgeColor: 'bg-black/[0.05] text-black border border-black/10'
    },
    {
      id: 'logs',
      label: 'Auditoría & Logs',
      icon: ShieldCheck,
      badge: `${activityLogs.length} logs`,
      badgeColor: 'bg-black text-white'
    },
    {
      id: 'leads',
      label: 'Prospectos B2B',
      icon: FileSpreadsheet,
      badge: wholesaleLeads.length,
      badgeColor: 'bg-black/[0.05] text-black border border-black/10'
    }
  ];

  const currentTabInfo = NAV_ITEMS.find(i => i.id === activeTab);

  // Initials for Asesor Avatar
  const asesorName = user?.full_name || 'Carlos Mendoza';
  const asesorInitials = asesorName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');

  const asesorRoleLabel =
    role === 'admin'
      ? 'Director General / Administrador'
      : role === 'colaborador'
      ? 'Asesor Comercial / Showroom'
      : 'Cliente / Arquitecto';

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b border-black/10 p-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 border border-black/15 rounded-xs hover:border-black text-obsidian"
            title="Abrir menú lateral"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-obsidian">
            {currentTabInfo?.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5 rounded-xs">
            {role}
          </span>
          <button
            onClick={() => setIsCreateOrderModalOpen(true)}
            className="p-2 bg-black text-white rounded-xs"
            title="Crear Pedido"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* SIDEBAR COMPONENT (Desktop Sticky + Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 sm:w-80 bg-white border-r border-black/10 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 overflow-y-auto ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold tracking-[0.2em] text-sm text-obsidian uppercase">
                  MONTEZZI
                </span>
                <span className="text-[9px] font-mono text-[#5A3927] bg-[#F2ECE4] border border-[#DDD6C8] px-1.5 py-0.2 rounded-xs font-semibold">
                  2026
                </span>
              </div>
              <span className="text-[10px] font-mono text-obsidian/50 tracking-wider block mt-0.5">
                Panel de Control & Inteligencia
              </span>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-1.5 text-obsidian/50 hover:text-black rounded-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ASESOR PROFILE CARD (Prominently loads name and role) */}
          <div className="p-4 bg-gradient-to-br from-[#FAF9F7] to-white border border-black/10 rounded-sm space-y-3 relative overflow-hidden shadow-xs">
            {/* Subtle Wood Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5A3927] via-[#8B5A3E] to-[#C5A880]" />

            <div className="flex items-start gap-3">
              {/* Asesor Avatar with Initials */}
              <div className="w-11 h-11 rounded-xs bg-[#11100F] text-[#FAF8F5] flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-sm shrink-0 border border-black/20">
                {asesorInitials}
              </div>

              {/* Asesor Details */}
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A3927] font-semibold block">
                  Asesor Conectado
                </span>
                <h4 className="font-sans font-bold text-xs text-obsidian truncate uppercase tracking-wide">
                  {asesorName}
                </h4>
                <span className="inline-block mt-1 text-[9px] font-mono uppercase px-2 py-0.5 rounded-xs font-bold bg-black text-white tracking-wider">
                  {role}
                </span>
              </div>
            </div>

            {/* Asesor Sub-details */}
            <div className="pt-2 border-t border-black/5 text-[11px] font-sans space-y-1 text-obsidian/65">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3 h-3 text-[#5A3927] shrink-0" />
                <span className="truncate">Showroom El Poblado · Medellín</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-obsidian/50">
                <span className="truncate">{user?.email || 'operaciones@montezzi.com'}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Activo
                </span>
              </div>
            </div>

            {/* Quick Role Switcher for Testing */}
            <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[10px] font-mono">
              <span className="text-obsidian/40 uppercase tracking-wider">Cambiar a:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => switchRole('admin')}
                  className={`px-1.5 py-0.5 rounded-xs uppercase tracking-wider transition-colors ${
                    role === 'admin'
                      ? 'bg-black text-white font-bold'
                      : 'bg-black/5 text-obsidian/60 hover:bg-black/10'
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('colaborador')}
                  className={`px-1.5 py-0.5 rounded-xs uppercase tracking-wider transition-colors ${
                    role === 'colaborador'
                      ? 'bg-black text-white font-bold'
                      : 'bg-black/5 text-obsidian/60 hover:bg-black/10'
                  }`}
                >
                  Asesor
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-obsidian/40 font-semibold block px-2 mb-2">
              Navegación del Sistema
            </span>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs text-xs font-sans transition-all text-left ${
                    isActive
                      ? 'bg-black text-white font-bold shadow-xs'
                      : 'text-obsidian/75 hover:bg-black/[0.04] hover:text-black font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-obsidian/60'}`} />
                    <span className="truncate uppercase tracking-wider text-[11px]">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-xs shrink-0 ${
                        isActive ? 'bg-white/20 text-white font-medium' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Quick Actions & Logout */}
        <div className="p-4 border-t border-black/10 space-y-2 bg-[#FAFAFA]">
          <button
            onClick={() => setIsCreateOrderModalOpen(true)}
            className="w-full py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Crear Pedido</span>
          </button>

          <button
            onClick={() => setIsCreateUserModalOpen(true)}
            className="w-full py-2 bg-white border border-black/20 text-obsidian hover:border-black text-xs font-medium uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>+ Crear Usuario</span>
          </button>

          <button
            onClick={logout}
            className="w-full pt-2 flex items-center justify-center gap-1.5 text-[11px] font-sans text-obsidian/50 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 bg-white flex flex-col min-h-screen">
        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-black/10 bg-white sticky top-0 z-20 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-obsidian/50">
              <span>Panel Montezzi</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black font-bold">{currentTabInfo?.label}</span>
            </div>
            <h1 className="font-sans text-xl font-bold text-obsidian uppercase tracking-wider mt-0.5">
              {currentTabInfo?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-sans text-obsidian/60">
              Asesor: <strong className="text-black font-medium">{asesorName}</strong>
            </span>
            <span className="text-obsidian/20">|</span>
            <button
              onClick={() => setIsCreateOrderModalOpen(true)}
              className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Crear Pedido</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <div className="p-4 sm:p-8 flex-1">
          {activeTab === 'overview' && <PieChartsDashboard />}

          {activeTab === 'analytics' && <ProductAnalyticsTab />}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-base font-bold text-obsidian uppercase tracking-wider">
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

          {activeTab === 'billing' && <ElectronicBillingTab />}

          {activeTab === 'appointments' && <AppointmentsTab />}

          {activeTab === 'logs' && <ActivityLogsTab />}

          {activeTab === 'leads' && (
            <div className="bg-white border border-black/10 rounded-sm p-6 space-y-4 shadow-xs">
              <h3 className="font-sans text-base text-obsidian font-bold uppercase tracking-wider">
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
      </main>

      {/* Global Modals */}
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
