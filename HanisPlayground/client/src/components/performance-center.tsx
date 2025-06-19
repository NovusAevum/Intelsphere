import { useState, useEffect } from "react";
import { Target, TrendingUp, BarChart3, Zap, DollarSign, Users, Eye, Activity } from "lucide-react";

export default function PerformanceCenter() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    roas: 0,
    ctr: 0,
    conversionRate: 0,
    cpm: 0
  });

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "OSINT Marketing", performance: 0, status: "active", budget: 50000 },
    { id: 2, name: "AI Solutions", performance: 0, status: "active", budget: 75000 },
    { id: 3, name: "Cybersecurity", performance: 0, status: "optimizing", budget: 60000 },
    { id: 4, name: "Neural Networks", performance: 0, status: "testing", budget: 40000 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceMetrics({
        roas: 4.2 + Math.random() * 2,
        ctr: 2.8 + Math.random() * 1.5,
        conversionRate: 8.5 + Math.random() * 3,
        cpm: 12 + Math.random() * 8
      });

      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        performance: Math.random() * 100
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const marketingTools = [
    {
      icon: Target,
      title: "TARGETING AI",
      description: "Advanced audience targeting using AI-powered analytics",
      metrics: ["Precision: 97.5%", "Reach: 2.5M+", "Engagement: +85%"],
      color: "from-red-400 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "OPTIMIZATION ENGINE",
      description: "Real-time campaign optimization and performance enhancement",
      metrics: ["ROI Increase: +340%", "Cost Reduction: -45%", "Efficiency: +125%"],
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "ANALYTICS CORE",
      description: "Deep analytics and predictive performance modeling",
      metrics: ["Data Points: 10M+", "Accuracy: 99.2%", "Insights: Real-time"],
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "AUTOMATION HUB",
      description: "Fully automated campaign management and optimization",
      metrics: ["Campaigns: 150+", "Automation: 95%", "Uptime: 99.9%"],
      color: "from-purple-400 to-pink-500"
    }
  ];

  const kpis = [
    {
      icon: DollarSign,
      label: "ROAS",
      value: performanceMetrics.roas.toFixed(1) + "x",
      change: "+23%",
      color: "text-green-400"
    },
    {
      icon: Eye,
      label: "CTR",
      value: performanceMetrics.ctr.toFixed(2) + "%",
      change: "+18%",
      color: "text-cyan-400"
    },
    {
      icon: Target,
      label: "CONVERSION",
      value: performanceMetrics.conversionRate.toFixed(1) + "%",
      change: "+35%",
      color: "text-purple-400"
    },
    {
      icon: BarChart3,
      label: "CPM",
      value: "$" + performanceMetrics.cpm.toFixed(2),
      change: "-12%",
      color: "text-orange-400"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Performance Center Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-mono">
            PERFORMANCE MARKETING CENTER
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered performance marketing with advanced analytics and automated optimization
          </p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-500"
              >
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

        {/* Marketing Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {marketingTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6 group-hover:animate-pulse`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-mono">{tool.title}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                
                <div className="space-y-2">
                  {tool.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Active Campaigns */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-orange-400 mb-6 font-mono">ACTIVE CAMPAIGNS</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6"
              >
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
                
                <div className="mb-4">
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

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400 font-mono">
                    Budget: ${campaign.budget.toLocaleString()}
                  </div>
                  <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-mono">
                    AI OPTIMIZED
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4 font-mono">REVENUE ANALYTICS</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Revenue</span>
                <span className="text-green-400 font-mono">$2.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Growth Rate</span>
                <span className="text-green-400 font-mono">+45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profit Margin</span>
                <span className="text-green-400 font-mono">68%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-cyan-400 mb-4 font-mono">AUDIENCE INSIGHTS</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Reach</span>
                <span className="text-cyan-400 font-mono">15.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Engagement Rate</span>
                <span className="text-cyan-400 font-mono">12.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Retention</span>
                <span className="text-cyan-400 font-mono">89%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono">AI OPTIMIZATION</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Models Active</span>
                <span className="text-purple-400 font-mono">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Optimization Level</span>
                <span className="text-purple-400 font-mono">97%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Learning Rate</span>
                <span className="text-purple-400 font-mono">Real-time</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}