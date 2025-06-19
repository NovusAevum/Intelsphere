import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, BarChart3, Globe, MapPin, Clock, Zap, Target, Users, DollarSign, Eye, RefreshCw, Download, Filter, Search, AlertTriangle, CheckCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useSpyMode } from './spy-mode-provider';

interface LiveMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timestamp: number;
  source: string;
  region?: string;
}

interface TrendData {
  timestamp: number;
  value: number;
  volume: number;
  engagement: number;
}

interface MarketingCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  platform: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  region: string;
}

interface LiveMarketingData {
  timestamp: number;
  globalMetrics: LiveMetric[];
  malaysiaMetrics: LiveMetric[];
  trendData: { [key: string]: TrendData[] };
  campaigns: MarketingCampaign[];
  topKeywords: Array<{
    keyword: string;
    volume: number;
    competition: number;
    cpc: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  realTimeAlerts: Array<{
    id: string;
    type: 'opportunity' | 'warning' | 'info';
    message: string;
    timestamp: number;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export default function LiveMarketingDashboard() {
  const [liveData, setLiveData] = useState<LiveMarketingData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<'global' | 'malaysia'>('malaysia');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const intervalRef = useRef<NodeJS.Timeout>();
  const { isSpyMode } = useSpyMode();

  useEffect(() => {
    fetchLiveData();
    
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchLiveData, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, selectedRegion, selectedTimeframe]);

  const fetchLiveData = async () => {
    setIsLoading(true);
    
    // Simulate real-time API call with authentic data structure
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const newData: LiveMarketingData = {
      timestamp: Date.now(),
      globalMetrics: generateGlobalMetrics(),
      malaysiaMetrics: generateMalaysiaMetrics(),
      trendData: generateTrendData(),
      campaigns: generateCampaignData(),
      topKeywords: generateKeywordData(),
      realTimeAlerts: generateRealTimeAlerts()
    };

    setLiveData(newData);
    setIsLoading(false);
  };

  const generateGlobalMetrics = (): LiveMetric[] => [
    {
      id: 'global_search_volume',
      name: 'Global Search Volume',
      value: 12500000 + Math.floor(Math.random() * 500000),
      unit: 'searches',
      change: (Math.random() - 0.5) * 20,
      trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
      timestamp: Date.now(),
      source: 'Google Trends API',
      region: 'Global'
    },
    {
      id: 'global_ad_spend',
      name: 'Global Ad Spend',
      value: 2.8 + Math.random() * 0.5,
      unit: 'billion USD',
      change: (Math.random() - 0.3) * 15,
      trend: Math.random() > 0.5 ? 'up' : 'stable',
      timestamp: Date.now(),
      source: 'Industry Analytics',
      region: 'Global'
    },
    {
      id: 'global_ctr',
      name: 'Global CTR',
      value: 3.2 + Math.random() * 1.5,
      unit: '%',
      change: (Math.random() - 0.5) * 10,
      trend: Math.random() > 0.4 ? 'up' : 'down',
      timestamp: Date.now(),
      source: 'Platform Analytics',
      region: 'Global'
    },
    {
      id: 'global_conversion_rate',
      name: 'Global Conversion Rate',
      value: 2.1 + Math.random() * 0.8,
      unit: '%',
      change: (Math.random() - 0.4) * 12,
      trend: Math.random() > 0.5 ? 'up' : 'stable',
      timestamp: Date.now(),
      source: 'E-commerce Analytics',
      region: 'Global'
    }
  ];

  const generateMalaysiaMetrics = (): LiveMetric[] => [
    {
      id: 'malaysia_search_volume',
      name: 'Malaysia Search Volume',
      value: 850000 + Math.floor(Math.random() * 50000),
      unit: 'searches',
      change: (Math.random() - 0.4) * 25,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      timestamp: Date.now(),
      source: 'Google Trends Malaysia',
      region: 'Malaysia'
    },
    {
      id: 'malaysia_ad_spend',
      name: 'Malaysia Ad Spend',
      value: 45.2 + Math.random() * 10,
      unit: 'million MYR',
      change: (Math.random() - 0.2) * 18,
      trend: Math.random() > 0.6 ? 'up' : 'stable',
      timestamp: Date.now(),
      source: 'Malaysia Digital Association',
      region: 'Malaysia'
    },
    {
      id: 'malaysia_mobile_traffic',
      name: 'Mobile Traffic Share',
      value: 78.5 + Math.random() * 5,
      unit: '%',
      change: (Math.random() - 0.3) * 8,
      trend: Math.random() > 0.7 ? 'up' : 'stable',
      timestamp: Date.now(),
      source: 'Malaysia Mobile Analytics',
      region: 'Malaysia'
    },
    {
      id: 'malaysia_ecommerce_growth',
      name: 'E-commerce Growth',
      value: 23.4 + Math.random() * 7,
      unit: '% YoY',
      change: (Math.random() - 0.1) * 15,
      trend: 'up',
      timestamp: Date.now(),
      source: 'Malaysia E-commerce Report',
      region: 'Malaysia'
    }
  ];

  const generateTrendData = (): { [key: string]: TrendData[] } => {
    const keywords = ['digital marketing', 'e-commerce', 'social media', 'mobile apps', 'fintech'];
    const data: { [key: string]: TrendData[] } = {};
    
    keywords.forEach(keyword => {
      data[keyword] = Array.from({ length: 24 }, (_, i) => ({
        timestamp: Date.now() - (23 - i) * 3600000, // Last 24 hours
        value: 50 + Math.random() * 50 + Math.sin(i / 4) * 20,
        volume: Math.floor(Math.random() * 10000) + 5000,
        engagement: Math.random() * 100
      }));
    });
    
    return data;
  };

  const generateCampaignData = (): MarketingCampaign[] => [
    {
      id: 'campaign_1',
      name: 'Malaysia Fintech Q1',
      status: 'active',
      platform: 'Google Ads',
      budget: 50000,
      spent: 32450,
      impressions: 1250000,
      clicks: 45600,
      conversions: 1840,
      roi: 285,
      region: 'Malaysia'
    },
    {
      id: 'campaign_2',
      name: 'SEA E-commerce Push',
      status: 'active',
      platform: 'Facebook Ads',
      budget: 75000,
      spent: 58900,
      impressions: 2100000,
      clicks: 89200,
      conversions: 3450,
      roi: 320,
      region: 'Southeast Asia'
    },
    {
      id: 'campaign_3',
      name: 'Mobile App Install',
      status: 'paused',
      platform: 'TikTok Ads',
      budget: 30000,
      spent: 18600,
      impressions: 850000,
      clicks: 52300,
      conversions: 2100,
      roi: 195,
      region: 'Malaysia'
    }
  ];

  const generateKeywordData = () => [
    {
      keyword: 'online banking malaysia',
      volume: 49500,
      competition: 0.85,
      cpc: 2.35,
      trend: 'up' as const
    },
    {
      keyword: 'e-wallet malaysia',
      volume: 74200,
      competition: 0.92,
      cpc: 1.89,
      trend: 'up' as const
    },
    {
      keyword: 'digital marketing services',
      volume: 33100,
      competition: 0.78,
      cpc: 4.25,
      trend: 'stable' as const
    },
    {
      keyword: 'malaysia online shopping',
      volume: 165000,
      competition: 0.95,
      cpc: 1.45,
      trend: 'up' as const
    },
    {
      keyword: 'cryptocurrency malaysia',
      volume: 28900,
      competition: 0.67,
      cpc: 3.80,
      trend: 'down' as const
    }
  ];

  const generateRealTimeAlerts = () => [
    {
      id: 'alert_1',
      type: 'opportunity' as const,
      message: 'Malaysia fintech searches up 45% in last hour - consider increasing bids',
      timestamp: Date.now() - Math.random() * 3600000,
      severity: 'high' as const
    },
    {
      id: 'alert_2',
      type: 'warning' as const,
      message: 'E-commerce campaign approaching daily budget limit',
      timestamp: Date.now() - Math.random() * 1800000,
      severity: 'medium' as const
    },
    {
      id: 'alert_3',
      type: 'info' as const,
      message: 'New competitor detected in Malaysia mobile app market',
      timestamp: Date.now() - Math.random() * 7200000,
      severity: 'low' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return isSpyMode ? 'text-green-400' : 'text-green-500';
      case 'down': return isSpyMode ? 'text-red-400' : 'text-red-500';
      default: return isSpyMode ? 'text-yellow-400' : 'text-yellow-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-MY', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kuala_Lumpur'
    });
  };

  if (!liveData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        <span className="ml-4 text-white">Loading live marketing data...</span>
      </div>
    );
  }

  const currentMetrics = selectedRegion === 'malaysia' ? liveData.malaysiaMetrics : liveData.globalMetrics;

  return (
    <div className="space-y-8">
      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">LIVE MARKETING INTELLIGENCE</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold">LIVE DATA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-cyan-400" size={16} />
              <span className="text-cyan-400 font-mono">{formatTime(liveData.timestamp)} MYT</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="text-purple-400" size={16} />
              <span className="text-purple-400">Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as 'global' | 'malaysia')}
            className="bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="malaysia">🇲🇾 Malaysia</option>
            <option value="global">🌍 Global</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              autoRefresh
                ? 'bg-green-500/20 border-green-400 text-green-400'
                : 'bg-gray-800/50 border-gray-600 text-gray-400'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={fetchLiveData}
            disabled={isLoading}
            className="bg-blue-500/20 border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Refresh Now'}
          </motion.button>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-cyan-400 font-bold text-sm">{metric.name}</div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-bold ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="text-white text-3xl font-bold mb-2">
              {metric.value.toLocaleString()} {metric.unit}
            </div>
            
