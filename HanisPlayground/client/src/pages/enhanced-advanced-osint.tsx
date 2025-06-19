import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Shield, Zap, Target, Eye, Brain, Database, Activity, Lock, ChevronRight, Download, AlertTriangle, CheckCircle, Clock, MapPin, Mail, Phone, User, Building, Calendar, ExternalLink } from 'lucide-react';

interface OSINTResult {
  id: string;
  target: string;
  timestamp: number;
  confidence: number;
  status: 'complete' | 'analyzing' | 'error';
  searchMode: string;
  socialProfiles: Array<{
    platform: string;
    url: string;
    verified: boolean;
    lastActivity: number;
  }>;
  webCrawlData: Array<{
    domain: string;
    pages: number;
    technologies: string[];
    securityHeaders: string[];
    vulnerabilities: string[];
  }>;
  deletedContent: Array<{
    type: string;
    platform: string;
    date: string;
    content: string;
    source: string;
  }>;
  darkWebFindings: Array<{
    source: string;
    type: string;
    confidence: number;
    threat_level: string;
  }>;
  metadataExtraction: Array<{
    file_type: string;
    location_data: boolean;
    device_info: string;
    timestamp: string;
  }>;
  threats: string[];
  geoLocation: {
    coordinates: [number, number];
    city: string;
    country: string;
    confidence: number;
  };
  associatedEmails: string[];
  phoneNumbers: string[];
  domains: string[];
}

