import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Shield, 
  Search, 
  Brain, 
  Target, 
  Globe, 
  Lock, 
  Eye, 
  Zap, 
  Network,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Radar,
  Crosshair
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface IntelligenceProduct {
  classification: string;
  reliability: string;
  credibility: number;
  sources: string[];
  collection_methods: string[];
  analysis_confidence: number;
  actionable_intelligence: boolean;
  time_sensitivity: string;
  intelligence_requirements: string[];
}

interface OSINTAnalysisResult {
  intelligence_products: IntelligenceProduct[];
  collection_plan: string[];
  analysis_summary: string;
  threat_assessment: string;
  recommendations: string[];
  post_human_insights: string[];
  confidence_score: number;
  classification: string;
  timestamp: string;
  analyst_id: string;
  report_format: string;
}

export default function OSINTIndustriesDashboard() {
  const [target, setTarget] = useState('');
  const [requirements, setRequirements] = useState('');
  const [classificationLevel, setClassificationLevel] = useState('UNCLASSIFIED');
  const [analysisResult, setAnalysisResult] = useState<OSINTAnalysisResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch OSINT capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/osint-industries/capabilities'],
    queryFn: () => fetch('/api/osint-industries/capabilities').then(res => res.json())
  });

  // Advanced OSINT analysis mutation
  const analysisMutation = useMutation({
    mutationFn: async (data: { target: string; intelligence_requirements: string[]; classification_level: string }) => {
      const response = await fetch('/api/osint-industries/advanced-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setAnalysisResult(data.data);
        toast({
          title: "Intelligence Analysis Complete",
          description: `Professional intelligence assessment generated for ${target}`,
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: data.error || "Failed to complete intelligence analysis",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "System Error",
        description: "Failed to connect to intelligence analysis system",
        variant: "destructive",
      });
    }
  });

  const handleAnalysis = () => {
    if (!target.trim() || !requirements.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both target and intelligence requirements",
        variant: "destructive",
      });
      return;
    }

    const requirementsArray = requirements.split('\n').filter(r => r.trim());
    
    analysisMutation.mutate({
      target: target.trim(),
      intelligence_requirements: requirementsArray,
      classification_level: classificationLevel
    });
  };

  const getThreatLevelColor = (assessment: string) => {
    if (assessment.includes('HIGH') || assessment.includes('CRITICAL')) return 'bg-red-500';
    if (assessment.includes('MEDIUM') || assessment.includes('MODERATE')) return 'bg-yellow-500';
    if (assessment.includes('LOW') || assessment.includes('MINIMAL')) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP_SECRET': return 'bg-red-600';
      case 'SECRET': return 'bg-orange-600';
      case 'CONFIDENTIAL': return 'bg-yellow-600';
      case 'UNCLASSIFIED': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getReliabilityDescription = (reliability: string) => {
    const descriptions = {
      'A': 'Completely reliable',
      'B': 'Usually reliable',
      'C': 'Fairly reliable',
      'D': 'Not usually reliable',
      'E': 'Unreliable',
      'F': 'Reliability cannot be judged'
    };
    return descriptions[reliability as keyof typeof descriptions] || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OSINT.industries Professional Intelligence Framework
            </h1>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Advanced Open Source Intelligence platform with post-human analytical capabilities, 
            multi-source data fusion, and professional intelligence product generation
          </p>
        </motion.div>

        {/* Capabilities Overview */}
        {capabilities?.success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Radar className="w-5 h-5 text-blue-400" />
                  <span>Intelligence Capabilities Matrix</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-400">Intelligence Disciplines</h4>
                    <div className="space-y-1">
                      {capabilities.osint_industries_capabilities?.intelligence_disciplines?.map((discipline: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {discipline}
                        </Badge>
                      )) || (
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">SIGINT</Badge>
                          <Badge variant="outline" className="text-xs">HUMINT</Badge>
                          <Badge variant="outline" className="text-xs">GEOINT</Badge>
                          <Badge variant="outline" className="text-xs">OSINT</Badge>
                          <Badge variant="outline" className="text-xs">CYBINT</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-400">Collection Methods</h4>
                    <div className="space-y-1">
                      {capabilities.osint_industries_capabilities?.collection_methods?.map((method: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      )) || (
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">Web Scraping</Badge>
                          <Badge variant="outline" className="text-xs">API Intelligence</Badge>
                          <Badge variant="outline" className="text-xs">Social Media Mining</Badge>
                          <Badge variant="outline" className="text-xs">Dark Web Monitoring</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-400">AI Enhanced Capabilities</h4>
                    <div className="space-y-1">
                      {capabilities.osint_industries_capabilities?.ai_enhanced_capabilities?.map((capability: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      )) || (
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">Multi-Modal AI Analysis</Badge>
                          <Badge variant="outline" className="text-xs">Predictive Intelligence</Badge>
                          <Badge variant="outline" className="text-xs">Pattern Recognition</Badge>
                          <Badge variant="outline" className="text-xs">Automated Correlation</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-400">Data Sources</h4>
                    <div className="space-y-1">
                      {capabilities.osint_industries_capabilities?.data_sources?.map((source: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      )) || (
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">Professional APIs</Badge>
                          <Badge variant="outline" className="text-xs">Public Databases</Badge>
                          <Badge variant="outline" className="text-xs">Social Networks</Badge>
                          <Badge variant="outline" className="text-xs">Technical Infrastructure</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Analysis Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-red-400" />
                <span>Intelligence Collection Request</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target">Target of Interest</Label>
                  <Input
                    id="target"
                    placeholder="Enter target (person, organization, domain, etc.)"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classification">Classification Level</Label>
                  <Select value={classificationLevel} onValueChange={setClassificationLevel}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UNCLASSIFIED">UNCLASSIFIED</SelectItem>
                      <SelectItem value="CONFIDENTIAL">CONFIDENTIAL</SelectItem>
                      <SelectItem value="SECRET">SECRET</SelectItem>
                      <SelectItem value="TOP_SECRET">TOP SECRET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Intelligence Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter specific intelligence requirements:&#10;- Background and affiliations&#10;- Financial connections&#10;- Social media presence&#10;- Technical capabilities&#10;- Threat assessment"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="bg-gray-800 border-gray-600 min-h-32"
                />
              </div>
              <Button
                onClick={handleAnalysis}
                disabled={analysisMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {analysisMutation.isPending ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Performing Advanced Intelligence Analysis...
                  </>
                ) : (
                  <>
                    <Crosshair className="w-4 h-4 mr-2" />
                    Execute Intelligence Collection & Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Classification Header */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getClassificationColor(analysisResult.classification)} text-white`}>
                      {analysisResult.classification}
                    </Badge>
                    <span className="text-sm text-gray-400">
                      Report ID: {analysisResult.analyst_id}
                    </span>
                    <span className="text-sm text-gray-400">
                      Generated: {new Date(analysisResult.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Confidence: {Math.round(analysisResult.confidence_score * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="products" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5 bg-gray-800">
                <TabsTrigger value="products">Intelligence Products</TabsTrigger>
                <TabsTrigger value="analysis">Analysis Summary</TabsTrigger>
                <TabsTrigger value="threat">Threat Assessment</TabsTrigger>
                <TabsTrigger value="insights">Post-Human Insights</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4">
                {analysisResult.intelligence_products.map((product, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <span>Intelligence Product #{index + 1}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getClassificationColor(product.classification)} text-white`}>
                            {product.classification}
                          </Badge>
                          <Badge variant="outline">
                            Reliability: {product.reliability} - {getReliabilityDescription(product.reliability)}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-400 mb-2">Collection Methods</h4>
                          <div className="space-y-1">
                            {product.collection_methods.map((method, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-400 mb-2">Source Count</h4>
                          <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-blue-400" />
                            <span>{product.sources.length} sources validated</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-400 mb-2">Assessment</h4>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-sm">Confidence: {Math.round(product.analysis_confidence * 100)}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {product.actionable_intelligence ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                              )}
                              <span className="text-sm">
                                {product.actionable_intelligence ? 'Actionable' : 'Informational'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="analysis">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span>Comprehensive Analysis Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
                        {analysisResult.analysis_summary}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="threat">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-red-400" />
                      <span>Threat Assessment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
                        {analysisResult.threat_assessment}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Post-Human Intelligence Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.post_human_insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                          <Eye className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-400" />
                      <span>Strategic Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </div>
    </div>
  );
}