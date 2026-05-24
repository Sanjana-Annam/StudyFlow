# 📚 StudyFlow — AdSense-Ready Educational Productivity Platform

A complete, production-ready Next.js SaaS application for students — fully optimised for Google AdSense approval with 15 SEO articles, legal pages, sitemap, and rich educational content.

---

## ✅ AdSense Approval Checklist

| Requirement | Status |
|---|---|
| 1200+ words of original content per page | ✅ Done |
| 15 full SEO blog articles (1000–1500 words each) | ✅ Done |
| No placeholder / lorem ipsum text | ✅ Done |
| Privacy Policy page | ✅ Done |
| Terms & Conditions page | ✅ Done |
| About Us page | ✅ Done |
| Contact page with form | ✅ Done |
| sitemap.xml | ✅ Auto-generated |
| robots.txt | ✅ Done |
| Mobile responsive design | ✅ Done |
| Fast loading (Next.js optimised) | ✅ Done |
| No broken links | ✅ Done |
| Clean navigation | ✅ Done |
| Social media links | ✅ Done |

---

## 🗂️ Complete File Structure

```
studyflow/
├── app/
│   ├── layout.tsx                    # Root layout + AuthProvider
│   ├── globals.css                   # Global styles + dark mode
│   ├── page.tsx                      # Homepage (1500+ words)
│   ├── sitemap.ts                    # Auto-generated XML sitemap
│   ├── robots.ts                     # robots.txt
│   ├── auth/page.tsx                 # Login / Signup / Reset
│   ├── dashboard/page.tsx            # App dashboard
│   ├── planner/page.tsx              # Study planner
│   ├── analytics/page.tsx            # Charts and analytics
│   ├── settings/page.tsx             # User settings
│   ├── blog/page.tsx                 # Blog index with search + filter
│   ├── blog/[slug]/page.tsx          # Dynamic blog post pages
│   ├── about/page.tsx                # About us (800+ words)
│   ├── contact/page.tsx              # Contact form
│   ├── privacy-policy/page.tsx       # Full privacy policy
│   └── terms-and-conditions/page.tsx # Full terms
│
├── components/
│   ├── layout/
│   │   ├── PublicNav.tsx             # Site navigation with dark mode
│   │   ├── Footer.tsx                # Footer with newsletter
│   │   └── AppShell.tsx              # Auth-gated app layout
│   ├── blog/
│   │   ├── BlogGrid.tsx              # Filterable blog card grid
│   │   ├── ReadingProgress.tsx       # Reading progress bar
│   │   ├── ShareButtons.tsx          # Social share buttons
│   │   └── RelatedPosts.tsx          # Related articles section
│   ├── dashboard/
│   │   ├── StatCard.tsx              # Metric stat card
│   │   ├── TodayTasks.tsx            # Today's task list
│   │   ├── GamificationCard.tsx      # Points/streak/level card
│   │   └── DistractionLogger.tsx     # Log distractions
│   ├── planner/
│   │   ├── PlannerForm.tsx           # Create study plan form
│   │   └── PlanCard.tsx              # Study plan card
│   ├── timer/
│   │   └── PomodoroTimer.tsx         # Circular Pomodoro timer
│   ├── analytics/
│   │   └── AnalyticsCharts.tsx       # Recharts bar/line charts
│   ├── ContactForm.tsx               # Contact form + FAQ
│   └── LegalLayout.tsx               # Reusable legal page layout
│
├── lib/
│   ├── firebase.ts                   # Firebase init
│   ├── db.ts                         # Firestore CRUD helpers
│   ├── types.ts                      # TypeScript interfaces
│   ├── blog-data.ts                  # 15 full SEO blog articles
│   └── seo.ts                        # SEO metadata builder
│
├── hooks/
│   ├── useAuth.tsx                   # Firebase auth context
│   └── usePomodoro.ts                # Pomodoro timer hook
│
├── utils/
│   ├── cn.ts                         # Tailwind class merger
│   ├── helpers.ts                    # Shared utility functions
│   └── planGenerator.ts              # Study schedule algorithm
│
├── .env.local.example                # Environment variable template
├── .gitignore
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project → Add Web App → copy config values

**Enable Authentication:**
- Authentication → Sign-in method → Enable **Email/Password** and **Google**

**Enable Firestore:**
- Firestore Database → Create database → Start in **test mode**

**Security Rules** (paste in Firestore → Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}        { allow read, write: if request.auth.uid == uid; }
    match /studyPlans/{id}    { allow read, write, create: if request.auth != null && (request.auth.uid == resource.data.uid || request.auth != null); }
    match /sessions/{id}      { allow read, write, create: if request.auth != null; }
    match /distractions/{id}  { allow read, write, create: if request.auth != null; }
  }
}
```

