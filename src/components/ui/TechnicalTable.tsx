import React from 'react';
import { TechnicalSpecs } from '../../types/database';

interface TechnicalTableProps {
  specs: TechnicalSpecs;
  description?: string;
  sku?: string;
  className?: string;
}

export const TechnicalTable: React.FC<TechnicalTableProps> = ({
  specs,
  description,
  sku,
  className = ''
}) => {
  const rows = [
    specs.ref_fabricante || sku
      ? { label: 'REF. FABRICANTE', value: specs.ref_fabricante || sku || '' }
      : null,
    { label: 'APLICACIÓN', value: specs.aplicacion || 'Cocina / Clóset' },
    specs.modulo ? { label: 'MÓDULO COMPATIBLE', value: specs.modulo } : null,
    { label: 'DIMENSIONES', value: specs.dimensiones },
    { label: 'MATERIALES', value: specs.material },
    { label: 'ACABADO / COLOR', value: specs.acabado },
    specs.configuracion ? { label: 'CONFIGURACIÓN', value: specs.configuracion } : null,
    { label: 'SISTEMA / MECANISMO', value: specs.mecanismo }
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className={`overflow-hidden bg-white border border-[#EAE7E1] rounded-2xl shadow-sm ${className}`}>
      {/* Dark Header matching Dossier Técnico 2026 */}
      <div className="bg-[#121316] px-6 py-4 flex items-center justify-between">
        <span className="text-xs font-sans tracking-[0.14em] text-[#C89D54] uppercase font-bold">
          Especificaciones Confirmadas
        </span>
        <span className="text-[10px] text-white/60 uppercase tracking-widest font-mono">
          Dossier Técnico 2026
        </span>
      </div>

      {/* Confirmed Specs Rows */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className={`space-y-0.5 ${
                row.label === 'MATERIALES' || row.label === 'SISTEMA / MECANISMO'
                  ? 'sm:col-span-2'
                  : ''
              }`}
            >
              <span className="block font-sans text-[10px] font-semibold tracking-[0.08em] text-[#71717A] uppercase">
                {row.label}
              </span>
              <span className="block font-sans text-xs sm:text-[13px] text-[#18181B] font-medium leading-snug">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Technical Description Box matching Dossier Técnico 2026 */}
        {(description || specs.nota_tecnica) && (
          <div className="mt-4 p-4 rounded-xl bg-[#F4ECE3] border border-[#E5D8C8] space-y-1.5">
            <span className="block font-sans text-[10px] font-bold tracking-[0.12em] text-[#B68A48] uppercase">
              Descripción Técnica
            </span>
            {description && (
              <p className="text-xs text-[#18181B] font-sans leading-relaxed">
                {description}
              </p>
            )}
            {specs.nota_tecnica && (
              <p className="text-[11px] text-[#52525B] font-sans leading-relaxed pt-1 border-t border-[#E5D8C8]">
                <strong className="text-[#18181B]">Nota:</strong> {specs.nota_tecnica}
              </p>
            )}
          </div>
        )}

        <p className="text-[10px] text-[#A1A1AA] font-sans pt-1">
          Ficha basada en documentación comercial de importación Montezzi 2026. Datos no informados se mantienen sin inferir.
        </p>
      </div>
    </div>
  );
};
