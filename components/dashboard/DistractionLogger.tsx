'use client';
// components/dashboard/DistractionLogger.tsx
import { useState } from 'react';
import { Smartphone, Plus } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { logDistraction } from '@/lib/db';
import { DistractionSource } from '@/lib/types';
import { cn } from '@/utils/cn';

const SOURCES: { source: DistractionSource; emoji: string }[] = [
  { source:'Instagram',  emoji:'📸' },
  { source:'YouTube',    emoji:'▶️' },
  { source:'TikTok',     emoji:'🎵' },
  { source:'Twitter/X',  emoji:'🐦' },
  { source:'WhatsApp',   emoji:'💬' },
  { source:'Netflix',    emoji:'🍿' },
  { source:'Gaming',     emoji:'🎮' },
  { source:'Other',      emoji:'📱' },
];

export default function DistractionLogger({ uid, todayCount, onLogged }: { uid: string; todayCount: number; onLogged: () => void }) {
  const [open,    setOpen]    = useState(false);
  const [source,  setSource]  = useState<DistractionSource>('Instagram');
  const [minutes, setMinutes] = useState(10);
  const [saving,  setSaving]  = useState(false);

  const handleLog = async () => {
    setSaving(true);
    try {
      await logDistraction(uid, { uid, source, minutes, date: Timestamp.now(), createdAt: Timestamp.now() });
      onLogged();
      setOpen(false);
    } finally { setSaving(false); }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
            <Smartphone size={15} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Distractions</p>
            <p className="text-xs text-slate-400">Today: {todayCount} logged</p>
          </div>
        </div>
        <button onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors">
          <Plus size={13} /> Log
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 pt-4 mt-3 space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-600 mb-2">What distracted you?</p>
            <div className="grid grid-cols-4 gap-1.5">
              {SOURCES.map(({ source: s, emoji }) => (
                <button key={s} onClick={() => setSource(s)}
                  className={cn('flex flex-col items-center gap-0.5 p-2 rounded-xl text-xs transition-all',
                    source === s ? 'bg-brand-100 text-brand-700 ring-1 ring-brand-400'
                                 : 'bg-slate-50 text-slate-600 hover:bg-slate-100')}>
                  <span className="text-lg">{emoji}</span>
                  <span className="leading-tight text-center">{s}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 mb-2">
              How many minutes? <span className="font-bold text-brand-600">{minutes}m</span>
            </p>
            <input type="range" min={1} max={120} value={minutes} onChange={e => setMinutes(Number(e.target.value))}
              className="w-full accent-teal-500" />
          </div>

          <div className="flex gap-2">
            <button onClick={handleLog} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white text-sm font-semibold disabled:opacity-60">
              {saving ? <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin"/> : null}
              Save
            </button>
            <button onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-100">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
