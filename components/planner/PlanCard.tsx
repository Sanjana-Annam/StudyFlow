'use client';
// components/planner/PlanCard.tsx
import { useState } from 'react';
import { CalendarDays, Trash2, ChevronDown, ChevronUp, CheckCircle2, Circle, Clock } from 'lucide-react';
import { StudyPlan } from '@/lib/types';
import { deleteStudyPlan, toggleTaskComplete } from '@/lib/db';
import { daysUntil, formatDuration } from '@/utils/helpers';
import { cn } from '@/utils/cn';

const priorityColor = {
  high:   'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low:    'bg-teal-50 text-teal-600',
};

export default function PlanCard({ plan, uid, onUpdate }: { plan: StudyPlan; uid: string; onUpdate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState<number | null>(null);

  const done  = plan.tasks.filter(t => t.completed).length;
  const total = plan.tasks.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  const days  = daysUntil(plan.examDate);

  const handleDelete = async () => {
    if (!confirm('Delete this plan?')) return;
    setDeleting(true);
    await deleteStudyPlan(plan.id);
    onUpdate();
  };

  const handleToggle = async (i: number, completed: boolean) => {
    setToggling(i);
    await toggleTaskComplete(plan.id, i, plan.tasks, uid, !completed);
    onUpdate();
    setToggling(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{plan.title}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1"><CalendarDays size={11}/>
              {days === 0 ? '🎯 Exam today!' : `${days} days left`}
            </span>
            <span>{done}/{total} tasks</span>
          </div>
        </div>
        <button onClick={handleDelete} disabled={deleting} className="text-slate-300 hover:text-red-400 transition-colors">
          <Trash2 size={15}/>
        </button>
      </div>

      {/* Subject chips */}
      <div className="flex flex-wrap gap-1.5">
        {plan.subjects.map(s => (
          <span key={s.name} className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: s.color }}>
            {s.name} · {s.strength}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Progress</span><span>{pct}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Toggle tasks */}
      <button onClick={() => setExpanded(v=>!v)} className="flex items-center gap-1.5 text-xs font-medium text-teal-600 hover:underline">
        {expanded ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
        {expanded ? 'Hide tasks' : `Show ${total} tasks`}
      </button>

      {expanded && (
        <ul className="space-y-2">
          {plan.tasks.map((task, i) => (
            <li key={i} onClick={() => handleToggle(i, task.completed)}
              className={cn('flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all',
                task.completed ? 'bg-slate-50 border-slate-100 opacity-60'
                               : 'bg-white border-slate-100 hover:border-teal-200')}>
              {toggling===i ? <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin flex-shrink-0"/>
                : task.completed ? <CheckCircle2 size={15} className="text-teal-500 mt-0.5 flex-shrink-0"/>
                : <Circle size={15} className="text-slate-300 mt-0.5 flex-shrink-0"/>}
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium', task.completed ? 'line-through text-slate-400':'text-slate-900')}>{task.topic}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs text-slate-400">{task.subject}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-400 flex items-center gap-0.5"><Clock size={10}/>{formatDuration(task.duration)}</span>
                  <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', priorityColor[task.priority])}>{task.priority}</span>
                </div>
              </div>
              {task.scheduledTime && <span className="text-xs text-slate-400 flex-shrink-0">{task.scheduledTime}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
