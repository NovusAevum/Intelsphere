import { useState, useEffect } from "react";
import { Atom, Zap, Cpu, Database, TrendingUp, Activity } from "lucide-react";

export default function QuantumLab() {
  const [quantumMetrics, setQuantumMetrics] = useState({
    coherenceTime: 0,
    entanglementStrength: 0,
    quantumVolume: 0,
    errorRate: 0
  });

  const [experiments, setExperiments] = useState([
    { id: 1, name: "Quantum Optimization", progress: 0, status: "running" },
    { id: 2, name: "Neural Enhancement", progress: 0, status: "running" },
    { id: 3, name: "Security Protocols", progress: 0, status: "completed" },
    { id: 4, name: "Data Compression", progress: 0, status: "queued" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumMetrics({
        coherenceTime: 95 + Math.random() * 5,
        entanglementStrength: 88 + Math.random() * 12,
        quantumVolume: 75 + Math.random() * 25,
        errorRate: Math.random() * 0.1
      });

      setExperiments(prev => prev.map(exp => ({
        ...exp,
        progress: exp.status === "running" ? Math.min(100, exp.progress + Math.random() * 10) : exp.progress
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const quantumApplications = [
    {
      icon: Atom,
      title: "QUANTUM COMPUTING",
      description: "Leveraging quantum superposition for exponential computational speedup",
      metrics: ["Qubit Count: 64", "Gate Fidelity: 99.7%", "Coherence: 100μs"],
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "QUANTUM ENCRYPTION",
      description: "Unbreakable quantum key distribution for ultimate security",
      metrics: ["Key Rate: 1Mbps", "Distance: 200km", "Security: Proven"],
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Database,
      title: "QUANTUM DATABASE",
      description: "Quantum-enhanced data storage and retrieval systems",
      metrics: ["Capacity: Unlimited", "Speed: Instantaneous", "Accuracy: 100%"],
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "QUANTUM ML",
      description: "Machine learning algorithms powered by quantum mechanics",
      metrics: ["Models: 15 Active", "Accuracy: 99.9%", "Training: Real-time"],
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Quantum Lab Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">
            QUANTUM LABORATORY
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced quantum computing research facility pushing the boundaries of computational physics
          </p>
        </div>

        {/* Quantum Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Atom className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400 font-mono">{quantumMetrics.coherenceTime.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">COHERENCE TIME</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${quantumMetrics.coherenceTime}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400 font-mono">{quantumMetrics.entanglementStrength.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">ENTANGLEMENT</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${quantumMetrics.entanglementStrength}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-cyan-400 font-mono">{quantumMetrics.quantumVolume.toFixed(1)}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">QUANTUM VOLUME</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${quantumMetrics.quantumVolume}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400 font-mono">{quantumMetrics.errorRate.toFixed(3)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">ERROR RATE</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${100 - quantumMetrics.errorRate * 1000}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quantum Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {quantumApplications.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${app.color} flex items-center justify-center mb-6 group-hover:animate-pulse`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-mono">{app.title}</h3>
                <p className="text-gray-400 mb-4">{app.description}</p>
                
                <div className="space-y-2">
                  {app.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Active Experiments */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-blue-400 mb-6 font-mono">ACTIVE QUANTUM EXPERIMENTS</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white font-mono">{experiment.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                    experiment.status === 'running' ? 'bg-yellow-500/20 text-yellow-400' :
                    experiment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {experiment.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{experiment.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        experiment.status === 'running' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        experiment.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${experiment.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 font-mono">
                  Experiment ID: QE-{String(experiment.id).padStart(4, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantum Status */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="text-lg font-bold text-blue-400 mb-2 font-mono">
              QUANTUM LAB v2.1 | HANIS QUANTUM RESEARCH FACILITY
            </div>
            <div className="text-sm text-gray-400">
              Operating at quantum supremacy levels with {quantumMetrics.coherenceTime.toFixed(1)}% coherence
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}