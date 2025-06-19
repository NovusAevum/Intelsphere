import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Brain, Zap, Shield, Eye, Activity, ChevronRight, Users, Database, Network } from "lucide-react";

export default function CommandCenter() {
  const [, navigate] = useLocation();
  const [scanningMode, setScanningMode] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState({
    intelligence: 0,
    security: 0,
    performance: 0,
    neural: 0
  });

  const [liveStats, setLiveStats] = useState({
    activeAgents: 3,
    tasksCompleted: 0,
    dataProcessed: 0,
    systemUptime: "99.9%"
  });

  useEffect(() => {
    // Animate metrics on load
    const animateMetrics = () => {
      const targets = { intelligence: 98, security: 95, performance: 97, neural: 99 };
      
      Object.keys(targets).forEach((key) => {
        let current = 0;
        const target = targets[key as keyof typeof targets];
        const increment = target / 100;
        
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setSystemMetrics(prev => ({ ...prev, [key]: Math.round(current) }));
        }, 20);
      });
    };

    // Update live stats
    const updateStats = () => {
      setLiveStats(prev => ({
        ...prev,
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 5) + 1,
        dataProcessed: prev.dataProcessed + Math.floor(Math.random() * 100) + 50
      }));
    };

    const timer = setTimeout(animateMetrics, 1000);
    const interval = setInterval(updateStats, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const quickActions = [
    {
      title: "Neural Network Analysis",
      description: "Access advanced AI neural processing systems",
      icon: Brain,
      color: "from-purple-500 to-blue-600",
      path: "/neural-network"
    },
    {
      title: "AI Matrix Operations",
      description: "Monitor and control AI agent matrix",
      icon: Database,
      color: "from-green-500 to-cyan-600",
      path: "/ai-matrix"
    },
    {
      title: "Quantum Laboratory",
      description: "Advanced quantum computing experiments",
      icon: Zap,
      color: "from-blue-500 to-purple-600",
      path: "/quantum-lab"
    },
    {
      title: "Security Center",
      description: "OSINT and cybersecurity operations",
      icon: Shield,
      color: "from-red-500 to-pink-600",
      path: "/security-center"
    },
    {
      title: "Performance Hub",
      description: "Marketing analytics and optimization",
      icon: Activity,
      color: "from-orange-500 to-yellow-600",
      path: "/performance-hub"
    },
    {
      title: "Agent Dashboard",
      description: "Manage and deploy AI agents",
      icon: Users,
      color: "from-cyan-500 to-blue-600",
      path: "/agent-dashboard"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section with Profile */}
        <section className="text-center mb-16">
          
          {/* Profile Scanner */}
          <div className="mb-12 relative">
            <div 
              className="relative mx-auto w-48 h-48 cursor-pointer"
              onMouseEnter={() => setScanningMode(true)}
              onMouseLeave={() => setScanningMode(false)}
            >
              {/* Profile Image Container */}
              <div className="w-48 h-48 rounded-full overflow-hidden relative border-4 border-cyan-400 hover:border-purple-400 transition-all duration-500 hover:scale-110">
                <img 
                  src="/api/placeholder/192/192" 
                  alt="Wan Mohamad Hanis - AI Specialist"
                  className="w-full h-full object-cover"
                />
                
                {/* Scanning Overlay */}
                {scanningMode && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse">
                    <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400 text-xs font-mono">
                      NEURAL SCAN ACTIVE
                    </div>
                  </div>
                )}
              </div>

              {/* Status Indicators */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-mono animate-pulse">
                ONLINE
              </div>
              <div className="absolute -bottom-2 -left-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-mono">
                AI ACTIVE
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
                HANIS.AI
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
                Advanced Neural Command Center
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Wan Mohamad Hanis • AI Specialist • OSINT Expert • Performance Marketing Strategist
              </p>
              <p className="text-md text-gray-500 mt-2">
                Powered by Wonder Pets Neural Architecture • Malaysia 🇲🇾
              </p>
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono">{systemMetrics.intelligence}%</div>
              <div className="text-sm text-gray-400 font-mono">AI INTELLIGENCE</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${systemMetrics.intelligence}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2 font-mono">{systemMetrics.neural}%</div>
              <div className="text-sm text-gray-400 font-mono">NEURAL NETWORK</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${systemMetrics.neural}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">{systemMetrics.security}%</div>
              <div className="text-sm text-gray-400 font-mono">SECURITY</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${systemMetrics.security}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2 font-mono">{systemMetrics.performance}%</div>
              <div className="text-sm text-gray-400 font-mono">PERFORMANCE</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${systemMetrics.performance}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
            NEURAL COMMAND MODULES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-6 group-hover:animate-pulse`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3 font-mono">{action.title}</h4>
                  <p className="text-gray-400 mb-4">{action.description}</p>
                  
                  <div className="flex items-center text-cyan-400 font-mono text-sm group-hover:text-cyan-300">
                    <span>ACCESS MODULE</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live System Status */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-mono">{liveStats.activeAgents}</div>
            <div className="text-sm text-gray-400 font-mono">ACTIVE AGENTS</div>
            <div className="flex items-center justify-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-green-400">OPERATIONAL</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono">{liveStats.tasksCompleted}</div>
            <div className="text-sm text-gray-400 font-mono">TASKS COMPLETED</div>
            <div className="text-xs text-cyan-400 mt-2">+{Math.floor(Math.random() * 5) + 1} per minute</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-mono">{(liveStats.dataProcessed / 1000).toFixed(1)}K</div>
            <div className="text-sm text-gray-400 font-mono">DATA PROCESSED</div>
            <div className="text-xs text-purple-400 mt-2">GB processed</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2 font-mono">{liveStats.systemUptime}</div>
            <div className="text-sm text-gray-400 font-mono">SYSTEM UPTIME</div>
            <div className="text-xs text-orange-400 mt-2">24/7 availability</div>
          </div>
        </section>

      </div>
    </div>
  );
}