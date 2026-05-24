// lib/db.ts
import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, addDoc, getDocs, query, where,
  orderBy, Timestamp, increment, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { StudyPlan, Session, Distraction, UserProfile } from './types';

// ── USERS ──────────────────────────────────────────────────────────────────
export async function upsertUser(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { ...data, points: 0, streak: 0, lastActiveDate: Timestamp.now(), createdAt: serverTimestamp() });
  } else {
    await updateDoc(ref, { ...data, lastActiveDate: Timestamp.now() });
  }
}
export async function getUser(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}
export async function updateUserPoints(uid: string, delta: number) {
  await updateDoc(doc(db, 'users', uid), { points: increment(delta) });
}

// ── STUDY PLANS ────────────────────────────────────────────────────────────
export async function createStudyPlan(uid: string, plan: Omit<StudyPlan,'id'>) {
  const ref = await addDoc(collection(db, 'studyPlans'), { ...plan, uid, createdAt: serverTimestamp() });
  return ref.id;
}
export async function getStudyPlans(uid: string): Promise<StudyPlan[]> {
  const q = query(collection(db,'studyPlans'), where('uid','==',uid), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as StudyPlan));
}
export async function updateStudyPlan(planId: string, data: Partial<StudyPlan>) {
  await updateDoc(doc(db,'studyPlans',planId), data);
}
export async function deleteStudyPlan(planId: string) {
  await deleteDoc(doc(db,'studyPlans',planId));
}
export async function toggleTaskComplete(
  planId: string, taskIndex: number, tasks: StudyPlan['tasks'], uid: string, completed: boolean
) {
  const updated = [...tasks];
  updated[taskIndex] = { ...updated[taskIndex], completed };
  await updateDoc(doc(db,'studyPlans',planId), { tasks: updated });
  await updateUserPoints(uid, completed ? 10 : -5);
}

// ── SESSIONS ───────────────────────────────────────────────────────────────
export async function saveSession(uid: string, session: Omit<Session,'id'>) {
  return addDoc(collection(db,'sessions'), { ...session, uid, createdAt: serverTimestamp() });
}
export async function getSessionsForRange(uid: string, start: Date, end: Date): Promise<Session[]> {
  const q = query(collection(db,'sessions'),
    where('uid','==',uid),
    where('date','>=',Timestamp.fromDate(start)),
    where('date','<=',Timestamp.fromDate(end)),
    orderBy('date','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Session));
}
export async function getTodaySessions(uid: string): Promise<Session[]> {
  const s = new Date(); s.setHours(0,0,0,0);
  const e = new Date(); e.setHours(23,59,59,999);
  return getSessionsForRange(uid, s, e);
}

// ── DISTRACTIONS ───────────────────────────────────────────────────────────
export async function logDistraction(uid: string, d: Omit<Distraction,'id'>) {
  return addDoc(collection(db,'distractions'), { ...d, uid, createdAt: serverTimestamp() });
}
export async function getDistractionsForRange(uid: string, start: Date, end: Date): Promise<Distraction[]> {
  const q = query(collection(db,'distractions'),
    where('uid','==',uid),
    where('date','>=',Timestamp.fromDate(start)),
    where('date','<=',Timestamp.fromDate(end)),
    orderBy('date','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Distraction));
}
export async function getTodayDistractions(uid: string): Promise<Distraction[]> {
  const s = new Date(); s.setHours(0,0,0,0);
  const e = new Date(); e.setHours(23,59,59,999);
  return getDistractionsForRange(uid, s, e);
}
