import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Eye, 
  Search, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Brain,
  Target
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface APIStatus {
  news: boolean;
  market: boolean;
  weather: boolean;
  tech: boolean;
  cyber: boolean;
  business: boolean;
  search: boolean;
  ai_claude: boolean;
  ai_openai: boolean;
  ai_google: boolean;
  ai_cohere: boolean;
}

interface AuthenticIntelligence {
  query: string;
  analysis_results: Record<string, any>;
  data_quality: {
    authentic_sources: number;
    total_requested: number;
    authentication_errors: string[];
  };
  overall_authenticity_score: number;
  generated_at: string;
  ai_enhanced_analysis?: any;
}

export default function AuthenticIntelligenceDashboard() {
  const [query, setQuery] = useState('');
  const [selectedAnalysisTypes, setSelectedAnalysisTypes] = useState<string[]>([
    'news', 'market', 'tech', 'social', 'cyber', 'business'
  ]);
  const [enhanceWithAI, setEnhanceWithAI] = useState(true);
  const [realTimeMode, setRealTimeMode] = useState(false);

  // API Status Query
  const { data: apiStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['/api/validate-credentials'],
    refetchInterval: realTimeMode ? 30000 : false,
  });

  // Authentic Intelligence Analysis
  const intelligenceAnalysis = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/authentic-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
  });

  // Web Intelligence Analysis
  const webIntelligence = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/web-intelligence/real-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
  });

  const handleIntelligenceAnalysis = () => {
    if (!query.trim()) return;

    intelligenceAnalysis.mutate({
      query: query.trim(),
      analysis_types: selectedAnalysisTypes,
      enhance_with_ai: enhanceWithAI
    });
  };

  const handleWebIntelligence = () => {
    if (!query.trim()) return;

    webIntelligence.mutate({
      query: query.trim(),
      sources: ['serp', 'news', 'social'],
      analysis_type: 'comprehensive'
    });
  };

  const getStatusIcon = (available: boolean) => {
    return available ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getAuthenticityColor = (score: number) => {
    if (score >= 0.9) return 'text-green-400';
    if (score >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  const analysisTypeOptions = [
    { id: 'news', label: 'News Intelligence', icon: Globe, description: 'Real-time news analysis' },
    { id: 'market', label: 'Market Data', icon: TrendingUp, description: 'Financial market intelligence' },
    { id: 'tech', label: 'Technology Stack', icon: Database, description: 'Technology infrastructure analysis' },
    { id: 'social', label: 'Social Intelligence', icon: Activity, description: 'Social media and web mentions' },
    { id: 'cyber', label: 'Cyber Threat Intel', icon: Shield, description: 'Security and threat analysis' },
    { id: 'business', label: 'Business Intelligence', icon: Target, description: 'Business data and contacts' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Authentic Intelligence Dashboard</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Enterprise-grade intelligence platform with authentic data sources and comprehensive API validation
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>100% Authentic Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Multi-source Intelligence</span>
            </div>
          </div>
        </div>

        {/* API Status Dashboard */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              API Credentials Status
              <div className="ml-auto flex items-center space-x-2">
                <Switch
                  id="real-time"
                  checked={realTimeMode}
                  onCheckedChange={setRealTimeMode}
                />
                <Label htmlFor="real-time" className="text-slate-300">Real-time Monitoring</Label>
              </div>
            </CardTitle>
            <CardDescription className="text-slate-300">
              Live validation of API credentials and service availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <span className="ml-2 text-slate-300">Validating API credentials...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {apiStatus?.available_apis && Object.entries(apiStatus.available_apis).map(([api, available]) => (
                  <div key={api} className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      {getStatusIcon(available as boolean)}
                      <Badge variant={available ? "default" : "destructive"} className="text-xs">
                        {available ? 'Active' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-white capitalize">
                      {api.replace('_', ' ')}
                    </div>
                    <div className="text-xs text-slate-400">
                      {available ? 'Authenticated' : 'API Key Required'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="intelligence" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Database className="h-4 w-4 mr-2" />
              Authentic Intelligence
            </TabsTrigger>
            <TabsTrigger value="web" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Web Intelligence
            </TabsTrigger>
          </TabsList>

          {/* Authentic Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Query and Configuration */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Intelligence Query</CardTitle>
                    <CardDescription className="text-slate-300">
                      Enter your research query for comprehensive authentic intelligence analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Research Query</Label>
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter company name, topic, or research subject..."
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-3 block">Analysis Types</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {analysisTypeOptions.map(({ id, label, icon: Icon, description }) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox
                              id={id}
                              checked={selectedAnalysisTypes.includes(id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAnalysisTypes([...selectedAnalysisTypes, id]);
                                } else {
                                  setSelectedAnalysisTypes(selectedAnalysisTypes.filter(t => t !== id));
                                }
                              }}
                            />
                            <Label htmlFor={id} className="text-slate-300 text-sm flex items-center cursor-pointer">
                              <Icon className="h-3 w-3 mr-1" />
                              {label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="ai-enhance"
                        checked={enhanceWithAI}
                        onCheckedChange={setEnhanceWithAI}
                      />
                      <Label htmlFor="ai-enhance" className="text-slate-300">
                        Enhance with AI Analysis
                      </Label>
                    </div>

                    <Button
                      onClick={handleIntelligenceAnalysis}
                      disabled={!query.trim() || selectedAnalysisTypes.length === 0 || intelligenceAnalysis.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {intelligenceAnalysis.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Start Intelligence Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Analysis Results */}
                {intelligenceAnalysis.data && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Intelligence Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">Authenticity Score</span>
                            <Shield className="h-4 w-4 text-green-400" />
                          </div>
                          <div className={`text-2xl font-bold ${getAuthenticityColor(intelligenceAnalysis.data.intelligence.overall_authenticity_score)}`}>
                            {Math.round(intelligenceAnalysis.data.intelligence.overall_authenticity_score * 100)}%
                          </div>
                          <Progress 
                            value={intelligenceAnalysis.data.intelligence.overall_authenticity_score * 100} 
                            className="mt-2"
                          />
                        </div>
                        
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">Sources Used</span>
                            <Database className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {intelligenceAnalysis.data.intelligence.data_quality.authentic_sources}
                          </div>
                          <div className="text-sm text-slate-400">
                            of {intelligenceAnalysis.data.intelligence.data_quality.total_requested} requested
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">Analysis Time</span>
                            <Clock className="h-4 w-4 text-purple-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {new Date(intelligenceAnalysis.data.intelligence.generated_at).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Data Sources */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white">Authentic Data Sources</h4>
                        {Object.entries(intelligenceAnalysis.data.intelligence.analysis_results).map(([source, data]: [string, any]) => (
                          <div key={source} className="bg-slate-700/50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-white capitalize">{source.replace('_', ' ')}</span>
                              <Badge className="bg-green-600">Authenticated</Badge>
                            </div>
                            <div className="text-sm text-slate-300">
                              {Array.isArray(data) ? `${data.length} records` : 'Data available'}
                            </div>
                            {data.authenticity_score && (
                              <div className="text-xs text-slate-400 mt-1">
                                Authenticity: {Math.round(data.authenticity_score * 100)}%
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* AI Enhanced Analysis */}
                      {intelligenceAnalysis.data.intelligence.ai_enhanced_analysis && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Brain className="h-4 w-4 mr-2" />
                            AI-Enhanced Insights
                          </h4>
                          <div className="bg-slate-700/50 p-4 rounded-lg">
                            <div className="text-slate-300">
                              Enhanced analysis using Claude Sonnet 4 based on authentic data sources only
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Authentication Errors */}
                      {intelligenceAnalysis.data.intelligence.data_quality.authentication_errors.length > 0 && (
                        <Alert className="border-yellow-500 bg-yellow-900/20">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-yellow-200">
                            <div className="font-medium mb-2">Some data sources require API credentials:</div>
                            <ul className="list-disc list-inside space-y-1">
                              {intelligenceAnalysis.data.intelligence.data_quality.authentication_errors.map((error: string, index: number) => (
                                <li key={index} className="text-sm">{error}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisTypeOptions.map(({ id, label, icon: Icon, description }) => (
                      <div key={id} className="flex items-start space-x-3 p-2 bg-slate-700/50 rounded">
                        <Icon className="h-4 w-4 text-blue-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-white">{label}</div>
                          <div className="text-xs text-slate-400">{description}</div>
                          <Badge 
                            variant={apiStatus?.available_apis?.[id] ? "default" : "destructive"} 
                            className="mt-1 text-xs"
                          >
                            {apiStatus?.available_apis?.[id] ? 'Available' : 'API Required'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Web Intelligence Tab */}
          <TabsContent value="web" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Real-time Web Intelligence</CardTitle>
                <CardDescription className="text-slate-300">
                  Analyze web mentions and social intelligence from authentic sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Search Query</Label>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter search term for web intelligence..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <Button
                  onClick={handleWebIntelligence}
                  disabled={!query.trim() || webIntelligence.isPending}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {webIntelligence.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 mr-2" />
                      Start Web Intelligence
                    </>
                  )}
                </Button>

                {webIntelligence.data && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-sm text-slate-300">Total Mentions</div>
                        <div className="text-xl font-bold text-white">
                          {webIntelligence.data.intelligence.total_mentions}
                        </div>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded">
                        <div className="text-sm text-slate-300">Authenticity Score</div>
                        <div className={`text-xl font-bold ${getAuthenticityColor(webIntelligence.data.intelligence.overall_authenticity_score)}`}>
                          {Math.round(webIntelligence.data.intelligence.overall_authenticity_score * 100)}%
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {webIntelligence.data.intelligence.intelligence_sources?.map((source: any, index: number) => (
                        <div key={index} className="bg-slate-700/50 p-3 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white capitalize">{source.source_type.replace('_', ' ')}</span>
                            <Badge className="bg-blue-600">
                              {Math.round(source.authenticity_score * 100)}% Authentic
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-300">
                            {source.data?.length || 0} results from verified source
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Handling */}
        {(intelligenceAnalysis.error || webIntelligence.error) && (
          <Alert className="border-red-500 bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              {intelligenceAnalysis.error?.message || webIntelligence.error?.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}