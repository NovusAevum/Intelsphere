import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Globe, Activity, AlertTriangle, Target, Eye, Database, Zap, Download, Search, Filter } from 'lucide-react';

interface ReconData {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  category: 'network' | 'social' | 'infrastructure' | 'threat' | 'osint';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  data: any;
  geolocation?: { lat: number; lng: number; country: string; };
  connections?: string[];
}

interface NetworkNode {
  id: string;
  label: string;
  type: 'target' | 'asset' | 'threat' | 'neutral';
  x: number;
  y: number;
  connections: string[];
  data: any;
}

export default function ReconnaissanceVisualization() {
  const [reconData, setReconData] = useState<ReconData[]>([]);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [activeTab, setActiveTab] = useState<'network' | 'timeline' | 'geospatial' | 'threats'>('network');
  const [isCollecting, setIsCollecting] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    severity: 'all',
    timeRange: '24h'
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Initialize with sample reconnaissance data
  useEffect(() => {
    generateReconData();
    generateNetworkTopology();
  }, []);

  const generateReconData = () => {
    const categories: ReconData['category'][] = ['network', 'social', 'infrastructure', 'threat', 'osint'];
    const severities: ReconData['severity'][] = ['low', 'medium', 'high', 'critical'];
    const sources = ['Shodan', 'Maltego', 'SpiderFoot', 'TheHarvester', 'Social Media', 'DNS Records', 'SSL Certificates'];
    
    const data: ReconData[] = [];
    
    for (let i = 0; i < 50; i++) {
      data.push({
        id: `recon_${i}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        target: `target-${Math.floor(Math.random() * 10) + 1}.example.com`,
        category: categories[Math.floor(Math.random() * categories.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        confidence: 60 + Math.random() * 40,
        data: {
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          port: Math.floor(Math.random() * 65535),
          service: ['HTTP', 'HTTPS', 'SSH', 'FTP', 'SMTP'][Math.floor(Math.random() * 5)],
          vulnerability: Math.random() > 0.7
        },
        geolocation: {
          lat: -90 + Math.random() * 180,
          lng: -180 + Math.random() * 360,
          country: ['US', 'RU', 'CN', 'DE', 'FR', 'UK', 'JP'][Math.floor(Math.random() * 7)]
        },
        connections: Array.from({length: Math.floor(Math.random() * 5)}, () => `conn_${Math.floor(Math.random() * 20)}`)
      });
    }
    
    setReconData(data);
  };

  const generateNetworkTopology = () => {
    const nodes: NetworkNode[] = [];
    const nodeTypes: NetworkNode['type'][] = ['target', 'asset', 'threat', 'neutral'];
    
    // Generate central target node
    nodes.push({
      id: 'central_target',
      label: 'Primary Target',
      type: 'target',
      x: 400,
      y: 300,
      connections: [],
      data: { importance: 'high', services: ['web', 'mail', 'dns'] }
    });

    // Generate connected nodes
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * 2 * Math.PI;
      const radius = 150 + Math.random() * 100;
      nodes.push({
        id: `node_${i}`,
        label: `Asset ${i + 1}`,
        type: nodeTypes[Math.floor(Math.random() * nodeTypes.length)],
        x: 400 + Math.cos(angle) * radius,
        y: 300 + Math.sin(angle) * radius,
        connections: Math.random() > 0.5 ? ['central_target'] : [],
        data: {
          ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          risk_score: Math.floor(Math.random() * 100)
        }
      });
    }

    setNetworkNodes(nodes);
  };

  // Network visualization canvas drawing
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(100, 255, 218, 0.3)';
      ctx.lineWidth = 2;
      
      networkNodes.forEach(node => {
        node.connections.forEach(connId => {
          const connectedNode = networkNodes.find(n => n.id === connId);
          if (connectedNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      networkNodes.forEach(node => {
        const nodeColor = {
          target: '#ff4444',
          asset: '#44ff44',
          threat: '#ffaa44',
          neutral: '#4444ff'
        }[node.type];

        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, selectedNode?.id === node.id ? 12 : 8, 0, 2 * Math.PI);
        ctx.fill();

        // Draw pulsing effect for selected node
        if (selectedNode?.id === node.id) {
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 16 + Math.sin(Date.now() * 0.01) * 4, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Draw labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 15);
      });

      animationRef.current = requestAnimationFrame(drawNetwork);
    };

    drawNetwork();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [networkNodes, selectedNode]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedNode = networkNodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= 12;
    });

    setSelectedNode(clickedNode || null);
  };

  const filteredData = reconData.filter(item => {
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.severity !== 'all' && item.severity !== filters.severity) return false;
    
    const timeMs = {
      '1h': 3600000,
      '24h': 86400000,
      '7d': 604800000,
      '30d': 2592000000
    }[filters.timeRange] || 86400000;
    
    const itemTime = new Date(item.timestamp).getTime();
    const cutoff = Date.now() - timeMs;
    
    return itemTime >= cutoff;
  });

  const severityStats = reconData.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryStats = reconData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              RECONNAISSANCE
            </span>
            <span className="text-white ml-4">VISUALIZATION</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced data visualization and network topology mapping for comprehensive intelligence analysis
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsCollecting(!isCollecting);
                  if (!isCollecting) {
                    setTimeout(() => {
                      generateReconData();
                      setIsCollecting(false);
                    }, 3000);
                  }
                }}
                className={`px-6 py-3 rounded-lg font-bold flex items-center space-x-2 ${
                  isCollecting 
                    ? 'bg-red-500 hover:bg-red-400 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white'
                }`}
              >
                {isCollecting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Activity size={20} />
                    </motion.div>
                    <span>Collecting...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Start Collection</span>
                  </>
                )}
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  const reportData = `
RECONNAISSANCE VISUALIZATION REPORT
Generated: ${new Date().toISOString()}

SUMMARY STATISTICS:
- Total Data Points: ${reconData.length}
- Network Nodes: ${networkNodes.length}
- Active Threats: ${severityStats.critical || 0} critical, ${severityStats.high || 0} high

SEVERITY BREAKDOWN:
- Critical: ${severityStats.critical || 0}
- High: ${severityStats.high || 0}
- Medium: ${severityStats.medium || 0}
- Low: ${severityStats.low || 0}

CATEGORY DISTRIBUTION:
${Object.entries(categoryStats).map(([cat, count]) => `- ${cat}: ${count}`).join('\n')}

FILTERED RESULTS (${filteredData.length} items):
${filteredData.slice(0, 10).map(item => 
  `[${new Date(item.timestamp).toISOString()}] ${item.source} -> ${item.target} (${item.severity.toUpperCase()})`
).join('\n')}

NETWORK TOPOLOGY:
- Central Target: ${networkNodes.find(n => n.type === 'target')?.label || 'Unknown'}
- Connected Assets: ${networkNodes.filter(n => n.connections.length > 0).length}
- Isolated Nodes: ${networkNodes.filter(n => n.connections.length === 0).length}
                  `;
                  const blob = new Blob([reportData], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `recon-visualization-report-${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Export Report</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="bg-black/60 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="network">Network</option>
                <option value="social">Social</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="threat">Threat</option>
                <option value="osint">OSINT</option>
              </select>

              <select
                value={filters.severity}
                onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                className="bg-black/60 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={filters.timeRange}
                onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
                className="bg-black/60 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {[
            { id: 'network', label: 'Network Topology', icon: Network },
            { id: 'timeline', label: 'Timeline Analysis', icon: Activity },
            { id: 'geospatial', label: 'Geospatial View', icon: Globe },
            { id: 'threats', label: 'Threat Dashboard', icon: Shield }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 mx-2 mb-2 rounded-lg font-bold flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Visualization Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualization Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
            >
              {activeTab === 'network' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-center">Network Topology</h3>
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    className="w-full h-96 border border-gray-600 rounded-lg cursor-crosshair bg-black/60"
                  />
                  <div className="mt-4 flex justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Target</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Asset</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Threat</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Neutral</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-center">Timeline Analysis</h3>
                  <div className="h-96 overflow-y-auto space-y-3">
                    {filteredData.slice(0, 20).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-black/40 rounded-lg p-4 border-l-4 border-cyan-400"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-cyan-400 font-semibold">{item.source}</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            item.severity === 'critical' ? 'bg-red-500 text-white' :
                            item.severity === 'high' ? 'bg-orange-500 text-white' :
                            item.severity === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-green-500 text-white'
                          }`}>
                            {item.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">
                          <div>Target: {item.target}</div>
                          <div>Category: {item.category}</div>
                          <div>Confidence: {item.confidence.toFixed(1)}%</div>
                          <div>Time: {new Date(item.timestamp).toLocaleString()}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'geospatial' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-center">Geospatial Intelligence</h3>
                  <div className="h-96 bg-black/60 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Globe size={64} className="text-cyan-400 mx-auto mb-4" />
                      <div className="text-xl font-bold mb-2">Global Threat Distribution</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(
                          filteredData.reduce((acc, item) => {
                            const country = item.geolocation?.country || 'Unknown';
                            acc[country] = (acc[country] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).slice(0, 8).map(([country, count]) => (
                          <div key={country} className="bg-gray-800 rounded px-3 py-2">
                            <div className="font-semibold">{country}</div>
                            <div className="text-cyan-400">{count} incidents</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'threats' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-center">Threat Intelligence Dashboard</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(severityStats).map(([severity, count]) => (
                      <div key={severity} className="bg-black/40 rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold mb-1 ${
                          severity === 'critical' ? 'text-red-400' :
                          severity === 'high' ? 'text-orange-400' :
                          severity === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {count}
                        </div>
                        <div className="text-gray-300 capitalize">{severity} Threats</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {filteredData
                      .filter(item => item.severity === 'critical' || item.severity === 'high')
                      .slice(0, 10)
                      .map((threat, index) => (
                        <motion.div
                          key={threat.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle size={16} className="text-red-400" />
                            <span className="font-semibold text-red-400">{threat.target}</span>
                          </div>
                          <div className="text-sm text-gray-300">
                            Source: {threat.source} | Category: {threat.category}
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Database size={20} />
                <span>Live Statistics</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">{filteredData.length}</div>
                  <div className="text-sm text-gray-300">Active Data Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{networkNodes.length}</div>
                  <div className="text-sm text-gray-300">Network Nodes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {((severityStats.critical || 0) + (severityStats.high || 0))}
                  </div>
                  <div className="text-sm text-gray-300">High Priority Threats</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {filteredData.reduce((sum, item) => sum + item.confidence, 0) / filteredData.length || 0}%
                  </div>
                  <div className="text-sm text-gray-300">Avg. Confidence</div>
                </div>
              </div>
            </motion.div>

            {/* Selected Node Details */}
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Target size={20} />
                  <span>Node Details</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Label</div>
                    <div className="font-semibold">{selectedNode.label}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Type</div>
                    <div className={`font-semibold capitalize ${
                      selectedNode.type === 'target' ? 'text-red-400' :
                      selectedNode.type === 'asset' ? 'text-green-400' :
                      selectedNode.type === 'threat' ? 'text-orange-400' :
                      'text-blue-400'
                    }`}>
                      {selectedNode.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Connections</div>
                    <div className="font-semibold">{selectedNode.connections.length}</div>
                  </div>
                  {selectedNode.data.ip && (
                    <div>
                      <div className="text-sm text-gray-400">IP Address</div>
                      <div className="font-mono text-cyan-400">{selectedNode.data.ip}</div>
                    </div>
                  )}
                  {selectedNode.data.risk_score !== undefined && (
                    <div>
                      <div className="text-sm text-gray-400">Risk Score</div>
                      <div className={`font-bold ${
                        selectedNode.data.risk_score > 70 ? 'text-red-400' :
                        selectedNode.data.risk_score > 40 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {selectedNode.data.risk_score}/100
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Real-time Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Activity size={20} />
                <span>Live Feed</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto text-sm font-mono">
                {filteredData.slice(0, 8).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-green-400"
                  >
                    [{new Date(item.timestamp).toLocaleTimeString()}] {item.source} → {item.target}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}