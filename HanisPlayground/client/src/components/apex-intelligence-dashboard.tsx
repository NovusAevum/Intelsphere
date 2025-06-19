/**
 * APEX Intelligence Dashboard - Enterprise Command Center Interface
 * Real-time multi-domain intelligence monitoring and control
 */

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, AlertTriangle, Brain, Database, Eye, Globe, 
  Shield, Target, TrendingUp, Users, Zap, Clock, 
  CheckCircle, AlertCircle, Search, BarChart3, Network,
  Play, Pause, RefreshCw, Download, Settings
} from 'lucide-react';

interface CommandCenterMetrics {
  total_domains: number;
  active_agents: number;
  processing_queue_depth: number;
  real_time_feeds_active: number;
  intelligence_products_generated: number;
  fusion_correlations_identified: number;
  threat_alerts_active: number;
  operational_readiness: number;
}

interface OperationalDomain {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'standby' | 'degraded' | 'offline';
  priority: string;
  agent_count: number;
  intelligence_types: string[];
}

interface UnifiedOperation {
  operation_id: string;
  target: string;
  domains: string[];
  classification: string;
  urgency: 'immediate' | 'priority' | 'routine';
  scope: string[];
}

interface OperationResult {
  operation_id: string;
  status: 'completed' | 'partial' | 'failed';
  confidence_score: number;
  strategic_assessment: string;
  strategic_recommendations: string[];
  processing_timestamp: string;
}

interface RealTimeFeed {
  feed_id: string;
  intelligence_type: string;
  urgency: string;
  timestamp: string;
  summary: string;
}

