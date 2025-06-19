import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, Target, Users, Calendar, TrendingUp, 
  Download, Search, Lightbulb, CheckCircle, ArrowRight
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function StrategicPlanning() {
  const [planningQuery, setPlanningQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const strategicAnalysis = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/strategic-planning', {
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

  const handleStrategicAnalysis = () => {
    if (planningQuery.trim()) {
      setIsAnalyzing(true);
      strategicAnalysis.mutate({ query: planningQuery });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            Strategic Planning & Collaboration
          </h1>
          <p className="text-slate-300 text-lg">
            Align vision, execution, and team synergy for organizational success
          </p>
        </div>

        {/* Strategic Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Initiatives</p>
                  <p className="text-2xl font-bold text-teal-400">24</p>
                  <p className="text-green-400 text-xs">87% on track</p>
                </div>
                <Network className="h-8 w-8 text-teal-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Strategic Alignment</p>
                  <p className="text-2xl font-bold text-cyan-400">92%</p>
                  <p className="text-cyan-400 text-xs">Cross-team sync</p>
                </div>
                <Target className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Team Collaboration</p>
                  <p className="text-2xl font-bold text-blue-400">89%</p>
                  <p className="text-blue-400 text-xs">Engagement score</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Goal Achievement</p>
                  <p className="text-2xl font-bold text-green-400">78%</p>
                  <p className="text-green-400 text-xs">Quarterly targets</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="planning" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="planning" className="data-[state=active]:bg-teal-600">Strategic Planning</TabsTrigger>
            <TabsTrigger value="execution" className="data-[state=active]:bg-teal-600">Execution Tracking</TabsTrigger>
            <TabsTrigger value="collaboration" className="data-[state=active]:bg-teal-600">Team Collaboration</TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-teal-600">Performance Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="planning">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Network className="h-5 w-5 text-teal-400" />
                  Strategic Planning Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter strategic goal, initiative, or planning challenge..."
                    value={planningQuery}
                    onChange={(e) => setPlanningQuery(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleStrategicAnalysis()}
                  />
                  <Button 
                    onClick={handleStrategicAnalysis}
                    disabled={strategicAnalysis.isPending || isAnalyzing}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Strategy
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Current Strategic Initiatives</h4>
                    <div className="space-y-3">
                      {[
                        {
                          title: 'Digital Transformation Program',
                          status: 'In Progress',
                          progress: 67,
                          priority: 'High',
                          owner: 'Technology Team'
                        },
                        {
                          title: 'Market Expansion Strategy',
                          status: 'Planning',
                          progress: 23,
                          priority: 'High',
                          owner: 'Business Development'
                        },
                        {
                          title: 'Customer Experience Enhancement',
                          status: 'In Progress',
                          progress: 84,
                          priority: 'Medium',
                          owner: 'Customer Success'
                        },
                        {
                          title: 'Operational Efficiency Improvement',
                          status: 'Completed',
                          progress: 100,
                          priority: 'Medium',
                          owner: 'Operations Team'
                        }
                      ].map((initiative, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="text-white font-medium">{initiative.title}</h5>
                              <p className="text-slate-400 text-sm">Owner: {initiative.owner}</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={
                                initiative.status === 'Completed' ? 'border-green-500 text-green-300' :
                                initiative.status === 'In Progress' ? 'border-blue-500 text-blue-300' :
                                'border-yellow-500 text-yellow-300'
                              }
                            >
                              {initiative.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-300 text-sm">Progress</span>
                              <span className="text-teal-400 text-sm">{initiative.progress}%</span>
                            </div>
                            <Progress value={initiative.progress} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400 text-xs">Priority: {initiative.priority}</span>
                              <ArrowRight className="h-3 w-3 text-slate-400" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Strategic Roadmap</h4>
                    <div className="space-y-4">
                      {[
                        { quarter: 'Q1 2025', focus: 'Foundation & Infrastructure', status: 'Completed' },
                        { quarter: 'Q2 2025', focus: 'Market Research & Validation', status: 'In Progress' },
                        { quarter: 'Q3 2025', focus: 'Product Development & Testing', status: 'Planned' },
                        { quarter: 'Q4 2025', focus: 'Launch & Scale Operations', status: 'Planned' }
                      ].map((phase, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded">
                          <div className={`w-3 h-3 rounded-full ${
                            phase.status === 'Completed' ? 'bg-green-400' :
                            phase.status === 'In Progress' ? 'bg-blue-400' :
                            'bg-slate-400'
                          }`}></div>
                          <div className="flex-1">
                            <h5 className="text-white font-medium">{phase.quarter}</h5>
                            <p className="text-slate-300 text-sm">{phase.focus}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={
                              phase.status === 'Completed' ? 'border-green-500 text-green-300' :
                              phase.status === 'In Progress' ? 'border-blue-500 text-blue-300' :
                              'border-slate-500 text-slate-300'
                            }
                          >
                            {phase.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Execution Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'On-Time Delivery', value: 87, target: 90 },
                      { metric: 'Budget Adherence', value: 92, target: 95 },
                      { metric: 'Quality Standards', value: 94, target: 90 },
                      { metric: 'Stakeholder Satisfaction', value: 89, target: 85 },
                      { metric: 'Resource Utilization', value: 78, target: 80 }
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{metric.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-teal-400">{metric.value}%</span>
                            <Badge 
                              variant="outline" 
                              className={metric.value >= metric.target ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              Target: {metric.target}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        milestone: 'Phase 1 Implementation Complete',
                        date: 'March 15, 2025',
                        status: 'Completed',
                        impact: 'High'
                      },
                      {
                        milestone: 'Stakeholder Approval Received',
                        date: 'April 2, 2025',
                        status: 'Completed',
                        impact: 'Critical'
                      },
                      {
                        milestone: 'Beta Testing Launch',
                        date: 'May 20, 2025',
                        status: 'In Progress',
                        impact: 'High'
                      },
                      {
                        milestone: 'Market Analysis Complete',
                        date: 'June 30, 2025',
                        status: 'Upcoming',
                        impact: 'Medium'
                      }
                    ].map((milestone, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="text-white font-medium">{milestone.milestone}</h5>
                            <p className="text-slate-400 text-sm">{milestone.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={
                                milestone.status === 'Completed' ? 'border-green-500 text-green-300' :
                                milestone.status === 'In Progress' ? 'border-blue-500 text-blue-300' :
                                'border-slate-500 text-slate-300'
                              }
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            milestone.impact === 'Critical' ? 'border-red-500 text-red-300' :
                            milestone.impact === 'High' ? 'border-orange-500 text-orange-300' :
                            'border-yellow-500 text-yellow-300'
                          }
                        >
                          {milestone.impact} Impact
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collaboration">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Team Collaboration & Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Team Performance</h4>
                    <div className="space-y-3">
                      {[
                        { team: 'Product Development', alignment: 94, productivity: 89, communication: 92 },
                        { team: 'Marketing & Sales', alignment: 87, productivity: 91, communication: 85 },
                        { team: 'Operations', alignment: 91, productivity: 88, communication: 94 },
                        { team: 'Customer Success', alignment: 89, productivity: 93, communication: 90 }
                      ].map((team, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <h5 className="text-white font-medium mb-3">{team.team}</h5>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Alignment</p>
                              <p className="text-teal-400 font-semibold">{team.alignment}%</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Productivity</p>
                              <p className="text-cyan-400 font-semibold">{team.productivity}%</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Communication</p>
                              <p className="text-blue-400 font-semibold">{team.communication}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Collaboration Insights</h4>
                    <div className="space-y-3">
                      {[
                        {
                          insight: 'Cross-team meetings increased 23% this quarter',
                          impact: 'Positive',
                          recommendation: 'Continue structured collaboration sessions'
                        },
                        {
                          insight: 'Documentation sharing improved by 45%',
                          impact: 'Positive',
                          recommendation: 'Implement knowledge management system'
                        },
                        {
                          insight: 'Decision-making speed increased 18%',
                          impact: 'Positive',
                          recommendation: 'Maintain streamlined approval processes'
                        },
                        {
                          insight: 'Remote collaboration tools adoption at 92%',
                          impact: 'Neutral',
                          recommendation: 'Provide advanced training for remaining 8%'
                        }
                      ].map((insight, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex items-start gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                            <p className="text-slate-300 text-sm">{insight.insight}</p>
                          </div>
                          <div className="ml-6">
                            <Badge 
                              variant="outline" 
                              className={insight.impact === 'Positive' ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              {insight.impact}
                            </Badge>
                            <p className="text-slate-400 text-xs mt-1">{insight.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Strategic Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Strategic Goal Achievement', current: 78, target: 85, trend: 'improving' },
                      { metric: 'Initiative Success Rate', current: 87, target: 90, trend: 'stable' },
                      { metric: 'Resource Allocation Efficiency', current: 82, target: 80, trend: 'improving' },
                      { metric: 'Stakeholder Engagement', current: 89, target: 85, trend: 'improving' }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div>
                          <p className="text-white font-medium">{metric.metric}</p>
                          <p className="text-slate-400 text-sm">Target: {metric.target}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-teal-400 font-semibold">{metric.current}%</p>
                          <div className="flex items-center gap-1">
                            {metric.trend === 'improving' ? (
                              <TrendingUp className="h-3 w-3 text-green-400" />
                            ) : (
                              <div className="h-3 w-3 bg-yellow-400 rounded-full" />
                            )}
                            <span className={`text-xs ${metric.trend === 'improving' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {metric.trend}
                            </span>
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
                        action: 'Accelerate digital transformation initiatives',
                        rationale: 'Market demands increasing digital capabilities',
                        timeline: '2-3 months'
                      },
                      {
                        priority: 'Medium',
                        action: 'Enhance cross-team collaboration processes',
                        rationale: 'Improve coordination between departments',
                        timeline: '4-6 weeks'
                      },
                      {
                        priority: 'High',
                        action: 'Optimize resource allocation strategy',
                        rationale: 'Maximize ROI on strategic investments',
                        timeline: '6-8 weeks'
                      },
                      {
                        priority: 'Low',
                        action: 'Implement advanced analytics dashboard',
                        rationale: 'Better visibility into performance metrics',
                        timeline: '3-4 months'
                      }
                    ].map((rec, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{rec.action}</h5>
                          <Badge 
                            variant="outline" 
                            className={
                              rec.priority === 'High' ? 'border-red-500 text-red-300' :
                              rec.priority === 'Medium' ? 'border-yellow-500 text-yellow-300' :
                              'border-green-500 text-green-300'
                            }
                          >
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-1">{rec.rationale}</p>
                        <p className="text-slate-400 text-xs">Timeline: {rec.timeline}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
            <Download className="h-4 w-4 mr-2" />
            Export Strategic Planning Report
          </Button>
        </div>
      </div>
    </div>
  );
}