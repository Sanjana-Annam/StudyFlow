// app/sitemap.ts
import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://studyflowapp.com';
  const now = new Date().toISOString();

  const staticPages = [
    { url: base,                             lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/blog`,                   lastModified: now, changeFrequency: 'daily'  as const, priority: 0.9 },
    { url: `${base}/about`,                  lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/contact`,                lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/privacy-policy`,         lastModified: now, changeFrequency: 'yearly'  as const, priority: 0.4 },
    { url: `${base}/terms-and-conditions`,   lastModified: now, changeFrequency: 'yearly'  as const, priority: 0.4 },
  ];

  const blogPages = BLOG_POSTS.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
