import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Shield, UserCheck, ArrowRight, Lock, Mail } from 'lucide-react';
import { UserRole } from '../types/database';

export const Login: React.FC = () => {
  const { login, role, user, isAuthenticated, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, selectedRole);
    setLoading(false);
    navigate('/admin');
  };

  const handleQuickDemoLogin = (r: UserRole) => {
    switchRole(r);
    navigate('/admin');
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 sm:px-6 space-y-8 bg-white">
      {/* Brand Header */}
      <div className="text-center space-y-4">
        <BrandLogo variant="minim" size="lg" theme="light" />
        <h1 className="font-sans text-2xl sm:text-3xl text-obsidian uppercase font-bold tracking-wider mt-4">
          Acceso al Sistema Montezzi
        </h1>
        <p className="text-xs text-obsidian/60 font-sans">
          Gestión de catálogo, control de inventario y seguimiento de pedidos para staff y profesionales.
        </p>
      </div>

      {/* Current Session status if logged in */}
      {isAuthenticated && (
        <div className="p-4 glass-card rounded-sm text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-obsidian/60">Sesión iniciada como:</span>
            <span className="px-2 py-0.5 bg-black text-white text-[10px] uppercase font-bold tracking-wider rounded-xs">
              {role}
            </span>
          </div>
          <p className="text-obsidian font-medium">{user?.full_name}</p>
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="flex-1 py-2 bg-black text-white font-bold uppercase tracking-wider text-[11px] text-center rounded-xs shadow-xs hover:bg-black/85 transition-all"
            >
              Ir al Panel Administrativo
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 bg-white border border-black/15 text-obsidian/70 hover:text-obsidian text-[11px] uppercase tracking-wider rounded-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Quick Demo Access Bar with Reinforced Glassmorphism */}
      <div className="p-5 glass-card rounded-xl space-y-3 border border-white/80 shadow-lg">
        <div className="flex items-center gap-2 text-black text-xs font-mono uppercase tracking-widest font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>Acceso Rápido de Prueba (Demo 2026)</span>
        </div>
        <p className="text-[11px] text-obsidian/60 font-sans leading-relaxed">
          Selecciona un perfil con rol preconfigurado para explorar el panel de control de inmediato:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => handleQuickDemoLogin('admin')}
            className="p-3 bg-white/90 backdrop-blur-sm border border-black/15 hover:border-black text-left text-xs transition-all rounded-lg shadow-2xs hover:shadow-xs"
          >
            <strong className="text-black block font-sans font-bold">Admin</strong>
            <span className="text-[10px] text-obsidian/60">Control total</span>
          </button>
          <button
            onClick={() => handleQuickDemoLogin('colaborador')}
            className="p-3 bg-white/90 backdrop-blur-sm border border-black/15 hover:border-black text-left text-xs transition-all rounded-lg shadow-2xs hover:shadow-xs"
          >
            <strong className="text-obsidian block font-sans font-semibold">Colaborador</strong>
            <span className="text-[10px] text-obsidian/60">Stock & Pedidos</span>
          </button>
          <button
            onClick={() => handleQuickDemoLogin('cliente')}
            className="p-3 bg-white/90 backdrop-blur-sm border border-black/15 hover:border-black text-left text-xs transition-all rounded-lg shadow-2xs hover:shadow-xs"
          >
            <strong className="text-obsidian block font-sans font-semibold">Cliente Arq.</strong>
            <span className="text-[10px] text-obsidian/60">Compras</span>
          </button>
        </div>
      </div>

      {/* Standard Form with Reinforced Glassmorphism */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-xl space-y-4 border border-white/80 shadow-lg">
        <div className="space-y-1 text-xs">
          <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Correo Electrónico</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@montezzi.com"
              className="w-full bg-white/90 backdrop-blur-sm border border-black/15 text-obsidian pl-10 pr-3 py-2.5 text-xs focus:border-black focus:outline-none rounded-lg shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-obsidian/70 uppercase tracking-wider font-semibold">Rol de Acceso Solicitado</label>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value as UserRole)}
            className="w-full bg-white/90 backdrop-blur-sm border border-black/15 text-obsidian px-3.5 py-2.5 text-xs focus:border-black focus:outline-none uppercase font-mono rounded-lg shadow-xs"
          >
            <option value="admin">Administrador (Control Total)</option>
            <option value="colaborador">Colaborador (Inventario y Pedidos)</option>
            <option value="cliente">Cliente / Profesional</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-black text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/85 transition-all flex items-center justify-center gap-2 shadow-md mt-4 rounded-lg"
        >
          <span>{loading ? 'Verificando credenciales...' : 'Ingresar al Portal'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
