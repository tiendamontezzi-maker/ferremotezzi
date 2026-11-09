import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { AppointmentServiceType } from '../../types/database';
import {
  Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle2,
  X, Sparkles, Building, Video, Wrench, Shield
} from 'lucide-react';

interface ShowroomAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowroomAppointmentModal: React.FC<ShowroomAppointmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const { createAppointment } = useProducts();
  const { user } = useAuth();

  const [serviceType, setServiceType] = useState<AppointmentServiceType>('visita_showroom');
  const [customerName, setCustomerName] = useState(user?.full_name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:00');
  const [location, setLocation] = useState('Showroom Montezzi - Milla de Oro, Medellín');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdRef, setCreatedRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !appointmentDate || !appointmentTime) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newApt = await createAppointment({
        user_id: user?.id,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        service_type: serviceType,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        location: serviceType === 'asesoria_virtual' ? 'Google Meet / Zoom' : location,
        notes: notes.trim() || undefined,
        consultant_name: 'Asesor Especializado Montezzi'
      });

      setCreatedRef(newApt.id.slice(0, 8).toUpperCase());
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Error al agendar la cita. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setCreatedRef('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white border border-black/10 rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-obsidian text-white p-6 border-b border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold px-2 py-0.5 bg-white/10 rounded-xs">
                Experiencia Privada
              </span>
              <span className="text-xs text-white/40">·</span>
              <span className="text-[10px] text-white/60 tracking-wider">Showroom Medellín</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-white font-normal">
              Agendar Asesoría Arquitectónica
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-white/60 hover:text-white rounded-xs hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-obsidian">¡Cita Reservada con Éxito!</h3>
              <p className="text-xs text-obsidian/70 font-sans max-w-md mx-auto leading-relaxed">
                Hemos registrado tu solicitud para el <strong>{appointmentDate}</strong> a las <strong>{appointmentTime}</strong>. 
                Uno de nuestros arquitectos asesores se comunicará a tu WhatsApp o correo para confirmar los detalles.
              </p>
            </div>
            <div className="inline-block px-4 py-2 bg-black/[0.03] border border-black/10 rounded font-mono text-xs text-obsidian">
              Ref de Reserva: <strong className="text-black">APPT-{createdRef}</strong>
            </div>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-8 py-3 bg-obsidian text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md"
              >
                Cerrar y Continuar Explorando
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Service Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-obsidian">
                Modalidad del Servicio
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'visita_showroom', label: 'Showroom Presencial', icon: Building, desc: 'Milla de Oro, Medellín' },
                  { id: 'asesoria_virtual', label: 'Asesoría Virtual', icon: Video, desc: 'Meet / Zoom con planos' },
                  { id: 'especificacion_obra', label: 'Especificación de Obra', icon: Sparkles, desc: 'Revisión técnica de carpintería' },
                  { id: 'instalacion_tecnica', label: 'Acompañamiento Instalación', icon: Wrench, desc: 'Para cuadrillas y carpinteros' },
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = serviceType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setServiceType(item.id as AppointmentServiceType);
                        if (item.id === 'asesoria_virtual') {
                          setLocation('Videollamada Google Meet');
                        } else {
                          setLocation('Showroom Montezzi - Milla de Oro, Medellín');
                        }
                      }}
                      className={`p-3 text-left border rounded-xs transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-black bg-black/[0.03] shadow-xs'
                          : 'border-black/10 hover:border-black/30 bg-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-black' : 'text-obsidian/40'}`} />
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-black' : 'text-obsidian'}`}>
                          {item.label}
                        </div>
                        <div className="text-[10px] text-obsidian/60 leading-tight">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-obsidian mb-1">
                  Fecha Deseada *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-obsidian/40" />
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-9 pr-3 py-2 border border-black/15 text-xs text-obsidian rounded-xs focus:border-black focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-obsidian mb-1">
                  Hora Preferida *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-3 text-obsidian/40" />
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-black/15 text-xs text-obsidian rounded-xs focus:border-black focus:outline-none bg-white"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-obsidian mb-1">
                  Nombre Completo / Estudio de Arquitectura *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-obsidian/40" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Arq. Sofía Echeverri / Estudio S&M"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-black/15 text-xs text-obsidian rounded-xs focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-obsidian mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-obsidian/40" />
                    <input
                      type="email"
                      required
                      placeholder="arquitectura@estudio.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-black/15 text-xs text-obsidian rounded-xs focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-obsidian mb-1">
                    WhatsApp / Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-obsidian/40" />
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-black/15 text-xs text-obsidian rounded-xs focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes / Project Details */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-obsidian mb-1">
                Detalles del Proyecto o Referencias de Interés (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ej. Proyecto de 12 cocinas en El Poblado; requerimos evaluar tiradores Latón Dorado KDJ-T y bisagras soft-close..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 border border-black/15 text-xs text-obsidian rounded-xs focus:border-black focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between border-t border-black/10">
              <span className="text-[11px] text-obsidian/60 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-black" />
                Atención personalizada sin costo
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-obsidian text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Reservando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
