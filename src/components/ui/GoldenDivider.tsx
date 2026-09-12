import React from 'react';

interface GoldenDividerProps {
  className?: string;
  variant?: 'subtle' | 'gradient' | 'centered';
}

export const GoldenDivider: React.FC<GoldenDividerProps> = ({
  className = '',
  variant = 'subtle'
}) => {
  if (variant === 'gradient') {
    return (
      <div className={`w-full flex items-center justify-center my-6 ${className}`}>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-montezzigold/60 to-transparent" />
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className={`w-full flex items-center justify-center gap-3 my-6 ${className}`}>
        <div className="w-16 h-[1px] bg-montezzigold/50" />
        <span className="w-1.5 h-1.5 rotate-45 border border-montezzigold bg-[#FAF8F5] inline-block" />
        <div className="w-16 h-[1px] bg-montezzigold/50" />
      </div>
    );
  }

  return (
    <div className={`w-full h-[1px] bg-montezzigold/30 my-4 ${className}`} />
  );
};
