'use client';
// app/planner/page.tsx
import { useState, useEffect, useCallback } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getStudyPlans } from '@/lib/db';
import { StudyPlan } from '@/lib/types';
import AppShell from '@/components/layout/AppShell';
import PlannerForm from '@/components/planner/PlannerForm';
import PlanCard from '@/components/planner/PlanCard';

export default function PlannerPage() {
  const { user }  = useAuth();
  const [plans,    setPlans]    = useState<StudyPlan[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setPlans(await getStudyPlans(user.uid));
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Study Planner</h1>
            <p className="text-slate-500 text-sm mt-1">Create and manage your personalised study schedules.</p>
          </div>
          {!showForm && (
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              <Plus size={15}/> New Plan
            </button>
          )}
        </div>

        {showForm && (
          <div>
            <PlannerForm uid={user!.uid} onCreated={() => { setShowForm(false); load(); }} />
            <button onClick={() => setShowForm(false)} className="mt-3 text-sm text-slate-400 hover:text-slate-600">Cancel</button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-4 border-teal-200 border-t-jade-600 animate-spin"/>
          </div>
        ) : plans.length === 0 && !showForm ? (
          <div className="text-center py-20">
            <BookOpen size={44} className="text-slate-200 mx-auto mb-4"/>
            <h3 className="font-semibold text-slate-700">No study plans yet</h3>
            <p className="text-sm text-slate-400 mt-1 mb-5">Create your first plan and get a personalised study schedule.</p>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-sm hover:opacity-90">
              <Plus size={15}/> Create Your First Plan
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map(plan => (
              <PlanCard key={plan.id} plan={plan} uid={user!.uid} onUpdate={load} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
