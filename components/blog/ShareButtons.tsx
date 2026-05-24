'use client';
// components/blog/ShareButtons.tsx
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface Props { title: string; slug: string; }

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `https://studyflowapp.com/blog/${slug}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 mt-8">
      <span className="text-sm text-slate-500">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-500 transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter size={15} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <button
        onClick={copy}
        className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all"
        aria-label="Copy link"
      >
        {copied ? <Check size={15} className="text-teal-500" /> : <Link2 size={15} />}
      </button>
      {copied && <span className="text-xs text-teal-600">Copied!</span>}
    </div>
  );
}
