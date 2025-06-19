import { useState, useEffect } from "react";
import { Brain, Activity, Cpu, Zap, Network, Database, TrendingUp, Settings } from "lucide-react";

interface NeuralNode {
  id: string;
  layer: number;
  position: { x: number; y: number };
  activation: number;
  type: 'input' | 'hidden' | 'output';
  connections: string[];
}

interface NetworkStats {
  accuracy: number;
  loss: number;
  epochs: number;
  learningRate: number;
  batchSize: number;
  trainingTime: string;
}

export default function NeuralNetwork() {
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    accuracy: 0,
    loss: 0,
    epochs: 0,
    learningRate: 0.001,
    batchSize: 32,
    trainingTime: "00:00:00"
  });

  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [selectedModel, setSelectedModel] = useState("transformer");

  useEffect(() => {
    // Initialize neural network visualization
    initializeNetwork();
    
    // Simulate training metrics
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        accuracy: Math.min(99.9, prev.accuracy + Math.random() * 0.1),
        loss: Math.max(0.001, prev.loss - Math.random() * 0.01),
        epochs: prev.epochs + 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const initializeNetwork = () => {
    const nodes: NeuralNode[] = [];
    const layers = [8, 16, 16, 8, 3]; // Network architecture
    
    layers.forEach((nodeCount, layerIndex) => {
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          id: `${layerIndex}-${i}`,
          layer: layerIndex,
          position: {
            x: (layerIndex * 200) + 100,
            y: (i * 60) + 100
          },
          activation: Math.random(),
          type: layerIndex === 0 ? 'input' : layerIndex === layers.length - 1 ? 'output' : 'hidden',
          connections: []
        });
      }
    });

    setNeuralNodes(nodes);
    
    // Animate accuracy and loss
    setNetworkStats({
      accuracy: 95.8,
      loss: 0.042,
      epochs: 1250,
      learningRate: 0.001,
      batchSize: 32,
      trainingTime: "02:45:33"
    });
  };

  const neuralModels = [
    { id: "transformer", name: "Transformer", accuracy: 98.5, layers: 24 },
    { id: "cnn", name: "Convolutional Neural Network", accuracy: 97.2, layers: 18 },
    { id: "rnn", name: "Recurrent Neural Network", accuracy: 96.8, layers: 12 },
    { id: "gpt", name: "GPT Architecture", accuracy: 99.1, layers: 96 }
  ];

  const trainingMetrics = [
    { name: "Training Accuracy", value: networkStats.accuracy.toFixed(2) + "%", color: "text-green-400" },
    { name: "Validation Loss", value: networkStats.loss.toFixed(4), color: "text-blue-400" },
    { name: "Learning Rate", value: networkStats.learningRate.toString(), color: "text-purple-400" },
    { name: "Batch Size", value: networkStats.batchSize.toString(), color: "text-orange-400" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-mono">
            NEURAL NETWORK LAB
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Advanced neural architecture research and development facility with real-time training monitoring
          </p>
        </div>

        {/* Training Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {trainingMetrics.map((metric, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Brain className={`w-8 h-8 ${metric.color}`} />
                <div className={`text-2xl font-bold ${metric.color} font-mono`}>{metric.value}</div>
              </div>
              <div className="text-sm text-gray-400 font-mono">{metric.name}</div>
            </div>
          ))}
        </div>

        {/* Neural Network Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Network Architecture */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-6 font-mono">NETWORK ARCHITECTURE</h3>
            
            {/* Layer Visualization */}
            <div className="space-y-6">
              {['Input Layer', 'Hidden Layer 1', 'Hidden Layer 2', 'Hidden Layer 3', 'Output Layer'].map((layer, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-gray-400 font-mono">{layer}</div>
                  <div className="flex-1 flex space-x-2">
                    {[...Array(index === 0 ? 8 : index === 4 ? 3 : 16)].map((_, nodeIndex) => (
                      <div
                        key={nodeIndex}
                        className={`w-4 h-4 rounded-full border-2 ${
                          index === 0 ? 'border-cyan-400 bg-cyan-400/20' :
                          index === 4 ? 'border-green-400 bg-green-400/20' :
                          'border-purple-400 bg-purple-400/20'
                        } animate-pulse`}
                        style={{ animationDelay: `${nodeIndex * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {index === 0 ? '8 nodes' : index === 4 ? '3 nodes' : '16 nodes'}
                  </div>
                </div>
              ))}
            </div>

            {/* Network Stats */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Parameters:</span>
                  <span className="text-purple-400 ml-2 font-mono">2.1M</span>
                </div>
                <div>
                  <span className="text-gray-400">FLOPS:</span>
                  <span className="text-purple-400 ml-2 font-mono">1.2G</span>
                </div>
                <div>
                  <span className="text-gray-400">Memory Usage:</span>
                  <span className="text-purple-400 ml-2 font-mono">4.8GB</span>
                </div>
                <div>
                  <span className="text-gray-400">Training Time:</span>
                  <span className="text-purple-400 ml-2 font-mono">{networkStats.trainingTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Training Progress */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">TRAINING PROGRESS</h3>
            
            {/* Accuracy Graph Simulation */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-400 font-mono">Accuracy</span>
                <span className="text-green-400 font-mono">{networkStats.accuracy.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${networkStats.accuracy}%` }}
                ></div>
              </div>
            </div>

            {/* Loss Graph Simulation */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-400 font-mono">Loss</span>
                <span className="text-blue-400 font-mono">{networkStats.loss.toFixed(4)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(1 - networkStats.loss) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Epoch Counter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-400 font-mono">Epochs</span>
                <span className="text-purple-400 font-mono">{networkStats.epochs}/2000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(networkStats.epochs / 2000) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Training Controls */}
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsTraining(!isTraining)}
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                  isTraining 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}
              >
                {isTraining ? 'STOP TRAINING' : 'START TRAINING'}
              </button>
              <button className="px-6 py-3 rounded-lg bg-gray-700/50 text-gray-400 hover:text-cyan-400 font-mono text-sm transition-all duration-300">
                RESET MODEL
              </button>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-orange-400 mb-6 font-mono">NEURAL ARCHITECTURES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neuralModels.map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`cursor-pointer bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                  selectedModel === model.id 
                    ? 'border-orange-500/50 bg-orange-500/10' 
                    : 'border-gray-700/50 hover:border-orange-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Network className="w-8 h-8 text-orange-400" />
                  <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-mono">
                    {model.accuracy}%
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-mono">{model.name}</h4>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>Layers: {model.layers}</div>
                  <div>Accuracy: {model.accuracy}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4 font-mono">PERFORMANCE METRICS</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Precision:</span>
                <span className="text-green-400 font-mono">0.968</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recall:</span>
                <span className="text-green-400 font-mono">0.952</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">F1-Score:</span>
                <span className="text-green-400 font-mono">0.960</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-cyan-400 mb-4 font-mono">HARDWARE UTILIZATION</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">GPU Usage:</span>
                <span className="text-cyan-400 font-mono">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Memory:</span>
                <span className="text-cyan-400 font-mono">6.2/8GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Temperature:</span>
                <span className="text-cyan-400 font-mono">76°C</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono">OPTIMIZATION</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Optimizer:</span>
                <span className="text-purple-400 font-mono">AdamW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Scheduler:</span>
                <span className="text-purple-400 font-mono">CosineAnneal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Regularization:</span>
                <span className="text-purple-400 font-mono">L2 + Dropout</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}