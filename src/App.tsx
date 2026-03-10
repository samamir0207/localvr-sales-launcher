import { useState, useEffect } from 'react'
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
  ChartLine,
  Chrome,
  Pencil,
  Check,
  X,
  Settings,
} from 'lucide-react'

interface AppTile {
  name: string
  description: string
  useCase: string
  url: string
  icon: React.ElementType
  comingSoon?: boolean
  noLink?: boolean // e.g. Chrome extension — released but no URL
}

interface Category {
  label: string
  apps: AppTile[]
}

const defaultCategories: Category[] = [
  {
    label: 'PROSPECTING',
    apps: [
      {
        name: 'Luxe Attack',
        description: 'Dossier-based CRM for luxury property acquisition. Research, grade, and prioritize leads.',
        useCase: 'Target specific high-value homeowners with a personalized gifting and outreach process.',
        url: 'https://luxe-attack-app-production.up.railway.app/',
        icon: Target,
      },
      {
        name: 'Occupancy & Rate Scraper',
        description: 'Scrape Airbnb/VRBO listing occupancy data and match with Salesforce leads.',
        useCase: 'See if a listing or competitor is pricing and setting availability thoughtfully. Check if rates and occupancy are fluctuating to assess how competent a host is at revenue management.',
        url: 'https://localvr-occupancy-scraper-production.up.railway.app',
        icon: Search,
      },
      {
        name: 'Lead Gen',
        description: 'Automated lead generation and outreach pipeline for new property owners.',
        useCase: 'Find homeowners and generate new leads for the sales pipeline.',
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
        useCase: 'Your dashboard for the day — see your events, tasks, what to work on, and what to focus on.',
        url: '#',
        icon: LayoutDashboard,
        comingSoon: true,
      },
      {
        name: 'Cadence Engine',
        description: 'AI-ranked outreach system. Automates call and email cadences by prospect stage.',
        useCase: 'See your queues customized per lead and track outreach with a smarter, prioritized queue system.',
        url: '#',
        icon: ListChecks,
        comingSoon: true,
      },
      {
        name: 'Prospect Dashboard',
        description: 'Unified prospect record. Streamlined lead sourcing and database management.',
        useCase: 'Source leads from the lead database in a more streamlined and efficient way.',
        url: '#',
        icon: Database,
        comingSoon: true,
      },
      {
        name: 'Meetings',
        description: 'SDR-to-AE handoff module. Meeting scoring, outcome tracking, and inbound routing.',
        useCase: 'Hand off meetings to VAEs with scoring, outcome tracking, and inbound lead routing.',
        url: '#',
        icon: CalendarCheck,
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
        useCase: 'See where a listing is ranking, then provide that report to the homeowner to encourage a dialog and offer value.',
        url: 'https://localvrrankapp.replit.app/admin',
        icon: Trophy,
      },
      {
        name: 'Property Map',
        description: 'Interactive map of all managed properties with revenue and occupancy metrics.',
        useCase: 'See where all properties are, their resources, how much money they\'ve made, and key performance data.',
        url: 'https://interactive-map-production.up.railway.app',
        icon: Map,
      },
      {
        name: 'Projections App',
        description: 'Generate revenue projections for prospect properties using market comps and seasonal data.',
        useCase: 'Draw full end-to-end revenue projections and generate landing pages for prospects.',
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
        useCase: 'View your quota dashboard, key metrics, and individual performance against the company\'s sales goals.',
        url: 'https://localvr-pipeline.vercel.app/',
        icon: TrendingUp,
      },
      {
        name: 'Sales Commission',
        description: 'Commission tracking and payout calculations for the sales team.',
        useCase: 'Log in to see your commissions and potential future earnings.',
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
        useCase: 'Log in and get better at whatever you\'re not good at — objection handling, pitch delivery, market knowledge, and more.',
        url: 'https://ai-sales-coach-production.up.railway.app/',
        icon: Bot,
      },
      {
        name: 'Phone Health',
        description: 'Monitor sales phone numbers for spam flags. Alerts AEs via Slack when flagged.',
        useCase: 'Check for spam alerts on your phone number and get notified if you\'re flagged.',
        url: 'https://vivacious-cooperation-production.up.railway.app',
        icon: Phone,
      },
      {
        name: 'Listing Scout',
        description: 'Chrome extension that enriches Airbnb/VRBO competitor listings with owner data in Salesforce.',
        useCase: 'See Airbnb and VRBO competitor listing information directly in Salesforce. Auto-installed on your Chrome browser.',
        url: '',
        icon: Chrome,
        noLink: true,
      },
    ],
  },
]

// LocalStorage key for URL overrides
const URL_OVERRIDES_KEY = 'saleshub_url_overrides'

