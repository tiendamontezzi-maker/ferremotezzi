import React from 'react';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { Compass, Target, Eye, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-sans tracking-[0.25em] text-black/70 uppercase font-bold">
          Identidad & Manifiesto Institucional
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-obsidian uppercase font-bold tracking-wider">
          La esencia de Montezzi
        </h1>
        <p className="font-sans text-lg sm:text-xl text-obsidian/75 font-medium tracking-tight">
          «Detalles que definen lujo.»
        </p>
      </div>

      <GoldenDivider variant="centered" />

      {/* Main Story (Nosotros) */}
      <div className="max-w-none text-obsidian/80 font-sans leading-relaxed space-y-6 text-base sm:text-lg">
        <p>
          En <strong className="text-obsidian">Montezzi</strong> creemos que los detalles tienen el poder de transformar cada espacio. Por eso seleccionamos herrajes y soluciones de organización que combinan diseño, funcionalidad y calidad para cocinas, clósets, puertas y mobiliario.
        </p>
        <p>
          Nuestro portafolio está pensado para responder a las necesidades de carpinteros, fabricantes de muebles, diseñadores, arquitectos y clientes que buscan crear ambientes más organizados, prácticos y visualmente atractivos.
        </p>
        <p>
          Más que ofrecer productos, queremos acompañar cada proyecto con asesoría cercana, información clara y soluciones adecuadas para cada aplicación. En Montezzi trabajamos para que cada herraje aporte precisión, comodidad y carácter al resultado final.
        </p>
      </div>

      {/* Principle Banner */}
      <div className="glass-card p-8 sm:p-10 rounded-sm text-center space-y-2">
        <span className="text-xs font-sans tracking-[0.25em] text-black uppercase font-bold">
          Principio Rector
        </span>
        <h3 className="font-sans text-xl sm:text-2xl text-obsidian font-bold uppercase tracking-wider">
          Sofisticación visual + precisión técnica + utilidad real.
        </h3>
      </div>

      {/* Mission & Vision (Visión 2031) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 glass-card rounded-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-black">
            <Target className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="font-sans text-lg uppercase font-bold tracking-wider text-obsidian">Nuestra Misión</h3>
          <p className="text-sm text-obsidian/75 font-sans leading-relaxed">
            Ofrecer herrajes y soluciones de organización funcionales, confiables y cuidadosamente seleccionadas para cocinas, clósets, puertas y mobiliario, acompañando a profesionales y clientes en la creación de espacios más eficientes, organizados y visualmente atractivos.
          </p>
          <p className="text-sm text-obsidian/75 font-sans leading-relaxed">
            Trabajamos con un servicio cercano, asesoría especializada y un portafolio en constante evolución, buscando que cada cliente encuentre la solución adecuada para desarrollar sus proyectos con confianza.
          </p>
        </div>

        <div className="p-8 glass-card rounded-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-black">
            <Eye className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="font-sans text-lg uppercase font-bold tracking-wider text-obsidian">Nuestra Visión 2031</h3>
          <p className="text-sm text-obsidian/75 font-sans leading-relaxed">
            Para el año 2031, ser una de las marcas referentes en Colombia en herrajes y soluciones de organización para cocinas, clósets y mobiliario, reconocida por la funcionalidad de sus productos, la evolución constante de su portafolio y la calidad de su atención.
          </p>
          <p className="text-sm text-obsidian/75 font-sans leading-relaxed">
            Buscamos consolidar una presencia nacional, fortalecer nuestra relación con carpinteros, fabricantes de muebles, diseñadores, arquitectos y distribuidores, e incorporar continuamente soluciones que respondan a las nuevas tendencias y necesidades del mercado.
          </p>
        </div>
      </div>

      {/* Showroom Preview Note */}
      <div className="p-6 glass-card text-xs text-obsidian/70 space-y-1 rounded-sm">
        <span className="text-black uppercase tracking-wider font-bold block">
          Showroom Montezzi
        </span>
        <p>
          Nuestra sede de exhibición arquitectónica en Medellín abrirá próximamente para recibir a profesionales con atención personalizada y muestras operativas de todos nuestros mecanismos.
        </p>
      </div>
    </div>
  );
};
