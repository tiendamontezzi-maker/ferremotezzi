import React, { useState } from 'react';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { useProducts } from '../context/ProductContext';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Clock, FileCheck } from 'lucide-react';

export const Wholesale: React.FC = () => {
  const { submitWholesaleLead } = useProducts();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    company: '',
    city: 'Medellín',
    phone: '',
    email: '',
    business_type: 'Carpintero / Fabricante de muebles',
    interested_products: 'Canastas extraíbles y despensas de cocina',
    estimated_volume: '10 a 50 unidades',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitWholesaleLead(form);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-sans tracking-[0.25em] text-black/70 uppercase font-bold">
          Canal Profesional & B2B
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-obsidian uppercase font-bold tracking-wider">
          Ventas al por Mayor y Distribución
        </h1>
        <p className="text-sm sm:text-base text-obsidian/80 font-sans leading-relaxed">
          Montezzi ofrece atención personalizada para distribuidores, carpinteros, fabricantes de muebles, instaladores, arquitectos, diseñadores y empresas interesadas en compras por volumen.
        </p>
      </div>

      <GoldenDivider variant="centered" />

      {/* Value props for partners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-card rounded-sm space-y-3">
          <Building2 className="w-6 h-6 text-black stroke-[1.5]" />
          <h3 className="font-sans text-sm uppercase font-bold tracking-wider text-obsidian">Precios de Fábrica</h3>
          <p className="text-xs text-obsidian/70 font-sans leading-relaxed">
            Márgenes y escalonamiento de precios diseñados para rentabilizar la fabricación y proyectos a gran escala.
          </p>
        </div>
        <div className="p-6 glass-card rounded-sm space-y-3">
          <FileCheck className="w-6 h-6 text-black stroke-[1.5]" />
          <h3 className="font-sans text-sm uppercase font-bold tracking-wider text-obsidian">Fichas Técnicas & CAD</h3>
          <p className="text-xs text-obsidian/70 font-sans leading-relaxed">
            Planos dimensionales exactos y soporte de ingeniería para integración en planos de carpintería y arquitectura.
          </p>
        </div>
        <div className="p-6 glass-card rounded-sm space-y-3">
          <Clock className="w-6 h-6 text-black stroke-[1.5]" />
          <h3 className="font-sans text-sm uppercase font-bold tracking-wider text-obsidian">Ejecutivo Dedicado</h3>
          <p className="text-xs text-obsidian/70 font-sans leading-relaxed">
            Acompañamiento especializado para analizar referencias, frecuencia y entregas programadas en tu ciudad.
          </p>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="glass-card p-8 sm:p-12 rounded-sm">
        {submitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-white border border-black/20 flex items-center justify-center mx-auto text-black shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-2xl uppercase font-bold tracking-wider text-obsidian">Solicitud Registrada Exitosamente</h3>
            <p className="text-sm text-obsidian/70 font-sans max-w-md mx-auto">
              Un ejecutivo de distribución de Montezzi se pondrá en contacto en las próximas 24 horas hábiles para presentar la propuesta comercial.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-black/85 transition-all shadow-xs"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2 pb-6 border-b border-black/[0.08]">
              <span className="text-[11px] font-mono tracking-widest text-black/60 uppercase font-bold">
                Llamado a la acción oficial
              </span>
              <h2 className="font-sans text-xl sm:text-2xl text-obsidian uppercase font-bold tracking-wider">
                Solicitar atención de un ejecutivo de distribución
              </h2>
              <p className="text-xs text-obsidian/60 font-sans">
                Diligencia el formulario oficial para recibir cotizaciones mayoristas, catálogos técnicos y muestras de acabado.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
                {/* 1. Nombre completo */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Ej: Daniel Restrepo"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                {/* 2. Empresa */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Empresa / Taller *</label>
                  <input
                    type="text"
                    required
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Ej: Restrepo Arquitectura & Mobiliario"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                {/* 3. Ciudad */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Ciudad *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Medellín, Bogotá, Cali, etc."
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                {/* 4. Teléfono */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                {/* 5. Correo electrónico */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contacto@tuempresa.com"
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                {/* 6. Actividad comercial */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Actividad Comercial *</label>
                  <select
                    name="business_type"
                    value={form.business_type}
                    onChange={handleChange}
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  >
                    <option value="Carpintero / Fabricante de muebles">Carpintero / Fabricante de muebles</option>
                    <option value="Arquitecto / Diseñador de Interiores">Arquitecto / Diseñador de Interiores</option>
                    <option value="Distribuidor / Ferretería Especializada">Distribuidor / Ferretería Especializada</option>
                    <option value="Constructora / Empresa Inmobiliaria">Constructora / Empresa Inmobiliaria</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* 7. Productos de interés */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Productos de Interés</label>
                  <input
                    type="text"
                    name="interested_products"
                    value={form.interested_products}
                    onChange={handleChange}
                    placeholder="Ej: Canastas cocina, joyeros cuero, bisagras invisibles..."
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>

                {/* 8. Cantidad estimada */}
                <div className="space-y-1.5">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Cantidad / Volumen Estimado</label>
                  <select
                    name="estimated_volume"
                    value={form.estimated_volume}
                    onChange={handleChange}
                    className="w-full bg-white border border-black/15 px-3 py-2.5 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  >
                    <option value="1 a 10 unidades (Proyecto puntual)">1 a 10 unidades (Proyecto puntual)</option>
                    <option value="10 a 50 unidades (Lote mediano)">10 a 50 unidades (Lote mediano)</option>
                    <option value="50 a 200 unidades (Proyecto comercial/edificio)">50 a 200 unidades (Proyecto comercial)</option>
                    <option value="Más de 200 unidades (Distribución continua)">Más de 200 unidades (Distribución continua)</option>
                  </select>
                </div>

                {/* 9. Mensaje o descripción de la solicitud */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-obsidian/80 uppercase tracking-wider font-semibold">Mensaje o Descripción de la Solicitud *</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe el alcance de tu proyecto, referencias que necesitas o requerimientos específicos de entrega..."
                    className="w-full bg-white border border-black/15 p-3 text-obsidian focus:border-black focus:outline-none rounded-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-black text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/85 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  {isSubmitting ? (
                    <span>Enviando Solicitud...</span>
                  ) : (
                    <>
                      <span>Solicitar Atención de un Ejecutivo de Distribución</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
