/**
 * Main App Component - Uses config-based navigation and separated components
 */

import { Route, Switch } from 'wouter';
import { NavigationRenderer } from './components/NavigationRenderer';
import AIChatPage from './pages/AIChatPage';
import BusinessIntelligencePage from './pages/BusinessIntelligencePage';
import MarketResearchPage from './pages/MarketResearchPage';
import OSINTPage from './pages/OSINTPage';
import FinancialPage from './pages/FinancialPage';
import ThreatIntelligencePage from './pages/ThreatIntelligencePage';
import SocialIntelligencePage from './pages/SocialIntelligencePage';
import SystemStatusPage from './pages/SystemStatusPage';
import SettingsPage from './pages/SettingsPage';
import ApexIntelligenceDashboard from './components/apex-intelligence-dashboard';
import AIControlDeck from './components/ai-control-deck';

function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          IntelSphere
        </h1>
        <p className="text-xl text-gray-300 mb-8">Advanced Intelligence Platform</p>
        <p className="text-gray-400">Select a module from the navigation to begin</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <NavigationRenderer />
      
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/chat" component={AIChatPage} />
          <Route path="/business" component={BusinessIntelligencePage} />
          <Route path="/research" component={MarketResearchPage} />
          <Route path="/osint" component={OSINTPage} />
          <Route path="/finance" component={FinancialPage} />
          <Route path="/threats" component={ThreatIntelligencePage} />
          <Route path="/social" component={SocialIntelligencePage} />
          <Route path="/status" component={SystemStatusPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/apex" component={ApexIntelligenceDashboard} />
          <Route path="/console" component={AIControlDeck} />
          <Route path="/ai-deck" component={AIControlDeck} />
          
          {/* Fallback for unknown routes */}
          <Route>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">Page Not Found</h2>
                <p className="text-gray-400">The requested page could not be found.</p>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}