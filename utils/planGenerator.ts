// utils/planGenerator.ts
import { Task, Subject } from '@/lib/types';
import { subjectColor } from './helpers';

export function generateStudyPlan(
  subjects: { name: string; strength: 'weak'|'medium'|'strong'; topics: string[] }[],
  examDateStr: string,
  dailyHours = 4
): Task[] {
  const weight = { weak: 3, medium: 2, strong: 1 };
  const totalW = subjects.reduce((s, x) => s + weight[x.strength], 0);
  const tasks: Task[] = [];
  let slot = 9 * 60;
  subjects.forEach(subj => {
    const mins = Math.round((dailyHours * 60 * weight[subj.strength]) / totalW);
    const topics = subj.topics.length ? subj.topics : [subj.name];
    const perTopic = Math.max(25, Math.round(mins / topics.length));
    topics.forEach(topic => {
      const hh = String(Math.floor(slot/60)%24).padStart(2,'0');
      const mm = String(slot%60).padStart(2,'0');
      tasks.push({
        subject: subj.name, topic, duration: perTopic,
        priority: subj.strength==='weak'?'high':subj.strength==='medium'?'medium':'low',
        completed: false, scheduledTime: `${hh}:${mm}`,
      });
      slot += perTopic + 5;
    });
  });
  return tasks;
}

export const DEFAULT_SUBJECTS: Subject[] = [
  { name: 'Mathematics', strength: 'weak',   color: subjectColor('Mathematics') },
  { name: 'Physics',     strength: 'medium',  color: subjectColor('Physics') },
  { name: 'Chemistry',   strength: 'strong',  color: subjectColor('Chemistry') },
];
