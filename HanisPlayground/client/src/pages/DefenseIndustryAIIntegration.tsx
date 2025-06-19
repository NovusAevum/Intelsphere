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
  Satellite, 
  Radar, 
  Shield, 
  Target, 
  Globe, 
  Database,
  Activity,
  FileText,
  Map,
  Eye,
  Cpu,
  AlertTriangle,
  Lock,
  Search,
  Settings,
  BarChart3,
  Camera,
  Crosshair
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface DefenseAnalysisResults {
  analysis_id: string;
  target_entity: string;
  classification_level: string;
  analysis_timestamp: string;
  satellite_imagery_analysis: {
    imagery_sources: any[];
    infrastructure_identification: any[];
    change_detection: any[];
    movement_patterns: any[];
    threat_assessment: any[];
  };
  geospatial_intelligence: {
    coordinate_analysis: any[];
    terrain_assessment: any[];
    strategic_locations: any[];
    access_routes: any[];
  };
  signals_intelligence: {
    communication_intercepts: any[];
    electronic_signatures: any[];
    network_topology: any[];
    encryption_analysis: any[];
  };
  threat_modeling: {
    capability_assessment: any[];
    intent_analysis: any[];
    opportunity_evaluation: any[];
    risk_indicators: any[];
  };
  strategic_assessment: {
    military_significance: number;
    operational_impact: number;
    intelligence_value: number;
    threat_level: string;
  };
}

