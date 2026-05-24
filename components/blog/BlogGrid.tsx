'use client';
// components/blog/BlogGrid.tsx
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';
import { cn } from '@/utils/cn';

interface BlogGridProps { posts: BlogPost[]; categories: string[]; }

export default function BlogGrid({ posts, categories }: BlogGridProps) {
  const [query,    setQuery]    = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => posts.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const q = query.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.includes(q));
    return matchCat && matchQ;
  }), [posts, query, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={cn('px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                category === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700')}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-6">
        {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        {query && <> matching "<strong className="text-slate-700">{query}</strong>"</>}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium text-slate-600">No articles found</p>
          <button onClick={() => { setQuery(''); setCategory('All'); }}
            className="mt-3 text-sm text-brand-600 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => <BlogCard key={post.slug} post={post} />)}
        </div>
      )}
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 overflow-hidden hover:border-brand-300 hover:shadow-card-hover transition-all hover:-translate-y-1 bg-white shadow-card">
      <div className={`h-40 bg-gradient-to-br ${post.coverGradient} flex items-center justify-center flex-shrink-0`}>
        <span className="text-6xl drop-shadow-sm">{post.coverEmoji}</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full self-start mb-2">{post.category}</span>
        <h2 className="font-semibold text-slate-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">{post.title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><User size={11} />{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime} min</span>
          </div>
          <span className="flex items-center gap-0.5 text-brand-600 font-medium group-hover:gap-1.5 transition-all">Read <ArrowRight size={11} /></span>
        </div>
      </div>
    </Link>
  );
}
