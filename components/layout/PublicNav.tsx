'use client';
// components/layout/PublicNav.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/blog',    label: 'Blog' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function PublicNav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-display text-xl text-slate-900 tracking-tight">StudyFlow</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all">
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link href="/auth"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-sm">
            Start Free →
          </Link>
          <button onClick={() => setOpen(v => !v)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1 shadow-lg">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
              {label}
            </Link>
          ))}
          <Link href="/auth" onClick={() => setOpen(false)}
            className="flex items-center justify-center px-4 py-3 mt-1 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 text-white">
            Start Free
          </Link>
        </div>
      )}
    </header>
  );
}
