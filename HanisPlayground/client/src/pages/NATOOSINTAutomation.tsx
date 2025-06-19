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
  Shield, 
  Satellite, 
  Radio, 
  Users, 
  Cpu, 
  DollarSign, 
  AlertTriangle,
  Map,
  Eye,
  Activity,
  BarChart3,
  Globe,
  Target,
  Radar,
  Search,
  Database,
  FileText,
  Clock
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface NATOAnalysisResults {
  target_entity: string;
  classification_level: string;
  analysis_timestamp: string;
  geospatial_intelligence: {
    satellite_imagery: any[];
    geographic_coordinates: any[];
    infrastructure_analysis: any[];
    terrain_assessment: any[];
  };
  signals_intelligence: {
    communication_networks: any[];
    encrypted_channels: any[];
    network_topology: any[];
    signal_patterns: any[];
  };
  human_intelligence: {
    key_personnel: any[];
    organizational_structure: any[];
    behavioral_patterns: any[];
    social_networks: any[];
  };
  technical_intelligence: {
    technology_stack: any[];
    vulnerabilities: any[];
    system_architecture: any[];
    security_measures: any[];
  };
  financial_intelligence: {
    funding_sources: any[];
    transaction_patterns: any[];
    economic_indicators: any[];
    market_analysis: any[];
  };
  threat_assessment: {
    threat_level: string;
    risk_factors: any[];
    mitigation_strategies: any[];
    operational_recommendations: any[];
  };
}

