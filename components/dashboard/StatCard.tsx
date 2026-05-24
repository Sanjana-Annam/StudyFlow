// components/dashboard/StatCard.tsx
import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon: ReactNode;
  iconBg?: string;
  trend?: { value: number; label: string };
}

export default function StatCard({ label, value, sub, icon, iconBg = 'bg-brand-50', trend }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
          {icon}
        </div>
        {trend && (
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full',
            trend.value >= 0
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-red-50 text-red-500')}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