**Required Composite Indexes** (Firestore → Indexes → Composite):

| Collection | Field 1 | Field 2 | Order |
|---|---|---|---|
| `sessions` | `uid` ASC | `date` ASC | — |
| `distractions` | `uid` ASC | `date` ASC | — |
| `studyPlans` | `uid` ASC | `createdAt` DESC | — |

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your Firebase project credentials in `.env.local`.

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy to Vercel (Free)

### Option A: Vercel Dashboard

1. Push code to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. Add all 6 `NEXT_PUBLIC_FIREBASE_*` environment variables
4. Click **Deploy**

### Option B: CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### After Deploying

Add your Vercel URL to Firebase Auth authorized domains:
- Firebase Console → Authentication → Settings → Authorized domains → Add `your-app.vercel.app`

---

## 💡 Adding Google AdSense

After your site is approved:

1. Get your Publisher ID from [AdSense](https://adsense.google.com)
2. Add to `app/layout.tsx` inside `<head>`:

```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

3. Add ad units on blog post pages for maximum revenue (below article content, between sections)

**Best ad placements for StudyFlow:**
- Blog post pages — after the article intro (300×250)
- Blog post pages — after the conclusion (728×90 leaderboard)
- Blog index page — between card rows (responsive)
- Homepage — after the features section

---

## 📈 SEO Blog Articles Included

1. Best Study Techniques for Students
2. The Pomodoro Technique: Complete Guide
3. How to Stop Procrastinating
4. Time Management for College Students
5. 15 Productivity Habits of Successful Students
6. How to Focus While Studying
7. Daily Routine of Top Students
8. How to Prepare for Exams
9. How to Create the Perfect Study Planner
10. Best Productivity Apps for Students 2025
11. Deep Work for Students
12. How to Stay Motivated to Study
13. Digital Minimalism for Students
14. Best Revision Techniques
15. How to Manage Distractions While Studying

All articles are 1000–1500 words, human-written style, with proper H2/H3 headings, internal links, and conclusions.

---

## 🔮 Future Improvements

| Feature | Description |
|---|---|
| 🤖 AI Study Planner | Use Claude/OpenAI to generate adaptive schedules |
| 📅 Google Calendar Sync | Export study sessions to Google Calendar |
| 🔔 Push Notifications | Reminders to start study sessions |
| 👥 Study Groups | Real-time collaborative study rooms |
| 📝 Flashcard System | Built-in spaced repetition flashcards |
| 📱 PWA / Offline | Service worker for offline Pomodoro |
| 🎵 Focus Music | Ambient sound player (lo-fi, white noise) |
| 🌍 Multilingual | Hindi, Tamil, Telugu support |

---

## 🐛 Troubleshooting

**"Missing or insufficient permissions"** → Check Firestore security rules and ensure user is authenticated.

**"Missing Firestore indexes"** → Create the 3 composite indexes listed above.

**Google sign-in popup blocked** → Allow popups for localhost in browser settings.

**Vercel build error** → Ensure all 6 env vars are set in Vercel project → Settings → Environment Variables.

**AdSense "Low value content"** → Ensure blog articles are indexed by Google (submit sitemap at search.google.com/search-console), wait 2–4 weeks for indexing before reapplying.

---

## 📄 License

MIT — free to use, modify, and deploy.
