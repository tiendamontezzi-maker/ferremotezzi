import React from 'react';
import { useLocation } from 'react-router-dom';

export const WHATSAPP_NUMBER_CLEAN = '573126653556';
export const WHATSAPP_NUMBER_DISPLAY = '(312) 665-3556';

export const OfficialWhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.257.59 4.46 1.71 6.404L3.09 28.8l6.564-1.721a12.742 12.742 0 0 0 6.346 1.688h.005c7.067 0 12.8-5.732 12.8-12.8 0-3.42-1.332-6.636-3.75-9.054A12.716 12.716 0 0 0 16.004 3.2zm0 23.407h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-3.895 1.021 1.04-3.797-.253-.402a10.587 10.587 0 0 1-1.628-5.654c0-5.859 4.768-10.626 10.631-10.626 2.839 0 5.508 1.106 7.515 3.114a10.562 10.562 0 0 1 3.112 7.517c0 5.86-4.768 10.627-10.626 10.627zm5.829-7.959c-.319-.16-1.89-.933-2.183-1.04-.292-.106-.505-.16-.718.16-.213.32-.824 1.04-1.01 1.253-.186.213-.373.24-.692.08-.319-.16-1.347-.497-2.566-1.584-.949-.846-1.589-1.892-1.775-2.212-.186-.32-.02-.493.14-.652.144-.143.319-.373.479-.56.16-.186.213-.32.319-.533.106-.213.053-.4-.027-.56-.08-.16-.718-1.732-.984-2.371-.259-.622-.522-.538-.718-.548l-.612-.01c-.213 0-.558.08-.851.4-.292.32-1.117 1.092-1.117 2.664s1.144 3.09 1.303 3.304c.16.213 2.251 3.437 5.453 4.82.762.329 1.356.525 1.82.672.765.243 1.461.209 2.011.127.614-.092 1.89-.773 2.156-1.519.266-.746.266-1.385.186-1.518-.08-.133-.292-.213-.612-.373z" />
  </svg>
);

export const buildWhatsAppUrl = (customMessage?: string) => {
  const defaultMsg =
    'Hola Montezzi, me gustaría recibir asesoría sobre sus herrajes arquitectónicos y sistemas de organización.';
  return `https://wa.me/${WHATSAPP_NUMBER_CLEAN}?text=${encodeURIComponent(
    customMessage || defaultMsg
  )}`;
};

export const WhatsAppFloatingButton: React.FC = () => {
  const { pathname } = useLocation();

  // Detect if user is on a single product page (/producto/KDJ-XX)
  const productMatch = pathname.match(/^\/producto\/([^/]+)/i);
  const currentCode = productMatch ? decodeURIComponent(productMatch[1]).toUpperCase() : null;

  const message = currentCode
    ? `Hola Montezzi, estoy viendo la referencia ${currentCode} en su página web y me gustaría recibir asesoría.`
    : 'Hola Montezzi, me gustaría recibir asesoría sobre su catálogo oficial de herrajes arquitectónicos.';

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chatear por WhatsApp Oficial Montezzi al ${WHATSAPP_NUMBER_DISPLAY}`}
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-3 pl-3.5 pr-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_8px_28px_rgba(37,211,102,0.42)] hover:shadow-[0_12px_34px_rgba(37,211,102,0.58)] border border-white/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
    >
      {/* Official WhatsApp Logo Circle */}
      <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
        <span className="absolute inset-0 rounded-full bg-white/25 animate-ping opacity-40" />
        <OfficialWhatsAppIcon className="w-6 h-6 text-white drop-shadow-2xs" />
      </span>

      {/* Branded Text & Phone Number */}
      <div className="flex flex-col text-left leading-tight pr-0.5">
        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/95 flex items-center gap-1.5">
          <span>WhatsApp Oficial</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </span>
        <span className="text-xs font-mono font-bold text-white tracking-tight">
          {WHATSAPP_NUMBER_DISPLAY}
        </span>
      </div>
    </a>
  );
};
