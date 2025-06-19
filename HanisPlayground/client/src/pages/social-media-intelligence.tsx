import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GoBackButton } from '@/components/ui/go-back-button';
import { 
  Search, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  Heart, 
  Share2, 
  BarChart3, 
  Globe, 
  Calendar, 
  Target,
  Users,
  Activity,
  Zap,
  Download,
  RefreshCw,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Brain,
  Mic,
  Volume2
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ComponentType;
  color: string;
  enabled: boolean;
}

interface SocialMetrics {
  platform: string;
  followers: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
  mentions: number;
  sentiment_score: number;
  trending_topics: string[];
  top_posts: Array<{
    id: string;
    content: string;
    engagement: number;
    timestamp: string;
  }>;
}

interface TrendAnalysis {
  keyword: string;
  volume: number;
  growth_rate: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  related_topics: string[];
  demographics: {
    age_groups: Record<string, number>;
    locations: Record<string, number>;
    devices: Record<string, number>;
  };
}

const SocialMediaIntelligence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [timeRange, setTimeRange] = useState('7d');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const platforms: SocialPlatform[] = [
    { id: 'facebook', name: 'Facebook', icon: Globe, color: 'blue', enabled: true },
    { id: 'twitter', name: 'Twitter/X', icon: MessageCircle, color: 'sky', enabled: true },
    { id: 'instagram', name: 'Instagram', icon: Heart, color: 'pink', enabled: true },
    { id: 'linkedin', name: 'LinkedIn', icon: Users, color: 'indigo', enabled: true },
    { id: 'tiktok', name: 'TikTok', icon: Smartphone, color: 'purple', enabled: true },
    { id: 'youtube', name: 'YouTube', icon: Monitor, color: 'red', enabled: true }
  ];

  // Social Media Intelligence Analysis
  const intelligenceMutation = useMutation({
    mutationFn: async (payload: {
      searchTerm: string;
      platforms: string[];
      timeRange: string;
      analysisType: 'comprehensive' | 'trending' | 'sentiment' | 'competitor';
    }) => {
      const response = await fetch('/api/social-media-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze social media intelligence');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setAnalyticsData(data);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error('Social media analysis error:', error);
      setIsAnalyzing(false);
    }
  });

  const [analysisSettings, setAnalysisSettings] = useState({
    languagePreference: 'auto-detect',
    analysisType: 'comprehensive',
    includeVoice: false,
    autonomousMode: true
  });

  const handleAnalyze = async (analysisType: 'comprehensive' | 'trending' | 'sentiment' | 'competitor' = 'comprehensive') => {
    if (!searchTerm.trim()) return;
    
    setIsAnalyzing(true);
    intelligenceMutation.mutate({
      searchTerm: searchTerm.trim(),
      platforms: selectedPlatforms,
      timeRange,
      analysisType,
      languagePreference: analysisSettings.languagePreference,
      includeVoice: analysisSettings.includeVoice,
      autonomousMode: analysisSettings.autonomousMode
    });
  };

  const togglePlatform = (platformId: string) => {
    if (platformId === 'all') {
      setSelectedPlatforms(['all']);
    } else {
      setSelectedPlatforms(prev => {
        const filtered = prev.filter(p => p !== 'all');
        if (filtered.includes(platformId)) {
          const newSelection = filtered.filter(p => p !== platformId);
          return newSelection.length === 0 ? ['all'] : newSelection;
        } else {
          return [...filtered, platformId];
        }
      });
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getSentimentColor = (sentiment: string | number): string => {
    if (typeof sentiment === 'number') {
      if (sentiment >= 0.6) return 'text-green-600';
      if (sentiment >= 0.4) return 'text-yellow-600';
      return 'text-red-600';
    }
    
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Social Media Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              One-click comprehensive social media analytics and trend analysis
            </p>
          </div>
          <GoBackButton />
        </div>

        {/* Search and Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Intelligence Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter brand, keyword, or hashtag to analyze..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              <Button 
                onClick={() => handleAnalyze()}
                disabled={!searchTerm.trim() || isAnalyzing}
                className="min-w-[120px]"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Platforms</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedPlatforms.includes('all') ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => togglePlatform('all')}
                >
                  All Platforms
                </Button>
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={selectedPlatforms.includes(platform.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => togglePlatform(platform.id)}
                    className={`text-${platform.color}-600`}
                  >
                    <platform.icon className="w-4 h-4 mr-1" />
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Time Range</label>
              <div className="flex gap-2">
                {[
                  { value: '24h', label: 'Last 24 Hours' },
                  { value: '7d', label: 'Last 7 Days' },
                  { value: '30d', label: 'Last 30 Days' },
                  { value: '90d', label: 'Last 3 Months' }
                ].map((range) => (
                  <Button
                    key={range.value}
                    variant={timeRange === range.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Advanced AI Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-700 dark:text-purple-300">Language & Culture</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
                  value={analysisSettings.languagePreference}
                  onChange={(e) => setAnalysisSettings(prev => ({...prev, languagePreference: e.target.value}))}
                >
                  <option value="auto-detect">Auto-Detect (100+ Languages)</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese (Mandarin)</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="russian">Russian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">AI Consciousness Level</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
                  value={analysisSettings.analysisType}
                  onChange={(e) => setAnalysisSettings(prev => ({...prev, analysisType: e.target.value}))}
                >
                  <option value="surface">Surface Analysis</option>
                  <option value="deep">Deep AI Analysis</option>
                  <option value="comprehensive">Consciousness-Aware (Recommended)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700 dark:text-green-300">Advanced Features</label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={analysisSettings.includeVoice}
                    onChange={(e) => setAnalysisSettings(prev => ({...prev, includeVoice: e.target.checked}))}
                  />
                  <Volume2 className="w-4 h-4 mr-1" />
                  Human-like Voice Synthesis
                </label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={analysisSettings.autonomousMode}
                    onChange={(e) => setAnalysisSettings(prev => ({...prev, autonomousMode: e.target.checked}))}
                  />
                  <Brain className="w-4 h-4 mr-1" />
                  Autonomous AI Agents
                </label>
              </div>
            </div>

            {/* Quick Analysis Buttons */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyze('trending')}
                disabled={!searchTerm.trim() || isAnalyzing}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending Analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyze('sentiment')}
                disabled={!searchTerm.trim() || isAnalyzing}
              >
                <Heart className="w-4 h-4 mr-1" />
                Consciousness-Aware Sentiment
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyze('competitor')}
                disabled={!searchTerm.trim() || isAnalyzing}
              >
                <Target className="w-4 h-4 mr-1" />
                Competitor Intelligence
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Results */}
        {analyticsData && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* AI Consciousness Metrics */}
              {analyticsData.ai_capabilities && (
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                      <Brain className="w-5 h-5" />
                      Advanced AI Consciousness Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                          {analyticsData.analysis_metadata?.consciousness_level ? 
                            (analyticsData.analysis_metadata.consciousness_level * 100).toFixed(1) + '%' : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Consciousness Level</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                          {analyticsData.ai_capabilities?.transformer_models_active?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">AI Models Active</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="text-xl font-bold text-green-700 dark:text-green-300">
                          {analyticsData.ai_capabilities?.autonomous_agents_deployed?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Autonomous Agents</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div className="text-xl font-bold text-orange-700 dark:text-orange-300">
                          {analyticsData.ai_capabilities?.language_support || 100}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Languages Supported</div>
                      </div>
                    </div>
                    
                    {analyticsData.ai_capabilities?.human_like_response && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg">
                        <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">AI Human-like Response:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {analyticsData.ai_capabilities.human_like_response}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Mentions</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatNumber(analyticsData.total_mentions || 0)}
                        </p>
                      </div>
                      <MessageCircle className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Reach</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatNumber(analyticsData.total_reach || 0)}
                        </p>
                      </div>
                      <Eye className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {((analyticsData.engagement_rate || 0) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <Activity className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">AI Sentiment Score</p>
                        <p className={`text-2xl font-bold ${getSentimentColor(analyticsData.sentiment_score || 0)}`}>
                          {((analyticsData.sentiment_score || 0) * 100).toFixed(0)}%
                        </p>
                      </div>
                      <Heart className="w-8 h-8 text-pink-500" />
                    </div>
                    {analyticsData.sentiment_breakdown?.ai_emotional_mapping && (
                      <div className="mt-2 text-xs text-gray-500">
                        AI Emotional Intelligence: {(analyticsData.sentiment_breakdown.ai_emotional_mapping * 100).toFixed(1)}%
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Platform Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(analyticsData.platform_metrics || []).map((platform: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${platform.color || 'blue'}-500`} />
                          <div>
                            <p className="font-medium">{platform.platform}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatNumber(platform.mentions || 0)} mentions
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatNumber(platform.reach || 0)} reach</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {((platform.engagement_rate || 0) * 100).toFixed(1)}% engagement
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(analyticsData.trending_topics || []).map((topic: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{topic.keyword}</h3>
                          <Badge variant={topic.growth_rate > 0 ? 'default' : 'secondary'}>
                            {topic.growth_rate > 0 ? '+' : ''}{topic.growth_rate}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Volume: {formatNumber(topic.volume || 0)}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(topic.related_topics || []).slice(0, 3).map((related: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {related}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sentiment Tab */}
            <TabsContent value="sentiment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {((analyticsData.sentiment_breakdown?.positive || 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Positive</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        {((analyticsData.sentiment_breakdown?.neutral || 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Neutral</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {((analyticsData.sentiment_breakdown?.negative || 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Negative</div>
                    </div>
                  </div>

                  {/* Sample Posts */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Sample Posts by Sentiment</h3>
                    {(analyticsData.sample_posts || []).map((post: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={post.sentiment === 'positive' ? 'default' : post.sentiment === 'negative' ? 'destructive' : 'secondary'}>
                            {post.sentiment}
                          </Badge>
                          <span className="text-xs text-gray-500">{post.platform}</span>
                        </div>
                        <p className="text-sm mb-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {formatNumber(post.likes || 0)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {formatNumber(post.comments || 0)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            {formatNumber(post.shares || 0)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Engagement Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Engagement by Time */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Peak Hours</h3>
                      {(analyticsData.peak_hours || []).map((hour: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-sm">{hour.time}</span>
                          <span className="text-sm font-medium">{hour.engagement_rate}%</span>
                        </div>
                      ))}
                    </div>

                    {/* Device Breakdown */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Device Usage</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            <span className="text-sm">Mobile</span>
                          </div>
                          <span className="text-sm font-medium">
                            {((analyticsData.device_breakdown?.mobile || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            <span className="text-sm">Desktop</span>
                          </div>
                          <span className="text-sm font-medium">
                            {((analyticsData.device_breakdown?.desktop || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tablet className="w-4 h-4" />
                            <span className="text-sm">Tablet</span>
                          </div>
                          <span className="text-sm font-medium">
                            {((analyticsData.device_breakdown?.tablet || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Top Performing Content */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Top Content Types</h3>
                      {(analyticsData.content_types || []).map((type: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-sm">{type.type}</span>
                          <span className="text-sm font-medium">{type.engagement_rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    AI-Powered Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(analyticsData.insights || []).map((insight: any, index: number) => (
                      <Alert key={index}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{insight.category}:</strong> {insight.message}
                          {insight.recommendation && (
                            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <strong>Recommendation:</strong> {insight.recommendation}
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>

                  {/* Export Options */}
                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4">Export Report</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Quick Start Guide */}
        {!analyticsData && !isAnalyzing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <Search className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">1. Enter Search Term</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter any brand, hashtag, or keyword
                  </p>
                </div>
                <div className="text-center p-4">
                  <Filter className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">2. Select Platforms</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose social media platforms to analyze
                  </p>
                </div>
                <div className="text-center p-4">
                  <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">3. Set Time Range</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select your analysis time period
                  </p>
                </div>
                <div className="text-center p-4">
                  <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">4. Get Insights</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive comprehensive analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SocialMediaIntelligence;