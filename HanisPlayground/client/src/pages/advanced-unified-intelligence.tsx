import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Brain, Search, Globe, Database, Shield, Zap, Target, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface IntelligenceResult {
  query: string;
  sources: any[];
  multiModelAnalysis: any;
  osintFindings: any;
  synthesizedIntelligence: string;
  confidenceScore: number;
  sourceCredibility: any;
  processingTime: number;
}

export default function AdvancedUnifiedIntelligence() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IntelligenceResult | null>(null);

  const intelligenceMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      const response = await fetch('/api/advanced-unified-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      setResults(data.data);
    },
    onError: (error) => {
      console.error('Intelligence gathering failed:', error);
    }
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    intelligenceMutation.mutate(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const getSourceTypeIcon = (sourceType: string) => {
    if (sourceType.includes('Google')) return <Search className="w-4 h-4" />;
    if (sourceType.includes('News')) return <Globe className="w-4 h-4" />;
    if (sourceType.includes('Business')) return <TrendingUp className="w-4 h-4" />;
    if (sourceType.includes('Technical') || sourceType.includes('Shodan')) return <Shield className="w-4 h-4" />;
    if (sourceType.includes('Social')) return <Users className="w-4 h-4" />;
    if (sourceType.includes('Government') || sourceType.includes('Official')) return <Target className="w-4 h-4" />;
    if (sourceType.includes('Academic')) return <Database className="w-4 h-4" />;
    return <Brain className="w-4 h-4" />;
  };

  const formatSourceLink = (source: any) => {
    return (
      <div key={source.url} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getSourceTypeIcon(source.source)}
            <Badge variant="outline" className="text-xs">
              {source.source}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {Math.round((source.credibilityScore || 0.5) * 100)}% credible
            </Badge>
          </div>
          <a 
            href={source.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{source.title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-3">
          {source.snippet || source.content || 'No preview available'}
        </p>
        {source.publishedAt && (
          <p className="text-gray-500 text-xs mt-2">
            Published: {new Date(source.publishedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Advanced Unified Intelligence
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          Comprehensive intelligence gathering that surpasses ChatGPT's deep research using multiple AI models, 
          OSINT sources, and advanced analysis across Google Search, News APIs, Academic Sources, Business Intelligence, 
          Technical OSINT, Government Data, and Social Media Intelligence.
        </p>
      </div>

      {/* Intelligence Capabilities Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="p-4">
            <Brain className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="font-semibold text-sm">5 AI Models</p>
            <p className="text-xs text-gray-600">Claude, GPT-4o, Gemini, Grok, Cohere</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Database className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-semibold text-sm">13 OSINT APIs</p>
            <p className="text-xs text-gray-600">Google, News, HubSpot, Shodan, etc.</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-semibold text-sm">Credibility Analysis</p>
            <p className="text-xs text-gray-600">Source validation & scoring</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Zap className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="font-semibold text-sm">Real-time Research</p>
            <p className="text-xs text-gray-600">Multi-platform synthesis</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Interface */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Intelligence Query
          </CardTitle>
          <CardDescription>
            Enter your research query for comprehensive intelligence gathering across multiple platforms and AI models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your intelligence query (e.g., 'latest AI developments 2024', 'cybersecurity threats', company name, phone number, etc.)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={intelligenceMutation.isPending}
            />
            <Button 
              onClick={handleSearch}
              disabled={intelligenceMutation.isPending || !query.trim()}
              className="px-8"
            >
              {intelligenceMutation.isPending ? 'Gathering Intelligence...' : 'Analyze'}
            </Button>
          </div>
          
          {intelligenceMutation.isPending && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Processing multi-platform intelligence...</span>
                <span className="text-sm text-gray-500">This may take 30-60 seconds</span>
              </div>
              <Progress value={33} className="mb-2" />
              <div className="text-xs text-gray-500 space-y-1">
                <div>• Searching Google, News APIs, Academic Sources</div>
                <div>• Analyzing with Claude Sonnet 4, GPT-4o, Gemini Pro, Grok 2</div>
                <div>• Gathering OSINT data from HubSpot, Shodan, BuildWith, API Ninjas</div>
                <div>• Performing credibility analysis and cross-referencing</div>
                <div>• Generating comprehensive synthesis with source attribution</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Display */}
      {results && (
        <div className="space-y-6">
          {/* Intelligence Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Intelligence Summary
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">
                    {results.sources?.length || 0} sources analyzed
                  </Badge>
                  <Badge variant="outline">
                    {Object.keys(results.osintFindings || {}).length} platforms
                  </Badge>
                  <Badge variant="outline">
                    {Math.round((results.confidenceScore || 0) * 100)}% confidence
                  </Badge>
                  <Badge variant="outline">
                    {results.processingTime}ms
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: results.synthesizedIntelligence
                      ?.replace(/\n/g, '<br>')
                      ?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
                      ?.replace(/## (.*?)(<br>|$)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
                      ?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="sources" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sources">Intelligence Sources</TabsTrigger>
              <TabsTrigger value="platforms">Platform Analysis</TabsTrigger>
              <TabsTrigger value="ai-analysis">AI Model Analysis</TabsTrigger>
              <TabsTrigger value="credibility">Credibility Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    High-Credibility Intelligence Sources ({results.sources?.filter(s => (s.credibilityScore || 0.5) > 0.7).length || 0})
                  </CardTitle>
                  <CardDescription>
                    Sources with credibility scores above 70% from authoritative platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {results.sources
                      ?.filter(source => (source.credibilityScore || 0.5) > 0.7)
                      ?.sort((a, b) => (b.credibilityScore || 0.5) - (a.credibilityScore || 0.5))
                      ?.slice(0, 20)
                      ?.map(formatSourceLink)
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(results.osintFindings || {}).map(([platform, data]: [string, any]) => (
                  <Card key={platform}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getSourceTypeIcon(platform)}
                        {platform}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.error ? (
                        <Alert>
                          <AlertDescription>{data.error}</AlertDescription>
                        </Alert>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Sources found: {data.sources?.length || 0}
                          </p>
                          {data.sources?.slice(0, 3).map((source: any, index: number) => (
                            <div key={index} className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded mb-2">
                              <div className="font-medium truncate">{source.title}</div>
                              <div className="text-gray-600 truncate">{source.snippet}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Multi-Model AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Consensus analysis from multiple AI models with confidence scoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(results.multiModelAnalysis?.confidenceScores || {}).map(([model, score]: [string, any]) => (
                      <div key={model} className="flex items-center justify-between">
                        <span className="font-medium capitalize">{model}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={score * 100} className="w-20" />
                          <span className="text-sm">{Math.round(score * 100)}%</span>
                        </div>
                      </div>
                    ))}
                    
                    {results.multiModelAnalysis?.consensus && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Consensus Analysis:</h4>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: results.multiModelAnalysis.consensus
                                ?.replace(/\n/g, '<br>')
                                ?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="credibility" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Source Credibility Assessment
                  </CardTitle>
                  <CardDescription>
                    Detailed credibility analysis of all intelligence sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.sources?.filter(s => (s.credibilityScore || 0.5) > 0.8).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">High Credibility (80%+)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {results.sources?.filter(s => (s.credibilityScore || 0.5) > 0.6 && (s.credibilityScore || 0.5) <= 0.8).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Medium Credibility (60-80%)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {results.sources?.filter(s => (s.credibilityScore || 0.5) <= 0.6).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Lower Credibility (≤60%)</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">Credibility Factors:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Government (.gov) and Educational (.edu) domains: +40% credibility</li>
                        <li>• Academic sources (Scholar, arXiv, PubMed): +30% credibility</li>
                        <li>• Reputable news sources (Reuters, Bloomberg, WSJ): +20% credibility</li>
                        <li>• HTTPS encryption: +10% credibility</li>
                        <li>• Recent publication (within 30 days): +10% credibility</li>
                        <li>• Social media sources: -20% credibility</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {intelligenceMutation.isError && (
        <Alert className="mt-4">
          <AlertDescription>
            Intelligence gathering failed. This may be due to API rate limits or connectivity issues. 
            Please try again or contact support if the issue persists.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}