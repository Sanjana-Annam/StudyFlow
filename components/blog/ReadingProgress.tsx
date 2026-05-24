'use client';
// components/blog/ReadingProgress.tsx
import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setWidth(Math.min(100, Math.round(pct)));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      id="reading-progress"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}
