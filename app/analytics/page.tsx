'use client';
// app/analytics/page.tsx
import { useState, useEffect, useCallback } from 'react';
import { subDays } from 'date-fns';
import { Clock, Target, Zap, TrendingDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getSessionsForRange, getDistractionsForRange } from '@/lib/db';
import { Session, Distraction } from '@/lib/types';
import { buildDailyStats, formatDuration } from '@/utils/helpers';
import AppShell from '@/components/layout/AppShell';
import StatCard from '@/components/dashboard/StatCard';
import AnalyticsCharts from '@/components/analytics/AnalyticsCharts';
import { cn } from '@/utils/cn';

type Range = 7 | 30;

export default function AnalyticsPage() {
  const { user }  = useAuth();
  const [range,        setRange]        = useState<Range>(7);
  const [sessions,     setSessions]     = useState<Session[]>([]);
  const [distractions, setDistractions] = useState<Distraction[]>([]);
  const [loading,      setLoading]      = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const end = new Date(), start = subDays(end, range);
    const [sess, dist] = await Promise.all([
      getSessionsForRange(user.uid, start, end),
      getDistractionsForRange(user.uid, start, end),
    ]);
    setSessions(sess); setDistractions(dist); setLoading(false);
  }, [user, range]);

  useEffect(() => { load(); }, [load]);

  const daily        = buildDailyStats(sessions, distractions, range);
  const totalFocus   = sessions.reduce((s,x) => s+x.durationMinutes, 0);
  const totalDist    = distractions.reduce((s,x) => s+x.minutes, 0);
  const avgScore     = daily.length ? Math.round(daily.reduce((s,d) => s+d.productivityScore, 0) / daily.length) : 0;
  const bestDay      = daily.reduce((b,d) => d.focusMinutes > (b?.focusMinutes??0) ? d : b, daily[0]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-500 text-sm mt-1">Track your study performance over time.</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden">
            {([7, 30] as Range[]).map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={cn('px-4 py-1.5 text-sm font-medium transition-all',
                  range===r ? 'bg-gradient-to-r from-brand-600 to-teal-600 text-white'
                            : 'text-slate-500 hover:text-slate-700')}>
                {r}d
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-4 border-teal-200 border-t-jade-600 animate-spin"/>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Focus" value={formatDuration(totalFocus)} sub={`last ${range} days`}
                icon={<Clock size={18} className="text-brand-600"/>} iconBg="bg-brand-50"/>
              <StatCard label="Avg Score" value={`${avgScore}%`} sub="productivity"
                icon={<Target size={18} className="text-teal-600"/>} iconBg="bg-teal-50"/>
              <StatCard label="Best Day" value={bestDay?.date ?? '—'} sub={`${formatDuration(bestDay?.focusMinutes??0)} focus`}
                icon={<Zap size={18} className="text-amber-500"/>} iconBg="bg-amber-50"/>
              <StatCard label="Time Lost" value={formatDuration(totalDist)} sub={`${distractions.length} incidents`}
                icon={<TrendingDown size={18} className="text-red-500"/>} iconBg="bg-red-50"/>
            </div>
            <AnalyticsCharts data={daily} />
          </>
        )}
      </div>
    </AppShell>
  );
}
