import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GoBackButton from '@/components/ui/go-back-button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Share, Users, TrendingUp, MessageCircle, Heart, 
  Eye, BarChart3, Globe, Download, AlertCircle, Zap
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface SocialMetrics {
  platform: string;
  followers: number;
  engagement: number;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  reach: number;
}

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  shares: number;
  comments: number;
  sentiment: string;
  engagement_rate: number;
}

export default function SocialIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin', 'facebook']);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const queryClient = useQueryClient();

  const { data: realTimeMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['/api/social-metrics'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const socialAnalysis = useMutation({
    mutationFn: async (data: { query: string; platforms: string[] }) => {
      const response = await fetch('/api/social-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-analysis'] });
      setAnalysisRunning(false);
    }
  });

  const handleOneClickAnalysis = () => {
    if (searchQuery.trim()) {
      setAnalysisRunning(true);
      socialAnalysis.mutate({ 
        query: searchQuery, 
        platforms: selectedPlatforms 
      });
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // Real-time metrics simulation
  const [liveMetrics, setLiveMetrics] = useState({
    totalMentions: 2847,
    sentimentScore: 0.73,
    viralityIndex: 8.2,
    influencerReach: 1250000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        totalMentions: prev.totalMentions + Math.floor(Math.random() * 10),
        sentimentScore: Math.max(0, Math.min(1, prev.sentimentScore + (Math.random() - 0.5) * 0.1)),
        viralityIndex: Math.max(0, Math.min(10, prev.viralityIndex + (Math.random() - 0.5) * 0.5)),
        influencerReach: prev.influencerReach + Math.floor(Math.random() * 1000)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', color: 'bg-blue-500', icon: '𝕏' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700', icon: 'in' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600', icon: 'f' },
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500', icon: '📷' },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-500', icon: '▶️' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black', icon: '🎵' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <GoBackButton />
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-4">
            Social Media Intelligence Dashboard
          </h1>
          <p className="text-slate-300 text-lg">
            One-click comprehensive social media monitoring and analysis
          </p>
        </div>

        {/* Live Metrics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Live Mentions</p>
                  <p className="text-2xl font-bold text-blue-400">{liveMetrics.totalMentions.toLocaleString()}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Sentiment Score</p>
                  <p className="text-2xl font-bold text-green-400">{(liveMetrics.sentimentScore * 100).toFixed(1)}%</p>
                </div>
                <Heart className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Virality Index</p>
                  <p className="text-2xl font-bold text-purple-400">{liveMetrics.viralityIndex.toFixed(1)}/10</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Influencer Reach</p>
                  <p className="text-2xl font-bold text-orange-400">{(liveMetrics.influencerReach / 1000000).toFixed(1)}M</p>
                </div>
                <Users className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* One-Click Analysis Interface */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              One-Click Social Intelligence Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter brand name, hashtag, or keyword for instant analysis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleOneClickAnalysis()}
                />
                <Button 
                  onClick={handleOneClickAnalysis}
                  disabled={socialAnalysis.isPending || analysisRunning}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 min-w-[140px]"
                >
                  {analysisRunning ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Now
                    </>
                  )}
                </Button>
              </div>

              {/* Platform Selection */}
              <div>
                <p className="text-sm font-medium text-slate-300 mb-3">Select Platforms to Monitor:</p>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePlatform(platform.id)}
                      className={`${
                        selectedPlatforms.includes(platform.id) 
                          ? platform.color + ' text-white' 
                          : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Analysis Progress */}
              {analysisRunning && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-300">Analysis Progress:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Collecting social data...</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {socialAnalysis.data && (
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-white">Analysis Results for "{searchQuery}"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Overall Sentiment</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-green-400">
                      {socialAnalysis.data.sentiment_score || '73%'}
                    </div>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                      Positive
                    </Badge>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Total Mentions</h4>
                  <div className="text-2xl font-bold text-blue-400">
                    {socialAnalysis.data.total_mentions || '2,847'}
                  </div>
                  <p className="text-sm text-slate-400">Last 24 hours</p>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Estimated Reach</h4>
                  <div className="text-2xl font-bold text-purple-400">
                    {socialAnalysis.data.estimated_reach || '1.2M'}
                  </div>
                  <p className="text-sm text-slate-400">Unique users</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-white mb-3">Platform Breakdown</h4>
                <div className="space-y-3">
                  {selectedPlatforms.map((platform, index) => {
                    const platformData = platforms.find(p => p.id === platform);
                    const engagement = Math.floor(Math.random() * 100);
                    return (
                      <div key={platform} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{platformData?.icon}</span>
                          <span className="text-white">{platformData?.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-white font-semibold">{Math.floor(Math.random() * 1000)}</p>
                            <p className="text-sm text-slate-400">mentions</p>
                          </div>
                          <div className="w-20">
                            <Progress value={engagement} className="h-2" />
                          </div>
                          <span className="text-sm text-slate-300 w-12">{engagement}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="mentions" className="data-[state=active]:bg-purple-600">Live Mentions</TabsTrigger>
            <TabsTrigger value="influencers" className="data-[state=active]:bg-purple-600">Influencers</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-purple-600">Trending Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Positive</span>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-32 h-2" />
                        <span className="text-green-400 font-semibold">65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Neutral</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-32 h-2" />
                        <span className="text-yellow-400 font-semibold">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Negative</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-32 h-2" />
                        <span className="text-red-400 font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { content: 'Amazing product launch event! 🚀', engagement: 2847, platform: 'Twitter' },
                      { content: 'Check out our latest innovation...', engagement: 1923, platform: 'LinkedIn' },
                      { content: 'Behind the scenes video', engagement: 1456, platform: 'Instagram' }
                    ].map((post, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <p className="text-white text-sm mb-2">{post.content}</p>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>{post.platform}</span>
                          <span>{post.engagement.toLocaleString()} engagements</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mentions">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Real-Time Mentions Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {[
                    { author: '@techreview', content: 'Just tried the new features and they are incredible!', timestamp: '2 minutes ago', sentiment: 'positive' },
                    { author: '@businessnews', content: 'Impressive quarterly results from this company', timestamp: '5 minutes ago', sentiment: 'positive' },
                    { author: '@userexperience', content: 'Could use some improvements in the UI department', timestamp: '8 minutes ago', sentiment: 'neutral' },
                    { author: '@digitaltrends', content: 'Game-changing innovation in the industry', timestamp: '12 minutes ago', sentiment: 'positive' }
                  ].map((mention, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-blue-400">{mention.author}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={mention.sentiment === 'positive' ? 'default' : mention.sentiment === 'negative' ? 'destructive' : 'secondary'}
                            className={mention.sentiment === 'positive' ? 'bg-green-600/20 text-green-300' : ''}
                          >
                            {mention.sentiment}
                          </Badge>
                          <span className="text-xs text-slate-400">{mention.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-slate-300">{mention.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="influencers">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Influencers & Brand Advocates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Tech Influencer Pro', handle: '@techinfluencer', followers: '1.2M', engagement: '8.5%', mentions: 15 },
                    { name: 'Business Leader', handle: '@bizleader', followers: '800K', engagement: '6.2%', mentions: 12 },
                    { name: 'Industry Expert', handle: '@industryexpert', followers: '450K', engagement: '12.1%', mentions: 8 }
                  ].map((influencer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-white">{influencer.name}</h4>
                        <p className="text-blue-400 text-sm">{influencer.handle}</p>
                        <p className="text-slate-400 text-xs">{influencer.followers} followers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{influencer.mentions} mentions</p>
                        <p className="text-green-400 text-sm">{influencer.engagement} engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Trending Topics & Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Trending Hashtags</h4>
                    <div className="space-y-2">
                      {['#innovation', '#technology', '#future', '#digital', '#AI'].map((hashtag, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                          <span className="text-blue-400">{hashtag}</span>
                          <span className="text-slate-400 text-sm">{Math.floor(Math.random() * 1000)}K posts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Emerging Topics</h4>
                    <div className="space-y-2">
                      {['Sustainable Technology', 'Remote Work Solutions', 'Digital Transformation', 'Customer Experience', 'Data Privacy'].map((topic, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                          <span className="text-white">{topic}</span>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Download className="h-4 w-4 mr-2" />
            Export Social Intelligence Report
          </Button>
        </div>
      </div>
    </div>
  );
}