import { useState, useEffect } from "react";
import { Target, TrendingUp, BarChart3, DollarSign, Users, Eye, Activity, Zap } from "lucide-react";

export default function PerformanceHub() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    roas: 4.8,
    ctr: 3.2,
    conversionRate: 12.4,
    cpm: 8.5,
    revenue: 0,
    impressions: 0
  });

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "AI Solutions Campaign", performance: 94, spend: 15000, revenue: 72000, status: "active" },
    { id: 2, name: "OSINT Services", performance: 88, spend: 12000, revenue: 58000, status: "active" },
    { id: 3, name: "Cybersecurity", performance: 92, spend: 18000, revenue: 84000, status: "optimizing" },
    { id: 4, name: "Neural Networks", performance: 76, spend: 8000, revenue: 35000, status: "testing" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceMetrics(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 5000) + 2000,
        impressions: prev.impressions + Math.floor(Math.random() * 10000) + 5000,
        roas: 4.2 + Math.random() * 1.5,
        ctr: 2.8 + Math.random() * 1.2
      }));

      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        performance: Math.max(70, Math.min(100, campaign.performance + (Math.random() - 0.5) * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { icon: DollarSign, label: "ROAS", value: `${performanceMetrics.roas.toFixed(1)}x`, change: "+23%", color: "text-green-400" },
    { icon: Eye, label: "CTR", value: `${performanceMetrics.ctr.toFixed(2)}%`, change: "+18%", color: "text-cyan-400" },
    { icon: Target, label: "CONVERSION", value: `${performanceMetrics.conversionRate.toFixed(1)}%`, change: "+35%", color: "text-purple-400" },
    { icon: BarChart3, label: "CPM", value: `$${performanceMetrics.cpm.toFixed(2)}`, change: "-12%", color: "text-orange-400" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-mono">
            PERFORMANCE HUB
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            AI-powered performance marketing with advanced analytics and automated optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${kpi.color}`} />
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-mono">
                    {kpi.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-2 font-mono">{kpi.value}</div>
                <div className="text-sm text-gray-400 font-mono">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-6 font-mono">ACTIVE CAMPAIGNS</h3>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white font-mono">{campaign.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      campaign.status === 'optimizing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-400">Spend:</span>
                      <div className="text-orange-400 font-mono">${campaign.spend.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span>
                      <div className="text-green-400 font-mono">${campaign.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">ROAS:</span>
                      <div className="text-cyan-400 font-mono">{(campaign.revenue / campaign.spend).toFixed(1)}x</div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Performance Score</span>
                      <span>{campaign.performance.toFixed(1)}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${campaign.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">REAL-TIME ANALYTICS</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-400 font-mono">Today's Revenue</span>
                  <span className="text-2xl font-bold text-green-400 font-mono">${(performanceMetrics.revenue / 1000).toFixed(1)}K</span>
                </div>
                <div className="text-xs text-gray-400">+24% from yesterday</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-400 font-mono">Impressions</span>
                  <span className="text-2xl font-bold text-purple-400 font-mono">{(performanceMetrics.impressions / 1000).toFixed(0)}K</span>
                </div>
                <div className="text-xs text-gray-400">Real-time tracking</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-400 font-mono">Active Audiences</span>
                  <span className="text-2xl font-bold text-blue-400 font-mono">24</span>
                </div>
                <div className="text-xs text-gray-400">Segments optimized</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-400 font-mono">AI Optimization</span>
                  <span className="text-2xl font-bold text-yellow-400 font-mono">97%</span>
                </div>
                <div className="text-xs text-gray-400">Auto-pilot engaged</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4 font-mono flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              REVENUE ANALYTICS
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Revenue:</span>
                <span className="text-green-400 font-mono">$2.8M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Growth Rate:</span>
                <span className="text-green-400 font-mono">+47%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profit Margin:</span>
                <span className="text-green-400 font-mono">72%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-cyan-400 mb-4 font-mono flex items-center">
              <Users className="w-5 h-5 mr-2" />
              AUDIENCE INSIGHTS
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Reach:</span>
                <span className="text-cyan-400 font-mono">18.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Engagement Rate:</span>
                <span className="text-cyan-400 font-mono">14.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Retention:</span>
                <span className="text-cyan-400 font-mono">92%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              AI OPTIMIZATION
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Models Active:</span>
                <span className="text-purple-400 font-mono">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Optimization Level:</span>
                <span className="text-purple-400 font-mono">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Learning Rate:</span>
                <span className="text-purple-400 font-mono">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}