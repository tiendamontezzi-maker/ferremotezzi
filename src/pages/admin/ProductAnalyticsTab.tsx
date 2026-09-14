import React, { useState, useMemo } from 'react';
import { useProducts } from '../../context/ProductContext';
import { MousePointerClick, TrendingUp, ShoppingBag, Eye, ArrowUpDown, Search, Sparkles, AlertTriangle } from 'lucide-react';

export const ProductAnalyticsTab: React.FC = () => {
  const { productClickAnalytics, products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'clicks' | 'add_to_cart' | 'orders' | 'conversion'>('clicks');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Match live stock info with analytics
  const enrichedAnalytics = useMemo(() => {
    return productClickAnalytics.map(item => {
      const liveProduct = products.find(p => p.id === item.product_id || p.code === item.code);
      const conversionRate = item.clicks > 0 ? ((item.add_to_cart_count / item.clicks) * 100) : 0;
      return {
        ...item,
        stock: liveProduct ? liveProduct.stock : 25,
        min_stock_alert: liveProduct?.min_stock_alert ?? 8,
        conversionRate
      };
    });
  }, [productClickAnalytics, products]);

  // Overall KPIs
  const totalClicks = enrichedAnalytics.reduce((sum, p) => sum + p.clicks, 0);
  const totalCartAdds = enrichedAnalytics.reduce((sum, p) => sum + p.add_to_cart_count, 0);
  const avgConversion = totalClicks > 0 ? ((totalCartAdds / totalClicks) * 100).toFixed(1) : '0';
  const topClickedProduct = [...enrichedAnalytics].sort((a, b) => b.clicks - a.clicks)[0];
  const maxClicks = topClickedProduct ? topClickedProduct.clicks : 1;

  // Filter & Sort
  const filteredAndSorted = useMemo(() => {
    return enrichedAnalytics
      .filter(item => {
        const matchesCategory = selectedCategory === 'todos' || item.category_name === selectedCategory;
        const matchesSearch =
          item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'clicks') return b.clicks - a.clicks;
        if (sortBy === 'add_to_cart') return b.add_to_cart_count - a.add_to_cart_count;
        if (sortBy === 'orders') return b.orders_count - a.orders_count;
        if (sortBy === 'conversion') return b.conversionRate - a.conversionRate;
        return 0;
      });
  }, [enrichedAnalytics, selectedCategory, searchTerm, sortBy]);

  // Unique categories
  const categoriesList = useMemo(() => {
    const set = new Set(enrichedAnalytics.map(p => p.category_name));
    return Array.from(set);
  }, [enrichedAnalytics]);

  return (
    <div className="space-y-6">
      {/* Top Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Total Interacciones</span>
            <MousePointerClick className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {totalClicks.toLocaleString('es-CO')}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Clics y visualizaciones de ficha técnica
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Más Clickeado</span>
            <TrendingUp className="w-4 h-4 text-black" />
          </div>
          <div className="text-xl font-mono font-bold text-obsidian truncate">
            {topClickedProduct?.code || 'KDJ-108'}
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans truncate">
            {topClickedProduct ? `${topClickedProduct.clicks} clics · ${topClickedProduct.name}` : ''}
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Adición a Cotización</span>
            <ShoppingBag className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-obsidian">
            {totalCartAdds.toLocaleString('es-CO')} <span className="text-xs font-sans font-normal text-obsidian/50">veces</span>
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Productos agregados al carrito
          </span>
        </div>

        <div className="glass-card p-5 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-obsidian/60 text-xs">
            <span className="font-sans tracking-wider uppercase font-semibold">Conversión Clic-a-Carrito</span>
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-700">
            {avgConversion}%
          </div>
          <span className="text-[10px] text-obsidian/40 block font-sans">
            Promedio de intención de compra
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="glass-card p-4 rounded-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-sans">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-obsidian/50 text-[11px] font-mono uppercase tracking-wider">Ordenar por:</span>
          <button
            onClick={() => setSortBy('clicks')}
            className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
              sortBy === 'clicks' ? 'bg-black text-white' : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
            }`}
          >
            Más Clickeados
          </button>
          <button
            onClick={() => setSortBy('add_to_cart')}
            className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
              sortBy === 'add_to_cart' ? 'bg-black text-white' : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
            }`}
          >
            Más Agregados
          </button>
          <button
            onClick={() => setSortBy('conversion')}
            className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
              sortBy === 'conversion' ? 'bg-black text-white' : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
            }`}
          >
            Mayor Conversión
          </button>
          <button
            onClick={() => setSortBy('orders')}
            className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-medium transition-colors ${
              sortBy === 'orders' ? 'bg-black text-white' : 'bg-black/[0.04] text-obsidian/70 hover:bg-black/10'
            }`}
          >
            Más Comprados
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 border border-black/15 bg-white rounded-xs text-xs focus:outline-hidden focus:border-black"
          >
            <option value="todos">Todas las categorías</option>
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
            <input
              type="text"
              placeholder="KDJ o nombre..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 border border-black/15 bg-white rounded-xs text-xs focus:outline-hidden focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Analytics Ranking Table */}
      <div className="glass-card rounded-sm overflow-hidden border border-black/10 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F8F8F7] text-[10px] font-mono uppercase text-obsidian/60 border-b border-black/10">
              <tr>
                <th className="p-3 text-center w-12">#</th>
                <th className="p-3">Referencia y Producto</th>
                <th className="p-3">Categoría</th>
                <th className="p-3 text-right">Precio COP</th>
                <th className="p-3 w-44">Tracción de Clics</th>
                <th className="p-3 text-right">Clics</th>
                <th className="p-3 text-right">En Carrito</th>
                <th className="p-3 text-right">Conversión</th>
                <th className="p-3 text-right">Ventas</th>
                <th className="p-3 text-center">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {filteredAndSorted.map((item, idx) => {
                const percentageOfMax = Math.round((item.clicks / maxClicks) * 100);
                const isLowStock = item.stock <= item.min_stock_alert;

                return (
                  <tr key={item.product_id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="p-3 text-center font-mono font-bold text-obsidian/40 text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image_url}
                          alt={item.code}
                          className="w-10 h-10 object-cover rounded-xs border border-black/10 bg-[#FAF9F7] shrink-0"
                        />
                        <div>
                          <span className="font-mono font-bold text-black block">{item.code}</span>
                          <span className="text-obsidian/80 text-xs line-clamp-1 max-w-xs">{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-obsidian/60 text-[11px]">
                      {item.category_name}
                    </td>
                    <td className="p-3 text-right font-mono text-obsidian">
                      ${item.price.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3">
                      {/* Visual Traction Bar */}
                      <div className="space-y-1">
                        <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-black h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentageOfMax}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-obsidian/40 font-mono block text-right">
                          {percentageOfMax}% del líder
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-black">
                      {item.clicks.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 text-right font-mono text-obsidian/80">
                      {item.add_to_cart_count}
                    </td>
                    <td className="p-3 text-right font-mono font-semibold text-emerald-700">
                      {item.conversionRate.toFixed(1)}%
                    </td>
                    <td className="p-3 text-right font-mono text-obsidian/80">
                      {item.orders_count}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          isLowStock
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-black/[0.04] text-black border border-black/10'
                        }`}
                      >
                        {isLowStock && <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />}
                        {item.stock} un.
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
