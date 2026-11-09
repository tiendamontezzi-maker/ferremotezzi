import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { exportToCSV } from '../../utils/csvExportImport';
import {
  ShieldCheck, Search, Download
} from 'lucide-react';

export const ActivityLogsTab: React.FC = () => {
  const { activityLogs } = useProducts();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = activityLogs.filter(log => {
    if (filterAction !== 'all' && log.action !== filterAction) return false;
    if (filterEntity !== 'all' && log.entity_type !== filterEntity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDesc = (log.description || '').toLowerCase().includes(q);
      const matchUser = (log.user_name || '').toLowerCase().includes(q);
      const matchEntity = (log.entity_name || '').toLowerCase().includes(q);
      if (!matchDesc && !matchUser && !matchEntity) return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    exportToCSV('montezzi_auditoria_logs', activityLogs, [
      { header: 'ID Log', key: 'id' },
      { header: 'Fecha y Hora', key: (l) => new Date(l.created_at).toLocaleString('es-CO') },
      { header: 'Usuario / Responsable', key: (l) => l.user_name || 'Sistema' },
      { header: 'Email', key: (l) => l.user_email || '' },
      { header: 'Entidad', key: 'entity_type' },
      { header: 'Acción Realizada', key: 'action' },
      { header: 'Descripción', key: (l) => l.description || '' },
      { header: 'IP Cliente', key: (l) => l.ip_address || '127.0.0.1' }
    ]);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'siigo_sync':
        return <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#10B981] text-[11px] font-semibold">Facturación DIAN</span>;
      case 'stock_adjustment':
        return <span className="px-2.5 py-1 rounded-full bg-[#F3EFFE] text-[#6D28D9] text-[11px] font-semibold">Ajuste Multicanal</span>;
      case 'create':
        return <span className="px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] text-[11px] font-semibold">Creación</span>;
      case 'update':
        return <span className="px-2.5 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] text-[11px] font-semibold">Actualización</span>;
      case 'delete':
        return <span className="px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[11px] font-semibold">Eliminación</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-[#F4F4F5] text-[#52525B] text-[11px] font-semibold">{action}</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white border border-[#EAE7E1] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#18181B] bg-[#F4F4F5] px-3 py-0.5 rounded-full">
              Trazabilidad Inmutable · Supabase RLS
            </span>
            <span className="text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-3 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Auditoría Activa
            </span>
          </div>
          <h2 className="font-sans text-xl font-bold text-[#18181B] normal-case pt-1">
            Auditoría de Actividad & Logs del Sistema
          </h2>
          <p className="text-xs text-[#71717A] font-sans">
            Registro cronológico de ajustes de inventario multicanal, emisiones fiscales DIAN y cambios administrativos
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Historial (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-[#EAE7E1] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap flex-1 items-center gap-2.5">
          <div className="relative flex-1 min-w-[220px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Buscar por descripción, usuario o ítem..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white text-[#18181B] text-xs pl-9 pr-4 py-2 rounded-full focus:outline-none transition-all"
            />
          </div>

          <select
            value={filterAction}
            onChange={e => setFilterAction(e.target.value)}
            className="bg-[#F4F4F5] hover:bg-[#EAEAEA] border border-transparent focus:border-black/20 focus:bg-white text-[#18181B] text-xs font-medium px-4 py-2 rounded-full focus:outline-none cursor-pointer transition-all"
          >
            <option value="all">Todas las Acciones</option>
            <option value="stock_adjustment">Ajuste Multicanal</option>
            <option value="siigo_sync">Facturación DIAN Siigo</option>
            <option value="create">Creación</option>
            <option value="update">Actualización</option>
            <option value="delete">Eliminación</option>
          </select>

          <select
            value={filterEntity}
            onChange={e => setFilterEntity(e.target.value)}
            className="bg-[#F4F4F5] hover:bg-[#EAEAEA] border border-transparent focus:border-black/20 focus:bg-white text-[#18181B] text-xs font-medium px-4 py-2 rounded-full focus:outline-none cursor-pointer transition-all"
          >
            <option value="all">Todas las Entidades</option>
            <option value="product">Productos / Inventario</option>
            <option value="order">Órdenes / Pedidos</option>
            <option value="coupon">Cupones</option>
            <option value="appointment">Citas Showroom</option>
            <option value="user">Usuarios</option>
          </select>
        </div>

        <span className="text-xs font-medium text-[#71717A] self-center">
          {filteredLogs.length} eventos registrados
        </span>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-[#EAE7E1] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-[#FAF9F7] border-b border-[#F0EFEA] text-[11px] font-semibold text-[#71717A]">
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">User / Advisor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Entity</th>
                <th className="py-3.5 px-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5] text-[#18181B]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#71717A]">
                    No se encontraron registros de auditoría coincidentes con los filtros.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-[#FAF9F7]/90 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-[#71717A]">
                      {new Date(log.created_at).toLocaleString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-[#18181B]">{log.user_name || 'Administrador'}</div>
                      <div className="text-[11px] text-[#71717A]">{log.user_email || 'admin@montezzi.com'}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-[#18181B]">{log.entity_name || log.entity_type}</div>
                      <div className="text-[10px] text-[#71717A] uppercase font-mono">{log.entity_type}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#52525B]">
                      <p className="line-clamp-2">{log.description}</p>
                      {log.details && (
                        <span className="text-[10px] font-mono text-[#A1A1AA] block mt-0.5">
                          {JSON.stringify(log.details)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
