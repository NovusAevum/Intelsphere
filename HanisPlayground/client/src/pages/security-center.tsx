import { useState, useEffect } from "react";
import { Shield, Eye, AlertTriangle, Lock, Activity, Server, Globe, Zap } from "lucide-react";

export default function SecurityCenter() {
  const [securityMetrics, setSecurityMetrics] = useState({
    threatLevel: "LOW",
    activeThreats: 0,
    blockedAttacks: 0,
    systemIntegrity: 99.7,
    encryptionStatus: "AES-256",
    lastScan: "2 minutes ago"
  });

  const [osintData, setOsintData] = useState([
    { source: "Dark Web Monitoring", status: "ACTIVE", findings: 0, lastUpdate: "1m ago" },
    { source: "Social Media Intel", status: "SCANNING", findings: 3, lastUpdate: "5m ago" },
    { source: "DNS Reconnaissance", status: "COMPLETE", findings: 12, lastUpdate: "15m ago" },
    { source: "Threat Intelligence", status: "ACTIVE", findings: 7, lastUpdate: "3m ago" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        systemIntegrity: Math.max(99, Math.min(100, prev.systemIntegrity + (Math.random() - 0.5) * 0.2))
      }));

      setOsintData(prev => prev.map(source => ({
        ...source,
        findings: source.status === "ACTIVE" ? source.findings + Math.floor(Math.random() * 2) : source.findings
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const securityModules = [
    {
      icon: Shield,
      title: "THREAT DETECTION",
      description: "Real-time threat monitoring and automated response systems",
      metrics: ["99.9% Detection Rate", "< 1ms Response Time", "AI-Powered Analysis"],
      color: "text-red-400"
    },
    {
      icon: Eye,
      title: "OSINT OPERATIONS",
      description: "Open source intelligence gathering and reconnaissance",
      metrics: ["24/7 Monitoring", "Global Coverage", "Deep Web Scanning"],
      color: "text-cyan-400"
    },
    {
      icon: Lock,
      title: "ENCRYPTION CORE",
      description: "Advanced cryptographic protection and key management",
      metrics: ["256-bit AES", "Quantum Resistant", "Zero-Knowledge"],
      color: "text-purple-400"
    },
    {
      icon: Activity,
      title: "INCIDENT RESPONSE",
      description: "Automated incident detection and response protocols",
      metrics: ["Auto-Containment", "Real-time Alerts", "Forensic Analysis"],
      color: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-mono">
            SECURITY CENTER
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Advanced cybersecurity operations with OSINT intelligence and automated threat response
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <span className={`text-2xl font-bold font-mono ${
                securityMetrics.threatLevel === "LOW" ? "text-green-400" :
                securityMetrics.threatLevel === "MEDIUM" ? "text-yellow-400" : "text-red-400"
              }`}>
                {securityMetrics.threatLevel}
              </span>
            </div>
            <div className="text-sm text-gray-400 font-mono">THREAT LEVEL</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-cyan-400 font-mono">{securityMetrics.blockedAttacks}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">BLOCKED ATTACKS</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Lock className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400 font-mono">{securityMetrics.systemIntegrity.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">SYSTEM INTEGRITY</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400 font-mono">ACTIVE</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">MONITORING STATUS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">OSINT OPERATIONS</h3>
            <div className="space-y-4">
              {osintData.map((source, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-white font-mono">{source.source}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      source.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                      source.status === 'SCANNING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {source.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Findings:</span>
                      <div className="text-cyan-400 font-mono">{source.findings}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Update:</span>
                      <div className="text-gray-300 font-mono">{source.lastUpdate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-red-400 mb-6 font-mono">THREAT INTELLIGENCE</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-red-400 font-mono">Critical Alerts</span>
                  <span className="text-2xl font-bold text-red-400 font-mono">0</span>
                </div>
                <div className="text-xs text-gray-400">All systems secure</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-400 font-mono">Suspicious Activity</span>
                  <span className="text-2xl font-bold text-yellow-400 font-mono">3</span>
                </div>
                <div className="text-xs text-gray-400">Under investigation</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-400 font-mono">Resolved Incidents</span>
                  <span className="text-2xl font-bold text-green-400 font-mono">247</span>
                </div>
                <div className="text-xs text-gray-400">This month</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-400 font-mono">Threat Sources</span>
                  <span className="text-2xl font-bold text-purple-400 font-mono">12</span>
                </div>
                <div className="text-xs text-gray-400">Active monitoring</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {securityModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-red-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <Icon className={`w-12 h-12 ${module.color} mr-4`} />
                  <div>
                    <h4 className={`text-xl font-bold ${module.color} font-mono`}>{module.title}</h4>
                    <p className="text-gray-400 text-sm">{module.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {module.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-red-400 mb-4 font-mono flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              SECURITY POSTURE
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Firewall Status:</span>
                <span className="text-green-400 font-mono">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Intrusion Detection:</span>
                <span className="text-green-400 font-mono">ENABLED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vulnerability Scan:</span>
                <span className="text-green-400 font-mono">CLEAN</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-cyan-400 mb-4 font-mono flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              GLOBAL INTELLIGENCE
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Sources Active:</span>
                <span className="text-cyan-400 font-mono">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data Points:</span>
                <span className="text-cyan-400 font-mono">2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Coverage:</span>
                <span className="text-cyan-400 font-mono">Global</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              RESPONSE TIME
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Detection:</span>
                <span className="text-purple-400 font-mono">&lt; 1ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Analysis:</span>
                <span className="text-purple-400 font-mono">&lt; 5ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Response:</span>
                <span className="text-purple-400 font-mono">&lt; 10ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}