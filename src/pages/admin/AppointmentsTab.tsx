import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { exportToCSV } from '../../utils/csvExportImport';
import {
  Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle2,
  Download, Search
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
        return <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#10B981] text-[11px] font-semibold">Confirmada</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] text-[11px] font-semibold">Por Confirmar</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] text-[11px] font-semibold">Atendida</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[11px] font-semibold">Cancelada</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-[#F4F4F5] text-[#52525B] text-[11px] font-semibold capitalize">{status}</span>;
    }
  };

  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Citas Showroom</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {appointments.length}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Showroom El Poblado & Asesoría Virtual
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Citas Confirmadas</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#10B981] tracking-tight my-1">
            {confirmedCount}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Asignadas a especialistas de herrajes
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Pendientes por Confirmar</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#D97706] tracking-tight my-1">
            {pendingCount}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            En espera de confirmación por WhatsApp
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-[#EAE7E1] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap flex-1 items-center gap-2.5">
          <div className="relative flex-1 min-w-[220px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Buscar por cliente o servicio..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F4F5] border border-transparent focus:border-black/20 focus:bg-white text-[#18181B] text-xs pl-9 pr-4 py-2 rounded-full focus:outline-none transition-all"
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#F4F4F5] hover:bg-[#EAEAEA] border border-transparent focus:border-black/20 focus:bg-white text-[#18181B] text-xs font-medium px-4 py-2 rounded-full focus:outline-none cursor-pointer transition-all"
          >
            <option value="all">Todos los Estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Atendidas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#71717A]">
            {filteredAppointments.length} citas listadas
          </span>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAppointments.map(apt => (
          <div
            key={apt.id}
            className="bg-white border border-[#EAE7E1] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#18181B] font-semibold bg-[#F4F4F5] px-3 py-1 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#18181B]" />
                {apt.appointment_date} · {apt.appointment_time}
              </span>
              {getStatusBadge(apt.status)}
            </div>

            <div>
              <h4 className="font-sans text-sm font-bold text-[#18181B] normal-case">
                {apt.customer_name}
              </h4>
              <p className="text-xs text-[#71717A] font-sans mt-0.5 capitalize">
                {apt.service_type}
              </p>
            </div>

            <div className="text-xs text-[#52525B] space-y-1.5 pt-3 border-t border-[#F4F4F5]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A1A1AA]" />
                <span className="font-mono">{apt.customer_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A1A1AA]" />
                <span>{apt.customer_email}</span>
              </div>
              {(apt.address || apt.location) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span className="truncate">{apt.address || apt.location}</span>
                </div>
              )}
            </div>

            {apt.notes && (
              <div className="p-3 bg-[#FAF9F7] border border-[#EAE7E1] rounded-xl text-xs text-[#52525B] font-sans">
                "{apt.notes}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
