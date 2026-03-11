/**
 * FleetDirectoryStats — aggregate statistics for the NSOP Fleet Directory.
 * Shows total operators, total aircraft, fixed wing count, rotary wing count, and states covered.
 */

import { useMemo } from 'react';
import { Building2, Plane, Navigation, MapPin } from 'lucide-react';
import AnimatedCounter from '@/components/home/AnimatedCounter';

export default function FleetDirectoryStats({ operators, registrations }) {
  const stats = useMemo(() => {
    const totalAircraft = registrations.length;
    const fwCount = registrations.filter((r) => r.type === 'FW').length;
    const rwCount = registrations.filter((r) => r.type === 'RW').length;
    const states = new Set(operators.map((op) => op.state)).size;

    return [
      {
        key: 'operators',
        label: 'Total Operators',
        value: operators.length,
        icon: Building2,
      },
      {
        key: 'aircraft',
        label: 'Total Aircraft',
        value: totalAircraft,
        icon: Plane,
      },
      {
        key: 'fw',
        label: 'Fixed Wing',
        value: fwCount,
        icon: Navigation,
      },
      {
        key: 'states',
        label: 'States Covered',
        value: states,
        icon: MapPin,
      },
    ];
  }, [operators, registrations]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-white">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
