import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { exportToCSV, exportToJSON } from '../../utils/csvExportImport';
import {
  ShieldCheck, Clock, User, Filter, Search, Download, CheckCircle2,
  AlertCircle, FileText, Package, ShoppingBag, ArrowUpRight
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
        return <span className="px-2 py-0.5 rounded-xs bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase">Facturación DIAN</span>;
      case 'stock_adjustment':
        return <span className="px-2 py-0.5 rounded-xs bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-mono font-bold uppercase">Ajuste Multicanal</span>;
      case 'create':
        return <span className="px-2 py-0.5 rounded-xs bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-mono font-bold uppercase">Creación</span>;
      case 'update':
        return <span className="px-2 py-0.5 rounded-xs bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold uppercase">Actualización</span>;
      case 'delete':
        return <span className="px-2 py-0.5 rounded-xs bg-red-50 text-red-800 border border-red-200 text-[10px] font-mono font-bold uppercase">Eliminación</span>;
      default:
        return <span className="px-2 py-0.5 rounded-xs bg-black/5 text-obsidian border border-black/10 text-[10px] font-mono font-bold uppercase">{action}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-black">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-black uppercase bg-black/5 border border-black/10 px-2 py-0.5 rounded-xs font-semibold">
              Trazabilidad Inmutable · Supabase RLS
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs font-bold">
              Auditoría Activa
            </span>
          </div>
          <h2 className="font-sans text-xl font-bold text-obsidian uppercase tracking-wider">
            Auditoría de Actividad & Logs del Sistema
          </h2>
          <p className="text-xs text-obsidian/60 font-sans">
            Registro cronológico inmutable de ajustes de inventario multicanal, emisiones fiscales DIAN y cambios administrativos
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3 py-2 bg-black text-white hover:bg-black/85 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Historial (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-[#E2DDD4] rounded-sm shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/40" />
            <input
              type="text"
              placeholder="Buscar por descripción, usuario o ítem..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs pl-8 pr-3 py-2 rounded-xs focus:outline-none focus:border-black"
            />
          </div>

          <select
            value={filterAction}
            onChange={e => setFilterAction(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-black"
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
            className="bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-black"
          >
            <option value="all">Todas las Entidades</option>
            <option value="product">Productos / Inventario</option>
            <option value="order">Órdenes / Pedidos</option>
            <option value="coupon">Cupones</option>
            <option value="appointment">Citas Showroom</option>
            <option value="user">Usuarios</option>
          </select>
        </div>

        <span className="text-xs font-mono text-obsidian/60 self-center">
          {filteredLogs.length} eventos registrados
        </span>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-black/[0.03] border-b border-black/[0.08] text-black uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="p-3.5">Fecha & Hora</th>
                <th className="p-3.5">Usuario / Asesor</th>
                <th className="p-3.5">Acción</th>
                <th className="p-3.5">Entidad / Registro</th>
                <th className="p-3.5">Detalles del Evento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] text-obsidian">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-obsidian/40 italic">
                    No se encontraron registros de auditoría coincidentes con los filtros.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-3.5 whitespace-nowrap font-mono text-obsidian/70">
                      {new Date(log.created_at).toLocaleString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-obsidian">{log.user_name || 'Administrador'}</div>
                      <div className="text-[10px] text-obsidian/50 font-mono">{log.user_email || 'admin@montezzi.com'}</div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-mono text-black font-semibold">{log.entity_name || log.entity_type}</div>
                      <div className="text-[10px] text-obsidian/50 uppercase font-mono">{log.entity_type}</div>
                    </td>
                    <td className="p-3.5 text-obsidian/80">
                      <p className="line-clamp-2">{log.description}</p>
                      {log.details && (
                        <span className="text-[10px] font-mono text-obsidian/50 block mt-0.5">
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
