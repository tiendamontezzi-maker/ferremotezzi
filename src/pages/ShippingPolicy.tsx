import React from 'react';
import { GoldenDivider } from '../components/ui/GoldenDivider';
import { Truck, Clock, ShieldCheck, CreditCard, Box, AlertCircle } from 'lucide-react';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-[#FAF8F5]">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#E2DDD4]">
        <span className="text-xs font-sans tracking-[0.25em] text-montezzigold uppercase font-bold">
          Políticas Oficiales
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-obsidian">
          Política de Envíos y Métodos de Pago
        </h1>
        <p className="text-sm text-obsidian/70 font-sans">
          Información transparente sobre cobertura logística nacional, tiempos de entrega y condiciones de pago.
        </p>
      </div>

      {/* Tiempos de Entrega */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-montezzigold font-serif text-2xl">
          <Truck className="w-6 h-6 stroke-[1.5]" />
          <h2 className="text-obsidian">Cobertura Nacional y Tiempos de Entrega</h2>
        </div>
        <p className="text-sm text-obsidian/80 font-sans leading-relaxed">
          Montezzi realiza envíos a nivel nacional mediante empresas transportadoras aliadas certificadas.
        </p>

        {/* Table of delivery times */}
        <div className="border border-[#E2DDD4] rounded-sm overflow-hidden bg-white shadow-xs">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF8F5] border-b border-[#E2DDD4] text-montezzigold tracking-widest uppercase">
              <tr>
                <th className="p-4 font-semibold">Destino</th>
                <th className="p-4 font-semibold">Tiempo Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9] text-obsidian">
              <tr className="hover:bg-[#FAF8F5]">
                <td className="p-4 font-semibold">Medellín y Área Metropolitana</td>
                <td className="p-4 font-mono text-montezzigold font-bold">Un (1) día hábil</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]">
                <td className="p-4 font-semibold">Otras ciudades principales de Colombia</td>
                <td className="p-4 font-mono text-montezzigold font-bold">Entre dos (2) y tres (3) días hábiles</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-obsidian/60 font-sans leading-relaxed">
          Los tiempos se cuentan desde la confirmación del pago y aprobación del pedido. Son estimados y pueden variar por destino, disponibilidad, acceso, operación de la transportadora, días festivos o fuerza mayor. Para municipios alejados, zonas rurales o destinos con frecuencia especial, el tiempo podrá ser superior.
        </p>
      </section>

      {/* Envío Gratuito Banner */}
      <div className="p-6 bg-white border border-montezzigold/40 rounded-sm space-y-2 shadow-xs">
        <h3 className="font-serif text-xl text-montezzigold flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-5 h-5" /> Envío Gratuito a Nivel Nacional
        </h3>
        <p className="text-sm text-obsidian/85 font-sans leading-relaxed">
          Las compras <strong>iguales o superiores a $500.000 COP</strong> tendrán envío gratuito. El beneficio no aplica para zonas rurales o destinos de difícil acceso; en estos casos se informará el costo antes del despacho.
        </p>
      </div>

      {/* Recepción y Novedades */}
      <section className="space-y-4 text-sm text-obsidian/80 font-sans leading-relaxed">
        <h3 className="font-serif text-2xl text-obsidian font-medium">Recepción y Novedades (Plazo 24 Horas)</h3>
        <p>
          El cliente deberá revisar empaque, cantidades, referencias y condiciones visibles durante las 24 horas posteriores a la entrega. Si llega incompleto, averiado o incorrecto, deberá enviar fotografías o videos del empaque, la guía y los productos. La revisión inicial no elimina la garantía por defectos que aparezcan después.
        </p>
        <p>
          <strong>Dirección y recepción:</strong> El cliente debe suministrar dirección completa, teléfono y datos necesarios. Si la entrega falla por dirección incorrecta, ausencia o imposibilidad de contacto, el costo de un nuevo despacho podrá ser asumido por el cliente.
        </p>
      </section>

      <GoldenDivider variant="subtle" />

      {/* Métodos de Pago y Disponibilidad */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-montezzigold font-serif text-2xl">
          <CreditCard className="w-6 h-6 stroke-[1.5]" />
          <h2 className="text-obsidian">Métodos de Pago y Disponibilidad de Inventario</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
            <h4 className="font-serif text-base text-obsidian font-medium">Transferencia Bancaria</h4>
            <p className="text-obsidian/70">
              Pagos directos a cuentas autorizadas de Montezzi (Bancolombia, convenios empresariales).
            </p>
          </div>
          <div className="p-4 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
            <h4 className="font-serif text-base text-obsidian font-medium">Tarjetas Débito y Crédito</h4>
            <p className="text-obsidian/70">
              Procesamiento seguro mediante pasarela de pagos con verificación antifraude.
            </p>
          </div>
          <div className="p-4 bg-white border border-[#E2DDD4] rounded-sm space-y-2 shadow-xs">
            <h4 className="font-serif text-base text-obsidian font-medium">Pago en Showroom</h4>
            <p className="text-obsidian/70">
              Disponible para clientes que retiren producto físicamente en sede Medellín.
            </p>
          </div>
        </div>

        <div className="p-5 bg-white border border-[#E2DDD4] rounded-sm text-xs text-obsidian/80 space-y-2 font-sans shadow-xs">
          <p>
            <strong>Confirmación del pago:</strong> El comprobante de transferencia o pago no constituye por sí solo confirmación definitiva. El pedido será aprobado cuando Montezzi verifique que los fondos estén acreditados.
          </p>
          <p>
            <strong>Disponibilidad de inventario:</strong> Todos los productos están sujetos a disponibilidad. Agregar al carrito o solicitar cotización no garantiza la reserva hasta la confirmación formal del pedido.
          </p>
        </div>
      </section>
    </div>
  );
};
