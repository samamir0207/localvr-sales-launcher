# LocalVR Sales Hub - Project Deep Dive

*A categorized app launcher for the sales team, modeled after the Revenue Management Hub.*

---

## What This Project Does

**Sales Hub** is the sales team's launchpad — a single page organized into 4 categories with 9 app tiles, each linking to a different internal tool.

No backend. No database. No authentication. Just a React page with organized links.

---

## The Architecture (Minimal By Design)

```
┌────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                        │
│  4 category columns × 9 app tiles with icons + descriptions   │
└────────────────────────────────────────────────────────────────┘
                                │
                                ↓ Clicks open in new tabs
┌────────────────────────────────────────────────────────────────┐
│                    EXTERNAL APPS                                │
│  Railway | Vercel | Replit                                     │
└────────────────────────────────────────────────────────────────┘
```

---

## The 9 Apps (by Category)

### PROSPECTING
| App | What It Does | Hosted On |
|-----|--------------|-----------|
| **Luxe Attack** | Dossier-based CRM for luxury property acquisition | Railway |
| **Occupancy Scraper** | Airbnb/VRBO calendar data + Salesforce lead matching | Railway |

### INTELLIGENCE
| App | What It Does | Hosted On |
|-----|--------------|-----------|
| **Local Rank** | Property ranking visibility across booking platforms | Replit |
| **Property Map** | Interactive map with revenue/occupancy metrics | Replit |

### PERFORMANCE
| App | What It Does | Hosted On |
|-----|--------------|-----------|
| **Sales Performance** | Quota attainment dashboard by AE and market | Vercel |
| **Sales Commission** | Commission tracking and payout calculations | Vercel |

### ENABLEMENT
| App | What It Does | Hosted On |
|-----|--------------|-----------|
| **Sales AI Coach** | AI-powered coaching for calls, objections, and pitches | Railway |
| **Gift Ideas** | Personalized gift recommendations for homeowners | Replit |
| **Phone Health** | Spam flag monitoring with Slack alerts | Railway |

---

## App URLs

| App | URL |
|-----|-----|
| Luxe Attack | https://luxe-attack-app-production.up.railway.app/ |
| Occupancy Scraper | https://localvr-occupancy-scraper-production.up.railway.app |
| Local Rank | https://localvrrankapp.replit.app/admin |
| Property Map | https://lvrpropertymap.replit.app |
| Sales Performance | https://localvr-pipeline.vercel.app/ |
| Sales Commission | https://lvr-sales-commission-app.vercel.app/dashboard |
| Sales AI Coach | https://ai-sales-coach-production.up.railway.app/ |
| Gift Ideas | https://localvr-gift-idea-app.replit.app |
| Phone Health | https://vivacious-cooperation-production.up.railway.app |

---

## Layout Design

The hub uses a **4-column category grid** matching the Revenue Management Hub pattern:

```
PROSPECTING    INTELLIGENCE    PERFORMANCE    ENABLEMENT
┌──────────┐  ┌──────────┐   ┌──────────┐  ┌──────────┐
│Luxe Attack│  │Local Rank│   │Sales Perf│  │AI Coach  │
└──────────┘  └──────────┘   └──────────┘  └──────────┘
┌──────────┐  ┌──────────┐   ┌──────────┐  ┌──────────┐
│Occ Scraper│  │Property  │   │Sales     │  │Gift Ideas│
└──────────┘  │Map       │   │Commission│  └──────────┘
              └──────────┘   └──────────┘  ┌──────────┐
                                           │Phone     │
                                           │Health    │
                                           └──────────┘
```

Responsive: 4 cols (desktop) → 2 cols (tablet) → 1 col (mobile)

---

## Brand Styling

- **Background:** Cream `#FAF9F7` (never pure white)
- **Cards:** White with `#E5E0DA` borders
- **Icons:** Tan `#B8A08A` on light cream `#FAF3EC` boxes
- **Category labels:** Uppercase, spaced, `#B8A08A` tan-dark
- **Title:** Libre Baskerville serif ("SALES HUB")
- **Body text:** Inter sans-serif
- **Hover:** Card border shifts to `#D4BDA2` primary tan + shadow

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | Component library |
| Vite | 6.0.5 | Build tool & dev server |
| TypeScript | 5.6.2 | Type safety |
| Tailwind CSS | 3.4.17 | Styling |
| Lucide React | 0.469.0 | Icons |

---

## File Structure

```
src/
├── App.tsx          # The whole app (~175 lines)
├── main.tsx         # React entry (10 lines)
├── index.css        # Tailwind directives
└── vite-env.d.ts    # Vite types

public/
├── favicon.png
└── localvr-icon.png
```

---

## Running Locally

```bash
npm run dev   # Vite dev server on localhost:5173
npm run build # Build to dist/
npm start     # Serve dist/ for production
```

---

## Deployment

### Vercel (Primary)
- **URL:** https://localvr-sales-tech-stack.vercel.app
- Auto-detects Vite build, CDN distributed

### Railway (Backup)
- Uses `npx serve dist -s -l $PORT`

---

## Adding a New App

1. Import the icon: `import { NewIcon } from 'lucide-react'`
2. Add to the appropriate category in the `categories` array:

```typescript
{
  name: 'New App Name',
  description: 'What it does in one line.',
  url: 'https://production-url.com',
  icon: NewIcon,
}
```

3. Deploy: `npx vercel --prod`
