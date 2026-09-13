import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/catalog/ProductCard';
import { useProducts } from '../context/ProductContext';

export const Home: React.FC = () => {
  const { products } = useProducts();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [testimonialPage, setTestimonialPage] = useState(0);

  // 3 Flagship Hero Items for the interactive hero slider (like in the reference image)
  const heroSlides = [
    {
      code: 'KDJ-104',
      titleLine1: 'Rotor Dual',
      titleLine2: 'Watch Winder',
      watermarkText: 'WINDER',
      subtitle: 'Ingeniería silenciosa con rotor programable y blindaje de alta gama para relojería automática.',
      image: '/images/products/hero_watch_winder.jpg',
      link: '/producto/KDJ-104'
    },
    {
      code: 'KDJ-92',
      titleLine1: 'Bandeja Joyero',
      titleLine2: 'Terciopelo & Cuero',
      watermarkText: 'JOYERO',
      subtitle: 'Organización milimétrica para vestidores de lujo con correderas de extracción total sincronizada.',
      image: '/images/products/joyero_closet.jpg',
      link: '/producto/KDJ-92'
    },
    {
      code: 'KDJ-90',
      titleLine1: 'Organizador Extraíble',
      titleLine2: 'Acero Inoxidable',
      watermarkText: 'COCINA',
      subtitle: 'Mecanismo de dos niveles con cierre suave y capacidad técnica para módulos contemporáneos.',
      image: '/images/products/organizador_cocina.jpg',
      link: '/producto/KDJ-90'
    }
  ];

  const currentSlide = heroSlides[currentHeroSlide];

  // Exactly 12 items for the 3x4 grid seen in the user reference image
  const recentProducts = products.slice(0, 12);

  // Testimonials as shown in the reference image
  const testimonials = [
    {
      id: 1,
      text: "La precisión milimétrica de las correderas y bisagras invisibles de Montezzi transformó la entrega de nuestro penthouse en El Poblado.",
      author: "Arq. Valentina Restrepo",
      city: "Medellín"
    },
    {
      id: 2,
      text: "El cajón de seguridad con watch winder es el detalle que todos nuestros clientes de vestidores de lujo piden de forma indispensable.",
      author: "Mateo Morales (Mobel Design)",
      city: "Bogotá"
    },
    {
      id: 3,
      text: "Excelente relación entre ingeniería silenciosa y acabados en nogal y grafito. Tiempos de entrega impecables para fabricantes.",
      author: "Estudio Londoño Arquitectos",
      city: "Cali"
    },
    {
      id: 4,
      text: "La canasta elevable eléctrica superó todas las expectativas técnicas de la cocina integral. Servicio posventa de primer nivel.",
      author: "Daniel Echeverri (Carpintería Fina)",
      city: "Pereira"
    }
  ];

  return (
    <div className="bg-white text-obsidian space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION (Fiel a la foto de referencia: fondo blanco, título a la izquierda, producto gigante con texto watermark outline, paginador 01/03) */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16 pt-8 pb-16">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative">
          
          {/* Left Column: Headline and Link */}
          <div className="lg:col-span-5 space-y-6 z-10">
            {/* Architectural Wood Synergy Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full wood-pill shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A3927] font-mono font-medium">
                Ebanistería Fina · Nogal & Roble
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-obsidian tracking-wider leading-[1.12] uppercase">
                {currentSlide.titleLine1} <br />
                <span className="text-obsidian font-bold font-sans">
                  {currentSlide.titleLine2}
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-obsidian/70 font-sans max-w-sm leading-relaxed">
              {currentSlide.subtitle}
            </p>

            <div>
              <Link
                to={currentSlide.link}
                className="inline-flex items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-black/85 px-6 py-3.5 rounded-xs transition-all shadow-md group"
              >
                <span>Ver esta referencia</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Center/Right: Giant Product Image + Outline Watermark Behind It */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Giant Faint Outline Watermark (Exact like 'CON BOX' in the screenshot) */}
            <div
              className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
              aria-hidden="true"
            >
              <span
                className="text-7xl sm:text-9xl lg:text-[13rem] font-sans font-black tracking-widest text-transparent opacity-30"
                style={{
                  WebkitTextStroke: '1.5px #E8E2D5',
                  letterSpacing: '0.08em'
                }}
              >
                {currentSlide.watermarkText}
              </span>
            </div>

            {/* Ambient Refraction Glow behind Product */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-black/[0.03] to-montezzigold/[0.06] blur-3xl pointer-events-none" />

            {/* Hero Isolated Product Photo */}
            <div className="relative z-10 w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center p-6">
              <img
                src={currentSlide.image}
                alt={currentSlide.titleLine1}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-700 hover:scale-105"
              />
            </div>

            {/* Slider Controls with Reinforced Glassmorphism Pill */}
            <div className="absolute bottom-2 right-4 sm:right-8 flex items-center gap-3 text-xs font-mono z-20 glass-pill px-4 py-2 rounded-full shadow-md border border-white/80">
              <span className="text-obsidian/70 tracking-wider font-semibold">
                0{currentHeroSlide + 1} <span className="text-obsidian/30">/</span> 0{heroSlides.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentHeroSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                  className="p-1.5 hover:bg-black hover:text-white text-obsidian rounded-full transition-all"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentHeroSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                  className="p-1.5 hover:bg-black hover:text-white text-obsidian rounded-full transition-all"
                  aria-label="Slide siguiente"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENT PRODUCTS (Fiel a la foto: título centrado "Recent Products", retícula 4 columnas con fondos cuadrados suaves y estrellas doradas) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-obsidian tracking-widest uppercase">
            Recent Products
          </h2>
          <p className="text-xs text-obsidian/50 font-sans tracking-widest uppercase">
            Colección Oficial Montezzi 2026
          </p>
        </div>

        {/* 4-Column Product Grid (Exact 3 rows x 4 cols = 12 products like in screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {recentProducts.map(product => (
            <ProductCard key={product.id} product={product} showStars={true} />
          ))}
        </div>

        {/* Minimalist Centered Load More button in pure black */}
        <div className="pt-8 text-center">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-3 text-xs font-sans tracking-[0.22em] uppercase font-bold text-white bg-black hover:bg-black/85 px-8 py-3.5 rounded-xs transition-all shadow-md"
          >
            <span>‹</span>
            <span>Explorar Catálogo Completo</span>
            <span>›</span>
          </Link>
        </div>
      </section>

      {/* 2.5. ARCHITECTURAL CRAFTSMANSHIP & NOBLE WOOD SYNERGY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="wood-card rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-[#5A3927]/20 shadow-lg">
          {/* Subtle warm wood grain accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 wood-ribbon" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A3927] font-medium">
                Ebanistería de Vanguardia
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-wider text-obsidian leading-snug">
                Maderas Nobles & Mecanismos Invisibles
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-obsidian/70 leading-relaxed">
                Nuestros herrajes han sido concebidos para convivir en equilibrio milimétrico con nogal americano, roble europeo, cedro y tableros enchapados de alta gama.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-[#5A3927]/15 space-y-1.5 shadow-2xs">
                <span className="text-[#5A3927] font-mono font-medium text-xs block">01 · VETA PURA</span>
                <h4 className="font-sans font-bold uppercase tracking-wider text-obsidian text-[11px]">Respeto al Material</h4>
                <p className="text-[11px] text-obsidian/65 font-sans leading-normal">
                  Sistemas embutidos que preservan la continuidad y belleza orgánica del mueble.
                </p>
              </div>

              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-[#5A3927]/15 space-y-1.5 shadow-2xs">
                <span className="text-[#5A3927] font-mono font-medium text-xs block">02 · TOLERANCIA</span>
                <h4 className="font-sans font-bold uppercase tracking-wider text-obsidian text-[11px]">Ajuste Tridimensional</h4>
                <p className="text-[11px] text-obsidian/65 font-sans leading-normal">
                  Regulación precisa en 3 ejes para calibrar holguras perfectas entre frentes de madera.
                </p>
              </div>

              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-[#5A3927]/15 space-y-1.5 shadow-2xs">
                <span className="text-[#5A3927] font-mono font-medium text-xs block">03 · SILENCIO</span>
                <h4 className="font-sans font-bold uppercase tracking-wider text-obsidian text-[11px]">Amortiguación Suave</h4>
                <p className="text-[11px] text-obsidian/65 font-sans leading-normal">
                  Pistones hidráulicos de alta durabilidad certificados para más de 50.000 ciclos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIAL (Fiel a la foto: título "Testimonial", 4 tarjetas numeradas con badge circular, cita y autor) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-obsidian tracking-widest uppercase">
            Testimonial
          </h2>
          <p className="text-xs text-obsidian/50 font-sans tracking-widest uppercase">
            La confianza de quienes especifican y construyen
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Cards Row with Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(item => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center p-7 glass-card space-y-4 rounded-xl border border-white/80"
              >
                {/* Number Badge Circle in Sleek Black with Frosted Border */}
                <div className="w-8 h-8 rounded-full bg-black text-white font-mono text-xs font-bold flex items-center justify-center shadow-md border border-white/20">
                  {item.id}
                </div>

                {/* Quote */}
                <p className="text-xs text-obsidian/75 font-sans leading-relaxed italic">
                  "{item.text}"
                </p>

                {/* Author & City */}
                <div className="pt-2">
                  <h4 className="text-xs font-sans font-bold text-obsidian uppercase tracking-wide">
                    {item.author}
                  </h4>
                  <span className="text-[10px] font-sans text-obsidian/50 uppercase tracking-wider">
                    {item.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHOWCASE DE MOBILIARIO ARQUITECTÓNICO (Credenza ranurada en nogal con herrajes ocultos) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="wood-card rounded-2xl p-6 sm:p-10 border border-[#5A3927]/20 shadow-xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A3927] px-3 py-1 rounded-full wood-pill">
              Nogal Ranurado & Correderas Ocultas
            </span>
          </div>

          <div className="w-full aspect-[21/9] max-h-[360px] overflow-hidden rounded-xl flex items-center justify-center bg-white/70 border border-[#5A3927]/10 p-4 sm:p-8 shadow-inner">
            <img
              src="/images/showcase/showcase_credenza.jpg"
              alt="Mobiliario Arquitectónico en Nogal con Herrajes Montezzi"
              className="w-full h-full object-contain filter drop-shadow-lg mix-blend-multiply"
            />
          </div>

          <div className="max-w-lg space-y-2 text-center">
            <h3 className="font-sans text-base sm:text-lg text-obsidian font-bold uppercase tracking-wider">
              Arquitectura en madera maciza y herrajes ocultos
            </h3>
            <p className="text-xs text-obsidian/65 font-serif italic leading-relaxed">
              "La ingeniería de alta gama no compite con el diseño del mueble: se oculta para dejar que la calidez del nogal y la maestría del ebanista sean los verdaderos protagonistas."
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
