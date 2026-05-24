'use client';
// components/timer/PomodoroTimer.tsx
import { useState } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import { usePomodoro } from '@/hooks/usePomodoro';
import { formatTime } from '@/utils/helpers';
import { cn } from '@/utils/cn';

const R = 90, CIRC = 2 * Math.PI * R;

export default function PomodoroTimer({ uid, subjects = [] }: { uid: string; subjects?: string[] }) {
  const [subject, setSubject] = useState(subjects[0] ?? '');
  const { phase, secsLeft, running, done, totalFocus, progress, start, pause, reset } = usePomodoro({ uid, subject: subject || undefined });

  const strokeDash = CIRC * (1 - progress);
  const color      = phase === 'break' ? '#00C896' : phase === 'focus' ? '#4545e5' : '#94a3b8';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center gap-5">
      {subjects.length > 0 && (
        <select value={subject} onChange={e => setSubject(e.target.value)} disabled={running}
          className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:border-teal-400 transition-colors">
          <option value="">— Select subject —</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      )}

      {/* Ring */}
      <div className="relative" style={{ width: 210, height: 210 }}>
        <svg width="210" height="210" className="-rotate-90">
          <circle cx="105" cy="105" r={R} fill="none" stroke="#e0e7ff" strokeWidth="9" />
          <circle cx="105" cy="105" r={R} fill="none" stroke={color} strokeWidth="9"
            strokeDasharray={CIRC} strokeDashoffset={strokeDash} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-display font-bold text-slate-900 tabular-nums">
            {formatTime(secsLeft)}
          </span>
          <span className={cn('flex items-center gap-1.5 text-xs font-medium mt-1',
            phase==='focus' ? 'text-brand-600' : phase==='break' ? 'text-teal-600' : 'text-slate-400')}>
            {phase==='break' ? <Coffee size={11}/> : <Zap size={11}/>}
            {phase==='focus' ? 'Focus Time' : phase==='break' ? 'Break Time' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={reset} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all">
          <RotateCcw size={16} />
        </button>
        <button onClick={running ? pause : start}
          className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95',
            phase==='break' ? 'bg-gradient-to-br from-teal-400 to-teal-500'
                            : 'bg-gradient-to-br from-brand-500 to-teal-600')}>
          {running ? <Pause size={20}/> : <Play size={20} className="ml-0.5"/>}
        </button>
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-brand-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-brand-700">{done}</p>
          <p className="text-xs text-slate-500">Sessions done</p>
        </div>
        <div className="bg-teal-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-teal-700">{totalFocus}m</p>
          <p className="text-xs text-slate-500">Focus today</p>
        </div>
      </div>
    </div>
  );
}
