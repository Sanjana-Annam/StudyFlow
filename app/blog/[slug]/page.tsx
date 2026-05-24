// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { getBlogPost, BLOG_POSTS } from '@/lib/blog-data';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedPosts from '@/components/blog/RelatedPosts';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    alternates: { canonical: `https://studyflowapp.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://studyflowapp.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

function renderContent(markdown: string): string {
  return markdown
    // h2
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // h3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // unordered list
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    // numbered list
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // paragraphs (lines not already wrapped)
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[23]|ul|ol|li)/.test(block)) return block;
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  const htmlContent = renderContent(post.content);

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      <PublicNav />

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-teal-500 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Category + back */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <Link href="/blog" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
              <ArrowLeft size={14} /> All articles
            </Link>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
            <span className="flex items-center gap-1.5"><User size={14} />
              <span className="font-medium text-slate-700">{post.author}</span>
              <span className="text-slate-400">— {post.authorRole}</span>
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5"><Clock size={14} />
              {post.readingTime} min read
            </span>
          </div>

          {/* Cover graphic */}
          <div className={`h-52 md:h-64 rounded-2xl bg-gradient-to-br ${post.coverGradient} flex items-center justify-center mb-10`}>
            <span className="text-8xl">{post.coverEmoji}</span>
          </div>

          {/* Article body */}
          <article
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
            <span className="flex items-center gap-1 text-xs text-slate-400 mr-1"><Tag size={12} /> Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <ShareButtons title={post.title} slug={post.slug} />

          {/* CTA box */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-100 to-teal-900 p-8 text-center">
            <p className="text-2xl mb-2">⚡</p>
            <h3 className="font-display text-2xl text-white mb-2">Put these tips into practice</h3>
            <p className="text-slate-300 text-sm mb-5">
              StudyFlow's Pomodoro timer, study planner, and analytics turn the strategies in this article into trackable daily habits.
            </p>
            <Link href="/auth"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors">
              Start free — no credit card
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && <RelatedPosts posts={related} />}
      </main>

      <Footer />

      {/* Article schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        author: { '@type': 'Person', name: post.author },
        publisher: { '@type': 'Organization', name: 'StudyFlow', url: 'https://studyflowapp.com' },
        datePublished: post.date,
        url: `https://studyflowapp.com/blog/${post.slug}`,
        keywords: post.tags.join(', '),
      })}} />
    </div>
  );
}
