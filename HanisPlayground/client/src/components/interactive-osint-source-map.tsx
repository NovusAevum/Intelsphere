import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Shield, Database, Search, Eye, Network, Zap, Target, MapPin, Users, Server, Lock, Activity, Radar, Satellite, Brain, AlertTriangle, CheckCircle, ExternalLink, Info } from 'lucide-react';
import { useSpyMode } from './spy-mode-provider';

interface SourceNode {
  id: string;
  name: string;
  type: 'search_engine' | 'social_media' | 'dark_web' | 'technical' | 'government' | 'commercial' | 'archive' | 'threat_intel';
  status: 'active' | 'scanning' | 'completed' | 'error' | 'pending';
  reliability: number;
  data_points: number;
  last_updated: string;
  coordinates: { x: number; y: number };
  connections: string[];
  intelligence_value: 'low' | 'medium' | 'high' | 'critical';
  access_method: string;
  region: string;
}

interface IntelligenceConnection {
  id: string;
  source: string;
  target: string;
  relationship_type: 'data_flow' | 'correlation' | 'validation' | 'cross_reference' | 'threat_link';
  strength: number;
  confidence: number;
  data_shared: string[];
  last_activity: string;
}

interface TargetEntity {
  id: string;
  name: string;
  type: 'person' | 'domain' | 'ip' | 'email' | 'phone' | 'organization';
  coordinates: { x: number; y: number };
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  intelligence_gathered: number;
  connected_sources: string[];
  analysis_status: 'analyzing' | 'completed' | 'pending';
}

