import {
  Target,
  TrendingUp,
  Map,
  Magnet,
  Trophy,
  ExternalLink,
  Phone,
  Search,
  Bot,
  DollarSign,
  LayoutDashboard,
  ListChecks,
  Database,
  CalendarCheck,
  Router,
  ChartLine,
  Chrome,
} from 'lucide-react'

interface AppTile {
  name: string
  description: string
  url: string
  icon: React.ElementType
  comingSoon?: boolean
}

interface Category {
  label: string
  apps: AppTile[]
}

const categories: Category[] = [
  {
    label: 'PROSPECTING',
    apps: [
      {
        name: 'Luxe Attack',
        description: 'Dossier-based CRM for luxury property acquisition. Research, grade, and prioritize leads.',
        url: 'https://luxe-attack-app-production.up.railway.app/',
        icon: Target,
      },
      {
        name: 'Occupancy Scraper',
        description: 'Scrape Airbnb/VRBO listing occupancy data and match with Salesforce leads.',
        url: 'https://localvr-occupancy-scraper-production.up.railway.app',
        icon: Search,
      },
      {
        name: 'Lead Gen',
        description: 'Automated lead generation and outreach pipeline for new property owners.',
        url: 'https://localvr-lead-gen-production.up.railway.app/',
        icon: Magnet,
      },
    ],
  },
  {
    label: 'CRM & WORKFLOW',
    apps: [
      {
        name: 'Sales Home',
        description: 'Rep daily cockpit. Ranked task list, AI morning briefing, and active deal management.',
        url: '#',
        icon: LayoutDashboard,
        comingSoon: true,
      },
      {
        name: 'Cadence Engine',
        description: '10-queue AI-ranked outreach system. Automates call and email cadences by prospect stage.',
        url: '#',
        icon: ListChecks,
        comingSoon: true,
      },
      {
        name: 'Prospect DB',
        description: 'Unified prospect record replacing Salesforce. Single record from first contact to signed.',
        url: '#',
        icon: Database,
        comingSoon: true,
      },
      {
        name: 'Meetings',
        description: 'SDR-to-AE handoff module. AI-generated handoff briefs, meeting scoring, and outcome tracking.',
        url: '#',
        icon: CalendarCheck,
        comingSoon: true,
      },
      {
        name: 'Inbound Router',
        description: 'Routes inbound web leads to SDRs by market. Claude classification, Slack alerts, response-time tracking.',
        url: '#',
        icon: Router,
        comingSoon: true,
      },
    ],
  },
  {
    label: 'INTELLIGENCE',
    apps: [
      {
        name: 'Local Rank',
        description: 'Track property ranking positions and visibility across booking platforms.',
        url: 'https://localvrrankapp.replit.app/admin',
        icon: Trophy,
      },
      {
        name: 'Property Map',
        description: 'Interactive map of all managed properties with revenue and occupancy metrics.',
        url: 'https://lvrpropertymap.replit.app',
        icon: Map,
      },
      {
        name: 'Projections App',
        description: 'Generate revenue projections for prospect properties using market comps and seasonal data.',
        url: '#',
        icon: ChartLine,
        comingSoon: true,
      },
    ],
  },
  {
    label: 'PERFORMANCE',
    apps: [
      {
        name: 'Sales Performance',
        description: 'Quota attainment dashboard. Track YTD performance by AE and market.',
        url: 'https://localvr-pipeline.vercel.app/',
        icon: TrendingUp,
      },
      {
        name: 'Sales Commission',
        description: 'Commission tracking and payout calculations for the sales team.',
        url: 'https://lvr-sales-commission-app.vercel.app/dashboard',
        icon: DollarSign,
      },
    ],
  },
  {
    label: 'ENABLEMENT',
    apps: [
      {
        name: 'Sales AI Coach',
        description: 'AI-powered coaching for sales calls, objection handling, and pitch refinement.',
        url: 'https://ai-sales-coach-production.up.railway.app/',
        icon: Bot,
      },
      {
        name: 'Phone Health',
        description: 'Monitor sales phone numbers for spam flags. Alerts AEs via Slack when flagged.',
        url: 'https://vivacious-cooperation-production.up.railway.app',
        icon: Phone,
      },
      {
        name: 'Listing Scout',
        description: 'Chrome extension for the lead gen team. Enriches Airbnb/VRBO listings with owner data on the fly.',
        url: '#',
        icon: Chrome,
        comingSoon: true,
      },
    ],
  },
]

function AppCard({ app }: { app: AppTile }) {
  const Icon = app.icon
  const isComingSoon = app.comingSoon === true

  const card = (
    <div
      className={`group bg-white rounded-md border border-border p-5 min-h-[176px] transition-all duration-200 ${
        isComingSoon
          ? 'opacity-[0.7] hover:opacity-[0.85] hover:shadow-md hover:border-primary cursor-default'
          : 'hover:shadow-lg hover:border-primary cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-lg bg-[#FAF3EC] flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-dark" />
        </div>
        {!isComingSoon && (
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <h3 className="font-semibold text-foreground text-base mb-1.5">
        {app.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {app.description}
      </p>

      {isComingSoon && (
        <span className="inline-block mt-2.5 text-[11px] font-medium text-primary-dark bg-[#FAF3EC] px-2 py-0.5 rounded-full">
          Coming Soon
        </span>
      )}
    </div>
  )

  if (isComingSoon) return card

  return (
    <a href={app.url} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  )
}

function App() {
  const maxCards = Math.max(...categories.map((c) => c.apps.length))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border py-8">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <img
            src="/localvr-icon.png"
            alt="LocalVR"
            className="w-10 h-10 mx-auto mb-3"
          />
          <h1 className="font-serif text-2xl text-foreground tracking-wide">
            SALES HUB
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-10 flex-1 w-full">

        {/* Mobile / Tablet: column-based stacking */}
        <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
          {categories.map((category) => (
            <div key={category.label}>
              <h2 className="text-xs font-semibold uppercase tracking-[1.5px] text-primary-dark mb-4">
                {category.label}
              </h2>
              <div className="flex flex-col gap-4">
                {category.apps.map((app) => (
                  <AppCard key={app.name} app={app} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: row-aligned grid — cards align across all 5 columns */}
        <div className="hidden xl:grid grid-cols-5 gap-x-5 gap-y-4">
          {/* Category headers */}
          {categories.map((category) => (
            <h2
              key={category.label}
              className="text-xs font-semibold uppercase tracking-[1.5px] text-primary-dark mb-0"
            >
              {category.label}
            </h2>
          ))}

          {/* Card rows */}
          {Array.from({ length: maxCards }).map((_, rowIdx) =>
            categories.map((category) => (
              <div key={`${category.label}-${rowIdx}`}>
                {category.apps[rowIdx] ? (
                  <AppCard app={category.apps[rowIdx]} />
                ) : null}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-sm text-muted-foreground">
          LocalVR Sales
        </p>
      </footer>
    </div>
  )
}

export default App
