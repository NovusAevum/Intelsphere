/**
 * INTELSPHERE APEX - Enhanced AI Control Deck Console
 * Enterprise-grade AI system architecture and operational control interface
 */

import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, Brain, Database, Monitor, Cpu, Network, 
  Eye, Clock, FileText, Code, Layers
} from 'lucide-react';

interface SystemMetrics {
  cpu_usage: number;
  memory_usage: number;
  active_agents: number;
  intelligence_queue: number;
  correlation_rate: number;
  threat_alerts: number;
  operational_readiness: number;
}

interface AIAgentStatus {
  agent_id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  last_activity: string;
  tasks_completed: number;
  performance_score: number;
}

interface ArchitectureModule {
  module_id: string;
  name: string;
  type: string;
  status: 'operational' | 'degraded' | 'offline';
  dependencies: string[];
  health_score: number;
  last_updated: string;
}

const AIControlDeck: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('Loading AI Control Deck...');
  const [activeSection, setActiveSection] = useState<'overview' | 'architecture' | 'agents' | 'documentation'>('overview');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu_usage: 0,
    memory_usage: 0,
    active_agents: 0,
    intelligence_queue: 0,
    correlation_rate: 0,
    threat_alerts: 0,
    operational_readiness: 0
  });
  const [aiAgents, setAiAgents] = useState<AIAgentStatus[]>([]);
  const [architectureModules, setArchitectureModules] = useState<ArchitectureModule[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Query system health
  const { data: healthData, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/health'],
    refetchInterval: isLiveMode ? 5000 : 30000
  });

  // Query APEX status
  const { data: apexStatus, isLoading: apexLoading } = useQuery({
    queryKey: ['/api/apex/enterprise-status'],
    refetchInterval: isLiveMode ? 5000 : 30000
  });

  // Load control deck documentation
  useEffect(() => {
    fetch('/AI_CONTROL_DECK.md')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load AI Control Deck documentation');
        return res.text();
      })
      .then(content => {
        setMarkdownContent(content);
      })
      .catch(error => {
        console.error('Error loading AI Control Deck:', error);
        setMarkdownContent('⚠️ Failed to load AI Control Deck documentation. Ensure AI_CONTROL_DECK.md exists at project root.');
      });
  }, []);

  // Simulate real-time system metrics
  useEffect(() => {
    if (isLiveMode) {
      intervalRef.current = setInterval(() => {
        setSystemMetrics(prev => ({
          cpu_usage: Math.max(0.1, Math.min(0.9, prev.cpu_usage + (Math.random() - 0.5) * 0.1)),
          memory_usage: Math.max(0.2, Math.min(0.85, prev.memory_usage + (Math.random() - 0.5) * 0.05)),
          active_agents: Math.floor(Math.random() * 3) + 6,
          intelligence_queue: Math.floor(Math.random() * 20) + 5,
          correlation_rate: Math.max(0.6, Math.min(0.98, prev.correlation_rate + (Math.random() - 0.5) * 0.05)),
          threat_alerts: Math.floor(Math.random() * 5),
          operational_readiness: Math.max(0.8, Math.min(0.99, prev.operational_readiness + (Math.random() - 0.5) * 0.02))
        }));
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLiveMode]);

  // Initialize mock data
  useEffect(() => {
    setSystemMetrics({
      cpu_usage: 0.65,
      memory_usage: 0.72,
      active_agents: 8,
      intelligence_queue: 12,
      correlation_rate: 0.89,
      threat_alerts: 2,
      operational_readiness: 0.94
    });

    setAiAgents([
      {
        agent_id: 'agent_001',
        name: 'APEX Intelligence Orchestrator',
        type: 'Coordination',
        status: 'active',
        last_activity: '2 min ago',
        tasks_completed: 247,
        performance_score: 0.96
      },
      {
        agent_id: 'agent_002',
        name: 'Cyber Intelligence Engine',
        type: 'Security',
        status: 'processing',
        last_activity: '30 sec ago',
        tasks_completed: 189,
        performance_score: 0.92
      },
      {
        agent_id: 'agent_003',
        name: 'OSINT Collection Agent',
        type: 'Intelligence',
        status: 'active',
        last_activity: '1 min ago',
        tasks_completed: 156,
        performance_score: 0.88
      },
      {
        agent_id: 'agent_004',
        name: 'Real-time Feed Processor',
        type: 'Processing',
        status: 'active',
        last_activity: '15 sec ago',
        tasks_completed: 312,
        performance_score: 0.94
      },
      {
        agent_id: 'agent_005',
        name: 'Correlation Analysis Engine',
        type: 'Analysis',
        status: 'idle',
        last_activity: '5 min ago',
        tasks_completed: 98,
        performance_score: 0.85
      }
    ]);

    setArchitectureModules([
      {
        module_id: 'mod_001',
        name: 'Unified Command Center',
        type: 'Core',
        status: 'operational',
        dependencies: ['Database', 'API Gateway'],
        health_score: 0.98,
        last_updated: '2 min ago'
      },
      {
        module_id: 'mod_002',
        name: 'Intelligence Orchestrator',
        type: 'Coordination',
        status: 'operational',
        dependencies: ['Command Center', 'AI Agents'],
        health_score: 0.95,
        last_updated: '1 min ago'
      },
      {
        module_id: 'mod_003',
        name: 'Real-time Feed Processor',
        type: 'Processing',
        status: 'operational',
        dependencies: ['WebSocket Server', 'Correlation Engine'],
        health_score: 0.92,
        last_updated: '30 sec ago'
      },
      {
        module_id: 'mod_004',
        name: 'OSINT Collection Engine',
        type: 'Intelligence',
        status: 'operational',
        dependencies: ['External APIs', 'Data Storage'],
        health_score: 0.88,
        last_updated: '3 min ago'
      },
      {
        module_id: 'mod_005',
        name: 'Cyber Intelligence Engine',
        type: 'Security',
        status: 'operational',
        dependencies: ['Threat Feeds', 'MITRE Framework'],
        health_score: 0.91,
        last_updated: '1 min ago'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'operational': return 'text-green-400 bg-green-900/20 border-green-400';
      case 'processing': return 'text-blue-400 bg-blue-900/20 border-blue-400';
      case 'idle': return 'text-yellow-400 bg-yellow-900/20 border-yellow-400';
      case 'degraded': return 'text-orange-400 bg-orange-900/20 border-orange-400';
      case 'error':
      case 'offline': return 'text-red-400 bg-red-900/20 border-red-400';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-400';
    }
  };

  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold text-cyan-400 mt-6 mb-3">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold text-blue-400 mt-4 mb-2">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold text-purple-400 mt-3 mb-2">{line.slice(4)}</h3>;
        }
        
        // Lists
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <li key={index} className="text-gray-300 ml-4 mb-1 list-disc">{line.slice(2)}</li>;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return <div key={index} className="border-l-4 border-cyan-500 bg-gray-800 p-2 my-2"></div>;
        }
        
        // Emphasis
        if (line.includes('⸻')) {
          return <hr key={index} className="border-gray-600 my-4" />;
        }
        
        // Special formatting for prompts and sections
        if (line.includes('🧠') || line.includes('🔐') || line.includes('⚡')) {
          return <div key={index} className="text-yellow-400 font-semibold mt-4 mb-2">{line}</div>;
        }
        
        // Regular paragraphs
        if (line.trim()) {
          return <p key={index} className="text-gray-300 mb-2 leading-relaxed">{line}</p>;
        }
        
        return <br key={index} />;
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Brain className="h-12 w-12 text-cyan-400" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                INTELSPHERE APEX
              </h1>
              <p className="text-slate-400 text-lg">AI Control Deck Console</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsLiveMode(!isLiveMode)}
              variant={isLiveMode ? "default" : "outline"}
              className={isLiveMode ? "bg-green-600 hover:bg-green-700" : "border-gray-600"}
            >
              {isLiveMode ? (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  LIVE MODE
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4 mr-2" />
                  STATIC MODE
                </>
              )}
            </Button>
            
            <Badge variant="outline" className="text-green-400 border-green-400">
              OPERATIONAL
            </Badge>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Cpu className="h-6 w-6 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">CPU</div>
                  <div className="text-lg font-bold text-white">
                    {(systemMetrics.cpu_usage * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-purple-400" />
                <div>
                  <div className="text-xs text-slate-400">Memory</div>
                  <div className="text-lg font-bold text-white">
                    {(systemMetrics.memory_usage * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">AI Agents</div>
                  <div className="text-lg font-bold text-white">
                    {systemMetrics.active_agents}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Network className="h-6 w-6 text-yellow-400" />
                <div>
                  <div className="text-xs text-slate-400">Queue</div>
                  <div className="text-lg font-bold text-white">
                    {systemMetrics.intelligence_queue}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Network className="h-6 w-6 text-cyan-400" />
                <div>
                  <div className="text-xs text-slate-400">Correlation</div>
                  <div className="text-lg font-bold text-white">
                    {(systemMetrics.correlation_rate * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Network className="h-6 w-6 text-red-400" />
                <div>
                  <div className="text-xs text-slate-400">Threats</div>
                  <div className="text-lg font-bold text-white">
                    {systemMetrics.threat_alerts}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">Readiness</div>
                  <div className="text-lg font-bold text-white">
                    {(systemMetrics.operational_readiness * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Console Tabs */}
        <Tabs value={activeSection} onValueChange={(value: any) => setActiveSection(value)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* System Health */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-green-400" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className="text-white">{(systemMetrics.cpu_usage * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={systemMetrics.cpu_usage * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-white">{(systemMetrics.memory_usage * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={systemMetrics.memory_usage * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Operational Readiness</span>
                      <span className="text-white">{(systemMetrics.operational_readiness * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={systemMetrics.operational_readiness * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Live Intelligence Feed */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-cyan-400" />
                    Live Intelligence Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <div className="border border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="text-green-400 border-green-400">ROUTINE</Badge>
                        <span className="text-xs text-slate-400">{new Date().toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm text-white">Business intelligence correlation identified - Market trend analysis complete</p>
                    </div>
                    
                    <div className="border border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="text-yellow-400 border-yellow-400">PRIORITY</Badge>
                        <span className="text-xs text-slate-400">{new Date(Date.now() - 60000).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm text-white">Cyber intelligence update - Threat landscape assessment updated</p>
                    </div>
                    
                    <div className="border border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="text-blue-400 border-blue-400">ROUTINE</Badge>
                        <span className="text-xs text-slate-400">{new Date(Date.now() - 120000).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm text-white">OSINT collection complete - Social media intelligence processed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {architectureModules.map((module) => (
                <Card key={module.module_id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{module.name}</h3>
                      <Badge className={getStatusColor(module.status)}>
                        {module.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type</span>
                        <span className="text-white capitalize">{module.type}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-400">Health Score</span>
                        <span className="text-white">{(module.health_score * 100).toFixed(1)}%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Updated</span>
                        <span className="text-white">{module.last_updated}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-slate-400 mb-1">Dependencies</div>
                      <div className="flex flex-wrap gap-1">
                        {module.dependencies.map((dep, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiAgents.map((agent) => (
                <Card key={agent.agent_id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Brain className="h-8 w-8 text-cyan-400" />
                        <div>
                          <h3 className="font-semibold text-white">{agent.name}</h3>
                          <p className="text-sm text-slate-400 capitalize">{agent.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Activity</span>
                        <span className="text-white">{agent.last_activity}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tasks Completed</span>
                        <span className="text-white">{agent.tasks_completed}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-400">Performance Score</span>
                        <span className="text-white">{(agent.performance_score * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Progress value={agent.performance_score * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  AI Control Deck Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-6 rounded-lg text-sm font-mono overflow-y-auto max-h-96 whitespace-pre-wrap">
                  {renderMarkdown(markdownContent)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIControlDeck;