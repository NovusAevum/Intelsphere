import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoBackButton from '@/components/ui/go-back-button';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  Users, 
  Globe, 
  Target, 
  Zap, 
  Activity, 
  MessageSquare, 
  Send,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Share2,
  MousePointer,
  Clock,
  Award,
  ArrowRight,
  Briefcase,
  Search,
  Bell,
  Settings,
  ChevronDown,
  ExternalLink,
  Lightbulb,
  Bot,
  Brain,
  Shield,
  Network,
  Calculator,
  Newspaper,
  Building,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface MarketingMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface CompetitorData {
  name: string;
  marketShare: number;
  trend: 'up' | 'down' | 'neutral';
  traffic: string;
  sentiment: number;
}

interface TrendingContent {
  title: string;
  engagement: number;
  platform: string;
  category: string;
  growth: number;
}

export default function BusinessHub() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'competitors' | 'trends' | 'chat'>('dashboard');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your marketing intelligence assistant. I can help you with market analysis, competitor research, content strategy, and campaign optimization. What would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "Analyze current market trends",
        "Research competitors",
        "Generate content ideas",
        "Review campaign performance"
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(true);

  // Live metrics that update every few seconds
  const [liveMetrics, setLiveMetrics] = useState<MarketingMetric[]>([
    {
      label: 'Revenue',
      value: '$247,293',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Traffic',
      value: '58,234',
      change: -2.3,
      trend: 'down',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Conversion',
      value: '3.47%',
      change: 8.2,
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      label: 'Engagement',
      value: '24.8%',
      change: 5.7,
      trend: 'up',
      icon: Heart,
      color: 'red'
    }
  ]);

  const [competitors] = useState<CompetitorData[]>([
    { name: 'Competitor A', marketShare: 32.5, trend: 'up', traffic: '2.3M', sentiment: 78 },
    { name: 'Competitor B', marketShare: 28.1, trend: 'down', traffic: '1.9M', sentiment: 65 },
    { name: 'Competitor C', marketShare: 19.8, trend: 'up', traffic: '1.4M', sentiment: 82 },
    { name: 'Competitor D', marketShare: 12.3, trend: 'neutral', traffic: '890K', sentiment: 71 },
    { name: 'Competitor E', marketShare: 7.3, trend: 'up', traffic: '654K', sentiment: 69 }
  ]);

  const [trendingContent] = useState<TrendingContent[]>([
    { title: 'AI Marketing Automation', engagement: 8947, platform: 'LinkedIn', category: 'Technology', growth: 145 },
    { title: 'Sustainable Business Practices', engagement: 6234, platform: 'Twitter', category: 'Environment', growth: 89 },
    { title: 'Remote Work Culture', engagement: 5678, platform: 'Facebook', category: 'Workplace', growth: 67 },
    { title: 'Digital Transformation', engagement: 4321, platform: 'Instagram', category: 'Business', growth: 234 },
    { title: 'Customer Experience Design', engagement: 3987, platform: 'LinkedIn', category: 'Design', growth: 112 }
  ]);

  // Simulate live data updates
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setLiveMetrics(prev => prev.map(metric => ({
        ...metric,
        value: generateNewValue(metric.value),
        change: +(Math.random() * 20 - 10).toFixed(1),
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'neutral'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const generateNewValue = (currentValue: string): string => {
    const numericValue = parseFloat(currentValue.replace(/[^0-9.]/g, ''));
    const variation = (Math.random() - 0.5) * 0.1;
    const newValue = numericValue * (1 + variation);
    
    if (currentValue.includes('$')) {
      return `$${newValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else if (currentValue.includes('%')) {
      return `${newValue.toFixed(2)}%`;
    } else {
      return newValue.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
  };

  const chatMutation = useMutation({
    mutationFn: async (message: string): Promise<any> => {
      const response = await apiRequest('POST', '/api/marketing-chat', { message, context: 'marketing' });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: data.response || 'I can help you with that. Let me analyze the current market data.',
        timestamp: new Date(),
        suggestions: data.suggestions || []
      };
      setChatMessages(prev => [...prev, assistantMessage]);
    }
  });

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(chatInput);
    setChatInput('');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Live Status Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLiveMode ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-white font-medium">
              {isLiveMode ? 'Live Monitoring' : 'Static View'}
            </span>
          </div>
          <button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all"
          >
            {isLiveMode ? 'Pause' : 'Resume'} Live Updates
          </button>
        </div>
        
        <div className="text-gray-400 text-sm">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${metric.color}-500/20`}>
                  <IconComponent className={`w-6 h-6 text-${metric.color}-400`} />
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-400' :
                  metric.trend === 'down' ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> :
                   metric.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> :
                   <ArrowRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
            Traffic Analytics
          </h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-400">Live traffic chart would be displayed here</div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-400" />
            Conversion Funnel
          </h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-400">Conversion funnel visualization</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Campaign Performance</h3>
          <div className="space-y-3">
            {['Email Campaign', 'Social Media', 'PPC Ads'].map((campaign, index) => (
              <div key={campaign} className="flex items-center justify-between">
                <span className="text-gray-300">{campaign}</span>
                <span className="text-green-400 font-medium">
                  {(Math.random() * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Audience Insights</h3>
          <div className="space-y-3">
            {['Desktop', 'Mobile', 'Tablet'].map((device, index) => (
              <div key={device} className="flex items-center justify-between">
                <span className="text-gray-300">{device}</span>
                <span className="text-blue-400 font-medium">
                  {(Math.random() * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Sources</h3>
          <div className="space-y-3">
            {['Organic', 'Paid', 'Referral'].map((source, index) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-gray-300">{source}</span>
                <span className="text-purple-400 font-medium">
                  ${(Math.random() * 10000).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompetitors = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Target className="w-5 h-5 mr-2 text-red-400" />
          Competitive Analysis
        </h3>
        
        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <div key={competitor.name} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{competitor.name.slice(-1)}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{competitor.name}</h4>
                    <p className="text-gray-400 text-sm">Market Share: {competitor.marketShare}%</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-white font-medium">{competitor.traffic}</div>
                    <div className="text-gray-400 text-xs">Monthly Traffic</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-white font-medium">{competitor.sentiment}/100</div>
                    <div className="text-gray-400 text-xs">Sentiment</div>
                  </div>
                  
                  <div className={`flex items-center space-x-1 ${
                    competitor.trend === 'up' ? 'text-green-400' :
                    competitor.trend === 'down' ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {competitor.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                     competitor.trend === 'down' ? <TrendingDown className="w-4 h-4" /> :
                     <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
          Trending Content Ideas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingContent.map((content, index) => (
            <div key={content.title} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-white font-semibold text-sm">{content.title}</h4>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                  {content.platform}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">
                    <Heart className="w-4 h-4 inline mr-1" />
                    {content.engagement.toLocaleString()}
                  </span>
                  <span className="text-purple-400">{content.category}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-green-400">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{content.growth}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatMessages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl p-4 rounded-2xl ${
              message.type === 'user'
                ? 'bg-blue-600/20 border border-blue-500/30'
                : 'bg-gray-800/50 border border-gray-700/50'
            }`}>
              {message.type === 'assistant' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm">Marketing Assistant</span>
                </div>
              )}
              
              <div className="text-white text-sm">{message.content}</div>
              
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(suggestion)}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 text-xs hover:bg-purple-500/30 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about marketing strategies, trends, or analysis..."
          className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!chatInput.trim() || chatMutation.isPending}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-xl disabled:opacity-50 hover:shadow-lg transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-teal-950 relative overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/10 backdrop-blur-xl bg-white/5 p-6"
        >
          {/* Go Back Button */}
          <div className="absolute top-4 left-4 z-50">
            <GoBackButton />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Business Intelligence Hub</h1>
                <p className="text-gray-400 text-sm">24/7 Live Marketing Analytics & AI Insights</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Live 24/7</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-6 mt-6">
            {[
              { id: 'dashboard', label: 'Live Dashboard', icon: Activity },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'competitors', label: 'Competitors', icon: Target },
              { id: 'trends', label: 'Content Trends', icon: TrendingUp },
              { id: 'chat', label: 'AI Assistant', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'competitors' && renderCompetitors()}
              {activeTab === 'trends' && renderTrends()}
              {activeTab === 'chat' && renderChat()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}