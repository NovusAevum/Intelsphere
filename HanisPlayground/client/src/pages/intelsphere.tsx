import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, TrendingUp, Users, Search, BarChart3, Target, 
  Shield, Globe, Zap, ArrowLeft, Loader2, 
  Activity, Clock, CheckCircle, AlertCircle, AlertTriangle,
  Sparkles, Star, Eye, MessageSquare, Download,
  Play, Pause, RefreshCw, Filter, Grid, List, Database,
  Bot, ExternalLink
} from 'lucide-react';
import PersonalizedWelcome from '@/components/personalized-welcome';
import EnhancedAIInterface from '@/components/enhanced-ai-interface';
import RevolutionaryAIInterface from '@/components/revolutionary-ai-interface';
import AIModelStatusDashboard from '@/components/ai-model-status-dashboard';
// Removed 3D background for cleaner interface
import { 
  LiveClock, 
  LiveMarketData, 
  LiveNews, 
  SystemPerformance, 
  DynamicQuotes, 
  LiveCalendar,
  GlobalIntelligenceMatrix
} from '@/components/live-widgets';
import {
  EnhancedMarketData,
  EnhancedNewsIntelligence,
  SystemPerformanceMonitor,
  DataQualityIndicator,
  EnhancedLiveClock
} from '@/components/enhanced-live-widgets';
import {
  EnhancedMarketTrendsWidget,
  EnhancedWeatherWidget,
  EnhancedGoogleTrendsWidget as MalaysianGoogleTrendsWidget,
  EnhancedLiveNewsWidget,
  EnhancedSocialMediaWidget
} from '@/components/enhanced-malaysian-widgets';
import VideoInterface from '@/components/video-interface';
import GoogleTrendsWidget from '@/components/google-trends-widget';

