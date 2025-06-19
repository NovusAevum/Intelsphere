import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Heart, 
  Share2, 
  Eye, 
  BarChart3, 
  Globe, 
  Search,
  RefreshCw,
  Calendar,
  Target,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Zap
} from 'lucide-react';

interface SocialMetrics {
  platform: string;
  followers: number;
  engagement: number;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  posts: number;
  reach: number;
}

interface TrendingTopic {
  keyword: string;
  volume: number;
  sentiment: number;
  platforms: string[];
  growth: number;
}

interface SocialPost {
  id: string;
  platform: string;
  author: string;
  content: string;
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  sentiment: 'positive' | 'negative' | 'neutral';
  reach: number;
}

interface InfluencerProfile {
  username: string;
  platform: string;
  followers: number;
  engagementRate: number;
  influence: number;
  category: string;
}

interface SocialIntelligenceData {
  metrics: SocialMetrics[];
  trending: TrendingTopic[];
  recentPosts: SocialPost[];
  influencers: InfluencerProfile[];
  sentimentAnalysis: {
    positive: number;
    negative: number;
    neutral: number;
  };
  competitorAnalysis: any[];
  insights: string[];
}

export default function SocialMediaIntelligenceDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [timeRange, setTimeRange] = useState('24h');
  const [monitoringKeywords, setMonitoringKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Auto-refresh data every 5 minutes when enabled
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      socialIntelligenceMutation.mutate(searchQuery || 'social media trends');
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, searchQuery]);

  const socialIntelligenceMutation = useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch('/api/social-media-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          platforms: selectedPlatforms,
          timeRange,
          keywords: monitoringKeywords
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    }
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    socialIntelligenceMutation.mutate(searchQuery);
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !monitoringKeywords.includes(newKeyword.trim())) {
      setMonitoringKeywords([...monitoringKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setMonitoringKeywords(monitoringKeywords.filter(k => k !== keyword));
  };

  const data: SocialIntelligenceData | null = socialIntelligenceMutation.data?.data;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case 'negative': return <ThumbsDown className="w-4 h-4 text-red-600" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Social Media Intelligence Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time social media monitoring, sentiment analysis, and competitive intelligence
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh
          </Button>
          <Badge variant="outline">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Intelligence Query
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Enter search query (brand, hashtag, topic, competitor)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSearch}
              disabled={socialIntelligenceMutation.isPending || !searchQuery.trim()}
              className="w-full"
            >
              {socialIntelligenceMutation.isPending ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>

          {/* Keyword Monitoring */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Monitoring Keywords</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {monitoringKeywords.map((keyword) => (
                <Badge 
                  key={keyword} 
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add monitoring keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                className="flex-1"
              />
              <Button onClick={addKeyword} variant="outline">Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Indicator */}
      {socialIntelligenceMutation.isPending && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Gathering Social Intelligence...</span>
              <span className="text-sm text-gray-500">This may take 30-60 seconds</span>
            </div>
            <Progress value={33} className="mb-2" />
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Analyzing social media platforms and APIs</div>
              <div>• Processing sentiment analysis and engagement metrics</div>
              <div>• Identifying trending topics and influencers</div>
              <div>• Generating competitive intelligence insights</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {data && (
        <>
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">
                  {formatNumber(data.metrics?.reduce((sum, m) => sum + m.followers, 0) || 0)}
                </div>
                <div className="text-sm text-gray-600">Total Reach</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">
                  {formatNumber(data.metrics?.reduce((sum, m) => sum + m.mentions, 0) || 0)}
                </div>
                <div className="text-sm text-gray-600">Mentions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">
                  {formatNumber(data.metrics?.reduce((sum, m) => sum + m.engagement, 0) || 0)}
                </div>
                <div className="text-sm text-gray-600">Engagement</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold">
                  {Math.round((data.sentimentAnalysis?.positive || 0) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Positive Sentiment</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="posts">Recent Posts</TabsTrigger>
              <TabsTrigger value="influencers">Influencers</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Platform Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Platform Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.metrics?.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-semibold">{metric.platform}</div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(metric.followers)} followers
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <div className="font-medium">{formatNumber(metric.mentions)} mentions</div>
                              <div className="text-gray-600">
                                {getSentimentIcon(metric.sentiment)}
                              </div>
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {((metric.engagement / metric.followers) * 100).toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.insights?.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">{insight}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Topics
                  </CardTitle>
                  <CardDescription>
                    Real-time trending keywords and hashtags across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {data.trending?.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex-1">
                          <div className="font-semibold text-lg">#{trend.keyword}</div>
                          <div className="text-sm text-gray-600">
                            {formatNumber(trend.volume)} mentions • {trend.platforms.join(', ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${trend.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.growth > 0 ? '+' : ''}{trend.growth}%
                          </div>
                          <div className="text-sm text-gray-600">growth</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Recent Posts & Mentions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentPosts?.map((post, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{post.platform}</Badge>
                            <span className="font-medium">@{post.author}</span>
                            {getSentimentIcon(post.sentiment)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(post.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm mb-3 line-clamp-3">{post.content}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {formatNumber(post.engagement.likes)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            {formatNumber(post.engagement.shares)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {formatNumber(post.engagement.comments)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {formatNumber(post.reach)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="influencers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Key Influencers & Opinion Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {data.influencers?.map((influencer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {influencer.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold">@{influencer.username}</div>
                            <div className="text-sm text-gray-600">
                              {influencer.platform} • {influencer.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatNumber(influencer.followers)}</div>
                          <div className="text-sm text-gray-600">
                            {influencer.engagementRate.toFixed(2)}% engagement
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sentiment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {Math.round((data.sentimentAnalysis?.positive || 0) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Positive</div>
                      <Progress value={(data.sentimentAnalysis?.positive || 0) * 100} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-600 mb-2">
                        {Math.round((data.sentimentAnalysis?.neutral || 0) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Neutral</div>
                      <Progress value={(data.sentimentAnalysis?.neutral || 0) * 100} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {Math.round((data.sentimentAnalysis?.negative || 0) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Negative</div>
                      <Progress value={(data.sentimentAnalysis?.negative || 0) * 100} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Competitive Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Competitive analysis data will be displayed here</p>
                    <p className="text-sm">Based on your monitoring keywords and industry analysis</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Error Display */}
      {socialIntelligenceMutation.isError && (
        <Alert className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Social media intelligence gathering failed. This may be due to API rate limits or connectivity issues. 
            Please check your API configurations or try again later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}