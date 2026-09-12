import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'symbol' | 'minim';
  theme?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'compact',
  theme = 'light',
  className = '',
  size = 'md'
}) => {
  const isLight = theme === 'light';
  const textColor = isLight ? '#11100F' : '#F3EEE5';

  if (variant === 'symbol') {
    return (
      <Link to="/" className={`inline-flex items-center justify-center font-serif font-bold text-montezzigold transition-transform duration-300 hover:scale-105 ${className}`}>
        <span className="text-3xl" style={{ fontFamily: '"EB Garamond", serif', color: '#B68A48' }}>
          M
        </span>
      </Link>
    );
  }

  // Exact minimalist header logo like "minim" in the user reference image
  if (variant === 'minim' || variant === 'compact') {
    return (
      <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
        <span className="font-serif text-2xl font-bold text-montezzigold group-hover:scale-105 transition-transform" style={{ fontFamily: '"EB Garamond", serif' }}>
          M
        </span>
        <span
          className="font-sans font-bold tracking-[0.16em] text-xl uppercase transition-colors"
          style={{ color: textColor }}
        >
          montezzi
        </span>
      </Link>
    );
  }

  // Full centered official identity
  return (
    <Link to="/" className={`inline-flex flex-col items-center text-center group ${className}`}>
      <span
        className="font-serif text-4xl font-semibold leading-none mb-1 text-montezzigold transition-transform duration-300 group-hover:scale-105"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        M
      </span>
      <span
        className="font-sans tracking-[0.22em] font-bold text-lg uppercase leading-none"
        style={{ color: textColor }}
      >
        montezzi
      </span>
      <div className="h-[1px] w-8 bg-montezzigold/60 my-1.5" />
      <span className="font-sans tracking-[0.20em] uppercase text-[9px] text-obsidian/60">
        Detalles que definen lujo
      </span>
    </Link>
  );
};
