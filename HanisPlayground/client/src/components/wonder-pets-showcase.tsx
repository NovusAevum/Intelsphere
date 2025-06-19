import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Shield, TrendingUp, Database, Network, Activity, 
  Zap, Target, Users, Award, Star, Globe, Cpu, Eye,
  ChevronRight, Play, Pause, Volume2, Settings
} from 'lucide-react';

interface WonderPet {
  id: string;
  name: string;
  title: string;
  specialization: string;
  avatar: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  icon: any;
  stats: {
    missions: number;
    successRate: number;
    expertise: number;
    innovation: number;
  };
  capabilities: string[];
  achievements: string[];
  currentMission: string;
  isActive: boolean;
  performance: {
    label: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export default function WonderPetsShowcase() {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wonderPets: WonderPet[] = [
    {
      id: 'linny',
      name: 'Linny',
      title: 'Strategic Intelligence Commander',
      specialization: 'Advanced OSINT & Reconnaissance',
      avatar: '🐹',
      color: 'cyan',
      bgGradient: 'from-cyan-500 via-blue-500 to-purple-600',
      borderColor: 'border-cyan-400',
      icon: Shield,
      stats: {
        missions: 1247,
        successRate: 98.7,
        expertise: 96,
        innovation: 94
      },
      capabilities: [
        'Digital Footprint Analysis',
        'Social Engineering Detection',
        'Threat Intelligence Gathering',
        'Corporate Espionage Prevention',
        'Real-time Surveillance Systems',
        'Advanced Pattern Recognition',
        'Behavioral Analytics',
        'Geospatial Intelligence'
      ],
      achievements: [
        'Thwarted 47 major security breaches',
        'Developed proprietary OSINT framework',
        'Trained 200+ intelligence operatives',
        'Created automated threat detection system'
      ],
      currentMission: 'Global threat landscape analysis for Fortune 500 client',
      isActive: true,
      performance: [
        { label: 'Threat Detection', value: 98, trend: 'up' },
        { label: 'Data Processing', value: 94, trend: 'stable' },
        { label: 'Response Time', value: 97, trend: 'up' },
        { label: 'Accuracy Rate', value: 99, trend: 'up' }
      ]
    },
    {
      id: 'tuck',
      name: 'Tuck',
      title: 'Elite AI Systems Architect',
      specialization: 'Neural Networks & Machine Learning',
      avatar: '🐢',
      color: 'green',
      bgGradient: 'from-green-500 via-emerald-500 to-teal-600',
      borderColor: 'border-green-400',
      icon: Brain,
      stats: {
        missions: 892,
        successRate: 96.2,
        expertise: 98,
        innovation: 97
      },
      capabilities: [
        'Deep Learning Architecture',
        'Neural Network Optimization',
        'Quantum Computing Integration',
        'Autonomous System Development',
        'Real-time Model Training',
        'Computer Vision Systems',
        'Natural Language Processing',
        'Predictive Analytics Engine'
      ],
      achievements: [
        'Built 15 production AI models',
        'Achieved 99.7% accuracy in image recognition',
        'Reduced processing time by 300%',
        'Published 12 research papers'
      ],
      currentMission: 'Developing next-generation AGI framework',
      isActive: true,
      performance: [
        { label: 'Model Accuracy', value: 99, trend: 'up' },
        { label: 'Processing Speed', value: 95, trend: 'up' },
        { label: 'Innovation Index', value: 97, trend: 'stable' },
        { label: 'Deployment Success', value: 96, trend: 'up' }
      ]
    },
    {
      id: 'mingming',
      name: 'Ming-Ming',
      title: 'Digital Marketing Strategist',
      specialization: 'Performance Marketing & Growth Hacking',
      avatar: '🦆',
      color: 'pink',
      bgGradient: 'from-pink-500 via-rose-500 to-red-600',
      borderColor: 'border-pink-400',
      icon: TrendingUp,
      stats: {
        missions: 567,
        successRate: 94.8,
        expertise: 95,
        innovation: 93
      },
      capabilities: [
        'Google Ads Optimization',
        'Social Media Strategy',
        'Conversion Rate Optimization',
        'Growth Hacking Techniques',
        'Customer Journey Mapping',
        'Marketing Automation',
        'Influencer Partnerships',
        'Revenue Attribution Modeling'
      ],
      achievements: [
        'Generated $2.5M in revenue',
        '300% ROI improvement across campaigns',
        'Reduced CAC by 60%',
        'Scaled 25+ successful campaigns'
      ],
      currentMission: 'Launching viral marketing campaign for tech startup',
      isActive: true,
      performance: [
        { label: 'ROI Generation', value: 98, trend: 'up' },
        { label: 'Campaign Success', value: 94, trend: 'stable' },
        { label: 'Lead Quality', value: 96, trend: 'up' },
        { label: 'Conversion Rate', value: 92, trend: 'up' }
      ]
    }
  ];

  // Advanced canvas animation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: ['#00f5ff', '#ff1493', '#00ff00'][Math.floor(Math.random() * 3)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            if (distance < 100) {
              ctx.globalAlpha = (100 - distance) / 100 * 0.2;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isPlaying]);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return '↗️';
    if (trend === 'down') return '↘️';
    return '➡️';
  };

  const selectedPetData = wonderPets.find(pet => pet.id === selectedPet);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Advanced Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />

      {/* Control Panel */}
      <div className="absolute top-6 right-6 z-50 flex items-center space-x-4">
        <div className="bg-black/80 backdrop-blur-lg rounded-lg px-4 py-2 border border-gray-700/50">
          <span className="text-cyan-400 font-mono text-sm">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white p-3 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all">
          <Settings size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              WONDER PETS ELITE TEAM
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Advanced Intelligence Operatives • Strategic Mission Specialists • Elite Performance Team
          </p>
          
          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-cyan-400">3</div>
              <div className="text-gray-300">Elite Agents</div>
              <div className="text-sm text-cyan-300">All Active</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-green-400">2,706</div>
              <div className="text-gray-300">Missions Completed</div>
              <div className="text-sm text-green-300">96.5% Success Rate</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-purple-400">$2.5M</div>
              <div className="text-gray-300">Value Generated</div>
              <div className="text-sm text-purple-300">This Quarter</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-gray-300">Operations</div>
              <div className="text-sm text-yellow-300">Global Coverage</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Wonder Pets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {wonderPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
              onClick={() => setSelectedPet(pet.id)}
              className={`
                relative cursor-pointer bg-gradient-to-br from-gray-900/50 to-black/50 
                backdrop-blur-lg border-2 ${pet.borderColor} rounded-3xl p-8 
                hover:shadow-2xl transition-all duration-500 group
              `}
            >
              {/* Agent Status Indicator */}
              <div className="absolute top-4 right-4">
                <div className={`w-4 h-4 rounded-full bg-green-400 animate-pulse`}></div>
              </div>

              {/* Circular Avatar with Real Photos */}
              <div className="relative mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`
                    w-32 h-32 mx-auto rounded-full border-4 ${pet.borderColor}
                    shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden
                    bg-gradient-to-r ${pet.bgGradient}
                  `}
                  style={{
                    boxShadow: `0 0 50px rgba(${pet.color === 'cyan' ? '6, 182, 212' : pet.color === 'green' ? '34, 197, 94' : '236, 72, 153'}, 0.3)`
                  }}
                >
                  {/* High-Quality Circular Wonder Pets Photos */}
                  <div className="w-full h-full flex items-center justify-center">
                    {pet.id === 'linny' && (
                      <img 
                        src="/attached_assets/linny.jpg" 
                        alt="Linny the Guinea Pig"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                    {pet.id === 'tuck' && (
                      <img 
                        src="/attached_assets/tuck.jpeg" 
                        alt="Tuck the Turtle"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                    {pet.id === 'mingming' && (
                      <img 
                        src="/attached_assets/mingming.jpeg" 
                        alt="Ming-Ming the Duckling"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
                
                {/* Rotating Ring */}
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-dashed ${pet.borderColor} opacity-50`}
                />
                
                {/* Floating Particles */}
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-${pet.color}-400 opacity-60`}
                />
                <motion.div
                  animate={{ 
                    y: [5, -5, 5],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className={`absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-${pet.color}-300 opacity-40`}
                />
              </div>

              {/* Agent Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pet.name}</h3>
                <p className="text-lg font-semibold text-gray-300 mb-2">{pet.title}</p>
                <p className="text-sm text-gray-400 mb-4">{pet.specialization}</p>
                
                {/* Mission Status */}
                <div className="bg-black/30 rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-400 mb-1">Current Mission</div>
                  <div className="text-sm text-white">{pet.currentMission}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-cyan-400">{pet.stats.missions}</div>
                  <div className="text-xs text-gray-400">Missions</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-400">{pet.stats.successRate}%</div>
                  <div className="text-xs text-gray-400">Success</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-purple-400">{pet.stats.expertise}%</div>
                  <div className="text-xs text-gray-400">Expertise</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-yellow-400">{pet.stats.innovation}%</div>
                  <div className="text-xs text-gray-400">Innovation</div>
                </div>
              </div>

              {/* Action Button */}
              <button className={`
                w-full bg-gradient-to-r ${pet.bgGradient} text-white py-3 rounded-lg 
                font-semibold hover:shadow-lg transition-all duration-300 
                flex items-center justify-center space-x-2
              `}>
                <span>View Full Profile</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Detailed Agent Modal */}
        <AnimatePresence>
          {selectedPet && selectedPetData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-6"
              onClick={() => setSelectedPet(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <div className={`
                      w-20 h-20 rounded-full bg-gradient-to-r ${selectedPetData.bgGradient} 
                      flex items-center justify-center text-4xl border-2 ${selectedPetData.borderColor}
                    `}>
                      {selectedPetData.avatar}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedPetData.name}</h2>
                      <p className="text-lg text-gray-300">{selectedPetData.title}</p>
                      <p className="text-sm text-gray-400">{selectedPetData.specialization}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPet(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {selectedPetData.performance.map((metric, index) => (
                    <div key={index} className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">{metric.label}</span>
                        <span className="text-sm">{getTrendIcon(metric.trend)}</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{metric.value}%</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${selectedPetData.bgGradient}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Capabilities & Achievements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Core Capabilities</h3>
                    <div className="space-y-2">
                      {selectedPetData.capabilities.map((capability, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 bg-black/30 rounded-lg p-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedPetData.bgGradient}`} />
                          <span className="text-gray-300">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Major Achievements</h3>
                    <div className="space-y-3">
                      {selectedPetData.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 bg-black/30 rounded-lg p-3"
                        >
                          <Award size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}