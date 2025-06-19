import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "@/lib/queryClient";
import { 
  Brain, 
  Network, 
  Search, 
  Database, 
  Users, 
  Bot, 
  Shield, 
  Eye, 
  TrendingUp,
  Activity,
  Zap,
  Target,
  Settings
} from "lucide-react";

interface IntelligenceNode {
  id: string;
  type: 'shodan' | 'news' | 'social' | 'domain' | 'geo' | 'threat' | 'tech' | 'financial';
  name: string;
  data: any;
  confidence: number;
  timestamp: string;
  source_api: string;
  verification_status: 'verified' | 'pending' | 'unverified';
  ai_analysis?: {
    summary: string;
    risk_score: number;
    key_insights: string[];
  };
}

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  capabilities: string[];
  status: 'active' | 'processing' | 'idle' | 'error';
  performance_metrics: {
    tasks_completed: number;
    success_rate: number;
    avg_processing_time: number;
    specialization_score: number;
  };
}

interface NexusIntelResult {
  intelligence_nodes: IntelligenceNode[];
  ai_orchestration_result: {
    primary_insights: string[];
    threat_assessment: string;
    confidence_score: number;
    recommendation_actions: string[];
    correlation_analysis: string;
    predictive_indicators: string[];
  };
  processing_metadata: {
    total_apis_queried: number;
    successful_queries: number;
    processing_time_ms: number;
    ai_models_used: string[];
    data_authenticity_score: number;
  };
}

interface MMA2MMASession {
  session_id: string;
  target: string;
  participating_agents: number;
  communication_events: number;
  collective_intelligence: {
    aggregated_findings: any[];
    consensus_confidence: number;
    disagreement_points: string[];
    final_assessment: any;
  };
  orchestration_mode: string;
}

interface AdvancedAgent {
  id: string;
  name: string;
  category: 'commander' | 'specialist' | 'coordinator' | 'analyst' | 'executor';
  primary_model: string;
  specialized_domains: string[];
  cognitive_abilities: {
    reasoning_depth: number;
    pattern_recognition: number;
    creative_synthesis: number;
    problem_solving: number;
    communication_skills: number;
  };
  operational_status: string;
  performance_metrics: {
    decisions_made: number;
    solutions_provided: number;
    collaboration_success_rate: number;
    innovation_score: number;
    adaptation_rate: number;
  };
}

interface AMMA2AMMASession {
  session_id: string;
  session_type: string;
  objective: string;
  participating_agents: number;
  cognitive_synergy_score: number;
  breakthrough_potential: number;
  collective_intelligence: {
    emergent_insights: number;
    consensus_models: number;
    innovation_catalysts: number;
    breakthrough_potential: number;
  };
  evolutionary_outcomes: {
    new_capabilities_discovered: string[];
    system_improvements: any[];
    paradigm_shifts: any[];
    future_directions: string[];
  };
  performance_summary: {
    total_decisions: number;
    average_innovation_score: number;
    collective_adaptation_rate: number;
  };
}

