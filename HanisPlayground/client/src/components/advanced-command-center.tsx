import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Activity, Database, Network, Cpu, HardDrive, 
  Wifi, Shield, Zap, Eye, Brain, Target, TrendingUp,
  Play, Pause, Settings, Volume2, VolumeX, Maximize2,
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle,
  Clock, Globe, Users, BarChart3, PieChart, LineChart,
  Server, Monitor, Smartphone, Tablet, Laptop
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  history: number[];
  lastUpdated: number;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  currentTask: string;
  performance: number;
  uptime: number;
  tasksCompleted: number;
  location: string;
}

interface Mission {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'active' | 'completed' | 'failed';
  assignedAgent: string;
  progress: number;
  startTime: number;
  estimatedCompletion: number;
  objectives: string[];
}

interface ThreatAlert {
  id: string;
  type: 'security' | 'performance' | 'system' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  resolved: boolean;
  source: string;
}

export default function AdvancedCommandCenter() {
  const [activeView, setActiveView] = useState<'dashboard' | 'agents' | 'missions' | 'analytics' | 'security'>('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [realTimeData, setRealTimeData] = useState<any>({});
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize comprehensive system data
  useEffect(() => {
    const initializeSystemData = () => {
      // System Metrics
      const metrics: SystemMetric[] = [
        {
          id: 'cpu',
          name: 'CPU Usage',
          value: 67,
          unit: '%',
          status: 'optimal',
          trend: 'stable',
          history: Array.from({ length: 50 }, () => Math.random() * 100),
          lastUpdated: Date.now()
        },
        {
          id: 'memory',
          name: 'Memory Usage',
          value: 43,
          unit: '%',
          status: 'optimal',
          trend: 'down',
          history: Array.from({ length: 50 }, () => Math.random() * 100),
          lastUpdated: Date.now()
        },
        {
          id: 'network',
          name: 'Network I/O',
          value: 89,
          unit: 'Mbps',
          status: 'warning',
          trend: 'up',
          history: Array.from({ length: 50 }, () => Math.random() * 100),
          lastUpdated: Date.now()
        },
        {
          id: 'storage',
          name: 'Storage Usage',
          value: 34,
          unit: '%',
          status: 'optimal',
          trend: 'stable',
          history: Array.from({ length: 50 }, () => Math.random() * 100),
          lastUpdated: Date.now()
        },
        {
          id: 'requests',
          name: 'API Requests',
          value: 1247,
          unit: '/min',
          status: 'optimal',
          trend: 'up',
          history: Array.from({ length: 50 }, () => Math.random() * 2000),
          lastUpdated: Date.now()
        },
        {
          id: 'errors',
          name: 'Error Rate',
          value: 0.2,
          unit: '%',
          status: 'optimal',
          trend: 'down',
          history: Array.from({ length: 50 }, () => Math.random() * 5),
          lastUpdated: Date.now()
        }
      ];

      // Agents
      const agentData: Agent[] = [
        {
          id: 'linny',
          name: 'Linny OSINT',
          avatar: '🐹',
          status: 'online',
          currentTask: 'Threat intelligence analysis for Fortune 500 client',
          performance: 98,
          uptime: 99.7,
          tasksCompleted: 1247,
          location: 'Singapore'
        },
        {
          id: 'tuck',
          name: 'Tuck AI Engineer',
          avatar: '🐢',
          status: 'busy',
          currentTask: 'Neural network optimization for autonomous systems',
          performance: 96,
          uptime: 99.2,
          tasksCompleted: 892,
          location: 'Tokyo'
        },
        {
          id: 'mingming',
          name: 'Ming-Ming Marketing',
          avatar: '🦆',
          status: 'online',
          currentTask: 'Campaign optimization for viral marketing initiative',
          performance: 94,
          uptime: 98.9,
          tasksCompleted: 567,
          location: 'New York'
        }
      ];

      // Missions
      const missionData: Mission[] = [
        {
          id: 'mission-001',
          title: 'Global Threat Assessment',
          priority: 'critical',
          status: 'active',
          assignedAgent: 'linny',
          progress: 67,
          startTime: Date.now() - 3600000,
          estimatedCompletion: Date.now() + 1800000,
          objectives: [
            'Analyze threat landscape in APAC region',
            'Identify emerging attack vectors',
            'Generate comprehensive threat report',
            'Implement preventive measures'
          ]
        },
        {
          id: 'mission-002',
          title: 'AI Model Deployment',
          priority: 'high',
          status: 'active',
          assignedAgent: 'tuck',
          progress: 34,
          startTime: Date.now() - 7200000,
          estimatedCompletion: Date.now() + 5400000,
          objectives: [
            'Complete model training validation',
            'Deploy to production environment',
            'Monitor performance metrics',
            'Optimize inference speed'
          ]
        },
        {
          id: 'mission-003',
          title: 'Viral Campaign Launch',
          priority: 'medium',
          status: 'pending',
          assignedAgent: 'mingming',
          progress: 12,
          startTime: Date.now(),
          estimatedCompletion: Date.now() + 10800000,
          objectives: [
            'Finalize creative assets',
            'Configure ad targeting',
            'Launch across platforms',
            'Monitor engagement metrics'
          ]
        }
      ];

      // Threat Alerts
      const threatData: ThreatAlert[] = [
        {
          id: 'threat-001',
          type: 'security',
          severity: 'high',
          message: 'Unusual login activity detected from multiple geographic locations',
          timestamp: Date.now() - 300000,
          resolved: false,
          source: 'Authentication System'
        },
        {
          id: 'threat-002',
          type: 'performance',
          severity: 'medium',
          message: 'API response time increased by 15% in the last hour',
          timestamp: Date.now() - 600000,
          resolved: false,
          source: 'Performance Monitor'
        },
        {
          id: 'threat-003',
          type: 'network',
          severity: 'low',
          message: 'Bandwidth utilization above 80% threshold',
          timestamp: Date.now() - 900000,
          resolved: true,
          source: 'Network Monitor'
        }
      ];

      setSystemMetrics(metrics);
      setAgents(agentData);
      setMissions(missionData);
      setThreats(threatData);
    };

    initializeSystemData();
  }, []);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 10,
        history: [...metric.history.slice(1), metric.value],
        lastUpdated: Date.now()
      })));

      setRealTimeData({
        timestamp: Date.now(),
        activeConnections: Math.floor(Math.random() * 1000) + 500,
        dataProcessed: Math.floor(Math.random() * 1000) + 2000,
        threatsBlocked: Math.floor(Math.random() * 50) + 200,
        systemLoad: Math.random() * 100
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Advanced canvas visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;
    ctx.scale(2, 2);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      connections: number[];
    }> = [];

    // Initialize network nodes
    for (let i = 0; i < 25; i++) {
      nodes.push({
        x: Math.random() * canvas.width / 2,
        y: Math.random() * canvas.height / 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 5 + 3,
        color: ['#00f5ff', '#ff1493', '#00ff00', '#ffd700'][Math.floor(Math.random() * 4)],
        connections: []
      });
    }

    // Create connections between nodes
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width / 2) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height / 2) node.vy *= -1;

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const target = nodes[connectionIndex];
          if (target) {
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });

        // Draw node
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add pulsing effect
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + Math.sin(Date.now() * 0.005 + i) * 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
    };
  }, []);

  // Terminal command handler
  const handleCommand = useCallback((command: string) => {
    const newHistory = [...commandHistory, `> ${command}`];
    
    switch (command.toLowerCase()) {
      case 'status':
        newHistory.push('System Status: All systems operational');
        newHistory.push(`Active Agents: ${agents.filter(a => a.status === 'online').length}`);
        newHistory.push(`Current Missions: ${missions.filter(m => m.status === 'active').length}`);
        break;
      case 'agents':
        newHistory.push('Active Agents:');
        agents.forEach(agent => {
          newHistory.push(`  ${agent.name}: ${agent.status} - ${agent.currentTask}`);
        });
        break;
      case 'threats':
        const activeThreat = threats.filter(t => !t.resolved);
        newHistory.push(`Active Threats: ${activeThreat.length}`);
        activeThreat.forEach(threat => {
          newHistory.push(`  [${threat.severity.toUpperCase()}] ${threat.message}`);
        });
        break;
      case 'help':
        newHistory.push('Available commands:');
        newHistory.push('  status    - Show system status');
        newHistory.push('  agents    - List active agents');
        newHistory.push('  threats   - Show security threats');
        newHistory.push('  missions  - List current missions');
        newHistory.push('  clear     - Clear terminal');
        break;
      case 'clear':
        setCommandHistory([]);
        setCurrentCommand('');
        return;
      case 'missions':
        newHistory.push('Current Missions:');
        missions.forEach(mission => {
          newHistory.push(`  ${mission.title}: ${mission.status} (${mission.progress}%)`);
        });
        break;
      default:
        newHistory.push(`Command not found: ${command}`);
        newHistory.push('Type "help" for available commands');
    }

    setCommandHistory(newHistory);
    setCurrentCommand('');
  }, [agents, missions, threats, commandHistory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': case 'online': case 'completed': return 'text-green-400';
      case 'warning': case 'busy': case 'active': return 'text-yellow-400';
      case 'critical': case 'offline': case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-black text-white min-h-screen`}>
      {/* Advanced Network Visualization Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ background: 'transparent' }}
      />

      {/* Main Command Center Interface */}
      <div className="relative z-10 h-screen flex flex-col">
        
        {/* Top Control Bar */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                WONDER PETS COMMAND CENTER
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-black/50 rounded-lg px-4 py-2 border border-gray-700/50">
                <span className="text-cyan-400 font-mono text-sm">
                  {new Date().toLocaleString()}
                </span>
              </div>
              
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
              >
                {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 mt-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Monitor },
              { id: 'agents', label: 'Agents', icon: Users },
              { id: 'missions', label: 'Missions', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'security', label: 'Security', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                  ${activeView === tab.id 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          
          {/* Left Sidebar - System Metrics */}
          <div className="w-80 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-lg border-r border-gray-700/50 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Activity size={20} />
              <span>System Metrics</span>
            </h3>

            <div className="space-y-4">
              {systemMetrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-lg p-4 border border-gray-700/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">{metric.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.status === 'optimal' ? 'bg-green-900/30 text-green-400' :
                      metric.status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-white">
                      {metric.value.toFixed(1)}{metric.unit}
                    </span>
                    <span className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-400' :
                      metric.trend === 'down' ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                    </span>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-8">
                    <svg width="100%" height="100%" className="overflow-visible">
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-cyan-400"
                        points={metric.history.map((value, index) => 
                          `${(index / (metric.history.length - 1)) * 100},${100 - (value / Math.max(...metric.history)) * 100}`
                        ).join(' ')}
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Real-time Stats */}
            <div className="mt-6">
              <h4 className="text-md font-semibold text-white mb-3">Real-time Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Active Connections</span>
                  <span className="text-cyan-400 font-mono">{realTimeData.activeConnections || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Data Processed</span>
                  <span className="text-green-400 font-mono">{realTimeData.dataProcessed || 0} MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Threats Blocked</span>
                  <span className="text-red-400 font-mono">{realTimeData.threatsBlocked || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Panel */}
          <div className="flex-1 flex flex-col">
            
            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeView === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <Users className="text-cyan-400" size={24} />
                          <span className="text-2xl font-bold text-cyan-400">3</span>
                        </div>
                        <div className="text-white font-semibold">Active Agents</div>
                        <div className="text-cyan-300 text-sm">All operational</div>
                      </div>

                      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <Target className="text-green-400" size={24} />
                          <span className="text-2xl font-bold text-green-400">{missions.filter(m => m.status === 'active').length}</span>
                        </div>
                        <div className="text-white font-semibold">Active Missions</div>
                        <div className="text-green-300 text-sm">In progress</div>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <AlertTriangle className="text-yellow-400" size={24} />
                          <span className="text-2xl font-bold text-yellow-400">{threats.filter(t => !t.resolved).length}</span>
                        </div>
                        <div className="text-white font-semibold">Active Threats</div>
                        <div className="text-yellow-300 text-sm">Monitoring</div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <BarChart3 className="text-purple-400" size={24} />
                          <span className="text-2xl font-bold text-purple-400">98.7%</span>
                        </div>
                        <div className="text-white font-semibold">Success Rate</div>
                        <div className="text-purple-300 text-sm">Last 30 days</div>
                      </div>
                    </div>

                    {/* Recent Activity & Threat Alerts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-black/30 rounded-lg p-6 border border-gray-700/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          {missions.slice(0, 5).map((mission) => (
                            <div key={mission.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                              <div className={`w-3 h-3 rounded-full ${
                                mission.status === 'active' ? 'bg-green-400' :
                                mission.status === 'completed' ? 'bg-blue-400' :
                                mission.status === 'pending' ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}></div>
                              <div className="flex-1">
                                <div className="text-white font-medium">{mission.title}</div>
                                <div className="text-gray-400 text-sm">Assigned to {mission.assignedAgent}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-white font-semibold">{mission.progress}%</div>
                                <div className="text-gray-400 text-xs">{mission.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-lg p-6 border border-gray-700/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Security Alerts</h3>
                        <div className="space-y-3">
                          {threats.slice(0, 5).map((threat) => (
                            <div key={threat.id} className={`p-3 rounded-lg border-l-4 ${
                              threat.severity === 'critical' ? 'bg-red-900/20 border-red-400' :
                              threat.severity === 'high' ? 'bg-orange-900/20 border-orange-400' :
                              threat.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-400' :
                              'bg-blue-900/20 border-blue-400'
                            }`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className={`font-semibold ${
                                    threat.severity === 'critical' ? 'text-red-400' :
                                    threat.severity === 'high' ? 'text-orange-400' :
                                    threat.severity === 'medium' ? 'text-yellow-400' :
                                    'text-blue-400'
                                  }`}>
                                    {threat.severity.toUpperCase()}
                                  </div>
                                  <div className="text-white text-sm mt-1">{threat.message}</div>
                                  <div className="text-gray-400 text-xs mt-2">
                                    {threat.source} • {new Date(threat.timestamp).toLocaleTimeString()}
                                  </div>
                                </div>
                                {threat.resolved && (
                                  <CheckCircle className="text-green-400" size={16} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeView === 'agents' && (
                  <motion.div
                    key="agents"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white">Agent Status & Performance</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {agents.map((agent) => (
                        <motion.div
                          key={agent.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedAgent(agent.id)}
                          className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg p-6 border border-gray-700/50 cursor-pointer"
                        >
                          {/* Agent Avatar */}
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-2xl border-2 border-cyan-400">
                              {agent.avatar}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                              <div className={`flex items-center space-x-2 ${getStatusColor(agent.status)}`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  agent.status === 'online' ? 'bg-green-400' :
                                  agent.status === 'busy' ? 'bg-yellow-400' :
                                  'bg-red-400'
                                }`}></div>
                                <span className="text-sm font-semibold">{agent.status.toUpperCase()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Current Task */}
                          <div className="bg-black/30 rounded-lg p-4 mb-4">
                            <div className="text-gray-400 text-xs mb-1">CURRENT TASK</div>
                            <div className="text-white text-sm">{agent.currentTask}</div>
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-cyan-400">{agent.performance}%</div>
                              <div className="text-gray-400 text-xs">Performance</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-400">{agent.uptime}%</div>
                              <div className="text-gray-400 text-xs">Uptime</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-purple-400">{agent.tasksCompleted}</div>
                              <div className="text-gray-400 text-xs">Tasks</div>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="mt-4 flex items-center space-x-2 text-gray-400">
                            <Globe size={14} />
                            <span className="text-sm">{agent.location}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeView === 'missions' && (
                  <motion.div
                    key="missions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white">Mission Control</h2>
                    
                    <div className="space-y-4">
                      {missions.map((mission) => (
                        <motion.div
                          key={mission.id}
                          whileHover={{ scale: 1.01 }}
                          className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg p-6 border border-gray-700/50"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white">{mission.title}</h3>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(mission.priority)}`}>
                                  {mission.priority.toUpperCase()}
                                </span>
                                <span className={`text-sm ${getStatusColor(mission.status)}`}>
                                  {mission.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-cyan-400">{mission.progress}%</div>
                              <div className="text-gray-400 text-sm">Complete</div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${mission.progress}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                            />
                          </div>

                          {/* Objectives */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-2">Objectives</h4>
                              <div className="space-y-2">
                                {mission.objectives.map((objective, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                      index < mission.progress / 25 ? 'bg-green-400' : 'bg-gray-600'
                                    }`}></div>
                                    <span className="text-gray-300 text-sm">{objective}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-2">Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Assigned Agent:</span>
                                  <span className="text-white">{mission.assignedAgent}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Started:</span>
                                  <span className="text-white">{new Date(mission.startTime).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">ETA:</span>
                                  <span className="text-white">{new Date(mission.estimatedCompletion).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeView === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white">Security Operations Center</h2>
                    
                    {/* Security Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-500/30">
                        <Shield className="text-green-400 mb-3" size={24} />
                        <div className="text-2xl font-bold text-green-400">Secure</div>
                        <div className="text-green-300 text-sm">All systems protected</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-6 border border-blue-500/30">
                        <Eye className="text-blue-400 mb-3" size={24} />
                        <div className="text-2xl font-bold text-blue-400">24/7</div>
                        <div className="text-blue-300 text-sm">Monitoring active</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-500/30">
                        <AlertTriangle className="text-yellow-400 mb-3" size={24} />
                        <div className="text-2xl font-bold text-yellow-400">{threats.filter(t => !t.resolved).length}</div>
                        <div className="text-yellow-300 text-sm">Active threats</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                        <Zap className="text-purple-400 mb-3" size={24} />
                        <div className="text-2xl font-bold text-purple-400">99.9%</div>
                        <div className="text-purple-300 text-sm">Threat detection</div>
                      </div>
                    </div>

                    {/* Threat Timeline */}
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-4">Threat Timeline</h3>
                      <div className="space-y-4">
                        {threats.map((threat) => (
                          <div key={threat.id} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg">
                            <div className={`w-3 h-3 rounded-full mt-2 ${
                              threat.severity === 'critical' ? 'bg-red-400' :
                              threat.severity === 'high' ? 'bg-orange-400' :
                              threat.severity === 'medium' ? 'bg-yellow-400' :
                              'bg-blue-400'
                            }`}></div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`font-semibold ${
                                  threat.severity === 'critical' ? 'text-red-400' :
                                  threat.severity === 'high' ? 'text-orange-400' :
                                  threat.severity === 'medium' ? 'text-yellow-400' :
                                  'text-blue-400'
                                }`}>
                                  {threat.type.toUpperCase()} ALERT
                                </span>
                                <span className="text-gray-400 text-sm">
                                  {new Date(threat.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <div className="text-white mb-2">{threat.message}</div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400 text-sm">Source: {threat.source}</span>
                                {threat.resolved && (
                                  <span className="flex items-center space-x-1 text-green-400 text-sm">
                                    <CheckCircle size={14} />
                                    <span>Resolved</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Panel */}
            <div className="h-64 bg-black border-t border-gray-700/50 p-4">
              <div className="h-full bg-gray-900/50 rounded-lg border border-gray-700/50 flex flex-col">
                <div className="bg-gray-800/50 px-4 py-2 rounded-t-lg border-b border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">Wonder Pets Terminal</span>
                  </div>
                </div>
                
                <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto font-mono text-sm">
                  <div className="text-green-400 mb-2">Wonder Pets Command Center v3.0</div>
                  <div className="text-gray-400 mb-4">Type 'help' for available commands</div>
                  
                  {commandHistory.map((line, index) => (
                    <div key={index} className={line.startsWith('>') ? 'text-cyan-400' : 'text-gray-300'}>
                      {line}
                    </div>
                  ))}
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-cyan-400">&gt;</span>
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCommand(currentCommand);
                        }
                      }}
                      className="flex-1 bg-transparent text-white outline-none"
                      placeholder="Enter command..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}