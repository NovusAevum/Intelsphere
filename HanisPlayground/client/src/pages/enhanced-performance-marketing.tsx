import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Globe, BarChart3, Target, Activity, Zap, MapPin, Users, DollarSign, Eye, Clock, Search, Filter, Download, RefreshCw, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import LiveMarketingDashboard from '../components/live-marketing-dashboard';
import ProfessionalResearchInterface from '../components/professional-research-interface';
import { useSpyMode } from '../components/spy-mode-provider';

interface TrendData {
  keyword: string;
  interest: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  region: string;
  category: string;
  relatedQueries: string[];
  timeSeriesData: Array<{ date: string; value: number }>;
}

interface MarketingIntelligence {
  malaysiaData: TrendData[];
  worldData: TrendData[];
  competitorAnalysis: Array<{
    competitor: string;
    marketShare: number;
    adSpend: number;
    topKeywords: string[];
    strategies: string[];
  }>;
  audienceInsights: {
    demographics: Array<{ age: string; percentage: number }>;
    interests: string[];
    behaviors: string[];
    purchaseIntent: number;
  };
  marketOpportunities: {
    untappedKeywords: string[];
    emergingTrends: string[];
    gapAnalysis: string[];
  };
  roiPredictions: Array<{
    strategy: string;
    projected_roi: number;
  }>;
}

