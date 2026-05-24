// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  metadataBase: new URL('https://studyflowapp.com'),
  title: { default: 'StudyFlow — Smart Study Timer & Productivity App for Students', template: '%s | StudyFlow' },
  description: 'StudyFlow helps students study smarter with Pomodoro timers, smart planners, distraction tracking and analytics. Free for all students.',
  keywords: 'study timer, pomodoro, study planner, student productivity, focus timer, exam prep',
  authors: [{ name: 'StudyFlow Team' }],
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'en_US', url: 'https://studyflowapp.com', siteName: 'StudyFlow' },
  twitter: { card: 'summary_large_image', creator: '@studyflowapp' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
