import { useState, useEffect } from "react";
import { Brain, Database, Network, Zap, Shield, Eye, Activity, Server } from "lucide-react";

export default function AIMatrix() {
  const [matrixData, setMatrixData] = useState({
    systemUptime: "99.7%",
    dataPoints: 0,
    activeAgents: 3,
    processingSpeed: 0
  });

  const [aiNodes, setAiNodes] = useState([
    { id: 1, status: "active", load: 0, type: "processing" },
    { id: 2, status: "active", load: 0, type: "analysis" },
    { id: 3, status: "active", load: 0, type: "security" },
    { id: 4, status: "standby", load: 0, type: "backup" },
    { id: 5, status: "active", load: 0, type: "optimization" },
    { id: 6, status: "active", load: 0, type: "monitoring" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixData(prev => ({
        ...prev,
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 1000) + 500,
        processingSpeed: Math.random() * 100 + 50
      }));

      setAiNodes(prev => prev.map(node => ({
        ...node,
        load: Math.random() * 100
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    {
      icon: Brain,
      title: "AUTONOMOUS AI",
      description: "Self-evolving artificial intelligence systems with independent decision-making capabilities",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Network,
      title: "COGNITIVE MESH",
      description: "Distributed cognitive network enabling real-time knowledge sharing and learning",
      color: "from-cyan-400 to-cyan-600"
    },
    {
      icon: Zap,
      title: "NEURAL FUSION",
      description: "Advanced neural architecture fusion for multi-modal AI processing",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Shield,
      title: "SECURITY CORE",
      description: "AI-powered security protocols with adaptive threat response mechanisms",
      color: "from-red-400 to-red-600"
    }
  ];

  const matrixApplications = [
    {
      icon: Eye,
      title: "ANALYSIS",
      features: ["Real-time data processing", "Pattern recognition", "Predictive modeling", "Anomaly detection"],
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "SECURITY",
      features: ["Threat intelligence", "Vulnerability scanning", "Incident response", "Risk assessment"],
      color: "text-cyan-400"
    },
    {
      icon: Brain,
      title: "INNOVATION",
      features: ["Creative problem solving", "Automated design", "Code generation", "Solution optimization"],
      color: "text-purple-400"
    },
    {
      icon: Server,
      title: "INTEGRATION",
      features: ["API orchestration", "System connectivity", "Data synchronization", "Workflow automation"],
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Matrix Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-mono">
            THE AI MATRIX
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interconnected artificial intelligence ecosystem powering the future of autonomous operations
          </p>
        </div>

        {/* Matrix Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2 font-mono">{matrixData.systemUptime}</div>
            <div className="text-sm text-gray-400 font-mono">SYSTEM UPTIME</div>
          </div>
          
          <div className="text-center bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono">{(matrixData.dataPoints / 1000).toFixed(1)}K+</div>
            <div className="text-sm text-gray-400 font-mono">DATA POINTS/SEC</div>
          </div>
          
          <div className="text-center bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-mono">{matrixData.activeAgents}</div>
            <div className="text-sm text-gray-400 font-mono">ACTIVE AI AGENTS</div>
          </div>
          
          <div className="text-center bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2 font-mono">24/7</div>
            <div className="text-sm text-gray-400 font-mono">AUTONOMOUS MODE</div>
          </div>
        </div>

        {/* AI Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${capability.color} rounded-full flex items-center justify-center group-hover:animate-pulse`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono text-center">{capability.title}</h3>
                <p className="text-sm text-gray-400 text-center">{capability.description}</p>
                
                {/* AI Node Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Matrix Network Visualization */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">MATRIX NETWORK TOPOLOGY</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiNodes.map((node) => (
              <div
                key={node.id}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-500
                  ${node.status === 'active' 
                    ? 'border-green-500/50 bg-green-500/10' 
                    : 'border-gray-500/50 bg-gray-500/10'
                  }
                `}
              >
                <div className="text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    node.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono mb-2">NODE {node.id}</div>
                  <div className="text-xs text-gray-300 mb-2 capitalize">{node.type}</div>
                  <div className="text-xs font-mono">
                    <span className={node.status === 'active' ? 'text-green-400' : 'text-gray-400'}>
                      {node.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 ${
                        node.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                      style={{ width: `${node.load}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capability Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matrixApplications.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className="text-3xl mb-4">
                  <Icon className={`w-8 h-8 ${app.color}`} />
                </div>
                <h4 className={`text-lg font-bold mb-4 font-mono ${app.color}`}>{app.title}</h4>
                <ul className="space-y-2">
                  {app.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-gray-300 flex items-center">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Matrix Status */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="text-lg font-bold text-green-400 mb-2 font-mono">
              AI MATRIX v4.0 | WONDER PETS NEURAL NETWORK
            </div>
            <div className="text-sm text-gray-400">
              Processing {matrixData.processingSpeed.toFixed(1)} operations per second
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}