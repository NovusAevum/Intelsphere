import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Satellite, Brain, MapPin, Heart, Search, Zap, Globe, Volume2, Play, Pause } from 'lucide-react';

interface ElephantRescueStoryProps {
  isActive: boolean;
  onComplete?: () => void;
}

const storySequence = [
  {
    id: 1,
    title: "EMERGENCY CALL RECEIVED",
    description: "A mother elephant has lost her babies in the vast savanna!",
    characters: ['🐹', '🐢', '🐥'],
    dialogue: "What's gonna work? TEAMWORK!",
    action: "rescue-call",
    duration: 3000
  },
  {
    id: 2,
    title: "ACTIVATING AI INTELLIGENCE",
    description: "Wonder Pets deploy advanced neural networks and satellite imagery",
    characters: ['🐹'],
    dialogue: "Linny: Activating OSINT protocols!",
    action: "ai-scan",
    duration: 4000
  },
  {
    id: 3,
    title: "SATELLITE RECONNAISSANCE",
    description: "Scanning African savanna using real-time satellite feeds",
    characters: ['🐢'],
    dialogue: "Tuck: This is sewious! Scanning 10,000 square kilometers!",
    action: "satellite-scan",
    duration: 3500
  },
  {
    id: 4,
    title: "PATTERN RECOGNITION",
    description: "AI detects small heat signatures moving in formation",
    characters: ['🐥'],
    dialogue: "Ming-Ming: Found them! Baby elephants detected!",
    action: "detection",
    duration: 3000
  },
  {
    id: 5,
    title: "MISSION SUCCESS",
    description: "Baby elephants safely returned to mama elephant!",
    characters: ['🐹', '🐢', '🐥', '🐘', '🐘', '🐘'],
    dialogue: "ALL: Hip Hip Hooray! The family is reunited!",
    action: "celebration",
    duration: 5000
  }
];

export default function ElephantRescueStory({ isActive, onComplete }: ElephantRescueStoryProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (isActive) {
      startStory();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

  const startStory = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    performNextStep(0);
  };

  const performNextStep = (stepIndex: number) => {
    if (stepIndex >= storySequence.length) {
      setShowCelebration(true);
      playVictoryMusic();
      setTimeout(() => {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }, 3000);
      return;
    }

    setCurrentStep(stepIndex);
    const step = storySequence[stepIndex];

    timeoutRef.current = setTimeout(() => {
      performNextStep(stepIndex + 1);
    }, step.duration);
  };

  const playVictoryMusic = () => {
    setMusicPlaying(true);
    // Creating a simple celebratory audio context
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Play a sequence of happy notes
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (major chord)
      
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 200);
      });
    }
  };

  const currentStoryStep = storySequence[currentStep];

  const renderAction = () => {
    if (!currentStoryStep) return null;

    switch (currentStoryStep.action) {
      case 'rescue-call':
        return (
          <div className="relative">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              📞
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 text-red-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🚨
            </motion.div>
          </div>
        );

      case 'ai-scan':
        return (
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full border-4 border-cyan-400 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
                <Brain className="w-16 h-16 text-cyan-400" />
              </div>
            </motion.div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 bg-cyan-400/30 rounded"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        );

      case 'satellite-scan':
        return (
          <div className="relative">
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🛰️
            </motion.div>
            <div className="relative w-48 h-48 mx-auto border-2 border-green-400 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-900 to-yellow-800"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, #228B22 20%, transparent 20%),
                                  radial-gradient(circle at 70% 60%, #228B22 15%, transparent 15%),
                                  radial-gradient(circle at 50% 80%, #228B22 10%, transparent 10%)`
                }}
              />
              <motion.div
                className="absolute w-full h-0.5 bg-green-400 opacity-70"
                animate={{ y: [0, 192, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="mt-2 text-green-400 font-mono text-xs">
              SCANNING... {Math.floor(Math.random() * 100)}% COMPLETE
            </div>
          </div>
        );

      case 'detection':
        return (
          <div className="relative">
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🎯
            </motion.div>
            <div className="relative w-48 h-48 mx-auto">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                  style={{
                    left: `${30 + i * 30}%`,
                    top: `${40 + i * 20}%`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  🐘
                </motion.div>
              ))}
            </div>
            <div className="mt-2 text-red-400 font-mono text-xs">
              TARGET ACQUIRED • COORDINATES LOCKED
            </div>
          </div>
        );

      case 'celebration':
        return (
          <div className="relative">
            <motion.div
              className="flex justify-center space-x-4 mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-4xl">🐘</span>
              <span className="text-2xl">🐘</span>
              <span className="text-2xl">🐘</span>
              <span className="text-2xl">🐘</span>
            </motion.div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {['🎉', '🎊', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        
        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            WONDER PETS RESCUE MISSION
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            {currentStoryStep?.characters.slice(0, 3).map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Current Step Display */}
        <AnimatePresence mode="wait">
          {currentStoryStep && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                {currentStoryStep.title}
              </h2>
              
              <div className="mb-6">
                {renderAction()}
              </div>
              
              <p className="text-lg text-white mb-4">
                {currentStoryStep.description}
              </p>
              
              <motion.div
                className="bg-yellow-400/20 rounded-2xl p-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-yellow-200 font-bold">
                  {currentStoryStep.dialogue}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-6">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-pink-400 h-3 rounded-full"
            animate={{ width: `${(currentStep / storySequence.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Music Status */}
        {musicPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-yellow-400"
          >
            <Volume2 className="w-6 h-6" />
            <span>🎵 Playing Victory Song! 🎵</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🎼
            </motion.div>
          </motion.div>
        )}

        {/* Final Celebration */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400/20 to-pink-400/20 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-4"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🏆
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">
                MISSION ACCOMPLISHED!
              </h2>
              <p className="text-xl text-yellow-200">
                The elephant family is reunited thanks to AI-powered OSINT!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}