interface IntelModule {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  purpose: string;
  status: 'active' | 'processing' | 'ready';
  progress: number;
  insights: number;
  category: 'business' | 'security';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export default function IntelSphere() {
  const [unifiedQuery, setUnifiedQuery] = useState('');
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<'all' | 'business' | 'security'>('all');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalAnalyses: 1247,
    activeUsers: 89,
    systemLoad: 34,
    uptime: '99.9%'
  });
  
  // AI Assistant state
  const [chatMessages, setChatMessages] = useState<Array<{
    type: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Business Intelligence Modules
  const businessIntelligenceModules: IntelModule[] = [
    {
      id: 'market-research',
      name: 'Market Research & Analysis',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      purpose: 'Comprehensive market analysis, trends, and competitive landscape intelligence',
      status: 'active',
      progress: 92,
      insights: 1247,
      category: 'business',
      lastUpdated: '2 min ago',
      trend: 'up'
    },
    {
      id: 'lead-generation',
      name: 'Lead Generation & Prospecting',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      purpose: 'Advanced lead discovery, contact enrichment, and prospect qualification',
      status: 'active',
      progress: 88,
      insights: 892,
      category: 'business',
      lastUpdated: '5 min ago',
      trend: 'up'
    },
    {
      id: 'sales-intelligence',
      name: 'Sales Intelligence Hub',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      purpose: 'Deal flow optimization, account mapping, and sales enablement intelligence',
      status: 'processing',
      progress: 76,
      insights: 634,
      category: 'business',
      lastUpdated: '1 min ago',
      trend: 'stable'
    },
    {
      id: 'business-analytics',
      name: 'Business Analytics Intelligence',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      purpose: 'Advanced business metrics, KPI tracking, and performance analytics',
      status: 'active',
      progress: 94,
      insights: 1156,
      category: 'business',
      lastUpdated: '3 min ago',
      trend: 'up'
    },
    {
      id: 'competitive-monitoring',
      name: 'Competitive Intelligence',
      icon: Eye,
      color: 'from-indigo-500 to-purple-500',
      purpose: 'Real-time competitor monitoring, pricing analysis, and market positioning',
      status: 'active',
      progress: 85,
      insights: 743,
      category: 'business',
      lastUpdated: '4 min ago',
      trend: 'up'
    },
    {
      id: 'financial-risk',
      name: 'Financial Risk Analysis',
      icon: Shield,
      color: 'from-yellow-500 to-orange-500',
      purpose: 'Credit assessment, financial health monitoring, and risk evaluation',
      status: 'ready',
      progress: 67,
      insights: 445,
      category: 'business',
      lastUpdated: '8 min ago',
      trend: 'stable'
    }
  ];

  // Security & OSINT Modules
  const osintSecurityModules: IntelModule[] = [
    {
      id: 'osint-sales',
      name: 'OSINT Sales & Marketing',
      icon: Search,
      color: 'from-cyan-500 to-blue-500',
      purpose: 'Open source intelligence for sales prospecting and market research',
      status: 'active',
      progress: 91,
      insights: 987,
      category: 'security',
      lastUpdated: '1 min ago',
      trend: 'up'
    },
    {
      id: 'networking',
      name: 'Professional Networking Intelligence',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      purpose: 'Social network analysis, relationship mapping, and influence tracking',
      status: 'active',
      progress: 83,
      insights: 567,
      category: 'security',
      lastUpdated: '6 min ago',
      trend: 'stable'
    },
    {
      id: 'strategic-planning',
      name: 'Strategic Planning Intelligence',
      icon: Brain,
      color: 'from-violet-500 to-purple-500',
      purpose: 'Long-term strategic insights, scenario planning, and market forecasting',
      status: 'processing',
      progress: 72,
      insights: 398,
      category: 'security',
      lastUpdated: '7 min ago',
      trend: 'up'
    },
    {
      id: 'news-media',
      name: 'News & Media Intelligence',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500',
      purpose: 'Real-time news monitoring, sentiment analysis, and media intelligence',
      status: 'active',
      progress: 89,
      insights: 1823,
      category: 'security',
      lastUpdated: '2 min ago',
      trend: 'up'
    },
    {
      id: 'crm-pipeline',
      name: 'CRM & Pipeline Intelligence',
      icon: Activity,
      color: 'from-teal-500 to-cyan-500',
      purpose: 'Sales pipeline optimization, customer intelligence, and relationship management',
      status: 'ready',
      progress: 78,
      insights: 456,
      category: 'security',
      lastUpdated: '12 min ago',
      trend: 'stable'
    },
    {
      id: 'ai-enablement',
      name: 'Enhanced AI Assistant',
      icon: Sparkles,
      color: 'from-amber-500 to-yellow-500',
      purpose: 'Advanced AI-powered insights, automated analysis, and intelligent recommendations',
      status: 'active',
      progress: 96,
      insights: 2134,
      category: 'security',
      lastUpdated: '30 sec ago',
      trend: 'up'
    },
    {
      id: 'enhanced-chat',
      name: 'Enhanced AI Chat',
      icon: Bot,
      color: 'from-blue-500 to-purple-500',
      purpose: 'ChatGPT-like interface with 8 AI models, OSINT capabilities, and multi-modal intelligence',
      status: 'active',
      progress: 100,
      insights: 3456,
      category: 'business',
      lastUpdated: 'Live',
      trend: 'up'
    },
    {
      id: 'compliance-monitoring',
      name: 'Compliance & Risk Monitoring',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      purpose: 'Regulatory compliance tracking, risk assessment, and audit intelligence',
      status: 'ready',
      progress: 74,
      insights: 298,
      category: 'security',
      lastUpdated: '15 min ago',
      trend: 'stable'
    }
  ];

  // Combine all modules for unified access
  const allModules = [...businessIntelligenceModules, ...osintSecurityModules];

  // Filter modules based on category
  const filteredModules = allModules.filter(module => 
    filterCategory === 'all' || module.category === filterCategory
  );

  // Real-time metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        totalAnalyses: prev.totalAnalyses + Math.floor(Math.random() * 3),
        activeUsers: 85 + Math.floor(Math.random() * 10),
        systemLoad: 30 + Math.floor(Math.random() * 15)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const unifiedAnalysis = useMutation({
    mutationFn: async (data: { query: string; modules: string[] }) => {
      const response = await fetch('/api/intelsphere-unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onMutate: () => setIsProcessing(true),
    onSettled: () => setIsProcessing(false)
  });

  const handleUnifiedAnalysis = async () => {
    if (unifiedQuery.trim()) {
      await unifiedAnalysis.mutateAsync({
        query: unifiedQuery,
        modules: activeModules.length > 0 ? activeModules : allModules.map(m => m.id)
      });
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = {
      type: 'user' as const,
      content: currentMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: currentMessage,
          context: 'intelligence-analysis'
        })
      });
      
      const data = await response.json();
      
      const assistantMessage = {
        type: 'assistant' as const,
        content: data.response || 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'assistant' as const,
        content: 'I apologize, but I\'m currently experiencing connectivity issues. Please check that all intelligence modules are properly configured and try again.',
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const getModuleRoute = (moduleId: string): string => {
    const routeMap: { [key: string]: string } = {
      'market-research': '/market-research',
      'lead-generation': '/lead-generation',
      'sales-intelligence': '/sales-intelligence',
      'business-analytics': '/business-analytics-intelligence',
      'osint-sales': '/osint-sales-marketing',
      'networking': '/networking-relationships',
      'competitive-monitoring': '/competitive-monitoring',
      'strategic-planning': '/strategic-planning',
      'financial-risk': '/financial-risk-analysis',
      'news-media': '/news-media-monitoring',
      'crm-pipeline': '/crm-pipeline',
      'ai-enablement': '/enhanced-ai-assistant',
      'enhanced-chat': '/enhanced-chat',
      'compliance-monitoring': '/compliance-monitoring'
    };
    return routeMap[moduleId] || '/business-hub';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-400" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />;
      default: return <Activity className="h-3 w-3 text-slate-400" />;
    }
  };

  const { data: liveMetrics } = useQuery({
    queryKey: ['/api/intelsphere-metrics'],
    refetchInterval: 10000
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Clean minimal background with subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-purple-950/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-950"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Advanced Navigation Header */}
        <div className="backdrop-blur-lg bg-slate-900/30 rounded-2xl border border-slate-700/50 mb-8 p-4 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Brand & Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Brain className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    IntelSphere
                  </h1>
                  <p className="text-sm text-slate-400">Professional Intelligence Platform</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Elite Operations
                  </Button>
                </Link>
                <div className="w-px h-6 bg-slate-600"></div>
                <Link to="/business-hub-unified">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
                    Business Hub
                  </Button>
                </Link>
                <div className="w-px h-6 bg-slate-600"></div>
                <Link to="/routes-index">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
                    All Routes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center gap-3">
              {/* Live Status Indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
              </div>
              
              {/* GIDEON Access */}
              <Link to="/gideon-command-center">
                <Button variant="outline" size="sm" className="border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">GIDEON</span>
                </Button>
              </Link>
              
              {/* Personalized Welcome */}
              <PersonalizedWelcome />
            </div>
          </div>
        </div>

        {/* Hero Section with Live Metrics */}
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent mb-6 leading-tight">
              Intelligence
              <span className="block bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Redefined
              </span>
            </h1>
            
            {/* Live Metrics Bar */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-300">13 AI Modules Active</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-300">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-300">{realTimeMetrics.uptime} Uptime</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Professional-grade business intelligence and security analysis platform
              <span className="block mt-2 text-slate-400">
                Trusted by enterprises for competitive intelligence and strategic insights
              </span>
            </p>
          </div>
        </div>

        {/* AI Assistant Interface */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-lg mb-8">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                  AI Intelligence Assistant
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                </div>
              </div>
              
              <p className="text-slate-400">
                Ask me anything about business intelligence, market analysis, or competitor research. I'll provide comprehensive insights using all available intelligence modules.
              </p>
              
              {/* Chat Interface */}
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                      <Brain className="h-12 w-12 text-blue-400" />
                      <div className="text-center">
                        <p className="text-lg font-medium mb-2">Ready to analyze</p>
                        <p className="text-sm">Start a conversation by asking about:</p>
                        <ul className="mt-2 space-y-1 text-xs">
                          <li>• Market trends and competitor analysis</li>
                          <li>• Company research and decision makers</li>
                          <li>• Industry insights and opportunities</li>
                          <li>• Financial performance analysis</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700/80 text-slate-100'
                            }`}
                          >
                            {message.type === 'assistant' && (
                              <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                                <Brain className="h-3 w-3" />
                                AI Assistant
                              </div>
                            )}
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            {message.timestamp && (
                              <div className="text-xs mt-1 opacity-70">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isProcessing && (
                        <div className="flex justify-start">
                          <div className="bg-slate-700/80 text-slate-100 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Analyzing across all intelligence modules...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Input Area */}
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Ask me anything about business intelligence, market analysis, or competitor research..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isProcessing || !currentMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 self-end"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SUPREME INTELLIGENCE ANALYTICS - GOD LEVEL */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              Supreme Intelligence Analytics
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold">
                GOD LEVEL ACTIVE
              </span>
              <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm">
                156 Countries Monitored
              </span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                Real-time Threat Intelligence
              </span>
            </div>
          </div>
          
          {/* Global Threat Intelligence Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30 backdrop-blur-lg lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Global Threat Intelligence Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="text-2xl font-bold text-red-400">47</div>
                    <div className="text-xs text-slate-400">Critical Threats</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-400">238</div>
                    <div className="text-xs text-slate-400">High Priority</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="text-2xl font-bold text-yellow-400">1,247</div>
                    <div className="text-xs text-slate-400">Medium Risk</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">3,891</div>
                    <div className="text-xs text-slate-400">Monitoring</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-white">State-sponsored APT Campaign - China</span>
                    </div>
                    <span className="text-xs text-red-400">CRITICAL</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-white">Ransomware Infrastructure - Russia</span>
                    </div>
                    <span className="text-xs text-orange-400">HIGH</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-white">Supply Chain Vulnerability - Global</span>
                    </div>
                    <span className="text-xs text-yellow-400">MEDIUM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-purple-400 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Intelligence Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">OSINT Feeds</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-400">847 Active</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Dark Web Monitoring</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-purple-400">234 Nodes</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Social Media Intel</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-blue-400">1.2M Posts</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Government APIs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-yellow-400">156 Sources</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Corporate Intelligence</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs text-emerald-400">2.3K Sources</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400">99.98%</div>
                    <div className="text-xs text-slate-400">Intelligence Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Advanced Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30 backdrop-blur-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Global Coverage</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">156</div>
                  <div className="text-sm text-slate-300 mb-4">Countries Monitored</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Malaysia</span>
                      <span className="text-green-400">97% Active</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">ASEAN</span>
                      <span className="text-cyan-400">92% Monitoring</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Asia-Pacific</span>
                      <span className="text-emerald-400">89% Active</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Europe</span>
                      <span className="text-blue-400">73% Scanning</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Americas</span>
                      <span className="text-purple-400">94% Processing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 backdrop-blur-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Market Intelligence</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">$2.47T</div>
                    <div className="text-xs text-slate-400">Market Cap Tracked</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tech Sector</span>
                      <span className="text-green-400">+2.3%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Finance</span>
                      <span className="text-blue-400">+1.7%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Healthcare</span>
                      <span className="text-purple-400">+0.9%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30 backdrop-blur-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Processing Power</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">847K</div>
                    <div className="text-xs text-slate-400">Operations/Minute</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className="text-green-400">23%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Memory</span>
                      <span className="text-blue-400">45%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Network</span>
                      <span className="text-purple-400">67%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-pink-500/30 backdrop-blur-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-pink-400" />
                  <h3 className="text-lg font-semibold text-white">Security Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">SECURE</div>
                    <div className="text-xs text-slate-400">Defense Level: Maximum</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Firewalls</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Encryption</span>
                      <span className="text-green-400">AES-256</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Threats Blocked</span>
                      <span className="text-red-400">1,247</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* REVOLUTIONARY LIVE COMMAND CENTER - ULTIMATE REAL-TIME DASHBOARD */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Live Intelligence Command Center
            </h2>
            <p className="text-slate-300 text-lg">Real-time data streams, live analysis, and dynamic intelligence feeds</p>
          </div>
          
          {/* ENHANCED MALAYSIAN/ASEAN LIVE WIDGETS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <EnhancedMarketTrendsWidget />
            <EnhancedWeatherWidget />
            <MalaysianGoogleTrendsWidget />
            <EnhancedLiveNewsWidget />
          </div>
          
          {/* SOCIAL MEDIA INTELLIGENCE FOR MALAYSIAN MARKET */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <EnhancedSocialMediaWidget />
            <div className="md:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Malaysian Digital Landscape Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded">
                      <div className="text-xl font-bold text-blue-400">67.2%</div>
                      <div className="text-xs text-slate-400">Positive Sentiment</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded">
                      <div className="text-xl font-bold text-green-400">94.1%</div>
                      <div className="text-xs text-slate-400">Instagram Activity</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded">
                      <div className="text-xl font-bold text-orange-400">34.2%</div>
                      <div className="text-xs text-slate-400">KL Dominance</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded">
                      <div className="text-xl font-bold text-purple-400">91.8%</div>
                      <div className="text-xs text-slate-400">TikTok Growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* SYSTEM PERFORMANCE AND DATA QUALITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <EnhancedLiveClock />
            <SystemPerformanceMonitor />
            <DataQualityIndicator />
          </div>
          
          {/* LIVE VIDEO INTELLIGENCE - GOD LEVEL FEEDS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <VideoInterface 
              title="🔴 LIVE: Global News Intelligence" 
              featured={true} 
            />
            <VideoInterface 
              title="📈 LIVE: Market Analysis & Trends" 
              featured={false} 
            />
            <GoogleTrendsWidget />
          </div>

          {/* GLOBAL INTELLIGENCE MATRIX - WORLD-CLASS PROCESSING CENTER */}
          <div className="mb-8">
            <GlobalIntelligenceMatrix />
          </div>

          {/* SECOND ROW - ADVANCED FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div>
              <DynamicQuotes />
            </div>
            <div>
              <LiveCalendar />
            </div>
            <div>
              <Card className="godlevel-card border-red-500/30 felt-texture pulse-glow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Activity className="h-5 w-5 text-red-400" />
                    <span className="text-sm font-medium text-slate-300">Threat Level</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-red-400">DEFCON 3</div>
                    <div className="text-xs text-slate-400">Elevated security posture</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-red-500/10 rounded p-2">
                        <div className="text-red-300 font-medium">Active Threats</div>
                        <div className="text-white font-bold">7</div>
                      </div>
                      <div className="bg-orange-500/10 rounded p-2">
                        <div className="text-orange-300 font-medium">Monitoring</div>
                        <div className="text-white font-bold">24/7</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* ULTRA-ADVANCED NEURAL METRICS VISUALIZATION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border-violet-500/30 backdrop-blur-lg neural-network">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-6 w-6 text-violet-400" />
                  <h3 className="text-lg font-semibold text-white">Neural Processing Matrix</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-violet-400">97.3%</div>
                      <div className="text-xs text-slate-400">AI Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">2.1ms</div>
                      <div className="text-xs text-slate-400">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">47K</div>
                      <div className="text-xs text-slate-400">Ops/Sec</div>
                    </div>
                  </div>
                  <div className="relative h-24 bg-slate-800/50 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-around px-2 pb-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 bg-gradient-to-t from-violet-500 to-purple-400 rounded-t neural-network"
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30 backdrop-blur-lg holographic">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">Global Intelligence Network</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-400">Asia-Pacific</span>
                        <span className="text-xs text-emerald-400">Active</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-400">Europe</span>
                        <span className="text-xs text-blue-400">Scanning</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-400">Americas</span>
                        <span className="text-xs text-purple-400">Processing</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div className="bg-purple-500 h-1 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-400">Middle East</span>
                        <span className="text-xs text-yellow-400">Monitoring</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div className="bg-yellow-500 h-1 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-slate-800/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-400">156 Countries</div>
                      <div className="text-xs text-slate-400">Simultaneous Coverage</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <Card className="flex-1 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Module Control</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="border-slate-600"
                  >
                    {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant={filterCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory('all')}
                  className="border-slate-600"
                >
                  All ({allModules.length})
                </Button>
                <Button
                  variant={filterCategory === 'business' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory('business')}
                  className="border-slate-600"
                >
                  Business ({businessIntelligenceModules.length})
                </Button>
                <Button
                  variant={filterCategory === 'security' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory('security')}
                  className="border-slate-600"
                >
                  Security & OSINT ({osintSecurityModules.length})
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:w-80 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Live System Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Total Analyses</span>
                  <span className="text-sm font-semibold text-white">{realTimeMetrics.totalAnalyses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Active Users</span>
                  <span className="text-sm font-semibold text-green-400">{realTimeMetrics.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">System Load</span>
                  <span className="text-sm font-semibold text-blue-400">{realTimeMetrics.systemLoad}%</span>
                </div>
                <Progress value={realTimeMetrics.systemLoad} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intelligence Modules Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredModules.map((module) => {
            const IconComponent = module.icon;
            const isSelected = activeModules.includes(module.id) || activeModules.length === 0;
            
            return (
              <Link to={getModuleRoute(module.id)} key={module.id}>
                <Card 
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isSelected 
                      ? 'bg-gradient-to-br from-slate-700/70 to-slate-800/70 border-purple-500/50 ring-1 ring-purple-500/30' 
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-700/40'
                  } backdrop-blur-sm`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant={module.status === 'active' ? 'default' : module.status === 'processing' ? 'secondary' : 'outline'}
                            className={
                              module.status === 'active' ? 'bg-green-600/20 text-green-300 border-green-500/30' :
                              module.status === 'processing' ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30' :
                              'bg-slate-600/20 text-slate-300 border-slate-500/30'
                            }
                          >
                            {module.status}
                          </Badge>
                          {getTrendIcon(module.trend)}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {module.name}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">{module.purpose}</p>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Progress</span>
                          <span className="text-xs font-semibold text-purple-400">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Insights Generated</span>
                          <span className="text-xs font-semibold text-blue-400">{module.insights.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                          <span className="text-xs text-slate-500">Last updated {module.lastUpdated}</span>
                          <Star className="h-3 w-3 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Analysis Progress */}
        {isProcessing && (
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                Unified Intelligence Analysis in Progress
              </h4>
              <div className="space-y-3">
                {(activeModules.length > 0 ? activeModules : allModules.map(m => m.id)).map((moduleId, index) => {
                  const module = allModules.find(m => m.id === moduleId);
                  return (
                    <div key={moduleId} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-slate-300">{module?.name}</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        Complete
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <Progress value={100} className="h-3 mt-4" />
            </CardContent>
          </Card>
        )}

        {/* Revolutionary AI Interface Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="ai-interface" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
              <TabsTrigger value="ai-interface" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Standard AI Interface
              </TabsTrigger>
              <TabsTrigger value="enhanced-chat" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Enhanced AI Chat
              </TabsTrigger>
              <TabsTrigger value="revolutionary-ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Revolutionary AI System
              </TabsTrigger>
              <TabsTrigger value="model-status" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Model Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-interface" className="mt-4">
              <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 border-purple-500/30 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-purple-400" />
                    Enhanced Multimodal AI System
                    <Badge variant="secondary" className="ml-2">7 AI Models</Badge>
                    <Badge variant="outline" className="ml-1">MultiAgent-to-MultiAgent</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedAIInterface />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enhanced-chat" className="mt-4">
              <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 border-blue-500/30 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-blue-400" />
                    Enhanced AI Chat Interface
                    <Badge variant="secondary" className="ml-2">8 AI Models</Badge>
                    <Badge variant="outline" className="ml-1">OSINT Enabled</Badge>
                    <Badge variant="outline" className="ml-1">Multi-Model</Badge>
                  </CardTitle>
                  <p className="text-slate-400 mt-2">
                    Advanced ChatGPT-like interface with 8 AI models, OSINT capabilities, document processing, and real-time intelligence features.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        Multi-Model Chat
                      </h4>
                      <p className="text-sm text-slate-400 mb-3">
                        Chat with multiple AI models simultaneously for comprehensive responses and diverse perspectives.
                      </p>
                      <ul className="text-xs text-slate-500 space-y-1">
                        <li>• OpenAI GPT-4o</li>
                        <li>• Anthropic Claude</li>
                        <li>• xAI Grok</li>
                        <li>• Google Gemini</li>
                        <li>• Cohere Command</li>
                        <li>• Mistral Large</li>
                        <li>• Voyage AI</li>
                        <li>• Perplexity</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4 text-purple-400" />
                        OSINT Integration
                      </h4>
                      <p className="text-sm text-slate-400 mb-3">
                        Advanced intelligence capabilities with NATO OSINT methodologies and cyber reconnaissance protocols.
                      </p>
                      <ul className="text-xs text-slate-500 space-y-1">
                        <li>• NATO OSINT Handbook</li>
                        <li>• APT Intelligence</li>
                        <li>• Cyber Reconnaissance</li>
                        <li>• Social Intelligence</li>
                        <li>• Real-time Web Crawling</li>
                        <li>• Document Analysis</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.location.href = '/enhanced-chat'}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Open Enhanced Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                      onClick={() => window.open('/enhanced-chat', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      New Window
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revolutionary-ai" className="mt-4">
              <RevolutionaryAIInterface />
            </TabsContent>

            <TabsContent value="model-status" className="mt-4">
              <AIModelStatusDashboard />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{allModules.length}</div>
              <div className="text-sm text-slate-400">Active Modules</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {allModules.reduce((sum, module) => sum + module.insights, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Total Insights</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(allModules.reduce((sum, module) => sum + module.progress, 0) / allModules.length)}%
              </div>
              <div className="text-sm text-slate-400">Avg Performance</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{realTimeMetrics.uptime}</div>
              <div className="text-sm text-slate-400">System Uptime</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}