export default function ApexIntelligenceDashboard() {
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['business_intelligence']);
  const [operationUrgency, setOperationUrgency] = useState<'immediate' | 'priority' | 'routine'>('routine');
  const [operationScope, setOperationScope] = useState<string[]>(['comprehensive']);
  const [realTimeFeeds, setRealTimeFeeds] = useState<RealTimeFeed[]>([]);
  const [isOperationActive, setIsOperationActive] = useState(false);

  const queryClient = useQueryClient();

  // Query command center status
  const { data: commandStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['/api/apex/unified/status'],
    refetchInterval: 10000 // Update every 10 seconds
  });

  // Query available domains
  const { data: domainsData, isLoading: domainsLoading } = useQuery({
    queryKey: ['/api/apex/unified/domains'],
    refetchInterval: 30000 // Update every 30 seconds
  });

  // Query intelligence sources
  const { data: sourcesData, isLoading: sourcesLoading } = useQuery({
    queryKey: ['/api/apex/sources'],
    refetchInterval: 15000 // Update every 15 seconds
  });

  // Unified intelligence operation mutation
  const unifiedOperationMutation = useMutation({
    mutationFn: async (operation: UnifiedOperation) => {
      const response = await fetch('/api/apex/unified/operation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(operation)
      });
      if (!response.ok) throw new Error('Operation failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/apex/unified/status'] });
      setIsOperationActive(false);
    },
    onError: () => {
      setIsOperationActive(false);
    }
  });

  // Execute unified intelligence operation
  const executeOperation = () => {
    if (!selectedTarget.trim()) return;
    
    setIsOperationActive(true);
    const operation: UnifiedOperation = {
      operation_id: `op_${Date.now()}`,
      target: selectedTarget,
      domains: selectedDomains,
      classification: 'commercial',
      urgency: operationUrgency,
      scope: operationScope
    };

    unifiedOperationMutation.mutate(operation);
  };

  // Simulate real-time intelligence feeds
  useEffect(() => {
    const interval = setInterval(() => {
      const newFeed: RealTimeFeed = {
        feed_id: `feed_${Date.now()}`,
        intelligence_type: ['threat_intel', 'market_data', 'news_intelligence', 'social_intel'][Math.floor(Math.random() * 4)],
        urgency: ['immediate', 'priority', 'routine'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString(),
        summary: generateFeedSummary()
      };

      setRealTimeFeeds(prev => [newFeed, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const generateFeedSummary = (): string => {
    const summaries = [
      'ASEAN market volatility detected in technology sector',
      'New cyber threat indicators identified targeting financial institutions',
      'Positive sentiment surge in Malaysian digital transformation initiatives',
      'Geopolitical development affecting regional trade agreements',
      'Social media intelligence indicates emerging consumer trends',
      'Financial intelligence reports increased investment activity in fintech'
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'degraded': return 'text-yellow-400 bg-yellow-900/20';
      case 'offline': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-400 border-red-400';
      case 'priority': return 'text-yellow-400 border-yellow-400';
      case 'routine': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              INTELSPHERE APEX
            </h1>
            <p className="text-slate-400 mt-2">Unified Intelligence Command Center</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400">
              OPERATIONAL
            </Badge>
            <div className="text-right">
              <div className="text-sm text-slate-400">System Status</div>
              <div className="text-lg font-bold text-green-400">
                {commandStatus?.operational_readiness ? 
                  `${(commandStatus.operational_readiness * 100).toFixed(1)}%` : 
                  'Initializing...'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Command Center Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Active Domains</div>
                  <div className="text-2xl font-bold text-white">
                    {commandStatus?.total_domains || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-sm text-slate-400">Active Agents</div>
                  <div className="text-2xl font-bold text-white">
                    {commandStatus?.active_agents || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-sm text-slate-400">Real-time Feeds</div>
                  <div className="text-2xl font-bold text-white">
                    {commandStatus?.real_time_feeds_active || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
                <div>
                  <div className="text-sm text-slate-400">Threat Alerts</div>
                  <div className="text-2xl font-bold text-white">
                    {commandStatus?.threat_alerts_active || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="operations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Operation Control */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Unified Intelligence Operation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="target">Target Identifier</Label>
                    <Input
                      id="target"
                      value={selectedTarget}
                      onChange={(e) => setSelectedTarget(e.target.value)}
                      placeholder="Enter organization, domain, or individual"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>

                  <div>
                    <Label>Intelligence Domains</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['business_intelligence', 'cyber_intelligence', 'financial_intelligence', 'osint_operations'].map(domain => (
                        <label key={domain} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedDomains.includes(domain)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedDomains([...selectedDomains, domain]);
                              } else {
                                setSelectedDomains(selectedDomains.filter(d => d !== domain));
                              }
                            }}
                            className="rounded border-gray-600"
                          />
                          <span className="text-sm text-slate-300 capitalize">
                            {domain.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Operation Urgency</Label>
                    <Select value={operationUrgency} onValueChange={(value: any) => setOperationUrgency(value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="immediate">Immediate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={executeOperation}
                    disabled={!selectedTarget.trim() || isOperationActive || unifiedOperationMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isOperationActive || unifiedOperationMutation.isPending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing Operation...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Execute Operation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Operation Results */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-400" />
                    Operation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {unifiedOperationMutation.data ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Operation ID</span>
                        <span className="text-sm font-mono text-white">
                          {unifiedOperationMutation.data.operation_result.operation_id}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Status</span>
                        <Badge className={getStatusColor(unifiedOperationMutation.data.operation_result.status)}>
                          {unifiedOperationMutation.data.operation_result.status}
                        </Badge>
                      </div>

                      <div>
                        <span className="text-sm text-slate-400">Strategic Assessment</span>
                        <p className="text-sm text-white mt-1">
                          {unifiedOperationMutation.data.operation_result.command_assessment}
                        </p>
                      </div>

                      {unifiedOperationMutation.data.operation_result.strategic_recommendations && (
                        <div>
                          <span className="text-sm text-slate-400">Recommendations</span>
                          <ul className="text-sm text-white mt-1 space-y-1">
                            {unifiedOperationMutation.data.operation_result.strategic_recommendations.slice(0, 3).map((rec: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      Execute an operation to view results
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Domains Tab */}
          <TabsContent value="domains" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {domainsData?.domains.map((domain: OperationalDomain) => (
                <Card key={domain.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{domain.name}</h3>
                      <Badge className={getStatusColor(domain.status)}>
                        {domain.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type</span>
                        <span className="text-white capitalize">{domain.type}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-400">Priority</span>
                        <span className="text-white capitalize">{domain.priority}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-400">Agents</span>
                        <span className="text-white">{domain.agent_count}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-slate-400 mb-1">Intelligence Types</div>
                      <div className="flex flex-wrap gap-1">
                        {domain.intelligence_types.slice(0, 3).map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Real-time Intelligence Feeds */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-400" />
                    Real-time Intelligence Feeds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {realTimeFeeds.map((feed) => (
                      <div key={feed.feed_id} className="border border-gray-600 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getUrgencyColor(feed.urgency)}>
                            {feed.urgency}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {new Date(feed.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="text-sm text-slate-300 mb-1 capitalize">
                          {feed.intelligence_type.replace('_', ' ')}
                        </div>
                        
                        <p className="text-sm text-white">
                          {feed.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Intelligence Sources Status */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-blue-400" />
                    Intelligence Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sourcesData?.sources && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Sources</span>
                        <span className="text-white">{sourcesData.total_sources}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {sourcesData.sources.slice(0, 8).map((source: any) => (
                          <div key={source.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                source.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-sm text-white capitalize">
                                {source.type.replace('_', ' ')}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">
                                {source.reliability}% reliable
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {source.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* System Performance */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    System Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Processing Queue</span>
                      <span className="text-white">{commandStatus?.processing_queue_depth || 0}</span>
                    </div>
                    <Progress 
                      value={(commandStatus?.processing_queue_depth || 0) * 10} 
                      className="h-2" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Operational Readiness</span>
                      <span className="text-white">
                        {commandStatus?.operational_readiness ? 
                          `${(commandStatus.operational_readiness * 100).toFixed(1)}%` : 
                          '0%'
                        }
                      </span>
                    </div>
                    <Progress 
                      value={(commandStatus?.operational_readiness || 0) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Intelligence Products Generated</span>
                      <span className="text-white">{commandStatus?.intelligence_products_generated || 0}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Fusion Correlations</span>
                      <span className="text-white">{commandStatus?.fusion_correlations_identified || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {domainsData?.domains.filter((d: any) => d.status === 'active').length || 0}
                      </div>
                      <div className="text-xs text-slate-400">Active Domains</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {sourcesData?.sources.filter((s: any) => s.status === 'active').length || 0}
                      </div>
                      <div className="text-xs text-slate-400">Active Sources</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">All critical systems operational</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">Real-time feeds processing normally</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">Intelligence correlation active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}