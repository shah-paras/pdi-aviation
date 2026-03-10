/**
 * FleetCatalogStats — aggregate statistics for the Fleet Directory page.
 * Shows total models, categories, price range, and max range in glass cards.
 */

import { useMemo } from 'react';
import { Plane, LayoutGrid, DollarSign, Navigation } from 'lucide-react';

const fmtPrice = (v) =>
  v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : `$${(v / 1e6).toFixed(1)}M`;

export default function FleetCatalogStats({ aircraft }) {
  const stats = useMemo(() => {
    const prices = aircraft.map((a) => a.new_price_usd).filter(Boolean);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const maxRange = Math.max(...aircraft.map((a) => a.max_range_nm));

    return [
      {
        key: 'models',
        label: 'Total Models',
        value: aircraft.length,
        icon: Plane,
      },
      {
        key: 'categories',
        label: 'Categories',
        value: new Set(aircraft.map((a) => a.category)).size,
        icon: LayoutGrid,
      },
      {
        key: 'price',
        label: 'Price Range',
        value:
          prices.length > 0
            ? `${fmtPrice(minPrice)} – ${fmtPrice(maxPrice)}`
            : '—',
        icon: DollarSign,
      },
      {
        key: 'range',
        label: 'Max Range',
        value: `${maxRange.toLocaleString()} nm`,
        icon: Navigation,
      },
    ];
  }, [aircraft]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            className="bg-slate-900/60 backdrop-blur-sm border border-white/5 rounded-xl p-4"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
