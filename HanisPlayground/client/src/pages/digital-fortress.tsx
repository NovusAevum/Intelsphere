import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Eye, Scan, Zap, Globe, Server, Database,
  AlertTriangle, CheckCircle, XCircle, Activity, Cpu,
  Network, FileSearch, Bug, Crosshair, Radar, Satellite
} from 'lucide-react';
import Advanced3DBackground from '../components/advanced-3d-background';
import EnhancedNavigation from '../components/enhanced-navigation';

export default function DigitalFortress() {
  const [currentSection, setCurrentSection] = useState('digital-fortress');
  const [securityLevel, setSecurityLevel] = useState('DEFCON 2');
  const [activeThreats, setActiveThreats] = useState(3);
  const [scanningMode, setScanningMode] = useState(false);
  const [osintData, setOsintData] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    firewall: 'ACTIVE',
    intrusion: 'MONITORING',
    encryption: 'AES-256',
    vpn: 'CONNECTED',
    darkweb: 'SCANNING',
    honeypots: 'DEPLOYED'
  });

  const securityTools = [
    {
      name: 'QUANTUM FIREWALL',
      status: 'ACTIVE',
      protection: '99.97%',
      description: 'Quantum-encrypted barrier protecting all network ingress points',
      threats_blocked: 14726,
      last_update: '2 seconds ago'
    },
    {
      name: 'NEURAL INTRUSION DETECTION',
      status: 'LEARNING',
      protection: '94.3%',
      description: 'AI-powered behavioral analysis detecting anomalous network patterns',
      threats_blocked: 8934,
      last_update: '5 seconds ago'
    },
    {
      name: 'DARK WEB INTELLIGENCE',
      status: 'MONITORING',
      protection: '87.1%',
      description: 'Deep web crawling for threat intelligence and credential monitoring',
      threats_blocked: 2156,
      last_update: '12 seconds ago'
    },
    {
      name: 'HONEYPOT NETWORK',
      status: 'DEPLOYED',
      protection: '78.9%',
      description: 'Decoy systems attracting and analyzing attacker methodologies',
      threats_blocked: 5892,
      last_update: '8 seconds ago'
    }
  ];

  const osintSources = [
    {
      source: 'SOCIAL MEDIA INTELLIGENCE',
      category: 'HUMINT',
      confidence: 89,
      findings: 127,
      threat_level: 'MEDIUM',
      last_scan: '3 minutes ago',
      status: 'ACTIVE'
    },
    {
      source: 'DOMAIN RECONNAISSANCE',
      category: 'TECHINT',
      confidence: 94,
      findings: 45,
      threat_level: 'LOW',
      last_scan: '1 minute ago',
      status: 'COMPLETE'
    },
    {
      source: 'SATELLITE IMAGERY',
      category: 'GEOINT',
      confidence: 76,
      findings: 8,
      threat_level: 'HIGH',
      last_scan: '15 minutes ago',
      status: 'PROCESSING'
    },
    {
      source: 'NETWORK TOPOLOGY',
      category: 'SIGINT',
      confidence: 92,
      findings: 234,
      threat_level: 'MEDIUM',
      last_scan: '7 minutes ago',
      status: 'ACTIVE'
    }
  ];

  const recentThreats = [
    {
      id: 'THR-001',
      type: 'Advanced Persistent Threat',
      severity: 'CRITICAL',
      source: '185.220.101.42',
      target: 'Database Cluster',
      action: 'BLOCKED',
      timestamp: '2024-01-15 23:47:32'
    },
    {
      id: 'THR-002',
      type: 'SQL Injection Attempt',
      severity: 'HIGH',
      source: '94.142.241.111',
      target: 'API Gateway',
      action: 'QUARANTINED',
      timestamp: '2024-01-15 23:45:18'
    },
    {
      id: 'THR-003',
      type: 'Brute Force Attack',
      severity: 'MEDIUM',
      source: '162.55.173.89',
      target: 'SSH Services',
      action: 'RATE LIMITED',
      timestamp: '2024-01-15 23:43:07'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time security updates
      setActiveThreats(prev => Math.max(0, prev + Math.floor(Math.random() * 3 - 1)));
      
      // Update OSINT data
      setOsintData(osintSources.map(source => ({
        ...source,
        findings: source.findings + Math.floor(Math.random() * 5),
        confidence: Math.max(70, Math.min(99, source.confidence + (Math.random() - 0.5) * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startDeepScan = () => {
    setScanningMode(true);
    setTimeout(() => setScanningMode(false), 10000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Advanced3DBackground />
      
      <EnhancedNavigation 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <div className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ 
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center"
            >
              <Shield size={64} className="text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight font-primary">
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                DIGITAL
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-accent">
              FORTRESS
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-modern">
              Advanced cybersecurity operations center featuring quantum encryption, 
              neural threat detection, and comprehensive OSINT capabilities
            </p>

            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{securityLevel}</div>
                <div className="text-gray-400 text-sm">Security Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{activeThreats}</div>
                <div className="text-gray-400 text-sm">Active Threats</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99.7%</div>
                <div className="text-gray-400 text-sm">Protection Rate</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startDeepScan}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 mx-auto"
            >
              {scanningMode ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Radar size={24} />
                </motion.div>
              ) : (
                <Scan size={24} />
              )}
              <span>{scanningMode ? 'Deep Scanning...' : 'Initiate Deep Scan'}</span>
            </motion.button>
          </motion.div>

          {/* Security Tools Grid */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12 font-accent">SECURITY ARSENAL</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white font-mono">{tool.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      tool.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                      tool.status === 'LEARNING' ? 'bg-blue-500/20 text-blue-400' :
                      tool.status === 'MONITORING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {tool.status}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm">{tool.description}</p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">{tool.protection}</div>
                      <div className="text-gray-400 text-xs">Protection</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">{tool.threats_blocked.toLocaleString()}</div>
                      <div className="text-gray-400 text-xs">Blocked</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{tool.last_update}</div>
                      <div className="text-gray-400 text-xs">Updated</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* OSINT Dashboard */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12 font-accent">OSINT OPERATIONS</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {osintSources.map((source, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white font-mono">{source.source}</h4>
                      <p className="text-blue-400 text-sm">{source.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {source.status === 'ACTIVE' && <Activity className="text-green-400" size={20} />}
                      {source.status === 'COMPLETE' && <CheckCircle className="text-blue-400" size={20} />}
                      {source.status === 'PROCESSING' && <Cpu className="text-yellow-400" size={20} />}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">{source.confidence}%</div>
                      <div className="text-gray-400 text-xs">Confidence</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{source.findings}</div>
                      <div className="text-gray-400 text-xs">Findings</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      source.threat_level === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                      source.threat_level === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {source.threat_level} RISK
                    </div>
                    <div className="text-gray-400 text-xs">{source.last_scan}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Threat Log */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12 font-accent">THREAT INTELLIGENCE</h3>
            
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-600/50 overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white">Recent Security Events</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm font-bold">LIVE MONITORING</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-700/50">
                {recentThreats.map((threat, index) => (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-gray-800/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          threat.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                          threat.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {threat.severity}
                        </div>
                        <span className="text-white font-mono text-sm">{threat.id}</span>
                        <span className="text-gray-300">{threat.type}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        threat.action === 'BLOCKED' ? 'bg-red-500/20 text-red-400' :
                        threat.action === 'QUARANTINED' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {threat.action}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Source: </span>
                        <span className="text-cyan-400 font-mono">{threat.source}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Target: </span>
                        <span className="text-purple-400">{threat.target}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time: </span>
                        <span className="text-gray-300">{threat.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Command Center */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-xl rounded-3xl p-12 border border-red-500/30"
          >
            <h3 className="text-4xl font-bold text-white mb-6 font-accent">SECURITY COMMAND CENTER</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Advanced threat detection and response capabilities protecting critical infrastructure 
              through quantum-enhanced security protocols and AI-driven threat intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg"
              >
                Access Security Console
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-red-400 text-red-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-400 hover:text-black transition-all"
              >
                Generate Threat Report
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}