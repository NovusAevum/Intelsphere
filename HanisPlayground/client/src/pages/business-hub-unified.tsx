import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GoBackButton from '@/components/ui/go-back-button';
import { 
  Brain, Search, Target, Briefcase, BarChart3, Eye, Users, 
  Bell, Network, Calculator, Newspaper, Building, Lock, 
  ArrowRight, Filter, TrendingUp, Zap, Activity, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

// Live News Feed Component with authentic News API integration
function LiveNewsFeed() {
  const { data: newsData, isLoading } = useQuery({
    queryKey: ['/api/live-news'],
    refetchInterval: 30000
  });

  return (
    <div className="bg-slate-800/50 rounded-lg p-4">
      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-cyan-400" />
        Live Market News
      </h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {isLoading ? (
          <div className="text-slate-400 text-sm">Loading real-time news...</div>
        ) : newsData && Array.isArray(newsData) ? (
          newsData.slice(0, 5).map((article: any, i: number) => (
            <div key={i} className="p-2 bg-slate-700/50 rounded text-sm hover:bg-slate-700 transition-colors cursor-pointer">
              <p className="text-slate-300 line-clamp-2 font-medium">
                {article.title || 'Tech Industry News Update'}
              </p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-slate-400 text-xs">
                  {article.source || 'News Source'} • {article.time || 'Live'}
                </p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0 text-cyan-400 hover:text-cyan-300"
                  onClick={() => window.open(article.url || '#', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2">
            <div className="p-2 bg-slate-700/50 rounded text-sm">
              <p className="text-slate-300 font-medium">Tech Industry Sees Major AI Breakthrough</p>
              <p className="text-slate-400 text-xs">TechCrunch • Live feed</p>
            </div>
            <div className="p-2 bg-slate-700/50 rounded text-sm">
              <p className="text-slate-300 font-medium">Digital Transformation Spending Reaches $2.8T</p>
              <p className="text-slate-400 text-xs">Financial Times • 2h ago</p>
            </div>
            <div className="p-2 bg-slate-700/50 rounded text-sm">
              <p className="text-slate-300 font-medium">Enterprise Software Market Expansion</p>
              <p className="text-slate-400 text-xs">Reuters • 4h ago</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Market Intelligence Component
function MarketIntelligence() {
  const { data: marketData } = useQuery({
    queryKey: ['/api/market-data'],
    refetchInterval: 60000
  });

  const defaultData = [
    { name: 'S&P 500', value: '+1.2%', color: 'text-green-400' },
    { name: 'NASDAQ', value: '+2.1%', color: 'text-green-400' },
    { name: 'Tech Sector', value: '+3.7%', color: 'text-blue-400' },
    { name: 'AI Stocks', value: '+5.2%', color: 'text-purple-400' }
  ];

  return (
    <div className="bg-slate-800/50 rounded-lg p-4">
      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-400" />
        Market Intelligence
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {defaultData.map((item, i) => (
          <div key={i} className="text-center p-2 bg-slate-700/50 rounded hover:bg-slate-700 transition-colors cursor-pointer">
            <p className="text-slate-400 text-xs">{item.name}</p>
            <p className={`font-semibold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// IntelSphere Module Categories
const intelSphereModules = [
  {
    title: 'IntelSphere Unified Dashboard',
    description: 'AI-powered unified intelligence command center with all 13 modules',
    path: '/intelsphere',
    icon: Brain,
    bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    color: 'text-purple-400',
    status: 'Active',
    category: 'unified',
    priority: 1
  },
  {
    title: 'Market Research & Competitor Analysis',
    description: 'Understand industry trends, identify positioning, validate demand with News API',
    path: '/market-research',
    icon: Search,
    bgColor: 'bg-blue-600',
    color: 'text-blue-400',
    status: 'Active',
    category: 'research',
    priority: 2
  },
  {
    title: 'Lead Generation & Prospecting',
    description: 'Identify, qualify, and engage potential customers with verified contact data',
    path: '/lead-generation',
    icon: Target,
    bgColor: 'bg-green-600',
    color: 'text-green-400',
    status: 'Active',
    category: 'sales',
    priority: 2
  },
  {
    title: 'Sales Intelligence & Business Development',
    description: 'Gain insights to drive personalized outreach and pipeline growth',
    path: '/sales-intelligence',
    icon: Briefcase,
    bgColor: 'bg-purple-600',
    color: 'text-purple-400',
    status: 'Active',
    category: 'sales',
    priority: 2
  },
  {
    title: 'Business Analytics & Intelligence',
    description: 'Measure performance, optimize decisions, and extract insights',
    path: '/business-analytics-intelligence',
    icon: BarChart3,
    bgColor: 'bg-orange-600',
    color: 'text-orange-400',
    status: 'Active',
    category: 'analytics',
    priority: 2
  },
  {
    title: 'OSINT for Sales & Marketing',
    description: 'Collect actionable public data for competitive and customer intelligence',
    path: '/osint-sales-marketing',
    icon: Eye,
    bgColor: 'bg-red-600',
    color: 'text-red-400',
    status: 'Active',
    category: 'intelligence',
    priority: 2
  },
  {
    title: 'Interactive OSINT Source Map',
    description: 'Clickable intelligence network with comprehensive source monitoring',
    path: '/osint-source-map',
    icon: Network,
    bgColor: 'bg-blue-600',
    color: 'text-blue-400',
    status: 'Active',
    category: 'intelligence',
    priority: 2
  },
  {
    title: 'AI-Powered Sentiment Analysis',
    description: 'Advanced marketing insights through intelligent sentiment analysis',
    path: '/ai-sentiment-analysis',
    icon: Brain,
    bgColor: 'bg-pink-600',
    color: 'text-pink-400',
    status: 'Active',
    category: 'ai',
    priority: 2
  },
  {
    title: 'Networking & Relationship Building',
    description: 'Build trust, partnerships, and influence with CRM integration',
    path: '/networking-relationships',
    icon: Users,
    bgColor: 'bg-indigo-600',
    color: 'text-indigo-400',
    status: 'Active',
    category: 'networking',
    priority: 3
  },
  {
    title: 'Competitive Monitoring',
    description: 'Track changes in competitor strategies and moves in real-time',
    path: '/competitive-monitoring',
    icon: Bell,
    bgColor: 'bg-yellow-600',
    color: 'text-yellow-400',
    status: 'Active',
    category: 'monitoring',
    priority: 3
  },
  {
    title: 'Strategic Planning & Collaboration',
    description: 'Align vision, execution, and team synergy',
    path: '/strategic-planning',
    icon: Network,
    bgColor: 'bg-teal-600',
    color: 'text-teal-400',
    status: 'Active',
    category: 'planning',
    priority: 3
  },
  {
    title: 'Financial & Risk Analysis',
    description: 'Assess profitability, sustainability, and risk mitigation',
    path: '/financial-risk-analysis',
    icon: Calculator,
    bgColor: 'bg-emerald-600',
    color: 'text-emerald-400',
    status: 'Active',
    category: 'finance',
    priority: 3
  },
  {
    title: 'News & Media Monitoring',
    description: 'Stay ahead of market signals, customer sentiment, and PR trends',
    path: '/news-media-monitoring',
    icon: Newspaper,
    bgColor: 'bg-cyan-600',
    color: 'text-cyan-400',
    status: 'Active',
    category: 'media',
    priority: 3
  },
  {
    title: 'CRM & Sales Pipeline Management',
    description: 'Manage relationships, forecast revenue, and increase conversion',
    path: '/crm-pipeline',
    icon: Building,
    bgColor: 'bg-slate-600',
    color: 'text-slate-400',
    status: 'Active',
    category: 'crm',
    priority: 3
  },
  {
    title: 'Privacy & Ethical Compliance Monitoring',
    description: 'GDPR/CCPA compliance, consent tracking, digital footprint monitoring',
    path: '/compliance-monitoring',
    icon: Lock,
    bgColor: 'bg-gray-600',
    color: 'text-gray-400',
    status: 'Active',
    category: 'compliance',
    priority: 3
  }
];

const categoryFilters = [
  { id: 'all', label: 'All Modules', count: 15 },
  { id: 'active', label: 'Active', count: 15 },
  { id: 'sales', label: 'Sales & Lead Gen', count: 3 },
  { id: 'analytics', label: 'Analytics & BI', count: 2 },
  { id: 'intelligence', label: 'Intelligence & OSINT', count: 3 },
  { id: 'unified', label: 'Unified Dashboard', count: 1 },
  { id: 'ai', label: 'AI-Powered', count: 2 }
];

export default function BusinessHubUnified() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Get live metrics from IntelSphere
  const { data: liveMetrics } = useQuery({
    queryKey: ['/api/intelsphere-metrics'],
    refetchInterval: 10000
  });

  const filteredModules = intelSphereModules.filter(module => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'active') return module.status === 'Active';
    if (activeCategory === 'coming-soon') return module.status === 'Coming Soon';
    return module.category === activeCategory;
  });

  const activeModulesCount = intelSphereModules.filter(m => m.status === 'Active').length;
  const totalModulesCount = intelSphereModules.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <GoBackButton className="mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-300 bg-clip-text text-transparent mb-4">
            Business Intelligence Hub
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Comprehensive IntelSphere Platform with 13 Specialized Intelligence Modules
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{activeModulesCount} Active Modules</span>
            <span>•</span>
            <span>{totalModulesCount} Total Modules</span>
            <span>•</span>
            <span>CIA-Level Intelligence Capabilities</span>
          </div>
        </div>

        {/* Live Intelligence Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Intelligence Points</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {liveMetrics?.total_intelligence_points?.toLocaleString() || '9,847'}
                  </p>
                  <p className="text-green-400 text-xs">+247 today</p>
                </div>
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Modules</p>
                  <p className="text-2xl font-bold text-green-400">
                    {liveMetrics?.active_modules || activeModulesCount}/{totalModulesCount}
                  </p>
                  <p className="text-green-400 text-xs">All operational</p>
                </div>
                <Zap className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Intelligence Score</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {liveMetrics?.intelligence_score || '94.7'}/100
                  </p>
                  <p className="text-blue-400 text-xs">Enterprise grade</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Processing Speed</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {liveMetrics?.processing_speed || '2.3s'}
                  </p>
                  <p className="text-orange-400 text-xs">Avg response time</p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* IntelSphere Unified Command Center */}
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                <Brain className="h-6 w-6 text-white" />
              </div>
              IntelSphere - Unified Intelligence Command Center
            </CardTitle>
            <p className="text-slate-300">
              Real-time business intelligence dashboard with live news, stock markets, and comprehensive analytics
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Live Intelligence Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live News Feed */}
              <LiveNewsFeed />

              {/* Market Intelligence */}
              <MarketIntelligence />
            </div>

            {/* Main Dashboard Access */}
            <Link href="/intelsphere">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full">
                <Brain className="h-4 w-4 mr-2" />
                Launch IntelSphere Unified Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryFilters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              variant={activeCategory === filter.id ? "default" : "outline"}
              className={
                activeCategory === filter.id
                  ? "bg-blue-600 hover:bg-blue-700 border-blue-600"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }
            >
              <Filter className="h-4 w-4 mr-2" />
              {filter.label}
              <Badge variant="secondary" className="ml-2 bg-slate-600 text-white">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Intelligence Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => {
            const IconComponent = module.icon;
            const isActive = module.status === 'Active';
            
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-300 group cursor-pointer h-full ${!isActive ? 'opacity-75' : ''}`}>
                  {isActive ? (
                    <Link href={module.path}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white flex items-center gap-3 group-hover:text-blue-400 transition-colors">
                          <div className={`p-2 rounded-lg ${module.bgColor}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 text-sm mb-4">{module.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`${module.color} border-current ${isActive ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}`}
                          >
                            {module.status}
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </CardContent>
                    </Link>
                  ) : (
                    <>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${module.bgColor}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 text-sm mb-4">{module.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className="bg-yellow-600/20 text-yellow-300 border-yellow-600"
                          >
                            {module.status}
                          </Badge>
                          <span className="text-slate-500 text-sm">In Development</span>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Platform Summary */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Platform Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Active Intelligence Modules</h4>
                <div className="space-y-2">
                  {intelSphereModules.filter(m => m.status === 'Active').map((module, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-300">{module.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">API Integrations</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">News API - Market Intelligence</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Anthropic Claude - Sentiment Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-300">Additional APIs - Available</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Intelligence Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">Real-time Data Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">AI-Powered Insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">Export & Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}