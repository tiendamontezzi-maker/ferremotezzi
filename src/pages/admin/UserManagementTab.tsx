import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database';
import { CreateUserModal } from './CreateUserModal';
import { Users, UserPlus, Building, Phone, Mail, MapPin, Shield, Check, X, MessageSquare, ArrowUpRight } from 'lucide-react';

export const UserManagementTab: React.FC = () => {
  const { systemUsers, updateSystemUserStatus } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'todos' | UserRole>('todos');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'activo' | 'inactivo'>('todos');

  // KPI Metrics
  const totalUsers = systemUsers.length;
  const clientUsers = systemUsers.filter(u => u.role === 'cliente');
  const colabUsers = systemUsers.filter(u => u.role === 'colaborador');
  const adminUsers = systemUsers.filter(u => u.role === 'admin');
  const totalClientSpend = clientUsers.reduce((sum, u) => sum + (u.total_spent || 0), 0);

  // Filtered List
  const filteredUsers = useMemo(() => {
    return systemUsers.filter(user => {
      const matchesRole = roleFilter === 'todos' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'todos' || user.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        user.full_name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        (user.company && user.company.toLowerCase().includes(q)) ||
        (user.city && user.city.toLowerCase().includes(q));

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [systemUsers, roleFilter, statusFilter, searchQuery]);

  const generateWhatsAppLink = (user: typeof systemUsers[0]) => {
    if (!user.phone) return null;
    const cleanPhone = user.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Estimado/a ${user.full_name}, le saludamos desde la Dirección Comercial de Montezzi Herrajes. ¿En qué proyecto arquitectónico podemos apoyarle esta semana?`
    );
    return `https://wa.me/${cleanPhone.startsWith('57') ? cleanPhone : '57' + cleanPhone}?text=${message}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Total Cuentas</span>
            <Users className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {totalUsers} <span className="text-xs font-sans font-normal text-obsidian/50">registros</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Arquitectos, distribuidores y equipo
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Estudios / Clientes</span>
            <Building className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {clientUsers.length} <span className="text-xs font-sans font-normal text-obsidian/50">estudios</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Compradores profesionales activos
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Facturación Clientes</span>
            <Shield className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-black">
            ${(totalClientSpend / 1000000).toFixed(2)}M <span className="text-xs font-sans font-normal text-obsidian/50">COP</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Volumen acumulado de compras B2B
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Equipo Interno</span>
            <Users className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {colabUsers.length + adminUsers.length} <span className="text-xs font-sans font-normal text-obsidian/50">usuarios</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            {adminUsers.length} Admin · {colabUsers.length} Colaboradores
          </span>
        </div>
      </div>

      {/* Control Bar: Filters & Actions */}
      <div className="glass-card p-4 rounded-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs font-sans">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-obsidian/50 text-[11px] font-mono uppercase tracking-wider">Rol:</span>
          {(['todos', 'cliente', 'colaborador', 'admin'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
                roleFilter === r
                  ? 'bg-black text-white'
                  : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
              }`}
            >
              {r}
            </button>
          ))}

          <span className="text-obsidian/30 mx-1">|</span>

          <span className="text-obsidian/50 text-[11px] font-mono uppercase tracking-wider">Estado:</span>
          {(['todos', 'activo', 'inactivo'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-black text-white'
                  : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre, estudio, email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:w-56 px-3 py-1.5 border border-black/15 bg-white rounded-xs focus:outline-hidden focus:border-black text-xs font-sans"
          />

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md whitespace-nowrap flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Crear Usuario</span>
          </button>
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="glass-card rounded-sm overflow-hidden border border-black/10 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F8F8F7] text-[10px] font-mono uppercase text-obsidian/60 border-b border-black/10">
              <tr>
                <th className="p-3">Usuario & Estudio</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Contacto</th>
                <th className="p-3">Ciudad</th>
                <th className="p-3 text-right">Pedidos</th>
                <th className="p-3 text-right">Compras Acumuladas</th>
                <th className="p-3 text-center">Estado</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {filteredUsers.map(user => {
                const waLink = generateWhatsAppLink(user);

                return (
                  <tr key={user.id} className="hover:bg-black/[0.015] transition-colors">
                    <td className="p-3">
                      <div>
                        <span className="font-bold text-obsidian text-xs block">{user.full_name}</span>
                        {user.company && (
                          <span className="text-[11px] text-obsidian/60 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-obsidian/40" />
                            {user.company}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-black text-white'
                            : user.role === 'colaborador'
                            ? 'bg-black/10 text-black border border-black/20'
                            : 'bg-[#F2ECE4] text-[#5A3927] border border-[#DDD6C8]'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="space-y-0.5 text-[11px]">
                        <div className="text-obsidian/80 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-obsidian/40" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="text-obsidian/60 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-obsidian/40" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-3 text-obsidian/70 text-[11px]">
                      {user.city || 'Bogotá D.C.'}
                    </td>

                    <td className="p-3 text-right font-mono text-obsidian font-medium">
                      {user.total_orders || 0}
                    </td>

                    <td className="p-3 text-right font-mono font-bold text-obsidian">
                      ${(user.total_spent || 0).toLocaleString('es-CO')} <span className="text-[10px] font-normal text-obsidian/50">COP</span>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => updateSystemUserStatus(user.id, user.status === 'activo' ? 'inactivo' : 'activo')}
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider transition-colors ${
                          user.status === 'activo'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-black/5 text-obsidian/50 border border-black/10 hover:bg-black/10'
                        }`}
                        title="Click para alternar estado"
                      >
                        {user.status}
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xs bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                            title="Chat de WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={`mailto:${user.email}`}
                          className="p-1.5 rounded-xs bg-black/5 text-obsidian/70 hover:bg-black hover:text-white transition-colors"
                          title="Enviar correo"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
