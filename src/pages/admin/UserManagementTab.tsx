import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SystemUser, UserRole } from '../../types/database';
import { CreateUserModal } from './CreateUserModal';
import { ImportModal } from './ImportModal';
import { exportToCSV, exportToJSON } from '../../utils/csvExportImport';
import {
  Users, UserCheck, Shield, Award, Search, Plus, Mail, Phone,
  Building, Download, Upload, FileCode, MessageSquare, TrendingUp
} from 'lucide-react';

export const UserManagementTab: React.FC = () => {
  const { systemUsers, updateSystemUserStatus, createSystemUser } = useAuth();

  const [roleFilter, setRoleFilter] = useState<'todos' | UserRole>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Filter logic
  const filteredUsers = systemUsers.filter(user => {
    const matchesRole = roleFilter === 'todos' || user.role === roleFilter;
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.city && user.city.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesRole && matchesSearch;
  });

  // KPIs
  const totalUsers = systemUsers.length;
  const activeClients = systemUsers.filter(u => u.role === 'cliente' && u.status === 'activo').length;
  const staffCount = systemUsers.filter(u => u.role === 'admin' || u.role === 'colaborador').length;
  const totalB2BValue = systemUsers
    .filter(u => u.role === 'cliente')
    .reduce((sum, u) => sum + (u.total_spent || 0), 0);

  // Export functions
  const handleExportCSV = () => {
    exportToCSV('montezzi_directorio_clientes_usuarios', filteredUsers, [
      { header: 'ID', key: 'id' },
      { header: 'Nombre Completo', key: 'full_name' },
      { header: 'Rol en Sistema', key: 'role' },
      { header: 'Estado', key: 'status' },
      { header: 'Correo Electrónico', key: 'email' },
      { header: 'Teléfono / WhatsApp', key: (u) => u.phone || '' },
      { header: 'Empresa / Estudio', key: (u) => u.company || '' },
      { header: 'Ciudad', key: (u) => u.city || '' },
      { header: 'Total Pedidos', key: (u) => u.total_orders || 0 },
      { header: 'Valor Histórico Compras (COP)', key: (u) => u.total_spent || 0 },
      { header: 'Fecha Registro', key: 'created_at' }
    ]);
  };

  const handleExportJSON = () => {
    exportToJSON('montezzi_usuarios_crm', filteredUsers);
  };

  // Bulk import handler
  const handleImportConfirm = async (rows: Record<string, string>[]): Promise<{ success: boolean; message: string }> => {
    let importedCount = 0;

    rows.forEach(row => {
      const full_name = String(row.full_name || row.nombre || row.Nombre || row['Nombre Completo'] || '').trim();
      const email = String(row.email || row.correo || row.Correo || row['Correo Electrónico'] || '').trim();

      if (!full_name || !email) return;

      const rawRole = String(row.role || row.rol || 'cliente').toLowerCase().trim();
      const role: UserRole =
        rawRole === 'admin' ? 'admin' : rawRole === 'colaborador' ? 'colaborador' : 'cliente';

      createSystemUser({
        full_name,
        email,
        role,
        phone: String(row.phone || row.telefono || row.Telefono || '+57 300 000 0000'),
        company: String(row.company || row.empresa || row.Empresa || 'Profesional Independiente'),
        city: String(row.city || row.ciudad || row.Ciudad || 'Medellín'),
        status: 'activo'
      });
      importedCount++;
    });

    return {
      success: true,
      message: `Se importaron ${importedCount} clientes/usuarios exitosamente al directorio.`
    };
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ============================================================ */}
      {/* 1. TOP SUMMARY KPI CARDS (En Español y Pesos Colombianos)     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Clientes & Usuarios</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {totalUsers}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Cuentas registradas en el directorio
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Clientes Activos B2B / B2C</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {activeClients}
          </div>
          <div className="text-[11px] font-medium text-[#10B981]">
            Arquitectos, estudios y diseñadores
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Equipo Interno</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {staffCount}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Administradores y asesores showroom
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Compras Históricas Clientes</span>
            <div className="w-8 h-8 rounded-full bg-[#F3EFFE] text-[#6D28D9] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight my-1">
            ${totalB2BValue.toLocaleString('es-CO')}{' '}
            <span className="text-xs font-normal text-[#71717A]">COP</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
            <span>Facturación acumulada en COP</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FILTER & ACTION BAR                                        */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#EAE7E1] p-4 rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Role Filter Pills + Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[#F4F4F5] p-1 rounded-full">
            {(['todos', 'cliente', 'colaborador', 'admin'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  roleFilter === r
                    ? 'bg-[#18181B] text-white shadow-2xs'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                {r === 'todos' ? 'Todos' : r === 'cliente' ? 'Clientes' : r === 'colaborador' ? 'Asesores' : 'Admins'}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:w-64 min-w-[210px]">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-[#A1A1AA]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, estudio o ciudad..."
              className="w-full pl-9 pr-4 py-2 bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white rounded-full text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Importar CSV</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
          >
            <FileCode className="w-3.5 h-3.5 text-[#71717A]" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. CUSTOMERS & USERS TABLE                                    */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#EAE7E1] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-[#FAF9F7] border-b border-[#F0EFEA] text-[11px] font-semibold text-[#71717A]">
                <th className="py-3.5 px-4">Cliente / Estudio</th>
                <th className="py-3.5 px-4">Rol</th>
                <th className="py-3.5 px-4">Contacto</th>
                <th className="py-3.5 px-4">Ciudad</th>
                <th className="py-3.5 px-4 text-right">Pedidos</th>
                <th className="py-3.5 px-4 text-right">Total Compras (COP)</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-center">Contacto Rápido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5]">
              {filteredUsers.map(user => {
                const cleanPhone = user.phone ? user.phone.replace(/[^0-9]/g, '') : '';
                const waLink = cleanPhone
                  ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hola ${user.full_name}, te escribimos desde el Showroom de Montezzi...`
                    )}`
                  : null;

                const initials = user.full_name
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map(part => part[0]?.toUpperCase())
                  .join('');

                return (
                  <tr key={user.id} className="hover:bg-[#FAF9F7]/90 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center font-sans font-bold text-xs text-[#18181B] shrink-0">
                          {initials || 'MZ'}
                        </div>
                        <div>
                          <span className="font-semibold text-[#18181B] text-[13px] block">
                            {user.full_name}
                          </span>
                          {user.company && (
                            <span className="text-[11px] text-[#71717A] flex items-center gap-1 mt-0.5">
                              <Building className="w-3 h-3 text-[#A1A1AA]" />
                              {user.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-semibold capitalize px-2.5 py-1 rounded-full ${
                          user.role === 'admin'
                            ? 'bg-[#18181B] text-white'
                            : user.role === 'colaborador'
                            ? 'bg-[#EAF4FF] text-[#0284C7]'
                            : 'bg-[#F4F4F5] text-[#52525B]'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <div className="text-[#18181B] font-medium flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#A1A1AA]" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="text-[#71717A] font-mono flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-[#A1A1AA]" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#52525B] text-xs font-medium whitespace-nowrap">
                      {user.city || 'Medellín'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-sans font-semibold text-[#18181B]">
                      {user.total_orders || 0}
                    </td>

                    <td className="py-3.5 px-4 text-right font-sans font-bold text-[#18181B] whitespace-nowrap">
                      ${(user.total_spent || 0).toLocaleString('es-CO')}{' '}
                      <span className="text-[10px] font-normal text-[#71717A]">COP</span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() =>
                          updateSystemUserStatus(
                            user.id,
                            user.status === 'activo' ? 'inactivo' : 'activo'
                          )
                        }
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize transition-colors ${
                          user.status === 'activo'
                            ? 'bg-[#ECFDF5] text-[#10B981] hover:bg-[#D1FAE5]'
                            : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#E4E4E7]'
                        }`}
                        title="Click para alternar estado"
                      >
                        {user.status}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-[#ECFDF5] text-[#10B981] hover:bg-[#10B981] hover:text-white transition-colors"
                            title="Chat de WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={`mailto:${user.email}`}
                          className="p-2 rounded-xl bg-[#F4F4F5] text-[#52525B] hover:bg-[#18181B] hover:text-white transition-colors"
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

      {/* Bulk Client Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Importar Directorio de Clientes & Arquitectos"
        subtitle="Carga masiva de contactos, empresas y números telefónicos desde CSV o JSON"
        sampleTemplateName="clientes_arquitectos"
        sampleTemplateHeaders={['nombre', 'email', 'empresa', 'telefono', 'ciudad', 'rol']}
        sampleTemplateRows={[
          ['Arq. Juan Camilo Restrepo', 'juan@restrepoarq.co', 'Restrepo & Gómez Arquitectos', '+57 312 456 7890', 'Medellín', 'cliente'],
          ['Taller Ebanistería Roble', 'contacto@robletaller.com', 'Mobiliario Roble S.A.S.', '+57 320 987 6543', 'Bogotá D.C.', 'cliente']
        ]}
        onImportConfirm={handleImportConfirm}
      />
    </div>
  );
};
