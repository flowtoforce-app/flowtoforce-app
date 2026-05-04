# FlowToForce MVP - Deployment Guide

## Phase 5 Status: ✅ COMPLETE
All features implemented and tested:
- ✅ Progress tracking with stats (total, time, week, streak)
- ✅ Weekly schedule calendar with completion toggle
- ✅ Workout timer (start, pause, finish)
- ✅ Completion celebration screen
- ✅ Community messaging with profiles
- ✅ Seance scheduling with date picker modal
- ✅ Favorites system
- ✅ Authentication (Email + Google OAuth)

## Pre-Deployment Checklist

### 1. Local Environment Setup
```bash
cd ~/Desktop/FlowToForce\ \(1\)
```

Update `.env.local` with your actual Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

*Get these from: Supabase Dashboard → Settings → API*

### 2. Update next.config.js
Replace `YOUR_SUPABASE_URL` with your actual Supabase project URL:
```javascript
domains: ['your-project.supabase.co']
```

### 3. Test Build Locally
```bash
npm run build
npm run start
```
Test in browser at `http://localhost:3000` to verify:
- Landing page loads
- Login flow works
- Can navigate through all pages
- Timer starts/stops
- Scheduling modal appears
- Messages load and send

### 4. Git Setup
```bash
git add .
git commit -m "Phase 5 complete: Full MVP with progression, schedule, timer, and community"
git push origin main
```

### 5. Vercel Deployment

**Option A: CLI (Fastest)**
```bash
npm install -g vercel
vercel
```
Follow prompts to connect GitHub repo

**Option B: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click "Deploy"

### 6. Set Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key

These must be set before the project will work in production.

### 7. Configure Google OAuth (Optional for MVP)

If you want Google login to work in production:

1. **Google Cloud Console**
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URIs:
     - `https://your-vercel-domain/auth/callback`
     - `http://localhost:3000/auth/callback` (for local dev)

2. **Supabase Settings**
   - Go to Auth → Providers → Google
   - Add your Google Client ID
   - Set redirect URL to your deployed domain

### 8. Database Setup Verification

Ensure these tables exist in Supabase:
- `profiles` (user profiles with username)
- `seances` (workout sessions)
- `exercises` (exercise details)
- `seance_completion` (completion tracking)
- `schedule` (user schedule)
- `favorites` (favorite exercises)
- `messages` (community messages)
- `versions` (V1/V2 program versions)
- `chapters` (program chapters)

All should have proper RLS policies for user privacy.

## Post-Deployment

### 1. Test Production
- Navigate to your Vercel domain
- Test complete user flow:
  - Sign up
  - Browse programs
  - Start a seance
  - Complete and check progress
  - Schedule a seance
  - Message community

### 2. Monitor
- Check Vercel deployments dashboard for errors
- Review Supabase usage (database, auth, API calls)
- Check for any console errors in browser dev tools

### 3. Share with Early Users
- Share deployed URL with beta testers
- Gather feedback on UX/features
- Monitor for bugs

## Quick Reference: Current Architecture

**Frontend:** Next.js 14 (React 18) + TypeScript
**Backend:** Supabase PostgreSQL + Auth
**Styling:** Tailwind CSS + Custom Pantone colors
**Deployment:** Vercel
**Database:** Supabase managed PostgreSQL

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase API URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

## Troubleshooting

**"401 Unauthorized" errors:**
- Check env variables are set in Vercel
- Verify Supabase API keys are correct
- Check RLS policies aren't blocking queries

**Timer not working:**
- Ensure browser supports `setInterval`
- Check browser console for JavaScript errors

**Scheduling modal doesn't appear:**
- Verify user is authenticated
- Check browser console for errors
- Ensure schedule table exists in Supabase

**Messages not loading:**
- Verify profiles table has username column
- Check that profile relationship query is correct
- Ensure user has auth session

## Phase 5+ Features (For Later)

Once deployed and gathering feedback:
- Load recommendations (suggest next workouts based on history)
- Advanced stats (charts, progress graphs)
- Photo uploads for exercises
- Voice/audio guidance
- Social features (friend requests, shared workouts)
- Premium features (advanced analytics, custom plans)

---

**Deployment Timeline:**
- Local testing: ~10 minutes
- Git push: ~2 minutes  
- Vercel setup: ~5 minutes
- Environment variables: ~2 minutes
- First deploy: ~3-5 minutes
- **Total: ~20-25 minutes**

**Est. Launch Time: Today** ✨
