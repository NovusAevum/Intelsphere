import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, BarChart3, Building2, Search, AlertTriangle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function FinancialIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const queryClient = useQueryClient();

  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ['/api/market-data'],
    enabled: true
  });

  const financialAnalysis = useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch('/api/financial-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/financial-analysis'] });
    }
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      financialAnalysis.mutate(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-4">
            Financial Intelligence Center
          </h1>
          <p className="text-slate-300 text-lg">
            Comprehensive financial analysis and market intelligence platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold text-emerald-400">$1.2M</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Daily P&L</p>
                  <p className="text-2xl font-bold text-green-400">+$12,450</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Risk Score</p>
                  <p className="text-2xl font-bold text-yellow-400">7.2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Positions</p>
                  <p className="text-2xl font-bold text-blue-400">47</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Financial Analysis Engine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter company ticker, financial metric, or analysis request..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch}
                disabled={financialAnalysis.isPending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Search className="h-4 w-4 mr-2" />
                {financialAnalysis.isPending ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>

            {financialAnalysis.data && (
              <div className="bg-slate-700/50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Financial Overview</h3>
                    <div className="space-y-2">
                      <p><span className="text-slate-400">Revenue:</span> {financialAnalysis.data.revenue || '$2.4B'}</p>
                      <p><span className="text-slate-400">Market Cap:</span> {financialAnalysis.data.marketCap || '$145B'}</p>
                      <p><span className="text-slate-400">P/E Ratio:</span> {financialAnalysis.data.peRatio || '18.5'}</p>
                      <p><span className="text-slate-400">Debt/Equity:</span> {financialAnalysis.data.debtEquity || '0.42'}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Risk Assessment</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Low Volatility', 'Strong Fundamentals', 'Positive Outlook', 'Sector Leader'].map((risk, index) => (
                        <Badge key={index} variant="secondary" className="bg-emerald-600/20 text-emerald-300">
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Investment Analysis</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {financialAnalysis.data.analysis || 'Comprehensive financial analysis indicates strong market position with sustainable growth trajectory. Risk-adjusted returns demonstrate favorable investment opportunity with moderate volatility exposure.'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">Market Overview</TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-emerald-600">Portfolio Analysis</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-emerald-600">Risk Management</TabsTrigger>
            <TabsTrigger value="forecasting" className="data-[state=active]:bg-emerald-600">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['NVDA', 'TSLA', 'AAPL', 'MSFT'].map((symbol, index) => (
                      <div key={symbol} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div>
                          <p className="font-semibold text-white">{symbol}</p>
                          <p className="text-sm text-slate-400">Technology</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">${(250 + index * 50).toFixed(2)}</p>
                          <p className="text-sm text-green-400">+{(5 + index * 2).toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Sector Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { sector: 'Technology', performance: '+12.8%', trend: 'up' },
                      { sector: 'Healthcare', performance: '+7.3%', trend: 'up' },
                      { sector: 'Finance', performance: '-2.1%', trend: 'down' },
                      { sector: 'Energy', performance: '+15.6%', trend: 'up' }
                    ].map((sector, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <span className="text-white">{sector.sector}</span>
                        <div className="flex items-center gap-3">
                          <span className={`font-semibold ${sector.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {sector.performance}
                          </span>
                          <Badge variant={sector.trend === 'up' ? 'default' : 'destructive'}>
                            {sector.trend === 'up' ? 'Bullish' : 'Bearish'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Total Return</h4>
                    <p className="text-2xl font-bold text-green-400">+18.7%</p>
                    <p className="text-sm text-slate-400">YTD Performance</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Sharpe Ratio</h4>
                    <p className="text-2xl font-bold text-blue-400">1.42</p>
                    <p className="text-sm text-slate-400">Risk-adjusted return</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Beta</h4>
                    <p className="text-2xl font-bold text-yellow-400">0.85</p>
                    <p className="text-sm text-slate-400">Market correlation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Risk Management Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Risk Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { metric: 'Value at Risk (1-day)', value: '$125,000', level: 'moderate' },
                        { metric: 'Maximum Drawdown', value: '15.2%', level: 'acceptable' },
                        { metric: 'Volatility', value: '18.5%', level: 'moderate' },
                        { metric: 'Correlation Risk', value: '0.72', level: 'high' }
                      ].map((risk, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <span className="text-white">{risk.metric}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-white">{risk.value}</span>
                            <Badge 
                              variant={risk.level === 'high' ? 'destructive' : risk.level === 'moderate' ? 'secondary' : 'default'}
                            >
                              {risk.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Financial Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Market Predictions</h4>
                    <div className="space-y-3">
                      {[
                        { timeframe: 'Next 30 Days', prediction: '+3.2% growth', confidence: '78%' },
                        { timeframe: 'Next Quarter', prediction: '+8.7% growth', confidence: '65%' },
                        { timeframe: 'Next Year', prediction: '+15.3% growth', confidence: '52%' }
                      ].map((forecast, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{forecast.timeframe}</p>
                            <p className="text-sm text-green-400">{forecast.prediction}</p>
                          </div>
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                            {forecast.confidence} confidence
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}