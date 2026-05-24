// app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Timer, BookOpen, BarChart3, Target, Zap, Shield, Star,
  ChevronRight, CheckCircle2, TrendingUp, Brain, Clock,
  Smartphone, ArrowRight, Play, Users, Award
} from 'lucide-react';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'StudyFlow — Smart Study Timer & Productivity App for Students',
  description: 'StudyFlow helps students manage study time, beat procrastination, and ace exams with Pomodoro timers, smart study planners, distraction tracking, and analytics. Free to use.',
  alternates: { canonical: 'https://studyflowapp.com' },
};

const FEATURES = [
  {
    icon: Timer,
    title: 'Pomodoro Timer',
    desc: 'Science-backed 25-minute focus sessions with 5-minute breaks. Track every session, see your daily focus hours, and build momentum with streaks.',
    color: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    icon: BookOpen,
    title: 'Smart Study Planner',
    desc: 'Enter your subjects, exam dates, and weak topics. StudyFlow generates a realistic daily study schedule — automatically balanced across subjects by difficulty.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: Target,
    title: 'Task Management',
    desc: 'Break your syllabus into daily tasks, mark completions, and earn points. Every finished task moves you closer to your exam goal.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: BarChart3,
    title: 'Productivity Analytics',
    desc: 'Visualize your study hours, distraction patterns, and productivity score with beautiful weekly and monthly charts. Know exactly how your time is spent.',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  {
    icon: Smartphone,
    title: 'Distraction Tracker',
    desc: 'Log what distracted you — Instagram, YouTube, gaming — and how long. See weekly patterns and watch your distraction time shrink over the semester.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Award,
    title: 'Gamification System',
    desc: 'Earn points for every completed task, maintain daily streaks, and level up from Beginner to Grand Master. Studying has never been this rewarding.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

const BENEFITS = [
  {
    icon: Brain,
    title: 'Better Concentration',
    desc: "The Pomodoro technique trains your brain for deep focus. After two weeks of consistent use, most students report dramatically improved ability to concentrate for extended periods. By working in timed sprints, you stop fighting distraction and start managing attention like a skill.",
  },
  {
    icon: Clock,
    title: 'Smarter Time Management',
    desc: "Most students have no idea where their study time actually goes. StudyFlow's analytics reveal the truth — and the data is often surprising. With real visibility into your hours, you can make deliberate decisions about how to allocate the time you have.",
  },
  {
    icon: TrendingUp,
    title: 'Reduced Procrastination',
    desc: "Breaking studying into 25-minute Pomodoros makes starting easier because the commitment is smaller. StudyFlow's gamification adds immediate rewards that compete with the instant gratification of distractions. Over time, the habit of starting builds itself.",
  },
  {
    icon: Shield,
    title: 'Better Exam Preparation',
    desc: "StudyFlow's study planner uses backward planning from your exam dates to create a realistic preparation schedule. No more realizing a week before finals that you're three chapters behind. With a visual roadmap, you always know exactly where you stand.",
  },
];

const STATS = [
  { value: '50,000+', label: 'Active Students' },
  { value: '2.4M+',   label: 'Study Sessions Logged' },
  { value: '12M+',    label: 'Focus Minutes Tracked' },
  { value: '94%',     label: 'Report Better Grades' },
];

const TESTIMONIALS = [
  {
    name: 'Riya Mehta',
    role: 'Engineering Student, IIT Delhi',
    avatar: '👩‍💻',
    rating: 5,
    text: "StudyFlow completely changed how I prepare for exams. I used to panic three days before and cram everything. Now I have a proper schedule and I actually understand the material rather than just memorizing it. My GPA went from 7.2 to 8.8 in one semester.",
  },
  {
    name: 'Arjun Bose',
    role: 'UPSC Aspirant, Kolkata',
    avatar: '📚',
    rating: 5,
    text: "The Pomodoro timer alone was worth it — I was trying to study for 3 hours straight and wondering why I retained nothing. Now I do 4–5 focused Pomodoros and I'm actually absorbing the material. The streak feature keeps me accountable on bad days.",
  },
  {
    name: 'Priya Nair',
    role: 'Pre-Med Student, AIIMS',
    avatar: '🩺',
    rating: 5,
    text: "Medical school has an insane amount of content. StudyFlow's spaced study planner helps me distribute subjects so I'm not neglecting anatomy while cramming pharmacology. The distraction tracker showed me I was losing 90 minutes daily to Instagram — that was a wake-up call.",
  },
  {
    name: 'Karan Shah',
    role: 'CA Foundation, Mumbai',
    avatar: '💼',
    rating: 5,
    text: "CA exams require months of consistent preparation. StudyFlow keeps me on track with daily task lists and shows me exactly how many hours I've put in. Seeing my progress visually makes it feel manageable. Cleared Foundation in my first attempt.",
  },
  {
    name: 'Sneha Reddy',
    role: 'Class 12 Science, Hyderabad',
    avatar: '🧪',
    rating: 5,
    text: "Board exams are stressful but having a plan makes all the difference. My parents couldn't believe I was studying voluntarily — the gamification makes it actually fun. I've maintained a 28-day streak and my confidence going into JEE is completely different.",
  },
  {
    name: 'Dev Sharma',
    role: 'MBA Student, IIM Ahmedabad',
    avatar: '📊',
    rating: 5,
    text: "IIM is intense — cases, quizzes, assignments all competing for the same hours. StudyFlow's analytics helped me realize I was spending too much time on reading and not enough on practice. That insight alone improved my quiz scores within two weeks.",
  },
];

const FAQS = [
  {
    q: 'Is StudyFlow free to use?',
    a: 'Yes! StudyFlow is completely free. Create an account with your email or Google, and get full access to the Pomodoro timer, study planner, analytics, and gamification features at no cost.',
  },
  {
    q: 'What is the Pomodoro Technique?',
    a: 'The Pomodoro Technique is a time management method that involves working in focused 25-minute sprints (called Pomodoros) followed by 5-minute breaks. After four Pomodoros, you take a longer 15–30 minute break. Developed by Francesco Cirillo in the 1980s, it is backed by decades of cognitive science research as one of the most effective focus methods available.',
  },
  {
    q: 'How does the Smart Study Planner work?',
    a: 'You enter your subjects, exam date, and rate each topic as weak, medium, or strong. StudyFlow then generates a daily study schedule that allocates more time to your weak topics, distributes subjects evenly across available days, and builds in review sessions — all backward-planned from your exam date.',
  },
  {
    q: 'Can I use StudyFlow on my phone?',
    a: 'Absolutely. StudyFlow is fully mobile-responsive and works seamlessly on any device — phone, tablet, or desktop. Your data syncs automatically via your account.',
  },
  {
    q: 'How does the gamification system work?',
    a: 'You earn 10 points for every task you complete and maintain a daily streak counter. Points unlock levels from Beginner to Grand Master. The progress tracking makes consistent studying feel rewarding rather than like a chore — tapping into the same psychological mechanisms that make games compelling.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. StudyFlow uses Firebase by Google for authentication and data storage, with industry-standard encryption. Your study data is private and tied to your account — other users cannot see it.',
  },
  {
    q: 'What subjects can I use StudyFlow for?',
    a: 'Any subject works — science, humanities, languages, professional courses, competitive exam prep, or university coursework. StudyFlow is subject-agnostic: you define the subjects, topics, and difficulty ratings.',
  },
  {
    q: 'How is StudyFlow different from a simple timer app?',
    a: 'A simple timer just counts down. StudyFlow connects your timer sessions to study plans, tracks which subjects you covered, logs distraction incidents, calculates a daily productivity score, and visualizes trends over weeks and months. It\'s a complete study management system, not just a clock.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create Your Study Plan',
    desc: 'Enter your subjects, exam dates, and current confidence level for each topic. StudyFlow generates a personalized daily schedule in seconds.',
  },
  {
    step: '02',
    title: 'Study with Pomodoros',
    desc: 'Follow your daily task list, using the built-in Pomodoro timer for each session. Every completed session is logged automatically.',
  },
  {
    step: '03',
    title: 'Track Distractions',
    desc: 'When you get distracted, log it in seconds. Over time, you\'ll see exactly what\'s stealing your focus and how many hours it\'s costing you.',
  },
  {
    step: '04',
    title: 'Review Your Analytics',
    desc: 'Check your weekly study hours, productivity score, and streak data. Use these insights to continuously improve your study system.',
  },
];

const RECENT_POSTS = BLOG_POSTS.slice(0, 3);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-teal-50/40" />
        <div className="absolute inset-0 bg-grid-ink opacity-40" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-400/8 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap size={13} /> Free for all students
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1] mb-6">
              Study Smarter,<br />
              <span className="gradient-text">Not Harder</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
              StudyFlow combines Pomodoro timers, smart study planners, distraction tracking, and
              gamified progress to help students study more effectively and achieve their academic goals
              — without burning out.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link href="/auth"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all">
                Start Studying Free
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 transition-all">
                <Play size={16} className="text-teal-500" /> Read Study Tips
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {['👩‍🎓','👨‍💻','🧑‍🔬','👩‍⚕️'].map((e, i) => (
                    <span key={i} className="text-xl -ml-1 first:ml-0">{e}</span>
                  ))}
                </div>
                <span><strong className="text-slate-700">50,000+</strong> students</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                <span><strong className="text-slate-700">4.9/5</strong> rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-teal-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-4xl md:text-5xl text-brand-600 mb-1">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Simple process</span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-4">
              From chaos to clarity<br />in four steps
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              StudyFlow replaces scattered study habits with a structured, trackable system that continuously improves over the semester.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-teal-200 transition-all hover:-translate-y-1">
                <div className="font-mono text-5xl font-bold text-slate-100 mb-4 leading-none">{step}</div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section id="features" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Everything you need</span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-4">
              Built for students<br />who mean business
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              StudyFlow isn't a simple timer — it's a complete academic productivity system designed around how students actually learn best.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, iconColor }) => (
              <div key={title} className="group rounded-2xl border border-slate-100 p-6 hover:border-teal-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={21} className={iconColor} />
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3 block">Why it works</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Science-backed benefits<br />real students experience
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every feature in StudyFlow is grounded in cognitive science research on how human memory, attention, and motivation actually work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-teal-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY STUDYFLOW ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Why StudyFlow</span>
              <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                Most study apps track time.<br />We track learning.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                A stopwatch tells you how long you studied. StudyFlow tells you what you studied, how productively you studied, what distracted you, and how much you've improved over the semester. That's the difference between logging time and actually improving.
              </p>
              <ul className="space-y-4">
                {[
                  'Backward-planned schedules from your real exam dates',
                  'Distraction tracking that reveals hidden time leaks',
                  'Productivity scores that account for both effort and distractions',
                  'Gamification that makes consistency rewarding, not just obligatory',
                  'Analytics that show trends over weeks and months, not just today',
                ].map(point => (
                  <li key={point} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                Try it free <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⏱️', title: 'Average Pomodoro user', stat: '+41%', sub: 'more tasks completed daily' },
                { icon: '📊', title: 'After 4-week tracking', stat: '−62%', sub: 'distraction time per session' },
                { icon: '🔥', title: 'With 14-day streak', stat: '3.2×', sub: 'more likely to study tomorrow' },
                { icon: '🎯', title: 'Using study planner', stat: '+1.1', sub: 'average GPA improvement' },
              ].map(({ icon, title, stat, sub }) => (
                <div key={title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <span className="text-3xl mb-3 block">{icon}</span>
                  <p className="text-xs text-slate-500 mb-2">{title}</p>
                  <p className="font-display text-3xl text-brand-600">{stat}</p>
                  <p className="text-xs text-slate-500 mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Student stories</span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-4">
              Students who transformed<br />their study habits
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From engineering students to UPSC aspirants, StudyFlow has helped thousands of Indian students build better study habits and achieve their academic goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, avatar, rating, text }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="flex mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{avatar}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{name}</p>
                    <p className="text-slate-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT BLOG POSTS ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">From the blog</span>
              <h2 className="font-display text-3xl md:text-4xl text-slate-900">
                Study smarter<br />with expert tips
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all">
              All articles <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {RECENT_POSTS.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-100 overflow-hidden hover:border-teal-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className={`h-36 bg-gradient-to-br ${post.coverGradient} flex items-center justify-center`}>
                  <span className="text-6xl">{post.coverEmoji}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-teal-600">{post.category}</span>
                  <h3 className="font-semibold text-slate-900 mt-1.5 mb-2 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs">{post.readingTime} min read · {post.author}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              All articles <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Common questions</span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-4">
              Everything you need to know
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-100 via-brand-900 to-teal-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
            <Zap size={28} className="text-white" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-5">
            Your exams are closer<br />than they feel.
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Every day without a study system is a day of wasted potential. Create your free StudyFlow account, set up your exam dates, and start your first Pomodoro session in under two minutes.
          </p>
          <Link href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-lg transition-colors shadow-xl shadow-jade-900/40">
            Get started — it's free <ArrowRight size={18} />
          </Link>
          <p className="text-slate-500 text-sm mt-4">No credit card · No setup fee · Instant access</p>
        </div>
      </section>

      <Footer />

      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'StudyFlow',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50000' },
        description: 'Smart study timer and productivity app for students with Pomodoro technique, study planner, distraction tracker, and analytics.',
      })}} />
    </div>
  );
}

// FAQ accordion item
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
        <span className="font-medium text-slate-900 text-sm pr-4">{q}</span>
        <span className="w-6 h-6 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
      </summary>
      <div className="px-6 pb-5">
        <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
      </div>
    </details>
  );
}
