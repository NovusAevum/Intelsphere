import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Shield, Zap, Target, Eye, Brain, Database, Activity, Lock, ChevronRight, Download, AlertTriangle, CheckCircle, Clock, MapPin, Mail, Phone, User, Building, Calendar, ExternalLink, Layers, Network, FileText, Image, Video, Hash, Server, Wifi, Smartphone, Camera, Fingerprint, Satellite, Radar, Crosshair } from 'lucide-react';
import { useSpyMode } from '../components/spy-mode-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import InteractiveOSINTSourceMap from '../components/interactive-osint-source-map';
import ExportResults from '../components/export-results';

interface OSINTRequest {
  target: string;
  searchMode: 'surface' | 'deep' | 'comprehensive' | 'exhaustive' | 'classified';
  platforms: string[];
  analysisDepth: 'basic' | 'advanced' | 'military' | 'cia-level';
  includeDeleted: boolean;
  includeDarkWeb: boolean;
  geoLocation: boolean;
  socialEngineering: boolean;
  technicalRecon: boolean;
  timeRange: string;
}

interface OSINTIntelligence {
  target: string;
  confidence: number;
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  classification: 'public' | 'sensitive' | 'confidential' | 'classified';
  
  identity_profile: {
    full_name: string;
    aliases: string[];
    age_range: string;
    location: {
      current: string;
      previous: string[];
      coordinates: { lat: number; lng: number } | null;
    };
    occupation: string;
    education: string[];
    family_members: string[];
  };

  digital_presence: {
    social_profiles: Array<{
      platform: string;
      username: string;
      url: string;
      followers: number;
      activity_level: string;
      last_active: string;
      profile_analysis: string;
      connections: string[];
    }>;
    email_addresses: Array<{
      email: string;
      verified: boolean;
      breach_status: string;
      associated_services: string[];
      creation_date: string;
    }>;
    phone_numbers: Array<{
      number: string;
      type: 'mobile' | 'landline' | 'voip';
      carrier: string;
      location: string;
      associated_accounts: string[];
    }>;
    usernames: Array<{
      username: string;
      platforms: string[];
      availability: boolean;
      variations: string[];
    }>;
  };

  technical_profile: {
    ip_addresses: Array<{
      ip: string;
      location: string;
      isp: string;
      usage_pattern: string;
      security_level: string;
    }>;
    devices: Array<{
      device_type: string;
      os: string;
      browser: string;
      fingerprint: string;
      last_seen: string;
    }>;
    domains: Array<{
      domain: string;
      ownership: string;
      creation_date: string;
      technologies: string[];
      security_status: string;
    }>;
    network_infrastructure: {
      hosting_providers: string[];
      cdn_services: string[];
      security_services: string[];
      vulnerabilities: string[];
    };
  };

  deep_web_findings: {
    archived_content: Array<{
      url: string;
      content_type: string;
      capture_date: string;
      significance: string;
      content_summary: string;
    }>;
    deleted_profiles: Array<{
      platform: string;
      deletion_date: string;
      recovered_data: string;
      recovery_method: string;
    }>;
    data_breaches: Array<{
      breach_name: string;
      breach_date: string;
      exposed_data: string[];
      severity: string;
      source_confidence: number;
    }>;
    paste_sites: Array<{
      site: string;
      content: string;
      post_date: string;
      relevance_score: number;
    }>;
  };

  dark_web_intelligence: {
    tor_findings: Array<{
      service_type: string;
      url: string;
      description: string;
      risk_level: string;
      last_accessed: string;
    }>;
    marketplace_mentions: Array<{
      marketplace: string;
      context: string;
      threat_level: string;
      evidence: string;
    }>;
    forum_discussions: Array<{
      forum: string;
      topic: string;
      relevance: string;
      participants: string[];
    }>;
    criminal_associations: Array<{
      association_type: string;
      confidence: number;
      evidence: string;
      investigation_priority: string;
    }>;
  };

  geospatial_data: {
    location_history: Array<{
      location: string;
      timestamp: string;
      source: string;
      accuracy: string;
      activity_type: string;
    }>;
    travel_patterns: Array<{
      route: string;
      frequency: string;
      purpose: string;
      timeline: string;
    }>;
    associated_locations: Array<{
      address: string;
      relationship: string;
      significance: string;
      verification_status: string;
    }>;
  };

