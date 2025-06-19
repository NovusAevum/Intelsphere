/**
 * Dynamic Page Renderer - Simplified config-driven navigation
 * Eliminates hardcoded page routing and enables maintainable architecture
 */

import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import AIChatPage from './AIChatPage';
import BusinessIntelligencePage from './BusinessIntelligencePage';
import MarketResearchPage from './MarketResearchPage';
import OSINTPage from './OSINTPage';
import FinancialPage from './FinancialPage';
import ThreatIntelligencePage from './ThreatIntelligencePage';
import SocialIntelligencePage from './SocialIntelligencePage';
import SystemStatusPage from './SystemStatusPage';
import SettingsPage from './SettingsPage';

interface PageConfig {
  id: string;
  name: string;
  route: string;
  component: string;
  active: boolean;
}

// Component registry for dynamic loading
const componentRegistry: Record<string, React.ComponentType> = {
  'AIChatPage': AIChatPage,
  'BusinessIntelligencePage': BusinessIntelligencePage,
  'MarketResearchPage': MarketResearchPage,
  'OSINTPage': OSINTPage,
  'FinancialPage': FinancialPage,
  'ThreatIntelligencePage': ThreatIntelligencePage,
  'SocialIntelligencePage': SocialIntelligencePage,
  'SystemStatusPage': SystemStatusPage,
  'SettingsPage': SettingsPage
};

interface DynamicPageRendererProps {
  pageName: string;
}

export default function DynamicPageRenderer({ pageName }: DynamicPageRendererProps) {
  const [navigationConfig, setNavigationConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load navigation configuration from server
    fetch('/api/navigation-config')
      .then(res => res.json())
      .then(config => {
        setNavigationConfig(config);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load navigation config:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading page configuration...</p>
        </div>
      </div>
    );
  }

  // Find component in registry
  const Component = componentRegistry[pageName];
  
  if (!Component) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600">Component "{pageName}" not available</p>
      </div>
    );
  }

  return <Component />;
}