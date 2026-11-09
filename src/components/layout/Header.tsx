import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Shield, ChevronDown, Check, Calendar } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useSearch } from '../../context/SearchContext';
import { UserRole } from '../../types/database';
import { ShowroomAppointmentModal } from '../appointments/ShowroomAppointmentModal';

export const Header: React.FC = () => {
  const { itemCount, openDrawer } = useCart();
  const { user, role, switchRole, isAuthenticated } = useAuth();
  const { setFilters } = useProducts();
  const { openSearch } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Cocina', path: '/catalogo?coleccion=cocina' },
    { label: 'Clóset', path: '/catalogo?coleccion=closet' },
    { label: 'Herrajes', path: '/catalogo?coleccion=herrajes_especiales' },
    { label: 'Catálogo (112)', path: '/catalogo' },
    { label: 'Distribución', path: '/distribucion' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-all duration-300">
      {/* Top micro-bar with subtle shipping notification and currency */}
      <div className="bg-white/60 backdrop-blur-md border-b border-black/[0.04] py-1.5 px-4 sm:px-8 text-[11px] font-sans text-obsidian/75 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian glass-pill px-2.5 py-0.5 rounded-full">
            ES · COP ($)
          </span>
          <span className="hidden sm:inline text-obsidian/60 font-medium">
            Envío Gratuito Nacional en compras ≥ $500.000 COP
          </span>
        </div>

        {/* Quick Role Switcher for Testing & Showroom Appointment CTA */}
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="flex items-center gap-1.5 text-obsidian hover:text-black hover:bg-black/5 transition-all text-[10px] uppercase font-sans font-semibold tracking-wider glass-pill px-3 py-1 rounded-full border border-black/10 shadow-2xs"
            title="Agendar Cita Privada en Showroom Medellín o Asesoría Virtual"
          >
            <Calendar className="w-3 h-3 text-black" />
            <span className="hidden xs:inline">Cita Showroom</span>
          </button>

          <button
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 text-obsidian hover:text-white hover:bg-black transition-all text-[10px] uppercase font-mono glass-pill px-3 py-1 rounded-full shadow-2xs"
          >
            <Shield className="w-3 h-3 text-current" />
            <span>Rol: {role}</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-8 w-48 glass-panel rounded-lg shadow-2xl py-1.5 z-50 text-left border border-white/80">
              <div className="px-3.5 py-1.5 text-[10px] text-obsidian/50 uppercase tracking-wider border-b border-black/5 font-semibold">
                Simular Rol
              </div>
              {(['admin', 'colaborador', 'cliente'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    setRoleDropdownOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs text-obsidian hover:bg-black hover:text-white flex items-center justify-between font-sans transition-colors"
                >
                  <span className="capitalize font-medium">{r}</span>
                  {role === r && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Bar matching the user's reference image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.slice(0, 4).map((link, idx) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={idx}
                to={link.path}
                className={`text-xs uppercase tracking-[0.14em] transition-colors py-1 relative font-sans ${
                  isActive ? 'text-black font-bold' : 'text-obsidian/70 hover:text-black font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Center: Brand Logo like 'minim' */}
        <div className="flex items-center justify-center">
          <BrandLogo variant="minim" size="md" theme="light" />
        </div>

        {/* Right Side: Action Controls (Smart Search, Account, Cart, Menu) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Smart Search Trigger (Pop-up Modal with Intelligent Filters) */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 text-obsidian/80 hover:text-black hover:bg-black/5 rounded-full transition-all text-xs font-sans group border border-transparent hover:border-black/10"
            title="Abrir Buscador Inteligente Montezzi (⌘K)"
            aria-label="Abrir Buscador Inteligente"
          >
            <Search className="w-4 h-4 stroke-[1.8] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline-flex items-center font-mono text-[10px] text-obsidian/50 bg-black/[0.04] px-1.5 py-0.5 rounded border border-black/10">
              ⌘K
            </span>
          </button>

          {/* Account / Admin */}
          {role === 'admin' || role === 'colaborador' ? (
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-black hover:bg-black hover:text-white text-xs uppercase tracking-wider font-semibold border border-black rounded-sm transition-colors"
              title="Panel Administrativo"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="p-1.5 text-obsidian/75 hover:text-black transition-colors"
              title="Acceso Clientes y Profesionales"
              aria-label="Cuenta"
            >
              <User className="w-4 h-4 stroke-[1.75]" />
            </Link>
          )}

          {/* Cart Bag Icon with count badge */}
          <button
            onClick={openDrawer}
            className="relative p-1.5 text-obsidian/80 hover:text-black transition-colors flex items-center"
            aria-label="Abrir Carrito"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-1.5 text-obsidian/80 hover:text-black transition-colors"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 stroke-[1.75]" />}
          </button>
        </div>
      </div>

      {/* Slide-down / Dropdown Menu for Mobile & Full Navigation with Reinforced Glassmorphism */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 glass-panel px-6 py-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-black/[0.06]">
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-obsidian uppercase font-bold mb-2">Colecciones</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/catalogo?coleccion=cocina" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Cocina Contemporánea</Link>
                <Link to="/catalogo?coleccion=closet" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Clóset & Vestidores</Link>
                <Link to="/catalogo?coleccion=herrajes_especiales" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Herrajes Especiales</Link>
                <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Catálogo Completo (112 refs)</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-obsidian uppercase font-bold mb-2">Institucional</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/nosotros" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Nosotros & Manifiesto</Link>
                <Link to="/garantias" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Garantías & Cambios (30 días)</Link>
                <Link to="/envios" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Envíos Nacionales</Link>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Preguntas Frecuentes</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-obsidian uppercase font-bold mb-2">Profesionales</h4>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAppointmentModalOpen(true);
                  }}
                  className="text-left text-xs text-obsidian hover:text-black font-semibold flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>Agendar Cita en Showroom</span>
                </button>
                <Link to="/distribucion" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold transition-colors">Ventas al por Mayor / Distribuidores</Link>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xs text-montezzigold font-semibold hover:underline">Panel de Control ({role})</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Showroom Appointment Booking Modal */}
      <ShowroomAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </header>
  );
};
