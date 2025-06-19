import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Users, 
  Globe, 
  Zap,
  Menu,
  X,
  ChevronDown,
  Home,
  Settings,
  Database,
  Network,
  Crown,
  Target,
  Eye,
  Activity,
  MessageSquare,
  FileText,
  DollarSign,
  Lock,
  Bell,
  Calculator,
  Newspaper,
  Building,
  Radar
} from 'lucide-react';

interface NavigationItem {
  title: string;
  path: string;
  icon: React.ElementType;
  category: string;
  description?: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  // IntelSphere Main Dashboard - Supreme Intelligence Center
  { title: 'IntelSphere Dashboard', path: '/', icon: Brain, category: 'core', description: 'Supreme Intelligence Analytics - GOD LEVEL Platform', badge: 'MAIN' },
  { title: 'Command Center', path: '/dashboard', icon: Home, category: 'core', description: 'Primary control interface and operations hub' },
  
  // Core Intelligence Modules
  { title: 'Deep Research', path: '/reconnaissance', icon: Radar, category: 'core', description: 'Advanced OSINT intelligence gathering' },
  { title: 'AI Command Center', path: '/ai-center', icon: Brain, category: 'core', description: 'Multi-modal AI assistants and tools' },
  { title: 'GIDEON Command Center', path: '/gideon-command-center', icon: Crown, category: 'core', description: 'Advanced adversarial intelligence framework' },
  
  // GIDEON Framework - Advanced Adversarial Intelligence
  { title: 'GIDEON Autonomous Framework', path: '/gideon-framework', icon: Shield, category: 'gideon', description: 'Autonomous adversarial intelligence system', badge: 'APEX' },
  { title: 'GIDEON Nexus Intel', path: '/gideon-nexus-intel', icon: Network, category: 'gideon', description: 'Intelligence network orchestration' },
  { title: 'NATO OSINT Automation', path: '/nato-osint-automation', icon: Globe, category: 'gideon', description: 'Professional grade OSINT automation' },
  { title: 'GreyCell Infiltration', path: '/greycell-infiltration', icon: Eye, category: 'gideon', description: 'Advanced reconnaissance protocols' },
  { title: 'LUXCORE Red Team', path: '/luxcore-red-team', icon: Target, category: 'gideon', description: 'Autonomous red team operations' },
  { title: 'Defense Industry AI', path: '/defense-industry-ai', icon: Lock, category: 'gideon', description: 'Defense-grade AI integration' },
  { title: 'BLACKICE Exploitation', path: '/blackice-exploitation', icon: Zap, category: 'gideon', description: 'Advanced exploitation protocols' },
  { title: 'WebSCRY Reconnaissance', path: '/webscry-reconnaissance', icon: Search, category: 'gideon', description: 'Web-based intelligence gathering' },
  
  // Business Intelligence
  { title: 'Business Hub', path: '/business-hub', icon: TrendingUp, category: 'business', description: 'Live marketing analytics and insights' },
  { title: 'Market Intelligence', path: '/market-intelligence', icon: BarChart3, category: 'business', description: 'Market analysis and competitive research' },
  { title: 'Sales Intelligence', path: '/sales-intelligence', icon: DollarSign, category: 'business', description: 'Sales optimization and lead generation' },
  { title: 'Lead Generation', path: '/lead-generation', icon: Target, category: 'business', description: 'Automated prospect identification' },
  { title: 'CRM Pipeline', path: '/crm-pipeline', icon: Building, category: 'business', description: 'Relationship and pipeline management' },
  
  // Advanced Analytics
  { title: 'Social Intelligence', path: '/social-intelligence', icon: Users, category: 'analytics', description: 'Social media monitoring and analysis' },
  { title: 'Sentiment Analysis', path: '/ai-sentiment-analysis', icon: Activity, category: 'analytics', description: 'AI-powered sentiment processing' },
  { title: 'Competitive Monitoring', path: '/competitive-monitoring', icon: Eye, category: 'analytics', description: 'Real-time competitor tracking' },
  { title: 'Financial Analysis', path: '/financial-risk-analysis', icon: Calculator, category: 'analytics', description: 'Risk assessment and financial modeling' },
  
  // Specialized Tools
  { title: 'OSINT Source Map', path: '/osint-source-map', icon: Globe, category: 'tools', description: 'Interactive intelligence source mapping' },
  { title: 'Network Intelligence', path: '/intelligence-network-map', icon: Network, category: 'tools', description: 'Visual network relationship analysis' },
  { title: 'News Monitoring', path: '/news-media-monitoring', icon: Newspaper, category: 'tools', description: 'Real-time news and media tracking' },
  { title: 'Compliance Monitor', path: '/compliance-monitoring', icon: Lock, category: 'tools', description: 'Privacy and regulatory compliance' },
  
