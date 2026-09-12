import React from 'react';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { ShieldCheck, AlertOctagon, CheckCircle2, Clock, Truck, FileText } from 'lucide-react';

export const WarrantyPolicy: React.FC = () => {
  const exclusions = [
    'Instalación incorrecta o contraria a las especificaciones.',
    'Uso inadecuado, abuso, golpes, caídas o manipulación indebida.',
    'Sobrecarga o uso por fuera de la aplicación del producto.',
    'Modificaciones, cortes, perforaciones, soldaduras o reparaciones no autorizadas.',
    'Desgaste normal derivado del uso.',
    'Contacto con sustancias abrasivas o productos químicos inadecuados.',
    'Humedad, corrosión o condiciones ambientales incompatibles.',
    'Falta de mantenimiento o limpieza inadecuada.',
    'Selección incorrecta de medida, referencia, color o aplicación.',
    'Fuerza mayor, caso fortuito o hechos atribuibles a terceros.'
  ];

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-[#FAF8F5]">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#E2DDD4]">
        <span className="text-xs font-sans tracking-[0.25em] text-montezzigold uppercase font-bold">
          Políticas Oficiales
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-obsidian">
          Política de Garantías y Cambios
        </h1>
        <p className="text-sm text-obsidian/70 font-sans">
          Estándar contractual y de respaldo de calidad oficial de Montezzi.
        </p>
      </div>

      {/* Main Articles */}
      <div className="space-y-10 text-sm text-obsidian/80 font-sans leading-relaxed">
        {/* 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-montezzigold font-serif text-xl">
            <Clock className="w-5 h-5 stroke-[1.5]" />
            <h2 className="text-obsidian font-serif">1. Revisión al recibir el pedido (Plazo 24 Horas)</h2>
          </div>
          <p>
            El cliente deberá revisar el estado exterior del empaque, la cantidad de unidades, las referencias, los colores y las condiciones visibles del producto dentro de las primeras <strong>veinticuatro (24) horas</strong> posteriores a la entrega. Cualquier daño ocasionado durante el transporte, faltante, producto incorrecto o defecto visible deberá reportarse dentro de este plazo, acompañado de fotografías o videos del empaque y del producto recibido. El plazo de 24 horas aplica para novedades visibles de entrega y no limita las reclamaciones por defectos de fabricación o funcionamiento que se manifiesten dentro del término de la garantía.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-montezzigold font-serif text-xl">
            <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            <h2 className="text-obsidian font-serif">2. Término de la garantía</h2>
          </div>
          <p>
            Los productos comercializados por Montezzi cuentan con una garantía de <strong>treinta (30) días calendario</strong>, contados desde la fecha de entrega. La garantía cubre exclusivamente defectos de fabricación o fallas de funcionamiento atribuibles al producto, siempre que este haya sido instalado, utilizado y conservado correctamente. Esta garantía se aplicará sin perjuicio de los derechos que correspondan al consumidor conforme a la legislación colombiana vigente.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-montezzigold font-serif text-xl">
            <FileText className="w-5 h-5 stroke-[1.5]" />
            <h2 className="text-obsidian font-serif">3. Procedimiento para solicitar la garantía</h2>
          </div>
          <p>
            El cliente deberá comunicarse por los canales oficiales y proporcionar: nombre y datos de contacto, factura o pedido, código del producto, descripción de la falla, fotografías o videos y, cuando se requiera, información de instalación. Montezzi podrá solicitar el producto para evaluación técnica. La presentación de la solicitud no implica su aprobación automática.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-montezzigold font-serif text-xl">
            <CheckCircle2 className="w-5 h-5 stroke-[1.5]" />
            <h2 className="text-obsidian font-serif">4. Solución de la garantía</h2>
          </div>
          <p>
            Confirmado un defecto cubierto, Montezzi procederá según corresponda con reparación sin costo, reposición o devolución del dinero cuando legalmente aplique. Si no admite reparación, se repondrá la misma referencia; si no está disponible, podrá ofrecerse un producto equivalente o la devolución del valor pagado.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-montezzigold font-serif text-xl">
            <Truck className="w-5 h-5 stroke-[1.5]" />
            <h2 className="text-obsidian font-serif">5. Costos de transporte por garantía</h2>
          </div>
          <p>
            Cuando la garantía sea aprobada, Montezzi asumirá los costos razonables de transporte requeridos para recoger, revisar y devolver o reponer el producto. Si la evaluación determina que la falla no está cubierta, el cliente podrá asumir los costos de transporte, previa información y aceptación.
          </p>
        </section>

        {/* 6 */}
        <section className="space-y-3">
          <h2 className="text-obsidian font-serif text-xl">6. Cambios voluntarios</h2>
          <p>
            Los cambios por medida, referencia, color o decisión del cliente requieren autorización previa y disponibilidad. El producto debe estar sin instalar, sin usar, completo, limpio y con empaques y componentes originales. Los costos de envío serán asumidos por el cliente. No se aceptarán productos instalados, usados, perforados, alterados o fabricados bajo especificaciones especiales.
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-3">
          <h2 className="text-obsidian font-serif text-xl">7. Tiempos de respuesta</h2>
          <p>
            Montezzi responderá dentro de los términos de la legislación colombiana. Cuando se requiera revisión física, el tiempo de evaluación y solución se contará desde que el producto sea puesto a disposición de Montezzi.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-3 p-5 bg-white border-l-2 border-montezzigold rounded-sm shadow-xs">
          <h2 className="text-montezzigold font-serif text-xl font-medium">8. Recomendación antes de instalar</h2>
          <p>
            Antes de perforar, cortar, ensamblar o instalar, el cliente o instalador deberá verificar referencia, medida, color, sentido de apertura y aplicación. La instalación o modificación se entenderá como aceptación de las características visibles y no dará lugar a cambios voluntarios.
          </p>
        </section>
      </div>

      <GoldenDivider variant="subtle" />

      {/* Exclusiones de la Garantía */}
      <div className="p-8 bg-white border border-[#E2DDD4] rounded-sm space-y-6 shadow-xs">
        <div className="flex items-center gap-3 text-montezzigold">
          <AlertOctagon className="w-6 h-6 stroke-[1.5]" />
          <h2 className="font-serif text-2xl text-obsidian font-medium">Exclusiones de la Garantía</h2>
        </div>
        <p className="text-xs text-obsidian/70">
          La garantía no tendrá cobertura en cualquiera de los siguientes supuestos:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-obsidian/80 font-sans">
          {exclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-[#FAF8F5] border border-[#EAE4D9] rounded">
              <span className="text-montezzigold font-mono text-[11px] mt-0.5 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
