import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { OverviewDashboard } from './OverviewDashboard';
import { OrdersKanban } from './OrdersKanban';
import { InventoryManagement } from './InventoryManagement';
import { CategoriesTab } from './CategoriesTab';
import { UserManagementTab } from './UserManagementTab';
import { ReviewsTab } from './ReviewsTab';
import { DiscountsTab } from './DiscountsTab';
import { ProductAnalyticsTab } from './ProductAnalyticsTab';
import { MarketingTab } from './MarketingTab';
import { ElectronicBillingTab } from './ElectronicBillingTab';
import { AppointmentsTab } from './AppointmentsTab';
import { ActivityLogsTab } from './ActivityLogsTab';
import { CreateOrderModal } from './CreateOrderModal';
import { CreateUserModal } from './CreateUserModal';
import { ProductFormModal } from './ProductFormModal';
import {
  LayoutDashboard, ShoppingBag, Package, Layers, Users, Star,
  Percent, BarChart3, Megaphone, Settings, Plus, Search, Bell,
  ChevronDown, ShieldAlert, Menu, X, LogOut, Calendar, ShieldCheck,
  Check
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'orders'
  | 'inventory'
  | 'categories'
  | 'users'
  | 'reviews'
  | 'discounts'
  | 'analytics'
  | 'marketing'
  | 'settings'
  | 'billing'
  | 'appointments'
  | 'logs';

export const AdminDashboard: React.FC = () => {
  const { user, role, switchRole, logout, systemUsers } = useAuth();
  const { products, orders, coupons, reviews, appointments, activityLogs } = useProducts();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Modals state
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Quick search results across Products, Orders & Customers
  const q = searchQuery.trim().toLowerCase();
  const matchedProducts = q
    ? products
        .filter(
          p =>
            p.code.toLowerCase().includes(q) ||
            p.name.toLowerCase().includes(q) ||
            (p.category || '').toLowerCase().includes(q)
        )
        .slice(0, 4)
    : [];
  const matchedOrders = q
    ? orders
        .filter(
          o =>
            o.id.toLowerCase().includes(q) ||
            (o.order_ref || '').toLowerCase().includes(q) ||
            o.customer_name.toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];
  const matchedUsers = q
    ? systemUsers
        .filter(
          u =>
            u.full_name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            (u.company || '').toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];

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
          Tu usuario actual tiene rol de <strong>Cliente / Profesional</strong>. Las funciones administrativas requieren permisos de <strong>Administrador</strong> o <strong>Colaborador</strong>.
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

  // Sidebar navigation items (en Español, manteniendo la estética del diseño de referencia)
  const SIDEBAR_ITEMS: {
    id: AdminTab;
    label: string;
    icon: any;
    badge?: number | string;
  }[] = [
    { id: 'overview', label: 'Panel Principal', icon: LayoutDashboard },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag, badge: orders.length || 24 },
    { id: 'inventory', label: 'Productos & Stock', icon: Package, badge: products.length || 48 },
    { id: 'categories', label: 'Categorías', icon: Layers },
    { id: 'users', label: 'Clientes', icon: Users, badge: 32 },
    { id: 'reviews', label: 'Reseñas', icon: Star, badge: reviews.length || 14 },
    { id: 'discounts', label: 'Descuentos', icon: Percent },
    { id: 'analytics', label: 'Analítica', icon: BarChart3 },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const currentTabLabel =
    activeTab === 'overview'
      ? 'Panel Principal'
      : activeTab === 'appointments'
      ? 'Citas Showroom'
      : activeTab === 'billing'
      ? 'Facturación Electrónica DIAN'
      : activeTab === 'logs'
      ? 'Auditoría del Sistema'
      : SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label || 'Panel Montezzi';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCEAE2]/60 via-[#F7F4F0] to-[#E5EDF4]/60 p-2 sm:p-5 lg:p-7 flex items-center justify-center font-sans antialiased">
      {/* Main Elevated Card Canvas with soft rounded corners */}
      <div className="w-full max-w-[1540px] bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] border border-black/[0.04] flex flex-col md:flex-row overflow-hidden min-h-[920px]">
        
        {/* Mobile Header Bar */}
        <div className="md:hidden bg-white border-b border-[#F0EFEA] p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 border border-black/10 rounded-xl hover:border-black text-black"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-sans font-bold text-base text-[#18181B] tracking-tight">
              Montezzi
            </span>
          </div>

          <button
            onClick={() => setIsCreateOrderModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#18181B] text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Pedido</span>
          </button>
        </div>

        {/* Mobile Drawer Backdrop */}
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          />
        )}

        {/* ============================================================ */}
        {/* LEFT SIDEBAR (Identical to UI design in user reference photo) */}
        {/* ============================================================ */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-50 w-64 sm:w-72 bg-white border-r border-[#F0EFEA] p-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <span className="font-sans font-extrabold text-2xl tracking-tight text-[#18181B]">
                Montezzi
              </span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden p-1 text-[#71717A] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu List */}
            <nav className="space-y-1.5">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs transition-all text-left group ${
                      isActive
                        ? 'bg-[#18181B] text-white font-semibold shadow-xs'
                        : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-[#71717A] group-hover:text-[#18181B]'
                      }`} />
                      <span className="text-[13px]">{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className={`text-[11px] font-sans font-medium px-2 py-0.5 rounded-full ${
                        isActive ? 'text-white/80' : 'text-[#A1A1AA]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Extra Operational Links (Appointments & Billing) */}
              <div className="pt-4 mt-4 border-t border-[#F0EFEA] space-y-1">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs transition-colors ${
                    activeTab === 'appointments' ? 'bg-[#18181B] text-white font-semibold' : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[12px]">Showroom Citas</span>
                  </div>
                  <span className="text-[10px] text-[#A1A1AA]">{appointments.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('billing')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs transition-colors ${
                    activeTab === 'billing' ? 'bg-[#18181B] text-white font-semibold' : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[12px]">Facturación DIAN</span>
                  </div>
                  <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">API</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Bottom Sidebar Action (+ Agregar Producto Pill Button) */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => setIsCreateProductModalOpen(true)}
              className="w-full py-3 bg-[#18181B] hover:bg-black text-white font-sans font-semibold text-xs rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>

            <button
              onClick={logout}
              className="w-full text-center text-[11px] text-[#A1A1AA] hover:text-red-600 transition-colors flex items-center justify-center gap-1.5 pt-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* RIGHT / MAIN CONTENT AREA                                   */}
        {/* ============================================================ */}
        <main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8 overflow-y-auto">
          {/* Top Bar */}
          <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-2">
            <div>
              <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight normal-case">
                {currentTabLabel}
              </h1>
              <p className="text-xs text-[#71717A] font-sans mt-0.5">
                ¡Bienvenido de nuevo! Esto es lo que está ocurriendo en tu tienda hoy.
              </p>
            </div>

            {/* Right Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Pill with Instant Results Dropdown */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 180)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos, pedidos, clientes..."
                  className="w-60 sm:w-72 bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white text-xs text-[#18181B] rounded-full pl-4 pr-9 py-2.5 transition-all outline-none placeholder:text-[#A1A1AA]"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-[#A1A1AA] hover:text-[#18181B] p-0.5 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Search className="w-3.5 h-3.5 absolute right-3.5 top-3 text-[#A1A1AA]" />
                )}

                {isSearchFocused && q.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#EAE7E1] rounded-2xl shadow-2xl p-3 z-50 space-y-3 max-h-[420px] overflow-y-auto">
                    {matchedProducts.length === 0 && matchedOrders.length === 0 && matchedUsers.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#71717A]">
                        Sin resultados para "{searchQuery}"
                      </div>
                    ) : (
                      <>
                        {matchedProducts.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider px-2 block">
                              Productos ({matchedProducts.length})
                            </span>
                            {matchedProducts.map(prod => (
                              <button
                                key={prod.id}
                                onClick={() => {
                                  setActiveTab('inventory');
                                  setIsSearchFocused(false);
                                }}
                                className="w-full text-left p-2 rounded-xl hover:bg-[#FAF9F7] flex items-center justify-between gap-2.5 transition-colors"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <img
                                    src={prod.image_url || '/images/products/kdj-60.jpg'}
                                    alt={prod.name}
                                    className="w-9 h-9 rounded-lg object-contain bg-[#FAF9F7] border border-[#EAE7E1] p-0.5 shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <span className="font-mono text-[10px] font-bold text-[#18181B] bg-[#F4F4F5] px-1.5 py-0.5 rounded">
                                      {prod.code}
                                    </span>
                                    <div className="text-xs font-semibold text-[#18181B] truncate mt-0.5">
                                      {prod.name}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-[11px] font-bold text-[#18181B] shrink-0">
                                  ${prod.price.toLocaleString('es-CO')}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                        {matchedOrders.length > 0 && (
                          <div className="space-y-1.5 pt-1 border-t border-[#F4F4F5]">
                            <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider px-2 block">
                              Pedidos ({matchedOrders.length})
                            </span>
                            {matchedOrders.map(ord => (
                              <button
                                key={ord.id}
                                onClick={() => {
                                  setActiveTab('orders');
                                  setIsSearchFocused(false);
                                }}
                                className="w-full text-left p-2 rounded-xl hover:bg-[#FAF9F7] flex items-center justify-between gap-2 transition-colors"
                              >
                                <div>
                                  <span className="font-mono text-[10px] font-bold text-[#18181B] bg-[#F4F4F5] px-1.5 py-0.5 rounded">
                                    {ord.order_ref || ord.id}
                                  </span>
                                  <div className="text-xs font-semibold text-[#18181B] mt-0.5">
                                    {ord.customer_name}
                                  </div>
                                </div>
                                <span className="text-[11px] font-bold text-[#10B981]">
                                  ${ord.total_amount.toLocaleString('es-CO')} COP
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                        {matchedUsers.length > 0 && (
                          <div className="space-y-1.5 pt-1 border-t border-[#F4F4F5]">
                            <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider px-2 block">
                              Clientes ({matchedUsers.length})
                            </span>
                            {matchedUsers.map(usr => (
                              <button
                                key={usr.id}
                                onClick={() => {
                                  setActiveTab('users');
                                  setIsSearchFocused(false);
                                }}
                                className="w-full text-left p-2 rounded-xl hover:bg-[#FAF9F7] flex items-center justify-between gap-2 transition-colors"
                              >
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-[#18181B] truncate">
                                    {usr.full_name}
                                  </div>
                                  <div className="text-[10px] text-[#71717A] truncate">
                                    {usr.company || usr.email}
                                  </div>
                                </div>
                                <span className="text-[10px] font-semibold bg-[#F4F4F5] px-2 py-0.5 rounded-full text-[#52525B]">
                                  {usr.city || 'Medellín'}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Notification Bell */}
              <button
                className="w-9 h-9 rounded-full bg-[#F4F4F5] hover:bg-[#EAEAEA] flex items-center justify-center text-[#71717A] hover:text-[#18181B] transition-colors relative"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                <span className="w-4 h-4 rounded-full bg-[#F59E0B] text-white text-[9px] font-bold flex items-center justify-center absolute -top-1 -right-1 border-2 border-white shadow-2xs">
                  3
                </span>
              </button>

              {/* User Profile Pill Widget */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2.5 p-1 pl-1.5 pr-3 bg-white hover:bg-[#F4F4F5] rounded-full border border-black/5 transition-all"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Administrador Montezzi"
                    className="w-8 h-8 rounded-full object-cover border border-black/10"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-[#18181B] leading-tight">
                      {user?.full_name || 'Carlos Mendoza'}
                    </div>
                    <div className="text-[10px] text-[#A1A1AA]">
                      {role === 'admin' ? 'Gerente de Tienda' : 'Asesor Showroom'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A1A1AA]" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-black/10 rounded-2xl shadow-xl p-2 z-50 text-xs">
                    <div className="px-3 py-1.5 text-[10px] text-[#A1A1AA] font-mono uppercase tracking-wider">
                      Simular Rol
                    </div>
                    {(['admin', 'colaborador'] as const).map(r => (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F4F4F5] flex items-center justify-between font-medium capitalize"
                      >
                        <span>{r}</span>
                        {role === r && <Check className="w-3.5 h-3.5 text-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* + Nuevo Pedido Button */}
              <button
                onClick={() => setIsCreateOrderModalOpen(true)}
                className="px-5 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Pedido</span>
              </button>
            </div>
          </header>

          {/* Dynamic Content Views */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <OverviewDashboard
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenCreateOrder={() => setIsCreateOrderModalOpen(true)}
                onOpenCreateProduct={() => setIsCreateProductModalOpen(true)}
              />
            )}

            {activeTab === 'orders' && <OrdersKanban />}
            {activeTab === 'inventory' && <InventoryManagement />}
            {activeTab === 'categories' && <CategoriesTab />}
            {activeTab === 'users' && <UserManagementTab />}
            {activeTab === 'reviews' && <ReviewsTab />}
            {activeTab === 'discounts' && <DiscountsTab />}
            {activeTab === 'analytics' && <ProductAnalyticsTab />}
            {activeTab === 'marketing' && <MarketingTab />}
            {activeTab === 'settings' && <ElectronicBillingTab />}
            {activeTab === 'billing' && <ElectronicBillingTab />}
            {activeTab === 'appointments' && <AppointmentsTab />}
            {activeTab === 'logs' && <ActivityLogsTab />}
          </div>
        </main>
      </div>

      {/* Global Application Modals */}
      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
        onOrderCreated={() => setActiveTab('orders')}
      />

      <ProductFormModal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
      />

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onUserCreated={() => setActiveTab('users')}
      />
    </div>
  );
};
