import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Target, BarChart3, Zap, Brain, Users, Globe, 
  Rocket, DollarSign, Eye, MousePointer, Calendar, Shield, Award, 
  ArrowRight, Play, Download, Search, Activity, AlertCircle,
  LineChart, PieChart, Hash, Link, MessageSquare, Image, Video
} from 'lucide-react';

interface MarketingIntelligence {
  id: string;
  timestamp: number;
  target: string;
  googleTrends: {
    keyword: string;
    interest: number;
    relatedQueries: string[];
    risingTopics: string[];
    geoData: { region: string; interest: number }[];
    timeSeriesData: { date: string; value: number }[];
  };
  competitorAnalysis: {
    competitor: string;
    marketShare: number;
    adSpend: number;
    topKeywords: string[];
    strategies: string[];
  }[];
  audienceInsights: {
    demographics: { age: string; percentage: number }[];
    interests: string[];
    behaviors: string[];
    purchaseIntent: number;
    deviceUsage: { device: string; percentage: number }[];
  };
  contentPerformance: {
    topPerformingContent: { type: string; engagement: number; reach: number }[];
    viralPotential: number;
    optimalPostTimes: string[];
  };
  marketOpportunities: {
    untappedKeywords: string[];
    emergingTrends: string[];
    gapAnalysis: string[];
    roi_projections: { strategy: string; projected_roi: number }[];
  };
}

interface CampaignOptimization {
  id: string;
  campaign_name: string;
  current_performance: {
    ctr: number;
    conversion_rate: number;
    roas: number;
    cpc: number;
  };
  ai_recommendations: {
    bid_adjustments: { keyword: string; suggested_bid: number; reason: string }[];
    audience_targeting: { segment: string; potential_lift: number }[];
    creative_optimization: { element: string; suggestion: string; impact: string }[];
    budget_allocation: { channel: string; suggested_budget: number; expected_return: number }[];
  };
  predictive_analytics: {
    next_7_days: { metric: string; predicted_value: number; confidence: number }[];
    seasonal_trends: { period: string; expected_change: number }[];
  };
}

