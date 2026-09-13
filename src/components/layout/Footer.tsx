import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../ui/BrandLogo';
import { ShieldCheck, Truck, Clock, Sparkles, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-black/[0.08] text-obsidian pt-16 pb-12">
      {/* Brand Value Pillars (Westwing / Luxury Standard) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 glass-card px-6 rounded-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-black shrink-0 stroke-[1.5]" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-obsidian">Estética Arquitectónica</h4>
              <p className="text-[11px] text-obsidian/60 font-sans mt-0.5">Diseño minimalista y acabados contemporáneos.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-black shrink-0 stroke-[1.5]" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-obsidian">Garantía Montezzi</h4>
              <p className="text-[11px] text-obsidian/60 font-sans mt-0.5">30 días de respaldo por defectos de fábrica.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-black shrink-0 stroke-[1.5]" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-obsidian">Cobertura Nacional</h4>
              <p className="text-[11px] text-obsidian/60 font-sans mt-0.5">Medellín 1 día · Colombia 2-3 días hábiles.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-black shrink-0 stroke-[1.5]" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-obsidian">Atención a Profesionales</h4>
              <p className="text-[11px] text-obsidian/60 font-sans mt-0.5">Canal especializado para diseñadores y carpinteros.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Manifesto column */}
          <div className="lg:col-span-2 space-y-4 pr-6">
            <BrandLogo variant="compact" size="md" theme="light" />
            <p className="text-xs text-obsidian/70 font-sans leading-relaxed max-w-sm mt-4">
              En Montezzi creemos que los detalles tienen el poder de transformar cada espacio. Seleccionamos herrajes y soluciones de organización que combinan diseño, funcionalidad y calidad para cocinas, clósets y proyectos de alta arquitectura.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-sans tracking-[0.2em] text-black uppercase font-bold">
                Principio rector:
              </span>
              <p className="text-xs text-obsidian font-serif italic mt-0.5">
                Sofisticación visual + precisión técnica + utilidad real.
              </p>
            </div>
          </div>

          {/* Colecciones */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-black font-bold">
              Colecciones 2026
            </h4>
            <ul className="space-y-2 text-xs text-obsidian/75">
              <li>
                <Link to="/catalogo?coleccion=cocina" className="hover:text-black transition-colors">
                  Colección Cocina (Canastas & Despensas)
                </Link>
              </li>
              <li>
                <Link to="/catalogo?coleccion=closet" className="hover:text-black transition-colors">
                  Colección Clóset (Joyeros & Pantaloneros)
                </Link>
              </li>
              <li>
                <Link to="/catalogo?coleccion=herrajes_especiales" className="hover:text-black transition-colors">
                  Herrajes Especiales (Bisagras & Guías)
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="hover:text-black transition-colors">
                  Portafolio Completo (KDJ-1 a KDJ-112)
                </Link>
              </li>
            </ul>
          </div>

          {/* Políticas y Atención */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-black font-bold">
              Políticas y Servicio
            </h4>
            <ul className="space-y-2 text-xs text-obsidian/75">
              <li>
                <Link to="/garantias" className="hover:text-black transition-colors">
                  Política de Garantías y Cambios
                </Link>
              </li>
              <li>
                <Link to="/envios" className="hover:text-black transition-colors">
                  Política de Envíos y Tiempos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-black transition-colors">
                  Preguntas Frecuentes (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/distribucion" className="hover:text-black transition-colors">
                  Ventas al por Mayor y Distribuidores
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional y Showroom */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-black font-bold">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs text-obsidian/75">
              <li>
                <Link to="/nosotros" className="hover:text-black transition-colors">
                  Nosotros, Misión y Visión 2031
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-black transition-colors">
                  Acceso a Clientes / Staff
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-black transition-colors">
                  Panel de Control Montezzi
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-black/[0.08]">
              <span className="text-[10px] uppercase font-sans tracking-widest text-black font-bold block mb-1">
                Showroom Físico
              </span>
              <p className="text-[11px] text-obsidian/70">
                Medellín, Colombia (Próxima apertura oficial).
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Minimalist Bottom Bar (Exact replica of user reference image) */}
        <div className="mt-14 pt-10 border-t border-black/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs font-sans">
            
            {/* Column 1: Brand Logo & Copyright */}
            <div className="space-y-1 text-center md:text-left">
              <span className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-obsidian">
                montezzi
              </span>
              <p className="text-[11px] text-obsidian/50 font-sans">
                Copyright © 2026 Montezzi S.A.S. Todos los derechos reservados.
              </p>
            </div>

            {/* Column 2: Newsletter form */}
            <div className="space-y-1 max-w-xs mx-auto md:mx-0 w-full">
              <span className="text-[11px] font-sans text-obsidian/70 font-semibold block uppercase tracking-wider">
                Newsletter
              </span>
              <form onSubmit={e => { e.preventDefault(); alert('¡Gracias por suscribirte al boletín oficial de Montezzi!'); }} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Ingresa tu correo electrónico..."
                  className="w-full bg-transparent border-b border-black/20 py-1.5 pr-8 text-xs text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-obsidian/60 hover:text-black transition-colors"
                  aria-label="Suscribirme"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Column 3: Payment Badges */}
            <div className="space-y-1 text-center md:text-right">
              <span className="text-[11px] font-sans text-obsidian/70 font-semibold block uppercase tracking-wider">
                Medios de Pago Certificados
              </span>
              <div className="flex items-center justify-center md:justify-end gap-2.5 pt-1">
                <span className="px-2 py-0.5 border border-[#DDD6C8] rounded text-[10px] font-bold text-red-600 bg-white shadow-2xs">
                  Mastercard
                </span>
                <span className="px-2 py-0.5 border border-[#DDD6C8] rounded text-[10px] font-bold text-blue-700 bg-white shadow-2xs">
                  VISA
                </span>
                <span className="px-2 py-0.5 border border-[#DDD6C8] rounded text-[10px] font-bold text-obsidian bg-white shadow-2xs">
                  PSE
                </span>
                <span className="px-2 py-0.5 border border-[#DDD6C8] rounded text-[10px] font-bold text-amber-600 bg-white shadow-2xs">
                  Bancolombia
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};
