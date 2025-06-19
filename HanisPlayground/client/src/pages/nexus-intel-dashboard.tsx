import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiRequest } from '@/lib/queryClient';
import { Search, AlertTriangle, CheckCircle, Database, TrendingUp, ExternalLink, Star, Clock, Shield } from 'lucide-react';

interface IntelligenceSource {
  url: string;
  title: string;
  snippet: string;
  source: string;
  credibilityScore: number;
  publishedAt?: string;
}

interface StreamlinedIntelligenceResponse {
  query: string;
  sources: IntelligenceSource[];
  totalSources: number;
  processing_time_ms: number;
  intelligence_summary: string;
  credibility_analysis: {
    averageScore: number;
    sourceDiversity: number;
    totalSources: number;
  };
  timestamp: string;
}

export default function NexusIntelDashboard() {
  const [query, setQuery] = useState('');

  const intelligenceMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      return await apiRequest('/api/streamlined-intelligence', 'POST', { query: searchQuery });
    }
  });

  const handleSearch = () => {
    if (query.trim()) {
      intelligenceMutation.mutate(query);
    }
  };

  const data = intelligenceMutation.data?.data as StreamlinedIntelligenceResponse | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexusIntel 2.0v Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced Smart Agentic AI Orchestration surpassing OpenAI's Deep Research capabilities. 
            Unified intelligence gathering from multiple authenticated OSINT sources.
          </p>
        </div>

        {/* API Status Alert */}
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>API Key Required:</strong> To access real-time news data from News API, please provide your API key. 
            Current system is configured with 20+ OSINT sources including MediaStack, API Ninjas, Hunter.io, and BuildWith.
          </AlertDescription>
        </Alert>

        {/* Search Interface */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Advanced Intelligence Query
            </CardTitle>
            <CardDescription>
              Enter your research query for comprehensive intelligence analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="e.g., Tesla stock performance, cryptocurrency trends, market analysis..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={intelligenceMutation.isPending || !query.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {intelligenceMutation.isPending ? 'Analyzing...' : 'Execute'}
              </Button>
            </div>

            {intelligenceMutation.isPending && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 animate-spin" />
                  Processing with authenticated OSINT sources...
                </div>
                <Progress value={75} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Display */}
        {data && (
          <div className="space-y-6">
            
            {/* Intelligence Summary */}
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <TrendingUp className="w-5 h-5" />
                  Intelligence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                  {data.intelligence_summary}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{data.totalSources}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sources Found</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(data.credibility_analysis.averageScore * 100)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Credibility</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{data.credibility_analysis.sourceDiversity}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unique Sources</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{data.processing_time_ms}ms</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Processing Time</div>
                </CardContent>
              </Card>
            </div>

            {/* Source Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Intelligence Sources ({data.sources.length})
                </CardTitle>
                <CardDescription>
                  Data gathered from authenticated OSINT platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.sources.map((source, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {source.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {source.source}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {source.snippet}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Credibility: {Math.round(source.credibilityScore * 100)}%
                          </div>
                          {source.publishedAt && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(source.publishedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      {source.url !== '#' && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {data.sources.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No sources found for this query. Verify API credentials and try again.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Display */}
        {intelligenceMutation.isError && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950">
            <CardContent className="p-6 text-center">
              <div className="text-red-600 dark:text-red-400">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                <p className="font-semibold">Intelligence gathering failed</p>
                <p className="text-sm mt-2">
                  Please verify API credentials and network connectivity
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Configured Sources */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <CheckCircle className="w-5 h-5" />
                Configured OSINT Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Badge variant="outline" className="justify-center">News API</Badge>
                <Badge variant="outline" className="justify-center">MediaStack</Badge>
                <Badge variant="outline" className="justify-center">API Ninjas</Badge>
                <Badge variant="outline" className="justify-center">Hunter.io</Badge>
                <Badge variant="outline" className="justify-center">Apollo.io</Badge>
                <Badge variant="outline" className="justify-center">BuildWith</Badge>
                <Badge variant="outline" className="justify-center">Google CSE</Badge>
                <Badge variant="outline" className="justify-center">SERP API</Badge>
              </div>
            </CardContent>
          </Card>

          {/* System Capabilities */}
          <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                <Shield className="w-5 h-5" />
                Advanced Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <div>• Multi-source intelligence aggregation</div>
                <div>• Real-time credibility scoring</div>
                <div>• Advanced source diversity analysis</div>
                <div>• Comprehensive intelligence synthesis</div>
                <div>• Smart agentic orchestration</div>
                <div>• Authentic data prioritization</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Query Metadata */}
        {data && (
          <Card className="bg-gray-50 dark:bg-gray-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div>Query: "{data.query}"</div>
                <div>Processed: {new Date(data.timestamp).toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}