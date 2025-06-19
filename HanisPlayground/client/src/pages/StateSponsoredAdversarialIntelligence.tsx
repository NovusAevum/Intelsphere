import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Eye, 
  Target, 
  Zap, 
  Brain, 
  Network, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  Database,
  Radar,
  Crosshair,
  Search,
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  MapPin,
  Clock,
  Settings
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface OperationResults {
  operation_id: string;
  target_entity: string;
  classification: string;
  operation_timestamp: string;
  aether_scan_results: {
    osint_intelligence: any[];
    target_prioritization: any[];
    metadata_correlations: any[];
    infrastructure_mapping: any[];
    vulnerability_assessment: any[];
  };
  exploitation_analysis: {
    attack_vectors: any[];
    payload_recommendations: any[];
    privilege_escalation_paths: any[];
    lateral_movement_opportunities: any[];
    persistence_mechanisms: any[];
  };
  deception_operations: {
    synthetic_personas: any[];
    false_flag_indicators: any[];
    attribution_misdirection: any[];
    telemetry_obfuscation: any[];
    behavioral_camouflage: any[];
  };
  threat_modeling: {
    mitre_attack_mapping: any[];
    adversary_simulation: any[];
    campaign_planning: any[];
    operational_security: any[];
    detection_evasion: any[];
  };
  strategic_assessment: {
    threat_level: string;
    operation_complexity: number;
    success_probability: number;
    detection_risk: number;
    strategic_value: number;
  };
}

