import React, { useState, useMemo } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { exportToCSV, exportToJSON } from '../../utils/csvExportImport';
import {
  PieChart as PieIcon, Download, Sparkles, TrendingUp, DollarSign,
  Package, ShoppingBag, MapPin, Layers, RefreshCw
} from 'lucide-react';

interface ChartSlice {
  label: string;
  value: number;
  color: string;
  percentage: number;
  formattedValue?: string;
  secondaryInfo?: string;
}

// Reusable SVG Donut Chart with high precision rendering and tooltips
const SvgDonutChart: React.FC<{
  title: string;
  subtitle: string;
  slices: ChartSlice[];
  centerLabel: string;
  centerValue: string;
}> = ({ title, subtitle, slices, centerLabel, centerValue }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const radius = 80;
  const strokeWidth = 26;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  // Compute strokeDasharray and strokeDashoffset for each slice
  let accumulatedPercent = 0;
  const renderedSlices = slices.map((slice, idx) => {
    const strokeDasharray = `${(slice.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += slice.percentage;

    const isHovered = hoveredIdx === idx;

    return (
      <circle
        key={idx}
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke={slice.color}
        strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${center} ${center})`}
        className="transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setHoveredIdx(idx)}
        onMouseLeave={() => setHoveredIdx(null)}
        style={{
          filter: isHovered ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))' : 'none'
        }}
      />
    );
  });

  const activeSlice = hoveredIdx !== null ? slices[hoveredIdx] : null;

  return (
    <div className="glass-card p-6 rounded-sm space-y-5 border border-black/10 hover:border-black/25 transition-all shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-sans text-xs font-bold text-obsidian uppercase tracking-wider">
            {title}
          </h4>
          <span className="text-[10px] font-mono text-obsidian/40 uppercase">Distribución</span>
        </div>
        <p className="text-[11px] text-obsidian/60 font-sans mt-0.5">{subtitle}</p>
      </div>

      {/* SVG Donut */}
      <div className="relative flex items-center justify-center py-2">
        <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-52 sm:h-52">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#F0EFEA"
            strokeWidth={strokeWidth}
          />
          {renderedSlices}
        </svg>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
          {activeSlice ? (
            <div className="animate-in fade-in duration-150">
              <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian/50 block truncate max-w-[110px]">
                {activeSlice.label}
              </span>
              <span className="text-lg font-mono font-bold text-black block">
                {activeSlice.percentage.toFixed(1)}%
              </span>
              <span className="text-[10px] font-mono text-obsidian/70 block truncate max-w-[110px]">
                {activeSlice.formattedValue || `${activeSlice.value}`}
              </span>
            </div>
          ) : (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-obsidian/40 block">
                {centerLabel}
              </span>
              <span className="text-xl font-mono font-bold text-black block">
                {centerValue}
              </span>
              <span className="text-[9px] text-obsidian/40 font-sans block">100% Total</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="space-y-1.5 pt-2 border-t border-black/5 text-xs font-sans">
        {slices.map((slice, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between p-1.5 rounded-xs transition-colors cursor-pointer ${
                isHovered ? 'bg-black/5' : 'hover:bg-black/[0.02]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="truncate text-obsidian/80 text-[11px] font-medium">
                  {slice.label}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-obsidian/60">
                  {slice.formattedValue || slice.value}
                </span>
                <span className="text-[11px] font-mono font-bold text-black w-10 text-right">
                  {slice.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PieChartsDashboard: React.FC = () => {
  const { products, orders, abandonedCarts, productClickAnalytics } = useProducts();
  const { systemUsers } = useAuth();

  // Luxury Brand Color Palette
  const PALETTE = {
    obsidian: '#11100F',
    charcoal: '#2D2B28',
    walnut: '#5A3927',
    walnutLight: '#8B5A3E',
    gold: '#C5A880',
    brass: '#A88B57',
    steel: '#737373',
    slate: '#A3A3A3',
    emerald: '#059669',
    amber: '#D97706',
    rose: '#E11D48'
  };

  // 1. Distribution of Sales by Category
  const categorySalesSlices = useMemo<ChartSlice[]>(() => {
    const catMap: Record<string, number> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const prod = products.find(p => p.id === item.product_id || p.code === item.code);
        const cat = prod?.category_name || 'Herrajes Especiales';
        catMap[cat] = (catMap[cat] || 0) + item.subtotal;
      });
    });

    const total = Object.values(catMap).reduce((sum, v) => sum + v, 0) || 1;
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const top4 = sorted.slice(0, 4);
    const others = sorted.slice(4).reduce((sum, [, val]) => sum + val, 0);

    const colors = [PALETTE.obsidian, PALETTE.walnut, PALETTE.gold, PALETTE.charcoal, PALETTE.steel];

    const result: ChartSlice[] = top4.map(([cat, val], idx) => ({
      label: cat,
      value: val,
      color: colors[idx % colors.length],
      percentage: (val / total) * 100,
      formattedValue: `$${(val / 1000000).toFixed(1)}M`
    }));

    if (others > 0) {
      result.push({
        label: 'Otras Categorías',
        value: others,
        color: PALETTE.steel,
        percentage: (others / total) * 100,
        formattedValue: `$${(others / 1000000).toFixed(1)}M`
      });
    }

    return result;
  }, [orders, products]);

  // 2. Order Fulfillment Status Distribution
  const orderStatusSlices = useMemo<ChartSlice[]>(() => {
    const totalOrders = orders.length || 1;
    const statusCounts: Record<string, number> = {
      'aprobado': 0,
      'pendiente': 0,
      'enviado': 0,
      'entregado': 0,
      'cancelado': 0
    };

    orders.forEach(o => {
      statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
    });

    return [
      {
        label: 'Aprobados (En Alistamiento)',
        value: statusCounts['aprobado'] || 0,
        color: PALETTE.obsidian,
        percentage: ((statusCounts['aprobado'] || 0) / totalOrders) * 100,
        formattedValue: `${statusCounts['aprobado']} pedidos`
      },
      {
        label: 'En Despacho / Ruta',
        value: statusCounts['enviado'] || 0,
        color: PALETTE.walnut,
        percentage: ((statusCounts['enviado'] || 0) / totalOrders) * 100,
        formattedValue: `${statusCounts['enviado']} pedidos`
      },
      {
        label: 'Entregados con Éxito',
        value: statusCounts['entregado'] || 0,
        color: PALETTE.emerald,
        percentage: ((statusCounts['entregado'] || 0) / totalOrders) * 100,
        formattedValue: `${statusCounts['entregado']} pedidos`
      },
      {
        label: 'Pendientes de Pago',
        value: statusCounts['pendiente'] || 0,
        color: PALETTE.amber,
        percentage: ((statusCounts['pendiente'] || 0) / totalOrders) * 100,
        formattedValue: `${statusCounts['pendiente']} pedidos`
      },
      {
        label: 'Cancelados',
        value: statusCounts['cancelado'] || 0,
        color: PALETTE.rose,
        percentage: ((statusCounts['cancelado'] || 0) / totalOrders) * 100,
        formattedValue: `${statusCounts['cancelado']} pedidos`
      }
    ].filter(s => s.value > 0);
  }, [orders]);

  // 3. Geographic Distribution of Architect Clients
  const geographicSlices = useMemo<ChartSlice[]>(() => {
    const cityMap: Record<string, number> = {};
    systemUsers.forEach(u => {
      const city = u.city || 'Medellín';
      cityMap[city] = (cityMap[city] || 0) + (u.total_spent || 1);
    });

    const total = Object.values(cityMap).reduce((s, v) => s + v, 0) || 1;
    const sorted = Object.entries(cityMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const colors = [PALETTE.obsidian, PALETTE.walnut, PALETTE.gold, PALETTE.steel, PALETTE.charcoal];

    return sorted.map(([city, val], idx) => ({
      label: city,
      value: val,
      color: colors[idx % colors.length],
      percentage: (val / total) * 100,
      formattedValue: `$${(val / 1000000).toFixed(1)}M`
    }));
  }, [systemUsers]);

  // 4. Abandoned Carts Recovery Status
  const cartRecoverySlices = useMemo<ChartSlice[]>(() => {
    const totalCarts = abandonedCarts.length || 1;
    const recCount = abandonedCarts.filter(c => c.status === 'recuperado').length;
    const conCount = abandonedCarts.filter(c => c.status === 'contactado').length;
    const abnCount = abandonedCarts.filter(c => c.status === 'abandonado').length;

    const recVal = abandonedCarts.filter(c => c.status === 'recuperado').reduce((s, c) => s + c.total_amount, 0);
    const conVal = abandonedCarts.filter(c => c.status === 'contactado').reduce((s, c) => s + c.total_amount, 0);
    const abnVal = abandonedCarts.filter(c => c.status === 'abandonado').reduce((s, c) => s + c.total_amount, 0);

    return [
      {
        label: 'Recuperados (Venta Concretada)',
        value: recVal,
        color: PALETTE.emerald,
        percentage: (recCount / totalCarts) * 100,
        formattedValue: `$${(recVal / 1000000).toFixed(1)}M COP`
      },
      {
        label: 'En Gestión (WhatsApp / Email)',
        value: conVal,
        color: PALETTE.amber,
        percentage: (conCount / totalCarts) * 100,
        formattedValue: `$${(conVal / 1000000).toFixed(1)}M COP`
      },
      {
        label: 'En Riesgo (Sin Contactar)',
        value: abnVal,
        color: PALETTE.rose,
        percentage: (abnCount / totalCarts) * 100,
        formattedValue: `$${(abnVal / 1000000).toFixed(1)}M COP`
      }
    ];
  }, [abandonedCarts]);

  // 5. Product Click Traction by Collection
  const collectionTractionSlices = useMemo<ChartSlice[]>(() => {
    const collMap: Record<string, number> = {};
    productClickAnalytics.forEach(p => {
      const coll =
        p.main_collection === 'closet'
          ? 'Sistemas para Clóset'
          : p.main_collection === 'cocina'
          ? 'Cocinas & Despensas'
          : 'Herrajes Especiales';
      collMap[coll] = (collMap[coll] || 0) + p.clicks;
    });

    const total = Object.values(collMap).reduce((s, v) => s + v, 0) || 1;
    const colors = [PALETTE.obsidian, PALETTE.walnut, PALETTE.gold];

    return Object.entries(collMap).map(([coll, clicks], idx) => ({
      label: coll,
      value: clicks,
      color: colors[idx % colors.length],
      percentage: (clicks / total) * 100,
      formattedValue: `${clicks.toLocaleString('es-CO')} clics`
    }));
  }, [productClickAnalytics]);

  // Total sums
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalClicks = productClickAnalytics.reduce((s, p) => s + p.clicks, 0);

  const handleExportMetricsCSV = () => {
    const summaryData = [
      ...categorySalesSlices.map(s => ({ modulo: 'Ventas por Categoría', segmento: s.label, porcentaje: `${s.percentage.toFixed(1)}%`, valor: s.formattedValue })),
      ...orderStatusSlices.map(s => ({ modulo: 'Estados de Pedido', segmento: s.label, porcentaje: `${s.percentage.toFixed(1)}%`, valor: s.formattedValue })),
      ...geographicSlices.map(s => ({ modulo: 'Distribución Geográfica', segmento: s.label, porcentaje: `${s.percentage.toFixed(1)}%`, valor: s.formattedValue })),
      ...cartRecoverySlices.map(s => ({ modulo: 'Carritos Recuperados', segmento: s.label, porcentaje: `${s.percentage.toFixed(1)}%`, valor: s.formattedValue })),
      ...collectionTractionSlices.map(s => ({ modulo: 'Tracción por Colección', segmento: s.label, porcentaje: `${s.percentage.toFixed(1)}%`, valor: s.formattedValue }))
    ];

    exportToCSV('montezzi_metricas_tortas', summaryData, [
      { header: 'Módulo de Análisis', key: 'modulo' },
      { header: 'Segmento / Categoría', key: 'segmento' },
      { header: 'Participación (%)', key: 'porcentaje' },
      { header: 'Valor / Volumen', key: 'valor' }
    ]);
  };

  const handleExportMetricsJSON = () => {
    exportToJSON('montezzi_metricas_tortas', {
      fecha_corte: new Date().toISOString(),
      ventas_por_categoria: categorySalesSlices,
      estados_pedidos: orderStatusSlices,
      geografia_estudios: geographicSlices,
      recuperacion_carritos: cartRecoverySlices,
      traccion_colecciones: collectionTractionSlices
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Buttons */}
      <div className="glass-card p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#5A3927]">
        <div>
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-black" />
            <h3 className="font-sans text-sm font-bold text-obsidian uppercase tracking-wider">
              Dashboard de Tortas & Analítica de Rendimiento
            </h3>
          </div>
          <p className="text-xs text-obsidian/60 font-sans mt-0.5">
            Distribución proporcional de ingresos, pedidos, tracción de productos y carritos en riesgo
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMetricsCSV}
            className="px-3 py-1.5 bg-white border border-black/20 text-obsidian hover:border-black text-xs font-medium uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={handleExportMetricsJSON}
            className="px-3 py-1.5 bg-black text-white hover:bg-black/85 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* 5 Pie & Donut Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Chart 1: Sales by Category */}
        <SvgDonutChart
          title="Ventas por Categoría"
          subtitle="Participación de facturación según tipología de herraje"
          slices={categorySalesSlices}
          centerLabel="Facturado"
          centerValue={`$${(totalRevenue / 1000000).toFixed(1)}M`}
        />

        {/* Chart 2: Order Status */}
        <SvgDonutChart
          title="Estados de Despacho"
          subtitle="Procesamiento y flujo de pedidos en bodega"
          slices={orderStatusSlices}
          centerLabel="Total Órdenes"
          centerValue={`${orders.length}`}
        />

        {/* Chart 3: Geographic Distribution */}
        <SvgDonutChart
          title="Ciudades & Regiones"
          subtitle="Participación comercial de despachos en Colombia"
          slices={geographicSlices}
          centerLabel="Cobertura"
          centerValue="5 Regiones"
        />

        {/* Chart 4: Cart Recovery Status */}
        <SvgDonutChart
          title="Eficacia de Carritos"
          subtitle="Relación de carritos recuperados vs pendientes"
          slices={cartRecoverySlices}
          centerLabel="Total Carritos"
          centerValue={`${abandonedCarts.length}`}
        />

        {/* Chart 5: Traction by Collection */}
        <SvgDonutChart
          title="Interés por Colección"
          subtitle="Volumen de clics de arquitectos en showroom web"
          slices={collectionTractionSlices}
          centerLabel="Clics Web"
          centerValue={`${totalClicks.toLocaleString('es-CO')}`}
        />

        {/* Summary Card with Luxury Architectural Notes */}
        <div className="glass-card p-6 rounded-sm space-y-4 border border-black/10 flex flex-col justify-between bg-gradient-to-br from-white to-[#FAF9F7]">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#5A3927] uppercase bg-[#F2ECE4] border border-[#DDD6C8] px-2 py-0.5 rounded-xs font-semibold inline-block">
              Inteligencia Comercial
            </span>
            <h4 className="font-sans text-sm font-bold text-obsidian uppercase tracking-wider">
              Diagnóstico de Demanda 2026
            </h4>
            <p className="text-xs text-obsidian/70 font-sans leading-relaxed">
              Los herrajes de <strong>Sistemas de Clóset</strong> y <strong>Módulos Tecnológicos</strong> concentran el ticket promedio más alto en estudios de arquitectura de Medellín y Bogotá.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-black/10 text-xs font-sans">
            <div className="flex justify-between items-center text-obsidian/80">
              <span>Ticket Promedio Pedido:</span>
              <strong className="font-mono text-black">
                ${orders.length > 0 ? (totalRevenue / orders.length).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : 0} COP
              </strong>
            </div>
            <div className="flex justify-between items-center text-obsidian/80">
              <span>Referencias Activas en Catálogo:</span>
              <strong className="font-mono text-black">{products.length} (KDJ-1 a KDJ-112)</strong>
            </div>
            <div className="flex justify-between items-center text-obsidian/80">
              <span>Tasa de Conversión General:</span>
              <strong className="font-mono text-emerald-700">
                {totalClicks > 0 ? ((orders.length / totalClicks) * 100).toFixed(2) : 0}%
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
