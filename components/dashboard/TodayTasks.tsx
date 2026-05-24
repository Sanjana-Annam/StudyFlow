'use client';
// components/dashboard/TodayTasks.tsx
import { useState } from 'react';
import { CheckCircle2, Circle, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { StudyPlan } from '@/lib/types';
import { toggleTaskComplete } from '@/lib/db';
import { cn } from '@/utils/cn';

const priorityColor = {
  high:   'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low:    'bg-emerald-50 text-emerald-600',
};

export default function TodayTasks({ plan, uid, onUpdate }: { plan: StudyPlan | null; uid: string; onUpdate: () => void }) {
  const [toggling, setToggling] = useState<number | null>(null);

  if (!plan || plan.tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 flex flex-col items-center text-center shadow-card">
        <BookOpen size={36} className="text-slate-200 mb-3" />
        <p className="font-semibold text-slate-700">No study plan yet</p>
        <p className="text-sm text-slate-400 mt-1 mb-4">Create a plan to see your daily tasks here.</p>
        <Link href="/planner" className="text-sm font-semibold text-brand-600 hover:underline">Go to Planner →</Link>
      </div>
    );
  }

  const done  = plan.tasks.filter(t => t.completed).length;
  const total = plan.tasks.length;
  const pct   = Math.round((done / total) * 100);

  const handleToggle = async (i: number, completed: boolean) => {
    setToggling(i);
    try { await toggleTaskComplete(plan.id, i, plan.tasks, uid, !completed); onUpdate(); }
    finally { setToggling(null); }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900">Today's Tasks</h3>
          <p className="text-xs text-slate-400 mt-0.5">{done}/{total} completed</p>
        </div>
        {/* Mini ring */}
        <div className="relative w-11 h-11">
          <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#e0e7ff" strokeWidth="3.5" />
            <circle cx="20" cy="20" r="16" fill="none" stroke="url(#ring)" strokeWidth="3.5"
              strokeDasharray={`${pct} 100`} strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.5s ease' }} />
            <defs>
              <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-brand-700">{pct}%</span>
        </div>
      </div>

      <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {plan.tasks.map((task, i) => (
          <li key={i} onClick={() => handleToggle(i, task.completed)}
            className={cn(
              'flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all',
              task.completed
                ? 'bg-slate-50 border-slate-100 opacity-60'
                : 'bg-white border-slate-200 hover:border-brand-300 hover:bg-brand-50/30'
            )}>
            {toggling === i
              ? <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-brand-400 border-t-transparent animate-spin flex-shrink-0" />
              : task.completed
                ? <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                : <Circle size={16} className="text-slate-300 mt-0.5 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-medium', task.completed ? 'line-through text-slate-400' : 'text-slate-800')}>
                {task.topic}
              </p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs text-slate-400">{task.subject}</span>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-slate-400 flex items-center gap-0.5"><Clock size={10} />{task.duration}m</span>
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', priorityColor[task.priority])}>{task.priority}</span>
              </div>
            </div>
            {task.scheduledTime && <span className="text-xs text-slate-400 flex-shrink-0">{task.scheduledTime}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
