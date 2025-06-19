import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Wifi, Activity, Shield, Zap, Brain, Target, Globe } from 'lucide-react';

interface AdvancedHeroProps {
  onSectionChange: (section: string) => void;
}

export default function AdvancedHero({ onSectionChange }: AdvancedHeroProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [activeMetric, setActiveMetric] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Glitch effect animation
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Metrics rotation
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(metricsInterval);
  }, []);

  const metrics = [
    { icon: Shield, label: "OSINT EXPERT", value: "100%", color: "text-blue-400" },
    { icon: Brain, label: "AI SPECIALIST", value: "100%", color: "text-purple-400" },
    { icon: Target, label: "DIGITAL MARKETING", value: "100%", color: "text-green-400" },
    { icon: Zap, label: "INNOVATION STRATEGY", value: "100%", color: "text-yellow-400" }
  ];

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const { time, date } = formatTime(currentTime);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Status Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-24 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-cyan-500/30"
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Status Indicators */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-white font-bold">Hanis</span>
                <span className="text-green-400 text-sm font-medium">ONLINE</span>
              </div>
              
              <div className="flex items-center space-x-2 text-cyan-400">
                <Wifi size={16} />
                <span className="text-sm">SECURE CONNECTION</span>
              </div>
              
              <div className="flex items-center space-x-2 text-purple-400">
                <Activity size={16} />
                <span className="text-sm">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            {/* Real-time Clock */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-cyan-400 font-mono text-lg font-bold">{time}</div>
                <div className="text-gray-400 text-xs">{date}</div>
              </div>
              <Clock className="text-cyan-400" size={20} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Content */}
      <div className="text-center z-20 pt-20">
        {/* Animated Profile */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
          className="w-48 h-48 mx-auto mb-8 relative"
        >
          <div className="w-full h-full rounded-full border-4 border-cyan-400 shadow-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-lg">
            <img 
              src="/attached_assets/hanis-profile.jpeg" 
              alt="Hanis - Strategic Intelligence Architect"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          {/* Rotating Border */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-cyan-400/30"
          />
          
          {/* Pulse Ring */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-full h-full rounded-full border-2 border-cyan-400/50"
          />
        </motion.div>

        {/* Glitch Effect Title */}
        <motion.div
          className="inline-block mb-8"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(147, 51, 234, 0.5)',
              '0 0 20px rgba(59, 130, 246, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span 
            className={`text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent ${
              glitchEffect ? 'animate-pulse filter blur-sm' : ''
            }`}
          >
            HANIS WONDER PETS
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            DIGITAL UNIVERSE
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          Where Wonder Pets AI meets Advanced Intelligence
        </motion.p>

        {/* Animated Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 text-lg mb-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={`flex items-center space-x-2 ${
                activeMetric === index ? metric.color : 'text-gray-400'
              } transition-colors duration-500`}
              animate={activeMetric === index ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <metric.icon size={20} />
              <span className="font-semibold">{metric.label}</span>
              <span className="text-white">•</span>
              <span className="font-bold">{metric.value}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-gray-400 mb-8 max-w-4xl mx-auto"
        >
          Revolutionary intelligence solutions • Next-generation security frameworks • Pioneering technologies
        </motion.p>

        {/* Certifications Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-yellow-500/30 mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="text-yellow-400" size={24} />
          </motion.div>
          <span className="text-yellow-400 font-bold text-lg">
            100+ Global Certifications
          </span>
          <div className="flex space-x-2">
            <span className="bg-blue-500/30 text-blue-300 px-2 py-1 rounded text-sm">AI/ML</span>
            <span className="bg-green-500/30 text-green-300 px-2 py-1 rounded text-sm">OSINT</span>
            <span className="bg-red-500/30 text-red-300 px-2 py-1 rounded text-sm">Cybersecurity</span>
            <span className="bg-purple-500/30 text-purple-300 px-2 py-1 rounded text-sm">Quantum</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSectionChange('performance-marketing')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
          >
            ACTIVATE COMMAND CENTER
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSectionChange('resume')}
            className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-400 hover:text-black transition-all"
          >
            VIEW CREDENTIALS
          </motion.button>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}