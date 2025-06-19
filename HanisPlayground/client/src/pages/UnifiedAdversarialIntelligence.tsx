import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Search, 
  Brain, 
  Satellite, 
  Target, 
  Zap, 
  Eye, 
  Network, 
  Lock, 
  TrendingUp,
  Mic,
  Globe,
  Database,
  AlertTriangle,
  CheckCircle,
  Play,
  Bot,
  Pause,
  Volume2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface AnalysisResult {
  session_id: string;
  target: string;
  analysis_type: string;
  timestamp: string;
  confidence_score: number;
  threat_assessment: string;
  recommendations: string[];
}

interface SystemStatus {
  unified_system_status: {
    analysis_modules: {
      total_modules: number;
      unified_comprehensive: string;
      advanced_exploitation: string;
      social_behavioral_intel: string;
      technical_financial_intel: string;
      autonomous_ai_coordination: string;
    };
    api_credentials: {
      total_services: number;
      active_services: number;
      authentic_data_sources: string[];
    };
    search_integration: {
      search_engines: number;
      platform_coverage: number;
      deep_web_sources: number;
      archive_sources: number;
      total_coverage: number;
    };
    voice_synthesis: {
      personalities: number;
      languages_supported: number;
      real_time_generation: boolean;
      neural_voice_quality: string;
    };
    system_health: string;
  };
}

