import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Cpu, Network, Zap, Eye, Atom, Database, 
  Activity, BarChart3, TrendingUp, Layers, GitBranch,
  Circle, Triangle, Square, Hexagon, Octagon
} from 'lucide-react';
import Advanced3DBackground from '../components/advanced-3d-background';
import EnhancedNavigation from '../components/enhanced-navigation';

export default function NeuralMatrix() {
  const [currentSection, setCurrentSection] = useState('neural-matrix');
  const [activeLayer, setActiveLayer] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [learningMode, setLearningMode] = useState(false);
  const [processingNodes, setProcessingNodes] = useState(64);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const networkLayers = [
    {
      name: 'INPUT LAYER',
      type: 'Sensory Processing',
      nodes: 2048,
      activation: 'ReLU',
      description: 'Primary data ingestion from multiple sensor arrays and information sources',
      color: 'from-cyan-400 to-blue-500',
      performance: 98.7,
      throughput: '12.5 TB/s'
    },
    {
      name: 'HIDDEN LAYER 1',
      type: 'Pattern Recognition',
      nodes: 4096,
      activation: 'Sigmoid',
      description: 'Advanced pattern matching and feature extraction algorithms',
      color: 'from-purple-400 to-pink-500',
      performance: 94.2,
      throughput: '8.3 TB/s'
    },
    {
      name: 'HIDDEN LAYER 2',
      type: 'Deep Learning',
      nodes: 8192,
      activation: 'Tanh',
      description: 'Complex relationship modeling and deep neural associations',
      color: 'from-green-400 to-emerald-500',
      performance: 96.8,
      throughput: '6.7 TB/s'
    },
    {
      name: 'HIDDEN LAYER 3',
      type: 'Cognitive Processing',
      nodes: 1024,
      activation: 'Softmax',
      description: 'High-level reasoning and abstract concept formation',
      color: 'from-yellow-400 to-orange-500',
      performance: 92.1,
      throughput: '4.2 TB/s'
    },
    {
      name: 'OUTPUT LAYER',
      type: 'Decision Making',
      nodes: 512,
      activation: 'Linear',
      description: 'Final decision synthesis and action recommendation systems',
      color: 'from-red-400 to-pink-500',
      performance: 99.3,
      throughput: '2.1 TB/s'
    }
  ];

  const cognitiveModules = [
    {
      name: 'PERCEPTION ENGINE',
      status: 'ACTIVE',
      accuracy: 97.8,
      description: 'Multi-modal sensory data processing and interpretation',
      submodules: [
        'Visual Cortex Simulation',
        'Auditory Processing Matrix',
        'Tactile Sensor Integration',
        'Temporal Pattern Recognition'
      ]
    },
    {
      name: 'MEMORY MATRIX',
      status: 'OPTIMIZING',
      accuracy: 94.5,
      description: 'Hierarchical memory storage and retrieval systems',
      submodules: [
        'Working Memory Buffer',
        'Long-term Storage Array',
        'Associative Memory Network',
        'Memory Consolidation Engine'
      ]
    },
    {
      name: 'REASONING CORE',
      status: 'LEARNING',
      accuracy: 89.2,
      description: 'Logical inference and abstract reasoning capabilities',
      submodules: [
        'Causal Reasoning Engine',
        'Analogical Thinking Module',
        'Problem Decomposition System',
        'Solution Synthesis Framework'
      ]
    },
    {
      name: 'LANGUAGE PROCESSOR',
      status: 'ACTIVE',
      accuracy: 96.1,
      description: 'Natural language understanding and generation systems',
      submodules: [
        'Semantic Analysis Engine',
        'Syntactic Parser Network',
        'Contextual Understanding',
        'Multi-language Translation'
      ]
    }
  ];

  const learningMetrics = [
    { name: 'Training Accuracy', value: 97.8, trend: '+2.3%', color: 'text-green-400' },
    { name: 'Validation Loss', value: 0.023, trend: '-0.007', color: 'text-blue-400' },
    { name: 'Learning Rate', value: 0.001, trend: 'adaptive', color: 'text-purple-400' },
    { name: 'Gradient Norm', value: 1.247, trend: 'stable', color: 'text-cyan-400' },
    { name: 'Memory Usage', value: 78.4, trend: '+1.2%', color: 'text-yellow-400' },
    { name: 'Processing Speed', value: 156.3, trend: '+12.8%', color: 'text-orange-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(prev => {
        const newActivity = Math.sin(Date.now() * 0.001) * 30 + 70;
        return Math.max(40, Math.min(100, newActivity));
      });

      if (learningMode) {
        setProcessingNodes(prev => {
          const variation = Math.floor(Math.random() * 20 - 10);
          return Math.max(32, Math.min(128, prev + variation));
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [learningMode]);

  // Neural network visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawNeuralNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      // Draw neural connections
      ctx.strokeStyle = `rgba(64, 224, 255, ${neuralActivity / 200})`;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < processingNodes; i++) {
        const angle1 = (i / processingNodes) * Math.PI * 2;
        const angle2 = ((i + 1) % processingNodes / processingNodes) * Math.PI * 2;
        
        const x1 = centerX + Math.cos(angle1) * radius;
        const y1 = centerY + Math.sin(angle1) * radius;
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = centerY + Math.sin(angle2) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      // Draw nodes
      for (let i = 0; i < processingNodes; i++) {
        const angle = (i / processingNodes) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const nodeActivity = Math.sin(Date.now() * 0.002 + i * 0.1) * 0.5 + 0.5;
        const nodeSize = 2 + nodeActivity * 3;
        
        ctx.fillStyle = `hsl(${180 + i * 2}, 70%, ${50 + nodeActivity * 30}%)`;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      drawNeuralNetwork();
      requestAnimationFrame(animate);
    };

    canvas.width = 400;
    canvas.height = 400;
    animate();
  }, [neuralActivity, processingNodes]);

  const currentLayer = networkLayers[activeLayer];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Advanced3DBackground />
      
      <EnhancedNavigation 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <div className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ 
                rotateX: [0, 360],
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotateX: { duration: 20, repeat: Infinity, ease: "linear" },
                rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Brain size={64} className="text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight font-primary">
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                NEURAL
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-accent">
              MATRIX
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-modern">
              Advanced artificial intelligence framework featuring deep learning architectures, 
              cognitive processing modules, and adaptive neural network optimization
            </p>

            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{neuralActivity.toFixed(1)}%</div>
                <div className="text-gray-400 text-sm">Neural Activity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{processingNodes}</div>
                <div className="text-gray-400 text-sm">Active Nodes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">5</div>
                <div className="text-gray-400 text-sm">Network Layers</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLearningMode(!learningMode)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 mx-auto"
            >
              {learningMode ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Activity size={24} />
                </motion.div>
              ) : (
                <Brain size={24} />
              )}
              <span>{learningMode ? 'Learning Active' : 'Activate Learning'}</span>
            </motion.button>
          </motion.div>

          {/* Neural Network Visualization */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12 font-accent">NETWORK ARCHITECTURE</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Layer Navigation */}
              <div className="space-y-4">
                {networkLayers.map((layer, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveLayer(index)}
                    className={`
                      w-full text-left p-6 rounded-2xl transition-all
                      ${activeLayer === index 
                        ? `bg-gradient-to-r ${layer.color} text-white shadow-2xl` 
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold font-mono">{layer.name}</h4>
                      <div className="text-sm opacity-75">{layer.nodes} nodes</div>
                    </div>
                    <div className="text-sm opacity-90">{layer.type}</div>
                    <div className="mt-2 text-xs opacity-75">{layer.description}</div>
                  </motion.button>
                ))}
              </div>

              {/* Network Visualization */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2 font-mono">{currentLayer.name}</h4>
                  <p className="text-purple-400">{currentLayer.type}</p>
                </div>

                <div className="flex justify-center mb-6">
                  <canvas 
                    ref={canvasRef}
                    className="border border-purple-500/20 rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">{currentLayer.performance}%</div>
                    <div className="text-gray-400 text-sm">Performance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{currentLayer.throughput}</div>
                    <div className="text-gray-400 text-sm">Throughput</div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Activation Function</div>
                  <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg inline-block font-mono">
                    {currentLayer.activation}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cognitive Modules */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12 font-accent">COGNITIVE MODULES</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cognitiveModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white font-mono">{module.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      module.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                      module.status === 'OPTIMIZING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {module.status}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm">{module.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Accuracy</span>
                      <span className="text-white font-bold">{module.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${module.accuracy}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-2">Submodules</div>
                    <div className="space-y-1">
                      {module.submodules.map((sub, subIndex) => (
                        <div key={subIndex} className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Learning Metrics */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12 font-accent">LEARNING ANALYTICS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/50"
                >
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                      {typeof metric.value === 'number' ? metric.value.toFixed(3) : metric.value}
                    </div>
                    <div className="text-gray-300 text-sm mb-2">{metric.name}</div>
                    <div className="text-gray-400 text-xs">
                      Trend: <span className={metric.color}>{metric.trend}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Neural Command Center */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30"
          >
            <h3 className="text-4xl font-bold text-white mb-6 font-accent">AI COMMAND CENTER</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Advanced neural processing capabilities featuring adaptive learning algorithms, 
              real-time optimization, and comprehensive cognitive architecture management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg"
              >
                Access Neural Console
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-purple-400 text-purple-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-400 hover:text-black transition-all"
              >
                Download Learning Models
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}