import React, { useState } from 'react';
import { ChevronDown, ShieldAlert } from 'lucide-react';

interface PreInstallationNoticeProps {
  defaultOpen?: boolean;
  className?: string;
}

export const PreInstallationNotice: React.FC<PreInstallationNoticeProps> = ({
  defaultOpen = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-montezzigold/40 rounded-sm bg-white overflow-hidden shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full px-5 py-4 flex items-center justify-between text-left bg-[#F3EEE5] hover:bg-[#EAE4D8] transition-colors"
      >
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-montezzigold shrink-0 stroke-[1.5]" />
          <span className="font-serif text-base md:text-lg text-obsidian font-semibold tracking-wide">
            Información importante antes de comprar e instalar
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-montezzigold transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-5 text-sm text-obsidian/85 space-y-3 font-sans border-t border-[#E2DDD4] leading-relaxed bg-[#FAF8F5]">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-montezzigold shrink-0 mt-2" />
            <p>
              <strong className="text-obsidian">Verificación previa obligatoria:</strong> Antes de comprar o instalar, verifique medidas, referencia, color, sentido de apertura, capacidad y compatibilidad con el mueble o espacio.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-montezzigold shrink-0 mt-2" />
            <p>
              <strong className="text-obsidian">Instalación profesional y alcance de garantía:</strong> La instalación debe ser realizada por personal capacitado y conforme a las especificaciones. Montezzi no responde por daños derivados de instalación incorrecta, uso inadecuado, sobrecarga, perforaciones, cortes, modificaciones o aplicaciones distintas.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-montezzigold shrink-0 mt-2" />
            <p>
              <strong className="text-obsidian">Condición para cambios voluntarios:</strong> Antes de perforar, cortar, ensamblar o modificar, compruebe todas las características. Los productos instalados, usados o modificados no podrán cambiarse voluntariamente por medida, color, referencia o decisión de compra.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-montezzigold shrink-0 mt-2" />
            <p>
              <strong className="text-obsidian">Fidelidad de imagen:</strong> Las imágenes son ilustrativas y pueden presentar variaciones de color por iluminación, pantalla o lote. Consulte al equipo si requiere confirmar una especificación.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
