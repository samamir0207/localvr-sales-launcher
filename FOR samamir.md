# LocalVR Sales Tech Stack - Project Deep Dive

*A beautifully simple app launcher that proves less is more.*

---

## What This Project Actually Does

**Sales Tech Stack** is your sales team's homepage. It's a single page with 8 tiles, each linking to a different internal tool.

That's it. No backend. No database. No authentication. Just a React page with links.

And it's perfect.

---

## The Architecture (Minimal By Design)

```
┌────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                        │
│  8 app tiles with icons, descriptions, and external links      │
└────────────────────────────────────────────────────────────────┘
                                │
                                ↓ Clicks open in new tabs
┌────────────────────────────────────────────────────────────────┐
│                    EXTERNAL APPS                                │
│  Replit | Vercel | Railway | Custom domains                    │
└────────────────────────────────────────────────────────────────┘
```

No Express server. No database. No state management. No routing library.

---

## The 8 Apps

| App | What It Does | Where It's Hosted |
|-----|--------------|-------------------|
| **Luxe Attack** | Dossier-based CRM for property acquisition | Replit |
| **Local Rank** | Property ranking visibility across booking platforms | Custom domain |
| **Sales Performance** | Quota attainment dashboard | Vercel |
| **Property Map** | Interactive map with revenue/occupancy | Replit |
| **Gift Ideas** | Personalized gift recommendations | Replit |
| **Occupancy Scraper** | Airbnb calendar data + Salesforce matching | Railway |
| **Phone Health** | Spam flag monitoring with Slack alerts | Railway |
| **Sales Forecast** | Pipeline forecasting model | Vercel |

---

## The Code (157 Lines Total)

The entire app is in `App.tsx`:

```typescript
interface AppTile {
  name: string
  description: string
  url: string
  icon: React.ElementType
  color: string
}

const apps: AppTile[] = [
  {
    name: 'Luxe Attack',
    description: 'Dossier-based CRM for property acquisition',
    url: 'https://luxe-attack.replit.app',
    icon: Target,
    color: 'text-rose-500'
  },
  // ... 7 more apps
];

function AppCard({ app }: { app: AppTile }) {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 bg-white rounded-lg border hover:shadow-md hover:border-primary transition-all"
    >
      <div className={`p-3 rounded-lg bg-gray-50 w-fit ${app.color}`}>
        <app.icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-semibold">{app.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{app.description}</p>
      <ExternalLink className="mt-3 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white border-b p-4">
        <img src="/localvr-icon.png" alt="LocalVR" className="h-8" />
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map(app => <AppCard key={app.name} app={app} />)}
        </div>
      </main>
    </div>
  );
}
```

---

## Why This Design Works

### 1. Zero State Management

No Redux. No Context. No useState. The app is pure UI.

When you click a tile, it opens a new tab. Done.

### 2. Type-Safe Configuration

Adding a new app is literally adding an object to an array:

```typescript
{
  name: 'New App',
  description: 'What it does',
  url: 'https://new-app.com',
  icon: SomeIcon,
  color: 'text-blue-500'
}
```

TypeScript ensures you don't forget a field.

### 3. Icons as Components

Lucide React icons are just React components. No SVG files to manage:

```typescript
import { Target, Map, Trophy, Phone } from 'lucide-react';

// Use like any component
<Target className="h-6 w-6" />
```

### 4. External Links Done Right

```html
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"  <!-- Security: prevents tabnabbing -->
>
```

The `rel="noopener noreferrer"` prevents the new tab from accessing `window.opener`.

---

## The Git History (5 Commits)

1. **Initial**: Created with 5 apps (Luxe Attack, Local Rank, Sales Performance, Property Map, Gift Ideas)
2. **Railway config**: Added deployment configuration
3. **Expanded to 8 apps**: Added Occupancy Scraper, Phone Health, Sales Forecast
4. **Branding**: Added logo and favicon
5. **Bug fix**: Updated Sales Performance URL

This shows a clean evolution: MVP → Deployment → Expansion → Polish → Maintenance.

---

## Deployment (Dual Platform)

### Vercel (Primary)
```bash
# Auto-deploys from GitHub
# Static site detection
# CDN distribution
```

### Railway (Backup)
```json
// railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "NIXPACKS" },
  "deploy": { "startCommand": "npm start" }
}
```

The `npm start` command runs:
```bash
npx serve dist --single --listen $PORT
```

This serves the static build with SPA fallback.

---

## Tailwind Configuration

Custom brand colors from LocalVR Design System v2:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#d4bda2',        // Tan
        background: '#faf9f7',      // Warm off-white
        foreground: '#374151',
        'muted-foreground': '#6b7280',
        border: '#e5e7eb',
      }
    }
  }
}
```

---

## What's NOT Here (And Why)

| Feature | Why Not Needed |
|---------|---------------|
| Routing | All links are external |
| State management | No component state |
| API layer | No backend needed |
| Database | Links are hardcoded |
| Authentication | Apps handle their own auth |
| Search | Only 8 apps |
| Categories | Would over-engineer it |

This is **intentional simplicity**. Every feature you don't build is a feature you don't maintain.

---

## Quick Reference

### File Structure
```
src/
├── App.tsx          # The whole app (157 lines)
├── main.tsx         # React entry (10 lines)
├── index.css        # Tailwind directives (15 lines)
└── vite-env.d.ts    # Vite types

public/
├── favicon.png
└── localvr-icon.png
```

### Running Locally
```bash
npm run dev   # Vite dev server on localhost:5173
npm run build # Build to dist/
npm start     # Serve dist/ for production
```

### Adding a New App

1. Import the icon: `import { NewIcon } from 'lucide-react'`
2. Add to the array:
```typescript
{
  name: 'New App Name',
  description: 'What it does in one line',
  url: 'https://production-url.com',
  icon: NewIcon,
  color: 'text-purple-500'
}
```
3. Deploy. Done.

---

## What You Learned From This Project

1. **Less is more** - 157 lines solves the problem completely
2. **External links are a feature** - Each app handles its own auth/state
3. **Type-safe config beats hardcoded JSX** - Adding apps is trivial
4. **Icons as components** - No SVG asset management
5. **Security on external links** - Always use `rel="noopener noreferrer"`
6. **Static hosting is free** - No server costs for a launcher
7. **Dual deployment is cheap insurance** - Vercel + Railway as backup
8. **Evolution shows maturity** - MVP → Expand → Polish → Maintain
