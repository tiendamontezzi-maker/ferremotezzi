import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp, TrendingDown, ArrowUpRight, Users, UserPlus,
  Crown
} from 'lucide-react';

interface OverviewDashboardProps {
  onNavigateTab: (tab: any) => void;
  onOpenCreateOrder: () => void;
  onOpenCreateProduct: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
}) => {
  const { orders } = useProducts();
  const { systemUsers } = useAuth();

  const [timeRange, setTimeRange] = useState<'Diario' | 'Semanal' | 'Mensual'>('Mensual');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Calcular métricas reales de pedidos o usar base realista en Pesos Colombianos (COP)
  const validOrders = orders.filter(o => o.status !== 'cancelado');
  const totalSalesCOP = validOrders.reduce((sum, o) => sum + o.total_amount, 0) || 54890000;
  const totalOrdersCount = orders.length || 142;
  const averageOrderValueCOP =
    validOrders.length > 0
      ? Math.round(totalSalesCOP / validOrders.length)
      : 1485000;

  // Datos de ventas en Pesos Colombianos (COP) para la gráfica
  const monthlySales = [
    { month: 'Ene', value: 18500000, height: 18 },
    { month: 'Feb', value: 31000000, height: 31 },
    { month: 'Mar', value: 68000000, height: 68 },
    { month: 'Abr', value: 87000000, height: 87 },
    { month: 'May', value: 72000000, height: 72 },
    { month: 'Jun', value: 54000000, height: 54 },
    { month: 'Jul', value: 28000000, height: 28 },
    { month: 'Ago', value: 78000000, height: 78 },
    { month: 'Sep', value: 69000000, height: 69 },
    { month: 'Oct', value: 96000000, height: 96 },
    { month: 'Nov', value: 84000000, height: 84 },
    { month: 'Dic', value: 42000000, height: 42 }
  ];

  const weeklySales = [
    { month: 'Sem 1', value: 15200000, height: 52 },
    { month: 'Sem 2', value: 21800000, height: 78 },
    { month: 'Sem 3', value: 28400000, height: 94 },
    { month: 'Sem 4', value: 24100000, height: 81 }
  ];

  const dailySales = [
    { month: 'Lun', value: 4200000, height: 42 },
    { month: 'Mar', value: 6300000, height: 63 },
    { month: 'Mié', value: 8900000, height: 89 },
    { month: 'Jue', value: 7400000, height: 74 },
    { month: 'Vie', value: 9800000, height: 98 },
    { month: 'Sáb', value: 6100000, height: 61 },
    { month: 'Dom', value: 3500000, height: 35 }
  ];

  const currentChartData =
    timeRange === 'Mensual' ? monthlySales : timeRange === 'Semanal' ? weeklySales : dailySales;

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Tarjetas de Acción Rápida (4 Pastel Pills con flecha superior derecha) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Crear Código de Descuento */}
        <button
          onClick={() => onNavigateTab('discounts')}
          className="text-left p-4 rounded-2xl bg-[#EEF2F6] hover:bg-[#E5ECF2] border border-[#DCE4EC] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#1E293B] group-hover:text-black">
              Crear Código de Descuento
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#64748B] font-sans">
            Configura descuentos por porcentaje o monto fijo en COP
          </p>
        </button>

        {/* Campaña de Correo */}
        <button
          onClick={() => onNavigateTab('marketing')}
          className="text-left p-4 rounded-2xl bg-[#FFF6E9] hover:bg-[#FEEDD6] border border-[#FDE6C8] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#78350F] group-hover:text-black">
              Campaña de Correo
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B45309] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#92400E] font-sans">
            Envía boletines y novedades a estudios de arquitectura
          </p>
        </button>

        {/* Banner de Anuncio */}
        <button
          onClick={() => onNavigateTab('marketing')}
          className="text-left p-4 rounded-2xl bg-[#EAF8F0] hover:bg-[#DEF3E7] border border-[#D1EFE0] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#065F46] group-hover:text-black">
              Banner Promocional
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#059669] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#047857] font-sans">
            Muestra mensajes destacados en toda la tienda web
          </p>
        </button>

        {/* Ofertas por Paquete */}
        <button
          onClick={() => onNavigateTab('discounts')}
          className="text-left p-4 rounded-2xl bg-[#F3EFFB] hover:bg-[#ECE5F8] border border-[#E3D9F3] transition-all group flex flex-col justify-between h-24"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sans font-semibold text-xs text-[#5B21B6] group-hover:text-black">
              Kits & Paquetes B2B
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#7C3AED] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-[11px] text-[#6D28D9] font-sans">
            Crea combos de herrajes con precios especiales
          </p>
        </button>
      </div>

      {/* 2. Cuadrícula Principal: Columna Izquierda (Métricas + Gráfica) | Columna Derecha (Clientes + Promociones) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* IZQUIERDA / CENTRO (2 Columnas): 6 Tarjetas de Métricas + Gráfica de Analítica de Ventas */}
        <div className="lg:col-span-2 space-y-6">
          {/* 6 Tarjetas de Métricas en Cuadrícula 3x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Ventas Totales (COP) */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Ventas Totales
              </span>
              <div className="text-xl sm:text-2xl font-bold font-sans text-[#18181B] tracking-tight">
                ${totalSalesCOP.toLocaleString('es-CO')}{' '}
                <span className="text-xs font-normal text-[#71717A]">COP</span>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.5% Este mes</span>
              </div>
            </div>

            {/* 2. Pedidos */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Pedidos Totales
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                {totalOrdersCount.toLocaleString('es-CO')}
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8.2% Este mes</span>
              </div>
            </div>

            {/* 3. Ticket Promedio (COP) */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Ticket Promedio
              </span>
              <div className="text-xl sm:text-2xl font-bold font-sans text-[#18181B] tracking-tight">
                ${averageOrderValueCOP.toLocaleString('es-CO')}{' '}
                <span className="text-xs font-normal text-[#71717A]">COP</span>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+3.1% Este mes</span>
              </div>
            </div>

            {/* 4. Clientes Recurrentes */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Clientes Recurrentes
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                68%
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2.4% Este mes</span>
              </div>
            </div>

            {/* 5. Abandono de Carrito */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Abandono de Carrito
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                23.8%
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#EF4444]">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-1.8% Este mes</span>
              </div>
            </div>

            {/* 6. Vistas de Productos */}
            <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs text-[#71717A] font-sans font-medium block">
                Vistas de Productos
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-[#18181B] tracking-tight">
                45.210
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+15.3% Este mes</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Gráfica de Analítica de Ventas (COP) */}
          <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans text-base font-semibold text-[#18181B] normal-case">
                  Analítica de Ventas (COP)
                </h3>
                <span className="text-[11px] text-[#71717A]">
                  Facturación acumulada en Pesos Colombianos
                </span>
              </div>
              {/* Selector: Diario | Semanal | Mensual */}
              <div className="flex items-center p-1 bg-[#F4F4F5] rounded-full text-xs font-sans">
                {(['Diario', 'Semanal', 'Mensual'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTimeRange(tab)}
                    className={`px-3 py-1 rounded-full transition-all font-medium ${
                      timeRange === tab
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'text-[#71717A] hover:text-[#18181B]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Área de Gráfica */}
            <div className="pt-4">
              <div className="relative h-64 flex items-end justify-between pl-12 pr-2">
                {/* Eje Y en Millones de Pesos (COP) */}
                <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[10px] text-[#A1A1AA] font-mono pointer-events-none select-none">
                  <span>$100M</span>
                  <span>$75M</span>
                  <span>$50M</span>
                  <span>$25M</span>
                  <span>$0</span>
                </div>

                {/* Líneas de referencia horizontales */}
                <div className="absolute inset-x-12 top-0 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-12 top-1/4 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-12 top-2/4 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-12 top-3/4 border-b border-dashed border-[#F4F4F5] pointer-events-none" />
                <div className="absolute inset-x-12 bottom-0 border-b border-[#E4E4E7] pointer-events-none" />

                {/* Barras Verticales */}
                {currentChartData.map((item, idx) => {
                  const isHovered = hoveredMonth === idx;
                  return (
                    <div
                      key={item.month}
                      className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer px-1"
                      onMouseEnter={() => setHoveredMonth(idx)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {/* Tooltip en Pesos Colombianos */}
                      {isHovered && (
                        <div className="absolute -top-10 z-20 bg-[#18181B] text-white text-[11px] font-sans font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
                          ${item.value.toLocaleString('es-CO')} COP
                        </div>
                      )}

                      {/* Barra con degradado dorado idéntica a la imagen de referencia */}
                      <div
                        style={{ height: `${item.height}%` }}
                        className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                          isHovered
                            ? 'bg-gradient-to-t from-[#F59E0B] to-[#FCD34D] opacity-100 scale-102'
                            : 'bg-gradient-to-t from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] opacity-80 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Etiquetas del Eje X */}
              <div className="flex justify-between pl-12 pr-2 pt-3 text-[11px] text-[#A1A1AA] font-sans">
                {currentChartData.map(item => (
                  <span key={item.month} className="flex-1 text-center font-medium">
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Resumen de Clientes + Promociones Activas */}
        <div className="space-y-6">
          {/* Tarjeta 1: Resumen de Clientes */}
          <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="font-sans text-base font-semibold text-[#18181B] normal-case">
              Resumen de Clientes
            </h3>

            {/* 3 Filas de Métricas */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#18181B]">Nuevos Clientes</div>
                    <div className="text-[10px] text-[#A1A1AA]">Esta semana</div>
                  </div>
                </div>
                <span className="font-sans font-bold text-sm text-[#18181B]">15</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#18181B]">Clientes VIP & Estudios</div>
                    <div className="text-[10px] text-[#A1A1AA]">Activos</div>
                  </div>
                </div>
                <span className="font-sans font-bold text-sm text-[#18181B]">12</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#18181B]">Total de Clientes</div>
                    <div className="text-[10px] text-[#A1A1AA]">Histórico registrado</div>
                  </div>
                </div>
                <span className="font-sans font-bold text-sm text-[#18181B]">
                  {(systemUsers.length + 2815).toLocaleString('es-CO')}
                </span>
              </div>
            </div>

            {/* Mejores Clientes en COP */}
            <div className="pt-2 border-t border-[#F4F4F5] space-y-3">
              <span className="text-xs font-semibold text-[#71717A] block">
                Mejores Clientes (COP)
              </span>
              <div className="space-y-2.5">
                {[
                  {
                    name: 'Arq. Mariana Londoño',
                    orders: '14 pedidos',
                    total: '$18.450.000 COP',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    name: 'Estudio Taller Tres S.A.S.',
                    orders: '11 pedidos',
                    total: '$14.920.000 COP',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    name: 'Valentina Vélez Diseños',
                    orders: '9 pedidos',
                    total: '$11.680.000 COP',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                  }
                ].map(cust => (
                  <div key={cust.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-7 h-7 rounded-full object-cover border border-black/10"
                      />
                      <div>
                        <div className="font-semibold text-[#18181B] leading-tight">{cust.name}</div>
                        <div className="text-[10px] text-[#A1A1AA]">{cust.orders}</div>
                      </div>
                    </div>
                    <span className="font-semibold text-[#10B981] text-[11px]">{cust.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Retención de Clientes */}
            <div className="pt-2 border-t border-[#F4F4F5] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#18181B]">Retención de Clientes</span>
                <span className="font-bold text-[#10B981]">60%</span>
              </div>
              <div className="w-full bg-[#F4F4F5] h-2 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full rounded-full" style={{ width: '60%' }} />
              </div>
              <span className="text-[10px] text-[#A1A1AA] block">
                +2.4% respecto al mes anterior
              </span>
            </div>
          </div>

          {/* Tarjeta 2: Promociones Activas */}
          <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-sans text-base font-semibold text-[#18181B] normal-case">
              Promociones Activas
            </h3>

            <div className="space-y-3">
              {/* Promo 1 */}
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl border border-black/5">
                <div>
                  <div className="text-xs font-semibold text-[#18181B]">Colección Oficial 2026</div>
                  <div className="text-[10px] text-[#71717A]">Código: MONTEZZI10 · 234 usos</div>
                </div>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                  Activa
                </span>
              </div>

              {/* Promo 2 */}
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl border border-black/5">
                <div>
                  <div className="text-xs font-semibold text-[#18181B]">Bienvenida Arquitectos B2B</div>
                  <div className="text-[10px] text-[#71717A]">Campaña Email · 89% tasa de apertura</div>
                </div>
                <span className="text-[10px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-full border border-[#BAE6FD]">
                  En Curso
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
