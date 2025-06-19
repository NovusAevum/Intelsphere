import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Ghost, 
  Brain, 
  UserCheck, 
  Network, 
  Eye, 
  Target, 
  Shield,
  Activity,
  Search,
  Users,
  Fingerprint,
  Map,
  AlertTriangle,
  Database,
  Clock,
  Crosshair
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface GreyCellResults {
  operation_id: string;
  target_entity: string;
  infiltration_timestamp: string;
  behavioral_mapping: {
    digital_footprint: any[];
    communication_patterns: any[];
    access_patterns: any[];
    vulnerability_indicators: any[];
  };
  psychological_profiling: {
    personality_assessment: any[];
    social_engineering_vectors: any[];
    decision_making_patterns: any[];
    stress_indicators: any[];
  };
  organizational_infiltration: {
    hierarchy_mapping: any[];
    trust_relationships: any[];
    information_flow: any[];
    security_gaps: any[];
  };
  surveillance_optimization: {
    monitoring_points: any[];
    data_collection_vectors: any[];
    stealth_metrics: any[];
    detection_avoidance: any[];
  };
  operational_recommendations: {
    infiltration_vectors: any[];
    social_engineering_tactics: any[];
    persistence_mechanisms: any[];
    exfiltration_routes: any[];
  };
}

