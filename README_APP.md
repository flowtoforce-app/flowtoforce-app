# FlowToForce - App

Personal training program app built with Next.js 14, Tailwind CSS, and TypeScript.

## Project Structure

```
flowtoforce-app/
├── app/                    # Next.js app directory (pages and layouts)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── dashboard/         # Dashboard page
│   ├── programs/          # Programs listing
│   ├── profile/           # User profile
│   └── seance/[id]/       # Individual workout session
├── components/            # Reusable React components
├── lib/                   # Utility functions
├── public/                # Static assets (images, etc.)
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── next.config.js         # Next.js configuration
```

## Pages

- **Home** (`/`) - Landing page with program overview
- **Dashboard** (`/dashboard`) - Chapter selection and progress tracking
- **Programs** (`/programs`) - V1 and V2 program information
- **Profile** (`/profile`) - User information and stats
- **Seance** (`/seance/[id]`) - Individual workout session details

## Features (Current MVP)

- ✅ Responsive design (mobile-first)
- ✅ Dark theme with FlowToForce branding (dark blue #000055)
- ✅ Chapter-based navigation
- ✅ Exercise display with sets/reps/rest times
- ✅ Progress tracking UI
- ✅ Navigation between pages

## Features (Planned)

- 🔲 User authentication (Supabase)
- 🔲 Database integration (Supabase)
- 🔲 Real workout data from Notion API
- 🔲 Exercise history tracking
- 🔲 Progress charts
- 🔲 Community features
- 🔲 Nutritional guidance

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Backend (Soon)**: Supabase

## Getting Started (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file for local development:

```
NEXT_PUBLIC_API_URL=your_api_url
```

## Deployment

The app is automatically deployed to Vercel when changes are pushed to the main branch.

View at: `https://flowtoforce-app.vercel.app`

## Creator

Created by Claude (AI) for Lisa - CQP IF specializing in musculation training programs.

---

**V1 Program**: 8 chapters, 24 séances ✨
