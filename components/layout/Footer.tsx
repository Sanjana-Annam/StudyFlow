'use client';
// components/layout/Footer.tsx

import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const FOOTER_LINKS = {
  Product: [
    { href: '/#features',  label: 'Features' },
    { href: '/auth',       label: 'Get Started Free' },
    { href: '/dashboard',  label: 'Dashboard' },
    { href: '/planner',    label: 'Study Planner' },
  ],
  Learn: [
    { href: '/blog',       label: 'Study Blog' },
    { href: '/blog/best-study-techniques-for-students',    label: 'Study Techniques' },
    { href: '/blog/pomodoro-technique-complete-guide',     label: 'Pomodoro Guide' },
    { href: '/blog/how-to-avoid-procrastination-students', label: 'Beat Procrastination' },
  ],
  Company: [
    { href: '/about',               label: 'About Us' },
    { href: '/contact',             label: 'Contact' },
    { href: '/privacy-policy',      label: 'Privacy Policy' },
    { href: '/terms-and-conditions',label: 'Terms of Service' },
  ],
};

const SOCIAL = [
  { icon: Twitter,  href: 'https://twitter.com/studyflowapp',  label: 'Twitter' },
  { icon: Github,   href: 'https://github.com/studyflowapp',   label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/studyflowapp', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:hello@studyflowapp.com',     label: 'Email' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-white text-slate-300">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl text-white mb-1">Study tips in your inbox</h3>
              <p className="text-slate-400 text-sm">Weekly evidence-based study strategies, productivity tips, and resources. No spam.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-teal-500/20 text-teal-400 px-5 py-3 rounded-xl text-sm font-medium">
                ✓ You're subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold transition-colors flex items-center gap-1.5">
                  Subscribe <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center">
                <Zap size={15} className="text-white" />
              </div>
              <span className="font-display text-xl text-white">StudyFlow</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              The smart study companion for students who want to study less and achieve more.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/20 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} StudyFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
