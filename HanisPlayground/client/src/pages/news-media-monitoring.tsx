import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Newspaper, TrendingUp, Eye, Bell, Globe, 
  Download, Search, Calendar, ExternalLink, AlertCircle
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function NewsMediaMonitoring() {
  const [monitoringQuery, setMonitoringQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaAnalysis = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/news-monitoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      setIsAnalyzing(false);
    }
  });

  const handleMediaAnalysis = () => {
    if (monitoringQuery.trim()) {
      setIsAnalyzing(true);
      mediaAnalysis.mutate({ query: monitoringQuery });
    }
  };

  const { data: liveNews } = useQuery({
    queryKey: ['/api/news-feed'],
    refetchInterval: 30000
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
            News & Media Monitoring
          </h1>
          <p className="text-slate-300 text-lg">
            Stay ahead of market signals, customer sentiment, and PR trends with real-time intelligence
          </p>
        </div>

        {/* Media Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Articles Today</p>
                  <p className="text-2xl font-bold text-cyan-400">1,247</p>
                  <p className="text-green-400 text-xs">+23% vs yesterday</p>
                </div>
                <Newspaper className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Sentiment Score</p>
                  <p className="text-2xl font-bold text-green-400">7.8/10</p>
                  <p className="text-green-400 text-xs">Positive trend</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Alerts</p>
                  <p className="text-2xl font-bold text-yellow-400">8</p>
                  <p className="text-yellow-400 text-xs">Requiring attention</p>
                </div>
                <Bell className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Global Reach</p>
                  <p className="text-2xl font-bold text-blue-400">47</p>
                  <p className="text-blue-400 text-xs">Countries covered</p>
                </div>
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="live" className="data-[state=active]:bg-cyan-600">Live News Feed</TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-cyan-600">Brand Monitoring</TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-cyan-600">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-cyan-600">Alert Management</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-cyan-400" />
                  Real-time News Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter company, topic, or keyword to monitor news coverage..."
                    value={monitoringQuery}
                    onChange={(e) => setMonitoringQuery(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleMediaAnalysis()}
                  />
                  <Button 
                    onClick={handleMediaAnalysis}
                    disabled={mediaAnalysis.isPending || isAnalyzing}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Monitor News
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: 'Tech Industry Sees Major AI Breakthrough in Customer Service Automation',
                      source: 'TechCrunch',
                      time: '2 hours ago',
                      sentiment: 'Positive',
                      relevance: 92,
                      category: 'Technology'
                    },
                    {
                      title: 'Market Analysis: Digital Transformation Spending to Reach $2.8 Trillion',
                      source: 'Financial Times',
                      time: '4 hours ago',
                      sentiment: 'Neutral',
                      relevance: 87,
                      category: 'Finance'
                    },
                    {
                      title: 'Startup Raises $50M Series B for Revolutionary Business Intelligence Platform',
                      source: 'VentureBeat',
                      time: '6 hours ago',
                      sentiment: 'Positive',
                      relevance: 89,
                      category: 'Startups'
                    },
                    {
                      title: 'New Regulations May Impact SaaS Industry Growth Projections',
                      source: 'Reuters',
                      time: '8 hours ago',
                      sentiment: 'Negative',
                      relevance: 78,
                      category: 'Regulatory'
                    },
                    {
                      title: 'Customer Experience Trends Shaping Enterprise Software Development',
                      source: 'Harvard Business Review',
                      time: '12 hours ago',
                      sentiment: 'Positive',
                      relevance: 85,
                      category: 'Business'
                    }
                  ].map((article, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-l-cyan-500">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1 line-clamp-2">{article.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>{article.source}</span>
                            <span>{article.time}</span>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <Badge 
                            variant="outline" 
                            className={
                              article.sentiment === 'Positive' ? 'border-green-500 text-green-300' :
                              article.sentiment === 'Negative' ? 'border-red-500 text-red-300' :
                              'border-yellow-500 text-yellow-300'
                            }
                          >
                            {article.sentiment}
                          </Badge>
                          <p className="text-cyan-400 text-sm mt-1">{article.relevance}% relevant</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <Progress value={article.relevance} className="flex-1 h-1 mr-4" />
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Read More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Brand Mention Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { brand: 'Our Company', mentions: 1247, sentiment: 78, change: '+12%' },
                      { brand: 'Competitor A', mentions: 892, sentiment: 65, change: '+8%' },
                      { brand: 'Competitor B', mentions: 1456, sentiment: 72, change: '-3%' },
                      { brand: 'Industry Leader', mentions: 2134, sentiment: 81, change: '+15%' }
                    ].map((brand, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-white font-medium">{brand.brand}</h5>
                          <span className={`text-sm ${brand.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {brand.change}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Mentions</p>
                            <p className="text-white font-semibold">{brand.mentions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Sentiment Score</p>
                            <p className="text-cyan-400 font-semibold">{brand.sentiment}/100</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Media Coverage Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Total Coverage</p>
                        <p className="text-2xl font-bold text-cyan-400">3,247</p>
                        <p className="text-cyan-400 text-xs">Articles this week</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Media Reach</p>
                        <p className="text-2xl font-bold text-blue-400">12.8M</p>
                        <p className="text-blue-400 text-xs">Potential audience</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Top Media Sources</h5>
                      {[
                        { source: 'TechCrunch', articles: 47, reach: '2.3M' },
                        { source: 'Financial Times', articles: 23, reach: '1.8M' },
                        { source: 'Forbes', articles: 31, reach: '2.1M' },
                        { source: 'Reuters', articles: 19, reach: '3.2M' },
                        { source: 'Bloomberg', articles: 15, reach: '1.9M' }
                      ].map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <span className="text-white font-medium">{source.source}</span>
                          <div className="text-right text-sm">
                            <p className="text-cyan-400">{source.articles} articles</p>
                            <p className="text-slate-400">{source.reach} reach</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Sentiment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Positive</p>
                        <p className="text-2xl font-bold text-green-400">67%</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Neutral</p>
                        <p className="text-2xl font-bold text-yellow-400">23%</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Negative</p>
                        <p className="text-2xl font-bold text-red-400">10%</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Sentiment by Topic</h5>
                      {[
                        { topic: 'Product Quality', score: 8.7, trend: 'up' },
                        { topic: 'Customer Service', score: 7.9, trend: 'up' },
                        { topic: 'Pricing', score: 6.2, trend: 'down' },
                        { topic: 'Innovation', score: 9.1, trend: 'up' },
                        { topic: 'Market Position', score: 7.8, trend: 'stable' }
                      ].map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <span className="text-white font-medium">{topic.topic}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-semibold">{topic.score}/10</span>
                            {topic.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            ) : topic.trend === 'down' ? (
                              <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
                            ) : (
                              <div className="h-4 w-4 bg-yellow-400 rounded-full" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        insight: 'Product quality mentions increased 45% this month',
                        impact: 'Positive',
                        action: 'Leverage in marketing campaigns'
                      },
                      {
                        insight: 'Pricing concerns mentioned in 23% of negative reviews',
                        impact: 'Negative',
                        action: 'Review pricing strategy'
                      },
                      {
                        insight: 'Innovation coverage peaked during product launch',
                        impact: 'Positive',
                        action: 'Maintain innovation messaging'
                      },
                      {
                        insight: 'Customer service response time praised in 67% of mentions',
                        impact: 'Positive',
                        action: 'Highlight in testimonials'
                      },
                      {
                        insight: 'Market position strengthened vs competitors',
                        impact: 'Positive',
                        action: 'Amplify thought leadership'
                      }
                    ].map((insight, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex items-start gap-2 mb-2">
                          <Badge 
                            variant="outline" 
                            className={insight.impact === 'Positive' ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300'}
                          >
                            {insight.impact}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-1">{insight.insight}</p>
                        <p className="text-slate-400 text-xs">{insight.action}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Active Alerts & Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      alert: 'Competitor launched new product feature',
                      priority: 'High',
                      time: '1 hour ago',
                      source: 'Product Hunt',
                      action: 'required'
                    },
                    {
                      alert: 'Negative review trending on social media',
                      priority: 'Critical',
                      time: '3 hours ago',
                      source: 'Twitter',
                      action: 'required'
                    },
                    {
                      alert: 'Industry report mentions our company positively',
                      priority: 'Medium',
                      time: '5 hours ago',
                      source: 'Gartner',
                      action: 'optional'
                    },
                    {
                      alert: 'CEO quoted in major publication',
                      priority: 'Low',
                      time: '8 hours ago',
                      source: 'Wall Street Journal',
                      action: 'optional'
                    },
                    {
                      alert: 'Keyword ranking increased for target terms',
                      priority: 'Medium',
                      time: '12 hours ago',
                      source: 'Google Trends',
                      action: 'monitor'
                    }
                  ].map((alert, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-semibold">{alert.alert}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                            <span>{alert.source}</span>
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={
                              alert.priority === 'Critical' ? 'border-red-500 text-red-300' :
                              alert.priority === 'High' ? 'border-orange-500 text-orange-300' :
                              alert.priority === 'Medium' ? 'border-yellow-500 text-yellow-300' :
                              'border-green-500 text-green-300'
                            }
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        {alert.action === 'required' && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Take Action
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Bell className="h-3 w-3 mr-1" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Media Monitoring Report
          </Button>
        </div>
      </div>
    </div>
  );
}