'use client';
// app/auth/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type Mode = 'login'|'signup'|'reset';

export default function AuthPage() {
  const { user, loading, signInEmail, signUpEmail, signInGoogle, resetPassword } = useAuth();
  const router = useRouter();
  const [mode, setMode]         = useState<Mode>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [busy, setBusy]         = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  useEffect(() => { if (!loading && user) router.replace('/dashboard'); }, [user,loading,router]);

  const handleSubmit = async () => {
    setError(''); setSuccess(''); setBusy(true);
    try {
      if (mode==='login')  await signInEmail(email, password);
      if (mode==='signup') await signUpEmail(email, password, name);
      if (mode==='reset')  { await resetPassword(email); setSuccess('Reset email sent! Check your inbox.'); }
    } catch(e:any) {
      setError(
        e?.code==='auth/wrong-password'       ? 'Incorrect password.' :
        e?.code==='auth/user-not-found'       ? 'No account with this email.' :
        e?.code==='auth/email-already-in-use' ? 'Email already registered.' :
        e?.code==='auth/weak-password'        ? 'Password must be 6+ characters.' :
        'Something went wrong. Please try again.'
      );
    } finally { setBusy(false); }
  };

  const Field = ({ label, type='text', value, onChange, placeholder, icon: Icon, extra }: any) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors" />
        {extra}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-700 via-brand-800 to-teal-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-16 left-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-8 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl" />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 mb-14">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display text-2xl text-white">StudyFlow</span>
          </Link>
          <h2 className="font-display text-5xl text-white leading-tight mb-5">Study smarter,<br />not harder.</h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-md">Pomodoro timers, smart planners, distraction tracking, and gamified progress — everything you need to ace your exams.</p>
        </div>
        <div className="relative space-y-3.5">
          {[['⏱️','Pomodoro timer with session tracking'],['📅','Smart study planner from exam dates'],['📊','Weekly analytics & productivity score'],['🔥','Gamification to keep you consistent']].map(([i,t])=>(
            <div key={t} className="flex items-center gap-3 text-slate-200">
              <span className="text-xl">{i}</span><span className="text-sm">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-display text-lg text-slate-900">StudyFlow</span>
          </Link>

          <h1 className="font-display text-3xl text-slate-900 mb-1">
            {mode==='login'?'Welcome back':mode==='signup'?'Create account':'Reset password'}
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            {mode==='login'?"Let's get back to studying.":mode==='signup'?'Start your smart study journey.':"We'll send a reset link to your email."}
          </p>

          <div className="space-y-4">
            {mode==='signup' && <Field label="Full Name" value={name} onChange={(e:any)=>setName(e.target.value)} placeholder="Your name" icon={User} />}
            <Field label="Email" type="email" value={email} onChange={(e:any)=>setEmail(e.target.value)} placeholder="you@example.com" icon={Mail} />
            {mode!=='reset' && (
              <Field label="Password" type={showPw?'text':'password'} value={password} onChange={(e:any)=>setPassword(e.target.value)} placeholder="••••••••" icon={Lock}
                extra={<button type="button" onClick={()=>setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>} />
            )}

            {error   && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            {success && <p className="text-sm text-teal-600 bg-teal-50 px-3 py-2 rounded-lg">{success}</p>}

            <button onClick={handleSubmit} disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
              {busy ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/> : <ArrowRight size={16}/>}
              {mode==='login'?'Sign In':mode==='signup'?'Create Account':'Send Reset Email'}
            </button>

            {mode!=='reset' && <>
              <div className="flex items-center gap-3"><div className="flex-1 h-px bg-slate-200"/><span className="text-xs text-slate-400">or</span><div className="flex-1 h-px bg-slate-200"/></div>
              <button onClick={async()=>{setError('');setBusy(true);try{await signInGoogle();}catch{setError('Google sign-in failed.');}finally{setBusy(false);}}}
                disabled={busy}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-60">
                <svg width="16" height="16" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.387 17.64 12.08 17.64 9.2z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
            </>}

            <p className="text-center text-sm text-slate-500">
              {mode==='login'&&<><button onClick={()=>setMode('reset')} className="text-teal-600 hover:underline mr-3">Forgot password?</button>No account? <button onClick={()=>setMode('signup')} className="text-teal-600 font-medium hover:underline">Sign up</button></>}
              {mode==='signup'&&<>Have an account? <button onClick={()=>setMode('login')} className="text-teal-600 font-medium hover:underline">Sign in</button></>}
              {mode==='reset'&&<button onClick={()=>setMode('login')} className="text-teal-600 hover:underline">← Back to sign in</button>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
