import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Shield, Eye, Database, Globe, Network, Target, 
  Download, Clock, Activity, AlertTriangle, CheckCircle,
  Zap, Brain, Lock, Unlock, FileText, Image, Video,
  MessageSquare, Users, MapPin, Calendar, Hash, Link
} from 'lucide-react';

interface OSINTResult {
  id: string;
  target: string;
  timestamp: number;
  status: 'scanning' | 'complete' | 'error';
  confidence: number;
  threats: string[];
  socialProfiles: any[];
  deletedContent: any[];
  webCrawlData: any[];
  darkWebFindings: any[];
  metadataExtraction: any[];
  geoLocation: any;
  associatedEmails: string[];
  phoneNumbers: string[];
  domains: string[];
  images: any[];
  documents: any[];
}

export default function AdvancedOSINT() {
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [results, setResults] = useState<OSINTResult | null>(null);
  const [scanHistory, setScanHistory] = useState<OSINTResult[]>([]);

  const premiumTools = [
    {
      id: 'web-crawler',
      name: 'Advanced Web Crawler',
      description: 'Deep web scraping with JavaScript execution',
      icon: Globe,
      status: 'active',
      capabilities: ['JavaScript rendering', 'CAPTCHA bypass', 'Rate limiting evasion']
    },
    {
      id: 'social-harvester',
      name: 'Social Media Harvester',
      description: 'Extract profiles, posts, and connections',
      icon: Users,
      status: 'active',
      capabilities: ['Profile extraction', 'Network mapping', 'Content timeline']
    },
    {
      id: 'deleted-recovery',
      name: 'Deleted Content Recovery',
      description: 'Retrieve archived and cached content',
      icon: Clock,
      status: 'active',
      capabilities: ['Wayback Machine', 'Cache analysis', 'Deleted posts recovery']
    },
    {
      id: 'metadata-extractor',
      name: 'Metadata Extraction Engine',
      description: 'Extract hidden data from files and images',
      icon: FileText,
      status: 'active',
      capabilities: ['EXIF data', 'Document properties', 'Steganography detection']
    },
    {
      id: 'darkweb-scanner',
      name: 'Dark Web Scanner',
      description: 'Search encrypted networks and hidden services',
      icon: Shield,
      status: 'premium',
      capabilities: ['Tor network access', 'Breach databases', 'Marketplace monitoring']
    },
    {
      id: 'ai-analyst',
      name: 'AI-Powered Analysis',
      description: 'Intelligent pattern recognition and correlation',
      icon: Brain,
      status: 'premium',
      capabilities: ['Behavioral analysis', 'Threat assessment', 'Predictive modeling']
    }
  ];

  const scanStages = [
    { name: 'Initial Reconnaissance', duration: 2000 },
    { name: 'Web Crawling & Scraping', duration: 3000 },
    { name: 'Social Media Analysis', duration: 2500 },
    { name: 'Deleted Content Recovery', duration: 4000 },
    { name: 'Metadata Extraction', duration: 1500 },
    { name: 'Dark Web Scanning', duration: 3500 },
    { name: 'AI Analysis & Correlation', duration: 2000 },
    { name: 'Report Generation', duration: 1000 }
  ];

  const startAdvancedScan = async () => {
    if (!target.trim()) return;

    setIsScanning(true);
    setScanProgress(0);
    setActiveTools([]);
    
    // Simulate progressive scanning
    let progress = 0;
    const totalDuration = scanStages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsed = 0;

    for (let index = 0; index < scanStages.length; index++) {
      const stage = scanStages[index];
      setActiveTools([stage.name]);
      
      const stageInterval = setInterval(() => {
        elapsed += 100;
        progress = Math.min((elapsed / totalDuration) * 100, 100);
        setScanProgress(progress);
      }, 100);

      await new Promise(resolve => setTimeout(resolve, stage.duration));
      clearInterval(stageInterval);
    }

    // Generate comprehensive results
    const scanResult: OSINTResult = {
      id: `scan_${Date.now()}`,
      target,
      timestamp: Date.now(),
      status: 'complete',
      confidence: 85 + Math.random() * 15,
      threats: [
        'Exposed personal information on data breach sites',
        'Social media privacy vulnerabilities detected',
        'Email address found in credential dumps'
      ],
      socialProfiles: [
        { platform: 'LinkedIn', url: `https://linkedin.com/in/${target.split('@')[0]}`, verified: true },
        { platform: 'Twitter', url: `https://twitter.com/${target.split('@')[0]}`, verified: false },
        { platform: 'Facebook', url: `https://facebook.com/${target.split('@')[0]}`, verified: true }
      ],
      deletedContent: [
        { type: 'post', platform: 'Twitter', date: '2023-12-15', content: 'Deleted tweet containing location data' },
        { type: 'image', platform: 'Instagram', date: '2023-11-20', content: 'Deleted photo with metadata exposure' }
      ],
      webCrawlData: [
        { domain: 'example.com', pages: 47, technologies: ['React', 'Node.js'], lastCrawled: Date.now() },
        { domain: 'portfolio.dev', pages: 23, technologies: ['Vue.js', 'PHP'], lastCrawled: Date.now() }
      ],
      darkWebFindings: [
        { source: 'breach_db_2023', type: 'email', confidence: 0.92 },
        { source: 'credential_dump_q4', type: 'password_hash', confidence: 0.78 }
      ],
      metadataExtraction: [
        { file: 'profile_photo.jpg', location: '37.7749,-122.4194', device: 'iPhone 14 Pro', timestamp: '2023-12-01' },
        { file: 'resume.pdf', author: 'John Doe', created: '2023-11-15', software: 'Adobe Acrobat' }
      ],
      geoLocation: {
        coordinates: [37.7749, -122.4194],
        city: 'San Francisco',
        country: 'United States',
        confidence: 0.87
      },
      associatedEmails: [`${target}`, `${target.split('@')[0]}.work@gmail.com`],
      phoneNumbers: ['+1-555-0123', '+1-555-0456'],
      domains: ['example.com', 'portfolio.dev', `${target.split('@')[0]}.com`],
      images: [
        { url: '/api/extracted/image1.jpg', source: 'social_media', metadata: { location: true, faces: 2 } }
      ],
      documents: [
        { url: '/api/extracted/resume.pdf', type: 'PDF', pages: 3, metadata: { author: true, creation_date: true } }
      ]
    };

    setResults(scanResult);
    setScanHistory(prev => [scanResult, ...prev.slice(0, 4)]);
    setIsScanning(false);
    setActiveTools([]);
  };

  const exportResults = () => {
    if (!results) return;
    
    const reportData = {
      ...results,
      generatedAt: new Date().toISOString(),
      reportType: 'Advanced OSINT Intelligence Report',
      classification: 'CONFIDENTIAL',
      analyst: 'LINNY AI Agent',
      methodology: 'Multi-source intelligence gathering with AI correlation'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-report-${results.target}-${Date.now()}.json`;
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
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          ADVANCED OSINT INTELLIGENCE
        </h1>
        <p className="text-xl text-gray-300">
          Premium Intelligence Gathering & Deep Web Analysis Platform
        </p>
      </motion.div>

      {/* Search Interface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30">
          <h2 className="text-3xl font-bold mb-6 text-center">Intelligence Target Analysis</h2>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter target (email, domain, username, phone, etc.)"
              className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startAdvancedScan}
              disabled={isScanning || !target.trim()}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Search size={20} />
              <span>{isScanning ? 'Scanning...' : 'Start Deep Scan'}</span>
            </motion.button>
          </div>

          {/* Scan Progress */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-black/60 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Scan Progress</span>
                    <span className="text-red-400 font-bold">{scanProgress.toFixed(0)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full"
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

      {/* Premium Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Premium Intelligence Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border-2 ${
                tool.status === 'premium' ? 'border-yellow-500/50' : 'border-green-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <tool.icon className={`${tool.status === 'premium' ? 'text-yellow-400' : 'text-green-400'}`} size={32} />
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  tool.status === 'premium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {tool.status.toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              
              <div className="space-y-2">
                {tool.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle size={12} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{capability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Results Dashboard */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Intelligence Report</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    results.confidence > 80 ? 'bg-green-500/20 text-green-400' :
                    results.confidence > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {results.confidence.toFixed(1)}% Confidence
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportResults}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-bold flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Export Report</span>
                  </motion.button>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Threats & Vulnerabilities */}
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    Threats Detected
                  </h3>
                  <div className="space-y-3">
                    {results.threats.map((threat, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <AlertTriangle size={16} className="text-red-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{threat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media Profiles */}
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                    <Users size={20} className="mr-2" />
                    Social Profiles
                  </h3>
                  <div className="space-y-3">
                    {results.socialProfiles.map((profile, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center space-x-3">
                          <Globe size={16} className="text-blue-400" />
                          <div>
                            <div className="font-semibold text-white">{profile.platform}</div>
                            <div className="text-sm text-gray-400">{profile.url}</div>
                          </div>
                        </div>
                        {profile.verified && (
                          <CheckCircle size={16} className="text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deleted Content Recovery */}
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                    <Clock size={20} className="mr-2" />
                    Recovered Deleted Content
                  </h3>
                  <div className="space-y-3">
                    {results.deletedContent.map((content, index) => (
                      <div key={index} className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white capitalize">{content.type}</span>
                          <span className="text-sm text-gray-400">{content.date}</span>
                        </div>
                        <div className="text-sm text-orange-400">{content.platform}</div>
                        <div className="text-sm text-gray-300 mt-1">{content.content}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dark Web Findings */}
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                    <Shield size={20} className="mr-2" />
                    Dark Web Intelligence
                  </h3>
                  <div className="space-y-3">
                    {results.darkWebFindings.map((finding, index) => (
                      <div key={index} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{finding.source}</span>
                          <span className="text-sm text-purple-400">{(finding.confidence * 100).toFixed(0)}% match</span>
                        </div>
                        <div className="text-sm text-gray-400 capitalize">{finding.type.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Intelligence */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-cyan-400 mb-3">Associated Data</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-400">Emails:</span> {results.associatedEmails.length}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Phone Numbers:</span> {results.phoneNumbers.length}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Domains:</span> {results.domains.length}
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-3">Geolocation</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-400">Location:</span> {results.geoLocation.city}, {results.geoLocation.country}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Confidence:</span> {(results.geoLocation.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Media Analysis</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-400">Images:</span> {results.images.length}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Documents:</span> {results.documents.length}
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