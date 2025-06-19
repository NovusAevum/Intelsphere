import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Search, Brain, Target, Globe, Database, FileText, 
  Image, Video, Map, Phone, Mail, Users, Building, 
  Calendar, Clock, Link, Download, Copy, ExternalLink,
  Zap, Shield, Eye, Radar, Satellite, BookOpen,
  TrendingUp, BarChart3, PieChart, LineChart,
  AlertTriangle, CheckCircle, Info, Star, Filter,
  Layers, Network, GitBranch, Cpu, Activity,
  RefreshCw, Play, Pause, Settings, ChevronDown
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import GoBackButton from '@/components/ui/go-back-button';

interface ResearchRequest {
  query: string;
  type: 'person' | 'company' | 'domain' | 'phone' | 'email' | 'geospatial' | 'comprehensive';
  depth: 'surface' | 'deep' | 'exhaustive';
  sources: string[];
  includeImages: boolean;
  includeDocuments: boolean;
  includeSocialMedia: boolean;
  includeGeospatial: boolean;
  includeFinancial: boolean;
  timeRange?: string;
}

interface ResearchResult {
  query: string;
  confidence: number;
  processingTime: number;
  sources: SourceResult[];
  summary: string;
  keyFindings: string[];
  entities: EntityResult[];
  timeline: TimelineEvent[];
  geospatial: GeospatialData[];
  socialMedia: SocialMediaResult[];
  documents: DocumentResult[];
  images: ImageResult[];
  intelligence: IntelligenceReport;
  recommendations: string[];
  relatedQueries: string[];
}

interface SourceResult {
  name: string;
  url: string;
  confidence: number;
  relevance: number;
  dataPoints: number;
  lastUpdated: string;
  category: string;
  status: 'active' | 'archived' | 'premium';
}

interface EntityResult {
  name: string;
  type: 'person' | 'organization' | 'location' | 'event' | 'product';
  confidence: number;
  description: string;
  aliases: string[];
  connections: Connection[];
  metadata: Record<string, any>;
}

interface Connection {
  entity: string;
  relationship: string;
  strength: number;
  source: string;
}

interface TimelineEvent {
  date: string;
  event: string;
  source: string;
  importance: number;
  category: string;
}

interface GeospatialData {
  location: string;
  coordinates: [number, number];
  type: 'address' | 'landmark' | 'region' | 'satellite';
  confidence: number;
  details: Record<string, any>;
}

interface SocialMediaResult {
  platform: string;
  handle: string;
  url: string;
  followers: number;
  posts: number;
  lastActive: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
}

interface DocumentResult {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'html' | 'text' | 'image';
  size: string;
  date: string;
  relevance: number;
  excerpt: string;
}

interface ImageResult {
  url: string;
  title: string;
  source: string;
  metadata: Record<string, any>;
  relevance: number;
}

interface IntelligenceReport {
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  credibilityScore: number;
  dataQuality: number;
  completeness: number;
  crossReferences: number;
  inconsistencies: string[];
  verificationStatus: 'verified' | 'partial' | 'unverified';
  securityFlags: string[];
}

