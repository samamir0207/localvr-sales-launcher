import {
  Target,
  TrendingUp,
  Map,
  Gift,
  Trophy,
  ExternalLink,
  Phone,
  LineChart,
  Search
} from 'lucide-react'

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
    description: 'Dossier-based CRM for luxury property acquisition. Research, grade, and prioritize leads.',
    url: 'https://luxe-attack-app.replit.app',
    icon: Target,
    color: 'bg-rose-500',
  },
  {
    name: 'Local Rank',
    description: 'Track property ranking positions and visibility across booking platforms.',
    url: 'https://ranking.golocalvr.com',
    icon: Trophy,
    color: 'bg-amber-500',
  },
  {
    name: 'Sales Performance',
    description: 'Quota attainment dashboard. Track YTD performance by AE and market.',
    url: 'https://quota-dashboard--sam1560.replit.app',
    icon: TrendingUp,
    color: 'bg-emerald-500',
  },
  {
    name: 'Property Map',
    description: 'Interactive map of all managed properties with revenue and occupancy metrics.',
    url: 'https://lvrpropertymap.replit.app',
    icon: Map,
    color: 'bg-blue-500',
  },
  {
    name: 'Gift Ideas',
    description: 'Generate personalized gift recommendations for homeowners and partners.',
    url: 'https://localvr-gift-idea-app.replit.app',
    icon: Gift,
    color: 'bg-violet-500',
  },
  {
    name: 'Occupancy Scraper',
    description: 'Scrape Airbnb/VRBO listing occupancy data and match with Salesforce leads.',
    url: 'https://localvr-occupancy-scraper-production.up.railway.app',
    icon: Search,
    color: 'bg-cyan-500',
  },
  {
    name: 'Phone Health',
    description: 'Monitor sales phone numbers for spam flags. Alerts AEs via Slack when flagged.',
    url: 'https://vivacious-cooperation-production.up.railway.app',
    icon: Phone,
    color: 'bg-orange-500',
  },
  {
    name: 'Sales Forecast',
    description: 'Pipeline forecasting model. Predict revenue based on current pipeline stages.',
    url: 'https://localvr-pipeline.vercel.app',
    icon: LineChart,
    color: 'bg-indigo-500',
  },
]

function AppCard({ app }: { app: AppTile }) {
  const Icon = app.icon

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary-foreground">
        {app.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {app.description}
      </p>
    </a>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <img
            src="/localvr-icon.png"
            alt="LocalVR"
            className="w-9 h-9"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-wide">
              LocalVR Sales Tools
            </h1>
            <p className="text-xs text-muted-foreground">Internal App Collection</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
            Quick Launch
          </h2>
          <p className="text-foreground">
            Select a tool to open in a new tab.
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            More tools coming soon. Contact Sam to add new apps.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
