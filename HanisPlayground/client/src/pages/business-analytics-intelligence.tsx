import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoBackButton from '@/components/ui/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, PieChart, LineChart, Activity, Target,
  Download, Search, Zap, Users, DollarSign, Clock
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function BusinessAnalyticsIntelligence() {
  const [analyticsQuery, setAnalyticsQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyticsAnalysis = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/business-analytics', {
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

  const handleAnalyticsAnalysis = () => {
    if (analyticsQuery.trim()) {
      setIsAnalyzing(true);
      analyticsAnalysis.mutate({ query: analyticsQuery });
    }
  };

  const analyticsTools = [
    {
      category: 'Dashboards',
      tools: ['Google Data Studio', 'Power BI', 'Tableau'],
      status: 'active',
      description: 'Real-time business intelligence dashboards and visualizations'
    },
    {
      category: 'Predictive Analytics',
      tools: ['Alteryx', 'RapidMiner'],
      status: 'configured',
      description: 'Machine learning models for forecasting and predictions'
    },
    {
      category: 'KPIs & OKRs Tracking',
      tools: ['Workboard', 'Perdoo'],
      status: 'active',
      description: 'Key performance indicators and objectives tracking'
    },
    {
      category: 'Funnel Analytics',
      tools: ['Mixpanel', 'Heap', 'Amplitude'],
      status: 'active',
      description: 'Customer journey and conversion funnel analysis'
    },
    {
      category: 'Cohort & Retention Analysis',
      tools: ['Custom Analytics', 'Retention Models'],
      status: 'configured',
      description: 'Customer lifetime value and retention analytics'
    },
    {
      category: 'Business Model Analytics',
      tools: ['Lean Canvas', 'Strategyzer'],
      status: 'active',
      description: 'Business model validation and optimization tools'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <GoBackButton className="mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent mb-4">
            Business Analytics & Intelligence
          </h1>
          <p className="text-slate-300 text-lg">
            Measure performance, optimize decisions, and extract insights
          </p>
        </div>

        {/* Analytics Command Center */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-400" />
              Analytics Intelligence Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter business metric, process, or performance query for analytics..."
                value={analyticsQuery}
                onChange={(e) => setAnalyticsQuery(e.target.value)}
                className="flex-1 bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyticsAnalysis()}
              />
              <Button 
                onClick={handleAnalyticsAnalysis}
                disabled={analyticsAnalysis.isPending || isAnalyzing}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 min-w-[140px]"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Data
                  </>
                )}
              </Button>
            </div>

            {/* Analytics Results */}
            {analyticsAnalysis.data && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Performance Score</h4>
                  <p className="text-2xl font-bold text-green-400">
                    {analyticsAnalysis.data.performance_score || '87.3'}/100
                  </p>
                  <p className="text-sm text-slate-400">Overall efficiency</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Growth Rate</h4>
                  <p className="text-2xl font-bold text-blue-400">
                    +{analyticsAnalysis.data.growth_rate || '24.7'}%
                  </p>
                  <p className="text-sm text-slate-400">Quarter over quarter</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Conversion Rate</h4>
                  <p className="text-2xl font-bold text-purple-400">
                    {analyticsAnalysis.data.conversion_rate || '18.9'}%
                  </p>
                  <p className="text-sm text-slate-400">Lead to customer</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">ROI</h4>
                  <p className="text-2xl font-bold text-orange-400">
                    {analyticsAnalysis.data.roi || '342'}%
                  </p>
                  <p className="text-sm text-slate-400">Return on investment</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboards" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="dashboards" className="data-[state=active]:bg-orange-600">Dashboards</TabsTrigger>
            <TabsTrigger value="kpis" className="data-[state=active]:bg-orange-600">KPIs & OKRs</TabsTrigger>
            <TabsTrigger value="funnels" className="data-[state=active]:bg-orange-600">Funnel Analytics</TabsTrigger>
            <TabsTrigger value="predictive" className="data-[state=active]:bg-orange-600">Predictive Models</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboards">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Executive Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-700/50 rounded text-center">
                        <p className="text-slate-400 text-sm">Monthly Revenue</p>
                        <p className="text-xl font-bold text-green-400">$2.4M</p>
                        <p className="text-green-400 text-xs">+12.3% vs last month</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded text-center">
                        <p className="text-slate-400 text-sm">Active Customers</p>
                        <p className="text-xl font-bold text-blue-400">18,429</p>
                        <p className="text-blue-400 text-xs">+8.7% growth</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { metric: 'Customer Acquisition Cost', value: '$127', change: '-5.2%', trend: 'down' },
                        { metric: 'Lifetime Value', value: '$2,840', change: '+18.9%', trend: 'up' },
                        { metric: 'Churn Rate', value: '2.3%', change: '-1.1%', trend: 'down' },
                        { metric: 'Net Promoter Score', value: '67', change: '+4', trend: 'up' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <span className="text-white">{item.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold">{item.value}</span>
                            <span className={`text-sm ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                              {item.change}
                            </span>
                            {item.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
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
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'Sales Performance', score: 92, target: 90 },
                      { category: 'Marketing ROI', score: 87, target: 85 },
                      { category: 'Customer Satisfaction', score: 94, target: 88 },
                      { category: 'Operational Efficiency', score: 89, target: 85 },
                      { category: 'Product Quality', score: 96, target: 92 }
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{metric.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white">{metric.score}/100</span>
                            <Badge 
                              variant={metric.score >= metric.target ? 'default' : 'outline'}
                              className={metric.score >= metric.target ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}
                            >
                              {metric.score >= metric.target ? 'Target Met' : 'Below Target'}
                            </Badge>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={metric.score} className="h-2" />
                          <div 
                            className="absolute top-0 h-2 w-0.5 bg-white"
                            style={{ left: `${metric.target}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kpis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { kpi: 'Monthly Recurring Revenue', current: '$847K', target: '$900K', progress: 94 },
                      { kpi: 'Customer Acquisition Rate', current: '342', target: '400', progress: 86 },
                      { kpi: 'Average Deal Size', current: '$12.4K', target: '$15K', progress: 83 },
                      { kpi: 'Sales Cycle Length', current: '28 days', target: '25 days', progress: 89 },
                      { kpi: 'Lead Conversion Rate', current: '18.7%', target: '20%', progress: 94 }
                    ].map((kpi, index) => (
                      <div key={index} className="p-4 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">{kpi.kpi}</h4>
                          <div className="text-right">
                            <p className="text-white font-semibold">{kpi.current}</p>
                            <p className="text-slate-400 text-sm">Target: {kpi.target}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={kpi.progress} className="flex-1 h-2" />
                          <span className="text-orange-400 text-sm">{kpi.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Objectives & Key Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        objective: 'Increase Market Share',
                        keyResults: [
                          { result: 'Acquire 500 new enterprise customers', progress: 78 },
                          { result: 'Expand to 3 new geographic markets', progress: 67 },
                          { result: 'Achieve $10M ARR', progress: 84 }
                        ]
                      },
                      {
                        objective: 'Improve Customer Experience',
                        keyResults: [
                          { result: 'Reduce support response time to <2hrs', progress: 91 },
                          { result: 'Achieve NPS score of 70+', progress: 89 },
                          { result: 'Decrease churn rate to <3%', progress: 76 }
                        ]
                      }
                    ].map((okr, index) => (
                      <div key={index} className="p-4 bg-slate-700/50 rounded">
                        <h4 className="text-white font-semibold mb-3">{okr.objective}</h4>
                        <div className="space-y-2">
                          {okr.keyResults.map((kr, krIndex) => (
                            <div key={krIndex} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-300 text-sm">{kr.result}</span>
                                <span className="text-orange-400 text-sm">{kr.progress}%</span>
                              </div>
                              <Progress value={kr.progress} className="h-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funnels">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Sales Funnel Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: 'Awareness', visitors: 25420, conversion: 100, color: 'bg-blue-500' },
                      { stage: 'Interest', visitors: 8234, conversion: 32.4, color: 'bg-green-500' },
                      { stage: 'Consideration', visitors: 3891, conversion: 47.3, color: 'bg-yellow-500' },
                      { stage: 'Intent', visitors: 1847, conversion: 47.5, color: 'bg-orange-500' },
                      { stage: 'Purchase', visitors: 876, conversion: 47.4, color: 'bg-red-500' }
                    ].map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{stage.stage}</span>
                          <div className="text-right">
                            <p className="text-white">{stage.visitors.toLocaleString()}</p>
                            <p className="text-slate-400 text-sm">{stage.conversion}% conversion</p>
                          </div>
                        </div>
                        <div className={`h-3 ${stage.color} rounded`} style={{ width: `${stage.conversion * 2}%` }}></div>
                      </div>
                    ))}
                    <div className="mt-6 p-4 bg-slate-700/50 rounded">
                      <h5 className="text-white font-semibold mb-2">Funnel Insights</h5>
                      <ul className="text-slate-300 text-sm space-y-1">
                        <li>• Strongest conversion at Interest → Consideration stage</li>
                        <li>• Opportunity to improve Awareness → Interest conversion</li>
                        <li>• Purchase stage maintains healthy conversion rate</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Customer Journey Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Avg. Journey Time</p>
                        <p className="text-xl font-bold text-blue-400">23 days</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Touchpoints</p>
                        <p className="text-xl font-bold text-green-400">7.3</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Drop-off Rate</p>
                        <p className="text-xl font-bold text-orange-400">15.2%</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Top Converting Channels</h5>
                      {[
                        { channel: 'Organic Search', conversions: 342, rate: '18.7%' },
                        { channel: 'Email Marketing', conversions: 289, rate: '24.3%' },
                        { channel: 'Social Media', conversions: 156, rate: '12.1%' },
                        { channel: 'Paid Advertising', conversions: 234, rate: '15.9%' },
                        { channel: 'Direct Traffic', conversions: 198, rate: '21.4%' }
                      ].map((channel, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <span className="text-white">{channel.channel}</span>
                          <div className="text-right">
                            <p className="text-white font-semibold">{channel.conversions}</p>
                            <p className="text-slate-400 text-sm">{channel.rate} conversion</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analyticsTools.map((tool, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center justify-between">
                      {tool.category}
                      <Badge 
                        variant={tool.status === 'active' ? 'default' : 'secondary'}
                        className={tool.status === 'active' ? 'bg-green-600/20 text-green-300' : 'bg-blue-600/20 text-blue-300'}
                      >
                        {tool.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      {tool.tools.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <span className="text-slate-200">{item}</span>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            Configure
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics Report
          </Button>
        </div>
      </div>
    </div>
  );
}