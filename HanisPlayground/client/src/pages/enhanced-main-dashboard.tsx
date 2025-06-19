import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Shield, 
  Globe, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Eye, 
  Search, 
  Zap, 
  Database,
  Target,
  Users,
  Network,
  FileText,
  MessageSquare,
  Settings,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Cpu,
  LineChart
} from 'lucide-react';

export default function EnhancedMainDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // API Status Query
  const { data: apiStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['/api/validate-credentials'],
    refetchInterval: 30000,
  });

  const intelligenceModules = [
    {
      id: 'authentic-intelligence',
      title: 'Authentic Intelligence Dashboard',
      description: 'Enterprise-grade intelligence platform with authentic data sources and comprehensive API validation',
      path: '/authentic-intelligence-dashboard',
      icon: Brain,
      category: 'Primary Intelligence',
      features: ['Real-time API validation', 'Multi-source intelligence', 'AI-enhanced analysis', 'Authenticity scoring'],
      status: 'active',
      color: 'blue'
    },
    {
      id: 'advanced-multimodal',
      title: 'Advanced Multimodal AI',
      description: 'Document processing, bulk analysis, and real-time web intelligence with confidence scoring',
      path: '/advanced-multimodal-ai',
      icon: FileText,
      category: 'AI Processing',
      features: ['Document analysis', 'Bulk processing', 'Web intelligence', 'Confidence scoring'],
      status: 'active',
      color: 'purple'
    },
    {
      id: 'nexus-intel-2v',
      title: 'NexusIntel 2.0v',
      description: 'World-class enterprise-grade Smart Agentic AI Orchestration system with global OSINT capabilities',
      path: '/nexus-intel-2v',
      icon: Network,
      category: 'Command & Control',
      features: ['Hierarchical command', 'Global coverage', 'OSINT integration', 'Military-style structure'],
      status: 'active',
      color: 'green'
    },
    {
      id: 'chief-state-commander',
      title: 'Chief State Commander Hanis',
      description: 'Supreme command authority with worldwide market coverage and strategic oversight',
      path: '/chief-state-commander',
      icon: Shield,
      category: 'Command Authority',
      features: ['Supreme oversight', 'Global markets', 'Strategic command', 'Ultimate authority'],
      status: 'active',
      color: 'red'
    },
    {
      id: 'social-intelligence',
      title: 'Social Media Intelligence',
      description: 'Comprehensive social media monitoring and sentiment analysis across all platforms',
      path: '/social-media-intelligence-dashboard',
      icon: Activity,
      category: 'Social Intelligence',
      features: ['Platform monitoring', 'Sentiment analysis', 'Trend detection', 'Influence mapping'],
      status: 'active',
      color: 'cyan'
    },
    {
      id: 'ops-protocol-x',
      title: 'Ops Protocol X',
      description: 'Advanced operational protocols for fast-response intelligence operations',
      path: '/ops-protocol-x',
      icon: Zap,
      category: 'Operations',
      features: ['Fast response', 'Protocol automation', 'Mission critical', 'Real-time ops'],
      status: 'active',
      color: 'orange'
    }
  ];

  const analyticsModules = [
    {
      title: 'Deep Research Intelligence',
      path: '/deep-research-intelligence',
      icon: Search,
      description: 'Advanced research capabilities with deep data mining'
    },
    {
      title: 'Competitive Monitoring',
      path: '/competitive-monitoring',
      icon: Target,
      description: 'Real-time competitive intelligence and market analysis'
    },
    {
      title: 'Financial Risk Analysis',
      path: '/financial-risk-analysis',
      icon: TrendingUp,
      description: 'Comprehensive financial risk assessment and monitoring'
    },
    {
      title: 'Intelligence Network Map',
      path: '/intelligence-network-map',
      icon: Globe,
      description: 'Visual network mapping of intelligence sources'
    }
  ];

  const aiAssistants = [
    {
      title: 'Smart AI Assistant V2',
      path: '/smart-ai-assistant-v2',
      icon: Brain,
      description: 'Advanced AI assistant with enhanced capabilities'
    },
    {
      title: 'Enhanced AI Assistant',
      path: '/enhanced-ai-assistant',
      icon: Sparkles,
      description: 'Enterprise-grade AI assistant with professional features'
    },
    {
      title: 'Human-like AI Assistant',
      path: '/human-ai-assistant',
      icon: Users,
      description: 'Natural conversation AI with human-like interactions'
    },
    {
      title: 'Companion AI Assistant',
      path: '/companion-ai-assistant',
      icon: MessageSquare,
      description: 'Personal AI companion for ongoing assistance'
    }
  ];

  const getStatusColor = (available: boolean) => {
    return available ? 'text-green-400' : 'text-red-400';
  };

  const getModuleColor = (color: string) => {
    const colors = {
      blue: 'from-blue-600 to-blue-800',
      purple: 'from-purple-600 to-purple-800',
      green: 'from-green-600 to-green-800',
      red: 'from-red-600 to-red-800',
      cyan: 'from-cyan-600 to-cyan-800',
      orange: 'from-orange-600 to-orange-800'
    };
    return colors[color] || 'from-gray-600 to-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Brain className="h-16 w-16 text-blue-400" />
            <div>
              <h1 className="text-5xl font-bold text-white">IntelSphere</h1>
              <p className="text-xl text-blue-200">Advanced Multi-Modal AI Intelligence Platform</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>100% Authentic Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Real-time Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Global Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
          </div>

          <div className="text-slate-300">
            {currentTime.toLocaleString()} | System Status: Active | Intelligence Level: Maximum
          </div>
        </div>

        {/* System Status Overview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              System Status & API Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <span className="ml-2 text-slate-300">Validating system status...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {apiStatus?.available_apis && Object.entries(apiStatus.available_apis).map(([api, available]) => (
                  <div key={api} className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      {available ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Badge variant={available ? "default" : "destructive"} className="text-xs">
                        {available ? 'OK' : 'ERROR'}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-white capitalize">
                      {api.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Primary Intelligence Modules */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Primary Intelligence Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intelligenceModules.map((module) => (
              <Card key={module.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${getModuleColor(module.color)}`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={`bg-${module.color}-600`}>{module.category}</Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-300">
                        <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link href={module.path}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500 transition-colors">
                      Access Module
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Analytics & Research Modules */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Analytics & Research Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsModules.map((module, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <module.icon className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white text-sm">{module.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{module.description}</p>
                  <Link href={module.path}>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Launch
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Assistants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">AI Assistant Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiAssistants.map((assistant, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <assistant.icon className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold text-white text-sm">{assistant.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{assistant.description}</p>
                  <Link href={assistant.path}>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Chat
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Modules</p>
                  <p className="text-2xl font-bold text-white">{intelligenceModules.length}</p>
                </div>
                <Cpu className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">API Sources</p>
                  <p className="text-2xl font-bold text-white">
                    {apiStatus?.available_apis ? Object.values(apiStatus.available_apis).filter(Boolean).length : 0}
                  </p>
                </div>
                <Database className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">AI Models</p>
                  <p className="text-2xl font-bold text-white">8</p>
                </div>
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">System Health</p>
                  <p className="text-2xl font-bold text-green-400">98%</p>
                </div>
                <LineChart className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm border-t border-slate-700 pt-6">
          <p>IntelSphere © 2025 | Advanced Multi-Modal AI Intelligence Platform</p>
          <p>Enterprise-grade intelligence with authentic data sources | Chief State Commander Hanis Supreme Authority</p>
        </div>
      </div>
    </div>
  );
}