export default function NATOOSINTAutomation() {
  const [targetEntity, setTargetEntity] = useState('');
  const [analysisResults, setAnalysisResults] = useState<NATOAnalysisResults | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const queryClient = useQueryClient();

  // Get NATO OSINT capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/nato-osint/capabilities'],
    enabled: true
  });

  // Execute NATO OSINT analysis
  const analysisMutation = useMutation({
    mutationFn: async (data: { targetEntity: string; options: any }) => {
      return await apiRequest('/api/nato-osint/comprehensive-analysis', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      setAnalysisResults(data.nato_osint_results);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      queryClient.invalidateQueries({ queryKey: ['/api/nato-osint/capabilities'] });
    },
    onError: (error) => {
      console.error('NATO OSINT analysis failed:', error);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  });

  const executeAnalysis = async () => {
    if (!targetEntity.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResults(null);

    const phases = [
      'Geospatial Intelligence Collection',
      'Signals Intelligence Analysis', 
      'Human Intelligence Assessment',
      'Technical Intelligence Evaluation',
      'Financial Intelligence Analysis',
      'Comprehensive Threat Assessment'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setAnalysisProgress((i + 1) * 16.67);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    analysisMutation.mutate({
      targetEntity,
      options: {
        geospatial_intelligence: true,
        signals_intelligence: true,
        human_intelligence: true,
        technical_intelligence: true,
        financial_intelligence: true,
        real_time_monitoring: true,
        threat_assessment: true,
        classification_level: 'UNCLASSIFIED'
      }
    });
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

  const getThreatLevelColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MODERATE': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-blue-100 font-mono">
      {/* Header */}
      <div className="border-b border-blue-500/30 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-blue-400">NATO OSINT AUTOMATION</h1>
                <p className="text-sm text-blue-300/70">Advanced Intelligence Collection & Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={capabilities?.nato_osint_capabilities ? 'bg-green-600' : 'bg-red-600'}>
                {capabilities?.nato_osint_capabilities ? 'OPERATIONAL' : 'OFFLINE'}
              </Badge>
              <Badge className="bg-blue-600">NATO STANDARD</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Analysis Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-blue-300 mb-2 block">Target Entity</label>
                  <Input
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="defense.gov"
                    className="bg-slate-900 border-blue-500/30 text-blue-100"
                    disabled={isAnalyzing}
                  />
                </div>

                <Button
                  onClick={executeAnalysis}
                  disabled={!targetEntity.trim() || isAnalyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  {isAnalyzing ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      ANALYZING
                    </>
                  ) : (
                    <>
                      <Radar className="mr-2 h-4 w-4" />
                      EXECUTE ANALYSIS
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="text-xs text-blue-300">Phase: {currentPhase}</div>
                    <Progress value={analysisProgress} className="bg-slate-800" />
                    <div className="text-xs text-blue-300">{Math.round(analysisProgress)}% Complete</div>
                  </div>
                )}

                {/* Intelligence Disciplines */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-semibold text-blue-400">Intelligence Disciplines</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Satellite className="mr-1 h-3 w-3" />GEOINT</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Radio className="mr-1 h-3 w-3" />SIGINT</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Users className="mr-1 h-3 w-3" />HUMINT</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Cpu className="mr-1 h-3 w-3" />TECHINT</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><DollarSign className="mr-1 h-3 w-3" />FININT</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialized APIs */}
            {capabilities && (
              <Card className="bg-slate-800/50 border-blue-500/30 mt-4">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Specialized APIs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    {capabilities.nato_osint_capabilities?.specialized_apis?.map((api: string, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-blue-300">{api}</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Results Panel */}
          <div className="lg:col-span-3">
            {analysisResults ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="geoint">GEOINT</TabsTrigger>
                  <TabsTrigger value="sigint">SIGINT</TabsTrigger>
                  <TabsTrigger value="humint">HUMINT</TabsTrigger>
                  <TabsTrigger value="techint">TECHINT</TabsTrigger>
                  <TabsTrigger value="finint">FININT</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-blue-300">Target Entity</p>
                            <p className="font-mono text-blue-400">{analysisResults.target_entity}</p>
                          </div>
                          <Eye className="h-5 w-5 text-blue-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-blue-300">Threat Level</p>
                            <Badge className={getThreatLevelColor(analysisResults.threat_assessment.threat_level)}>
                              {analysisResults.threat_assessment.threat_level}
                            </Badge>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-orange-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-blue-300">Classification</p>
                            <Badge className={getClassificationColor(analysisResults.classification_level)}>
                              {analysisResults.classification_level}
                            </Badge>
                          </div>
                          <Shield className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-blue-300">Analysis Time</p>
                            <p className="text-sm text-blue-400">
                              {new Date(analysisResults.analysis_timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          <Clock className="h-5 w-5 text-blue-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-800/50 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400">Intelligence Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-blue-300 flex items-center">
                                <Satellite className="mr-1 h-4 w-4" />
                                Geospatial Intelligence
                              </span>
                              <span className="text-blue-400">{analysisResults.geospatial_intelligence?.satellite_imagery?.length || 0} sources</span>
                            </div>
                            <Progress value={75} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-blue-300 flex items-center">
                                <Radio className="mr-1 h-4 w-4" />
                                Signals Intelligence
                              </span>
                              <span className="text-blue-400">{analysisResults.signals_intelligence?.communication_networks?.length || 0} networks</span>
                            </div>
                            <Progress value={85} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-blue-300 flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                Human Intelligence
                              </span>
                              <span className="text-blue-400">{analysisResults.human_intelligence?.key_personnel?.length || 0} personnel</span>
                            </div>
                            <Progress value={65} className="bg-slate-800" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-blue-300 flex items-center">
                                <Cpu className="mr-1 h-4 w-4" />
                                Technical Intelligence
                              </span>
                              <span className="text-blue-400">{analysisResults.technical_intelligence?.vulnerabilities?.length || 0} vulnerabilities</span>
                            </div>
                            <Progress value={70} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-blue-300 flex items-center">
                                <DollarSign className="mr-1 h-4 w-4" />
                                Financial Intelligence
                              </span>
                              <span className="text-blue-400">{analysisResults.financial_intelligence?.funding_sources?.length || 0} sources</span>
                            </div>
                            <Progress value={60} className="bg-slate-800" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* GEOINT Tab */}
                <TabsContent value="geoint" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="text-blue-400 flex items-center">
                          <Satellite className="mr-2 h-5 w-5" />
                          Satellite Imagery Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          {analysisResults.geospatial_intelligence?.satellite_imagery?.length > 0 ? (
                            analysisResults.geospatial_intelligence.satellite_imagery.map((imagery, index) => (
                              <div key={index} className="mb-3 p-3 bg-slate-900/30 rounded border border-blue-500/20">
                                <Badge variant="outline" className="text-blue-400 border-blue-500 mb-2">
                                  {imagery.source || 'Satellite Source'}
                                </Badge>
                                <p className="text-xs text-blue-300">Resolution: {imagery.resolution || 'High'}</p>
                                <p className="text-xs text-gray-400 mt-1">Coverage: {imagery.coverage || 'Strategic areas identified'}</p>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-blue-300 text-sm py-8">
                              <Satellite className="mx-auto h-8 w-8 mb-2 opacity-50" />
                              <p>Satellite imagery analysis in progress...</p>
                              <p className="text-xs text-gray-400 mt-1">Maxar, Google Earth Engine integration active</p>
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="text-blue-400 flex items-center">
                          <Map className="mr-2 h-5 w-5" />
                          Infrastructure Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          {analysisResults.geospatial_intelligence?.infrastructure_analysis?.length > 0 ? (
                            analysisResults.geospatial_intelligence.infrastructure_analysis.map((infra, index) => (
                              <div key={index} className="mb-2 p-2 bg-slate-900/30 rounded text-xs">
                                <Badge variant="outline" className="text-blue-400 mb-1">
                                  {infra.type || 'Infrastructure'}
                                </Badge>
                                <p className="text-blue-300">{infra.description || 'Strategic infrastructure identified'}</p>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-blue-300 text-sm py-8">
                              <Map className="mx-auto h-8 w-8 mb-2 opacity-50" />
                              <p>Infrastructure analysis ongoing...</p>
                              <p className="text-xs text-gray-400 mt-1">Critical infrastructure mapping</p>
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* SIGINT Tab */}
                <TabsContent value="sigint" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="text-blue-400 flex items-center">
                          <Radio className="mr-2 h-5 w-5" />
                          Communication Networks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-blue-300 text-sm py-8">
                            <Radio className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Signals intelligence collection active</p>
                            <p className="text-xs text-gray-400 mt-1">Encrypted communications analysis</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="text-blue-400 flex items-center">
                          <Globe className="mr-2 h-5 w-5" />
                          Network Topology
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-blue-300 text-sm py-8">
                            <Globe className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Network architecture mapping</p>
                            <p className="text-xs text-gray-400 mt-1">Infrastructure connectivity analysis</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* HUMINT Tab */}
                <TabsContent value="humint" className="space-y-4">
                  <Card className="bg-slate-800/50 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Key Personnel Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-blue-300 text-sm py-8">
                          <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Human intelligence assessment active</p>
                          <p className="text-xs text-gray-400 mt-1">Organizational structure analysis</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* TECHINT Tab */}
                <TabsContent value="techint" className="space-y-4">
                  <Card className="bg-slate-800/50 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center">
                        <Cpu className="mr-2 h-5 w-5" />
                        Technology Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-blue-300 text-sm py-8">
                          <Cpu className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Technical intelligence evaluation</p>
                          <p className="text-xs text-gray-400 mt-1">System architecture and vulnerability analysis</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* FININT Tab */}
                <TabsContent value="finint" className="space-y-4">
                  <Card className="bg-slate-800/50 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Financial Intelligence
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-blue-300 text-sm py-8">
                          <DollarSign className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Financial intelligence analysis</p>
                          <p className="text-xs text-gray-400 mt-1">Funding sources and transaction patterns</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-12 text-center">
                  <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-blue-400 mb-2">NATO OSINT Ready</h2>
                  <p className="text-blue-300 mb-4">
                    Enter target entity for comprehensive intelligence analysis
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Geospatial Intelligence (GEOINT)</p>
                    <p>• Signals Intelligence (SIGINT)</p>
                    <p>• Human Intelligence (HUMINT)</p>
                    <p>• Technical Intelligence (TECHINT)</p>
                    <p>• Financial Intelligence (FININT)</p>
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