export default function NexusIntel2v() {
  const [target, setTarget] = useState('');
  const [activeTab, setActiveTab] = useState('intelligence');
  const [nexusResult, setNexusResult] = useState<NexusIntelResult | null>(null);
  const [mma2mmaSession, setMma2mmaSession] = useState<MMA2MMASession | null>(null);
  const [amma2ammaSession, setAmma2ammaSession] = useState<AMMA2AMMASession | null>(null);
  const [agents] = useState<Agent[]>([
    {
      id: 'osint-specialist',
      name: 'OSINT Specialist',
      role: 'intelligence_analyst',
      model: 'claude-sonnet-4',
      capabilities: ['web_scraping', 'data_correlation', 'threat_assessment'],
      status: 'active',
      performance_metrics: {
        tasks_completed: 47,
        success_rate: 0.94,
        avg_processing_time: 2.3,
        specialization_score: 0.89
      }
    },
    {
      id: 'social-media-analyzer',
      name: 'Social Media Analyzer',
      role: 'social_intelligence',
      model: 'gpt-4o',
      capabilities: ['sentiment_analysis', 'trend_detection', 'network_mapping'],
      status: 'processing',
      performance_metrics: {
        tasks_completed: 32,
        success_rate: 0.87,
        avg_processing_time: 3.1,
        specialization_score: 0.92
      }
    },
    {
      id: 'financial-analyst',
      name: 'Financial Analyst',
      role: 'financial_intelligence',
      model: 'gemini-pro',
      capabilities: ['market_analysis', 'financial_modeling', 'risk_assessment'],
      status: 'idle',
      performance_metrics: {
        tasks_completed: 28,
        success_rate: 0.91,
        avg_processing_time: 4.2,
        specialization_score: 0.85
      }
    },
    {
      id: 'technical-scanner',
      name: 'Technical Scanner',
      role: 'technical_analysis',
      model: 'grok-2',
      capabilities: ['vulnerability_scan', 'infrastructure_analysis', 'security_audit'],
      status: 'active',
      performance_metrics: {
        tasks_completed: 51,
        success_rate: 0.89,
        avg_processing_time: 1.8,
        specialization_score: 0.96
      }
    }
  ]);

  const [advancedAgents] = useState<AdvancedAgent[]>([
    {
      id: 'commander-alpha',
      name: 'Strategic Commander Alpha',
      category: 'commander',
      primary_model: 'claude-sonnet-4',
      specialized_domains: ['strategic_planning', 'resource_allocation', 'mission_coordination'],
      cognitive_abilities: {
        reasoning_depth: 0.95,
        pattern_recognition: 0.88,
        creative_synthesis: 0.82,
        problem_solving: 0.93,
        communication_skills: 0.91
      },
      operational_status: 'commanding',
      performance_metrics: {
        decisions_made: 234,
        solutions_provided: 89,
        collaboration_success_rate: 0.94,
        innovation_score: 0.87,
        adaptation_rate: 0.91
      }
    },
    {
      id: 'specialist-beta',
      name: 'Intelligence Specialist Beta',
      category: 'specialist',
      primary_model: 'gpt-4o',
      specialized_domains: ['deep_analysis', 'pattern_correlation', 'predictive_modeling'],
      cognitive_abilities: {
        reasoning_depth: 0.92,
        pattern_recognition: 0.96,
        creative_synthesis: 0.78,
        problem_solving: 0.89,
        communication_skills: 0.85
      },
      operational_status: 'analyzing',
      performance_metrics: {
        decisions_made: 156,
        solutions_provided: 127,
        collaboration_success_rate: 0.91,
        innovation_score: 0.83,
        adaptation_rate: 0.88
      }
    }
  ]);

  const nexusIntelMutation = useMutation({
    mutationFn: async (searchTarget: string) => {
      const response = await apiRequest('/api/nexus-intel-network', {
        method: 'POST',
        body: JSON.stringify({ 
          target: searchTarget,
          enable_ai_orchestration: true,
          orchestration_depth: 'comprehensive'
        })
      });
      return response;
    },
    onSuccess: (data) => {
      setNexusResult(data);
    }
  });

  const mma2mmaMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('/api/mma2mma-session', {
        method: 'POST',
        body: JSON.stringify({ 
          target,
          session_type: 'intelligence_analysis',
          participating_agents: 4
        })
      });
      return response;
    },
    onSuccess: (data) => {
      setMma2mmaSession(data);
    }
  });

  const amma2ammaMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('/api/amma2amma-session', {
        method: 'POST',
        body: JSON.stringify({ 
          objective: `Advanced intelligence analysis of ${target}`,
          session_type: 'strategic_planning',
          participating_agents: ['commander-alpha', 'specialist-beta']
        })
      });
      return response;
    },
    onSuccess: (data) => {
      setAmma2ammaSession(data);
    }
  });

  const handleNexusIntelSearch = () => {
    if (target.trim()) {
      nexusIntelMutation.mutate(target);
    }
  };

  const handleMMA2MMASession = () => {
    if (target.trim()) {
      mma2mmaMutation.mutate();
    }
  };

  const handleAMMA2AMMASession = () => {
    if (target.trim()) {
      amma2ammaMutation.mutate();
    }
  };

  const getNodeTypeColor = (type: string) => {
    const colors = {
      shodan: 'bg-red-600',
      news: 'bg-blue-600',
      social: 'bg-green-600',
      domain: 'bg-purple-600',
      geo: 'bg-yellow-600',
      threat: 'bg-orange-600',
      tech: 'bg-cyan-600',
      financial: 'bg-indigo-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-600';
  };

  const getAgentStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-400',
      processing: 'text-yellow-400',
      idle: 'text-gray-400',
      error: 'text-red-400'
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  const getThreatLevelColor = (level: string) => {
    const colors = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-orange-400',
      critical: 'text-red-400'
    };
    return colors[level?.toLowerCase() as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            NexusIntel 2.0v
          </h1>
          <p className="text-gray-400 text-lg">
            Advanced Smart Agentic AI Orchestration System
          </p>
        </div>

        {/* Search Interface */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="text-cyan-400" size={24} />
              Intelligence Target Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">Target (IP, Domain, Company, Person, etc.)</Label>
              <Input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter target for comprehensive intelligence analysis..."
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleNexusIntelSearch}
                disabled={!target.trim() || nexusIntelMutation.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {nexusIntelMutation.isPending ? (
                  <>
                    <Activity className="animate-spin mr-2" size={16} />
                    Processing NexusIntel...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2" size={16} />
                    Execute NexusIntel
                  </>
                )}
              </Button>

              <Button 
                onClick={handleMMA2MMASession}
                disabled={!target.trim() || mma2mmaMutation.isPending}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {mma2mmaMutation.isPending ? (
                  <>
                    <Activity className="animate-spin mr-2" size={16} />
                    Initiating MMA2MMA...
                  </>
                ) : (
                  <>
                    <Network className="mr-2" size={16} />
                    Initiate MMA2MMA
                  </>
                )}
              </Button>

              <Button 
                onClick={handleAMMA2AMMASession}
                disabled={!target.trim() || amma2ammaMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {amma2ammaMutation.isPending ? (
                  <>
                    <Activity className="animate-spin mr-2" size={16} />
                    Initiating AMMA2AMMA...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2" size={16} />
                    Initiate AMMA2AMMA
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger value="intelligence" className="text-white data-[state=active]:bg-purple-600">
              Intelligence Nodes
            </TabsTrigger>
            <TabsTrigger value="agents" className="text-white data-[state=active]:bg-cyan-600">
              Agentic Status
            </TabsTrigger>
            <TabsTrigger value="orchestration" className="text-white data-[state=active]:bg-green-600">
              AI Orchestration
            </TabsTrigger>
            <TabsTrigger value="mma2mma" className="text-white data-[state=active]:bg-orange-600">
              MMA2MMA Sessions
            </TabsTrigger>
          </TabsList>

          {/* Intelligence Nodes Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            {nexusResult && (
              <>
                {/* Processing Metadata */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Database className="text-purple-400" size={20} />
                      Processing Metadata
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {nexusResult.processing_metadata.total_apis_queried}
                        </div>
                        <div className="text-gray-400">APIs Queried</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {nexusResult.processing_metadata.successful_queries}
                        </div>
                        <div className="text-gray-400">Successful</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          {nexusResult.processing_metadata.processing_time_ms}ms
                        </div>
                        <div className="text-gray-400">Processing Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                          {nexusResult.processing_metadata.ai_models_used.length}
                        </div>
                        <div className="text-gray-400">AI Models</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">
                          {Math.round(nexusResult.processing_metadata.data_authenticity_score * 100)}%
                        </div>
                        <div className="text-gray-400">Authenticity</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Intelligence Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nexusResult.intelligence_nodes.map((node) => (
                    <Card key={node.id} className="bg-gray-800/50 border-gray-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getNodeTypeColor(node.type)} text-white`}>
                            {node.type.toUpperCase()}
                          </Badge>
                          <Badge variant={node.verification_status === 'verified' ? 'default' : 'outline'}>
                            {node.verification_status}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-sm font-medium line-clamp-2">
                          {node.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Confidence</span>
                            <span className="text-white">{Math.round(node.confidence * 100)}%</span>
                          </div>
                          <Progress value={node.confidence * 100} className="h-2" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-xs text-gray-400">Source API</div>
                          <div className="text-sm text-cyan-400 font-mono">{node.source_api}</div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-gray-400">Timestamp</div>
                          <div className="text-xs text-gray-300">
                            {new Date(node.timestamp).toLocaleString()}
                          </div>
                        </div>

                        {node.ai_analysis && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-gray-600">
                            <div className="text-xs font-medium text-purple-400">AI Analysis</div>
                            <div className="text-xs text-gray-300 line-clamp-2">
                              {node.ai_analysis.summary}
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Risk Score</span>
                              <span className="text-orange-400">{node.ai_analysis.risk_score}/10</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {!nexusResult && !nexusIntelMutation.isPending && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="text-center py-12">
                  <Brain className="mx-auto mb-4 text-gray-500" size={48} />
                  <p className="text-gray-400 text-lg">Execute NexusIntel analysis to view intelligence nodes</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Agentic Status Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="text-cyan-400" size={20} />
                  Multi-Modal Agents Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {agents.map((agent) => (
                    <Card key={agent.id} className="bg-gray-700/50 border-gray-600">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {agent.role.replace('_', ' ')}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' :
                            agent.status === 'processing' ? 'bg-yellow-500' :
                            agent.status === 'idle' ? 'bg-gray-500' : 'bg-red-500'
                          }`} />
                        </div>
                        <CardTitle className="text-white text-sm">
                          {agent.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-xs">
                          <div className="text-gray-400">Model</div>
                          <div className="text-cyan-400 font-mono">{agent.model}</div>
                        </div>
                        
                        <div className="text-xs">
                          <div className="text-gray-400">Status</div>
                          <div className={getAgentStatusColor(agent.status)}>
                            {agent.status.toUpperCase()}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-gray-400">Tasks</div>
                            <div className="text-white">{agent.performance_metrics.tasks_completed}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Success Rate</div>
                            <div className="text-green-400">
                              {Math.round(agent.performance_metrics.success_rate * 100)}%
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-gray-400">Capabilities</div>
                          <div className="flex flex-wrap gap-1">
                            {agent.capabilities.slice(0, 2).map((cap) => (
                              <Badge key={cap} variant="outline" className="text-xs px-1 py-0">
                                {cap.replace('_', ' ')}
                              </Badge>
                            ))}
                            {agent.capabilities.length > 2 && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                +{agent.capabilities.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Orchestration Tab */}
          <TabsContent value="orchestration" className="space-y-6">
            {nexusResult?.ai_orchestration_result && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Shield className="text-green-400" size={20} />
                        Threat Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className={`text-3xl font-bold ${getThreatLevelColor(nexusResult.ai_orchestration_result.threat_assessment)}`}>
                        {nexusResult.ai_orchestration_result.threat_assessment.toUpperCase()}
                      </div>
                      <Progress 
                        value={nexusResult.ai_orchestration_result.confidence_score * 100} 
                        className="mt-4" 
                      />
                      <p className="text-gray-400 text-sm mt-2">
                        Confidence: {Math.round(nexusResult.ai_orchestration_result.confidence_score * 100)}%
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Eye className="text-purple-400" size={20} />
                        Primary Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {nexusResult.ai_orchestration_result.primary_insights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="text-orange-400" size={20} />
                        Predictive Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {nexusResult.ai_orchestration_result.predictive_indicators.map((indicator, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">{indicator}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="text-cyan-400" size={20} />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nexusResult.ai_orchestration_result.recommendation_actions.map((action, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-300">{action}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!nexusResult?.ai_orchestration_result && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="text-center py-12">
                  <Zap className="mx-auto mb-4 text-gray-500" size={48} />
                  <p className="text-gray-400 text-lg">AI Orchestration results will appear here after analysis</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* MMA2MMA Sessions Tab */}
          <TabsContent value="mma2mma" className="space-y-6">
            {mma2mmaSession && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Network className="text-orange-400" size={20} />
                    Active MMA2MMA Session
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">
                        {mma2mmaSession.participating_agents}
                      </div>
                      <div className="text-gray-400 text-sm">Active Agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {mma2mmaSession.communication_events}
                      </div>
                      <div className="text-gray-400 text-sm">Communications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {Math.round(mma2mmaSession.collective_intelligence.consensus_confidence * 100)}%
                      </div>
                      <div className="text-gray-400 text-sm">Consensus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {mma2mmaSession.orchestration_mode.toUpperCase()}
                      </div>
                      <div className="text-gray-400 text-sm">Mode</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {amma2ammaSession && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bot className="text-green-400" size={20} />
                    Active AMMA2AMMA Session
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {amma2ammaSession.participating_agents}
                      </div>
                      <div className="text-gray-400 text-sm">Agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {Math.round(amma2ammaSession.cognitive_synergy_score * 100)}%
                      </div>
                      <div className="text-gray-400 text-sm">Synergy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">
                        {Math.round(amma2ammaSession.breakthrough_potential * 100)}%
                      </div>
                      <div className="text-gray-400 text-sm">Breakthrough</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {amma2ammaSession.collective_intelligence.emergent_insights}
                      </div>
                      <div className="text-gray-400 text-sm">Insights</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="text-cyan-400" size={20} />
                  Advanced Agent Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {advancedAgents.map((agent) => (
                    <Card key={agent.id} className="bg-gray-700/50 border-gray-600">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`text-xs ${
                            agent.category === 'commander' ? 'border-purple-400 text-purple-400' :
                            'border-cyan-400 text-cyan-400'
                          }`}>
                            {agent.category.toUpperCase()}
                          </Badge>
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <CardTitle className="text-white text-sm">
                          {agent.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xs">
                          <div className="text-gray-400">Primary Model</div>
                          <div className="text-cyan-400 font-mono">{agent.primary_model}</div>
                        </div>
                        
                        <div className="text-xs">
                          <div className="text-gray-400">Status</div>
                          <div className="text-green-400">{agent.operational_status.toUpperCase()}</div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Cognitive Abilities</div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Reasoning</span>
                              <span className="text-white">{Math.round(agent.cognitive_abilities.reasoning_depth * 100)}%</span>
                            </div>
                            <Progress value={agent.cognitive_abilities.reasoning_depth * 100} className="h-1" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Pattern Recognition</span>
                              <span className="text-white">{Math.round(agent.cognitive_abilities.pattern_recognition * 100)}%</span>
                            </div>
                            <Progress value={agent.cognitive_abilities.pattern_recognition * 100} className="h-1" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-gray-400">Decisions</div>
                            <div className="text-white">{agent.performance_metrics.decisions_made}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Innovation</div>
                            <div className="text-purple-400">
                              {Math.round(agent.performance_metrics.innovation_score * 100)}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {!mma2mmaSession && !amma2ammaSession && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="text-center py-12">
                  <Network className="mx-auto mb-4 text-gray-500" size={48} />
                  <p className="text-gray-400 text-lg">No active sessions. Start MMA2MMA or AMMA2AMMA orchestration</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}