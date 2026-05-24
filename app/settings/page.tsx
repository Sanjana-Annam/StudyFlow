'use client';
// app/settings/page.tsx
import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { User, Shield, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUser } from '@/lib/db';
import { UserProfile } from '@/lib/types';
import { auth } from '@/lib/firebase';
import AppShell from '@/components/layout/AppShell';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name,    setName]    = useState('');
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUser(user.uid).then(p => {
      setProfile(p);
      setName(p?.displayName ?? user.displayName ?? '');
      setLoading(false);
    });
  }, [user]);

  const handleSave = async () => {
    if (!auth.currentUser) return;
    setSaving(true);
    await updateProfile(auth.currentUser, { displayName: name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-400 transition-colors";
  const cardCls  = "bg-white rounded-2xl border border-slate-100 p-6 space-y-4";

  return (
    <AppShell>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your profile and account.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-teal-200 border-t-jade-600 animate-spin"/>
          </div>
        ) : (
          <>
            {/* Profile */}
            <div className={cardCls}>
              <div className="flex items-center gap-2">
                <User size={16} className="text-teal-500"/><h2 className="font-semibold text-slate-900">Profile</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                  {name?.[0]?.toUpperCase() ?? 'S'}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{name}</p>
                  <p className="text-sm text-slate-400">{user?.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className={inputCls} placeholder="Your name"/>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white text-sm font-semibold disabled:opacity-60">
                  {saving ? <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin"/> : null}
                  Save Changes
                </button>
                {saved && <span className="text-sm text-teal-600">✓ Saved!</span>}
              </div>
            </div>

            {/* Stats */}
            <div className={cardCls}>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-teal-500"/><h2 className="font-semibold text-slate-900">Your Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-display font-bold text-brand-700">{profile?.points ?? 0}</p>
                  <p className="text-sm text-slate-500 mt-1">Total Points</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-display font-bold text-orange-600">{profile?.streak ?? 0}</p>
                  <p className="text-sm text-slate-500 mt-1">Day Streak 🔥</p>
                </div>
              </div>
            </div>

            {/* Account */}
            <div className={cardCls}>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-teal-500"/><h2 className="font-semibold text-slate-900">Account</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Email</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">Verified</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Sign-in method</p>
                    <p className="text-xs text-slate-400">{user?.providerData[0]?.providerId ?? 'email/password'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger */}
            <div className="bg-white rounded-2xl border border-red-100 p-6">
              <h2 className="font-semibold text-slate-900 mb-3">Account Actions</h2>
              <button onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-all">
                <LogOut size={14}/> Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