export default function InteractiveOSINTSourceMap() {
  const [sourceNodes, setSourceNodes] = useState<SourceNode[]>([]);
  const [connections, setConnections] = useState<IntelligenceConnection[]>([]);
  const [targetEntities, setTargetEntities] = useState<TargetEntity[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState<'initializing' | 'scanning' | 'correlating' | 'completed'>('initializing');
  const [realTimeActivity, setRealTimeActivity] = useState<Array<{ id: string; activity: string; timestamp: number }>>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const { isSpyMode } = useSpyMode();

  useEffect(() => {
    initializeIntelligenceNetwork();
    startRealTimeSimulation();
  }, []);

  const initializeIntelligenceNetwork = () => {
    // Initialize comprehensive OSINT source nodes
    const sources: SourceNode[] = [
      {
        id: 'google_dorking',
        name: 'Google Advanced Search',
        type: 'search_engine',
        status: 'active',
        reliability: 0.94,
        data_points: 15420,
        last_updated: '2024-01-16 10:30:00',
        coordinates: { x: 150, y: 100 },
        connections: ['target_1', 'social_media_cluster', 'archive_org'],
        intelligence_value: 'high',
        access_method: 'Advanced Dorking',
        region: 'Global'
      },
      {
        id: 'shodan_iot',
        name: 'Shodan Infrastructure',
        type: 'technical',
        status: 'scanning',
        reliability: 0.89,
        data_points: 8750,
        last_updated: '2024-01-16 10:28:00',
        coordinates: { x: 400, y: 150 },
        connections: ['target_1', 'threat_intel_feeds'],
        intelligence_value: 'critical',
        access_method: 'API Scanning',
        region: 'Global'
      },
      {
        id: 'social_media_cluster',
        name: 'Social Media Intelligence',
        type: 'social_media',
        status: 'completed',
        reliability: 0.91,
        data_points: 12300,
        last_updated: '2024-01-16 10:25:00',
        coordinates: { x: 250, y: 300 },
        connections: ['target_1', 'google_dorking', 'behavioral_analysis'],
        intelligence_value: 'high',
        access_method: 'Multi-Platform API',
        region: 'Southeast Asia'
      },
      {
        id: 'dark_web_tor',
        name: 'Dark Web Intelligence',
        type: 'dark_web',
        status: 'active',
        reliability: 0.76,
        data_points: 2340,
        last_updated: '2024-01-16 10:15:00',
        coordinates: { x: 500, y: 250 },
        connections: ['target_1', 'criminal_networks'],
        intelligence_value: 'critical',
        access_method: 'Tor Network Access',
        region: 'Global'
      },
      {
        id: 'recon_ng_framework',
        name: 'Recon-ng Framework',
        type: 'technical',
        status: 'completed',
        reliability: 0.87,
        data_points: 5670,
        last_updated: '2024-01-16 10:20:00',
        coordinates: { x: 350, y: 400 },
        connections: ['target_1', 'domain_intelligence', 'vulnerability_db'],
        intelligence_value: 'high',
        access_method: 'Automated Modules',
        region: 'Global'
      },
      {
        id: 'osint_industries',
        name: 'OSINT Industries Hub',
        type: 'commercial',
        status: 'active',
        reliability: 0.93,
        data_points: 18900,
        last_updated: '2024-01-16 10:32:00',
        coordinates: { x: 600, y: 100 },
        connections: ['target_1', 'passive_dns', 'threat_intel_feeds'],
        intelligence_value: 'critical',
        access_method: 'Premium APIs',
        region: 'Global'
      },
      {
        id: 'maltego_transforms',
        name: 'Maltego Entity Analysis',
        type: 'commercial',
        status: 'active',
        reliability: 0.85,
        data_points: 7820,
        last_updated: '2024-01-16 10:18:00',
        coordinates: { x: 100, y: 350 },
        connections: ['target_1', 'relationship_mapping', 'entity_clustering'],
        intelligence_value: 'high',
        access_method: 'Transform Engine',
        region: 'Global'
      },
      {
        id: 'archive_org',
        name: 'Internet Archive',
        type: 'archive',
        status: 'completed',
        reliability: 0.88,
        data_points: 4560,
        last_updated: '2024-01-16 10:12:00',
        coordinates: { x: 50, y: 200 },
        connections: ['target_1', 'historical_data', 'deleted_content'],
        intelligence_value: 'medium',
        access_method: 'Wayback Machine',
        region: 'Global'
      },
      {
        id: 'threat_intel_feeds',
        name: 'Threat Intelligence',
        type: 'threat_intel',
        status: 'active',
        reliability: 0.92,
        data_points: 3450,
        last_updated: '2024-01-16 10:35:00',
        coordinates: { x: 550, y: 350 },
        connections: ['target_1', 'ioc_analysis', 'attribution_data'],
        intelligence_value: 'critical',
        access_method: 'Feed Aggregation',
        region: 'Global'
      },
      {
        id: 'government_records',
        name: 'Government Databases',
        type: 'government',
        status: 'pending',
        reliability: 0.95,
        data_points: 890,
        last_updated: '2024-01-16 09:45:00',
        coordinates: { x: 450, y: 450 },
        connections: ['target_1', 'official_records'],
        intelligence_value: 'critical',
        access_method: 'Public Records API',
        region: 'Malaysia'
      }
    ];

    // Initialize target entities
    const targets: TargetEntity[] = [
      {
        id: 'target_1',
        name: 'Primary Target',
        type: 'person',
        coordinates: { x: 300, y: 250 },
        threat_level: 'medium',
        intelligence_gathered: 87,
        connected_sources: sources.map(s => s.id),
        analysis_status: 'analyzing'
      }
    ];

    // Generate intelligence connections
    const intelligenceConnections: IntelligenceConnection[] = [
      {
        id: 'conn_1',
        source: 'google_dorking',
        target: 'target_1',
        relationship_type: 'data_flow',
        strength: 0.9,
        confidence: 0.94,
        data_shared: ['Profile information', 'Contact details', 'Professional background'],
        last_activity: '2024-01-16 10:30:00'
      },
      {
        id: 'conn_2',
        source: 'social_media_cluster',
        target: 'target_1',
        relationship_type: 'correlation',
        strength: 0.85,
        confidence: 0.91,
        data_shared: ['Behavioral patterns', 'Social connections', 'Location data'],
        last_activity: '2024-01-16 10:25:00'
      },
      {
        id: 'conn_3',
        source: 'dark_web_tor',
        target: 'target_1',
        relationship_type: 'threat_link',
        strength: 0.3,
        confidence: 0.76,
        data_shared: ['Potential mentions', 'Risk indicators'],
        last_activity: '2024-01-16 10:15:00'
      },
      {
        id: 'conn_4',
        source: 'google_dorking',
        target: 'social_media_cluster',
        relationship_type: 'cross_reference',
        strength: 0.7,
        confidence: 0.88,
        data_shared: ['Username validation', 'Profile cross-verification'],
        last_activity: '2024-01-16 10:28:00'
      },
      {
        id: 'conn_5',
        source: 'shodan_iot',
        target: 'threat_intel_feeds',
        relationship_type: 'validation',
        strength: 0.8,
        confidence: 0.92,
        data_shared: ['Infrastructure analysis', 'Vulnerability assessment'],
        last_activity: '2024-01-16 10:30:00'
      }
    ];

    setSourceNodes(sources);
    setTargetEntities(targets);
    setConnections(intelligenceConnections);
  };

  const startRealTimeSimulation = () => {
    const activities = [
      'New data point discovered from Google dorking',
      'Cross-reference validation completed',
      'Shodan scan identified new infrastructure',
      'Social media correlation established',
      'Dark web mention detected',
      'Threat intelligence updated',
      'Historical data recovered from archive',
      'Entity relationship mapped',
      'Behavioral pattern identified',
      'Geolocation data verified'
    ];

    const interval = setInterval(() => {
      const newActivity = {
        id: `activity_${Date.now()}`,
        activity: activities[Math.floor(Math.random() * activities.length)],
        timestamp: Date.now()
      };

      setRealTimeActivity(prev => [newActivity, ...prev.slice(0, 9)]);

      // Update node statuses randomly
      setSourceNodes(prev => prev.map(node => ({
        ...node,
        data_points: node.data_points + Math.floor(Math.random() * 50),
        last_updated: new Date().toISOString().slice(0, 19).replace('T', ' ')
      })));
    }, 3000);

    // Simulate analysis phases
    setTimeout(() => setAnimationPhase('scanning'), 2000);
    setTimeout(() => setAnimationPhase('correlating'), 5000);
    setTimeout(() => setAnimationPhase('completed'), 8000);

    return () => clearInterval(interval);
  };

  const getNodeColor = (node: SourceNode) => {
    switch (node.type) {
      case 'search_engine': return '#3B82F6'; // Blue
      case 'social_media': return '#10B981'; // Green
      case 'dark_web': return '#EF4444'; // Red
      case 'technical': return '#8B5CF6'; // Purple
      case 'government': return '#F59E0B'; // Amber
      case 'commercial': return '#06B6D4'; // Cyan
      case 'archive': return '#84CC16'; // Lime
      case 'threat_intel': return '#F97316'; // Orange
      default: return '#6B7280'; // Gray
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'search_engine': return Search;
      case 'social_media': return Users;
      case 'dark_web': return Lock;
      case 'technical': return Server;
      case 'government': return Shield;
      case 'commercial': return Database;
      case 'archive': return Globe;
      case 'threat_intel': return AlertTriangle;
      default: return Info;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981'; // Green
      case 'scanning': return '#F59E0B'; // Amber
      case 'completed': return '#06B6D4'; // Cyan
      case 'error': return '#EF4444'; // Red
      case 'pending': return '#6B7280'; // Gray
      default: return '#6B7280';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#16A34A';
      default: return '#6B7280';
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
  };

  const getConnectionPath = (connection: IntelligenceConnection) => {
    const sourceNode = sourceNodes.find(n => n.id === connection.source);
    const targetNode = targetEntities.find(t => t.id === connection.target) || 
                       sourceNodes.find(n => n.id === connection.target);
    
    if (!sourceNode || !targetNode) return '';

    const sourceCoords = sourceNode.coordinates;
    const targetCoords = targetNode.coordinates;
    
    // Create curved path for better visualization
    const midX = (sourceCoords.x + targetCoords.x) / 2;
    const midY = (sourceCoords.y + targetCoords.y) / 2 - 50;
    
    return `M ${sourceCoords.x} ${sourceCoords.y} Q ${midX} ${midY} ${targetCoords.x} ${targetCoords.y}`;
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'data_flow': return '#3B82F6';
      case 'correlation': return '#10B981';
      case 'validation': return '#8B5CF6';
      case 'cross_reference': return '#06B6D4';
      case 'threat_link': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">INTERACTIVE OSINT INTELLIGENCE NETWORK</h2>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              animationPhase === 'completed' ? 'bg-green-400' : 'bg-orange-400'
            }`}></div>
            <span className="text-cyan-400 font-bold">
              STATUS: {animationPhase.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Network className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400">
              {sourceNodes.length} ACTIVE SOURCES
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-green-400">
              REAL-TIME INTELLIGENCE
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Network Visualization */}
      <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Network Map */}
          <div className="lg:col-span-3">
            <div className="bg-black/50 rounded-xl p-4 border border-gray-700">
              <svg
                ref={svgRef}
                width="100%"
                height="500"
                viewBox="0 0 700 500"
                className="cursor-crosshair"
              >
                {/* Connection Lines */}
                <g className="connections">
                  {connections.map((connection) => (
                    <motion.path
                      key={connection.id}
                      d={getConnectionPath(connection)}
                      stroke={getConnectionColor(connection.relationship_type)}
                      strokeWidth={connection.strength * 3}
                      strokeOpacity={0.6}
                      fill="none"
                      strokeDasharray={connection.relationship_type === 'threat_link' ? '5,5' : 'none'}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  ))}
                </g>

                {/* Target Entities */}
                {targetEntities.map((target) => (
                  <g key={target.id}>
                    <motion.circle
                      cx={target.coordinates.x}
                      cy={target.coordinates.y}
                      r="25"
                      fill={getThreatLevelColor(target.threat_level)}
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="cursor-pointer"
                      onClick={() => handleNodeClick(target.id)}
                      onMouseEnter={() => handleNodeHover(target.id)}
                      onMouseLeave={() => handleNodeHover(null)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.text
                      x={target.coordinates.x}
                      y={target.coordinates.y + 45}
                      textAnchor="middle"
                      className="fill-white text-xs font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {target.name}
                    </motion.text>
                  </g>
                ))}

                {/* Source Nodes */}
                {sourceNodes.map((node, index) => {
                  const IconComponent = getNodeIcon(node.type);
                  return (
                    <g key={node.id}>
                      <motion.circle
                        cx={node.coordinates.x}
                        cy={node.coordinates.y}
                        r="20"
                        fill={getNodeColor(node)}
                        stroke={getStatusColor(node.status)}
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => handleNodeClick(node.id)}
                        onMouseEnter={() => handleNodeHover(node.id)}
                        onMouseLeave={() => handleNodeHover(null)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                      
                      {/* Status Ring */}
                      {node.status === 'scanning' && (
                        <motion.circle
                          cx={node.coordinates.x}
                          cy={node.coordinates.y}
                          r="25"
                          fill="none"
                          stroke={getStatusColor(node.status)}
                          strokeWidth="2"
                          strokeOpacity="0.5"
                          animate={{ r: [20, 30, 20] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      <motion.text
                        x={node.coordinates.x}
                        y={node.coordinates.y - 35}
                        textAnchor="middle"
                        className="fill-white text-xs font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {node.name}
                      </motion.text>
                    </g>
                  );
                })}

                {/* Data Flow Animation */}
                {animationPhase === 'scanning' && connections.map((connection, index) => (
                  <motion.circle
                    key={`flow_${connection.id}`}
                    r="3"
                    fill="#00FF00"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ 
                      duration: 3, 
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    style={{
                      offsetPath: `path("${getConnectionPath(connection)}")`,
                      offsetRotate: "auto"
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Information Panel */}
          <div className="space-y-4">
            {/* Node Details */}
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/50 rounded-xl p-4 border border-gray-700"
              >
                {(() => {
                  const node = sourceNodes.find(n => n.id === selectedNode) ||
                             targetEntities.find(t => t.id === selectedNode);
                  if (!node) return null;

                  if ('type' in node && node.type !== 'person') {
                    const sourceNode = node as SourceNode;
                    return (
                      <div>
                        <h4 className="text-white font-bold mb-3">{sourceNode.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className={`font-bold`} style={{ color: getStatusColor(sourceNode.status) }}>
                              {sourceNode.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Reliability:</span>
                            <span className="text-green-400 font-bold">
                              {(sourceNode.reliability * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Data Points:</span>
                            <span className="text-white font-bold">
                              {sourceNode.data_points.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Intel Value:</span>
                            <span className={`font-bold ${
                              sourceNode.intelligence_value === 'critical' ? 'text-red-400' :
                              sourceNode.intelligence_value === 'high' ? 'text-orange-400' :
                              sourceNode.intelligence_value === 'medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {sourceNode.intelligence_value.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Access:</span>
                            <span className="text-cyan-400 text-xs">
                              {sourceNode.access_method}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Region:</span>
                            <span className="text-purple-400 text-xs">
                              {sourceNode.region}
                            </span>
                          </div>
                          <div className="pt-2">
                            <span className="text-gray-400 text-xs">Last Updated:</span>
                            <div className="text-white text-xs font-mono">
                              {sourceNode.last_updated}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    const targetEntity = node as TargetEntity;
                    return (
                      <div>
                        <h4 className="text-white font-bold mb-3">{targetEntity.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white font-bold">
                              {targetEntity.type.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Threat Level:</span>
                            <span className="font-bold" style={{ color: getThreatLevelColor(targetEntity.threat_level) }}>
                              {targetEntity.threat_level.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Intel Gathered:</span>
                            <span className="text-green-400 font-bold">
                              {targetEntity.intelligence_gathered}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Sources:</span>
                            <span className="text-white font-bold">
                              {targetEntity.connected_sources.length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-cyan-400 font-bold">
                              {targetEntity.analysis_status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}
              </motion.div>
            )}

            {/* Legend */}
            <div className="bg-black/50 rounded-xl p-4 border border-gray-700">
              <h4 className="text-white font-bold mb-3">Source Types</h4>
              <div className="space-y-2">
                {[
                  { type: 'search_engine', name: 'Search Engines', color: '#3B82F6' },
                  { type: 'social_media', name: 'Social Media', color: '#10B981' },
                  { type: 'dark_web', name: 'Dark Web', color: '#EF4444' },
                  { type: 'technical', name: 'Technical', color: '#8B5CF6' },
                  { type: 'government', name: 'Government', color: '#F59E0B' },
                  { type: 'commercial', name: 'Commercial', color: '#06B6D4' },
                  { type: 'archive', name: 'Archives', color: '#84CC16' },
                  { type: 'threat_intel', name: 'Threat Intel', color: '#F97316' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300 text-xs">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-black/50 rounded-xl p-4 border border-gray-700">
              <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span>Live Activity</span>
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <AnimatePresence>
                  {realTimeActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-xs text-gray-300 p-2 bg-gray-800/50 rounded"
                    >
                      <div className="text-white">{activity.activity}</div>
                      <div className="text-gray-500 text-xs font-mono">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-blue-400 font-bold">Total Sources</div>
              <div className="text-white text-2xl font-bold">{sourceNodes.length}</div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Active intelligence collection points
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-green-400 font-bold">Data Points</div>
              <div className="text-white text-2xl font-bold">
                {sourceNodes.reduce((sum, node) => sum + node.data_points, 0).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Intelligence data collected
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Network className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-purple-400 font-bold">Connections</div>
              <div className="text-white text-2xl font-bold">{connections.length}</div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Intelligence correlations
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Radar className="w-8 h-8 text-orange-400" />
            <div>
              <div className="text-orange-400 font-bold">Coverage</div>
              <div className="text-white text-2xl font-bold">
                {Math.round(sourceNodes.reduce((sum, node) => sum + node.reliability, 0) / sourceNodes.length * 100)}%
              </div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Average reliability score
          </div>
        </div>
      </div>
    </div>
  );
}