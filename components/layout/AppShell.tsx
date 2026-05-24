'use client';
// components/layout/AppShell.tsx
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, BarChart3, Settings, Zap, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/planner',   label: 'Planner',   icon: BookOpen },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings',  label: 'Settings',  icon: Settings },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/auth');
  }, [user, loading, router]);

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
    </div>
  );

  const NavLink = ({ href, label, icon: Icon }: typeof NAV[0]) => {
    const active = pathname === href;
    return (
      <Link href={href} onClick={() => setOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
          active
            ? 'bg-gradient-to-r from-brand-600 to-teal-500 text-white shadow-sm'
            : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
        )}>
        <Icon size={17} />{label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-col h-screen sticky top-0 border-r border-slate-200 bg-white px-3 py-6">
        <Link href="/" className="flex items-center gap-2 px-3 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-sm">
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-display text-lg text-slate-900">StudyFlow</span>
        </Link>

        <nav className="flex-1 flex flex-col gap-0.5">
          {NAV.map(n => <NavLink key={n.href} {...n} />)}
        </nav>

        <div className="border-t border-slate-100 pt-3 mt-3">
          <div className="flex items-center gap-2.5 px-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.displayName?.[0]?.toUpperCase() ?? 'S'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{user.displayName}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 flex items-center justify-between px-4 py-3 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-display text-base text-slate-900">StudyFlow</span>
        </Link>
        <button onClick={() => setOpen(v => !v)} className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-all">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-56 bg-white shadow-2xl p-4" onClick={e => e.stopPropagation()}>
            <div className="mt-16 flex flex-col gap-0.5">
              {NAV.map(n => <NavLink key={n.href} {...n} />)}
            </div>
            <button onClick={() => { signOut(); setOpen(false); }}
              className="mt-6 flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-red-500">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
