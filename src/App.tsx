import {
  Target,
  TrendingUp,
  Map,
  Gift,
  Trophy,
  ExternalLink,
  Phone,
  Search,
  Bot,
  DollarSign,
} from 'lucide-react'

interface AppTile {
  name: string
  description: string
  url: string
  icon: React.ElementType
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
        name: 'Gift Ideas',
        description: 'Generate personalized gift recommendations for homeowners and partners.',
        url: 'https://localvr-gift-idea-app.replit.app',
        icon: Gift,
      },
      {
        name: 'Phone Health',
        description: 'Monitor sales phone numbers for spam flags. Alerts AEs via Slack when flagged.',
        url: 'https://vivacious-cooperation-production.up.railway.app',
        icon: Phone,
      },
    ],
  },
]

function AppCard({ app }: { app: AppTile }) {
  const Icon = app.icon

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-md border border-border p-5 hover:shadow-lg hover:border-primary transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-lg bg-[#FAF3EC] flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-dark" />
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="font-semibold text-foreground text-base mb-1.5">
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
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
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8">
          {categories.map((category) => (
            <div key={category.label}>
              {/* Category Header */}
              <h2 className="text-xs font-semibold uppercase tracking-[1.5px] text-primary-dark mb-4">
                {category.label}
              </h2>

              {/* App Cards */}
              <div className="flex flex-col gap-4">
                {category.apps.map((app) => (
                  <AppCard key={app.name} app={app} />
                ))}
              </div>
            </div>
          ))}
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
