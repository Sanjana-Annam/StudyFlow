'use client';
// components/planner/PlannerForm.tsx
import { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { createStudyPlan } from '@/lib/db';
import { generateStudyPlan } from '@/utils/planGenerator';
import { subjectColor } from '@/utils/helpers';

interface SubjectInput { name: string; strength: 'weak'|'medium'|'strong'; topics: string; }

export default function PlannerForm({ uid, onCreated }: { uid: string; onCreated: () => void }) {
  const [title,      setTitle]      = useState('');
  const [examDate,   setExamDate]   = useState('');
  const [dailyHours, setDailyHours] = useState(4);
  const [subjects,   setSubjects]   = useState<SubjectInput[]>([{ name:'', strength:'medium', topics:'' }]);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState('');

  const addSubject = () => setSubjects(s => [...s, { name:'', strength:'medium', topics:'' }]);
  const removeSubject = (i: number) => setSubjects(s => s.filter((_,j) => j!==i));
  const update = (i: number, k: keyof SubjectInput, v: string) =>
    setSubjects(s => s.map((x,j) => j===i ? { ...x, [k]: v } : x));

  const handleSubmit = async () => {
    setError('');
    if (!title.trim())  return setError('Please enter a plan title.');
    if (!examDate)       return setError('Please select an exam date.');
    const valid = subjects.filter(s => s.name.trim());
    if (!valid.length)   return setError('Add at least one subject.');
    setSaving(true);
    try {
      const tasks = generateStudyPlan(
        valid.map(s => ({ name: s.name.trim(), strength: s.strength, topics: s.topics.split(',').map(t=>t.trim()).filter(Boolean) })),
        examDate, dailyHours
      );
      await createStudyPlan(uid, {
        title: title.trim(), examDate,
        subjects: valid.map(s => ({ name: s.name.trim(), strength: s.strength, color: subjectColor(s.name) })),
        tasks, uid, createdAt: Timestamp.now(),
      });
      onCreated();
    } catch { setError('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-400 transition-colors";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles size={17} className="text-teal-500" />
        <h3 className="font-semibold text-slate-900">Create Study Plan</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Plan Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. JEE Mains 2025 Prep" className={inputCls} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Exam Date</label>
          <input type="date" value={examDate} min={new Date().toISOString().split('T')[0]} onChange={e=>setExamDate(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Daily Hours: <span className="text-teal-600 font-bold">{dailyHours}h</span></label>
          <input type="range" min={1} max={12} value={dailyHours} onChange={e=>setDailyHours(Number(e.target.value))} className="w-full mt-3 accent-teal-500" />
        </div>
      </div>

      {/* Subjects */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-700">Subjects</label>
          <button onClick={addSubject} className="flex items-center gap-1 text-xs text-teal-600 hover:underline">
            <Plus size={13}/> Add Subject
          </button>
        </div>
        <div className="space-y-3">
          {subjects.map((subj, i) => (
            <div key={i} className="flex gap-2 items-start p-3 bg-slate-50 rounded-xl">
              <div className="flex-1 grid gap-2">
                <input value={subj.name} onChange={e=>update(i,'name',e.target.value)} placeholder="Subject name (e.g. Physics)" className={inputCls} />
                <select value={subj.strength} onChange={e=>update(i,'strength',e.target.value)} className={inputCls}>
                  <option value="weak">😰 Weak — needs most attention</option>
                  <option value="medium">😐 Medium — average confidence</option>
                  <option value="strong">💪 Strong — well prepared</option>
                </select>
                <input value={subj.topics} onChange={e=>update(i,'topics',e.target.value)} placeholder="Topics (comma-separated)" className={inputCls} />
              </div>
              {subjects.length > 1 && (
                <button onClick={() => removeSubject(i)} className="mt-1 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 size={15}/>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      <button onClick={handleSubmit} disabled={saving}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
        {saving ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/> : <Sparkles size={15}/>}
        Generate Study Plan
      </button>
    </div>
  );
}
