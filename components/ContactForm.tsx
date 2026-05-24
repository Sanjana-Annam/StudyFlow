'use client';
// components/ContactForm.tsx
import { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle2 } from 'lucide-react';

const FAQS = [
  { q: 'How do I reset my password?', a: 'Click "Forgot password?" on the login page and enter your email. You\'ll receive a reset link within a few minutes.' },
  { q: 'Is StudyFlow free?', a: 'Yes — StudyFlow is completely free to use with all core features included. No credit card required.' },
  { q: 'My data isn\'t saving. What should I do?', a: 'Ensure you\'re logged in to your account. If issues persist, try clearing your browser cache or contact us below.' },
  { q: 'Can I export my study data?', a: 'We\'re working on a data export feature. Contact us if you need your data urgently and we can help manually.' },
  { q: 'Do you have a mobile app?', a: 'StudyFlow is a Progressive Web App — it works great on mobile browsers and can be added to your home screen. Dedicated iOS/Android apps are on our roadmap.' },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission (replace with real API call / Formspree / EmailJS)
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="font-display text-3xl text-slate-900 mb-6">Send us a message</h2>
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 size={48} className="text-teal-500 mb-4" />
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Message sent!</h3>
              <p className="text-slate-500">Thanks for reaching out. We'll get back to you within one business day.</p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-6 text-sm text-teal-600 hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="name" required value={form.name} onChange={handleChange}
                    placeholder="Riya Mehta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select name="subject" required value={form.subject} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-400 transition-colors">
                  <option value="">Select a subject…</option>
                  <option value="general">General Enquiry</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Issue</option>
                  <option value="partnership">Partnership / Press</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-400 transition-colors resize-none" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <><Send size={15} /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact info + FAQ */}
        <div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Other ways to reach us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-teal-500" />
                <a href="mailto:hello@studyflowapp.com" className="hover:text-teal-600">hello@studyflowapp.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-teal-500" />
                <a href="mailto:support@studyflowapp.com" className="hover:text-teal-600">support@studyflowapp.com</a>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">⏰ Response time: within 1 business day<br />🌏 We're based in India (IST timezone)</p>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border border-slate-100 overflow-hidden group">
                <summary className="px-4 py-3 cursor-pointer list-none flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-900">{q}</span>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg leading-none flex-shrink-0 ml-2">+</span>
                </summary>
                <div className="px-4 pb-3">
                  <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
