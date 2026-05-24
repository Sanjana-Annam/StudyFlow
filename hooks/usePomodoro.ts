'use client';
// hooks/usePomodoro.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { Timestamp } from 'firebase/firestore';
import { saveSession } from '@/lib/db';

type Phase = 'focus'|'break'|'idle';
interface Opts { uid: string; focusMinutes?: number; breakMinutes?: number; subject?: string; }

export function usePomodoro({ uid, focusMinutes=25, breakMinutes=5, subject }: Opts) {
  const [phase, setPhase]       = useState<Phase>('idle');
  const [secsLeft, setSecsLeft] = useState(focusMinutes*60);
  const [running, setRunning]   = useState(false);
  const [done, setDone]         = useState(0);
  const [totalFocus, setTotal]  = useState(0);
  const ref = useRef<NodeJS.Timeout|null>(null);

  useEffect(() => {
    if (phase==='idle') setSecsLeft(focusMinutes*60);
    else if (phase==='focus') setSecsLeft(focusMinutes*60);
    else setSecsLeft(breakMinutes*60);
  }, [phase, focusMinutes, breakMinutes]);

  const tick = useCallback(async () => {
    setSecsLeft(prev => {
      if (prev <= 1) {
        setRunning(false);
        if (phase==='focus') {
          setDone(c=>c+1); setTotal(m=>m+focusMinutes);
          saveSession(uid, { uid, type:'focus', durationMinutes:focusMinutes, subject, date:Timestamp.now(), createdAt:Timestamp.now() }).catch(()=>{});
          setPhase('break');
        } else { setPhase('focus'); }
        return 0;
      }
      return prev-1;
    });
  }, [phase, focusMinutes, uid, subject]);

  useEffect(() => {
    if (running) { ref.current = setInterval(tick, 1000); }
    else if (ref.current) clearInterval(ref.current);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running, tick]);

  const progress = phase==='focus' ? 1-secsLeft/(focusMinutes*60)
                 : phase==='break' ? 1-secsLeft/(breakMinutes*60) : 0;

  return {
    phase, secsLeft, running, done, totalFocus, progress,
    start: () => { if (phase==='idle') setPhase('focus'); setRunning(true); },
    pause: () => setRunning(false),
    reset: () => { setRunning(false); setPhase('idle'); setSecsLeft(focusMinutes*60); },
  };
}