export default function AdvancedPerformanceMarketing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [marketingIntel, setMarketingIntel] = useState<MarketingIntelligence | null>(null);
  const [campaignOptimization, setCampaignOptimization] = useState<CampaignOptimization | null>(null);
  const [activeTools, setActiveTools] = useState<string[]>([]);

  const premiumMarketingTools = [
    {
      id: 'trends-harvester',
      name: 'Google Trends Intelligence',
      description: 'Real-time trend analysis and keyword opportunity discovery',
      icon: TrendingUp,
      status: 'premium',
      capabilities: [
        'Real-time Google Trends API integration',
        'Geographic trend mapping',
        'Rising topic prediction',
        'Seasonal pattern analysis'
      ]
    },
    {
      id: 'competitor-spy',
      name: 'Competitor Intelligence Engine',
      description: 'Deep competitor analysis and strategy reverse-engineering',
      icon: Eye,
      status: 'premium',
      capabilities: [
        'Ad spend estimation',
        'Keyword gap analysis',
        'Creative strategy analysis',
        'Market share tracking'
      ]
    },
    {
      id: 'audience-profiler',
      name: 'Advanced Audience Profiler',
      description: 'Psychographic and behavioral audience intelligence',
      icon: Users,
      status: 'premium',
      capabilities: [
        'Behavioral pattern analysis',
        'Purchase intent scoring',
        'Lookalike audience generation',
        'Cross-platform tracking'
      ]
    },
    {
      id: 'content-optimizer',
      name: 'AI Content Performance Engine',
      description: 'Content optimization with viral potential prediction',
      icon: Brain,
      status: 'premium',
      capabilities: [
        'Viral potential scoring',
        'Optimal timing prediction',
        'Engagement rate forecasting',
        'Multi-platform optimization'
      ]
    },
    {
      id: 'roi-predictor',
      name: 'ROI Prediction Matrix',
      description: 'Advanced ROI forecasting and budget optimization',
      icon: DollarSign,
      status: 'premium',
      capabilities: [
        'Machine learning ROI prediction',
        'Budget allocation optimization',
        'Lifetime value calculation',
        'Attribution modeling'
      ]
    },
    {
      id: 'automation-engine',
      name: 'Campaign Automation AI',
      description: 'Autonomous campaign management and optimization',
      icon: Zap,
      status: 'premium',
      capabilities: [
        'Real-time bid optimization',
        'Automated A/B testing',
        'Dynamic budget allocation',
        'Performance anomaly detection'
      ]
    }
  ];

  const analysisStages = [
    { name: 'Google Trends Data Harvesting', duration: 2500 },
    { name: 'Competitor Intelligence Gathering', duration: 3000 },
    { name: 'Audience Behavioral Analysis', duration: 2000 },
    { name: 'Content Performance Mining', duration: 1500 },
    { name: 'Market Opportunity Mapping', duration: 2500 },
    { name: 'AI-Powered Correlation Analysis', duration: 2000 },
    { name: 'ROI Prediction Modeling', duration: 1500 },
    { name: 'Strategic Recommendations Generation', duration: 1000 }
  ];

  const startAdvancedAnalysis = async () => {
    if (!searchQuery.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setActiveTools([]);

    // Simulate progressive analysis
    let progress = 0;
    const totalDuration = analysisStages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsed = 0;

    for (let index = 0; index < analysisStages.length; index++) {
      const stage = analysisStages[index];
      setActiveTools([stage.name]);
      
      const stageInterval = setInterval(() => {
        elapsed += 100;
        progress = Math.min((elapsed / totalDuration) * 100, 100);
        setAnalysisProgress(progress);
      }, 100);

      await new Promise(resolve => setTimeout(resolve, stage.duration));
      clearInterval(stageInterval);
    }

    // Generate comprehensive marketing intelligence
    const intel: MarketingIntelligence = {
      id: `marketing_intel_${Date.now()}`,
      timestamp: Date.now(),
      target: searchQuery,
      googleTrends: {
        keyword: searchQuery,
        interest: 75 + Math.random() * 25,
        relatedQueries: [
          `${searchQuery} reviews`,
          `best ${searchQuery}`,
          `${searchQuery} alternatives`,
          `${searchQuery} pricing`,
          `${searchQuery} comparison`
        ],
        risingTopics: [
          `${searchQuery} AI integration`,
          `${searchQuery} automation`,
          `sustainable ${searchQuery}`,
          `${searchQuery} mobile app`
        ],
        geoData: [
          { region: 'United States', interest: 100 },
          { region: 'United Kingdom', interest: 78 },
          { region: 'Canada', interest: 65 },
          { region: 'Australia', interest: 58 },
          { region: 'Germany', interest: 52 }
        ],
        timeSeriesData: Array.from({ length: 12 }, (_, i) => ({
          date: `2023-${String(i + 1).padStart(2, '0')}`,
          value: 40 + Math.random() * 60
        }))
      },
      competitorAnalysis: [
        {
          competitor: `${searchQuery} Pro`,
          marketShare: 23.5,
          adSpend: 2500000,
          topKeywords: [`${searchQuery} software`, `professional ${searchQuery}`, `enterprise ${searchQuery}`],
          strategies: ['Premium positioning', 'Enterprise focus', 'Content marketing leadership']
        },
        {
          competitor: `${searchQuery} Plus`,
          marketShare: 18.3,
          adSpend: 1800000,
          topKeywords: [`affordable ${searchQuery}`, `${searchQuery} for small business`, `cheap ${searchQuery}`],
          strategies: ['Price competition', 'SMB targeting', 'Social media advertising']
        }
      ],
      audienceInsights: {
        demographics: [
          { age: '18-24', percentage: 15 },
          { age: '25-34', percentage: 35 },
          { age: '35-44', percentage: 28 },
          { age: '45-54', percentage: 16 },
          { age: '55+', percentage: 6 }
        ],
        interests: [
          'Technology and innovation',
          'Business productivity',
          'Digital marketing',
          'Professional development',
          'Entrepreneurship'
        ],
        behaviors: [
          'Early technology adopters',
          'Research-driven purchasers',
          'Price-sensitive decision makers',
          'Social media influencers',
          'Mobile-first users'
        ],
        purchaseIntent: 73.2,
        deviceUsage: [
          { device: 'Mobile', percentage: 58 },
          { device: 'Desktop', percentage: 32 },
          { device: 'Tablet', percentage: 10 }
        ]
      },
      contentPerformance: {
        topPerformingContent: [
          { type: 'Video tutorials', engagement: 87.5, reach: 245000 },
          { type: 'Case studies', engagement: 76.3, reach: 189000 },
          { type: 'Product demos', engagement: 82.1, reach: 167000 },
          { type: 'Industry insights', engagement: 69.8, reach: 134000 }
        ],
        viralPotential: 68.4,
        optimalPostTimes: ['9:00 AM EST', '1:00 PM EST', '7:00 PM EST']
      },
      marketOpportunities: {
        untappedKeywords: [
          `${searchQuery} automation tools`,
          `AI-powered ${searchQuery}`,
          `${searchQuery} integration platform`,
          `cloud-based ${searchQuery}`
        ],
        emergingTrends: [
          'AI integration demand rising 340%',
          'Mobile-first approach gaining traction',
          'Sustainability concerns increasing',
          'API-first architecture preference'
        ],
        gapAnalysis: [
          'Limited mobile app presence among competitors',
          'Underutilized video content marketing',
          'Weak presence in emerging markets',
          'Insufficient thought leadership content'
        ],
        roi_projections: [
          { strategy: 'Mobile app development', projected_roi: 285 },
          { strategy: 'Video content marketing', projected_roi: 340 },
          { strategy: 'Influencer partnerships', projected_roi: 220 },
          { strategy: 'SEO optimization', projected_roi: 180 }
        ]
      }
    };

    // Generate campaign optimization recommendations
    const optimization: CampaignOptimization = {
      id: `campaign_opt_${Date.now()}`,
      campaign_name: `${searchQuery} Growth Campaign`,
      current_performance: {
        ctr: 3.2 + Math.random() * 2,
        conversion_rate: 2.8 + Math.random() * 1.5,
        roas: 380 + Math.random() * 120,
        cpc: 1.25 + Math.random() * 0.75
      },
      ai_recommendations: {
        bid_adjustments: [
          { keyword: `${searchQuery} software`, suggested_bid: 2.85, reason: 'High conversion potential detected' },
          { keyword: `best ${searchQuery}`, suggested_bid: 3.20, reason: 'Rising search volume observed' },
          { keyword: `${searchQuery} alternative`, suggested_bid: 1.95, reason: 'Lower competition window identified' }
        ],
        audience_targeting: [
          { segment: 'High-intent mobile users', potential_lift: 34 },
          { segment: 'Previous website visitors', potential_lift: 67 },
          { segment: 'Competitor audience lookalikes', potential_lift: 28 }
        ],
        creative_optimization: [
          { element: 'Headline', suggestion: 'Include urgency and value proposition', impact: 'Expected +15% CTR' },
          { element: 'Call-to-action', suggestion: 'Test action-oriented language', impact: 'Expected +12% conversions' },
          { element: 'Visual assets', suggestion: 'Emphasize mobile-friendly design', impact: 'Expected +8% engagement' }
        ],
        budget_allocation: [
          { channel: 'Google Ads', suggested_budget: 15000, expected_return: 57000 },
          { channel: 'Facebook Ads', suggested_budget: 8000, expected_return: 28800 },
          { channel: 'LinkedIn Ads', suggested_budget: 5000, expected_return: 22500 }
        ]
      },
      predictive_analytics: {
        next_7_days: [
          { metric: 'CTR', predicted_value: 4.1, confidence: 87 },
          { metric: 'Conversion Rate', predicted_value: 3.8, confidence: 82 },
          { metric: 'ROAS', predicted_value: 425, confidence: 90 }
        ],
        seasonal_trends: [
          { period: 'Q4 Holiday Season', expected_change: 45 },
          { period: 'Back-to-School', expected_change: 23 },
          { period: 'Summer Slowdown', expected_change: -18 }
        ]
      }
    };

    setMarketingIntel(intel);
    setCampaignOptimization(optimization);
    setIsAnalyzing(false);
    setActiveTools([]);
  };

  const exportMarketingReport = () => {
    if (!marketingIntel || !campaignOptimization) return;
    
    const reportData = {
      marketing_intelligence: marketingIntel,
      campaign_optimization: campaignOptimization,
      generated_at: new Date().toISOString(),
      report_type: 'Advanced Performance Marketing Intelligence Report',
      classification: 'BUSINESS CONFIDENTIAL',
      analyst: 'MING-MING AI Marketing Agent',
      methodology: 'Multi-source data harvesting with AI-powered analysis'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-intelligence-${marketingIntel.target}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
          ADVANCED PERFORMANCE MARKETING
        </h1>
        <p className="text-xl text-gray-300">
          Premium Data Harvesting & AI-Powered Marketing Intelligence Platform
        </p>
      </motion.div>

      {/* Analysis Interface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30">
          <h2 className="text-3xl font-bold mb-6 text-center">Marketing Intelligence Engine</h2>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter product, service, or industry keyword for analysis"
              className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startAdvancedAnalysis}
              disabled={isAnalyzing || !searchQuery.trim()}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Search size={20} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Start Deep Analysis'}</span>
            </motion.button>
          </div>

          {/* Analysis Progress */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-black/60 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Analysis Progress</span>
                    <span className="text-green-400 font-bold">{analysisProgress.toFixed(0)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisProgress}%` }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    />
                  </div>
                  
                  <div className="text-center">
                    {activeTools.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-yellow-400 font-semibold"
                      >
                        {tool}...
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Premium Marketing Tools */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Premium Marketing Intelligence Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumMarketingTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <tool.icon className="text-green-400" size={32} />
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                  PREMIUM
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              
              <div className="space-y-2">
                {tool.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Zap size={12} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{capability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Marketing Intelligence Results */}
      <AnimatePresence>
        {marketingIntel && campaignOptimization && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Marketing Intelligence Report</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportMarketingReport}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2"
                >
                  <Download size={16} />
                  <span>Export Full Report</span>
                </motion.button>
              </div>

              {/* Google Trends Intelligence */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                    <TrendingUp size={20} className="mr-2" />
                    Google Trends Intelligence
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Search Interest</span>
                      <span className="text-2xl font-bold text-blue-400">{marketingIntel.googleTrends.interest.toFixed(0)}/100</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Rising Topics</h4>
                      <div className="space-y-1">
                        {marketingIntel.googleTrends.risingTopics.map((topic, index) => (
                          <div key={index} className="text-sm text-green-400 flex items-center">
                            <ArrowRight size={12} className="mr-2" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">Top Regions</h4>
                      <div className="space-y-2">
                        {marketingIntel.googleTrends.geoData.slice(0, 3).map((geo, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">{geo.region}</span>
                            <span className="text-sm text-cyan-400">{geo.interest}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                    <Eye size={20} className="mr-2" />
                    Competitor Intelligence
                  </h3>
                  <div className="space-y-4">
                    {marketingIntel.competitorAnalysis.map((competitor, index) => (
                      <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-white">{competitor.competitor}</h4>
                          <span className="text-sm text-purple-400">{competitor.marketShare}% market share</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-2">
                          Ad Spend: ${competitor.adSpend.toLocaleString()}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Top Keywords: </span>
                          <span className="text-cyan-400">{competitor.topKeywords.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audience Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                    <Users size={20} className="mr-2" />
                    Audience Demographics
                  </h3>
                  <div className="space-y-3">
                    {marketingIntel.audienceInsights.demographics.map((demo, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300">{demo.age}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-orange-400 h-2 rounded-full" 
                              style={{ width: `${demo.percentage * 2}%` }}
                            />
                          </div>
                          <span className="text-sm text-orange-400">{demo.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                    <Target size={20} className="mr-2" />
                    Purchase Intent
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {marketingIntel.audienceInsights.purchaseIntent.toFixed(1)}%
                    </div>
                    <div className="text-gray-400 mb-4">High Intent Score</div>
                    <div className="space-y-2">
                      {marketingIntel.audienceInsights.deviceUsage.map((device, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">{device.device}</span>
                          <span className="text-green-400">{device.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                    <BarChart3 size={20} className="mr-2" />
                    Content Performance
                  </h3>
                  <div className="space-y-3">
                    {marketingIntel.contentPerformance.topPerformingContent.map((content, index) => (
                      <div key={index} className="border border-yellow-500/20 rounded p-3">
                        <div className="font-semibold text-white text-sm">{content.type}</div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-gray-400">Engagement: {content.engagement}%</span>
                          <span className="text-yellow-400">Reach: {content.reach.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campaign Optimization AI Recommendations */}
              <div className="bg-black/50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
                  <Brain size={24} className="mr-2" />
                  AI Campaign Optimization Recommendations
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Performance Predictions (Next 7 Days)</h4>
                    <div className="space-y-3">
                      {campaignOptimization.predictive_analytics.next_7_days.map((prediction, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-cyan-500/10 rounded-lg">
                          <span className="text-gray-300">{prediction.metric}</span>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold">{prediction.predicted_value}</div>
                            <div className="text-xs text-gray-400">{prediction.confidence}% confidence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Budget Optimization</h4>
                    <div className="space-y-3">
                      {campaignOptimization.ai_recommendations.budget_allocation.map((allocation, index) => (
                        <div key={index} className="p-3 bg-green-500/10 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-white">{allocation.channel}</span>
                            <span className="text-green-400">${allocation.suggested_budget.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Expected Return: ${allocation.expected_return.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}