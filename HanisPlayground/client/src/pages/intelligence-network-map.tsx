import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Network, 
  Brain, 
  Eye, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Activity,
  Target,
  Layers,
  Cpu,
  Database,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Command
} from "lucide-react";

interface NetworkNode {
  id: string;
  name: string;
  type: 'person' | 'organization' | 'location' | 'digital_asset' | 'threat_indicator';
  credibility: number;
  connections: string[];
  metadata: {
    url?: string;
    description: string;
    lastUpdated: string;
    dataPoints: number;
    verified: boolean;
  };
  position: { x: number; y: number };
  status: 'active' | 'pending' | 'inactive';
}

interface IntelligenceNetwork {
  nodes: NetworkNode[];
  connections: Array<{
    source: string;
    target: string;
    strength: number;
    type: string;
  }>;
  metadata: {
    target: string;
    analysis_depth: string;
    confidence_score: number;
    total_sources: number;
    last_updated: string;
  };
}

interface AMMA2AMMAStatus {
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
}

export default function IntelligenceNetworkMap() {
  const [activeTab, setActiveTab] = useState('network');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [analysisDepth, setAnalysisDepth] = useState('comprehensive');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [commanderMode, setCommanderMode] = useState(false);
  const [amma2ammaObjective, setAmma2ammaObjective] = useState('');

  const queryClient = useQueryClient();

  // Fetch intelligence network data
  const { data: networkData, isLoading: networkLoading } = useQuery({
    queryKey: ['/api/osint/network-analysis'],
    enabled: !!selectedTarget,
  });

  // Fetch AMMA2AMMA status
  const { data: amma2ammaStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['/api/amma2amma-status'],
    refetchInterval: 5000,
  });

  // Generate intelligence network
  const generateNetworkMutation = useMutation({
    mutationFn: async (params: { target: string; depth: string }) => {
      return apiRequest('/api/osint/analyze', {
        method: 'POST',
        body: JSON.stringify({
          target: params.target,
          analysisDepth: params.depth,
          platforms: ['social_media', 'web_search', 'deep_web', 'public_records'],
          includeNetworkMap: true
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/osint/network-analysis'] });
    },
  });

  // Create AMMA2AMMA intelligence session
  const createAmma2ammaSessionMutation = useMutation({
    mutationFn: async (objective: string) => {
      return apiRequest('/api/amma2amma-session', {
        method: 'POST',
        body: JSON.stringify({
          session_type: 'intelligence_coordination',
          objective: objective,
          required_capabilities: ['network_analysis', 'threat_assessment', 'data_correlation']
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/amma2amma-status'] });
      setCommanderMode(true);
    },
  });

  const handleGenerateNetwork = () => {
    if (!selectedTarget) return;
    generateNetworkMutation.mutate({ target: selectedTarget, depth: analysisDepth });
  };

  const handleActivateCommander = () => {
    if (!amma2ammaObjective) return;
    createAmma2ammaSessionMutation.mutate(amma2ammaObjective);
  };

  const renderNetworkVisualization = () => {
    if (!networkData?.network) {
      return (
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <Network className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No Network Data</h3>
            <p className="mt-1 text-sm text-gray-500">Generate an intelligence network to visualize connections</p>
          </div>
        </div>
      );
    }

    const network: IntelligenceNetwork = networkData.network;

    return (
      <div className="space-y-4">
        {/* Network Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Network Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{network.nodes.length}</div>
                <div className="text-sm text-gray-500">Nodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{network.connections.length}</div>
                <div className="text-sm text-gray-500">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{network.metadata.total_sources}</div>
                <div className="text-sm text-gray-500">Sources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{Math.round(network.metadata.confidence_score * 100)}%</div>
                <div className="text-sm text-gray-500">Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {network.nodes.map((node) => (
            <Card 
              key={node.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedNode(node)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{node.name}</CardTitle>
                  <Badge variant={node.status === 'active' ? 'default' : 'secondary'}>
                    {node.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {node.type.replace('_', ' ')}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {Math.round(node.credibility * 100)}% credible
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {node.metadata.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{node.metadata.dataPoints} data points</span>
                    {node.metadata.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAmma2ammaCommander = () => {
    return (
      <div className="space-y-6">
        {/* Commander Status */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Command className="h-5 w-5 text-purple-600" />
              AMMA2AMMA Intelligence Commander
              {commanderMode && <Badge className="bg-purple-600">Active</Badge>}
            </CardTitle>
            <CardDescription>
              Advanced Multi-Modal AI to Advanced Multi-Modal AI orchestration for intelligence operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Textarea
                    placeholder="Enter intelligence objective for AMMA2AMMA coordination..."
                    value={amma2ammaObjective}
                    onChange={(e) => setAmma2ammaObjective(e.target.value)}
                    className="min-h-20"
                  />
                </div>
                <Button 
                  onClick={handleActivateCommander}
                  disabled={!amma2ammaObjective || createAmma2ammaSessionMutation.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Activate Commander
                </Button>
              </div>

              {amma2ammaStatus?.data?.session_details && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {amma2ammaStatus.data.session_details.map((session: AMMA2AMMAStatus) => (
                    <Card key={session.session_id} className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          {session.session_type.replace('_', ' ').toUpperCase()}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400">{session.objective}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-medium">{session.participating_agents}</span>
                              <div className="text-gray-500">Agents</div>
                            </div>
                            <div>
                              <span className="font-medium">{Math.round(session.cognitive_synergy_score * 100)}%</span>
                              <div className="text-gray-500">Synergy</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-medium">Collective Intelligence:</div>
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              <span>Insights: {session.collective_intelligence.emergent_insights}</span>
                              <span>Models: {session.collective_intelligence.consensus_models}</span>
                              <span>Catalysts: {session.collective_intelligence.innovation_catalysts}</span>
                              <span>Potential: {Math.round(session.collective_intelligence.breakthrough_potential * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Evolution Status */}
        {amma2ammaStatus?.data?.system_evolution && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                System Evolution Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {amma2ammaStatus.data.system_evolution.total_agents}
                  </div>
                  <div className="text-sm text-gray-500">Total Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {amma2ammaStatus.data.system_evolution.commanders}
                  </div>
                  <div className="text-sm text-gray-500">Commanders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {amma2ammaStatus.data.system_evolution.specialists}
                  </div>
                  <div className="text-sm text-gray-500">Specialists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(amma2ammaStatus.data.system_evolution.average_innovation_score * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">Innovation Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Intelligence Network Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Visualize intelligence networks with AMMA2AMMA commander integration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Activity className="h-3 w-3 mr-1" />
            Real-time Analysis
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Network className="h-3 w-3 mr-1" />
            Network Mapping
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network View
          </TabsTrigger>
          <TabsTrigger value="commander" className="flex items-center gap-2">
            <Command className="h-4 w-4" />
            AMMA2AMMA Commander
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Intelligence Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          {/* Network Generation Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Intelligence Network</CardTitle>
              <CardDescription>
                Create a comprehensive network map from intelligence analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Target</label>
                  <Input
                    placeholder="Enter target for network analysis..."
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                  />
                </div>
                <div className="w-48">
                  <label className="text-sm font-medium mb-2 block">Analysis Depth</label>
                  <Select value={analysisDepth} onValueChange={setAnalysisDepth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      <SelectItem value="deep">Deep Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleGenerateNetwork}
                  disabled={!selectedTarget || generateNetworkMutation.isPending}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Generate Network
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Network Visualization */}
          {renderNetworkVisualization()}
        </TabsContent>

        <TabsContent value="commander" className="space-y-6">
          {renderAmma2ammaCommander()}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {selectedNode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Node Analysis: {selectedNode.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type</label>
                      <div className="capitalize">{selectedNode.type.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Credibility</label>
                      <div>{Math.round(selectedNode.credibility * 100)}%</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Connections</label>
                      <div>{selectedNode.connections.length}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <Badge variant={selectedNode.status === 'active' ? 'default' : 'secondary'}>
                        {selectedNode.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1">{selectedNode.metadata.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Data Points</label>
                      <div>{selectedNode.metadata.dataPoints}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Updated</label>
                      <div>{new Date(selectedNode.metadata.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}