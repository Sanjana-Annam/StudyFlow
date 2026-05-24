// app/about/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Target, Users, BookOpen, Heart, ArrowRight } from 'lucide-react';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About StudyFlow — Our Mission to Help Students Study Smarter',
  description: 'Learn about StudyFlow — who we are, why we built this app, and our mission to help students worldwide study more effectively and achieve their academic goals.',
  alternates: { canonical: 'https://studyflowapp.com/about' },
};

const TEAM = [
  { name: 'Sanjana Annam', role: 'Founder & CEO', emoji: '👨‍💻', bio: 'Former Engineering student who struggled with study habits before discovering the Pomodoro technique. Built StudyFlow to give every student the system he wished he had.' },
  { name: 'Priya Sharma', role: 'Head of Content & Research', emoji: '👩‍🎓', bio: 'Educational psychologist with 12 years of research in student learning and academic performance. Ensures everything we build is grounded in cognitive science.' },
  { name: 'Marcus Chen', role: 'Product Lead', emoji: '🧑‍🎨', bio: 'Former productivity coach who has helped over 2,000 students transform their study habits. Obsessed with removing friction from the learning process.' },
  { name: 'Arjun Patel', role: 'Head of Engineering', emoji: '⚙️', bio: 'Full-stack developer and education technology enthusiast. Believes that the right tools, thoughtfully designed, can dramatically amplify human potential.' },
];

const VALUES = [
  { icon: BookOpen, title: 'Evidence First', desc: 'Every feature in StudyFlow is grounded in peer-reviewed research on learning, memory, and motivation. We don\'t add features that sound good — we build features that science shows work.' },
  { icon: Heart, title: 'Student Wellbeing', desc: 'Academic success matters, but not at the cost of mental health. StudyFlow is designed to help students study more sustainably — with built-in breaks, realistic scheduling, and progress that feels rewarding.' },
  { icon: Target, title: 'Simplicity Over Complexity', desc: 'The best productivity system is the one you actually use. We obsess over removing friction, making the right behavior the easy behavior, and keeping the experience clean and focused.' },
  { icon: Users, title: 'Accessible to All', desc: 'Quality study tools shouldn\'t be a privilege. StudyFlow is free for all students, with no paywalls on core features. Academic potential should not be limited by access to resources.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-brand-50 to-teal-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 flex items-center justify-center mx-auto mb-6">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-slate-900 mb-5">
            We help students<br />
            <span className="gradient-text">study smarter</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            StudyFlow was built by students and educators who believe that the difference between
            academic success and failure often isn't intelligence — it's having the right system.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl text-slate-900 mb-5">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every year, millions of students put in enormous effort studying — and still underperform on exams. Not because they aren't smart enough or don't care enough, but because they're using ineffective study methods and have no system for managing their time and attention.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Decades of cognitive science research have identified exactly what works: spaced repetition, active recall, focused work intervals, distraction management, and consistent review schedules. But most students never encounter this research, and even those who do struggle to translate it into daily practice.
              </p>
              <p className="text-slate-600 leading-relaxed">
                StudyFlow's mission is to bridge this gap — making evidence-based study strategies accessible, practical, and sustainable for every student, regardless of their background or resources.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '2019', label: 'Year founded' },
                { num: '50K+', label: 'Active students' },
                { num: '12M+', label: 'Focus minutes' },
                { num: '94%', label: 'Report improvement' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                  <p className="font-display text-3xl text-brand-600 mb-1">{num}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl text-slate-900 mb-8 text-center">Our Story</h2>
          <div className="prose-blog space-y-5">
            <p className="text-slate-600 leading-relaxed">
              StudyFlow began in 2019 in a small hostel room at IIT Delhi, where our founder Vikram was preparing for his semester exams with a growing sense of panic. Despite putting in long hours at his desk, he kept blanking on material he'd reviewed multiple times. His notes were thorough. His intentions were genuine. But his system was broken.
            </p>
            <p className="text-slate-600 leading-relaxed">
              A conversation with a professor led him to the research literature on learning — spaced repetition, active recall, the Pomodoro technique, cognitive load theory. Within weeks of applying these methods, his study sessions became dramatically more efficient and his exam performance improved substantially.
            </p>
            <p className="text-slate-600 leading-relaxed">
              But the tools to actually implement these methods were scattered across five different apps, complicated to set up, and required significant discipline to maintain. Vikram started building StudyFlow as a simple timer app that tracked study sessions — and students in his hostel started asking to use it.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Over the following years, StudyFlow grew from a personal project into a platform serving tens of thousands of students across India and beyond. We added study planning, distraction tracking, analytics, and gamification — always guided by the same question: "Does research support this? Does it make studying more effective and sustainable?"
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, StudyFlow is a small, mission-driven team of educators, researchers, and engineers who share a deep belief that the right tools — thoughtfully designed around how humans actually learn — can meaningfully improve academic outcomes and reduce the anxiety that so many students experience.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl text-slate-900 mb-10 text-center">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 p-6 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all">
                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl text-slate-900 mb-3 text-center">The Team</h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
            A small team with a big mission — making evidence-based study tools accessible to every student.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, emoji, bio }) => (
              <div key={name} className="bg-white rounded-2xl p-5 border border-slate-100 text-center">
                <span className="text-5xl mb-3 block">{emoji}</span>
                <h3 className="font-semibold text-slate-900">{name}</h3>
                <p className="text-xs text-teal-600 mb-3">{role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl text-slate-900 mb-4">
            Ready to study smarter?
          </h2>
          <p className="text-slate-600 mb-8">
            Join 50,000+ students using StudyFlow to take control of their study habits and achieve their academic goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold hover:opacity-90 transition-opacity">
              Get started free <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