export default function StateSponsoredAdversarialIntelligence() {
  const [targetEntity, setTargetEntity] = useState('');
  const [operationResults, setOperationResults] = useState<OperationResults | null>(null);
  const [operationProgress, setOperationProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const queryClient = useQueryClient();

  // Get GIDEON capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/state-sponsored/capabilities'],
    enabled: true
  });

  // Execute state-sponsored operation
  const operationMutation = useMutation({
    mutationFn: async (data: { targetEntity: string; options: any }) => {
      return await apiRequest('/api/state-sponsored/adversarial-operation', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      setOperationResults(data.operation_results);
      setIsExecuting(false);
      setOperationProgress(100);
      queryClient.invalidateQueries({ queryKey: ['/api/state-sponsored/capabilities'] });
    },
    onError: (error) => {
      console.error('Operation failed:', error);
      setIsExecuting(false);
      setOperationProgress(0);
    }
  });

  const executeOperation = async () => {
    if (!targetEntity.trim()) return;
    
    setIsExecuting(true);
    setOperationProgress(0);
    setOperationResults(null);

    // Simulate progress updates
    const phases = [
      'AETHER.SCAN - AI-Augmented OSINT Collection',
      'Exploitation Vector Analysis',
      'Deception Layer Operations',
      'Threat Modeling and MITRE ATT&CK Mapping',
      'Strategic Assessment'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setOperationProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    operationMutation.mutate({
      targetEntity,
      options: {
        operation_type: 'comprehensive_assessment',
        classification_level: 'CONFIDENTIAL',
        aether_scan: true,
        exploitation_analysis: true,
        deception_operations: true,
        threat_modeling: true,
        stealth_mode: true,
        attribution_misdirection: true
      }
    });
  };

  const getThreatLevelColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification?.toUpperCase()) {
      case 'TOP SECRET': return 'bg-red-600 text-white';
      case 'SECRET': return 'bg-orange-600 text-white';
      case 'CONFIDENTIAL': return 'bg-yellow-600 text-white';
      case 'UNCLASSIFIED': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-500/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">GIDEON FRAMEWORK</h1>
                <p className="text-sm text-green-300/70">Guided Interactive Deception and Offensive Networker</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={capabilities?.gideon_capabilities ? 'bg-green-600' : 'bg-red-600'}>
                {capabilities?.gideon_capabilities ? 'OPERATIONAL' : 'OFFLINE'}
              </Badge>
              <Badge className="bg-yellow-600">CONFIDENTIAL</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Operation Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Operation Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-green-300 mb-2 block">Target Entity</label>
                  <Input
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="example.com"
                    className="bg-black border-green-500/30 text-green-400"
                    disabled={isExecuting}
                  />
                </div>

                <Button
                  onClick={executeOperation}
                  disabled={!targetEntity.trim() || isExecuting}
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  {isExecuting ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      EXECUTING
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      EXECUTE OPERATION
                    </>
                  )}
                </Button>

                {isExecuting && (
                  <div className="space-y-2">
                    <div className="text-xs text-green-300">Phase: {currentPhase}</div>
                    <Progress value={operationProgress} className="bg-gray-800" />
                    <div className="text-xs text-green-300">{operationProgress}% Complete</div>
                  </div>
                )}

                {/* Capabilities Overview */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-semibold text-green-400">Active Capabilities</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span>AETHER.SCAN Module</span>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Exploitation Vectors</span>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deception Layer</span>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>MITRE ATT&CK Mapping</span>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Status */}
            {capabilities && (
              <Card className="bg-gray-900/50 border-green-500/30 mt-4">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Intelligence Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    {capabilities.gideon_capabilities?.authentication_apis?.map((api: string, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-green-300">{api}</span>
                        <CheckCircle className="h-3 w-3 text-green-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Results Panel */}
          <div className="lg:col-span-3">
            {operationResults ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-6 bg-gray-900/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="aether">AETHER.SCAN</TabsTrigger>
                  <TabsTrigger value="exploitation">Exploitation</TabsTrigger>
                  <TabsTrigger value="deception">Deception</TabsTrigger>
                  <TabsTrigger value="mitre">MITRE ATT&CK</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Operation ID</p>
                            <p className="font-mono text-green-400">{operationResults.operation_id}</p>
                          </div>
                          <Eye className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Threat Level</p>
                            <Badge className={getThreatLevelColor(operationResults.strategic_assessment.threat_level)}>
                              {operationResults.strategic_assessment.threat_level}
                            </Badge>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-orange-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Success Probability</p>
                            <p className="text-lg font-bold text-green-400">
                              {Math.round(operationResults.strategic_assessment.success_probability * 100)}%
                            </p>
                          </div>
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Classification</p>
                            <Badge className={getClassificationColor(operationResults.classification)}>
                              {operationResults.classification}
                            </Badge>
                          </div>
                          <Lock className="h-5 w-5 text-yellow-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gray-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">Strategic Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300">Operation Complexity</span>
                              <span className="text-green-400">{operationResults.strategic_assessment.operation_complexity}/10</span>
                            </div>
                            <Progress value={operationResults.strategic_assessment.operation_complexity * 10} className="bg-gray-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300">Detection Risk</span>
                              <span className="text-green-400">{Math.round(operationResults.strategic_assessment.detection_risk * 100)}%</span>
                            </div>
                            <Progress value={operationResults.strategic_assessment.detection_risk * 100} className="bg-gray-800" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300">Strategic Value</span>
                              <span className="text-green-400">{operationResults.strategic_assessment.strategic_value}/10</span>
                            </div>
                            <Progress value={operationResults.strategic_assessment.strategic_value * 10} className="bg-gray-800" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* AETHER.SCAN Tab */}
                <TabsContent value="aether" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Search className="mr-2 h-5 w-5" />
                          OSINT Intelligence
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          {operationResults.aether_scan_results.osint_intelligence.map((intel, index) => (
                            <div key={index} className="mb-3 p-3 bg-black/30 rounded border border-green-500/20">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-green-400 border-green-500">
                                  {intel.source}
                                </Badge>
                                <Badge variant="outline" className="text-blue-400">
                                  {Math.round(intel.confidence * 100)}% confidence
                                </Badge>
                              </div>
                              <p className="text-xs text-green-300">{intel.data_type}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {Array.isArray(intel.entries) ? `${intel.entries.length} entries` : 'Data collected'}
                              </p>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Users className="mr-2 h-5 w-5" />
                          Target Prioritization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          {operationResults.aether_scan_results.target_prioritization.map((target, index) => (
                            <div key={index} className="mb-3 p-3 bg-black/30 rounded border border-green-500/20">
                              <div className="flex justify-between items-start mb-2">
                                <p className="text-sm text-green-400 font-mono">{target.target}</p>
                                <Badge className="bg-orange-600 text-white">
                                  {Math.round(target.priority_score * 100)}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="text-green-300">Access:</span>
                                  <span className="ml-1 text-green-400">{Math.round(target.access_level * 100)}%</span>
                                </div>
                                <div>
                                  <span className="text-green-300">Risk:</span>
                                  <span className="ml-1 text-green-400">{Math.round(target.risk_posture * 100)}%</span>
                                </div>
                                <div>
                                  <span className="text-green-300">Response:</span>
                                  <span className="ml-1 text-green-400">{Math.round(target.response_likelihood * 100)}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Network className="mr-2 h-5 w-5" />
                          Infrastructure Mapping
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-32">
                          {operationResults.aether_scan_results.infrastructure_mapping.map((infra, index) => (
                            <div key={index} className="mb-2 p-2 bg-black/30 rounded text-xs">
                              <Badge variant="outline" className="text-green-400 mb-1">
                                {infra.mapping_type}
                              </Badge>
                              <p className="text-green-300">{infra.target_domain}</p>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5" />
                          Vulnerability Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-32">
                          {operationResults.aether_scan_results.vulnerability_assessment.map((vuln, index) => (
                            <div key={index} className="mb-2 p-2 bg-black/30 rounded text-xs">
                              <div className="flex justify-between items-center mb-1">
                                <Badge variant="outline" className="text-red-400">
                                  {vuln.vulnerability_type}
                                </Badge>
                                <Badge className={vuln.severity === 'high' ? 'bg-red-600' : vuln.severity === 'medium' ? 'bg-orange-600' : 'bg-yellow-600'}>
                                  {vuln.severity}
                                </Badge>
                              </div>
                              <p className="text-green-300">Complexity: {vuln.exploitation_complexity}</p>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Exploitation Tab */}
                <TabsContent value="exploitation" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Crosshair className="mr-2 h-5 w-5" />
                          Attack Vectors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          {operationResults.exploitation_analysis.attack_vectors.map((vector, index) => (
                            <div key={index} className="mb-3 p-3 bg-black/30 rounded border border-red-500/20">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-red-400 border-red-500">
                                  {vector.vector_type}
                                </Badge>
                                <Badge className="bg-blue-600 text-white">
                                  {vector.mitre_technique}
                                </Badge>
                              </div>
                              <div className="text-xs space-y-1">
                                <div>
                                  <span className="text-green-300">Complexity:</span>
                                  <span className="ml-1 text-green-400">{vector.attack_complexity}</span>
                                </div>
                                <div>
                                  <span className="text-green-300">Privileges:</span>
                                  <span className="ml-1 text-green-400">{vector.required_privileges}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Zap className="mr-2 h-5 w-5" />
                          Payload Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          {operationResults.exploitation_analysis.payload_recommendations.map((payload, index) => (
                            <div key={index} className="mb-3 p-3 bg-black/30 rounded border border-yellow-500/20">
                              <Badge variant="outline" className="text-yellow-400 border-yellow-500 mb-2">
                                {payload.payload_type}
                              </Badge>
                              <div className="text-xs space-y-1">
                                <div>
                                  <span className="text-green-300">Delivery:</span>
                                  <span className="ml-1 text-green-400">{payload.delivery_method}</span>
                                </div>
                                <div>
                                  <span className="text-green-300">Persistence:</span>
                                  <span className="ml-1 text-green-400">{payload.persistence_capability ? 'Yes' : 'No'}</span>
                                </div>
                                {payload.evasion_techniques && (
                                  <div>
                                    <span className="text-green-300">Evasion:</span>
                                    <span className="ml-1 text-green-400">{payload.evasion_techniques.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gray-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Privilege Escalation Paths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-32">
                        {operationResults.exploitation_analysis.privilege_escalation_paths.map((path, index) => (
                          <div key={index} className="mb-2 p-2 bg-black/30 rounded text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <Badge variant="outline" className="text-purple-400">
                                {path.escalation_path}
                              </Badge>
                              <span className="text-green-400">{Math.round(path.success_probability * 100)}% success</span>
                            </div>
                            <p className="text-green-300">Complexity: {path.escalation_complexity}</p>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Deception Tab */}
                <TabsContent value="deception" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Users className="mr-2 h-5 w-5" />
                          Synthetic Personas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-32">
                          {operationResults.deception_operations.synthetic_personas.map((persona, index) => (
                            <div key={index} className="mb-2 p-2 bg-black/30 rounded text-xs">
                              <Badge variant="outline" className="text-blue-400 mb-1">
                                {persona.persona_type}
                              </Badge>
                              <p className="text-green-300">{persona.backstory}</p>
                              <p className="text-gray-400 mt-1">Style: {persona.communication_style}</p>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Globe className="mr-2 h-5 w-5" />
                          Attribution Misdirection
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-32">
                          {operationResults.deception_operations.attribution_misdirection.map((misdirection, index) => (
                            <div key={index} className="mb-2 p-2 bg-black/30 rounded text-xs">
                              <Badge variant="outline" className="text-purple-400 mb-1">
                                {misdirection.misdirection_type}
                              </Badge>
                              <p className="text-green-300">Target: {misdirection.target_attribution}</p>
                              <p className="text-gray-400 mt-1">Effectiveness: {Math.round(misdirection.effectiveness * 100)}%</p>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* MITRE ATT&CK Tab */}
                <TabsContent value="mitre" className="space-y-4">
                  <Card className="bg-gray-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        MITRE ATT&CK Mapping
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        {operationResults.threat_modeling.mitre_attack_mapping.map((technique, index) => (
                          <div key={index} className="mb-3 p-3 bg-black/30 rounded border border-blue-500/20">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <Badge className="bg-blue-600 text-white mb-1">
                                  {technique.technique_id}
                                </Badge>
                                <p className="text-sm text-green-400 font-semibold">{technique.technique_name}</p>
                              </div>
                              <Badge variant="outline" className="text-orange-400">
                                {technique.tactic}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400">
                              Implementation: {technique.implementation_detail?.vector_type || 'Standard implementation'}
                            </p>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Assessment Tab */}
                <TabsContent value="assessment" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Clock className="mr-2 h-5 w-5" />
                          Operation Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-green-300">Operation Start</span>
                            <span className="text-green-400 font-mono">
                              {new Date(operationResults.operation_timestamp).toLocaleString()}
                            </span>
                          </div>
                          <Separator className="bg-green-500/30" />
                          <div className="flex items-center justify-between">
                            <span className="text-green-300">Target Entity</span>
                            <span className="text-green-400 font-mono">{operationResults.target_entity}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-green-300">Classification</span>
                            <Badge className={getClassificationColor(operationResults.classification)}>
                              {operationResults.classification}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Activity className="mr-2 h-5 w-5" />
                          Operation Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-green-300">OSINT Sources</p>
                            <p className="text-2xl font-bold text-green-400">
                              {operationResults.aether_scan_results.osint_intelligence.length}
                            </p>
                          </div>
                          <div>
                            <p className="text-green-300">Attack Vectors</p>
                            <p className="text-2xl font-bold text-green-400">
                              {operationResults.exploitation_analysis.attack_vectors.length}
                            </p>
                          </div>
                          <div>
                            <p className="text-green-300">Vulnerabilities</p>
                            <p className="text-2xl font-bold text-red-400">
                              {operationResults.aether_scan_results.vulnerability_assessment.length}
                            </p>
                          </div>
                          <div>
                            <p className="text-green-300">MITRE Techniques</p>
                            <p className="text-2xl font-bold text-blue-400">
                              {operationResults.threat_modeling.mitre_attack_mapping.length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="bg-gray-900/50 border-green-500/30">
                <CardContent className="p-12 text-center">
                  <Shield className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-green-400 mb-2">GIDEON Framework Ready</h2>
                  <p className="text-green-300 mb-4">
                    Enter a target entity and execute state-sponsored adversarial intelligence operations
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• AI-Augmented OSINT Collection (AETHER.SCAN)</p>
                    <p>• Exploitation Vector Analysis</p>
                    <p>• Deception Layer Operations</p>
                    <p>• MITRE ATT&CK Mapping</p>
                    <p>• Strategic Assessment</p>
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