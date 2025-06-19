import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AdaptiveLayout, 
  AdaptiveGrid, 
  AdaptiveCard, 
  AdaptiveNavigation,
  AdaptiveTypography,
  useScreenInfo 
} from '@/components/ui/adaptive-layout';
import { 
  TrendingUp, TrendingDown, Users, MessageSquare, Heart, Share2,
  BarChart3, PieChart, Activity, AlertTriangle, CheckCircle,
  Calendar, Clock, Globe, Zap, Target, Eye, ThumbsUp, ThumbsDown,
  Download, RefreshCw, Search, Filter, Play, Pause, Volume2
} from 'lucide-react';
import { Link } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import GoBackButton from '@/components/ui/go-back-button';
import TutorialOverlay from '@/components/ui/tutorial-overlay';
import { apiRequest } from '@/lib/queryClient';

interface SocialMetrics {
  platform: string;
  followers: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
  mentions: number;
  sentiment_score: number;
  trending_topics: string[];
  top_posts: any[];
  competitor_data: any[];
}

interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
  overall_score: number;
  key_emotions: string[];
  trending_sentiment: string;
}

interface CompetitorAnalysis {
  competitor: string;
  followers: number;
  engagement_rate: number;
  content_frequency: number;
  top_performing_content: any[];
  sentiment_comparison: number;
}