export default function DeepResearchIntelligence() {
  const [query, setQuery] = useState('');
  const [researchType, setResearchType] = useState<ResearchRequest['type']>('comprehensive');
  const [depth, setDepth] = useState<ResearchRequest['depth']>('deep');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [includeImages, setIncludeImages] = useState(true);
  const [includeDocuments, setIncludeDocuments] = useState(true);
  const [includeSocialMedia, setIncludeSocialMedia] = useState(true);
  const [includeGeospatial, setIncludeGeospatial] = useState(true);
  const [includeFinancial, setIncludeFinancial] = useState(false);
  const [results, setResults] = useState<ResearchResult | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const availableSources = [
    { id: 'osint_industries', name: 'OSINT Industries', category: 'Professional', premium: true },
    { id: 'intelx', name: 'Intelligence X', category: 'Deep Web', premium: true },
    { id: 'google_search', name: 'Google Search', category: 'Web Search', premium: false },
    { id: 'bing_search', name: 'Bing Search', category: 'Web Search', premium: false },
    { id: 'duckduckgo', name: 'DuckDuckGo', category: 'Privacy Search', premium: false },
    { id: 'shodan', name: 'Shodan', category: 'IoT/Infrastructure', premium: true },
    { id: 'nasa_earthdata', name: 'NASA Earthdata', category: 'Geospatial', premium: false },
    { id: 'whois', name: 'WHOIS Database', category: 'Domain', premium: false },
    { id: 'social_media', name: 'Social Media APIs', category: 'Social', premium: true },
    { id: 'public_records', name: 'Public Records', category: 'Legal', premium: true },
    { id: 'news_apis', name: 'News APIs', category: 'Media', premium: true },
    { id: 'academic', name: 'Academic Databases', category: 'Research', premium: true },
    { id: 'financial', name: 'Financial Data', category: 'Finance', premium: true }
  ];

  const researchMutation = useMutation({
    mutationFn: async (request: ResearchRequest) => {
      setIsProcessing(true);
      setProgress(0);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 10, 95));
      }, 500);

      try {
        const response = await apiRequest('/api/deep-research', {
          method: 'POST',
          body: JSON.stringify(request)
        });
        
        clearInterval(progressInterval);
        setProgress(100);
        
        return response;
      } catch (error) {
        clearInterval(progressInterval);
        setIsProcessing(false);
        setProgress(0);
        throw error;
      }
    },
    onSuccess: (data) => {
      setResults(data);
      setIsProcessing(false);
      setActiveTab('overview');
    },
    onError: (error) => {
      console.error('Research failed:', error);
      setIsProcessing(false);
      setProgress(0);
    }
  });

  const handleResearch = () => {
    if (!query.trim()) return;

    const request: ResearchRequest = {
      query: query.trim(),
      type: researchType,
      depth,
      sources: selectedSources,
      includeImages,
      includeDocuments,
      includeSocialMedia,
      includeGeospatial,
      includeFinancial
    };

    researchMutation.mutate(request);
  };

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadResults = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `research_results_${Date.now()}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <GoBackButton />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Deep Research Intelligence
              </h1>
              <p className="text-muted-foreground">
                Advanced AI-powered research with multi-modal orchestration and comprehensive OSINT capabilities
              </p>
            </div>
          </div>
        </div>

        {/* Research Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Query Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Research Query
                </CardTitle>
                <CardDescription>
                  Enter your research target or question for comprehensive intelligence gathering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="e.g., John Smith CEO TechCorp, example.com domain analysis, +1-555-0123 phone investigation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[100px]"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Research Type</label>
                    <Select value={researchType} onValueChange={(value: any) => setResearchType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                        <SelectItem value="person">Person Investigation</SelectItem>
                        <SelectItem value="company">Company Research</SelectItem>
                        <SelectItem value="domain">Domain Analysis</SelectItem>
                        <SelectItem value="phone">Phone Investigation</SelectItem>
                        <SelectItem value="email">Email Investigation</SelectItem>
                        <SelectItem value="geospatial">Geospatial Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Research Depth</label>
                    <Select value={depth} onValueChange={(value: any) => setDepth(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="surface">Surface Level</SelectItem>
                        <SelectItem value="deep">Deep Investigation</SelectItem>
                        <SelectItem value="exhaustive">Exhaustive Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={includeImages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIncludeImages(!includeImages)}
                  >
                    <Image className="h-4 w-4 mr-1" />
                    Images
                  </Button>
                  <Button
                    variant={includeDocuments ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIncludeDocuments(!includeDocuments)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Documents
                  </Button>
                  <Button
                    variant={includeSocialMedia ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIncludeSocialMedia(!includeSocialMedia)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Social Media
                  </Button>
                  <Button
                    variant={includeGeospatial ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIncludeGeospatial(!includeGeospatial)}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Geospatial
                  </Button>
                  <Button
                    variant={includeFinancial ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIncludeFinancial(!includeFinancial)}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Financial
                  </Button>
                </div>

                <Button 
                  onClick={handleResearch} 
                  disabled={!query.trim() || isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing Research...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Start Deep Research
                    </>
                  )}
                </Button>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Research Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Source Selection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Intelligence Sources
                </CardTitle>
                <CardDescription>
                  Select OSINT sources for comprehensive data gathering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {availableSources.map((source) => (
                    <div
                      key={source.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSources.includes(source.id)
                          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => toggleSource(source.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{source.name}</div>
                          <div className="text-xs text-muted-foreground">{source.category}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {source.premium && (
                            <Badge variant="secondary" className="text-xs">Premium</Badge>
                          )}
                          {selectedSources.includes(source.id) && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedSources(availableSources.map(s => s.id))}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedSources([])}
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Research Results: "{results.query}"
                  </CardTitle>
                  <CardDescription>
                    Confidence: {results.confidence}% • Processing Time: {results.processingTime}ms • Sources: {results.sources.length}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(results, null, 2))}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadResults}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="entities">Entities</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="geospatial">Geospatial</TabsTrigger>
                  <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Entities Found</p>
                            <p className="text-2xl font-bold">{results.entities.length}</p>
                          </div>
                          <Users className="h-8 w-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Sources Used</p>
                            <p className="text-2xl font-bold">{results.sources.length}</p>
                          </div>
                          <Database className="h-8 w-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Timeline Events</p>
                            <p className="text-2xl font-bold">{results.timeline.length}</p>
                          </div>
                          <Calendar className="h-8 w-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Confidence</p>
                            <p className="text-2xl font-bold">{results.confidence}%</p>
                          </div>
                          <Target className="h-8 w-8 text-orange-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Executive Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">{results.summary}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Key Findings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {results.keyFindings.map((finding, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{finding}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="entities" className="space-y-4">
                  {results.entities.map((entity, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{entity.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {entity.type}
                            </Badge>
                          </div>
                          <Badge variant={entity.confidence > 80 ? "default" : "secondary"}>
                            {entity.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{entity.description}</p>
                        {entity.aliases.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs font-medium">Aliases: </span>
                            <span className="text-xs text-muted-foreground">
                              {entity.aliases.join(', ')}
                            </span>
                          </div>
                        )}
                        {entity.connections.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-xs font-medium">Connections:</span>
                            {entity.connections.slice(0, 3).map((conn, connIndex) => (
                              <div key={connIndex} className="text-xs text-muted-foreground">
                                {conn.entity} ({conn.relationship})
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="sources" className="space-y-4">
                  {results.sources.map((source, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{source.name}</h3>
                            <Badge variant="outline">{source.category}</Badge>
                            <Badge 
                              variant={source.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {source.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {source.confidence}% confidence
                            </span>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={source.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>Data Points: {source.dataPoints}</span>
                          <span className="mx-2">•</span>
                          <span>Relevance: {source.relevance}%</span>
                          <span className="mx-2">•</span>
                          <span>Updated: {source.lastUpdated}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="intelligence">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Intelligence Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{results.intelligence.credibilityScore}%</div>
                          <div className="text-sm text-muted-foreground">Credibility</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{results.intelligence.dataQuality}%</div>
                          <div className="text-sm text-muted-foreground">Data Quality</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{results.intelligence.completeness}%</div>
                          <div className="text-sm text-muted-foreground">Completeness</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{results.intelligence.crossReferences}</div>
                          <div className="text-sm text-muted-foreground">Cross-refs</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Threat Assessment
                          </h4>
                          <Badge 
                            variant={
                              results.intelligence.threatLevel === 'critical' ? 'destructive' :
                              results.intelligence.threatLevel === 'high' ? 'destructive' :
                              results.intelligence.threatLevel === 'medium' ? 'default' : 'secondary'
                            }
                            className="mb-2"
                          >
                            {results.intelligence.threatLevel.toUpperCase()} THREAT
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            Verification Status: {results.intelligence.verificationStatus}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Security Flags</h4>
                          <div className="space-y-1">
                            {results.intelligence.securityFlags.map((flag, index) => (
                              <Badge key={index} variant="outline" className="text-xs mr-1">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {results.intelligence.inconsistencies.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Data Inconsistencies
                          </h4>
                          <div className="space-y-1">
                            {results.intelligence.inconsistencies.map((inconsistency, index) => (
                              <div key={index} className="text-sm text-muted-foreground">
                                • {inconsistency}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}