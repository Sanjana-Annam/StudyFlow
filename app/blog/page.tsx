// app/blog/page.tsx
import type { Metadata } from 'next';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import BlogGrid from '@/components/blog/BlogGrid';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Study Tips & Productivity Blog — StudyFlow',
  description: 'Evidence-based study techniques, productivity strategies, and academic advice for students. Learn how to study smarter, beat procrastination, and ace your exams.',
  alternates: { canonical: 'https://studyflowapp.com/blog' },
  openGraph: {
    title: 'Study Tips & Productivity Blog — StudyFlow',
    description: 'Evidence-based study techniques and productivity strategies for students.',
    url: 'https://studyflowapp.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="pt-28 pb-14 bg-gradient-to-br from-brand-50 to-teal-50/30 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 block">Study Resources</span>
          <h1 className="font-display text-5xl md:text-6xl text-slate-900 mb-5">
            Study Tips &<br />Productivity Blog
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Evidence-based articles on study techniques, time management, focus, and academic
            productivity — written by educators and productivity coaches.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-500">
            <span>✍️ {BLOG_POSTS.length} articles</span>
            <span>·</span>
            <span>📚 {BLOG_CATEGORIES.length - 1} categories</span>
            <span>·</span>
            <span>🆓 Free forever</span>
          </div>
        </div>
      </section>

      {/* Blog grid with client-side filtering */}
      <BlogGrid posts={BLOG_POSTS} categories={BLOG_CATEGORIES} />

      <Footer />

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'StudyFlow Blog',
        description: 'Study tips, productivity strategies, and academic advice for students.',
        url: 'https://studyflowapp.com/blog',
        publisher: { '@type': 'Organization', name: 'StudyFlow', url: 'https://studyflowapp.com' },
      })}} />
    </div>
  );
}