  // AI Assistants
  { title: 'Enhanced AI Assistant', path: '/enhanced-ai-assistant', icon: MessageSquare, category: 'ai', description: 'Advanced conversational AI' },
  { title: 'Human-like AI', path: '/human-ai-assistant', icon: Brain, category: 'ai', description: 'Natural language AI companion' },
  { title: 'AI Playground', path: '/ai-playground', icon: Zap, category: 'ai', description: 'Experimental AI features' },
  { title: 'Advanced Multimodal AI', path: '/advanced-multimodal-ai', icon: Brain, category: 'ai', description: 'Text, image, and voice AI processing' },
  { title: 'Sassy AI Personalities', path: '/sassy-ai-personalities', icon: MessageSquare, category: 'ai', description: 'Multi-personality AI assistants' },
  { title: 'Rebellious AI Chat', path: '/rebellious-ai-chat', icon: Zap, category: 'ai', description: 'Unconventional AI interactions' },
  
  // Advanced Intelligence Operations
  { title: 'State-Sponsored Intelligence', path: '/state-sponsored-adversarial', icon: Shield, category: 'advanced', description: 'Advanced adversarial intelligence operations' },
  { title: 'Unified Adversarial Intel', path: '/unified-adversarial-intelligence', icon: Network, category: 'advanced', description: 'Comprehensive adversarial intelligence' },
  { title: 'Advanced Unified Intelligence', path: '/advanced-unified-intelligence', icon: Globe, category: 'advanced', description: 'Next-generation unified intelligence' },
  { title: 'Streamlined Intelligence', path: '/streamlined-intelligence', icon: Activity, category: 'advanced', description: 'Optimized intelligence workflows' },
  { title: 'OSINT Industries', path: '/osint-industries', icon: Building, category: 'advanced', description: 'Industry-specific OSINT capabilities' },
  { title: 'Hierarchical Command', path: '/hierarchical-command-center', icon: Crown, category: 'advanced', description: 'Multi-tier command structure' },
  { title: 'Chief State Commander', path: '/chief-state-commander', icon: Shield, category: 'advanced', description: 'Executive command interface' },
  { title: 'OPS Protocol X', path: '/ops-protocol-x', icon: Target, category: 'advanced', description: 'Advanced operational protocols' },
  
  // Enterprise
  { title: 'Enterprise Intelligence', path: '/enterprise-intelligence', icon: Shield, category: 'enterprise', description: 'Enterprise-grade intelligence platform' },
  { title: 'Strategic Planning', path: '/strategic-planning', icon: Target, category: 'enterprise', description: 'Strategic analysis and planning tools' },
  { title: 'Export Center', path: '/export-center', icon: FileText, category: 'enterprise', description: 'Data export and reporting' }
];

const categories = {
  gideon: { name: 'GIDEON Framework', color: 'red' },
  core: { name: 'Core Intelligence', color: 'blue' },
  business: { name: 'Business Intelligence', color: 'green' },
  analytics: { name: 'Advanced Analytics', color: 'purple' },
  tools: { name: 'Specialized Tools', color: 'orange' },
  ai: { name: 'AI Assistants', color: 'pink' },
  advanced: { name: 'Advanced Operations', color: 'amber' },
  enterprise: { name: 'Enterprise', color: 'gray' }
};

export default function EnhancedGlobalNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getCategoryItems = (category: string) => {
    return navigationItems.filter(item => item.category === category);
  };

  const isActiveRoute = (path: string) => {
    return location === path || (path !== '/' && location.startsWith(path));
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-slate-700 z-40 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <Link to="/" className="block group">
            <div className="flex items-center space-x-3 hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:from-blue-500 group-hover:to-purple-500 transition-colors">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">IntelSphere</h1>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">GOD LEVEL Dashboard</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Categories */}
        <div className="p-4 space-y-2">
          {Object.entries(categories).map(([key, category]) => {
            const items = getCategoryItems(key);
            const isExpanded = expandedCategory === key;
            const hasActiveItem = items.some(item => isActiveRoute(item.path));

            return (
              <div key={key} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    hasActiveItem || isExpanded 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-${category.color}-500`}></div>
                    <span className="font-medium text-sm">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {items.length}
                    </Badge>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Category Items */}
                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {items.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <button
                          onClick={() => setIsOpen(false)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                            isActiveRoute(item.path)
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{item.title}</div>
                            {item.description && (
                              <div className="text-xs opacity-75 truncate">{item.description}</div>
                            )}
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 mt-auto">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>IntelSphere v2.0</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}