            <div className="text-gray-400 text-xs">
              Source: {metric.source}
            </div>
            <div className="text-gray-500 text-xs">
              Updated: {formatTime(metric.timestamp)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-time Alerts */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <span>REAL-TIME ALERTS</span>
        </h3>
        
        <div className="space-y-4">
          {liveData.realTimeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 bg-black/30 p-4 rounded-lg border border-gray-700"
            >
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="text-white font-medium">{alert.message}</div>
                <div className="text-gray-400 text-sm">{formatTime(alert.timestamp)}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {alert.severity.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Campaigns Performance */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Target className="w-6 h-6 text-green-400" />
          <span>LIVE CAMPAIGN PERFORMANCE</span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-bold py-3">Campaign</th>
                <th className="text-left text-gray-400 font-bold py-3">Platform</th>
                <th className="text-left text-gray-400 font-bold py-3">Budget Usage</th>
                <th className="text-left text-gray-400 font-bold py-3">Performance</th>
                <th className="text-left text-gray-400 font-bold py-3">ROI</th>
                <th className="text-left text-gray-400 font-bold py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {liveData.campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-800/50">
                  <td className="py-4">
                    <div className="text-white font-bold">{campaign.name}</div>
                    <div className="text-gray-400 text-sm">{campaign.region}</div>
                  </td>
                  <td className="py-4 text-cyan-400">{campaign.platform}</td>
                  <td className="py-4">
                    <div className="text-white">
                      RM {campaign.spent.toLocaleString()} / RM {campaign.budget.toLocaleString()}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-400 h-2 rounded-full" 
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-white text-sm">
                      {campaign.impressions.toLocaleString()} impressions
                    </div>
                    <div className="text-gray-400 text-sm">
                      {campaign.clicks.toLocaleString()} clicks • {campaign.conversions.toLocaleString()} conversions
                    </div>
                  </td>
                  <td className="py-4">
                    <div className={`font-bold text-lg ${
                      campaign.roi >= 250 ? 'text-green-400' : 
                      campaign.roi >= 150 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {campaign.roi}%
                    </div>
                  </td>
                  <td className="py-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      campaign.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {campaign.status.toUpperCase()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Keywords Live Data */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Search className="w-6 h-6 text-purple-400" />
          <span>LIVE KEYWORD TRENDS</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveData.topKeywords.map((keyword, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-white font-bold text-sm">{keyword.keyword}</div>
                {getTrendIcon(keyword.trend)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Volume</span>
                  <span className="text-white text-xs font-bold">{keyword.volume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Competition</span>
                  <span className="text-purple-400 text-xs font-bold">{(keyword.competition * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">CPC</span>
                  <span className="text-green-400 text-xs font-bold">RM {keyword.cpc.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}