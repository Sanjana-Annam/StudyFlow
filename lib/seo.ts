// lib/seo.ts
import type { Metadata } from 'next';

const BASE_URL = 'https://studyflowapp.com';
const SITE_NAME = 'StudyFlow';
const DEFAULT_IMAGE = `${BASE_URL}/og-default.png`;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  keywords?: string[];
}

export function buildMetadata({
  title, description, canonical, image, type = 'website',
  publishedTime, author, keywords,
}: SEOProps): Metadata {
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const ogImage = image || DEFAULT_IMAGE;
  const fullTitle = title.includes('StudyFlow') ? title : `${title} | StudyFlow`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    authors: author ? [{ name: author }] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@studyflowapp',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