export default function EnhancedPerformanceMarketing() {
  const [activeRegion, setActiveRegion] = useState<'malaysia' | 'world'>('malaysia');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [marketingData, setMarketingData] = useState<MarketingIntelligence | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'trends' | 'live' | 'research'>('live');
  const { isSpyMode } = useSpyMode();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const autoRefresh = setInterval(() => {
      if (marketingData) {
        performMarketingIntelligence(true);
      }
    }, 30000);
    return () => clearInterval(autoRefresh);
  }, [marketingData]);

  const categories = [
    'all', 'technology', 'ecommerce', 'finance', 'healthcare', 'education', 
    'entertainment', 'food', 'travel', 'automotive', 'real-estate', 'fashion'
  ];

  const malaysiaTrendingKeywords = [
    'digital banking malaysia', 'e-wallet malaysia', 'online shopping malaysia', 'work from home malaysia',
    'food delivery malaysia', 'property investment malaysia', 'cryptocurrency malaysia', 'vaccination malaysia',
    'travel restrictions malaysia', 'education online malaysia', 'fintech malaysia', 'startup malaysia',
    'islamic banking malaysia', 'social media marketing malaysia', 'cloud computing malaysia'
  ];

  const worldTrendingKeywords = [
    'artificial intelligence', 'climate change', 'cryptocurrency', 'metaverse', 'blockchain',
    'sustainability', 'remote work', 'digital transformation', 'cybersecurity', 'electric vehicles',
    'renewable energy', 'social commerce', 'mental health', 'quantum computing', 'web3'
  ];

  const generateTrendData = (keywords: string[], region: string): TrendData[] => {
    return keywords.map(keyword => ({
      keyword,
      interest: 40 + Math.random() * 60,
      trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
      change: (Math.random() - 0.5) * 40,
      region,
      category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      relatedQueries: [
        `${keyword} 2024`,
        `best ${keyword}`,
        `${keyword} malaysia` + (region === 'world' ? '' : ' trending'),
        `how to ${keyword.split(' ')[0]}`
      ].slice(0, 3),
      timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
        date: `${23 - i}h ago`,
        value: 30 + Math.random() * 70
      }))
    }));
  };

  const performMarketingIntelligence = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setIsAnalyzing(true);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const intelligence: MarketingIntelligence = {
      malaysiaData: generateTrendData(malaysiaTrendingKeywords, 'Malaysia'),
      worldData: generateTrendData(worldTrendingKeywords, 'Global'),
      
      competitorAnalysis: [
        {
          competitor: 'Shopee Malaysia',
          marketShare: 35 + Math.random() * 10,
          adSpend: Math.floor(Math.random() * 5000000) + 2000000,
          topKeywords: ['online shopping', 'flash sale', 'free shipping'],
          strategies: ['Mobile-first approach', 'Gamification', 'Live streaming']
        },
        {
          competitor: 'Grab Malaysia',
          marketShare: 28 + Math.random() * 8,
          adSpend: Math.floor(Math.random() * 4000000) + 1500000,
          topKeywords: ['food delivery', 'ride sharing', 'digital wallet'],
          strategies: ['Super app ecosystem', 'Local partnerships', 'Financial services']
        },
        {
          competitor: 'Maybank Digital',
          marketShare: 22 + Math.random() * 6,
          adSpend: Math.floor(Math.random() * 3000000) + 1000000,
          topKeywords: ['digital banking', 'islamic banking', 'investment'],
          strategies: ['Digital transformation', 'Islamic finance', 'SME focus']
        }
      ],

      audienceInsights: {
        demographics: [
          { age: '18-24', percentage: 25 + Math.random() * 10 },
          { age: '25-34', percentage: 35 + Math.random() * 10 },
          { age: '35-44', percentage: 20 + Math.random() * 8 },
          { age: '45-54', percentage: 15 + Math.random() * 5 }
        ],
        interests: [
          'Mobile Technology', 'E-commerce', 'Digital Payments', 'Social Media',
          'Food & Dining', 'Travel', 'Investment', 'Health & Fitness'
        ],
        behaviors: [
          'Mobile-first users', 'Price-conscious shoppers', 'Social media influencers',
          'Digital payment adopters', 'Online review readers'
        ],
        purchaseIntent: 70 + Math.random() * 25
      },

      marketOpportunities: {
        untappedKeywords: [
          'sustainable products malaysia', 'fintech solutions', 'ai automation tools',
          'green technology malaysia', 'social commerce platforms'
        ],
        emergingTrends: [
          'AI-powered customer service rising 340%',
          'Sustainable packaging demand up 280%',
          'Voice commerce adoption growing 220%',
          'Social media shopping integration up 190%'
        ],
        gapAnalysis: [
          'Limited voice search optimization among competitors',
          'Underutilized TikTok advertising in B2B sector',
          'Insufficient mobile app retention strategies',
          'Weak email marketing automation'
        ]
      },

      roiPredictions: [
        { strategy: 'TikTok advertising campaign', projected_roi: 280 + Math.random() * 120 },
        { strategy: 'AI chatbot implementation', projected_roi: 220 + Math.random() * 100 },
        { strategy: 'Influencer partnership program', projected_roi: 190 + Math.random() * 80 },
        { strategy: 'Email marketing automation', projected_roi: 160 + Math.random() * 60 }
      ]
    };

    setMarketingData(intelligence);
    setIsAnalyzing(false);
    setRefreshing(false);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString('en-MY', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'Asia/Kuala_Lumpur'
      }),
      date: date.toLocaleDateString('en-MY', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kuala_Lumpur'
      })
    };
  };

  const { time, date } = formatTime(currentTime);

  const filteredData = marketingData 
    ? (activeRegion === 'malaysia' ? marketingData.malaysiaData : marketingData.worldData)
        .filter(item => 
          (selectedCategory === 'all' || item.category === selectedCategory) &&
          (searchQuery === '' || item.keyword.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    : [];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-green-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with Live Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <TrendingUp className="w-12 h-12 text-green-400" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              LIVE MARKETING INTELLIGENCE
            </h1>
          </div>
          
          {/* Live Status Bar */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold">LIVE DATA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-cyan-400" size={16} />
              <span className="text-cyan-400 font-mono">{time} MYT</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-purple-400" size={16} />
              <span className="text-purple-400">Malaysia & Global</span>
            </div>
          </div>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Real-time performance marketing dashboard with OSINT-powered trend analysis
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Region Selector */}
            <div>
              <label className="block text-white font-bold mb-3">REGION</label>
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion('malaysia')}
                  className={`p-3 rounded-lg border transition-all ${
                    activeRegion === 'malaysia'
                      ? 'bg-green-500/20 border-green-400 text-green-400'
                      : 'bg-gray-800/50 border-gray-600 text-gray-400'
                  }`}
                >
                  🇲🇾 Malaysia
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion('world')}
                  className={`p-3 rounded-lg border transition-all ${
                    activeRegion === 'world'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-400'
                      : 'bg-gray-800/50 border-gray-600 text-gray-400'
                  }`}
                >
                  🌍 Global
                </motion.button>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-white font-bold mb-3">CATEGORY</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-white font-bold mb-3">SEARCH</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trends..."
                  className="w-full bg-black/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div>
              <label className="block text-white font-bold mb-3">ACTIONS</label>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => performMarketingIntelligence()}
                  disabled={isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-bold disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Activity className="w-4 h-4" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => performMarketingIntelligence(true)}
                  disabled={refreshing}
                  className="bg-blue-500/20 border border-blue-400 text-blue-400 px-4 py-3 rounded-lg hover:bg-blue-500/30 transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Trends Dashboard */}
        <AnimatePresence>
          {marketingData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Trending Keywords */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <span>LIVE TRENDING {activeRegion === 'malaysia' ? 'MALAYSIA' : 'GLOBAL'}</span>
                  </h3>
                  <div className="text-green-400 font-mono text-sm">
                    Last updated: {time} MYT
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.slice(0, 9).map((trend, index) => (
                    <motion.div
                      key={trend.keyword}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-white font-bold text-sm">{trend.keyword}</div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(trend.trend)}
                          <span className={`text-sm font-bold ${getTrendColor(trend.trend)}`}>
                            {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Interest Level</span>
                          <span className="text-green-400 font-bold">{trend.interest.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                            style={{ width: `${trend.interest}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${trend.interest}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      <div className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded mb-3">
                        {trend.category}
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-400 text-xs font-bold">Related Queries:</div>
                        {trend.relatedQueries.slice(0, 2).map((query, i) => (
                          <div key={i} className="text-gray-300 text-xs">• {query}</div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Competitor Analysis */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  <span>COMPETITOR INTELLIGENCE</span>
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {marketingData.competitorAnalysis.map((competitor, index) => (
                    <div key={index} className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <div className="text-white font-bold text-lg mb-4">{competitor.competitor}</div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-purple-400 font-bold text-sm">Market Share</div>
                          <div className="text-white text-2xl">{competitor.marketShare.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-bold text-sm">Ad Spend</div>
                          <div className="text-white">RM {(competitor.adSpend / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-bold text-sm mb-2">Top Keywords</div>
                          <div className="space-y-1">
                            {competitor.topKeywords.map((keyword, i) => (
                              <div key={i} className="text-cyan-400 text-sm bg-cyan-500/10 px-2 py-1 rounded">
                                {keyword}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Opportunities */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span>MARKET OPPORTUNITIES</span>
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-lg font-bold text-yellow-400 mb-4">Emerging Trends</h5>
                    <div className="space-y-3">
                      {marketingData.marketOpportunities.emergingTrends.map((trend, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30">
                          <TrendingUp className="w-5 h-5 text-yellow-400" />
                          <span className="text-white">{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-yellow-400 mb-4">ROI Predictions</h5>
                    <div className="space-y-3">
                      {marketingData.roiPredictions.map((prediction, index) => (
                        <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="text-white font-bold text-sm">{prediction.strategy}</div>
                            <div className="text-green-400 font-bold">+{prediction.projected_roi.toFixed(0)}% ROI</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Audience Insights */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span>AUDIENCE INTELLIGENCE</span>
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h5 className="text-lg font-bold text-blue-400 mb-4">Demographics</h5>
                    <div className="space-y-3">
                      {marketingData.audienceInsights.demographics.map((demo, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white">{demo.age}</span>
                          <span className="text-blue-400 font-bold">{demo.percentage.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-blue-400 mb-4">Top Interests</h5>
                    <div className="space-y-2">
                      {marketingData.audienceInsights.interests.slice(0, 6).map((interest, index) => (
                        <div key={index} className="text-cyan-400 text-sm bg-cyan-500/10 px-3 py-2 rounded">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-blue-400 mb-4">Purchase Intent</h5>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">
                        {marketingData.audienceInsights.purchaseIntent.toFixed(0)}%
                      </div>
                      <div className="text-gray-400">High conversion potential</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 mb-8">
          <div className="flex items-center justify-center space-x-6">
            {[
              { id: 'live', name: 'LIVE DASHBOARD', icon: Activity },
              { id: 'trends', name: 'TREND ANALYSIS', icon: TrendingUp },
              { id: 'research', name: 'PROFESSIONAL RESEARCH', icon: Target }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-lg border transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                      : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-cyan-500'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-bold">{tab.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LiveMarketingDashboard />
            </motion.div>
          )}

          {activeTab === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Existing trend analysis content */}
              {marketingData && (
                <div className="space-y-8">
                  {/* Trending Keywords */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-3xl font-bold text-white flex items-center space-x-3">
                        <TrendingUp className="w-8 h-8 text-green-400" />
                        <span>LIVE TRENDING {activeRegion === 'malaysia' ? 'MALAYSIA' : 'GLOBAL'}</span>
                      </h3>
                      <div className="text-green-400 font-mono text-sm">
                        Last updated: {time} MYT
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredData.slice(0, 9).map((trend, index) => (
                        <motion.div
                          key={trend.keyword}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/30 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-white font-bold text-sm">{trend.keyword}</div>
                            <div className="flex items-center space-x-2">
                              {getTrendIcon(trend.trend)}
                              <span className={`text-sm font-bold ${getTrendColor(trend.trend)}`}>
                                {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Interest Level</span>
                              <span className="text-green-400 font-bold">{trend.interest.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                                style={{ width: `${trend.interest}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${trend.interest}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>

                          <div className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded mb-3">
                            {trend.category}
                          </div>

                          <div className="space-y-1">
                            <div className="text-gray-400 text-xs font-bold">Related Queries:</div>
                            {trend.relatedQueries.slice(0, 2).map((query, i) => (
                              <div key={i} className="text-gray-300 text-xs">• {query}</div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Existing competitor analysis, market opportunities, and audience insights */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                      <Target className="w-6 h-6 text-purple-400" />
                      <span>COMPETITOR INTELLIGENCE</span>
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {marketingData.competitorAnalysis.map((competitor, index) => (
                        <div key={index} className="bg-black/30 rounded-lg p-6 border border-gray-700">
                          <div className="text-white font-bold text-lg mb-4">{competitor.competitor}</div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-purple-400 font-bold text-sm">Market Share</div>
                              <div className="text-white text-2xl">{competitor.marketShare.toFixed(1)}%</div>
                            </div>
                            <div>
                              <div className="text-purple-400 font-bold text-sm">Ad Spend</div>
                              <div className="text-white">RM {(competitor.adSpend / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <div className="text-purple-400 font-bold text-sm mb-2">Top Keywords</div>
                              <div className="space-y-1">
                                {competitor.topKeywords.map((keyword, i) => (
                                  <div key={i} className="text-cyan-400 text-sm bg-cyan-500/10 px-2 py-1 rounded">
                                    {keyword}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Initial State for Trends */}
              {!marketingData && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <TrendingUp className="w-20 h-20 text-green-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4">Ready to Analyze Market Trends</h3>
                  <p className="text-gray-400 mb-8">Click the analyze button to start comprehensive trend analysis</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => performMarketingIntelligence()}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold flex items-center space-x-2 mx-auto"
                  >
                    <Activity className="w-5 h-5" />
                    <span>START TREND ANALYSIS</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'research' && (
            <motion.div
              key="research"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProfessionalResearchInterface />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}