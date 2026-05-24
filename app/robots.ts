// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/planner', '/analytics', '/settings', '/api/'],
      },
    ],
    sitemap: 'https://studyflowapp.com/sitemap.xml',
    host: 'https://studyflowapp.com',
  };
}
