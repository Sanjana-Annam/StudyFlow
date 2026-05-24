'use client';
// app/contact/page.tsx
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <section className="pt-28 pb-16 bg-gradient-to-br from-brand-50 to-teal-50/30">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Get in touch</span>
          <h1 className="font-display text-5xl text-slate-900 mb-4">Contact Us</h1>
          <p className="text-slate-600">Have a question, feedback, or just want to say hello? We read every message and typically respond within one business day.</p>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </div>
  );
}