export default function SocialMediaDashboard() {
  const { user, isAuthenticated } = useAuth();
  const screenInfo = useScreenInfo();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);
  const [timeRange, setTimeRange] = useState('7d');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Globe },
    { id: 'twitter', name: 'Twitter/X', icon: MessageSquare },
    { id: 'instagram', name: 'Instagram', icon: Heart },
    { id: 'facebook', name: 'Facebook', icon: Users },
    { id: 'linkedin', name: 'LinkedIn', icon: Users },
    { id: 'tiktok', name: 'TikTok', icon: Play },
    { id: 'youtube', name: 'YouTube', icon: Volume2 }
  ];

  // Social Media Intelligence Analysis
  const analysisMutation = useMutation({
    mutationFn: async (data: { query: string; platforms: string[]; timeRange: string }) => {
      const response = await apiRequest('/api/social-media-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          search_term: data.query,
          platforms: data.platforms,
          time_range: data.timeRange,
          include_sentiment: true,
          include_competitors: true,
          include_trending: true
        })
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setAnalysisResults(data.intelligence);
      }
    },
    onError: (error) => {
      console.error('Analysis error:', error);
    }
  });

  const handleAnalysis = () => {
    if (!searchQuery.trim()) return;
    
    analysisMutation.mutate({
      query: searchQuery,
      platforms: selectedPlatforms,
      timeRange
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalysis();
    }
  };

  useEffect(() => {
    if (autoRefresh && searchQuery) {
      const interval = setInterval(() => {
        handleAnalysis();
      }, 300000); // Refresh every 5 minutes
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh, searchQuery]);

  const tutorialSteps = [
    {
      target: '[data-tutorial="search-input"]',
      title: 'Search Social Media',
      content: 'Enter brand names, keywords, or hashtags to monitor across all major social platforms.',
      placement: 'bottom' as const
    },
    {
      target: '[data-tutorial="platform-selector"]',
      title: 'Select Platforms',
      content: 'Choose specific social media platforms or monitor all platforms simultaneously.',
      placement: 'bottom' as const
    },
    {
      target: '[data-tutorial="metrics-overview"]',
      title: 'Real-Time Metrics',
      content: 'View engagement rates, reach, sentiment analysis, and trending topics in real-time.',
      placement: 'left' as const
    },
    {
      target: '[data-tutorial="competitor-analysis"]',
      title: 'Competitor Intelligence',
      content: 'Compare your performance with competitors and identify market opportunities.',
      placement: 'top' as const
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return 'text-green-600';
    if (score >= 0.3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 0.6) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 0.3) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <AdaptiveLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <GoBackButton />
          <div>
            <AdaptiveTypography variant="h1" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              One-Click Social Media Intelligence
            </AdaptiveTypography>
            <AdaptiveTypography variant="subtitle" className="text-gray-600 dark:text-gray-400">
              Comprehensive social media monitoring, sentiment analysis, and competitive intelligence
            </AdaptiveTypography>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTutorial(true)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Tutorial
          </Button>
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <AdaptiveCard className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Social Media Intelligence Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2" data-tutorial="search-input">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter brand, keyword, or hashtag to monitor..."
                className="w-full"
              />
            </div>
            
            <div data-tutorial="platform-selector">
              <Select value={selectedPlatforms[0]} onValueChange={(value) => setSelectedPlatforms([value])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Button
              onClick={handleAnalysis}
              disabled={!searchQuery.trim() || analysisMutation.isPending}
              className="flex items-center gap-2"
            >
              {analysisMutation.isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              Analyze Social Media
            </Button>
            
            {analysisResults && (
              <Button
                variant="outline"
                onClick={() => {
                  // Export functionality
                }}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            )}
          </div>
        </CardContent>
      </AdaptiveCard>

      {/* Results */}
      {analysisResults && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Overview */}
            <div data-tutorial="metrics-overview">
              <AdaptiveGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }} className="mb-6">
                <AdaptiveCard>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Mentions</p>
                        <p className="text-2xl font-bold">{formatNumber(analysisResults.total_mentions || 0)}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12% from last period</span>
                    </div>
                  </CardContent>
                </AdaptiveCard>

                <AdaptiveCard>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reach</p>
                        <p className="text-2xl font-bold">{formatNumber(analysisResults.total_reach || 0)}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8% from last period</span>
                    </div>
                  </CardContent>
                </AdaptiveCard>

                <AdaptiveCard>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement Rate</p>
                        <p className="text-2xl font-bold">{(analysisResults.engagement_rate || 0).toFixed(1)}%</p>
                      </div>
                      <Heart className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600">-2% from last period</span>
                    </div>
                  </CardContent>
                </AdaptiveCard>

                <AdaptiveCard>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sentiment Score</p>
                        <p className={`text-2xl font-bold ${getSentimentColor(analysisResults.sentiment_score || 0)}`}>
                          {((analysisResults.sentiment_score || 0) * 100).toFixed(0)}%
                        </p>
                      </div>
                      <Activity className="w-8 h-8 text-orange-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Positive trend</span>
                    </div>
                  </CardContent>
                </AdaptiveCard>
              </AdaptiveGrid>
            </div>

            {/* Platform Breakdown */}
            <AdaptiveCard>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.platform_breakdown?.map((platform: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{platform.platform}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatNumber(platform.mentions)} mentions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${getSentimentColor(platform.sentiment)}`}>
                            {(platform.sentiment * 100).toFixed(0)}% positive
                          </span>
                          <Badge variant="outline">
                            {platform.engagement_rate.toFixed(1)}% engagement
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </AdaptiveCard>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            {/* Sentiment Analysis */}
            <AdaptiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }}>
              <AdaptiveCard>
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span>Positive</span>
                      </div>
                      <span className="font-medium">{((analysisResults.sentiment?.positive || 0) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(analysisResults.sentiment?.positive || 0) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-yellow-500" />
                        <span>Neutral</span>
                      </div>
                      <span className="font-medium">{((analysisResults.sentiment?.neutral || 0) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${(analysisResults.sentiment?.neutral || 0) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        <span>Negative</span>
                      </div>
                      <span className="font-medium">{((analysisResults.sentiment?.negative || 0) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(analysisResults.sentiment?.negative || 0) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </AdaptiveCard>

              <AdaptiveCard>
                <CardHeader>
                  <CardTitle>Key Emotions Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.key_emotions?.map((emotion: string, index: number) => (
                      <Badge key={index} variant="secondary" className="capitalize">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </AdaptiveCard>
            </AdaptiveGrid>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            {/* Engagement Metrics */}
            <AdaptiveCard>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.top_posts?.slice(0, 5).map((post: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{post.platform}</Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {formatNumber(post.likes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            {formatNumber(post.shares)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {formatNumber(post.comments)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{post.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </AdaptiveCard>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            {/* Competitor Analysis */}
            <div data-tutorial="competitor-analysis">
              <AdaptiveCard>
                <CardHeader>
                  <CardTitle>Competitor Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.competitors?.map((competitor: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{competitor.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatNumber(competitor.followers)} followers
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {competitor.engagement_rate.toFixed(1)}% engagement
                              </Badge>
                              <span className={`text-sm ${getSentimentColor(competitor.sentiment)}`}>
                                {(competitor.sentiment * 100).toFixed(0)}% positive
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Posts/Week</p>
                            <p className="font-medium">{competitor.posts_per_week}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Avg. Engagement</p>
                            <p className="font-medium">{formatNumber(competitor.avg_engagement)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Growth Rate</p>
                            <p className={`font-medium ${competitor.growth_rate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {competitor.growth_rate > 0 ? '+' : ''}{competitor.growth_rate.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AdaptiveCard>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Trending Topics */}
            <AdaptiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }}>
              <AdaptiveCard>
                <CardHeader>
                  <CardTitle>Trending Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResults.trending_hashtags?.map((hashtag: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-blue-600 dark:text-blue-400">#{hashtag.tag}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatNumber(hashtag.count)} mentions
                          </span>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AdaptiveCard>

              <AdaptiveCard>
                <CardHeader>
                  <CardTitle>Trending Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResults.trending_keywords?.map((keyword: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{keyword.word}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatNumber(keyword.frequency)} mentions
                          </span>
                          <Badge variant="secondary">{keyword.growth}% growth</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AdaptiveCard>
            </AdaptiveGrid>
          </TabsContent>
        </Tabs>
      )}

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        steps={tutorialSteps}
        title="Social Media Intelligence Dashboard Guide"
      />
    </AdaptiveLayout>
  );
}