export default function GreyCellInfiltrationProtocol() {
  const [targetEntity, setTargetEntity] = useState('');
  const [infiltrationResults, setInfiltrationResults] = useState<GreyCellResults | null>(null);
  const [operationProgress, setOperationProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const queryClient = useQueryClient();

  // Get GreyCell capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/gideon/capabilities'],
    enabled: true
  });

  // Execute GreyCell infiltration
  const infiltrationMutation = useMutation({
    mutationFn: async (data: { target: string }) => {
      return await apiRequest('/api/greycell/infiltration-recon', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      setInfiltrationResults(data.greycell_recon_results);
      setIsExecuting(false);
      setOperationProgress(100);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon/capabilities'] });
    },
    onError: (error) => {
      console.error('GreyCell infiltration failed:', error);
      setIsExecuting(false);
      setOperationProgress(0);
    }
  });

  const executeInfiltration = async () => {
    if (!targetEntity.trim()) return;
    
    setIsExecuting(true);
    setOperationProgress(0);
    setInfiltrationResults(null);

    const phases = [
      'Behavioral Mapping and Digital Footprint Analysis',
      'Psychological Profiling and Assessment',
      'Organizational Structure Infiltration',
      'Surveillance Optimization and Stealth Metrics',
      'Operational Recommendations and Vector Analysis'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setOperationProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    infiltrationMutation.mutate({ target: targetEntity });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Ghost className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold text-purple-400">GREYCELL INFILTRATION PROTOCOL</h1>
                <p className="text-sm text-purple-300/70">Advanced Behavioral Reconnaissance & Psychological Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={capabilities?.gideon_capabilities ? 'bg-purple-600' : 'bg-red-600'}>
                {capabilities?.gideon_capabilities ? 'ACTIVE' : 'STANDBY'}
              </Badge>
              <Badge className="bg-gray-700">CLASSIFIED</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Operation Control */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Infiltration Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-purple-300 mb-2 block">Target Entity</label>
                  <Input
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="organization.com"
                    className="bg-gray-950 border-purple-500/30 text-purple-100"
                    disabled={isExecuting}
                  />
                </div>

                <Button
                  onClick={executeInfiltration}
                  disabled={!targetEntity.trim() || isExecuting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  {isExecuting ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      INFILTRATING
                    </>
                  ) : (
                    <>
                      <Ghost className="mr-2 h-4 w-4" />
                      EXECUTE INFILTRATION
                    </>
                  )}
                </Button>

                {isExecuting && (
                  <div className="space-y-2">
                    <div className="text-xs text-purple-300">Phase: {currentPhase}</div>
                    <Progress value={operationProgress} className="bg-gray-800" />
                    <div className="text-xs text-purple-300">{operationProgress}% Complete</div>
                  </div>
                )}

                {/* Infiltration Modules */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-semibold text-purple-400">Active Modules</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Brain className="mr-1 h-3 w-3" />Behavioral Mapping</span>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><UserCheck className="mr-1 h-3 w-3" />Psychological Profiling</span>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Network className="mr-1 h-3 w-3" />Organizational Analysis</span>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Eye className="mr-1 h-3 w-3" />Surveillance Optimization</span>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stealth Metrics */}
            <Card className="bg-gray-900/50 border-purple-500/30 mt-4">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Stealth Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-purple-300">Detection Avoidance</span>
                      <span className="text-purple-400">97%</span>
                    </div>
                    <Progress value={97} className="bg-gray-800" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-purple-300">Operational Security</span>
                      <span className="text-purple-400">94%</span>
                    </div>
                    <Progress value={94} className="bg-gray-800" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-purple-300">Attribution Masking</span>
                      <span className="text-purple-400">99%</span>
                    </div>
                    <Progress value={99} className="bg-gray-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Results Panel */}
          <div className="lg:col-span-3">
            {infiltrationResults ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5 bg-gray-900/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                  <TabsTrigger value="psychological">Psychological</TabsTrigger>
                  <TabsTrigger value="organizational">Organizational</TabsTrigger>
                  <TabsTrigger value="surveillance">Surveillance</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-purple-300">Operation ID</p>
                            <p className="font-mono text-purple-400">{infiltrationResults.operation_id}</p>
                          </div>
                          <Ghost className="h-5 w-5 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-purple-300">Target Entity</p>
                            <p className="text-sm text-purple-400 font-mono">{infiltrationResults.target_entity}</p>
                          </div>
                          <Target className="h-5 w-5 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-purple-300">Infiltration Vectors</p>
                            <p className="text-lg font-bold text-purple-400">
                              {infiltrationResults.operational_recommendations?.infiltration_vectors?.length || 0}
                            </p>
                          </div>
                          <Crosshair className="h-5 w-5 text-red-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-purple-300">Security Gaps</p>
                            <p className="text-lg font-bold text-red-400">
                              {infiltrationResults.organizational_infiltration?.security_gaps?.length || 0}
                            </p>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400">Infiltration Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-purple-300 flex items-center">
                                <Brain className="mr-1 h-4 w-4" />
                                Behavioral Mapping
                              </span>
                              <span className="text-purple-400">{infiltrationResults.behavioral_mapping?.digital_footprint?.length || 0} patterns</span>
                            </div>
                            <Progress value={85} className="bg-gray-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-purple-300 flex items-center">
                                <UserCheck className="mr-1 h-4 w-4" />
                                Psychological Profiling
                              </span>
                              <span className="text-purple-400">{infiltrationResults.psychological_profiling?.personality_assessment?.length || 0} profiles</span>
                            </div>
                            <Progress value={78} className="bg-gray-800" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-purple-300 flex items-center">
                                <Network className="mr-1 h-4 w-4" />
                                Organizational Infiltration
                              </span>
                              <span className="text-purple-400">{infiltrationResults.organizational_infiltration?.hierarchy_mapping?.length || 0} levels</span>
                            </div>
                            <Progress value={92} className="bg-gray-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-purple-300 flex items-center">
                                <Eye className="mr-1 h-4 w-4" />
                                Surveillance Optimization
                              </span>
                              <span className="text-purple-400">{infiltrationResults.surveillance_optimization?.monitoring_points?.length || 0} points</span>
                            </div>
                            <Progress value={88} className="bg-gray-800" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Behavioral Tab */}
                <TabsContent value="behavioral" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Fingerprint className="mr-2 h-5 w-5" />
                          Digital Footprint Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-purple-300 text-sm py-8">
                            <Fingerprint className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Digital footprint mapping active</p>
                            <p className="text-xs text-gray-400 mt-1">Analyzing communication patterns and access behaviors</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Activity className="mr-2 h-5 w-5" />
                          Communication Patterns
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-purple-300 text-sm py-8">
                            <Activity className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Communication pattern analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Identifying behavioral vulnerabilities</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Vulnerability Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-32">
                        <div className="text-center text-purple-300 text-sm py-8">
                          <AlertTriangle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Behavioral vulnerability assessment in progress</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Psychological Tab */}
                <TabsContent value="psychological" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Brain className="mr-2 h-5 w-5" />
                          Personality Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-purple-300 text-sm py-8">
                            <Brain className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Psychological profiling active</p>
                            <p className="text-xs text-gray-400 mt-1">Deep personality analysis and behavioral prediction</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Users className="mr-2 h-5 w-5" />
                          Social Engineering Vectors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-purple-300 text-sm py-8">
                            <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Social engineering vector analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Identifying optimal manipulation strategies</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Organizational Tab */}
                <TabsContent value="organizational" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Map className="mr-2 h-5 w-5" />
                          Hierarchy Mapping
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-purple-300 text-sm py-8">
                            <Map className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Organizational structure analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Mapping command and control relationships</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Network className="mr-2 h-5 w-5" />
                          Trust Relationships
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-purple-300 text-sm py-8">
                            <Network className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Trust network analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Identifying influence pathways</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Surveillance Tab */}
                <TabsContent value="surveillance" className="space-y-4">
                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center">
                        <Eye className="mr-2 h-5 w-5" />
                        Surveillance Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-purple-300 text-sm py-8">
                          <Eye className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Surveillance optimization analysis</p>
                          <p className="text-xs text-gray-400 mt-1">Monitoring point identification and stealth metrics</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="bg-gray-900/50 border-purple-500/30">
                <CardContent className="p-12 text-center">
                  <Ghost className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-purple-400 mb-2">GreyCell Protocol Ready</h2>
                  <p className="text-purple-300 mb-4">
                    Enter target entity for advanced behavioral reconnaissance
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Behavioral Mapping & Digital Footprint Analysis</p>
                    <p>• Psychological Profiling & Social Engineering Vectors</p>
                    <p>• Organizational Infiltration & Trust Network Analysis</p>
                    <p>• Surveillance Optimization & Stealth Metrics</p>
                    <p>• Operational Recommendations & Vector Analysis</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}