function getUrlOverrides(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(URL_OVERRIDES_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveUrlOverrides(overrides: Record<string, string>) {
  localStorage.setItem(URL_OVERRIDES_KEY, JSON.stringify(overrides))
}

function applyOverrides(categories: Category[]): Category[] {
  const overrides = getUrlOverrides()
  return categories.map(cat => ({
    ...cat,
    apps: cat.apps.map(app => ({
      ...app,
      url: overrides[app.name] ?? app.url,
    })),
  }))
}

function AppCard({
  app,
  isAdmin,
  onUrlChange,
}: {
  app: AppTile
  isAdmin: boolean
  onUrlChange?: (name: string, url: string) => void
}) {
  const Icon = app.icon
  const isComingSoon = app.comingSoon === true
  const isNoLink = app.noLink === true
  const [editing, setEditing] = useState(false)
  const [editUrl, setEditUrl] = useState(app.url)

  const handleSave = () => {
    onUrlChange?.(app.name, editUrl)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditUrl(app.url)
    setEditing(false)
  }

  const card = (
    <div
      className={`group bg-white rounded-md border border-border p-5 min-h-[176px] transition-all duration-200 flex flex-col ${
        isComingSoon
          ? 'opacity-[0.7] hover:opacity-[0.85] hover:shadow-md hover:border-primary cursor-default'
          : isNoLink
            ? 'cursor-default hover:shadow-md hover:border-primary'
            : 'hover:shadow-lg hover:border-primary cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-lg bg-[#FAF3EC] flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-dark" />
        </div>
        <div className="flex items-center gap-1.5">
          {isAdmin && !isNoLink && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setEditing(true)
              }}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              title="Edit URL"
            >
              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
          {!isComingSoon && !isNoLink && (
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>

      <h3 className="font-semibold text-foreground text-base mb-1.5">
        {app.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {app.description}
      </p>

      {/* Use Case */}
      <div className="mt-auto pt-3">
        <p className="text-xs text-primary-dark/80 leading-relaxed italic">
          <span className="font-semibold not-italic text-primary-dark">Use: </span>
          {app.useCase}
        </p>
      </div>

      {isComingSoon && (
        <span className="inline-block mt-2.5 text-[11px] font-medium text-primary-dark bg-[#FAF3EC] px-2 py-0.5 rounded-full self-start">
          Coming Soon
        </span>
      )}

      {isNoLink && (
        <span className="inline-block mt-2.5 text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full self-start">
          Auto-installed
        </span>
      )}

      {/* Admin URL editor */}
      {editing && (
        <div
          className="mt-3 pt-3 border-t border-border"
          onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
        >
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
            URL
          </label>
          <input
            type="text"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            className="w-full px-2 py-1.5 text-xs border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSave() }}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-primary-dark text-white rounded hover:opacity-90 transition-opacity"
            >
              <Check className="w-3 h-3" /> Save
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCancel() }}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-muted-foreground bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )

  if (isComingSoon || isNoLink) return card

  return (
    <a href={app.url} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  )
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [categories, setCategories] = useState<Category[]>(() => applyOverrides(defaultCategories))
  const maxCards = Math.max(...categories.map((c) => c.apps.length))

  // Keyboard shortcut: Ctrl+Shift+A to toggle admin mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setIsAdmin(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleUrlChange = (name: string, url: string) => {
    const overrides = getUrlOverrides()
    overrides[name] = url
    saveUrlOverrides(overrides)
    setCategories(applyOverrides(defaultCategories))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border py-8">
        <div className="max-w-[1400px] mx-auto px-6 text-center relative">
          <img
            src="/localvr-icon.png"
            alt="LocalVR"
            className="w-10 h-10 mx-auto mb-3"
          />
          <h1 className="font-serif text-2xl text-foreground tracking-wide">
            SALES HUB
          </h1>

          {/* Admin toggle button */}
          <button
            onClick={() => setIsAdmin(prev => !prev)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
              isAdmin
                ? 'bg-primary-dark text-white shadow-md'
                : 'text-muted-foreground/30 hover:text-muted-foreground/60'
            }`}
            title={isAdmin ? 'Exit admin mode' : 'Enter admin mode (edit URLs)'}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin banner */}
      {isAdmin && (
        <div className="bg-primary-dark/10 border-b border-primary-dark/20 py-2 px-6">
          <p className="text-xs text-primary-dark text-center font-medium">
            Admin Mode — Click the <Pencil className="w-3 h-3 inline mx-0.5 -mt-0.5" /> icon on any card to edit its URL
          </p>
        </div>
      )}

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
                  <AppCard key={app.name} app={app} isAdmin={isAdmin} onUrlChange={handleUrlChange} />
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
                  <AppCard app={category.apps[rowIdx]} isAdmin={isAdmin} onUrlChange={handleUrlChange} />
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
