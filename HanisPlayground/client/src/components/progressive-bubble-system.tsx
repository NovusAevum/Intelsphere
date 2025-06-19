import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Star, Zap, Sparkles, Coffee, Music, Camera, 
  Gamepad2, Book, Palette, Rocket, Gift, Crown, Diamond
} from 'lucide-react';

interface BubbleIcon {
  id: string;
  x: number;
  y: number;
  icon: any;
  color: string;
  size: number;
  animation: 'float' | 'pulse' | 'spin' | 'bounce';
  spawnTime: number;
  type: 'fun' | 'creative' | 'gaming' | 'mystical';
}

interface BubbleSystemState {
  bubbles: BubbleIcon[];
  idleTime: number;
  isMouseActive: boolean;
  mingMingOffering: boolean;
}

export default function ProgressiveBubbleSystem() {
  const [state, setState] = useState<BubbleSystemState>({
    bubbles: [],
    idleTime: 0,
    isMouseActive: false,
    mingMingOffering: false
  });

  const idleTimerRef = useRef<NodeJS.Timeout>();
  const bubbleSpawnTimerRef = useRef<NodeJS.Timeout>();
  const mingMingOfferTimerRef = useRef<NodeJS.Timeout>();
  const clearAllTimerRef = useRef<NodeJS.Timeout>();

  const bubbleIcons = [
    { icon: Heart, color: '#ff69b4', type: 'fun' },
    { icon: Star, color: '#ffd700', type: 'mystical' },
    { icon: Zap, color: '#00f5ff', type: 'gaming' },
    { icon: Sparkles, color: '#9966ff', type: 'mystical' },
    { icon: Coffee, color: '#8b4513', type: 'fun' },
    { icon: Music, color: '#ff6347', type: 'creative' },
    { icon: Camera, color: '#32cd32', type: 'creative' },
    { icon: Gamepad2, color: '#ff4500', type: 'gaming' },
    { icon: Book, color: '#4169e1', type: 'creative' },
    { icon: Palette, color: '#ff1493', type: 'creative' },
    { icon: Rocket, color: '#00ced1', type: 'gaming' },
    { icon: Gift, color: '#ffa500', type: 'fun' },
    { icon: Crown, color: '#gold', type: 'mystical' },
    { icon: Diamond, color: '#e0e0e0', type: 'mystical' }
  ];

  const animations = ['float', 'pulse', 'spin', 'bounce'] as const;

  // Generate random bubble
  const createBubble = (): BubbleIcon => {
    const iconData = bubbleIcons[Math.floor(Math.random() * bubbleIcons.length)];
    const animation = animations[Math.floor(Math.random() * animations.length)];
    
    return {
      id: Date.now() + Math.random().toString(),
      x: Math.random() * (window.innerWidth - 200) + 100,
      y: Math.random() * (window.innerHeight - 200) + 100,
      icon: iconData.icon,
      color: iconData.color,
      size: 30 + Math.random() * 20,
      animation,
      spawnTime: Date.now(),
      type: iconData.type as 'fun' | 'creative' | 'gaming' | 'mystical'
    };
  };

  // Progressive bubble spawning based on idle time
  const calculateBubbleSpawnRate = (idleTime: number): number => {
    if (idleTime < 5) return 0; // No bubbles first 5 seconds
    if (idleTime < 10) return 3000; // Every 3 seconds
    if (idleTime < 20) return 2000; // Every 2 seconds
    if (idleTime < 30) return 1500; // Every 1.5 seconds
    return 1000; // Every 1 second for very long idle periods
  };

  // Mouse activity tracking
  useEffect(() => {
    let idleCounter = 0;

    const handleMouseMove = () => {
      setState(prev => ({ ...prev, isMouseActive: true }));
      idleCounter = 0;

      // Clear all timers
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      if (bubbleSpawnTimerRef.current) clearTimeout(bubbleSpawnTimerRef.current);
      if (mingMingOfferTimerRef.current) clearTimeout(mingMingOfferTimerRef.current);
      if (clearAllTimerRef.current) clearTimeout(clearAllTimerRef.current);

      // Trigger Ming Ming offering chat for 1 second
      setState(prev => ({ ...prev, mingMingOffering: true }));
      mingMingOfferTimerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, mingMingOffering: false }));
        
        // If user doesn't interact, clear all bubbles after 1 second
        clearAllTimerRef.current = setTimeout(() => {
          setState(prev => ({ ...prev, bubbles: [], isMouseActive: false }));
        }, 1000);
      }, 1000);

      // Restart idle timer
      idleTimerRef.current = setInterval(() => {
        idleCounter += 1;
        setState(prev => ({ ...prev, idleTime: idleCounter, isMouseActive: false }));
      }, 1000);
    };

    const handleClick = () => {
      // Cancel bubble clearing if user interacts
      if (clearAllTimerRef.current) {
        clearTimeout(clearAllTimerRef.current);
      }
      setState(prev => ({ ...prev, mingMingOffering: false }));
    };

    // Initialize
    handleMouseMove();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      if (bubbleSpawnTimerRef.current) clearTimeout(bubbleSpawnTimerRef.current);
      if (mingMingOfferTimerRef.current) clearTimeout(mingMingOfferTimerRef.current);
      if (clearAllTimerRef.current) clearTimeout(clearAllTimerRef.current);
    };
  }, []);

  // Bubble spawning logic
  useEffect(() => {
    if (!state.isMouseActive && state.idleTime >= 5) {
      const spawnRate = calculateBubbleSpawnRate(state.idleTime);
      
      bubbleSpawnTimerRef.current = setTimeout(() => {
        const maxBubbles = Math.min(Math.floor(state.idleTime / 3), 15); // Max 15 bubbles
        
        if (state.bubbles.length < maxBubbles) {
          const newBubble = createBubble();
          setState(prev => ({
            ...prev,
            bubbles: [...prev.bubbles, newBubble]
          }));
        }
      }, spawnRate);
    }

    return () => {
      if (bubbleSpawnTimerRef.current) {
        clearTimeout(bubbleSpawnTimerRef.current);
      }
    };
  }, [state.idleTime, state.isMouseActive, state.bubbles.length]);

  // Auto-remove old bubbles
  useEffect(() => {
    const cleanupTimer = setInterval(() => {
      const now = Date.now();
      setState(prev => ({
        ...prev,
        bubbles: prev.bubbles.filter(bubble => now - bubble.spawnTime < 30000) // Remove after 30 seconds
      }));
    }, 5000);

    return () => clearInterval(cleanupTimer);
  }, []);

  const getAnimationProps = (animation: string, index: number) => {
    const baseDelay = index * 0.1;
    
    switch (animation) {
      case 'float':
        return {
          animate: { 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          },
          transition: { 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay: baseDelay 
          }
        };
      case 'pulse':
        return {
          animate: { 
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          },
          transition: { 
            duration: 2 + Math.random(), 
            repeat: Infinity, 
            delay: baseDelay 
          }
        };
      case 'spin':
        return {
          animate: { rotate: [0, 360] },
          transition: { 
            duration: 4 + Math.random() * 2, 
            repeat: Infinity, 
            ease: "linear", 
            delay: baseDelay 
          }
        };
      case 'bounce':
        return {
          animate: { 
            y: [0, -30, 0],
            scale: [1, 0.9, 1]
          },
          transition: { 
            duration: 1.5 + Math.random(), 
            repeat: Infinity, 
            type: "spring", 
            delay: baseDelay 
          }
        };
      default:
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration: 2, repeat: Infinity, delay: baseDelay }
        };
    }
  };

  const getBubbleGlow = (type: string): string => {
    switch (type) {
      case 'mystical': return 'drop-shadow-lg filter brightness-110';
      case 'gaming': return 'drop-shadow-md filter contrast-120';
      case 'creative': return 'drop-shadow-sm filter saturate-150';
      default: return 'drop-shadow-md';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Progressive Bubble Icons */}
      <AnimatePresence>
        {state.bubbles.map((bubble, index) => (
          <motion.div
            key={bubble.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              left: bubble.x,
              top: bubble.y,
              position: 'absolute'
            }}
            className="pointer-events-auto cursor-pointer"
            onClick={() => {
              setState(prev => ({
                ...prev,
                bubbles: prev.bubbles.filter(b => b.id !== bubble.id)
              }));
            }}
          >
            <motion.div
              {...getAnimationProps(bubble.animation, index)}
              className={`relative ${getBubbleGlow(bubble.type)}`}
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Bubble Background */}
              <div 
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: `radial-gradient(circle, ${bubble.color}40 0%, ${bubble.color}20 50%, transparent 100%)`,
                  width: bubble.size + 20,
                  height: bubble.size + 20,
                  transform: 'translate(-10px, -10px)'
                }}
              />
              
              {/* Icon */}
              <bubble.icon
                size={bubble.size}
                style={{ color: bubble.color }}
                className="relative z-10"
              />
              
              {/* Sparkle Effect for Mystical Icons */}
              {bubble.type === 'mystical' && (
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-2 -right-2 z-20"
                >
                  <Sparkles size={12} className="text-yellow-300" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ming Ming Chat Offering Indicator */}
      <AnimatePresence>
        {state.mingMingOffering && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-pink-500/90 to-purple-500/90 backdrop-blur-lg border border-pink-300/50 rounded-full px-6 py-3 shadow-2xl">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🐸
                </motion.div>
                <span className="text-white font-semibold">Ming-Ming ready to help!</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💬
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle Time Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 bg-black/70 text-white p-2 rounded text-xs">
          Idle: {state.idleTime}s | Bubbles: {state.bubbles.length} | Active: {state.isMouseActive.toString()}
        </div>
      )}
    </div>
  );
}