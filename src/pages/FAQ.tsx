import React, { useState } from 'react';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: '¿Montezzi realiza envíos a todo Colombia?',
      a: 'Sí. Realizamos envíos nacionales mediante transportadoras aliadas. Los tiempos y condiciones pueden variar según el destino y su facilidad de acceso.'
    },
    {
      q: '¿Cuánto tarda en llegar un pedido?',
      a: 'En Medellín, un (1) día hábil. En otras ciudades, entre dos (2) y tres (3) días hábiles desde la confirmación del pago y aprobación. Municipios alejados, zonas rurales o destinos especiales pueden tardar más.'
    },
    {
      q: '¿Los productos incluyen tornillos y accesorios?',
      a: 'Los componentes incluidos varían según la referencia. La ficha técnica indicará el contenido disponible. Antes de comprar, confirme si incluye tornillos, soportes, correderas u otros componentes necesarios.'
    },
    {
      q: '¿Puedo comprar en el showroom?',
      a: 'Sí. Puede conocer y comprar productos en el showroom. La dirección, horarios y modalidad de atención se publicarán próximamente.'
    },
    {
      q: '¿Venden al por mayor?',
      a: 'Sí. Atendemos distribuidores, carpinteros, fabricantes, instaladores, diseñadores, arquitectos y empresas. Las condiciones dependen de productos, cantidades y características del pedido.'
    },
    {
      q: '¿Cómo solicito una cotización?',
      a: 'Solicítela por los canales oficiales indicando referencias, cantidades, medidas y ciudad de entrega. El equipo comercial revisará disponibilidad y preparará una propuesta técnica y económica.'
    },
    {
      q: '¿Cómo solicito una garantía?',
      a: 'Comuníquese por los canales oficiales y suministre factura o pedido, referencia, descripción de la falla y fotos o videos. La solicitud será evaluada técnicamente y no implica aprobación automática.'
    },
    {
      q: '¿Puedo cambiar una referencia o medida?',
      a: 'Los cambios voluntarios requieren autorización y disponibilidad. El producto debe estar sin instalar, sin usar, completo y con empaque original. El cliente asume el transporte. No se aceptan productos instalados, perforados, cortados, modificados o especiales.'
    },
    {
      q: '¿Qué hago si mi pedido llega incompleto o averiado?',
      a: 'Reporte la novedad dentro de las 24 horas posteriores a la entrega y envíe fotos o videos del empaque, guía y productos. Confirmada la novedad de despacho o transporte, Montezzi gestionará la solución y los costos correspondientes.'
    },
    {
      q: '¿Cómo puedo conocer la disponibilidad de un producto?',
      a: 'Consulte la página web oficial o los canales comerciales. El inventario cambia dinámicamente y solamente se reserva cuando el pago es confirmado y el pedido aprobado.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-sans tracking-[0.25em] text-black/70 uppercase font-bold">
          Atención & Soporte
        </span>
        <h1 className="font-sans text-3xl sm:text-5xl text-obsidian uppercase font-bold tracking-wider">
          Preguntas Frecuentes
        </h1>
        <p className="text-sm text-obsidian/70 font-sans">
          Respuestas oficiales sobre compras, envíos, especificaciones técnicas y garantías de Montezzi.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-black absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Escribe tu consulta (ej: envíos, showroom, instalación, garantía)..."
          className="w-full bg-white border border-black/15 text-obsidian pl-11 pr-4 py-3 text-xs font-sans focus:outline-none focus:border-black placeholder:text-obsidian/40 rounded-sm shadow-xs"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="font-sans text-sm sm:text-base text-obsidian font-semibold pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-black shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-obsidian/80 font-sans leading-relaxed border-t border-black/[0.06] bg-black/[0.02]">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <GoldenDivider variant="centered" />

      {/* Still have questions */}
      <div className="p-8 glass-card rounded-sm text-center space-y-3">
        <HelpCircle className="w-8 h-8 text-black mx-auto stroke-[1.5]" />
        <h3 className="font-sans text-xl sm:text-2xl text-obsidian uppercase font-bold tracking-wider">¿Necesitas asesoría técnica personalizada?</h3>
        <p className="text-xs text-obsidian/70 font-sans max-w-md mx-auto">
          Nuestro equipo de ejecutivos comerciales y soporte técnico acompaña cada proyecto arquitectónico.
        </p>
        <div className="pt-2">
          <a
            href="/distribucion"
            className="inline-block px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/85 transition-all shadow-md"
          >
            Contactar Asesor
          </a>
        </div>
      </div>
    </div>
  );
};
