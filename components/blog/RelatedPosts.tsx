// components/blog/RelatedPosts.tsx
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="mt-16 border-t border-slate-100 pt-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-2xl text-slate-900 mb-6">Related Articles</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group rounded-xl border border-slate-100 overflow-hidden hover:border-teal-200 transition-all hover:-translate-y-0.5">
              <div className={`h-28 bg-gradient-to-br ${post.coverGradient} flex items-center justify-center`}>
                <span className="text-4xl">{post.coverEmoji}</span>
              </div>
              <div className="p-4">
                <span className="text-xs text-teal-600">{post.category}</span>
                <h3 className="text-sm font-semibold text-slate-900 mt-1 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <span className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                  <Clock size={10} /> {post.readingTime} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
