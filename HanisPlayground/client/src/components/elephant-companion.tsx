import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Zap } from 'lucide-react';

interface ElephantState {
  isVisible: boolean;
  position: { x: number; y: number };
  emotion: 'happy' | 'sad' | 'angry' | 'playing';
  size: number;
  punishment: boolean;
  punishmentLevel: number;
}

export default function ElephantCompanion() {
  const [elephants, setElephants] = useState<ElephantState[]>([]);
  const [mouseIdleTime, setMouseIdleTime] = useState(0);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const mouseIdleTimerRef = useRef<NodeJS.Timeout>();
  const elephantUpdateTimerRef = useRef<NodeJS.Timeout>();
  const punishmentTimerRef = useRef<NodeJS.Timeout>();

  // Mouse tracking with precise timing
  useEffect(() => {
    let idleCounter = 0;

    const handleMouseMove = () => {
      setIsMouseActive(true);
      idleCounter = 0;
      setMouseIdleTime(0);

      // Clear existing timers
      if (mouseIdleTimerRef.current) {
        clearInterval(mouseIdleTimerRef.current);
      }

      // Start new idle counter
      mouseIdleTimerRef.current = setInterval(() => {
        idleCounter += 1;
        setMouseIdleTime(idleCounter);
        
        if (idleCounter >= 3) {
          setIsMouseActive(false);
        }
      }, 1000);
    };

    const handleClick = () => {
      // Reset punishment if user interacts
      setElephants(prev => prev.map(elephant => ({
        ...elephant,
        punishment: false,
        punishmentLevel: 0,
        emotion: 'happy'
      })));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Initialize idle timer
    handleMouseMove();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (mouseIdleTimerRef.current) {
        clearInterval(mouseIdleTimerRef.current);
      }
    };
  }, []);

  // Elephant spawning logic
  useEffect(() => {
    if (!isMouseActive && mouseIdleTime >= 3) {
      const elephantCount = Math.floor(mouseIdleTime / 3);
      const maxElephants = Math.min(elephantCount, 5); // Limit to 5 elephants

      setElephants(prev => {
        const newElephants = [...prev];
        
        // Add new elephants every 3 seconds
        for (let i = prev.length; i < maxElephants; i++) {
          const newElephant: ElephantState = {
            isVisible: true,
            position: {
              x: Math.random() * (window.innerWidth - 200) + 100,
              y: Math.random() * (window.innerHeight - 200) + 100
            },
            emotion: 'happy',
            size: 40 + Math.random() * 20,
            punishment: false,
            punishmentLevel: 0
          };
          newElephants.push(newElephant);
        }

        return newElephants;
      });
    }
  }, [isMouseActive, mouseIdleTime]);

  // Handle mouse becoming active - trigger punishment
  useEffect(() => {
    if (isMouseActive && elephants.length > 0) {
      // Start punishment timer
      punishmentTimerRef.current = setTimeout(() => {
        setElephants(prev => prev.map(elephant => ({
          ...elephant,
          punishment: true,
          punishmentLevel: 1,
          emotion: 'sad'
        })));

        // Escalate punishment after 3 more seconds
        setTimeout(() => {
          setElephants(prev => prev.map(elephant => 
            elephant.punishment ? ({
              ...elephant,
              punishmentLevel: 2,
              emotion: 'angry'
            }) : elephant
          ));
        }, 3000);

        // Final escalation - elephants become very upset
        setTimeout(() => {
          setElephants(prev => prev.map(elephant => 
            elephant.punishment ? ({
              ...elephant,
              punishmentLevel: 3,
              emotion: 'angry',
              size: elephant.size * 1.5
            }) : elephant
          ));
        }, 6000);

      }, 1000); // Wait 1 second before starting punishment
    }

    return () => {
      if (punishmentTimerRef.current) {
        clearTimeout(punishmentTimerRef.current);
      }
    };
  }, [isMouseActive, elephants.length]);

  // Elephant behavior updates
  useEffect(() => {
    elephantUpdateTimerRef.current = setInterval(() => {
      setElephants(prev => prev.map(elephant => {
        if (!elephant.isVisible) return elephant;

        // Random movement
        const newPosition = {
          x: Math.max(50, Math.min(window.innerWidth - 100, 
            elephant.position.x + (Math.random() - 0.5) * 100)),
          y: Math.max(50, Math.min(window.innerHeight - 100, 
            elephant.position.y + (Math.random() - 0.5) * 100))
        };

        return {
          ...elephant,
          position: newPosition
        };
      }));
    }, 2000);

    return () => {
      if (elephantUpdateTimerRef.current) {
        clearInterval(elephantUpdateTimerRef.current);
      }
    };
  }, []);

  const getElephantEmoji = (emotion: string, punishmentLevel: number) => {
    if (punishmentLevel >= 3) return '😡🐘';
    if (punishmentLevel >= 2) return '😢🐘';
    if (punishmentLevel >= 1) return '😔🐘';
    
    switch (emotion) {
      case 'happy': return '😊🐘';
      case 'playing': return '🎮🐘';
      case 'sad': return '😢🐘';
      case 'angry': return '😠🐘';
      default: return '🐘';
    }
  };

  const getPunishmentMessage = (level: number) => {
    switch (level) {
      case 1: return "Why did you leave us? 😢";
      case 2: return "We're getting upset! Come back! 😠";
      case 3: return "PUNISHMENT MODE: We won't leave until you play! 😡";
      default: return "Hello! We're here to play! 🎮";
    }
  };

  return (
    <AnimatePresence>
      {elephants.map((elephant, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            x: elephant.position.x,
            y: elephant.position.y
          }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            bounce: 0.5, 
            duration: 0.8,
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 }
          }}
          className="fixed z-50 pointer-events-none"
          style={{
            fontSize: `${elephant.size}px`,
            filter: elephant.punishment ? 'brightness(0.7) contrast(1.2)' : 'none'
          }}
        >
          <motion.div
            animate={{
              scale: elephant.punishment ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: elephant.punishment ? [-5, 5, -5, 5, 0] : 0
            }}
            transition={{
              duration: elephant.punishment ? 0.5 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative cursor-pointer pointer-events-auto group"
            onClick={() => {
              // Reset this elephant's punishment
              setElephants(prev => prev.map((el, i) => 
                i === index ? {
                  ...el,
                  punishment: false,
                  punishmentLevel: 0,
                  emotion: 'playing'
                } : el
              ));
            }}
          >
            {/* Elephant */}
            <div className="text-center">
              {getElephantEmoji(elephant.emotion, elephant.punishmentLevel)}
            </div>

            {/* Effects based on state */}
            {elephant.punishment && (
              <>
                {/* Angry particles */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                >
                  {elephant.punishmentLevel >= 2 && (
                    <div className="flex space-x-1">
                      <Zap className="w-4 h-4 text-red-500" />
                      <Zap className="w-4 h-4 text-orange-500" />
                    </div>
                  )}
                </motion.div>

                {/* Punishment message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-red-900/90 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-red-500"
                >
                  {getPunishmentMessage(elephant.punishmentLevel)}
                </motion.div>
              </>
            )}

            {/* Happy effects */}
            {!elephant.punishment && elephant.emotion === 'happy' && (
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-2"
              >
                <Star className="w-3 h-3 text-yellow-400" />
              </motion.div>
            )}

            {/* Playing effects */}
            {elephant.emotion === 'playing' && (
              <motion.div
                animate={{ 
                  y: [-2, 2, -2],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <Heart className="w-4 h-4 text-pink-400" />
              </motion.div>
            )}

            {/* Hover tooltip */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {elephant.punishment 
                ? "Click me to forgive!" 
                : "Baby Elephant - Click to play!"
              }
            </div>
          </motion.div>

          {/* Wandering trail effect */}
          <motion.div
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20"
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}