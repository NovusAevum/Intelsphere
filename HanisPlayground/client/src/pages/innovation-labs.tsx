import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, Atom, Dna, Eye, Brain, Rocket, Globe, 
  Shield, Lock, Code, Database, Network, Server,
  ChevronRight, Play, Pause, RotateCcw, Maximize
} from 'lucide-react';
import Advanced3DBackground from '../components/advanced-3d-background';
import EnhancedNavigation from '../components/enhanced-navigation';

export default function InnovationLabs() {
  const [currentSection, setCurrentSection] = useState('innovation-labs');
  const [activeProject, setActiveProject] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState({
    quantumBits: 512,
    entangledPairs: 256,
    coherenceTime: '2.3ms',
    fidelity: 99.7,
    errorRate: 0.003
  });

  const projects = [
    {
      id: 'quantum-ai',
      title: 'Quantum-Enhanced AI Processing',
      subtitle: 'Next-Generation Computational Intelligence',
      description: 'Revolutionary quantum computing algorithms that enhance AI processing capabilities by 10,000x traditional methods.',
      category: 'Quantum Computing',
      status: 'Active Development',
      progress: 87,
      team: ['Dr. Sarah Chen', 'Prof. Marcus Webb', 'Dr. Aisha Patel'],
      technologies: ['Quantum Circuits', 'Tensor Networks', 'Error Correction', 'Quantum ML'],
      metrics: {
        'Quantum Volume': '2^20',
        'Gate Fidelity': '99.9%',
        'Coherence Time': '150μs',
        'Error Rate': '0.1%'
      },
      timeline: '2024-2026',
      funding: '$50M',
      applications: [
        'Drug Discovery Acceleration',
        'Financial Risk Modeling',
        'Climate Simulation',
        'Cryptographic Analysis'
      ]
    },
    {
      id: 'neural-fusion',
      title: 'Bio-Neural Interface Matrix',
      subtitle: 'Human-AI Consciousness Bridge',
      description: 'Direct neural interface technology enabling seamless human-AI collaboration through biological computing substrates.',
      category: 'Biocomputing',
      status: 'Prototype Phase',
      progress: 63,
      team: ['Dr. Elena Rodriguez', 'Dr. James Park', 'Prof. Lisa Zhang'],
      technologies: ['Organic Processors', 'Neural Mesh', 'Synaptic Simulation', 'Bio-Integration'],
      metrics: {
        'Neural Bandwidth': '10 Tbps',
        'Response Time': '0.1ms',
        'Bio-Compatibility': '99.8%',
        'Efficiency Gain': '500%'
      },
      timeline: '2025-2028',
      funding: '$75M',
      applications: [
        'Enhanced Cognitive Abilities',
        'Real-time Language Translation',
        'Medical Diagnostics',
        'Augmented Reality Integration'
      ]
    },
    {
      id: 'molecular-assembly',
      title: 'Programmable Matter Systems',
      subtitle: 'Self-Assembling Smart Materials',
      description: 'Molecular-scale manufacturing systems capable of assembling any designed structure from basic atomic components.',
      category: 'Nanotechnology',
      status: 'Research Phase',
      progress: 45,
      team: ['Dr. Robert Kim', 'Prof. Maria Santos', 'Dr. Ahmed Hassan'],
      technologies: ['Molecular Motors', 'Self-Assembly', 'Atomic Precision', 'Smart Materials'],
      metrics: {
        'Assembly Speed': '10^6 atoms/sec',
        'Precision': '0.1 Angstrom',
        'Success Rate': '94.2%',
        'Energy Efficiency': '98.5%'
      },
      timeline: '2026-2030',
      funding: '$100M',
      applications: [
        'Space Construction',
        'Medical Implants',
        'Environmental Cleanup',
        'Advanced Computing'
      ]
    },
    {
      id: 'consciousness-ai',
      title: 'Synthetic Consciousness Engine',
      subtitle: 'Artificial General Intelligence Core',
      description: 'Development of true artificial consciousness with self-awareness, creativity, and emotional intelligence capabilities.',
      category: 'AI Consciousness',
      status: 'Theoretical Framework',
      progress: 28,
      team: ['Dr. Catherine Liu', 'Prof. David Anderson', 'Dr. Yuki Tanaka'],
      technologies: ['Consciousness Models', 'Emotion Simulation', 'Self-Reflection', 'Creative AI'],
      metrics: {
        'Consciousness Score': '0.73/1.0',
        'Emotional Range': '127 states',
        'Creativity Index': '89%',
        'Self-Awareness': '82%'
      },
      timeline: '2027-2035',
      funding: '$200M',
      applications: [
        'Advanced Problem Solving',
        'Creative Content Generation',
        'Emotional Support Systems',
        'Scientific Discovery'
      ]
    }
  ];

  const labFacilities = [
    {
      name: 'Quantum Research Facility',
      location: 'Building Alpha - Level 7',
      equipment: 'IBM Q System One, Google Sycamore, Ion Trap Systems',
      capacity: '50 Researchers',
      security: 'Level 9 Clearance Required'
    },
    {
      name: 'Bio-Neural Laboratory',
      location: 'Building Beta - Level 5',
      equipment: 'Organic Computing Arrays, Neural Mesh Fabricators',
      capacity: '30 Researchers',
      security: 'Biometric Access Only'
    },
    {
      name: 'Molecular Assembly Lab',
      location: 'Building Gamma - Level 3',
      equipment: 'Atomic Force Microscopes, Molecular Assemblers',
      capacity: '25 Researchers',
      security: 'Clean Room Protocol'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSimulating) {
        setSimulationData(prev => ({
          quantumBits: prev.quantumBits + Math.floor(Math.random() * 10 - 5),
          entangledPairs: prev.entangledPairs + Math.floor(Math.random() * 8 - 4),
          coherenceTime: `${(2.3 + (Math.random() - 0.5) * 0.2).toFixed(1)}ms`,
          fidelity: Math.max(95, Math.min(100, prev.fidelity + (Math.random() - 0.5) * 0.5)),
          errorRate: Math.max(0.001, Math.min(0.01, prev.errorRate + (Math.random() - 0.5) * 0.002))
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const currentProject = projects[activeProject];

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
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Atom size={64} className="text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                INNOVATION
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              LABORATORIES
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Pioneering the future through quantum computing, bio-neural interfaces, 
              molecular assembly, and consciousness engineering
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSimulating(!isSimulating)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
              >
                {isSimulating ? <Pause size={20} /> : <Play size={20} />}
                <span>{isSimulating ? 'Stop Simulation' : 'Start Quantum Simulation'}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Live Simulation Dashboard */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-20"
              >
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Live Quantum Simulation</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400">{simulationData.quantumBits}</div>
                      <div className="text-gray-300 text-sm">Quantum Bits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">{simulationData.entangledPairs}</div>
                      <div className="text-gray-300 text-sm">Entangled Pairs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">{simulationData.coherenceTime}</div>
                      <div className="text-gray-300 text-sm">Coherence Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">{simulationData.fidelity.toFixed(1)}%</div>
                      <div className="text-gray-300 text-sm">Fidelity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{(simulationData.errorRate * 100).toFixed(3)}%</div>
                      <div className="text-gray-300 text-sm">Error Rate</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProject(index)}
                  className={`
                    px-6 py-3 rounded-lg font-bold transition-all
                    ${activeProject === index 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }
                  `}
                >
                  {project.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Project Details */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-600/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Info */}
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <Rocket size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{currentProject.title}</h3>
                      <p className="text-cyan-400 text-lg">{currentProject.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    {currentProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-gray-400 text-sm">Category</div>
                      <div className="text-white font-bold">{currentProject.category}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Status</div>
                      <div className="text-green-400 font-bold">{currentProject.status}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Timeline</div>
                      <div className="text-white font-bold">{currentProject.timeline}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Funding</div>
                      <div className="text-yellow-400 font-bold">{currentProject.funding}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Development Progress</span>
                      <span className="text-white font-bold">{currentProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentProject.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Team */}
                  <div className="mb-6">
                    <div className="text-gray-400 text-sm mb-2">Research Team</div>
                    <div className="space-y-1">
                      {currentProject.team.map((member, index) => (
                        <div key={index} className="text-white">{member}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-white mb-4">Core Technologies</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {currentProject.technologies.map((tech, index) => (
                        <div key={index} className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-lg text-sm text-center">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-white mb-4">Performance Metrics</h4>
                    <div className="space-y-3">
                      {Object.entries(currentProject.metrics).map(([metric, value]) => (
                        <div key={metric} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-gray-300">{metric}</span>
                          <span className="text-cyan-400 font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Applications</h4>
                    <div className="space-y-2">
                      {currentProject.applications.map((app, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <ChevronRight size={16} className="text-green-400" />
                          <span className="text-gray-300">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Laboratory Facilities */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-white text-center mb-12">Research Facilities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {labFacilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Server className="text-purple-400" size={24} />
                    <h4 className="text-xl font-bold text-white">{facility.name}</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Location: </span>
                      <span className="text-white">{facility.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Equipment: </span>
                      <span className="text-gray-300">{facility.equipment}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Capacity: </span>
                      <span className="text-cyan-400">{facility.capacity}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Security: </span>
                      <span className="text-yellow-400">{facility.security}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30"
          >
            <h3 className="text-4xl font-bold text-white mb-6">Join the Research Initiative</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Collaborate with leading scientists and engineers to shape the future of technology 
              and human advancement through cutting-edge research and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg"
              >
                Apply for Research Position
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-purple-400 text-purple-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-400 hover:text-black transition-all"
              >
                View Open Projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}