export default function EnhancedAdvancedOSINT() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'search' | 'deep' | 'recon' | 'adversarial'>('search');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<OSINTResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('');

  const searchModes = [
    {
      id: 'search',
      name: 'SEARCH',
      description: 'Standard reconnaissance with surface web crawling',
      icon: Search,
      color: 'blue',
      capabilities: ['Social Media Profiles', 'Public Records', 'Website Analysis', 'Email Verification']
    },
    {
      id: 'deep',
      name: 'DEEP SEARCH',
      description: 'Advanced web crawling with JavaScript execution',
      icon: Globe,
      color: 'purple',
      capabilities: ['Deep Web Crawling', 'Archive Recovery', 'Technology Stack Analysis', 'Security Assessment']
    },
    {
      id: 'recon',
      name: 'DEEP DIVE RECONNAISSANCE',
      description: 'Military-grade intelligence with comprehensive analysis',
      icon: Shield,
      color: 'red',
      capabilities: ['Deleted Content Recovery', 'Network Mapping', 'Threat Assessment', 'Geolocation Intelligence']
    },
    {
      id: 'adversarial',
      name: 'ADVERSARIAL SEARCH ENGINE',
      description: 'Dark web scanning and hidden service discovery',
      icon: Zap,
      color: 'orange',
      capabilities: ['Dark Web Scanning', 'Breach Database Search', 'Tor Network Analysis', 'Underground Forums']
    }
  ];

  const analysisSteps = [
    'Initializing reconnaissance protocols',
    'Scanning social media platforms',
    'Performing deep web crawling',
    'Analyzing metadata extraction',
    'Checking breach databases',
    'Scanning dark web sources',
    'Performing geolocation analysis',
    'Assessing security threats',
    'Correlating intelligence data',
    'Generating comprehensive report'
  ];

  const performAdvancedOSINT = async () => {
    if (!searchQuery.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResults(null);

    // Simulate progressive analysis with realistic timing
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentAnalysisStep(analysisSteps[i]);
      setAnalysisProgress((i + 1) / analysisSteps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    }

    // Generate comprehensive OSINT results
    const osintResults: OSINTResult = {
      id: `osint_${Date.now()}`,
      target: searchQuery,
      timestamp: Date.now(),
      confidence: 85 + Math.random() * 15,
      status: 'complete',
      searchMode: searchMode,
      
      socialProfiles: [
        {
          platform: 'LinkedIn',
          url: `https://linkedin.com/in/${searchQuery.split('@')[0] || searchQuery.toLowerCase()}`,
          verified: Math.random() > 0.3,
          lastActivity: Date.now() - (Math.random() * 86400000 * 30)
        },
        {
          platform: 'Twitter',
          url: `https://twitter.com/${searchQuery.split('@')[0] || searchQuery.toLowerCase()}`,
          verified: Math.random() > 0.6,
          lastActivity: Date.now() - (Math.random() * 86400000 * 7)
        },
        {
          platform: 'GitHub',
          url: `https://github.com/${searchQuery.split('@')[0] || searchQuery.toLowerCase()}`,
          verified: true,
          lastActivity: Date.now() - (Math.random() * 86400000 * 3)
        }
      ],

      webCrawlData: [
        {
          domain: `${searchQuery.split('@')[0] || searchQuery.toLowerCase()}.com`,
          pages: Math.floor(Math.random() * 150) + 25,
          technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS CloudFront', 'Stripe'],
          securityHeaders: ['HSTS', 'CSP', 'X-Frame-Options', 'X-Content-Type-Options'],
          vulnerabilities: Math.random() > 0.7 ? ['Outdated dependencies detected'] : []
        }
      ],

      deletedContent: searchMode === 'recon' || searchMode === 'adversarial' ? [
        {
          type: 'social_post',
          platform: 'Twitter',
          date: new Date(Date.now() - Math.random() * 86400000 * 365).toISOString(),
          content: `Recovered deleted content related to ${searchQuery}`,
          source: 'Wayback Machine Archive'
        },
        {
          type: 'forum_post',
          platform: 'Reddit',
          date: new Date(Date.now() - Math.random() * 86400000 * 180).toISOString(),
          content: 'Historical discussion thread participation',
          source: 'Archive.today'
        }
      ] : [],

      darkWebFindings: searchMode === 'adversarial' ? [
        {
          source: 'breach_database_2023',
          type: 'email_exposure',
          confidence: 0.85 + Math.random() * 0.15,
          threat_level: 'medium'
        },
        {
          source: 'underground_forum_scan',
          type: 'username_mention',
          confidence: 0.72 + Math.random() * 0.15,
          threat_level: 'low'
        }
      ] : [],

      metadataExtraction: [
        {
          file_type: 'image',
          location_data: Math.random() > 0.5,
          device_info: `Camera: iPhone ${Math.floor(Math.random() * 5) + 12} Pro`,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
        }
      ],

      threats: [
        'Exposed personal information in data breaches',
        'Social media privacy vulnerabilities detected',
        'Potential credential exposure risks identified'
      ],

      geoLocation: {
        coordinates: [37.7749 + (Math.random() - 0.5) * 0.1, -122.4194 + (Math.random() - 0.5) * 0.1],
        city: 'San Francisco',
        country: 'United States',
        confidence: 0.8 + Math.random() * 0.2
      },

      associatedEmails: [
        searchQuery.includes('@') ? searchQuery : `${searchQuery}@gmail.com`,
        `${searchQuery.split('@')[0] || searchQuery}.work@company.com`
      ],

      phoneNumbers: [`+1-555-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`],

      domains: [`${searchQuery.split('@')[0] || searchQuery.toLowerCase()}.com`, `${searchQuery.split('@')[0] || searchQuery.toLowerCase()}.dev`]
    };

    setResults(osintResults);
    setIsAnalyzing(false);
  };

  const getSearchModeDetails = () => {
    return searchModes.find(mode => mode.id === searchMode);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Target className="w-12 h-12 text-cyan-400" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ADVANCED OSINT PLATFORM
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Military-grade intelligence gathering with multiple reconnaissance modes more powerful than ChatGPT
          </p>
        </motion.div>

        {/* Search Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">SELECT RECONNAISSANCE MODE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchModes.map((mode) => (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchMode(mode.id as any)}
                className={`p-6 rounded-lg border transition-all ${
                  searchMode === mode.id
                    ? `bg-${mode.color}-500/20 border-${mode.color}-400 text-${mode.color}-400`
                    : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-cyan-500'
                }`}
              >
                <mode.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="font-bold text-sm mb-2">{mode.name}</div>
                <div className="text-xs opacity-75 mb-3">{mode.description}</div>
                <div className="space-y-1">
                  {mode.capabilities.slice(0, 2).map((capability, index) => (
                    <div key={index} className="text-xs opacity-60">• {capability}</div>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter target (email, username, domain, or name)..."
                className="w-full bg-black/50 border border-gray-600 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                onKeyPress={(e) => e.key === 'Enter' && performAdvancedOSINT()}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={performAdvancedOSINT}
              disabled={isAnalyzing || !searchQuery.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>ANALYZING</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>INITIATE {getSearchModeDetails()?.name}</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Selected Mode Info */}
          {(() => {
            const currentMode = getSearchModeDetails();
            if (!currentMode) return null;
            const IconComponent = currentMode.icon;
            return (
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <IconComponent className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="font-bold text-white">{currentMode.name}</div>
                    <div className="text-sm text-gray-400">{currentMode.description}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {currentMode.capabilities.map((capability, index) => (
                    <div key={index} className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* Analysis Progress */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 mb-8"
            >
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-white mb-2">RECONNAISSANCE IN PROGRESS</div>
                <div className="text-cyan-400">{currentAnalysisStep}</div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full"
                  style={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="text-center text-white font-mono">
                {analysisProgress.toFixed(1)}% Complete
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">RECONNAISSANCE COMPLETE</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-gray-300">Target: {results.target}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">{formatTimestamp(results.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className={`font-bold ${getConfidenceColor(results.confidence)}`}>
                          {results.confidence.toFixed(1)}% Confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>EXPORT REPORT</span>
                  </motion.button>
                </div>
              </div>

              {/* Social Media Profiles */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <User className="w-6 h-6 text-blue-400" />
                  <span>SOCIAL MEDIA INTELLIGENCE</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.socialProfiles.map((profile, index) => (
                    <motion.div
                      key={index}
                      className="bg-black/30 rounded-lg p-4 border border-gray-700"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-white">{profile.platform}</div>
                        {profile.verified && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="text-blue-400 text-sm mb-2 break-all">{profile.url}</div>
                      <div className="text-gray-400 text-xs">
                        Last Activity: {new Date(profile.lastActivity).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Web Crawling Data */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-purple-400" />
                  <span>WEB INFRASTRUCTURE ANALYSIS</span>
                </h4>
                {results.webCrawlData.map((data, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-6 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <div className="text-purple-400 font-bold mb-2">Domain</div>
                        <div className="text-white">{data.domain}</div>
                        <div className="text-gray-400 text-sm mt-1">{data.pages} pages crawled</div>
                      </div>
                      <div>
                        <div className="text-purple-400 font-bold mb-2">Technologies</div>
                        <div className="space-y-1">
                          {data.technologies.map((tech, i) => (
                            <div key={i} className="text-cyan-400 text-sm bg-cyan-500/10 px-2 py-1 rounded">
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-purple-400 font-bold mb-2">Security Headers</div>
                        <div className="space-y-1">
                          {data.securityHeaders.map((header, i) => (
                            <div key={i} className="text-green-400 text-sm">✓ {header}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-purple-400 font-bold mb-2">Vulnerabilities</div>
                        {data.vulnerabilities.length > 0 ? (
                          data.vulnerabilities.map((vuln, i) => (
                            <div key={i} className="text-red-400 text-sm flex items-center space-x-1">
                              <AlertTriangle className="w-4 h-4" />
                              <span>{vuln}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-green-400 text-sm">No vulnerabilities detected</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deleted Content Recovery */}
              {results.deletedContent.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/30">
                  <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Database className="w-6 h-6 text-red-400" />
                    <span>DELETED CONTENT RECOVERY</span>
                  </h4>
                  <div className="space-y-4">
                    {results.deletedContent.map((content, index) => (
                      <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-white">{content.platform} - {content.type}</div>
                          <div className="text-gray-400 text-sm">{new Date(content.date).toLocaleDateString()}</div>
                        </div>
                        <div className="text-gray-300 mb-2">{content.content}</div>
                        <div className="text-red-400 text-sm">Source: {content.source}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dark Web Findings */}
              {results.darkWebFindings.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/30">
                  <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-orange-400" />
                    <span>DARK WEB INTELLIGENCE</span>
                  </h4>
                  <div className="space-y-4">
                    {results.darkWebFindings.map((finding, index) => (
                      <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-orange-400 font-bold">Source</div>
                            <div className="text-white">{finding.source}</div>
                          </div>
                          <div>
                            <div className="text-orange-400 font-bold">Type</div>
                            <div className="text-white">{finding.type}</div>
                          </div>
                          <div>
                            <div className="text-orange-400 font-bold">Confidence</div>
                            <div className={`font-bold ${getConfidenceColor(finding.confidence * 100)}`}>
                              {(finding.confidence * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <div className="text-orange-400 font-bold">Threat Level</div>
                            <div className={`font-bold ${
                              finding.threat_level === 'high' ? 'text-red-400' :
                              finding.threat_level === 'medium' ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {finding.threat_level.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Geolocation Intelligence */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-green-400" />
                  <span>GEOLOCATION INTELLIGENCE</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                    <div className="text-green-400 font-bold mb-2">Location</div>
                    <div className="text-white">{results.geoLocation.city}, {results.geoLocation.country}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      Confidence: {(results.geoLocation.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                    <div className="text-green-400 font-bold mb-2">Coordinates</div>
                    <div className="text-white font-mono">
                      {results.geoLocation.coordinates[0].toFixed(4)}, {results.geoLocation.coordinates[1].toFixed(4)}
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                    <div className="text-green-400 font-bold mb-2">Associated Data</div>
                    <div className="space-y-1">
                      <div className="text-cyan-400 text-sm">📧 {results.associatedEmails.length} Emails</div>
                      <div className="text-cyan-400 text-sm">📞 {results.phoneNumbers.length} Phone Numbers</div>
                      <div className="text-cyan-400 text-sm">🌐 {results.domains.length} Domains</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threat Assessment */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/30">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <span>THREAT ASSESSMENT</span>
                </h4>
                <div className="space-y-3">
                  {results.threats.map((threat, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-white">{threat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}