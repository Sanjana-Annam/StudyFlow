// lib/types.ts
import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string; email: string; displayName: string;
  photoURL?: string; points: number; streak: number;
  lastActiveDate: Timestamp; createdAt: Timestamp;
}
export interface Task {
  subject: string; topic: string; duration: number;
  priority: 'high' | 'medium' | 'low'; completed: boolean; scheduledTime?: string;
}
export interface Subject { name: string; strength: 'weak'|'medium'|'strong'; color: string; }
export interface StudyPlan {
  id: string; uid: string; title: string; examDate: string;
  subjects: Subject[]; tasks: Task[]; createdAt: Timestamp;
}
export interface Session {
  id: string; uid: string; type: 'focus'|'break';
  durationMinutes: number; subject?: string; date: Timestamp; createdAt: Timestamp;
}
export type DistractionSource = 'Instagram'|'YouTube'|'TikTok'|'Twitter/X'|'WhatsApp'|'Netflix'|'Gaming'|'Other';
export interface Distraction {
  id: string; uid: string; source: DistractionSource;
  minutes: number; date: Timestamp; createdAt: Timestamp;
}
export interface DailyStats {
  date: string; focusMinutes: number; distractionMinutes: number;
  tasksCompleted: number; productivityScore: number;
}
