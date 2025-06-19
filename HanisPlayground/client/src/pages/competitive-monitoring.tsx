import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, TrendingUp, TrendingDown, Eye, AlertTriangle, 
  Download, Search, Building, Globe, Zap, Activity
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function CompetitiveMonitoring() {
  const [competitorSearch, setCompetitorSearch] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);

  const competitorAnalysis = useMutation({
    mutationFn: async (data: { competitor: string }) => {
      const response = await fetch('/api/competitor-monitoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      setIsMonitoring(false);
    }
  });

  const handleCompetitorAnalysis = () => {
    if (competitorSearch.trim()) {
      setIsMonitoring(true);
      competitorAnalysis.mutate({ competitor: competitorSearch });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-orange-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent mb-4">
            Competitive Monitoring
          </h1>
          <p className="text-slate-300 text-lg">
            Track changes in competitor strategies and moves in real-time
          </p>
        </div>

        {/* Monitoring Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Tracked Competitors</p>
                  <p className="text-2xl font-bold text-yellow-400">47</p>
                  <p className="text-green-400 text-xs">+3 this week</p>
                </div>
                <Building className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Alerts</p>
                  <p className="text-2xl font-bold text-orange-400">23</p>
                  <p className="text-orange-400 text-xs">High priority: 5</p>
                </div>
                <Bell className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Market Changes</p>
                  <p className="text-2xl font-bold text-red-400">12</p>
                  <p className="text-red-400 text-xs">Last 24 hours</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Threat Level</p>
                  <p className="text-2xl font-bold text-purple-400">Medium</p>
                  <p className="text-purple-400 text-xs">Overall assessment</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-600">Monitoring Overview</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-yellow-600">Real-time Alerts</TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-yellow-600">Competitive Analysis</TabsTrigger>
            <TabsTrigger value="tracking" className="data-[state=active]:bg-yellow-600">Market Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-yellow-400" />
                  Competitive Intelligence Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter competitor name or domain to monitor..."
                    value={competitorSearch}
                    onChange={(e) => setCompetitorSearch(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleCompetitorAnalysis()}
                  />
                  <Button 
                    onClick={handleCompetitorAnalysis}
                    disabled={competitorAnalysis.isPending || isMonitoring}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  >
                    {isMonitoring ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Monitoring...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Start Monitoring
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Top Competitors</h4>
                    <div className="space-y-3">
                      {[
                        {
                          name: 'TechCorp Solutions',
                          domain: 'techcorp.com',
                          threat: 'High',
                          changes: 8,
                          marketShare: '24%'
                        },
                        {
                          name: 'Innovation Labs',
                          domain: 'innovlabs.com',
                          threat: 'Medium',
                          changes: 5,
                          marketShare: '18%'
                        },
                        {
                          name: 'Digital Dynamics',
                          domain: 'digitaldyn.com',
                          threat: 'High',
                          changes: 12,
                          marketShare: '31%'
                        },
                        {
                          name: 'Future Systems',
                          domain: 'futuresys.com',
                          threat: 'Low',
                          changes: 2,
                          marketShare: '9%'
                        }
                      ].map((competitor, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h5 className="text-white font-medium">{competitor.name}</h5>
                              <p className="text-slate-400 text-sm">{competitor.domain}</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={
                                competitor.threat === 'High' ? 'border-red-500 text-red-300' :
                                competitor.threat === 'Medium' ? 'border-yellow-500 text-yellow-300' :
                                'border-green-500 text-green-300'
                              }
                            >
                              {competitor.threat} Threat
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Market Share</p>
                              <p className="text-white font-semibold">{competitor.marketShare}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Recent Changes</p>
                              <p className="text-white font-semibold">{competitor.changes} this month</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Market Intelligence</h4>
                    <div className="space-y-4">
                      {[
                        { metric: 'Market Volatility', value: 'High', trend: 'increasing' },
                        { metric: 'New Entrants', value: '3 this quarter', trend: 'stable' },
                        { metric: 'Price Competition', value: 'Moderate', trend: 'decreasing' },
                        { metric: 'Innovation Rate', value: 'Accelerating', trend: 'increasing' }
                      ].map((intel, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{intel.metric}</p>
                            <p className="text-slate-400 text-sm">{intel.value}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {intel.trend === 'increasing' ? (
                              <TrendingUp className="h-4 w-4 text-red-400" />
                            ) : intel.trend === 'decreasing' ? (
                              <TrendingDown className="h-4 w-4 text-green-400" />
                            ) : (
                              <Activity className="h-4 w-4 text-yellow-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Real-time Competitive Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      company: 'TechCorp Solutions',
                      alert: 'Launched new AI-powered feature',
                      priority: 'High',
                      time: '2 hours ago',
                      impact: 'Product positioning threat'
                    },
                    {
                      company: 'Digital Dynamics',
                      alert: 'Reduced pricing by 15%',
                      priority: 'Critical',
                      time: '4 hours ago',
                      impact: 'Direct price competition'
                    },
                    {
                      company: 'Innovation Labs',
                      alert: 'Acquired startup competitor',
                      priority: 'High',
                      time: '6 hours ago',
                      impact: 'Market consolidation'
                    },
                    {
                      company: 'Future Systems',
                      alert: 'Published whitepaper on industry trends',
                      priority: 'Medium',
                      time: '8 hours ago',
                      impact: 'Thought leadership move'
                    },
                    {
                      company: 'TechCorp Solutions',
                      alert: 'Expanded to European markets',
                      priority: 'Medium',
                      time: '12 hours ago',
                      impact: 'Geographic expansion'
                    }
                  ].map((alert, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-l-yellow-500">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-semibold">{alert.company}</h4>
                          <p className="text-slate-300">{alert.alert}</p>
                          <p className="text-slate-400 text-sm">{alert.impact}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={
                              alert.priority === 'Critical' ? 'border-red-500 text-red-300' :
                              alert.priority === 'High' ? 'border-orange-500 text-orange-300' :
                              'border-yellow-500 text-yellow-300'
                            }
                          >
                            {alert.priority}
                          </Badge>
                          <p className="text-slate-400 text-xs mt-1">{alert.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Eye className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Bell className="h-3 w-3 mr-1" />
                          Set Alert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Competitive Positioning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { feature: 'Product Features', our: 85, competitor: 78, leader: 'Us' },
                      { feature: 'Pricing Strategy', our: 72, competitor: 89, leader: 'TechCorp' },
                      { feature: 'Market Presence', our: 68, competitor: 82, leader: 'Digital Dynamics' },
                      { feature: 'Customer Support', our: 91, competitor: 65, leader: 'Us' },
                      { feature: 'Innovation Rate', our: 87, competitor: 74, leader: 'Us' }
                    ].map((comparison, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{comparison.feature}</span>
                          <Badge 
                            variant="outline" 
                            className={comparison.leader === 'Us' ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300'}
                          >
                            Leader: {comparison.leader}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-400">Our Score</p>
                            <Progress value={comparison.our} className="h-2 mb-1" />
                            <p className="text-sm text-white">{comparison.our}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Competitor Avg</p>
                            <Progress value={comparison.competitor} className="h-2 mb-1" />
                            <p className="text-sm text-white">{comparison.competitor}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Strategic Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        priority: 'High',
                        action: 'Develop competitive pricing strategy',
                        reason: 'TechCorp leading in pricing advantage',
                        timeline: '2-4 weeks'
                      },
                      {
                        priority: 'Medium',
                        action: 'Expand market presence in key regions',
                        reason: 'Digital Dynamics gaining territory',
                        timeline: '3-6 months'
                      },
                      {
                        priority: 'High',
                        action: 'Accelerate product feature development',
                        reason: 'Maintain competitive advantage',
                        timeline: '1-3 months'
                      },
                      {
                        priority: 'Medium',
                        action: 'Enhance customer acquisition strategy',
                        reason: 'Counter competitor growth',
                        timeline: '4-8 weeks'
                      }
                    ].map((rec, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{rec.action}</h5>
                          <Badge 
                            variant="outline" 
                            className={rec.priority === 'High' ? 'border-red-500 text-red-300' : 'border-yellow-500 text-yellow-300'}
                          >
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-1">{rec.reason}</p>
                        <p className="text-slate-400 text-xs">Timeline: {rec.timeline}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracking">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Market Tracking & Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Industry Trends</h4>
                    <div className="space-y-3">
                      {[
                        { trend: 'AI Integration', growth: '+45%', impact: 'High' },
                        { trend: 'Cloud Migration', growth: '+32%', impact: 'Medium' },
                        { trend: 'Security Focus', growth: '+28%', impact: 'High' },
                        { trend: 'Mobile-First', growth: '+19%', impact: 'Medium' },
                        { trend: 'Sustainability', growth: '+15%', impact: 'Low' }
                      ].map((trend, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{trend.trend}</p>
                            <p className="text-green-400 text-sm">{trend.growth} growth</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={
                              trend.impact === 'High' ? 'border-red-500 text-red-300' :
                              trend.impact === 'Medium' ? 'border-yellow-500 text-yellow-300' :
                              'border-green-500 text-green-300'
                            }
                          >
                            {trend.impact} Impact
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Market Share Evolution</h4>
                    <div className="space-y-3">
                      {[
                        { company: 'Digital Dynamics', share: 31, change: '+3%' },
                        { company: 'TechCorp Solutions', share: 24, change: '+1%' },
                        { company: 'Innovation Labs', share: 18, change: '-2%' },
                        { company: 'Our Company', share: 15, change: '+4%' },
                        { company: 'Others', share: 12, change: '-6%' }
                      ].map((company, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{company.company}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-300">{company.share}%</span>
                              <span className={`text-sm ${company.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {company.change}
                              </span>
                            </div>
                          </div>
                          <Progress value={company.share} className="h-2" />
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
          <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
            <Download className="h-4 w-4 mr-2" />
            Export Competitive Intelligence Report
          </Button>
        </div>
      </div>
    </div>
  );
}