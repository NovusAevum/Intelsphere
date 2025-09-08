import { Suspense, lazy, useMemo } from 'react';
import { useLocation } from 'wouter';

// Preload all page modules under src/pages at build time (Vite feature)
const pageModules = import.meta.glob('/src/pages/*.tsx');

const pathAliases: Record<string, string> = {
  // handle known non-kebab cases
  'webscry-reconnaissance': 'WebSCRYReconnaissance.tsx',
  'ai-chat': 'AIChatPage.tsx',
  'business-intelligence': 'BusinessIntelligencePage.tsx',
  'market-research': 'MarketResearchPage.tsx',
  'financial': 'FinancialPage.tsx',
  'gideon-command-center': 'GIDEONCommandCenter.tsx',
  'gideon-framework': 'GIDEONAutonomousFramework.tsx',
  'gideon-nexus-intel': 'GIDEONNexusIntel.tsx',
  'nato-osint-automation': 'NATOOSINTAutomation.tsx',
  'luxcore-red-team': 'LUXCORERedTeamAutonomous.tsx',
  'defense-industry-ai': 'DefenseIndustryAIIntegration.tsx',
  'blackice-exploitation': 'BLACKICEPhaseExploitation.tsx',
  'osint-industries': 'OSINTIndustriesDashboard.tsx',
  'unified-adversarial-intelligence': 'UnifiedAdversarialIntelligence.tsx',
  'state-sponsored-adversarial': 'StateSponsoredAdversarialIntelligence.tsx'
};

function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-400">The requested page could not be found.</p>
      </div>
    </div>
  );
}

export default function DynamicFileRoute() {
  const [location] = useLocation();

  const LazyComponent = useMemo(() => {
    // Normalize path and map to a file name in /src/pages
    const path = location.split('?')[0].split('#')[0];
    const trimmed = path.replace(/^\/+|\/+$/g, '');
    if (!trimmed) return null;

    // Try alias first
    const aliasFile = pathAliases[trimmed];
    if (aliasFile) {
      const aliasEntry = Object.entries(pageModules).find(([key]) => key.endsWith(`/pages/${aliasFile}`));
      if (aliasEntry) {
        const importer = aliasEntry[1] as () => Promise<{ default: React.ComponentType<any> }>;
        return lazy(importer);
      }
    }

    const fileName = `${trimmed}.tsx`; // e.g. "/market-intelligence" => "market-intelligence.tsx"

    // Find matching module by file name
    const entry = Object.entries(pageModules).find(([key]) => key.endsWith(`/pages/${fileName}`));

    if (!entry) return null;

    const importer = entry[1] as () => Promise<{ default: React.ComponentType<any> }>;
    return lazy(importer);
  }, [location]);

  if (!LazyComponent) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    }>
      <LazyComponent />
    </Suspense>
  );
}