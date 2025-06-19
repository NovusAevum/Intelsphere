import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, TrendingUp, TrendingDown, AlertTriangle, DollarSign,
  Download, Search, Shield, BarChart3, PieChart
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function FinancialRiskAnalysis() {
  const [analysisQuery, setAnalysisQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const financialAnalysis = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/financial-analysis', {
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

  const handleFinancialAnalysis = () => {
    if (analysisQuery.trim()) {
      setIsAnalyzing(true);
      financialAnalysis.mutate({ query: analysisQuery });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-4">
            Financial & Risk Analysis
          </h1>
          <p className="text-slate-300 text-lg">
            Assess profitability, sustainability, and risk mitigation strategies
          </p>
        </div>

        {/* Financial Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Financial Health Score</p>
                  <p className="text-2xl font-bold text-emerald-400">8.7/10</p>
                  <p className="text-green-400 text-xs">Excellent rating</p>
                </div>
                <Calculator className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Risk Level</p>
                  <p className="text-2xl font-bold text-yellow-400">Low</p>
                  <p className="text-yellow-400 text-xs">Well managed</p>
                </div>
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">ROI</p>
                  <p className="text-2xl font-bold text-green-400">24.7%</p>
                  <p className="text-green-400 text-xs">Above industry avg</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Cash Flow</p>
                  <p className="text-2xl font-bold text-blue-400">+$2.4M</p>
                  <p className="text-blue-400 text-xs">Monthly positive</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">Financial Overview</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-emerald-600">Risk Assessment</TabsTrigger>
            <TabsTrigger value="profitability" className="data-[state=active]:bg-emerald-600">Profitability Analysis</TabsTrigger>
            <TabsTrigger value="forecasting" className="data-[state=active]:bg-emerald-600">Financial Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-emerald-400" />
                  Financial Intelligence Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter financial metric, investment, or risk scenario for analysis..."
                    value={analysisQuery}
                    onChange={(e) => setAnalysisQuery(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleFinancialAnalysis()}
                  />
                  <Button 
                    onClick={handleFinancialAnalysis}
                    disabled={financialAnalysis.isPending || isAnalyzing}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Financials
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Key Financial Metrics</h4>
                    <div className="space-y-3">
                      {[
                        { metric: 'Revenue Growth', value: '+18.7%', period: 'YoY', status: 'positive' },
                        { metric: 'Gross Margin', value: '67.3%', period: 'Current', status: 'positive' },
                        { metric: 'Operating Margin', value: '23.8%', period: 'Current', status: 'positive' },
                        { metric: 'EBITDA', value: '$4.2M', period: 'Quarterly', status: 'positive' },
                        { metric: 'Debt-to-Equity', value: '0.34', period: 'Current', status: 'neutral' },
                        { metric: 'Current Ratio', value: '2.7', period: 'Current', status: 'positive' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{item.metric}</p>
                            <p className="text-slate-400 text-sm">{item.period}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              item.status === 'positive' ? 'text-green-400' : 
                              item.status === 'negative' ? 'text-red-400' : 
                              'text-yellow-400'
                            }`}>{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Financial Health Indicators</h4>
                    <div className="space-y-4">
                      {[
                        { indicator: 'Liquidity', score: 87, benchmark: 75 },
                        { indicator: 'Profitability', score: 92, benchmark: 80 },
                        { indicator: 'Efficiency', score: 78, benchmark: 70 },
                        { indicator: 'Leverage', score: 85, benchmark: 75 },
                        { indicator: 'Market Position', score: 89, benchmark: 85 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{item.indicator}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400">{item.score}/100</span>
                              <Badge 
                                variant="outline" 
                                className={item.score >= item.benchmark ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                              >
                                {item.score >= item.benchmark ? 'Above Benchmark' : 'Below Benchmark'}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={item.score} className="h-2" />
                          <p className="text-slate-400 text-xs">Benchmark: {item.benchmark}/100</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Assessment Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        risk: 'Market Volatility',
                        probability: 'Medium',
                        impact: 'High',
                        mitigation: 'Diversification strategy',
                        status: 'Monitored'
                      },
                      {
                        risk: 'Credit Risk',
                        probability: 'Low',
                        impact: 'Medium',
                        mitigation: 'Enhanced screening',
                        status: 'Controlled'
                      },
                      {
                        risk: 'Operational Risk',
                        probability: 'Low',
                        impact: 'Low',
                        mitigation: 'Process automation',
                        status: 'Minimized'
                      },
                      {
                        risk: 'Regulatory Risk',
                        probability: 'Medium',
                        impact: 'Medium',
                        mitigation: 'Compliance monitoring',
                        status: 'Monitored'
                      }
                    ].map((risk, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{risk.risk}</h5>
                          <Badge 
                            variant="outline" 
                            className={
                              risk.status === 'Controlled' ? 'border-green-500 text-green-300' :
                              risk.status === 'Minimized' ? 'border-blue-500 text-blue-300' :
                              'border-yellow-500 text-yellow-300'
                            }
                          >
                            {risk.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Probability</p>
                            <p className={`font-semibold ${
                              risk.probability === 'High' ? 'text-red-400' :
                              risk.probability === 'Medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>{risk.probability}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Impact</p>
                            <p className={`font-semibold ${
                              risk.impact === 'High' ? 'text-red-400' :
                              risk.impact === 'Medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>{risk.impact}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-slate-400 text-xs">Mitigation: {risk.mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Mitigation Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        strategy: 'Portfolio Diversification',
                        effectiveness: 92,
                        implementation: 'Active',
                        cost: 'Medium'
                      },
                      {
                        strategy: 'Insurance Coverage',
                        effectiveness: 87,
                        implementation: 'Complete',
                        cost: 'Low'
                      },
                      {
                        strategy: 'Hedging Instruments',
                        effectiveness: 78,
                        implementation: 'Partial',
                        cost: 'High'
                      },
                      {
                        strategy: 'Emergency Fund',
                        effectiveness: 95,
                        implementation: 'Complete',
                        cost: 'Low'
                      },
                      {
                        strategy: 'Compliance Framework',
                        effectiveness: 89,
                        implementation: 'Active',
                        cost: 'Medium'
                      }
                    ].map((strategy, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{strategy.strategy}</h5>
                          <Badge 
                            variant="outline" 
                            className={
                              strategy.implementation === 'Complete' ? 'border-green-500 text-green-300' :
                              strategy.implementation === 'Active' ? 'border-blue-500 text-blue-300' :
                              'border-yellow-500 text-yellow-300'
                            }
                          >
                            {strategy.implementation}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Effectiveness</span>
                            <span className="text-emerald-400 text-sm">{strategy.effectiveness}%</span>
                          </div>
                          <Progress value={strategy.effectiveness} className="h-1" />
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Cost: {strategy.cost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profitability">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Profitability Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Gross Profit Margin', current: 67.3, target: 65, trend: 'up' },
                      { metric: 'Operating Profit Margin', current: 23.8, target: 25, trend: 'stable' },
                      { metric: 'Net Profit Margin', current: 18.9, target: 20, trend: 'up' },
                      { metric: 'Return on Assets (ROA)', current: 12.4, target: 10, trend: 'up' },
                      { metric: 'Return on Equity (ROE)', current: 24.7, target: 22, trend: 'up' }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div>
                          <p className="text-white font-medium">{metric.metric}</p>
                          <p className="text-slate-400 text-sm">Target: {metric.target}%</p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <p className="text-emerald-400 font-semibold">{metric.current}%</p>
                            <Badge 
                              variant="outline" 
                              className={metric.current >= metric.target ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              {metric.current >= metric.target ? 'Above Target' : 'Below Target'}
                            </Badge>
                          </div>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          ) : metric.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          ) : (
                            <div className="h-4 w-4 bg-yellow-400 rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-emerald-400">$12.8M</p>
                        <p className="text-green-400 text-xs">+18.7% YoY</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Recurring Revenue</p>
                        <p className="text-2xl font-bold text-blue-400">$9.6M</p>
                        <p className="text-blue-400 text-xs">75% of total</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Revenue Sources</h5>
                      {[
                        { source: 'Product Sales', amount: '$7.2M', percentage: 56 },
                        { source: 'Service Revenue', amount: '$3.6M', percentage: 28 },
                        { source: 'Licensing', amount: '$1.5M', percentage: 12 },
                        { source: 'Other Income', amount: '$0.5M', percentage: 4 }
                      ].map((source, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{source.source}</span>
                            <span className="text-emerald-400">{source.amount}</span>
                          </div>
                          <Progress value={source.percentage} className="h-2" />
                          <p className="text-slate-400 text-xs">{source.percentage}% of total revenue</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecasting">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Financial Forecasting & Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">12-Month Financial Forecast</h4>
                    <div className="space-y-3">
                      {[
                        { metric: 'Revenue Growth', q1: '+19%', q2: '+22%', q3: '+18%', q4: '+25%' },
                        { metric: 'Operating Margin', q1: '24.2%', q2: '25.1%', q3: '24.8%', q4: '26.3%' },
                        { metric: 'Cash Flow', q1: '$2.8M', q2: '$3.1M', q3: '$2.9M', q4: '$3.5M' },
                        { metric: 'Market Share', q1: '15.2%', q2: '16.1%', q3: '16.8%', q4: '17.5%' }
                      ].map((forecast, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <h5 className="text-white font-medium mb-2">{forecast.metric}</h5>
                          <div className="grid grid-cols-4 gap-2 text-sm">
                            <div className="text-center">
                              <p className="text-slate-400">Q1</p>
                              <p className="text-emerald-400 font-semibold">{forecast.q1}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-slate-400">Q2</p>
                              <p className="text-emerald-400 font-semibold">{forecast.q2}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-slate-400">Q3</p>
                              <p className="text-emerald-400 font-semibold">{forecast.q3}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-slate-400">Q4</p>
                              <p className="text-emerald-400 font-semibold">{forecast.q4}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Investment Recommendations</h4>
                    <div className="space-y-3">
                      {[
                        {
                          investment: 'Technology Infrastructure',
                          amount: '$2.5M',
                          roi: '340%',
                          timeline: '18 months',
                          priority: 'High'
                        },
                        {
                          investment: 'Market Expansion',
                          amount: '$1.8M',
                          roi: '280%',
                          timeline: '24 months',
                          priority: 'High'
                        },
                        {
                          investment: 'R&D Development',
                          amount: '$3.2M',
                          roi: '450%',
                          timeline: '36 months',
                          priority: 'Medium'
                        },
                        {
                          investment: 'Operational Efficiency',
                          amount: '$800K',
                          roi: '220%',
                          timeline: '12 months',
                          priority: 'Medium'
                        }
                      ].map((investment, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-medium">{investment.investment}</h5>
                            <Badge 
                              variant="outline" 
                              className={investment.priority === 'High' ? 'border-red-500 text-red-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              {investment.priority}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-slate-400">Investment</p>
                              <p className="text-white font-semibold">{investment.amount}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Expected ROI</p>
                              <p className="text-green-400 font-semibold">{investment.roi}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Timeline</p>
                              <p className="text-white font-semibold">{investment.timeline}</p>
                            </div>
                          </div>
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
          <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Financial Analysis Report
          </Button>
        </div>
      </div>
    </div>
  );
}