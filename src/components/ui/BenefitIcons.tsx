import React from 'react';
import { Layers, VolumeX, ShieldCheck, ArrowLeftRight, Weight } from 'lucide-react';
import { ProductBenefit } from '../../types/database';

interface BenefitIconsProps {
  benefits?: ProductBenefit[];
  className?: string;
}

export const BenefitIcons: React.FC<BenefitIconsProps> = ({ benefits, className = '' }) => {
  if (!benefits || benefits.length === 0) return null;

  const getIcon = (label: string) => {
    const l = label.toUpperCase();
    if (l.includes('MATERIAL')) return <Layers className="w-5 h-5 stroke-[1.5]" />;
    if (l.includes('CIERRE')) return <VolumeX className="w-5 h-5 stroke-[1.5]" />;
    if (l.includes('CARGA')) return <Weight className="w-5 h-5 stroke-[1.5]" />;
    if (l.includes('DURABILIDAD')) return <ShieldCheck className="w-5 h-5 stroke-[1.5]" />;
    if (l.includes('ACCESO')) return <ArrowLeftRight className="w-5 h-5 stroke-[1.5]" />;
    return <ShieldCheck className="w-5 h-5 stroke-[1.5]" />;
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 ${className}`}>
      {benefits.slice(0, 5).map((b, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-center p-3.5 rounded-sm glass-card hover:border-black/40 transition-all duration-200"
        >
          <div className="text-black mb-2 p-2 rounded-full bg-black/5 border border-black/10">
            {getIcon(b.label)}
          </div>
          <span className="text-[10px] font-sans font-bold tracking-[0.18em] text-black uppercase mb-1">
            {b.label}
          </span>
          <span className="text-xs text-obsidian font-sans leading-tight">
            {b.value}
          </span>
        </div>
      ))}
    </div>
  );
};
