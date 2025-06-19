import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Zap, Activity, BarChart3, Settings, Play, Download, ExternalLink, RefreshCw } from 'lucide-react';

export default function NeuralNet() {
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(98.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(Math.random() * 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const networkLayers = [
    { name: 'Input Layer', nodes: 784, color: 'from-blue-400 to-cyan-400' },
    { name: 'Hidden Layer 1', nodes: 256, color: 'from-purple-400 to-pink-400' },
    { name: 'Hidden Layer 2', nodes: 128, color: 'from-green-400 to-emerald-400' },
    { name: 'Hidden Layer 3', nodes: 64, color: 'from-yellow-400 to-orange-400' },
    { name: 'Output Layer', nodes: 10, color: 'from-red-400 to-rose-400' }
  ];

  const metrics = [
    { label: 'Training Accuracy', value: '98.7%', change: '+2.3%' },
    { label: 'Validation Loss', value: '0.023', change: '-0.005' },
    { label: 'Learning Rate', value: '0.001', change: 'stable' },
    { label: 'Epochs', value: '1,247', change: '+47' }
  ];

  const aiModels = [
    {
      name: 'Vision Transformer',
      type: 'Computer Vision',
      accuracy: 97.8,
      status: 'Training',
      description: 'Advanced image recognition and classification'
    },
    {
      name: 'BERT-Large',
      type: 'Natural Language',
      accuracy: 95.2,
      status: 'Active',
      description: 'Text understanding and sentiment analysis'
    },
    {
      name: 'GPT-4 Fine-tune',
      type: 'Language Model',
      accuracy: 98.9,
      status: 'Deployed',
      description: 'Custom conversational AI for specialized tasks'
    },
    {
      name: 'ResNet-152',
      type: 'Deep Learning',
      accuracy: 94.6,
      status: 'Testing',
      description: 'Advanced neural network for pattern recognition'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NEURAL NETWORK
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Advanced AI neural network visualization and machine learning model analytics
          </p>
        </motion.div>

        {/* Neural Activity Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Neural Activity Monitor</h2>
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${isProcessing ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-gray-300">{isProcessing ? 'Processing' : 'Idle'}</span>
              <button
                onClick={() => setIsProcessing(!isProcessing)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-blue-400 transition-all"
              >
                <Play size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/30 rounded-xl p-4 border border-gray-700/50"
              >
                <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : metric.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                  {metric.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Neural Activity Graph */}
          <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4">Real-time Neural Activity</h3>
            <div className="h-40 flex items-end space-x-2">
              {Array.from({ length: 50 }, (_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-purple-500 to-cyan-400 rounded-t"
                  style={{ width: '6px' }}
                  animate={{
                    height: `${Math.random() * 100 + 20}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Network Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Network Architecture</h2>
          
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {networkLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className={`w-20 h-32 bg-gradient-to-b ${layer.color} rounded-lg mb-4 relative overflow-hidden`}>
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      {Array.from({ length: Math.min(layer.nodes / 50, 8) }, (_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-white/80 rounded-full mb-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white">{layer.name}</div>
                  <div className="text-xs text-gray-400">{layer.nodes} nodes</div>
                  
                  {index < networkLayers.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2">
                      <motion.div
                        className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Models */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Active AI Models</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{model.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    model.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    model.status === 'Training' ? 'bg-blue-500/20 text-blue-400' :
                    model.status === 'Deployed' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {model.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-400 mb-2">{model.type}</div>
                <p className="text-gray-300 mb-4">{model.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Accuracy</span>
                    <span className="text-sm text-cyan-400">{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.accuracy}%` }}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Model Training Console */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Training Console</h2>
          
          <div className="bg-black/60 rounded-xl p-6 font-mono text-sm">
            <div className="text-green-400 mb-2">[INFO] Neural network training initiated...</div>
            <div className="text-blue-400 mb-2">[DEBUG] Loading dataset: 60,000 samples</div>
            <div className="text-yellow-400 mb-2">[WARN] GPU memory usage: 87%</div>
            <div className="text-green-400 mb-2">[INFO] Epoch 1247/2000 - Loss: 0.023 - Accuracy: 98.7%</div>
            <div className="text-cyan-400 mb-2">[METRICS] Learning rate adjusted: 0.001</div>
            <div className="text-purple-400 mb-2">[MODEL] Validation accuracy improved: +2.3%</div>
            <div className="text-green-400">[STATUS] Training in progress... ETA: 2h 15m</div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsInitializing(true);
                setTimeout(() => {
                  setIsInitializing(false);
                  setIsTraining(true);
                  setTimeout(() => {
                    setIsTraining(false);
                    setModelAccuracy(prev => Math.min(99.9, prev + Math.random() * 2));
                  }, 3000);
                }, 2000);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <Brain size={20} />
              <span>{isInitializing ? 'Initializing...' : isTraining ? 'Training...' : 'Start Training'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const modelData = `Neural Network Model Export - ${new Date().toISOString()}

Architecture: Deep Learning Multi-Layer Perceptron
Input Layer: 784 neurons
Hidden Layers: 256, 128, 64 neurons
Output Layer: 10 neurons
Training Accuracy: ${modelAccuracy.toFixed(2)}%
Validation Loss: 0.023
Learning Rate: 0.001
Total Parameters: ${(784*256 + 256*128 + 128*64 + 64*10).toLocaleString()}
Training Dataset: ImageNet-derived samples
Optimizer: Adam with weight decay
Activation Functions: ReLU (hidden), Softmax (output)`;
                
                const blob = new Blob([modelData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'neural-network-model-export.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Export Model</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://www.tensorflow.org/tutorials', '_blank')}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all flex items-center space-x-2"
            >
              <ExternalLink size={20} />
              <span>TensorFlow Docs</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}