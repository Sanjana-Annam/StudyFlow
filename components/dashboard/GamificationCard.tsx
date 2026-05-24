// components/dashboard/GamificationCard.tsx
import { Flame, Star, Trophy } from 'lucide-react';
import { UserProfile } from '@/lib/types';

const LEVELS = [
  { level:1, title:'Beginner',     next:100  },
  { level:2, title:'Student',      next:300  },
  { level:3, title:'Achiever',     next:600  },
  { level:4, title:'Scholar',      next:1000 },
  { level:5, title:'Expert',       next:1500 },
  { level:6, title:'Master',       next:2500 },
  { level:7, title:'Grand Master', next:Infinity },
];
const THRESHOLDS = [0, 0, 100, 300, 600, 1000, 1500, 2500];

function getLevel(pts: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (i === 0 || pts >= THRESHOLDS[LEVELS[i].level]) return LEVELS[i];
  }
  return LEVELS[0];
}

export default function GamificationCard({ profile }: { profile: UserProfile | null }) {
  const pts    = profile?.points ?? 0;
  const streak = profile?.streak ?? 0;
  const lvl    = getLevel(pts);
  const prev   = THRESHOLDS[lvl.level] ?? 0;
  const pct    = lvl.next === Infinity ? 100 : Math.round(((pts - prev) / (lvl.next - prev)) * 100);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-teal-700 text-white p-5 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-brand-200 uppercase tracking-wider">Level {lvl.level}</p>
          <h3 className="text-xl font-display font-bold">{lvl.title}</h3>
        </div>
        <Trophy size={26} className="text-amber-300" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/15 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Star size={13} className="text-amber-300" />
            <span className="text-xs text-brand-100">Points</span>
          </div>
          <p className="text-2xl font-bold">{pts.toLocaleString()}</p>
        </div>
        <div className="bg-white/15 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Flame size={13} className="text-orange-300" />
            <span className="text-xs text-brand-100">Streak</span>
          </div>
          <p className="text-2xl font-bold">{streak}<span className="text-sm font-normal ml-1">days</span></p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-brand-200 mb-1.5">
          <span>To Level {lvl.level + 1}</span>
          {lvl.next !== Infinity && <span>{pts}/{lvl.next}</span>}
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-300 to-teal-300 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
