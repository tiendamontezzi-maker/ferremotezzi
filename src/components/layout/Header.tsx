import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Shield, ChevronDown, Check } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { UserRole } from '../../types/database';

export const Header: React.FC = () => {
  const { itemCount, openDrawer } = useCart();
  const { user, role, switchRole, isAuthenticated } = useAuth();
  const { setFilters } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters(prev => ({ ...prev, searchQuery: searchInput.trim() }));
      navigate('/catalogo');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Cocina', path: '/catalogo?coleccion=cocina' },
    { label: 'Clóset', path: '/catalogo?coleccion=closet' },
    { label: 'Herrajes', path: '/catalogo?coleccion=herrajes_especiales' },
    { label: 'Catálogo (112)', path: '/catalogo' },
    { label: 'Distribución', path: '/distribucion' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#F0ECE1] transition-all duration-300">
      {/* Top micro-bar with subtle shipping notification and currency */}
      <div className="bg-[#FAF8F5] border-b border-[#EFEAE2] py-1 px-4 sm:px-8 text-[11px] font-sans text-obsidian/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian bg-white px-2 py-0.5 rounded border border-[#E5DFD4]">
            ES · COP ($)
          </span>
          <span className="hidden sm:inline text-obsidian/60">
            Envío Gratuito Nacional en compras ≥ $500.000 COP
          </span>
        </div>

        {/* Quick Role Switcher for Testing */}
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 text-obsidian/70 hover:text-montezzigold transition-colors text-[10px] uppercase font-mono bg-white px-2 py-0.5 rounded border border-[#DDD6C8]"
          >
            <Shield className="w-3 h-3 text-montezzigold" />
            <span>Rol: {role}</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-8 w-44 bg-white border border-[#DDD6C8] rounded shadow-xl py-1 z-50 text-left">
              <div className="px-3 py-1 text-[10px] text-obsidian/40 uppercase tracking-wider border-b border-[#EFE9DF]">
                Simular Rol
              </div>
              {(['admin', 'colaborador', 'cliente'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    setRoleDropdownOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-obsidian hover:bg-[#FAF8F5] hover:text-montezzigold flex items-center justify-between font-sans"
                >
                  <span className="capitalize">{r}</span>
                  {role === r && <Check className="w-3.5 h-3.5 text-montezzigold" />}
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
                  isActive ? 'text-montezzigold font-bold' : 'text-obsidian/80 hover:text-montezzigold font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-montezzigold" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Center: Brand Logo like 'minim' */}
        <div className="flex items-center justify-center">
          <BrandLogo variant="minim" size="md" theme="light" />
        </div>

        {/* Right Side: Action Controls (Search, Account, Cart, Menu) */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(prev => !prev)}
            className="p-1.5 text-obsidian/75 hover:text-montezzigold transition-colors"
            title="Buscar referencias KDJ"
            aria-label="Buscar"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Account / Admin */}
          {role === 'admin' || role === 'colaborador' ? (
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-montezzigold hover:text-montezzigold-dark text-xs uppercase tracking-wider font-semibold border border-montezzigold/40 rounded-sm"
              title="Panel Administrativo"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="p-1.5 text-obsidian/75 hover:text-montezzigold transition-colors"
              title="Acceso Clientes y Profesionales"
              aria-label="Cuenta"
            >
              <User className="w-4 h-4 stroke-[1.75]" />
            </Link>
          )}

          {/* Cart Bag Icon with count badge */}
          <button
            onClick={openDrawer}
            className="relative p-1.5 text-obsidian/80 hover:text-montezzigold transition-colors flex items-center"
            aria-label="Abrir Carrito"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-montezzigold text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-1.5 text-obsidian/80 hover:text-montezzigold transition-colors"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 stroke-[1.75]" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="border-t border-[#F0ECE1] bg-[#FAF8F5] px-4 py-4 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-montezzigold absolute left-3.5" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Buscar por código KDJ (ej: KDJ-90), nombre o material..."
                className="w-full bg-white border border-[#DDD6C8] text-obsidian pl-10 pr-24 py-2.5 text-xs font-sans placeholder:text-obsidian/40 focus:outline-none focus:border-montezzigold"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-montezzigold text-white text-xs font-semibold uppercase tracking-wider hover:bg-montezzigold-dark"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slide-down / Dropdown Menu for Mobile & Full Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#F0ECE1] bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-[#F0ECE1]">
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-obsidian uppercase font-bold mb-2">Colecciones</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/catalogo?coleccion=cocina" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Cocina Contemporánea</Link>
                <Link to="/catalogo?coleccion=closet" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Clóset & Vestidores</Link>
                <Link to="/catalogo?coleccion=herrajes_especiales" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Herrajes Especiales</Link>
                <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Catálogo Completo (112 refs)</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-obsidian uppercase font-bold mb-2">Institucional</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/nosotros" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Nosotros & Manifiesto</Link>
                <Link to="/garantias" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Garantías & Cambios (30 días)</Link>
                <Link to="/envios" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Envíos Nacionales</Link>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Preguntas Frecuentes</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-obsidian uppercase font-bold mb-2">Profesionales</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/distribucion" onClick={() => setMobileMenuOpen(false)} className="text-xs text-obsidian hover:text-montezzigold">Ventas al por Mayor / Distribuidores</Link>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xs text-montezzigold font-semibold hover:underline">Panel de Control ({role})</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