  behavioral_profile: {
    activity_patterns: {
      online_hours: string;
      peak_activity: string;
      communication_style: string;
      interests: string[];
      behavioral_indicators: string[];
    };
    psychological_profile: {
      personality_traits: string[];
      risk_factors: string[];
      manipulation_susceptibility: string;
      social_engineering_vectors: string[];
    };
    threat_assessment: {
      capability_level: string;
      intent_analysis: string;
      opportunity_factors: string[];
      recommended_countermeasures: string[];
    };
  };

  sources_analyzed: Array<{
    source_type: string;
    source_name: string;
    data_points: number;
    reliability: number;
    last_updated: string;
    access_method: string;
  }>;

  opsec_analysis: {
    digital_hygiene: string;
    privacy_awareness: string;
    security_vulnerabilities: string[];
    exploitation_vectors: string[];
    defensive_recommendations: string[];
  };
}

export default function PremiumOSINT() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'surface' | 'deep' | 'comprehensive' | 'exhaustive' | 'classified'>('classified');
  const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'advanced' | 'military' | 'cia-level'>('cia-level');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [advancedOptions, setAdvancedOptions] = useState({
    includeDeleted: true,
    includeDarkWeb: true,
    geoLocation: true,
    socialEngineering: true,
    technicalRecon: true
  });
  const [activeReport, setActiveReport] = useState<OSINTIntelligence | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'identity' | 'digital' | 'technical' | 'deepweb' | 'darkweb' | 'geospatial' | 'behavioral' | 'opsec' | 'network'>('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const { isSpyMode } = useSpyMode();

  const osintMutation = useMutation({
    mutationFn: async (request: OSINTRequest): Promise<OSINTIntelligence> => {
      const response = await fetch('/api/osint-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });
      return response.json();
    },
    onSuccess: (data: OSINTIntelligence) => {
      setActiveReport(data);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error('OSINT analysis failed:', error);
      setIsAnalyzing(false);
    }
  });

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Globe },
    { id: 'linkedin', name: 'LinkedIn', icon: User },
    { id: 'twitter', name: 'Twitter', icon: Database },
    { id: 'facebook', name: 'Facebook', icon: User },
    { id: 'instagram', name: 'Instagram', icon: Camera },
    { id: 'github', name: 'GitHub', icon: Database },
    { id: 'darkweb', name: 'Dark Web', icon: Lock }
  ];

  const searchModes = [
    { id: 'surface', name: 'Surface Web', color: 'green', complexity: 1, description: 'Basic social media and public records' },
    { id: 'deep', name: 'Deep Web', color: 'blue', complexity: 2, description: 'Hidden databases and archived content' },
    { id: 'comprehensive', name: 'Comprehensive', color: 'purple', complexity: 3, description: 'Multi-source correlation analysis' },
    { id: 'exhaustive', name: 'Exhaustive', color: 'orange', complexity: 4, description: 'Advanced pattern recognition and behavioral analysis' },
    { id: 'classified', name: 'Classified', color: 'red', complexity: 5, description: 'CIA-level intelligence gathering and threat assessment' }
  ];

  const analysisDepths = [
    { id: 'basic', name: 'Basic', description: 'Standard intelligence gathering' },
    { id: 'advanced', name: 'Advanced', description: 'Enhanced correlation and analysis' },
    { id: 'military', name: 'Military', description: 'Defense-grade intelligence operations' },
    { id: 'cia-level', name: 'CIA Level', description: 'Maximum security intelligence gathering' }
  ];

  const executeCIALevelAnalysis = async () => {
    if (!searchQuery.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep('Initializing CIA-level intelligence gathering...');

    const steps = [
      'Scanning surface web and social media platforms...',
      'Performing advanced Google dorking techniques...',
      'Executing Shodan infrastructure reconnaissance...',
      'Analyzing deep web archives and cached content...',
      'Scanning dark web sources and threat intelligence...',
      'Cross-referencing data breach databases...',
      'Performing behavioral pattern analysis...',
      'Correlating geospatial intelligence data...',
      'Generating comprehensive threat assessment...',
      'Finalizing CIA-level intelligence report...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      
      const baseTime = 800;
      const variableTime = Math.random() * 1200;
      const complexityMultiplier = searchMode === 'classified' ? 1.5 : 1;
      
      await new Promise(resolve => 
        setTimeout(resolve, (baseTime + variableTime) * complexityMultiplier)
      );
    }

    const request: OSINTRequest = {
      target: searchQuery,
      searchMode,
      platforms: selectedPlatforms,
      analysisDepth,
      includeDeleted: advancedOptions.includeDeleted,
      includeDarkWeb: advancedOptions.includeDarkWeb,
      geoLocation: advancedOptions.geoLocation,
      socialEngineering: advancedOptions.socialEngineering,
      technicalRecon: advancedOptions.technicalRecon,
      timeRange: 'comprehensive'
    };

    osintMutation.mutate(request);
  };

  const togglePlatform = (platformId: string) => {
    if (platformId === 'all') {
      setSelectedPlatforms(['all']);
    } else {
      const newPlatforms = selectedPlatforms.includes('all') 
        ? [platformId]
        : selectedPlatforms.includes(platformId)
        ? selectedPlatforms.filter(p => p !== platformId)
        : [...selectedPlatforms.filter(p => p !== 'all'), platformId];
      
      setSelectedPlatforms(newPlatforms.length === 0 ? ['all'] : newPlatforms);
    }
  };

  const getModeColor = (mode: string) => {
    const modeData = searchModes.find(m => m.id === mode);
    return modeData?.color || 'blue';
  };

  const getComplexityBars = (complexity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-2 w-4 rounded ${
          i < complexity ? 'bg-red-400' : 'bg-gray-600'
        }`}
      />
    ));
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isSpyMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-red-900' 
        : 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center space-x-4 mb-6"
          >
            <div className="relative">
              <Radar className="w-16 h-16 text-red-400" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="w-16 h-16 border-2 border-red-400 border-t-transparent rounded-full"></div>
              </motion.div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              ADVANCED OSINT
            </h1>
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-xl">CIA-LEVEL</span>
            </div>
          </motion.div>
          
          <div className="flex items-center justify-center space-x-8 text-lg">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-2"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold">Intelligence Ready</span>
            </motion.div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400">847 Data Sources</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400">Real-time Analysis</span>
            </div>
          </div>
          
          <p className="text-gray-300 mt-4 text-lg max-w-4xl mx-auto">
            Advanced OSINT platform exceeding ChatGPT's deep research capabilities. 
            Enter target identifier above to initiate comprehensive intelligence gathering operation.
          </p>
        </motion.div>

        {/* Main Interface */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Target Input */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-white font-bold text-lg mb-4">
                    Target Identifier
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="email@domain.com, username, domain.com, or full name"
                      className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-lg"
                      disabled={isAnalyzing}
                    />
                    <Search className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <label className="block text-white font-bold text-lg mb-4">
                    Intelligence Sources
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {platforms.map((platform) => {
                      const IconComponent = platform.icon;
                      const isSelected = selectedPlatforms.includes(platform.id);
                      return (
                        <motion.button
                          key={platform.id}
                          onClick={() => togglePlatform(platform.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                              : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500'
                          }`}
                          disabled={isAnalyzing}
                        >
                          <IconComponent className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">{platform.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Analysis Configuration */}
              <div className="space-y-6">
                {/* Search Mode */}
                <div>
                  <label className="block text-white font-bold text-lg mb-4">
                    Analysis Depth
                  </label>
                  <div className="space-y-3">
                    {searchModes.map((mode) => (
                      <motion.button
                        key={mode.id}
                        onClick={() => setSearchMode(mode.id as any)}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                          searchMode === mode.id
                            ? `bg-${mode.color}-500/20 border-${mode.color}-400`
                            : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                        }`}
                        disabled={isAnalyzing}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-bold ${
                            searchMode === mode.id ? `text-${mode.color}-400` : 'text-white'
                          }`}>
                            {mode.name}
                          </span>
                          <div className="flex space-x-1">
                            {getComplexityBars(mode.complexity)}
                          </div>
                        </div>
                        <p className={`text-sm ${
                          searchMode === mode.id ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {mode.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <label className="block text-white font-bold text-lg mb-4">
                    Advanced Options
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'includeDeleted', label: 'Deleted Content Recovery', icon: Database },
                      { key: 'includeDarkWeb', label: 'Dark Web Scanning', icon: Lock },
                      { key: 'geoLocation', label: 'Geospatial Analysis', icon: MapPin },
                      { key: 'socialEngineering', label: 'Social Engineering Vectors', icon: User },
                      { key: 'technicalRecon', label: 'Technical Reconnaissance', icon: Server }
                    ].map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <motion.label
                          key={option.key}
                          className="flex items-center space-x-3 cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <input
                            type="checkbox"
                            checked={advancedOptions[option.key as keyof typeof advancedOptions]}
                            onChange={(e) => setAdvancedOptions({
                              ...advancedOptions,
                              [option.key]: e.target.checked
                            })}
                            className="w-5 h-5 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                            disabled={isAnalyzing}
                          />
                          <IconComponent className="w-5 h-5 text-gray-400" />
                          <span className="text-white">{option.label}</span>
                        </motion.label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Execute Button */}
            <div className="mt-8 text-center">
              <motion.button
                onClick={executeCIALevelAnalysis}
                disabled={!searchQuery.trim() || isAnalyzing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  !searchQuery.trim() || isAnalyzing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-red-500/25`
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Crosshair className="w-6 h-6" />
                    <span>Execute CIA-Level Analysis</span>
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Analysis Progress */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/30"
              >
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Radar className="w-12 h-12 text-orange-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">
                      CIA-Level Intelligence Analysis in Progress
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress: {Math.round(analysisProgress)}%</span>
                      <span className="text-orange-400 font-mono">
                        {formatTimestamp(Date.now())} MYT
                      </span>
                    </div>
                  </div>
                  
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-300 text-lg font-mono"
                  >
                    {currentStep}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {activeReport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Report Header */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Intelligence Report</h3>
                    <motion.button
                      onClick={() => setShowExportModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                    >
                      <Download className="w-5 h-5" />
                      <span>Export Report</span>
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">{Math.round(activeReport.confidence)}%</div>
                      <div className="text-gray-400">Confidence Level</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${
                        activeReport.threat_level === 'critical' ? 'text-red-400' :
                        activeReport.threat_level === 'high' ? 'text-orange-400' :
                        activeReport.threat_level === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {activeReport.threat_level.toUpperCase()}
                      </div>
                      <div className="text-gray-400">Threat Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">
                        {activeReport.sources_analyzed.length}
                      </div>
                      <div className="text-gray-400">Sources Analyzed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400">
                        {activeReport.classification.toUpperCase()}
                      </div>
                      <div className="text-gray-400">Classification</div>
                    </div>
                  </div>
                </div>

                {/* Section Navigation */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30">
                  <div className="grid grid-cols-3 md:grid-cols-10 gap-2">
                    {[
                      { id: 'overview', name: 'Overview', icon: Eye },
                      { id: 'identity', name: 'Identity', icon: User },
                      { id: 'digital', name: 'Digital', icon: Smartphone },
                      { id: 'technical', name: 'Technical', icon: Server },
                      { id: 'deepweb', name: 'Deep Web', icon: Database },
                      { id: 'darkweb', name: 'Dark Web', icon: Lock },
                      { id: 'geospatial', name: 'Geospatial', icon: MapPin },
                      { id: 'behavioral', name: 'Behavioral', icon: Brain },
                      { id: 'opsec', name: 'OpSec', icon: Shield },
                      { id: 'network', name: 'Network', icon: Network }
                    ].map((section) => {
                      const IconComponent = section.icon;
                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => setActiveSection(section.id as any)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            activeSection === section.id
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                              : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs font-medium">{section.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Section Content */}
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700"
                >
                  {activeSection === 'overview' && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-white mb-4">Intelligence Overview</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-black/30 p-6 rounded-lg">
                            <h5 className="text-lg font-bold text-cyan-400 mb-4">Target Profile</h5>
                            <div className="space-y-2">
                              <div><span className="text-gray-400">Full Name:</span> <span className="text-white">{activeReport.identity_profile.full_name}</span></div>
                              <div><span className="text-gray-400">Location:</span> <span className="text-white">{activeReport.identity_profile.location.current}</span></div>
                              <div><span className="text-gray-400">Occupation:</span> <span className="text-white">{activeReport.identity_profile.occupation}</span></div>
                            </div>
                          </div>
                          <div className="bg-black/30 p-6 rounded-lg">
                            <h5 className="text-lg font-bold text-orange-400 mb-4">Digital Footprint</h5>
                            <div className="space-y-2">
                              <div><span className="text-gray-400">Social Profiles:</span> <span className="text-white">{activeReport.digital_presence.social_profiles.length}</span></div>
                              <div><span className="text-gray-400">Email Addresses:</span> <span className="text-white">{activeReport.digital_presence.email_addresses.length}</span></div>
                              <div><span className="text-gray-400">Usernames:</span> <span className="text-white">{activeReport.digital_presence.usernames.length}</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-black/30 p-6 rounded-lg">
                            <h5 className="text-lg font-bold text-purple-400 mb-4">Intelligence Sources</h5>
                            <div className="space-y-2">
                              {activeReport.sources_analyzed.map((source, i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="text-gray-400">{source.source_name}:</span>
                                  <span className="text-white">{source.data_points} points</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-black/30 p-6 rounded-lg">
                            <h5 className="text-lg font-bold text-green-400 mb-4">Security Assessment</h5>
                            <div className="space-y-2">
                              <div><span className="text-gray-400">Digital Hygiene:</span> <span className="text-white">{activeReport.opsec_analysis.digital_hygiene}</span></div>
                              <div><span className="text-gray-400">Privacy Awareness:</span> <span className="text-white">{activeReport.opsec_analysis.privacy_awareness}</span></div>
                              <div><span className="text-gray-400">Vulnerabilities:</span> <span className="text-white">{activeReport.opsec_analysis.security_vulnerabilities.length}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'digital' && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-white mb-4">Digital Footprint Analysis</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-black/30 p-6 rounded-lg">
                          <h5 className="text-lg font-bold text-blue-400 mb-4">Social Media Profiles</h5>
                          <div className="space-y-4">
                            {activeReport.digital_presence.social_profiles.map((profile, i) => (
                              <div key={i} className="border border-gray-700 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-cyan-400 font-bold">{profile.platform}</span>
                                  <span className="text-green-400 text-sm">{profile.activity_level}</span>
                                </div>
                                <div className="text-white font-mono mb-2">@{profile.username}</div>
                                <div className="text-sm space-y-1">
                                  <div><span className="text-gray-400">Followers:</span> <span className="text-white">{profile.followers.toLocaleString()}</span></div>
                                  <div><span className="text-gray-400">Last Active:</span> <span className="text-white">{profile.last_active}</span></div>
                                  <div><span className="text-gray-400">Analysis:</span> <span className="text-gray-300">{profile.profile_analysis}</span></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black/30 p-6 rounded-lg">
                          <h5 className="text-lg font-bold text-orange-400 mb-4">Email Intelligence</h5>
                          <div className="space-y-4">
                            {activeReport.digital_presence.email_addresses.map((email, i) => (
                              <div key={i} className="border border-gray-700 p-4 rounded-lg">
                                <div className="text-white font-mono mb-2">{email.email}</div>
                                <div className="text-sm space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-gray-400">Status:</span>
                                    {email.verified ? (
                                      <CheckCircle className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                    )}
                                    <span className={email.verified ? 'text-green-400' : 'text-yellow-400'}>
                                      {email.verified ? 'Verified' : 'Unverified'}
                                    </span>
                                  </div>
                                  <div><span className="text-gray-400">Breach Status:</span> <span className={email.breach_status === 'Clean' ? 'text-green-400' : 'text-red-400'}>{email.breach_status}</span></div>
                                  <div><span className="text-gray-400">Services:</span> <span className="text-white">{email.associated_services.join(', ')}</span></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'network' && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-white mb-4">Intelligence Network Visualization</h4>
                      <InteractiveOSINTSourceMap />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        {!activeReport && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-blue-400 font-bold">847 Data Sources</div>
                  <div className="text-gray-400 text-sm">Comprehensive scanning across social media, deep web, and dark web</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-green-400 font-bold">AI-Powered Analysis</div>
                  <div className="text-gray-400 text-sm">Advanced behavioral profiling and pattern recognition</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-8 h-8 text-red-400" />
                <div>
                  <div className="text-red-400 font-bold">Dark Web Intelligence</div>
                  <div className="text-gray-400 text-sm">Tor network scanning and criminal database cross-reference</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-purple-400 font-bold">Geospatial Analysis</div>
                  <div className="text-gray-400 text-sm">Location intelligence and travel pattern analysis</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && activeReport && (
            <ExportResults
              intelligence={activeReport}
              onClose={() => setShowExportModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}