export default function DefenseIndustryAIIntegration() {
  const [targetEntity, setTargetEntity] = useState('');
  const [analysisResults, setAnalysisResults] = useState<DefenseAnalysisResults | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const queryClient = useQueryClient();

  // Get defense capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/defense/capabilities'],
    enabled: true
  });

  // Execute defense analysis
  const analysisMutation = useMutation({
    mutationFn: async (data: { targetEntity: string; options: any }) => {
      return await apiRequest('/api/defense/comprehensive-analysis', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      setAnalysisResults(data.defense_analysis_results);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      queryClient.invalidateQueries({ queryKey: ['/api/defense/capabilities'] });
    },
    onError: (error) => {
      console.error('Defense analysis failed:', error);
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
      'Satellite Imagery Collection and Analysis',
      'Geospatial Intelligence Processing',
      'Signals Intelligence Gathering',
      'Threat Modeling and Assessment',
      'Strategic Intelligence Evaluation'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setAnalysisProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    analysisMutation.mutate({
      targetEntity,
      options: {
        satellite_imagery: true,
        geospatial_intelligence: true,
        signals_intelligence: true,
        threat_modeling: true,
        strategic_assessment: true,
        classification_level: 'SECRET'
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Satellite className="h-8 w-8 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">DEFENSE INDUSTRY AI INTEGRATION</h1>
                <p className="text-sm text-green-300/70">Advanced Satellite Intelligence & Defense Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={capabilities?.defense_capabilities ? 'bg-green-600' : 'bg-red-600'}>
                {capabilities?.defense_capabilities ? 'OPERATIONAL' : 'OFFLINE'}
              </Badge>
              <Badge className="bg-orange-600">CLASSIFIED</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Analysis Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-green-300 mb-2 block">Target Entity</label>
                  <Input
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="military-facility.gov"
                    className="bg-slate-950 border-green-500/30 text-green-100"
                    disabled={isAnalyzing}
                  />
                </div>

                <Button
                  onClick={executeAnalysis}
                  disabled={!targetEntity.trim() || isAnalyzing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
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
                    <div className="text-xs text-green-300">Phase: {currentPhase}</div>
                    <Progress value={analysisProgress} className="bg-slate-800" />
                    <div className="text-xs text-green-300">{analysisProgress}% Complete</div>
                  </div>
                )}

                {/* Intelligence Systems */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-semibold text-green-400">Intelligence Systems</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Satellite className="mr-1 h-3 w-3" />Satellite Imagery</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Globe className="mr-1 h-3 w-3" />Geospatial Intel</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Radar className="mr-1 h-3 w-3" />Signals Intel</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Shield className="mr-1 h-3 w-3" />Threat Modeling</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Satellite Sources */}
            {capabilities && (
              <Card className="bg-slate-900/50 border-green-500/30 mt-4">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Camera className="mr-2 h-5 w-5" />
                    Satellite Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Maxar WorldView</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Planet Labs</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Sentinel-2</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Google Earth Engine</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Results Panel */}
          <div className="lg:col-span-3">
            {analysisResults ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5 bg-slate-900/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  <TabsTrigger value="geospatial">Geospatial</TabsTrigger>
                  <TabsTrigger value="signals">Signals</TabsTrigger>
                  <TabsTrigger value="threats">Threats</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Target Entity</p>
                            <p className="font-mono text-green-400">{analysisResults.target_entity}</p>
                          </div>
                          <Eye className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Threat Level</p>
                            <Badge className={getThreatLevelColor(analysisResults.strategic_assessment?.threat_level || 'UNKNOWN')}>
                              {analysisResults.strategic_assessment?.threat_level || 'UNKNOWN'}
                            </Badge>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-orange-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Classification</p>
                            <Badge className={getClassificationColor(analysisResults.classification_level)}>
                              {analysisResults.classification_level}
                            </Badge>
                          </div>
                          <Lock className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-300">Intel Value</p>
                            <p className="text-lg font-bold text-green-400">
                              {Math.round((analysisResults.strategic_assessment?.intelligence_value || 0) * 100)}%
                            </p>
                          </div>
                          <Database className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">Strategic Intelligence Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300 flex items-center">
                                <Satellite className="mr-1 h-4 w-4" />
                                Satellite Coverage
                              </span>
                              <span className="text-green-400">{analysisResults.satellite_imagery_analysis?.imagery_sources?.length || 0} sources</span>
                            </div>
                            <Progress value={85} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300 flex items-center">
                                <Globe className="mr-1 h-4 w-4" />
                                Geospatial Analysis
                              </span>
                              <span className="text-green-400">{analysisResults.geospatial_intelligence?.strategic_locations?.length || 0} locations</span>
                            </div>
                            <Progress value={78} className="bg-slate-800" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300 flex items-center">
                                <Radar className="mr-1 h-4 w-4" />
                                Signals Intelligence
                              </span>
                              <span className="text-green-400">{analysisResults.signals_intelligence?.communication_intercepts?.length || 0} intercepts</span>
                            </div>
                            <Progress value={92} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-300 flex items-center">
                                <Shield className="mr-1 h-4 w-4" />
                                Threat Assessment
                              </span>
                              <span className="text-green-400">{analysisResults.threat_modeling?.risk_indicators?.length || 0} indicators</span>
                            </div>
                            <Progress value={88} className="bg-slate-800" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Satellite Tab */}
                <TabsContent value="satellite" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Camera className="mr-2 h-5 w-5" />
                          Imagery Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-green-300 text-sm py-8">
                            <Camera className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>High-resolution satellite imagery analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Multi-spectral and temporal analysis active</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Crosshair className="mr-2 h-5 w-5" />
                          Change Detection
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-green-300 text-sm py-8">
                            <Crosshair className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Temporal change detection analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Infrastructure modifications and activity patterns</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <Activity className="mr-2 h-5 w-5" />
                        Movement Patterns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-32">
                        <div className="text-center text-green-300 text-sm py-8">
                          <Activity className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Vehicle and personnel movement analysis</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Geospatial Tab */}
                <TabsContent value="geospatial" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Map className="mr-2 h-5 w-5" />
                          Terrain Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-green-300 text-sm py-8">
                            <Map className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Comprehensive terrain analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Elevation, accessibility, and strategic positioning</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Target className="mr-2 h-5 w-5" />
                          Strategic Locations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-green-300 text-sm py-8">
                            <Target className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>High-value target identification</p>
                            <p className="text-xs text-gray-400 mt-1">Command centers and critical infrastructure</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Signals Tab */}
                <TabsContent value="signals" className="space-y-4">
                  <Card className="bg-slate-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <Radar className="mr-2 h-5 w-5" />
                        Signals Intelligence Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-green-300 text-sm py-8">
                          <Radar className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Electronic signals and communication analysis</p>
                          <p className="text-xs text-gray-400 mt-1">RF spectrum monitoring and communication intercepts</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Threats Tab */}
                <TabsContent value="threats" className="space-y-4">
                  <Card className="bg-slate-900/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Comprehensive Threat Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-green-300 text-sm py-8">
                          <Shield className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Multi-domain threat modeling and risk analysis</p>
                          <p className="text-xs text-gray-400 mt-1">Capability, intent, and opportunity assessment</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="bg-slate-900/50 border-green-500/30">
                <CardContent className="p-12 text-center">
                  <Satellite className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-green-400 mb-2">Defense Intelligence Ready</h2>
                  <p className="text-green-300 mb-4">
                    Enter target entity for comprehensive defense analysis
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Satellite Imagery Analysis & Change Detection</p>
                    <p>• Geospatial Intelligence & Terrain Assessment</p>
                    <p>• Signals Intelligence & Communication Analysis</p>
                    <p>• Threat Modeling & Strategic Assessment</p>
                    <p>• Multi-Domain Intelligence Fusion</p>
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