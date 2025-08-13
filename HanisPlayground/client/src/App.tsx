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
import IntelSphere from './pages/intelsphere';
import NeuralNetwork from './pages/neural-network';
import SmartAIAssistant from './pages/smart-ai-assistant';
import EnhancedAIAssistant from './pages/enhanced-ai-assistant';
import SalesIntelligence from './pages/sales-intelligence';
import SocialMediaIntelligence from './pages/social-media-intelligence-dashboard';
import BusinessHub from './pages/business-hub';
import CommandCenter from './pages/command-center';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <NavigationRenderer />
      
      <main className="flex-1 overflow-auto">
        <Switch>
          {/* Main Landing Page */}
          <Route path="/" component={IntelSphere} />
          
          {/* Core Intelligence Modules */}
          <Route path="/chat" component={AIChatPage} />
          <Route path="/business" component={BusinessIntelligencePage} />
          <Route path="/research" component={MarketResearchPage} />
          <Route path="/osint" component={OSINTPage} />
          <Route path="/finance" component={FinancialPage} />
          <Route path="/threats" component={ThreatIntelligencePage} />
          <Route path="/social" component={SocialIntelligencePage} />
          
          {/* AI & Neural Components */}
          <Route path="/neural-network" component={NeuralNetwork} />
          <Route path="/smart-ai" component={SmartAIAssistant} />
          <Route path="/enhanced-ai" component={EnhancedAIAssistant} />
          
          {/* Business Intelligence */}
          <Route path="/sales-intelligence" component={SalesIntelligence} />
          <Route path="/social-media-intel" component={SocialMediaIntelligence} />
          <Route path="/business-hub" component={BusinessHub} />
          
          {/* Command & Control */}
          <Route path="/command-center" component={CommandCenter} />
          <Route path="/status" component={SystemStatusPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/apex" component={ApexIntelligenceDashboard} />
          <Route path="/console" component={AIControlDeck} />
          <Route path="/ai-deck" component={AIControlDeck} />
          
          {/* Authentication */}
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          
          {/* Fallback for unknown routes */}
          <Route>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">Page Not Found</h2>
                <p className="text-gray-400">The requested page could not be found.</p>
                <p className="text-gray-400 mt-2">Return to <a href="/" className="text-blue-400 hover:text-blue-300">IntelSphere Home</a></p>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}