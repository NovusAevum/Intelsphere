import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Database, Cpu, Activity, BarChart, Settings, Play, Download, ExternalLink, RefreshCw, Target } from 'lucide-react';

export default function QuantumLab() {
  const [quantumState, setQuantumState] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [entanglement, setEntanglement] = useState(75);
  const [isRunningExperiment, setIsRunningExperiment] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [experimentResults, setExperimentResults] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumState(Math.random() * 100);
      setEntanglement(70 + Math.random() * 25);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quantumMetrics = [
    { label: 'Qubit Coherence', value: '99.7%', status: 'stable' },
    { label: 'Gate Fidelity', value: '99.2%', status: 'optimal' },
    { label: 'Decoherence Time', value: '150µs', status: 'good' },
    { label: 'Error Rate', value: '0.08%', status: 'low' }
  ];

  const experiments = [
    {
      name: 'Quantum Supremacy Test',
      qubits: 70,
      gates: 430,
      progress: 87,
      status: 'Running',
      description: 'Testing quantum advantage over classical computers'
    },
    {
      name: 'Shor\'s Algorithm',
      qubits: 15,
      gates: 89,
      progress: 100,
      status: 'Complete',
      description: 'Integer factorization using quantum computing'
    },
    {
      name: 'Grover\'s Search',
      qubits: 10,
      gates: 156,
      progress: 45,
      status: 'Testing',
      description: 'Quantum database search optimization'
    },
    {
      name: 'Quantum ML Model',
      qubits: 25,
      gates: 267,
      progress: 62,
      status: 'Training',
      description: 'Quantum machine learning algorithm development'
    }
  ];

  const algorithms = [
    { name: 'Quantum Fourier Transform', complexity: 'O(n²)', applications: 'Cryptography, Signal Processing' },
    { name: 'Variational Quantum Eigensolver', complexity: 'O(n³)', applications: 'Chemistry, Optimization' },
    { name: 'Quantum Approximate Optimization', complexity: 'O(n log n)', applications: 'Logistics, Finance' },
    { name: 'Quantum Neural Networks', complexity: 'O(n²)', applications: 'AI, Pattern Recognition' }
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              QUANTUM LAB
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Quantum computing research and advanced computational experiments
          </p>
        </motion.div>

        {/* Quantum State Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Quantum State Monitor</h2>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Quantum System Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {quantumMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/30 rounded-xl p-4 border border-purple-500/20"
              >
                <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  metric.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                  metric.status === 'stable' ? 'bg-blue-500/20 text-blue-400' :
                  metric.status === 'good' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {metric.status}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quantum Visualization */}
          <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4">Quantum State Visualization</h3>
            <div className="relative h-60 flex items-center justify-center">
              {/* Central Quantum Core */}
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Orbiting Qubits */}
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-cyan-400 rounded-full"
                  animate={{
                    x: Math.cos(Date.now() * 0.001 + i * 0.785) * 80,
                    y: Math.sin(Date.now() * 0.001 + i * 0.785) * 80,
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
              
              {/* Entanglement Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + Math.cos(i * 1.57) * 30}%`}
                    y2={`${50 + Math.sin(i * 1.57) * 30}%`}
                    stroke="rgba(139, 92, 246, 0.6)"
                    strokeWidth="2"
                    animate={{
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Active Experiments */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Active Quantum Experiments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiments.map((experiment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{experiment.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    experiment.status === 'Complete' ? 'bg-green-500/20 text-green-400' :
                    experiment.status === 'Running' ? 'bg-blue-500/20 text-blue-400' :
                    experiment.status === 'Training' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {experiment.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{experiment.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Qubits</div>
                    <div className="text-lg font-semibold text-cyan-400">{experiment.qubits}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Gates</div>
                    <div className="text-lg font-semibold text-pink-400">{experiment.gates}</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-purple-400">{experiment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${experiment.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quantum Algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Quantum Algorithms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {algorithms.map((algorithm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{algorithm.name}</h3>
                <div className="text-sm text-purple-400 mb-2">Complexity: {algorithm.complexity}</div>
                <div className="text-sm text-gray-300">Applications: {algorithm.applications}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quantum Computing Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Quantum Research Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-purple-400 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1,000x
              </motion.div>
              <div className="text-gray-300">Speedup Achievement</div>
              <div className="text-sm text-gray-500 mt-2">Over Classical Computing</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-cyan-400 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                50+
              </motion.div>
              <div className="text-gray-300">Quantum Algorithms</div>
              <div className="text-sm text-gray-500 mt-2">Developed & Optimized</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-pink-400 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                99.7%
              </motion.div>
              <div className="text-gray-300">Quantum Fidelity</div>
              <div className="text-sm text-gray-500 mt-2">State Preparation Accuracy</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsRunningExperiment(true);
                setTimeout(() => {
                  setIsRunningExperiment(false);
                  setExperimentResults(prev => [...prev, {
                    id: Date.now(),
                    name: 'Quantum Supremacy Test',
                    qubits: 70,
                    fidelity: 99.2 + Math.random() * 0.5,
                    time: new Date().toISOString()
                  }]);
                }, 5000);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <Atom size={20} />
              <span>{isRunningExperiment ? 'Running Experiment...' : 'Start Quantum Experiment'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsCalibrating(true);
                setTimeout(() => {
                  setIsCalibrating(false);
                  setEntanglement(95 + Math.random() * 5);
                }, 3000);
              }}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all flex items-center space-x-2"
            >
              <Settings size={20} />
              <span>{isCalibrating ? 'Calibrating...' : 'Calibrate Qubits'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const quantumData = `
Quantum Computing Lab Results - ${new Date().toISOString()}

System Configuration:
- Quantum Processor: 70-qubit superconducting quantum computer
- Operating Temperature: 15 millikelvin
- Coherence Time: 150 microseconds
- Gate Fidelity: 99.2%

Current Quantum State:
- Entanglement Level: ${entanglement.toFixed(1)}%
- Qubit Coherence: 99.7%
- Error Rate: 0.08%
- Decoherence Time: 150µs

Experiment Results:
${experimentResults.map(result => 
  `- ${result.name}: ${result.qubits} qubits, ${result.fidelity.toFixed(2)}% fidelity (${result.time})`
).join('\n')}

Quantum Algorithms Tested:
- Shor's Algorithm: Integer factorization
- Grover's Search: Database optimization
- Quantum Supremacy: Computational advantage
- QAOA: Optimization problems
                `;
                const blob = new Blob([quantumData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `quantum-lab-results-${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Export Results</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://qiskit.org/documentation/', '_blank')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
            >
              <ExternalLink size={20} />
              <span>Qiskit Docs</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}