/**
 * Summary statistics component for the Fleet Directory page.
 * Shows aggregate counts for operators, aircraft, types, and states.
 */

import { Building2, Plane, Navigation, MapPin, Wind } from 'lucide-react';

const statConfig = [
  {
    key: 'operators',
    label: 'Total Operators',
    icon: Building2,
    color: 'text-blue-600 bg-blue-100',
    getValue: (operators) => operators.length,
  },
  {
    key: 'aircraft',
    label: 'Total Aircraft',
    icon: Plane,
    color: 'text-sky-600 bg-sky-100',
    getValue: (_operators, registrations) => registrations.length,
  },
  {
    key: 'fw',
    label: 'Fixed Wing',
    icon: Plane,
    color: 'text-indigo-600 bg-indigo-100',
    getValue: (_operators, registrations) =>
      registrations.filter((r) => r.type === 'FW').length,
  },
  {
    key: 'rw',
    label: 'Rotary Wing',
    icon: Navigation,
    color: 'text-emerald-600 bg-emerald-100',
    getValue: (_operators, registrations) =>
      registrations.filter((r) => r.type === 'RW').length,
  },
  {
    key: 'states',
    label: 'States Covered',
    icon: MapPin,
    color: 'text-purple-600 bg-purple-100',
    getValue: (operators) =>
      new Set(operators.map((o) => o.state)).size,
  },
];

export default function FleetStats({ operators = [], registrations = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statConfig.map((stat) => {
          const Icon = stat.icon;
          const value = stat.getValue(operators, registrations);

          return (
            <div
              key={stat.key}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-bold text-slate-900 leading-none">
                  {value}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
