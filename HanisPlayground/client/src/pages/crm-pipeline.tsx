import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, Users, DollarSign, TrendingUp, Calendar, 
  Download, Search, Phone, Mail, Target, Clock
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function CRMPipeline() {
  const [pipelineQuery, setPipelineQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const pipelineAnalysis = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/crm-analysis', {
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

  const handlePipelineAnalysis = () => {
    if (pipelineQuery.trim()) {
      setIsAnalyzing(true);
      pipelineAnalysis.mutate({ query: pipelineQuery });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-400 to-gray-300 bg-clip-text text-transparent mb-4">
            CRM & Sales Pipeline Management
          </h1>
          <p className="text-slate-300 text-lg">
            Manage relationships, forecast revenue, and increase conversion rates
          </p>
        </div>

        {/* CRM Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Pipeline Value</p>
                  <p className="text-2xl font-bold text-slate-400">$2.8M</p>
                  <p className="text-green-400 text-xs">+15% this quarter</p>
                </div>
                <DollarSign className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Opportunities</p>
                  <p className="text-2xl font-bold text-gray-400">147</p>
                  <p className="text-gray-400 text-xs">Across all stages</p>
                </div>
                <Target className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-blue-400">23.7%</p>
                  <p className="text-blue-400 text-xs">Lead to customer</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg. Sales Cycle</p>
                  <p className="text-2xl font-bold text-purple-400">42</p>
                  <p className="text-purple-400 text-xs">Days to close</p>
                </div>
                <Clock className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-slate-600">Sales Pipeline</TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-slate-600">Contact Management</TabsTrigger>
            <TabsTrigger value="forecasting" className="data-[state=active]:bg-slate-600">Revenue Forecasting</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-600">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Building className="h-5 w-5 text-slate-400" />
                  Sales Pipeline Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter opportunity, contact, or company name for CRM analysis..."
                    value={pipelineQuery}
                    onChange={(e) => setPipelineQuery(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handlePipelineAnalysis()}
                  />
                  <Button 
                    onClick={handlePipelineAnalysis}
                    disabled={pipelineAnalysis.isPending || isAnalyzing}
                    className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Pipeline
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {[
                    { stage: 'Lead', count: 45, value: '$450K', color: 'bg-blue-600' },
                    { stage: 'Qualified', count: 32, value: '$640K', color: 'bg-green-600' },
                    { stage: 'Proposal', count: 28, value: '$560K', color: 'bg-yellow-600' },
                    { stage: 'Negotiation', count: 23, value: '$690K', color: 'bg-orange-600' },
                    { stage: 'Closed Won', count: 19, value: '$570K', color: 'bg-purple-600' }
                  ].map((stage, index) => (
                    <div key={index} className="text-center">
                      <h4 className="text-white font-semibold mb-2">{stage.stage}</h4>
                      <div className={`${stage.color} rounded-lg p-4 mb-2`}>
                        <p className="text-white text-2xl font-bold">{stage.count}</p>
                        <p className="text-white text-sm">Opportunities</p>
                      </div>
                      <p className="text-slate-300 font-semibold">{stage.value}</p>
                      <p className="text-slate-400 text-sm">Total Value</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <h4 className="text-white font-semibold">Top Opportunities</h4>
                  {[
                    {
                      company: 'Enterprise Solutions Inc.',
                      contact: 'Sarah Johnson',
                      value: '$125K',
                      stage: 'Negotiation',
                      probability: 85,
                      closeDate: '2025-07-15'
                    },
                    {
                      company: 'Global Tech Corp',
                      contact: 'Michael Chen',
                      value: '$98K',
                      stage: 'Proposal',
                      probability: 65,
                      closeDate: '2025-08-01'
                    },
                    {
                      company: 'Innovation Dynamics',
                      contact: 'Emily Rodriguez',
                      value: '$156K',
                      stage: 'Qualified',
                      probability: 45,
                      closeDate: '2025-08-30'
                    }
                  ].map((opportunity, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="text-white font-semibold">{opportunity.company}</h5>
                          <p className="text-slate-300">Contact: {opportunity.contact}</p>
                          <p className="text-slate-400 text-sm">Expected close: {opportunity.closeDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{opportunity.value}</p>
                          <Badge variant="outline" className="border-slate-600 text-slate-300 mt-1">
                            {opportunity.stage}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-400 text-sm">Probability</span>
                            <span className="text-slate-300 text-sm">{opportunity.probability}%</span>
                          </div>
                          <Progress value={opportunity.probability} className="h-2" />
                        </div>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Contact Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: 'Sarah Johnson',
                        title: 'VP of Technology',
                        company: 'Enterprise Solutions Inc.',
                        email: 'sarah.j@enterprise.com',
                        phone: '+1 (555) 123-4567',
                        lastContact: '2 days ago'
                      },
                      {
                        name: 'Michael Chen',
                        title: 'CEO',
                        company: 'Global Tech Corp',
                        email: 'michael.chen@globaltech.com',
                        phone: '+1 (555) 987-6543',
                        lastContact: '1 week ago'
                      },
                      {
                        name: 'Emily Rodriguez',
                        title: 'Director of Operations',
                        company: 'Innovation Dynamics',
                        email: 'emily.r@innovdyn.com',
                        phone: '+1 (555) 456-7890',
                        lastContact: '3 days ago'
                      }
                    ].map((contact, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="text-white font-medium">{contact.name}</h5>
                            <p className="text-slate-300 text-sm">{contact.title}</p>
                            <p className="text-slate-400 text-sm">{contact.company}</p>
                          </div>
                          <span className="text-slate-400 text-xs">{contact.lastContact}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-xs">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-slate-400" />
                            <span className="text-blue-400">{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <span className="text-slate-300">{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Activity Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        activity: 'Called Sarah Johnson - discussed proposal',
                        type: 'Call',
                        time: '2 hours ago',
                        outcome: 'Positive'
                      },
                      {
                        activity: 'Email sent to Michael Chen - follow-up',
                        type: 'Email',
                        time: '1 day ago',
                        outcome: 'Pending'
                      },
                      {
                        activity: 'Meeting with Emily Rodriguez - demo',
                        type: 'Meeting',
                        time: '3 days ago',
                        outcome: 'Interested'
                      },
                      {
                        activity: 'Proposal sent to Enterprise Solutions',
                        type: 'Document',
                        time: '5 days ago',
                        outcome: 'Under Review'
                      }
                    ].map((activity, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-white text-sm">{activity.activity}</p>
                          <Badge 
                            variant="outline" 
                            className={
                              activity.outcome === 'Positive' ? 'border-green-500 text-green-300' :
                              activity.outcome === 'Interested' ? 'border-blue-500 text-blue-300' :
                              'border-yellow-500 text-yellow-300'
                            }
                          >
                            {activity.outcome}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-xs">{activity.type}</span>
                          <span className="text-slate-400 text-xs">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecasting">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">This Quarter</p>
                        <p className="text-2xl font-bold text-green-400">$1.2M</p>
                        <p className="text-green-400 text-xs">87% confidence</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Next Quarter</p>
                        <p className="text-2xl font-bold text-blue-400">$1.8M</p>
                        <p className="text-blue-400 text-xs">72% confidence</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Monthly Breakdown</h5>
                      {[
                        { month: 'June 2025', forecast: '$420K', actual: '$387K', variance: '-8%' },
                        { month: 'July 2025', forecast: '$450K', actual: null, variance: null },
                        { month: 'August 2025', forecast: '$480K', actual: null, variance: null }
                      ].map((month, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <span className="text-white font-medium">{month.month}</span>
                          <div className="text-right">
                            <p className="text-slate-300">{month.forecast}</p>
                            {month.actual && (
                              <p className={`text-xs ${month.variance?.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                                Actual: {month.actual} ({month.variance})
                              </p>
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
                  <CardTitle className="text-white">Sales Targets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { rep: 'Alex Thompson', target: '$250K', achieved: '$287K', progress: 115 },
                      { rep: 'Maria Garcia', target: '$200K', achieved: '$178K', progress: 89 },
                      { rep: 'David Kim', target: '$180K', achieved: '$195K', progress: 108 },
                      { rep: 'Lisa Chen', target: '$220K', achieved: '$203K', progress: 92 }
                    ].map((rep, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{rep.rep}</span>
                          <div className="text-right">
                            <p className="text-slate-300">{rep.achieved} / {rep.target}</p>
                            <Badge 
                              variant="outline" 
                              className={rep.progress >= 100 ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              {rep.progress}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={Math.min(rep.progress, 100)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">CRM Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Key Metrics</h4>
                    <div className="space-y-3">
                      {[
                        { metric: 'Lead Response Time', value: '2.3 hours', target: '< 4 hours', status: 'good' },
                        { metric: 'Email Open Rate', value: '34.7%', target: '> 25%', status: 'good' },
                        { metric: 'Demo Conversion', value: '67%', target: '> 60%', status: 'good' },
                        { metric: 'Customer Retention', value: '94.2%', target: '> 90%', status: 'good' }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{metric.metric}</p>
                            <p className="text-slate-400 text-sm">Target: {metric.target}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-300 font-semibold">{metric.value}</p>
                            <Badge variant="outline" className="border-green-500 text-green-300">
                              On Target
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Pipeline Health</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <h5 className="text-white font-medium mb-2">Stage Velocity</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Lead → Qualified</span>
                            <span className="text-slate-300">3.2 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Qualified → Proposal</span>
                            <span className="text-slate-300">8.5 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Proposal → Close</span>
                            <span className="text-slate-300">12.3 days</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <h5 className="text-white font-medium mb-2">Conversion Rates</h5>
                        <div className="space-y-2">
                          {[
                            { stage: 'Lead to Qualified', rate: 67 },
                            { stage: 'Qualified to Proposal', rate: 78 },
                            { stage: 'Proposal to Close', rate: 34 }
                          ].map((conversion, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">{conversion.stage}</span>
                                <span className="text-slate-300">{conversion.rate}%</span>
                              </div>
                              <Progress value={conversion.rate} className="h-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Export CRM Analytics Report
          </Button>
        </div>
      </div>
    </div>
  );
}