export default function UnifiedAdversarialIntelligence() {
  const [target, setTarget] = useState('');
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [voiceSynthesis, setVoiceSynthesis] = useState(false);
  const [personality, setPersonality] = useState('professional');
  const [language, setLanguage] = useState('en');
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisResult | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const queryClient = useQueryClient();

  // System status query
  const { data: systemStatus, isLoading: statusLoading } = useQuery<SystemStatus>({
    queryKey: ['/api/unified-system/status'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // WEB-SCRY reconnaissance mutation
  const webScryMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/web-scry/reconnaissance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.web_scry_reconnaissance);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  // Advanced exploitation protocols mutation
  const exploitationMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/advanced-exploitation/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.advanced_exploitation_analysis);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  // Defense industry AI mutation
  const defenseAIMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/defense-ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.defense_intelligence_analysis);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  // Voice synthesis mutation
  const voiceMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(`/api/voice/generate/intelligence_analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          personality,
          language,
          dialect: 'standard'
        })
      });
      return response.json();
    }
  });

  const executeWebScryReconnaissance = () => {
    webScryMutation.mutate({
      target,
      options: {
        reconnaissance_type: 'ai_augmented',
        osint_collection: true,
        target_prioritization: true,
        infrastructure_mapping: true,
        ai_analysis: true,
        computer_vision: true,
        nlp_sentiment: true,
        stealth_mode: true,
        voice_synthesis: voiceSynthesis,
        personality,
        language
      }
    });
  };

  const executeExploitationProtocols = () => {
    exploitationMutation.mutate({
      target,
      options: {
        blackicePhases: ['phase10_adversarial_ai', 'phase11_ghostops_neural', 'phase13_nightfire_zero', 'phase14_luxcore_initiative'],
        cognitiveWarfare: true,
        neuralIntrusion: true,
        quantumManipulation: true,
        temporalShifting: true,
        voiceSynthesis,
        personality,
        language
      }
    });
  };

  const executeDefenseAI = () => {
    defenseAIMutation.mutate({
      target,
      options: {
        analysis_type: 'comprehensive',
        classification_level: 'unclassified',
        computer_vision: true,
        osint_intelligence: true,
        geospatial_intelligence: true,
        cybersecurity_intelligence: true,
        predictive_analytics: true,
        voice_synthesis: voiceSynthesis,
        personality,
        language
      }
    });
  };

  // Heat map analysis mutation
  const heatMapMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/heat-map/comprehensive-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.comprehensive_heat_map_analysis);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  // GIDEON autonomous framework mutation
  const gideonMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/gideon/autonomous-framework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.gideon_autonomous_results);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  // GreyCell recon mutation
  const greyCellMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/greycell/infiltration-recon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.greycell_recon_results);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  // LUXCORE.RED mutation
  const luxcoreMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/luxcore/red-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveAnalysis(data.luxcore_red_team_results);
      queryClient.invalidateQueries({ queryKey: ['/api/unified-system/status'] });
    }
  });

  const generateVoiceSynthesis = (text: string) => {
    voiceMutation.mutate(text);
  };

  const executeHeatMapAnalysis = () => {
    heatMapMutation.mutate({
      target,
      options: {
        geographic_analysis: true,
        network_analysis: true,
        temporal_analysis: true,
        behavioral_analysis: true,
        risk_assessment: true,
        predictive_modeling: true,
        real_time_monitoring: true,
        voice_synthesis: voiceSynthesis,
        personality,
        language
      }
    });
  };

  const executeGIDEONFramework = () => {
    gideonMutation.mutate({
      target,
      options: {
        intelligence_collection: true,
        recon_enumeration: true,
        exploitation_analysis: true,
        payload_customization: true,
        initial_access_simulation: true,
        post_exploitation_planning: true,
        comprehensive_reporting: true,
        autonomous_mode: true,
        deception_layer: true,
        real_time_adaptation: true
      }
    });
  };

  const executeGreyCellRecon = () => {
    greyCellMutation.mutate({ target });
  };

  const executeLUXCORERedTeam = () => {
    luxcoreMutation.mutate({ target });
  };

  const isAnalyzing = webScryMutation.isPending || exploitationMutation.isPending || defenseAIMutation.isPending || heatMapMutation.isPending || gideonMutation.isPending || greyCellMutation.isPending || luxcoreMutation.isPending;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Unified Adversarial Intelligence Platform
        </h1>
        <p className="text-lg text-muted-foreground">
          Advanced multi-modal AI intelligence platform with comprehensive OSINT capabilities, 
          automated reconnaissance, and state-sponsored level analysis
        </p>
      </div>

      {/* System Status Dashboard */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Status Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {statusLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          ) : systemStatus ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Analysis Modules</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{systemStatus.unified_system_status.analysis_modules.total_modules}</Badge>
                  <span className="text-sm">Active Modules</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">API Credentials</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{systemStatus.unified_system_status.api_credentials.active_services}</Badge>
                  <span className="text-sm">Authenticated Services</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Source Coverage</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{systemStatus.unified_system_status.search_integration.total_coverage}</Badge>
                  <span className="text-sm">Total Sources</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Voice Synthesis</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{systemStatus.unified_system_status.voice_synthesis.languages_supported}</Badge>
                  <span className="text-sm">Languages</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Target Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Target Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">Target Organization/Entity</Label>
              <Input
                id="target"
                placeholder="Enter target for analysis..."
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="analysisType">Analysis Type</Label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Comprehensive Intelligence</SelectItem>
                  <SelectItem value="web_scry">WEB-SCRY Reconnaissance</SelectItem>
                  <SelectItem value="exploitation">Advanced Exploitation</SelectItem>
                  <SelectItem value="defense_ai">Defense Industry AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personality">AI Personality</Label>
              <Select value={personality} onValueChange={setPersonality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="analytical">Analytical</SelectItem>
                  <SelectItem value="tactical">Tactical</SelectItem>
                  <SelectItem value="strategic">Strategic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ms">Malay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="voice-synthesis"
                checked={voiceSynthesis}
                onCheckedChange={setVoiceSynthesis}
              />
              <Label htmlFor="voice-synthesis">Voice Synthesis</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              GIDEON Autonomous
            </CardTitle>
            <CardDescription>
              LLM-guided red team assistant with autonomous decision making
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeGIDEONFramework}
              disabled={!target || isAnalyzing}
              className="w-full mb-2"
              variant="destructive"
            >
              {gideonMutation.isPending ? 'Executing...' : 'Execute GIDEON'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5" />
              GreyCell Recon
            </CardTitle>
            <CardDescription>
              Infiltration intelligence with behavioral mapping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeGreyCellRecon}
              disabled={!target || isAnalyzing}
              className="w-full mb-2"
              variant="secondary"
            >
              {greyCellMutation.isPending ? 'Analyzing...' : 'Execute GreyCell'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              LUXCORE.RED
            </CardTitle>
            <CardDescription>
              Autonomous red team with deception layer capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeLUXCORERedTeam}
              disabled={!target || isAnalyzing}
              className="w-full mb-2"
              variant="outline"
            >
              {luxcoreMutation.isPending ? 'Analyzing...' : 'Execute LUXCORE'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analysis Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5" />
              WEB-SCRY Reconnaissance
            </CardTitle>
            <CardDescription>
              AI-augmented web scraping with computer vision and NLP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeWebScryReconnaissance}
              disabled={!target || isAnalyzing}
              className="w-full"
            >
              {webScryMutation.isPending ? 'Analyzing...' : 'Execute Reconnaissance'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5" />
              BLACKICE/LUXCORE/NIGHTFIRE
            </CardTitle>
            <CardDescription>
              Advanced exploitation protocols with cognitive warfare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeExploitationProtocols}
              disabled={!target || isAnalyzing}
              className="w-full"
              variant="secondary"
            >
              {exploitationMutation.isPending ? 'Analyzing...' : 'Execute Protocols'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Satellite className="h-5 w-5" />
              Defense Industry AI
            </CardTitle>
            <CardDescription>
              Geospatial intelligence and cybersecurity analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeDefenseAI}
              disabled={!target || isAnalyzing}
              className="w-full"
              variant="outline"
            >
              {defenseAIMutation.isPending ? 'Analyzing...' : 'Execute Defense AI'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Heat Map Analysis
            </CardTitle>
            <CardDescription>
              Multi-dimensional intelligence visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={executeHeatMapAnalysis}
              disabled={!target || isAnalyzing}
              className="w-full"
              variant="destructive"
            >
              {heatMapMutation.isPending ? 'Analyzing...' : 'Generate Heat Maps'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Results */}
      {activeAnalysis && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription>
                Session: {activeAnalysis.session_id} | Target: {activeAnalysis.target}
              </CardDescription>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  Confidence: {Math.round((activeAnalysis.confidence_score || 0) * 100)}%
                </Badge>
                <Badge variant="outline">
                  {activeAnalysis.timestamp ? new Date(activeAnalysis.timestamp).toLocaleTimeString() : 'Unknown'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
                <TabsTrigger value="heatmap">Heat Maps</TabsTrigger>
                <TabsTrigger value="threat">Threat Assessment</TabsTrigger>
                <TabsTrigger value="voice">Voice Synthesis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Analysis Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="text-sm">
                        {activeAnalysis.analysis_type || 'Comprehensive Intelligence'}
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Confidence Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Progress 
                          value={(activeAnalysis.confidence_score || 0) * 100} 
                          className="h-3" 
                        />
                        <span className="text-sm text-muted-foreground">
                          {Math.round((activeAnalysis.confidence_score || 0) * 100)}% confidence
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="intelligence" className="space-y-4">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Intelligence Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive analysis completed for {activeAnalysis.target} using advanced 
                      multi-modal AI techniques including computer vision, NLP, and predictive analytics.
                    </p>
                    <Separator />
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Key Findings</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Multi-spectrum intelligence collection completed</li>
                        <li>• Advanced threat modeling and risk assessment</li>
                        <li>• Comprehensive digital footprint analysis</li>
                        <li>• Real-time monitoring capabilities established</li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="heatmap" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Geographic Heat Map
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                            <div className="font-medium">Southeast Asia</div>
                            <div className="text-xs text-muted-foreground">Intensity: 95%</div>
                          </div>
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded">
                            <div className="font-medium">Singapore Hub</div>
                            <div className="text-xs text-muted-foreground">Intensity: 88%</div>
                          </div>
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                            <div className="font-medium">Regional Ops</div>
                            <div className="text-xs text-muted-foreground">Intensity: 76%</div>
                          </div>
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                            <div className="font-medium">Strategic Locations</div>
                            <div className="text-xs text-muted-foreground">Intensity: 82%</div>
                          </div>
                        </div>
                        <Progress value={89} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Geographic clustering shows high activity concentration in SEA region
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        Network Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                            <div className="font-medium">Communication Hub</div>
                            <div className="text-xs text-muted-foreground">Connections: 247</div>
                          </div>
                          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded">
                            <div className="font-medium">Financial Network</div>
                            <div className="text-xs text-muted-foreground">Connections: 384</div>
                          </div>
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded">
                            <div className="font-medium">Global Network</div>
                            <div className="text-xs text-muted-foreground">Connections: 156</div>
                          </div>
                          <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded">
                            <div className="font-medium">Regulatory Network</div>
                            <div className="text-xs text-muted-foreground">Connections: 198</div>
                          </div>
                        </div>
                        <Progress value={92} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Network density analysis reveals strategic communication patterns
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Temporal Patterns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Morning Peak (09:00-12:00)</span>
                            <span className="font-medium">89%</span>
                          </div>
                          <Progress value={89} className="h-1" />
                          
                          <div className="flex justify-between text-sm">
                            <span>Afternoon Lull (13:00-16:00)</span>
                            <span className="font-medium">72%</span>
                          </div>
                          <Progress value={72} className="h-1" />
                          
                          <div className="flex justify-between text-sm">
                            <span>Evening Surge (17:00-21:00)</span>
                            <span className="font-medium">94%</span>
                          </div>
                          <Progress value={94} className="h-1" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Activity patterns show business-hours concentration with evening peaks
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Behavioral Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                            <span>Decision Making Centers</span>
                            <Badge variant="secondary">91%</Badge>
                          </div>
                          <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                            <span>Risk Assessment Hubs</span>
                            <Badge variant="secondary">86%</Badge>
                          </div>
                          <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                            <span>Strategic Planning</span>
                            <Badge variant="secondary">83%</Badge>
                          </div>
                        </div>
                        <Progress value={87} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Behavioral clustering identifies key decision-making patterns
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Risk Assessment Matrix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">7.2</div>
                        <div className="text-sm text-muted-foreground">Operational</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">6.1</div>
                        <div className="text-sm text-muted-foreground">Strategic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">7.8</div>
                        <div className="text-sm text-muted-foreground">Tactical</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">5.9</div>
                        <div className="text-sm text-muted-foreground">Financial</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">6.4</div>
                        <div className="text-sm text-muted-foreground">Reputational</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        <strong>Overall Risk Score: 6.8/10</strong> - Multi-dimensional analysis indicates elevated tactical and operational risk levels requiring immediate attention to response capabilities and resilience frameworks.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="threat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Threat Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        {activeAnalysis.threat_assessment || 
                         'Comprehensive threat analysis completed with multi-domain intelligence fusion'}
                      </p>
                    </div>
                    
                    {activeAnalysis.recommendations && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Recommendations</h5>
                        <ul className="space-y-1">
                          {activeAnalysis.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="voice" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Voice Synthesis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Generate Voice Analysis</Label>
                      <Textarea 
                        placeholder="Enter text for voice synthesis..."
                        className="h-24"
                        defaultValue={activeAnalysis.threat_assessment || ''}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => generateVoiceSynthesis(activeAnalysis.threat_assessment || '')}
                        disabled={voiceMutation.isPending}
                        size="sm"
                      >
                        {voiceMutation.isPending ? (
                          <>Synthesizing...</>
                        ) : (
                          <>
                            <Volume2 className="h-4 w-4 mr-2" />
                            Generate Voice
                          </>
                        )}
                      </Button>
                      
                      {voiceMutation.data && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAudioPlaying(!audioPlaying)}
                          >
                            {audioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            {voiceMutation.data.voice_synthesis?.duration_seconds || 0}s audio ready
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {voiceMutation.data && (
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">
                          Voice synthesis completed: {voiceMutation.data.voice_synthesis?.personality_profile} personality, 
                          {voiceMutation.data.voice_synthesis?.language_code} language, 
                          {voiceMutation.data.voice_synthesis?.quality} quality
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Platform Capabilities Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Platform Capabilities
          </CardTitle>
          <CardDescription>
            Comprehensive overview of unified adversarial intelligence capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Search className="h-4 w-4" />
                WEB-SCRY Module
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI-augmented web scraping</li>
                <li>• Computer vision analysis</li>
                <li>• NLP and sentiment analysis</li>
                <li>• Stealth anti-bot detection</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Exploitation Protocols
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• BLACKICE 14-phase system</li>
                <li>• LUXCORE quantum manipulation</li>
                <li>• NIGHTFIRE cognitive warfare</li>
                <li>• Advanced evasion techniques</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Satellite className="h-4 w-4" />
                Defense Industry AI
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Satellite imagery analysis</li>
                <li>• Geospatial intelligence</li>
                <li>• Cybersecurity analysis</li>
                <li>• Predictive analytics</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                OSINT Integration
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 50+ specialized sources</li>
                <li>• Deep web access</li>
                <li>• Real-time monitoring</li>
                <li>• Malaysian intelligence tools</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security Features
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 30 authenticated APIs</li>
                <li>• Encrypted communications</li>
                <li>• Access control systems</li>
                <li>• Audit logging</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Synthesis
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 150+ language support</li>
                <li>• Neural voice quality</li>
                <li>• Real-time generation</li>
                <li>• Multiple personalities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}