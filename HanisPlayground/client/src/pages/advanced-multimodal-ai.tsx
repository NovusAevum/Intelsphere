import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, Upload, FileText, BarChart3, Brain, Zap, Globe, TrendingUp, Shield, Star, Download, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UploadedDocument {
  id: string;
  filename: string;
  content: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv' | 'json' | 'image';
  size: number;
  upload_timestamp: Date;
}

interface MultimodalAnalysisResult {
  analysis_id: string;
  confidence_score: number;
  recommendations: Recommendation[];
  trends_analysis: TrendAnalysis;
  sentiment_breakdown: SentimentBreakdown;
  competitive_intelligence: CompetitiveIntelligence;
  data_sources_used: string[];
  processing_metadata: ProcessingMetadata;
  real_time_insights: RealTimeInsights;
}

interface Recommendation {
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  reasoning: string;
  confidence: number;
  implementation_timeline: string;
  expected_impact: string;
}

export default function AdvancedMultimodalAI() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [analysisType, setAnalysisType] = useState<string>('comprehensive');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.8);
  const [enableWebResearch, setEnableWebResearch] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<string>('detailed');
  const [webQuery, setWebQuery] = useState<string>('');
  const [selectedSources, setSelectedSources] = useState<string[]>(['serp', 'news', 'social']);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const content = reader.result as string;
        const newDocument: UploadedDocument = {
          id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          filename: file.name,
          content: content,
          type: getFileType(file.name),
          size: file.size,
          upload_timestamp: new Date()
        };
        
        setDocuments(prev => [...prev, newDocument]);
      };
      
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    },
    maxSize: 10485760 // 10MB
  });

  const documentAnalysisMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/multimodal-analysis/documents', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  });

  const webIntelligenceMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/web-intelligence/real-time', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  });

  const bulkAnalysisMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/multimodal-analysis/bulk', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  });

  const handleDocumentAnalysis = () => {
    if (documents.length === 0) {
      return;
    }

    documentAnalysisMutation.mutate({
      documents,
      analysis_type: analysisType,
      confidence_threshold: confidenceThreshold,
      enable_web_research: enableWebResearch,
      output_format: outputFormat
    });
  };

  const handleWebIntelligence = () => {
    if (!webQuery.trim()) {
      return;
    }

    webIntelligenceMutation.mutate({
      query: webQuery,
      sources: selectedSources,
      analysis_type: analysisType,
      confidence_threshold: confidenceThreshold
    });
  };

  const handleBulkAnalysis = () => {
    const dataSources = documents.map(doc => ({
      type: 'document',
      data: doc.content,
      metadata: {
        filename: doc.filename,
        type: doc.type,
        size: doc.size
      }
    }));

    bulkAnalysisMutation.mutate({
      data_sources: dataSources,
      queries: [webQuery].filter(Boolean),
      analysis_depth: analysisType,
      real_time_trends: enableWebResearch,
      cross_validation: true,
      confidence_scoring: true
    });
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getFileType = (filename: string): UploadedDocument['type'] => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'pdf';
      case 'docx': return 'docx';
      case 'txt': return 'txt';
      case 'csv': return 'csv';
      case 'json': return 'json';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp': return 'image';
      default: return 'txt';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 dark:text-green-400';
    if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Advanced Multimodal AI Engine</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            World-class enterprise AI analysis with authentic data integration, document processing, and real-time intelligence capabilities
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Real-time Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Global Intelligence</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="documents" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Document Analysis
            </TabsTrigger>
            <TabsTrigger value="web-intelligence" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Web Intelligence
            </TabsTrigger>
            <TabsTrigger value="bulk-analysis" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Bulk Analysis
            </TabsTrigger>
          </TabsList>

          {/* Document Analysis Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Document Upload
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Upload documents for advanced multimodal AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                        isDragActive
                          ? 'border-blue-400 bg-blue-50/10'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-lg font-medium text-white mb-2">
                        {isDragActive ? 'Drop documents here' : 'Drag & drop documents'}
                      </p>
                      <p className="text-slate-400 mb-4">
                        Supports PDF, DOCX, TXT, CSV, JSON, and images (max 10MB)
                      </p>
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        Choose Files
                      </Button>
                    </div>

                    {/* Uploaded Documents */}
                    {documents.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <h4 className="font-medium text-white">Uploaded Documents ({documents.length})</h4>
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-400" />
                              <div>
                                <p className="font-medium text-white">{doc.filename}</p>
                                <p className="text-sm text-slate-400">
                                  {(doc.size / 1024).toFixed(1)} KB • {doc.type.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(doc.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Analysis Results */}
                {documentAnalysisMutation.data && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">Confidence Score</span>
                            <Star className="h-4 w-4 text-yellow-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {Math.round(documentAnalysisMutation.data.analysis.confidence_score * 100)}%
                          </div>
                          <Progress 
                            value={documentAnalysisMutation.data.analysis.confidence_score * 100} 
                            className="mt-2"
                          />
                        </div>
                        
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">Processing Time</span>
                            <Zap className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {documentAnalysisMutation.data.analysis.processing_metadata.processing_time_ms}ms
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">Models Used</span>
                            <Brain className="h-4 w-4 text-purple-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {documentAnalysisMutation.data.analysis.data_sources_used.length}
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      {documentAnalysisMutation.data.analysis.recommendations && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">AI-Generated Recommendations</h4>
                          {documentAnalysisMutation.data.analysis.recommendations.map((rec: Recommendation, index: number) => (
                            <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Badge className={getPriorityColor(rec.priority)}>
                                    {rec.priority.toUpperCase()}
                                  </Badge>
                                  <span className="font-medium text-white">{rec.category}</span>
                                </div>
                                <span className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                                  {Math.round(rec.confidence * 100)}% confidence
                                </span>
                              </div>
                              <p className="text-white mb-2">{rec.action}</p>
                              <p className="text-slate-300 text-sm mb-2">{rec.reasoning}</p>
                              <div className="flex items-center justify-between text-sm text-slate-400">
                                <span>Timeline: {rec.implementation_timeline}</span>
                                <span>Impact: {rec.expected_impact}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Configuration Panel */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Analysis Type</Label>
                      <Select value={analysisType} onValueChange={setAnalysisType}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
                          <SelectItem value="trend">Trend Analysis</SelectItem>
                          <SelectItem value="competitive">Competitive Intelligence</SelectItem>
                          <SelectItem value="market">Market Analysis</SelectItem>
                          <SelectItem value="financial">Financial Analysis</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300">Output Format</Label>
                      <Select value={outputFormat} onValueChange={setOutputFormat}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="summary">Executive Summary</SelectItem>
                          <SelectItem value="detailed">Detailed Report</SelectItem>
                          <SelectItem value="actionable_insights">Actionable Insights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300">Confidence Threshold</Label>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={confidenceThreshold}
                          onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-1">
                          <span>0.1</span>
                          <span className="text-white font-medium">{confidenceThreshold}</span>
                          <span>1.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="web-research"
                        checked={enableWebResearch}
                        onCheckedChange={setEnableWebResearch}
                      />
                      <Label htmlFor="web-research" className="text-slate-300">
                        Enable Real-time Web Research
                      </Label>
                    </div>

                    <Button
                      onClick={handleDocumentAnalysis}
                      disabled={documents.length === 0 || documentAnalysisMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {documentAnalysisMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* API Status */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">AI Models Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['Claude Sonnet 4', 'GPT-4o', 'Gemini Pro', 'Cohere Command-R'].map((model) => (
                      <div key={model} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                        <span className="text-slate-300">{model}</span>
                        <Badge variant="outline" className="border-red-500 text-red-400">
                          API Required
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Web Intelligence Tab */}
          <TabsContent value="web-intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Real-time Web Intelligence</CardTitle>
                  <CardDescription className="text-slate-300">
                    Analyze real-time web data and trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Search Query</Label>
                    <Textarea
                      value={webQuery}
                      onChange={(e) => setWebQuery(e.target.value)}
                      placeholder="Enter your research query or topic..."
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Data Sources</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { id: 'serp', label: 'Search Results', icon: Globe },
                        { id: 'news', label: 'News', icon: FileText },
                        { id: 'social', label: 'Social Media', icon: TrendingUp }
                      ].map(({ id, label, icon: Icon }) => (
                        <div key={id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={id}
                            checked={selectedSources.includes(id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSources([...selectedSources, id]);
                              } else {
                                setSelectedSources(selectedSources.filter(s => s !== id));
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={id} className="text-slate-300 text-sm flex items-center">
                            <Icon className="h-3 w-3 mr-1" />
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleWebIntelligence}
                    disabled={!webQuery.trim() || webIntelligenceMutation.isPending}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {webIntelligenceMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Researching...
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4 mr-2" />
                        Start Research
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Web Intelligence Results */}
              {webIntelligenceMutation.data && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Intelligence Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/50 p-3 rounded">
                          <div className="text-sm text-slate-300">Sources Analyzed</div>
                          <div className="text-xl font-bold text-white">
                            {webIntelligenceMutation.data.intelligence.sources_analyzed.length}
                          </div>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded">
                          <div className="text-sm text-slate-300">Total Results</div>
                          <div className="text-xl font-bold text-white">
                            {webIntelligenceMutation.data.intelligence.total_results}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {webIntelligenceMutation.data.intelligence.results.map((result: any, index: number) => (
                          <div key={index} className="bg-slate-700/50 p-3 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-blue-600">{result.source}</Badge>
                              <span className="text-sm text-slate-300">
                                {Math.round(result.confidence * 100)}% confidence
                              </span>
                            </div>
                            <div className="text-sm text-slate-300">
                              {result.results.length} results found
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Bulk Analysis Tab */}
          <TabsContent value="bulk-analysis" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Bulk Data Analysis</CardTitle>
                <CardDescription className="text-slate-300">
                  Process multiple data sources simultaneously
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-blue-500 bg-blue-900/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-blue-200">
                    Bulk analysis processes all uploaded documents and web queries simultaneously for comprehensive insights.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded">
                    <div className="text-sm text-slate-300 mb-1">Documents Ready</div>
                    <div className="text-2xl font-bold text-white">{documents.length}</div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded">
                    <div className="text-sm text-slate-300 mb-1">Web Queries</div>
                    <div className="text-2xl font-bold text-white">{webQuery.trim() ? 1 : 0}</div>
                  </div>
                </div>

                <Button
                  onClick={handleBulkAnalysis}
                  disabled={documents.length === 0 || bulkAnalysisMutation.isPending}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {bulkAnalysisMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Bulk Analysis...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Start Bulk Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Handling */}
        {(documentAnalysisMutation.error || webIntelligenceMutation.error || bulkAnalysisMutation.error) && (
          <Alert className="border-red-500 bg-red-900/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              {documentAnalysisMutation.error?.message || 
               webIntelligenceMutation.error?.message || 
               bulkAnalysisMutation.error?.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}