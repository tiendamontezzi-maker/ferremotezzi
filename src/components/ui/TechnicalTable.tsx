import React from 'react';
import { TechnicalSpecs } from '../../types/database';

interface TechnicalTableProps {
  specs: TechnicalSpecs;
  className?: string;
}

export const TechnicalTable: React.FC<TechnicalTableProps> = ({ specs, className = '' }) => {
  const rows = [
    { label: 'MATERIAL', value: specs.material },
    { label: 'ACABADO', value: specs.acabado },
    { label: 'DIMENSIONES (W*D*H)', value: specs.dimensiones },
    { label: 'MECANISMO', value: specs.mecanismo },
    specs.capacidad_carga ? { label: 'CAPACIDAD DE CARGA', value: specs.capacidad_carga } : null,
    specs.compatibilidad ? { label: 'COMPATIBILIDAD', value: specs.compatibilidad } : null,
    specs.unidades_empaque ? { label: 'PRESENTACIÓN', value: specs.unidades_empaque } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className={`overflow-hidden glass-card rounded-sm ${className}`}>
      <div className="bg-black/[0.03] px-4 py-2.5 border-b border-black/[0.08] flex items-center justify-between">
        <span className="text-xs font-sans tracking-[0.2em] text-black uppercase font-bold">
          Ficha Técnica Oficial
        </span>
        <span className="text-[10px] text-obsidian/50 uppercase tracking-widest font-mono">
          Estándar Montezzi 2026
        </span>
      </div>

      <div className="divide-y divide-black/[0.06]">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-3 px-4 py-3 text-xs gap-1 md:gap-4 hover:bg-black/[0.02] transition-colors"
          >
            <span className="font-sans font-semibold tracking-wider text-obsidian/70 uppercase">
              {row.label}
            </span>
            <span className="md:col-span-2 font-sans text-obsidian font-normal tracking-wide">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
