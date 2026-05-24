// utils/helpers.ts
import { Timestamp } from 'firebase/firestore';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { DailyStats, Session, Distraction } from '@/lib/types';

export function formatTime(s: number) {
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
export function toDate(ts: Timestamp|null|undefined): Date {
  return ts ? ts.toDate() : new Date();
}
export function calcProductivityScore(focusMin: number, distMin: number, tasks: number): number {
  const f = Math.min(focusMin/240,1)*50;
  const d = Math.min(distMin/60,1)*20;
  const t = Math.min(tasks*5,30);
  return Math.round(Math.max(0, f - d + t));
}
export function buildDailyStats(sessions: Session[], distractions: Distraction[], days = 7): DailyStats[] {
  const today = new Date();
  return eachDayOfInterval({ start: subDays(today, days-1), end: today }).map(day => {
    const s = new Date(day); s.setHours(0,0,0,0);
    const e = new Date(day); e.setHours(23,59,59,999);
    const daySess = sessions.filter(x => { const d = toDate(x.date); return d>=s && d<=e && x.type==='focus'; });
    const dayDist = distractions.filter(x => { const d = toDate(x.date); return d>=s && d<=e; });
    const focusMinutes = daySess.reduce((a,x) => a + x.durationMinutes, 0);
    const distractionMinutes = dayDist.reduce((a,x) => a + x.minutes, 0);
    return {
      date: format(day,'EEE'), focusMinutes, distractionMinutes,
      tasksCompleted: daySess.length,
      productivityScore: calcProductivityScore(focusMinutes, distractionMinutes, daySess.length),
    };
  });
}
export function formatDuration(m: number) {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m/60), rem = m%60;
  return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
}
export function daysUntil(dateStr: string) {
  return Math.max(0, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000));
}
export function subjectColor(name: string) {
  const cols = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6'];
  let h = 0;
  for (const c of name) h = c.charCodeAt(0) + ((h<<5) - h);
  return cols[Math.abs(h) % cols.length];
}
