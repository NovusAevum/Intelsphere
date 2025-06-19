import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Target, Globe, TrendingUp, FileText, Clock, Zap, CheckCircle, AlertTriangle, Download, Copy, Layers, Database, Users, BarChart3 } from 'lucide-react';
import { useSpyMode } from './spy-mode-provider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ResearchRequest {
  topic: string;
  depth: 'surface' | 'deep' | 'comprehensive' | 'exhaustive';
  focus_areas?: string[];
  time_range?: string;
  geographic_scope?: string;
  include_sources?: boolean;
  professional_tone?: boolean;
}

interface ProfessionalResearchReport {
  research_id: string;
  timestamp: number;
  request: ResearchRequest;
  findings: {
    executive_summary: string;
    detailed_analysis: string;
    key_insights: string[];
    data_points: Array<{
      metric: string;
      value: string;
      source: string;
      confidence: number;
      context: string;
    }>;
    sources_analyzed: any[];
    methodology: string;
    limitations: string[];
    recommendations: string[];
    further_research_needed: string[];
  };
  ai_consensus: {
    anthropic_analysis: string;
    openai_analysis: string;
    gemini_analysis: string;
    consensus_score: number;
    conflicting_viewpoints: string[];
    synthesized_conclusion: string;
  };
  quality_metrics: {
    source_diversity: number;
    factual_accuracy: number;
    analytical_depth: number;
    professional_standards: number;
    overall_score: number;
  };
  processing_time: number;
  total_sources_analyzed: number;
}

