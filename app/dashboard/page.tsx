'use client';
// app/dashboard/page.tsx
import { useEffect, useState, useCallback } from 'react';
import { Clock, BookOpen, Smartphone, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUser, getStudyPlans, getTodaySessions, getTodayDistractions } from '@/lib/db';
import { UserProfile, StudyPlan, Session, Distraction } from '@/lib/types';
import { formatDuration, calcProductivityScore } from '@/utils/helpers';
import AppShell from '@/components/layout/AppShell';
import StatCard from '@/components/dashboard/StatCard';
import TodayTasks from '@/components/dashboard/TodayTasks';
import GamificationCard from '@/components/dashboard/GamificationCard';
import DistractionLogger from '@/components/dashboard/DistractionLogger';
import PomodoroTimer from '@/components/timer/PomodoroTimer';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile,      setProfile]      = useState<UserProfile | null>(null);
  const [plans,        setPlans]        = useState<StudyPlan[]>([]);
  const [sessions,     setSessions]     = useState<Session[]>([]);
  const [distractions, setDistractions] = useState<Distraction[]>([]);
  const [loading,      setLoading]      = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    const [p, pl, sess, dist] = await Promise.all([
      getUser(user.uid), getStudyPlans(user.uid),
      getTodaySessions(user.uid), getTodayDistractions(user.uid),
    ]);
    setProfile(p); setPlans(pl); setSessions(sess); setDistractions(dist);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const plan           = plans[0] ?? null;
  const focusMinutes   = sessions.reduce((s, x) => s + x.durationMinutes, 0);
  const distMinutes    = distractions.reduce((s, x) => s + x.minutes, 0);
  const completedTasks = plan?.tasks.filter(t => t.completed).length ?? 0;
  const score          = calcProductivityScore(focusMinutes, distMinutes, completedTasks);
  const subjects       = plan?.subjects.map(s => s.name) ?? [];

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  };

  return (
    <AppShell>
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-4 border-teal-200 border-t-jade-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {greeting()}, {user?.displayName?.split(' ')[0] ?? 'Student'} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Focus Time" value={focusMinutes >= 60 ? `${(focusMinutes/60).toFixed(1)}h` : `${focusMinutes}m`}
              sub="today" icon={<Clock size={18} className="text-brand-600" />} iconBg="bg-brand-50" />
            <StatCard label="Tasks Done" value={completedTasks} sub={`of ${plan?.tasks.length ?? 0}`}
              icon={<BookOpen size={18} className="text-teal-600" />} iconBg="bg-teal-50" />
            <StatCard label="Distractions" value={distractions.length} sub={`${formatDuration(distMinutes)} lost`}
              icon={<Smartphone size={18} className="text-red-500" />} iconBg="bg-red-50" />
            <StatCard label="Productivity" value={`${score}%`} sub="daily score"
              icon={<Target size={18} className="text-amber-500" />} iconBg="bg-amber-50" />
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              <TodayTasks plan={plan} uid={user!.uid} onUpdate={load} />
              <DistractionLogger uid={user!.uid} todayCount={distractions.length} onLogged={load} />
            </div>
            <div className="space-y-4">
              <PomodoroTimer uid={user!.uid} subjects={subjects} />
              <GamificationCard profile={profile} />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
