import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { exportToCSV, exportToJSON } from '../../utils/csvExportImport';
import {
  Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle2,
  AlertCircle, Download, Plus, MessageSquare, Check, X
} from 'lucide-react';

export const AppointmentsTab: React.FC = () => {
  const { appointments } = useProducts();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAppointments = appointments.filter(apt => {
    if (filterStatus !== 'all' && apt.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (apt.customer_name || '').toLowerCase().includes(q);
      const matchEmail = (apt.customer_email || '').toLowerCase().includes(q);
      const matchType = (apt.service_type || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchType) return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    exportToCSV('montezzi_citas_showroom', appointments, [
      { header: 'ID Cita', key: 'id' },
      { header: 'Cliente / Arquitecto', key: 'customer_name' },
      { header: 'Email', key: 'customer_email' },
      { header: 'Teléfono', key: 'customer_phone' },
      { header: 'Tipo de Servicio', key: 'service_type' },
      { header: 'Fecha Cita', key: 'appointment_date' },
      { header: 'Hora', key: 'appointment_time' },
      { header: 'Ciudad', key: (a) => a.city || 'Medellín' },
      { header: 'Estado', key: 'status' },
      { header: 'Notas', key: (a) => a.notes || '' }
    ]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-xs bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase">Confirmada</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-xs bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold uppercase">Por Confirmar</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-xs bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-mono font-bold uppercase">Atendida</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-xs bg-red-50 text-red-800 border border-red-200 text-[10px] font-mono font-bold uppercase">Cancelada</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-xs bg-black/5 text-obsidian text-[10px] font-mono font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-[#5A3927]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#5A3927] uppercase bg-[#F2ECE4] border border-[#DDD6C8] px-2 py-0.5 rounded-xs font-semibold">
              Gestión de Agenda · Showroom Medellín
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs font-bold">
              {appointments.filter(a => a.status === 'confirmed').length} Citas Confirmadas
            </span>
          </div>
          <h2 className="font-sans text-xl font-bold text-obsidian uppercase tracking-wider">
            Citas de Asesoría & Visitas de Medición
          </h2>
          <p className="text-xs text-obsidian/60 font-sans">
            Agendamiento presencial en Showroom de El Poblado o sesiones virtuales de especificación técnica para arquitectos
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3 py-2 bg-black text-white hover:bg-black/85 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Agenda (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-[#E2DDD4] rounded-sm shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/40" />
            <input
              type="text"
              placeholder="Buscar por cliente o servicio..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs pl-8 pr-3 py-2 rounded-xs focus:outline-none focus:border-black"
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD6C8] text-obsidian text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-black"
          >
            <option value="all">Todos los Estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Atendidas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        <span className="text-xs font-mono text-obsidian/60 self-center">
          {filteredAppointments.length} citas listadas
        </span>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAppointments.map(apt => (
          <div key={apt.id} className="glass-card p-5 rounded-xl border border-white/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-black font-bold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-black" />
                {apt.appointment_date} · {apt.appointment_time}
              </span>
              {getStatusBadge(apt.status)}
            </div>

            <div>
              <h4 className="font-sans text-sm font-bold text-obsidian uppercase tracking-wide">
                {apt.customer_name}
              </h4>
              <p className="text-xs text-obsidian/60 font-sans mt-0.5">
                {apt.service_type}
              </p>
            </div>

            <div className="text-xs text-obsidian/70 space-y-1 pt-1 border-t border-black/[0.06]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-obsidian/40" />
                <span className="font-mono">{apt.customer_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-obsidian/40" />
                <span>{apt.customer_email}</span>
              </div>
              {apt.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-obsidian/40" />
                  <span className="truncate">{apt.address}</span>
                </div>
              )}
            </div>

            {apt.notes && (
              <div className="p-2.5 bg-black/[0.03] rounded-xs text-[11px] text-obsidian/75 font-sans italic">
                "{apt.notes}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