function ProfessionalResearchInterface() {
  const [researchQuery, setResearchQuery] = useState('');
  const [selectedDepth, setSelectedDepth] = useState<'surface' | 'deep' | 'comprehensive' | 'exhaustive'>('comprehensive');
  const [selectedScope, setSelectedScope] = useState('Global');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [activeReport, setActiveReport] = useState<ProfessionalResearchReport | null>(null);
  const [researchHistory, setResearchHistory] = useState<ProfessionalResearchReport[]>([]);
  const [activeSection, setActiveSection] = useState<'summary' | 'analysis' | 'insights' | 'consensus' | 'methodology'>('summary');
  const { isSpyMode } = useSpyMode();
  const queryClient = useQueryClient();

  const researchMutation = useMutation({
    mutationFn: async (request: ResearchRequest) => {
      return apiRequest('/api/research/professional', 'POST', request);
    },
    onSuccess: (data: ProfessionalResearchReport) => {
      setActiveReport(data);
      setResearchHistory(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 reports
      queryClient.invalidateQueries({ queryKey: ['/api/research'] });
    },
  });

  const marketResearchMutation = useMutation({
    mutationFn: async ({ topic, geographic_scope }: { topic: string; geographic_scope: string }) => {
      return apiRequest('/api/research/market', 'POST', { topic, geographic_scope });
    },
    onSuccess: (data: ProfessionalResearchReport) => {
      setActiveReport(data);
      setResearchHistory(prev => [data, ...prev.slice(0, 9)]);
    },
  });

  const technicalResearchMutation = useMutation({
    mutationFn: async ({ topic }: { topic: string }) => {
      return apiRequest('/api/research/technical', 'POST', { topic });
    },
    onSuccess: (data: ProfessionalResearchReport) => {
      setActiveReport(data);
      setResearchHistory(prev => [data, ...prev.slice(0, 9)]);
    },
  });

  const competitiveResearchMutation = useMutation({
    mutationFn: async ({ company, industry }: { company: string; industry: string }) => {
      return apiRequest('/api/research/competitive', 'POST', { company, industry });
    },
    onSuccess: (data: ProfessionalResearchReport) => {
      setActiveReport(data);
      setResearchHistory(prev => [data, ...prev.slice(0, 9)]);
    },
  });

  const handleResearch = async () => {
    if (!researchQuery.trim()) return;

    const request: ResearchRequest = {
      topic: researchQuery,
      depth: selectedDepth,
      focus_areas: focusAreas.length > 0 ? focusAreas : undefined,
      geographic_scope: selectedScope,
      include_sources: true,
      professional_tone: true,
      time_range: 'Current'
    };

    researchMutation.mutate(request);
  };

  const handleQuickResearch = (type: 'market' | 'technical' | 'competitive') => {
    if (!researchQuery.trim()) return;

    switch (type) {
      case 'market':
        marketResearchMutation.mutate({ topic: researchQuery, geographic_scope: selectedScope });
        break;
      case 'technical':
        technicalResearchMutation.mutate({ topic: researchQuery });
        break;
      case 'competitive':
        const [company, industry] = researchQuery.split(' in ');
        if (company && industry) {
          competitiveResearchMutation.mutate({ company: company.trim(), industry: industry.trim() });
        } else {
          competitiveResearchMutation.mutate({ company: researchQuery, industry: 'Technology' });
        }
        break;
    }
  };

  const addFocusArea = (area: string) => {
    if (area && !focusAreas.includes(area)) {
      setFocusAreas([...focusAreas, area]);
    }
  };

  const removeFocusArea = (area: string) => {
    setFocusAreas(focusAreas.filter(f => f !== area));
  };

  const isLoading = researchMutation.isPending || marketResearchMutation.isPending || 
                   technicalResearchMutation.isPending || competitiveResearchMutation.isPending;

  const formatProcessingTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getQualityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">PROFESSIONAL RESEARCH ENGINE</h2>
        <p className="text-gray-300 text-lg max-w-4xl mx-auto">
          Advanced multi-AI research capabilities exceeding ChatGPT with comprehensive analysis using Anthropic Claude, OpenAI GPT-4o, and Google Gemini
        </p>
      </div>

      {/* Research Input Interface */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
        <div className="space-y-6">
          {/* Main Search */}
          <div className="relative">
            <input
              type="text"
              value={researchQuery}
              onChange={(e) => setResearchQuery(e.target.value)}
              placeholder="Enter research topic (e.g., 'AI market trends in Southeast Asia', 'Fintech regulations Malaysia', 'Company X competitive analysis')"
              className="w-full bg-black/30 border border-gray-600 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
            />
            <Search className="absolute right-4 top-4 text-gray-400" size={24} />
          </div>

          {/* Research Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Research Depth */}
            <div>
              <label className="block text-cyan-400 font-bold mb-2">Research Depth</label>
              <select
                value={selectedDepth}
                onChange={(e) => setSelectedDepth(e.target.value as any)}
                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="surface">Surface (Quick Overview)</option>
                <option value="deep">Deep (Detailed Analysis)</option>
                <option value="comprehensive">Comprehensive (Multi-source)</option>
                <option value="exhaustive">Exhaustive (Maximum Depth)</option>
              </select>
            </div>

            {/* Geographic Scope */}
            <div>
              <label className="block text-cyan-400 font-bold mb-2">Geographic Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Global">Global</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="Southeast Asia">Southeast Asia</option>
                <option value="Malaysia">Malaysia</option>
                <option value="United States">United States</option>
                <option value="Europe">Europe</option>
              </select>
            </div>

            {/* Quick Research Types */}
            <div>
              <label className="block text-cyan-400 font-bold mb-2">Quick Research</label>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleQuickResearch('market')}
                  className="flex-1 bg-green-500/20 border border-green-400 text-green-400 px-3 py-2 rounded text-sm hover:bg-green-500/30"
                  disabled={isLoading}
                >
                  Market
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleQuickResearch('technical')}
                  className="flex-1 bg-blue-500/20 border border-blue-400 text-blue-400 px-3 py-2 rounded text-sm hover:bg-blue-500/30"
                  disabled={isLoading}
                >
                  Technical
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleQuickResearch('competitive')}
                  className="flex-1 bg-purple-500/20 border border-purple-400 text-purple-400 px-3 py-2 rounded text-sm hover:bg-purple-500/30"
                  disabled={isLoading}
                >
                  Competitive
                </motion.button>
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-cyan-400 font-bold mb-2">Focus Areas (Optional)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{area}</span>
                  <button onClick={() => removeFocusArea(area)} className="text-cyan-400 hover:text-white">×</button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['Market Analysis', 'Financial Performance', 'Technology Trends', 'Regulatory Environment', 'Consumer Behavior', 'Competitive Landscape'].map((area) => (
                <button
                  key={area}
                  onClick={() => addFocusArea(area)}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-600"
                  disabled={focusAreas.includes(area)}
                >
                  + {area}
                </button>
              ))}
            </div>
          </div>

          {/* Research Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResearch}
            disabled={isLoading || !researchQuery.trim()}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-bold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>CONDUCTING PROFESSIONAL RESEARCH...</span>
              </>
            ) : (
              <>
                <Brain className="w-6 h-6" />
                <span>START PROFESSIONAL RESEARCH</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Research Results */}
      <AnimatePresence>
        {activeReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Research Header */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Research Report: {activeReport.request.topic}</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-green-400 font-mono text-sm">
                    ID: {activeReport.research_id}
                  </div>
                  <div className="text-cyan-400 font-mono text-sm">
                    Processing: {formatProcessingTime(activeReport.processing_time)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-gray-400 text-xs">Sources Analyzed</div>
                  <div className="text-white text-xl font-bold">{activeReport.total_sources_analyzed}</div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-gray-400 text-xs">AI Consensus</div>
                  <div className="text-green-400 text-xl font-bold">{activeReport.ai_consensus.consensus_score}%</div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-gray-400 text-xs">Quality Score</div>
                  <div className={`text-xl font-bold ${getQualityColor(activeReport.quality_metrics.overall_score)}`}>
                    {(activeReport.quality_metrics.overall_score * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-gray-400 text-xs">Research Depth</div>
                  <div className="text-purple-400 text-sm font-bold uppercase">{activeReport.request.depth}</div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-gray-400 text-xs">Geographic Scope</div>
                  <div className="text-blue-400 text-sm font-bold">{activeReport.request.geographic_scope}</div>
                </div>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30">
              <div className="flex flex-wrap justify-center space-x-4">
                {[
                  { id: 'summary', name: 'Executive Summary', icon: FileText },
                  { id: 'analysis', name: 'Detailed Analysis', icon: BarChart3 },
                  { id: 'insights', name: 'Key Insights', icon: Target },
                  { id: 'consensus', name: 'AI Consensus', icon: Brain },
                  { id: 'methodology', name: 'Methodology', icon: Database }
                ].map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <motion.button
                      key={section.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`px-4 py-2 rounded-lg border transition-all flex items-center space-x-2 ${
                        activeSection === section.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                          : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-cyan-500'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{section.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Content Sections */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-600"
              >
                {activeSection === 'summary' && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">Executive Summary</h4>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {activeReport.findings.executive_summary}
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'analysis' && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">Detailed Analysis</h4>
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {activeReport.findings.detailed_analysis}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'insights' && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">Key Insights</h4>
                    <div className="space-y-4">
                      {activeReport.findings.key_insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h5 className="text-xl font-bold text-white mt-8 mb-4">Recommendations</h5>
                    <div className="space-y-3">
                      {activeReport.findings.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-blue-500/10 p-4 rounded-lg">
                          <Target className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'consensus' && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">Multi-AI Consensus Analysis</h4>
                    <div className="space-y-6">
                      <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30">
                        <h5 className="text-lg font-bold text-green-400 mb-3">Consensus Score: {activeReport.ai_consensus.consensus_score}%</h5>
                        <p className="text-gray-300">{activeReport.ai_consensus.synthesized_conclusion}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                          <h6 className="text-purple-400 font-bold mb-2">Anthropic Analysis</h6>
                          <p className="text-gray-300 text-sm">{activeReport.ai_consensus.anthropic_analysis.substring(0, 200)}...</p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                          <h6 className="text-blue-400 font-bold mb-2">OpenAI Analysis</h6>
                          <p className="text-gray-300 text-sm">{activeReport.ai_consensus.openai_analysis.substring(0, 200)}...</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                          <h6 className="text-orange-400 font-bold mb-2">Gemini Analysis</h6>
                          <p className="text-gray-300 text-sm">{activeReport.ai_consensus.gemini_analysis.substring(0, 200)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'methodology' && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">Research Methodology</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-lg font-bold text-cyan-400 mb-3">Methodology</h5>
                        <p className="text-gray-300 leading-relaxed">{activeReport.findings.methodology}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-lg font-bold text-yellow-400 mb-3">Limitations</h5>
                        <ul className="space-y-2">
                          {activeReport.findings.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                              <span className="text-gray-300">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-lg font-bold text-purple-400 mb-3">Quality Metrics</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(activeReport.quality_metrics).map(([key, value]) => (
                            <div key={key} className="bg-black/30 p-3 rounded-lg">
                              <div className="text-gray-400 text-xs capitalize">{key.replace('_', ' ')}</div>
                              <div className={`text-lg font-bold ${getQualityColor(value as number)}`}>
                                {((value as number) * 100).toFixed(0)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial State */}
      {!activeReport && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Brain className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">Professional Research Ready</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Enter your research topic above to start comprehensive analysis that exceeds ChatGPT's capabilities. 
            Our multi-AI system provides professional-grade research with verified sources and consensus analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700">
              <Layers className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Multi-AI Analysis</h4>
              <p className="text-gray-400 text-sm">Consensus analysis using Anthropic, OpenAI, and Gemini</p>
            </div>
            <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700">
              <Database className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Comprehensive Sources</h4>
              <p className="text-gray-400 text-sm">Analysis of 20-80 verified data sources per research</p>
            </div>
            <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700">
              <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Professional Grade</h4>
              <p className="text-gray-400 text-sm">Enterprise-level research exceeding standard AI limits</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ProfessionalResearchInterface;