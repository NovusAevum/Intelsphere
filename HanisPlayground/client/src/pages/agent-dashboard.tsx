import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Users, Brain, Shield, Zap, Activity, Settings, MessageSquare, Play, Pause, RefreshCw } from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  performance: number;
  tasksCompleted: number;
  uptime: string;
  capabilities: string[];
  color: string;
}

export default function AgentDashboard() {
  const [, navigate] = useLocation();
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: 'linny',
      name: 'LINNY OSINT',
      title: 'Intelligence & Reconnaissance Specialist',
      description: 'Advanced OSINT operations, threat analysis, and strategic intelligence gathering',
      avatar: '🔍',
      status: 'online',
      performance: 98.5,
      tasksCompleted: 847,
      uptime: '99.9%',
      capabilities: ['OSINT Analysis', 'Threat Assessment', 'Data Mining', 'Intelligence Reports'],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'tuck',
      name: 'TUCK SECURITY',
      title: 'Cybersecurity Defense Specialist',
      description: 'Network security, vulnerability assessment, and incident response',
      avatar: '🛡️',
      status: 'online',
      performance: 97.2,
      tasksCompleted: 1243,
      uptime: '99.8%',
      capabilities: ['Security Analysis', 'Penetration Testing', 'Incident Response', 'Risk Assessment'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'mingming',
      name: 'MING-MING MARKETING',
      title: 'Performance Marketing Strategist',
      description: 'Digital marketing optimization, analytics, and campaign management',
      avatar: '📈',
      status: 'busy',
      performance: 95.8,
      tasksCompleted: 692,
      uptime: '99.7%',
      capabilities: ['Campaign Optimization', 'Analytics', 'ROI Analysis', 'Market Research'],
      color: 'from-purple-500 to-pink-500'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalAgents: 3,
    activeAgents: 3,
    totalTasks: 0,
    avgPerformance: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        performance: Math.max(90, Math.min(100, agent.performance + (Math.random() - 0.5) * 2)),
        tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 3)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalTasks = agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
    const avgPerformance = agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length;
    const activeAgents = agents.filter(agent => agent.status === 'online').length;

    setSystemMetrics({
      totalAgents: agents.length,
      activeAgents,
      totalTasks,
      avgPerformance
    });
  }, [agents]);

  const handleAgentAction = (agentId: string, action: string) => {
    if (action === 'chat') {
      navigate(`/chat/${agentId}`);
    } else if (action === 'restart') {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'online' as const, performance: 100 }
          : agent
      ));
    }
  };

  const agentModules = [
    {
      icon: Brain,
      title: "NEURAL PROCESSING",
      description: "Advanced neural network processing and decision making",
      color: "text-purple-400"
    },
    {
      icon: Shield,
      title: "SECURITY PROTOCOLS",
      description: "Multi-layered security and threat protection systems",
      color: "text-red-400"
    },
    {
      icon: Activity,
      title: "REAL-TIME MONITORING",
      description: "Continuous performance monitoring and optimization",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "AUTO-OPTIMIZATION",
      description: "Self-improving algorithms and performance enhancement",
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
            AGENT DASHBOARD
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Command and control center for AI agents with real-time monitoring and management capabilities
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-cyan-400 font-mono">{systemMetrics.totalAgents}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">TOTAL AGENTS</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400 font-mono">{systemMetrics.activeAgents}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">ACTIVE AGENTS</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400 font-mono">{systemMetrics.totalTasks}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">TASKS COMPLETED</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400 font-mono">{systemMetrics.avgPerformance.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">AVG PERFORMANCE</div>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
            >
              {/* Agent Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${agent.color} flex items-center justify-center text-2xl`}>
                  {agent.avatar}
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono mb-1 ${
                    agent.status === 'online' ? 'text-green-400' :
                    agent.status === 'busy' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {agent.status.toUpperCase()}
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    agent.status === 'online' ? 'bg-green-400' :
                    agent.status === 'busy' ? 'bg-yellow-400' : 'bg-red-400'
                  } animate-pulse`}></div>
                </div>
              </div>

              {/* Agent Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{agent.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{agent.title}</p>
                <p className="text-gray-500 text-xs">{agent.description}</p>
              </div>

              {/* Performance Metrics */}
              <div className="mb-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Performance</span>
                    <span>{agent.performance.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${agent.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${agent.performance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Tasks:</span>
                    <div className="text-white font-mono">{agent.tasksCompleted}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Uptime:</span>
                    <div className="text-green-400 font-mono">{agent.uptime}</div>
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="mb-6">
                <div className="text-sm text-gray-400 font-mono mb-3">CAPABILITIES</div>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAgentAction(agent.id, 'chat')}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-all duration-300 font-mono text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT</span>
                </button>
                
                <button
                  onClick={() => handleAgentAction(agent.id, 'restart')}
                  className="px-4 py-2 bg-gray-700/50 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                
                <button className="px-4 py-2 bg-gray-700/50 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-300">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Agent System Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
              >
                <Icon className={`w-12 h-12 ${module.color} mb-4`} />
                <h4 className={`text-lg font-bold ${module.color} font-mono mb-2`}>{module.title}</h4>
                <p className="text-gray-400 text-sm">{module.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}