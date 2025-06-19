import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, Brain, Zap, Database, Network, Activity, Settings, Play, Pause, Download, ExternalLink, RefreshCw, Target } from 'lucide-react';

export default function AIMatrix() {
  const [matrixActive, setMatrixActive] = useState(true);
  const [decisions, setDecisions] = useState(0);
  const [accuracy, setAccuracy] = useState(98.7);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (matrixActive) {
        setDecisions(prev => prev + Math.floor(Math.random() * 10));
        setAccuracy(96 + Math.random() * 3);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [matrixActive]);

  const matrixModules = [
    { 
      name: 'Decision Engine', 
      status: 'Active', 
      load: 87, 
      description: 'Real-time strategic decision making',
      metrics: { decisions: '15.2K', accuracy: '98.7%' }
    },
    { 
      name: 'Pattern Recognition', 
      status: 'Optimizing', 
      load: 92, 
      description: 'Advanced pattern analysis and prediction',
      metrics: { patterns: '8.7K', confidence: '94.2%' }
    },
    { 
      name: 'Automation Core', 
      status: 'Active', 
      load: 78, 
      description: 'Intelligent task automation systems',
      metrics: { tasks: '12.5K', efficiency: '96.8%' }
    },
    { 
      name: 'Learning Matrix', 
      status: 'Training', 
      load: 95, 
      description: 'Continuous learning and adaptation',
      metrics: { models: '42', improvement: '+12.3%' }
    }
  ];

  const aiAgents = [
    { name: 'Linny OSINT', capability: 'Intelligence Gathering', performance: 98, connections: 247 },
    { name: 'Tuck AI Engineer', capability: 'System Architecture', performance: 96, connections: 189 },
    { name: 'Ming-Ming Marketing', capability: 'Strategy Optimization', performance: 94, connections: 312 },
    { name: 'Wonder Pets Collective', capability: 'Unified Operations', performance: 99, connections: 748 }
  ];

  const dataStreams = [
    { source: 'Global Intelligence Feed', rate: '2.3TB/h', status: 'Active' },
    { source: 'Market Analytics Stream', rate: '1.8TB/h', status: 'Active' },
    { source: 'Neural Network Telemetry', rate: '4.1TB/h', status: 'High Load' },
    { source: 'Quantum Computing Data', rate: '0.9TB/h', status: 'Stable' }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, window.innerHeight + 20],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {Math.random().toString(36).substring(2, 8)}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI MATRIX
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Advanced AI decision matrix and intelligent automation systems
          </p>
        </motion.div>

        {/* Matrix Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-lg border border-green-500/30 rounded-3xl p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Matrix Control Panel</h2>
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${matrixActive ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-gray-300">{matrixActive ? 'Matrix Active' : 'Matrix Offline'}</span>
              <button
                onClick={() => setMatrixActive(!matrixActive)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-400 hover:to-blue-400 transition-all"
              >
                {matrixActive ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
              <div className="text-sm text-gray-400 mb-1">Total Decisions</div>
              <div className="text-2xl font-bold text-green-400">{decisions.toLocaleString()}</div>
              <div className="text-sm text-green-300">+47 per minute</div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
              <div className="text-sm text-gray-400 mb-1">System Accuracy</div>
              <div className="text-2xl font-bold text-blue-400">{accuracy.toFixed(1)}%</div>
              <div className="text-sm text-blue-300">+0.3% today</div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-1">Active Agents</div>
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-purple-300">All operational</div>
            </div>
          </div>

          {/* Matrix Visualization */}
          <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
            <h3 className="text-lg font-semibold mb-4">Decision Matrix Visualization</h3>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 64 }, (_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square border border-green-500/30 rounded"
                  animate={{
                    backgroundColor: matrixActive ? [
                      'rgba(34, 197, 94, 0.1)',
                      'rgba(34, 197, 94, 0.5)',
                      'rgba(34, 197, 94, 0.1)'
                    ] : 'rgba(34, 197, 94, 0.1)'
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Matrix Modules */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Matrix Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matrixModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{module.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    module.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    module.status === 'Optimizing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {module.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{module.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(module.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex}>
                      <div className="text-sm text-gray-400 capitalize">{key}</div>
                      <div className="text-lg font-semibold text-cyan-400">{value}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">System Load</span>
                    <span className="text-sm text-green-400">{module.load}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${module.load}%` }}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                      className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Agents Network */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">AI Agents Network</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain size={24} className="text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{agent.capability}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-cyan-400">{agent.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.performance}%` }}
                        transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Active Connections</div>
                    <div className="text-lg font-semibold text-purple-400">{agent.connections}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Streams */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-cyan-500/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Live Data Streams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataStreams.map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/30 rounded-xl p-4 border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <Database size={20} className="text-cyan-400" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stream.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    stream.status === 'High Load' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {stream.status}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">{stream.source}</div>
                <div className="text-xs text-cyan-400">{stream.rate}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOptimizing(true);
                setTimeout(() => {
                  setIsOptimizing(false);
                  setAccuracy(prev => Math.min(99.9, prev + Math.random() * 1.5));
                  setSystemLogs(prev => [...prev, {
                    id: Date.now(),
                    type: 'optimization',
                    message: 'AI Matrix optimization completed',
                    timestamp: new Date().toISOString()
                  }]);
                }, 4000);
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <Brain size={20} />
              <span>{isOptimizing ? 'Optimizing Matrix...' : 'Optimize AI Matrix'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMatrixActive(!matrixActive)}
              className={`px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 ${
                matrixActive 
                  ? 'bg-red-500 hover:bg-red-400 text-white' 
                  : 'bg-green-500 hover:bg-green-400 text-white'
              }`}
            >
              {matrixActive ? <Pause size={20} /> : <Play size={20} />}
              <span>{matrixActive ? 'Pause Matrix' : 'Resume Matrix'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const matrixData = `
AI Matrix System Report - ${new Date().toISOString()}

System Status: ${matrixActive ? 'Active' : 'Paused'}
Total Decisions Made: ${decisions.toLocaleString()}
Current Accuracy: ${accuracy.toFixed(2)}%

AI Matrix Modules:
${matrixModules.map(module => 
  `- ${module.name}: ${module.status} (${module.load}% load)\n  ${module.description}\n  Metrics: ${Object.entries(module.metrics).map(([k,v]) => `${k}: ${v}`).join(', ')}`
).join('\n\n')}

System Performance:
- Decision Engine: 15.2K decisions, 98.7% accuracy
- Pattern Recognition: 8.7K patterns, 94.2% confidence
- Automation Core: 12.5K tasks, 96.8% efficiency
- Learning Matrix: 42 models, +12.3% improvement

Recent System Logs:
${systemLogs.slice(-5).map(log => 
  `[${new Date(log.timestamp).toISOString()}] ${log.type.toUpperCase()}: ${log.message}`
).join('\n')}
                `;
                const blob = new Blob([matrixData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ai-matrix-report-${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Export Matrix Data</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://github.com/tensorflow/tensorflow', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <ExternalLink size={20} />
              <span>Open TensorFlow</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}