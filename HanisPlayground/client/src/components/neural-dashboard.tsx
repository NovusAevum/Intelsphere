import { useState, useEffect } from "react";
import { Brain, Activity, Cpu, Database, Network, Zap, Shield, Eye } from "lucide-react";

export default function NeuralDashboard() {
  const [neuralActivity, setNeuralActivity] = useState({
    linny: 0,
    tuck: 0,
    mingming: 0
  });
  
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    networkActivity: 0,
    activeConnections: 0
  });

  const [processedTasks, setProcessedTasks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity({
        linny: Math.random() * 100,
        tuck: Math.random() * 100,
        mingming: Math.random() * 100
      });

      setSystemMetrics({
        cpuUsage: 65 + Math.random() * 30,
        memoryUsage: 45 + Math.random() * 25,
        networkActivity: Math.random() * 100,
        activeConnections: Math.floor(Math.random() * 50) + 20
      });

      setProcessedTasks(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const agents = [
    {
      id: "linny",
      name: "LINNY OSINT CORE",
      title: "Strategic Intelligence",
      activity: neuralActivity.linny,
      status: "ACTIVE",
      color: "from-red-500 to-pink-500",
      icon: Eye,
      capabilities: ["Intelligence Gathering", "Data Analysis", "Threat Assessment", "OSINT Operations"]
    },
    {
      id: "tuck",
      name: "TUCK SECURITY GRID",
      title: "Cybersecurity Defense",
      activity: neuralActivity.tuck,
      status: "MONITORING",
      color: "from-green-500 to-emerald-500",
      icon: Shield,
      capabilities: ["Security Monitoring", "Vulnerability Analysis", "Incident Response", "Threat Detection"]
    },
    {
      id: "mingming",
      name: "MING-MING INNOVATION ENGINE",
      title: "Performance Marketing",
      activity: neuralActivity.mingming,
      status: "OPTIMIZING",
      color: "from-purple-500 to-pink-500",
      icon: Zap,
      capabilities: ["Campaign Optimization", "Data Analytics", "Creative Generation", "Performance Tracking"]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
            NEURAL NETWORK DASHBOARD
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time monitoring of AI agents and neural network performance across the Wonder Pets command center
          </p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-cyan-400 font-mono">{systemMetrics.cpuUsage.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">CPU USAGE</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${systemMetrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400 font-mono">{systemMetrics.memoryUsage.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">MEMORY</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${systemMetrics.memoryUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Network className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400 font-mono">{systemMetrics.activeConnections}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">CONNECTIONS</div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-green-400">ACTIVE</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400 font-mono">{processedTasks}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">TASKS PROCESSED</div>
            <div className="text-xs text-orange-400 mt-2">+{Math.floor(Math.random() * 5) + 1} per minute</div>
          </div>
        </div>

        {/* Neural Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div 
                key={agent.id}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${agent.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400 font-mono">{agent.status}</div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">{agent.name}</h3>
                  <p className="text-gray-400">{agent.title}</p>
                </div>

                {/* Neural Activity */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 font-mono">NEURAL ACTIVITY</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">{agent.activity.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${agent.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${agent.activity}%` }}
                    ></div>
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <div className="text-sm text-gray-400 font-mono mb-3">CAPABILITIES</div>
                  <div className="space-y-2">
                    {agent.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center text-xs text-gray-300">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Neural Network Visualization */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">NEURAL NETWORK TOPOLOGY</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Input Layer */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono">INPUT LAYER</h4>
              <div className="space-y-3">
                {["Data Sources", "User Input", "External APIs", "Sensors"].map((node, index) => (
                  <div key={index} className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-sm text-gray-300">{node}</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div 
                        className="bg-purple-400 h-1 rounded-full animate-pulse"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing Layer */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-cyan-400 mb-4 font-mono">PROCESSING LAYER</h4>
              <div className="space-y-3">
                {["Pattern Recognition", "Decision Trees", "Neural Networks", "ML Models"].map((node, index) => (
                  <div key={index} className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                    <div className="text-sm text-gray-300">{node}</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div 
                        className="bg-cyan-400 h-1 rounded-full animate-pulse"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Layer */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-green-400 mb-4 font-mono">OUTPUT LAYER</h4>
              <div className="space-y-3">
                {["Predictions", "Recommendations", "Actions", "Reports"].map((node, index) => (
                  <div key={index} className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="text-sm text-gray-300">{node}</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div 
                        className="bg-green-400 h-1 rounded-full animate-pulse"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}