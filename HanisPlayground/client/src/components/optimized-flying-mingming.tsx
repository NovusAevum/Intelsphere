import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MousePosition {
  x: number;
  y: number;
}

interface MingMingState {
  isFollowing: boolean;
  position: MousePosition;
  targetPosition: MousePosition;
  lastActiveTime: number;
  animationPhase: 'idle' | 'waking' | 'following' | 'sleeping';
  energy: number;
}

export default function OptimizedFlyingMingMing() {
  const [mingMingState, setMingMingState] = useState<MingMingState>({
    isFollowing: false,
    position: { x: window.innerWidth - 200, y: window.innerHeight - 200 },
    targetPosition: { x: window.innerWidth - 200, y: window.innerHeight - 200 },
    lastActiveTime: Date.now(),
    animationPhase: 'idle',
    energy: 100
  });

  const mousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const inactivityTimerRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(Date.now());

  // High-performance mouse tracking with throttling
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateTimeRef.current > 16) { // 60fps throttle
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      lastUpdateTimeRef.current = now;
      
      setMingMingState(prev => ({
        ...prev,
        lastActiveTime: now
      }));
    }
  }, []);

  // Smooth interpolation for natural movement
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // Advanced physics simulation for Ming Ming movement
  const updateMingMingPosition = useCallback(() => {
    setMingMingState(prev => {
      const now = Date.now();
      const timeSinceLastActive = now - prev.lastActiveTime;
      const deltaTime = (now - lastUpdateTimeRef.current) / 1000;
      
      let newState = { ...prev };

      // State machine for Ming Ming behavior
      if (timeSinceLastActive > 3000) { // 3 seconds of inactivity
        if (prev.animationPhase !== 'following' && prev.animationPhase !== 'waking') {
          newState.animationPhase = 'waking';
          newState.isFollowing = true;
        }
      } else {
        if (prev.animationPhase === 'following') {
          newState.animationPhase = 'sleeping';
          newState.isFollowing = false;
        }
      }

      // Update target position when following
      if (newState.isFollowing) {
        const mouseDistance = Math.sqrt(
          Math.pow(mousePositionRef.current.x - prev.position.x, 2) +
          Math.pow(mousePositionRef.current.y - prev.position.y, 2)
        );

        // Only follow if mouse is far enough away to avoid jittering
        if (mouseDistance > 50) {
          newState.targetPosition = {
            x: mousePositionRef.current.x + Math.sin(now * 0.003) * 30,
            y: mousePositionRef.current.y + Math.cos(now * 0.003) * 30
          };
        }
      } else {
        // Return to corner when not following
        newState.targetPosition = {
          x: window.innerWidth - 200,
          y: window.innerHeight - 200
        };
      }

      // Smooth position interpolation with physics
      const speed = newState.isFollowing ? 0.08 : 0.04;
      const easingFactor = 1 - Math.exp(-speed * deltaTime * 60);
      
      newState.position = {
        x: lerp(prev.position.x, newState.targetPosition.x, easingFactor),
        y: lerp(prev.position.y, newState.targetPosition.y, easingFactor)
      };

      // Energy system for realistic behavior
      if (newState.isFollowing) {
        newState.energy = Math.max(newState.energy - deltaTime * 2, 20);
      } else {
        newState.energy = Math.min(newState.energy + deltaTime * 5, 100);
      }

      return newState;
    });

    animationFrameRef.current = requestAnimationFrame(updateMingMingPosition);
  }, []);

  useEffect(() => {
    // Passive event listeners for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    // Start animation loop
    updateMingMingPosition();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [updateMousePosition, updateMingMingPosition]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mingMingState.isFollowing) {
        setMingMingState(prev => ({
          ...prev,
          targetPosition: {
            x: window.innerWidth - 200,
            y: window.innerHeight - 200
          }
        }));
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [mingMingState.isFollowing]);

  const getAnimationVariants = () => {
    const baseY = mingMingState.position.y;
    const energyScale = mingMingState.energy / 100;
    
    return {
      idle: {
        y: baseY + Math.sin(Date.now() * 0.002) * 10,
        rotate: Math.sin(Date.now() * 0.001) * 5,
        scale: 0.9 + Math.sin(Date.now() * 0.003) * 0.1,
      },
      following: {
        y: baseY + Math.sin(Date.now() * 0.005) * 15 * energyScale,
        rotate: Math.sin(Date.now() * 0.004) * 10,
        scale: 1 + Math.sin(Date.now() * 0.006) * 0.2 * energyScale,
      },
      waking: {
        y: baseY - 20,
        rotate: [0, -10, 10, -5, 5, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      },
      sleeping: {
        y: baseY + Math.sin(Date.now() * 0.001) * 5,
        rotate: Math.sin(Date.now() * 0.0005) * 2,
        scale: 0.8 + Math.sin(Date.now() * 0.002) * 0.05,
      }
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          left: mingMingState.position.x,
          top: mingMingState.position.y,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...getAnimationVariants()[mingMingState.animationPhase]
        }}
        transition={{
          type: "spring",
          stiffness: mingMingState.isFollowing ? 300 : 150,
          damping: mingMingState.isFollowing ? 25 : 35,
          mass: 1
        }}
      >
        {/* Ming Ming Character */}
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, rgba(255, 200, 100, ${mingMingState.energy / 200}) 0%, transparent 70%)`
            }}
            animate={{
              scale: mingMingState.isFollowing ? [1, 1.3, 1] : [1, 1.1, 1]
            }}
            transition={{
              duration: mingMingState.isFollowing ? 0.8 : 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main character container */}
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl relative"
            animate={{
              borderColor: mingMingState.isFollowing 
                ? ["#facc15", "#f59e0b", "#d97706", "#f59e0b", "#facc15"]
                : ["#facc15", "#fbbf24", "#facc15"],
              boxShadow: mingMingState.isFollowing
                ? ["0 0 20px rgba(245, 158, 11, 0.5)", "0 0 40px rgba(245, 158, 11, 0.8)", "0 0 20px rgba(245, 158, 11, 0.5)"]
                : ["0 0 10px rgba(250, 204, 21, 0.3)", "0 0 20px rgba(250, 204, 21, 0.5)", "0 0 10px rgba(250, 204, 21, 0.3)"]
            }}
            transition={{
              duration: mingMingState.isFollowing ? 0.6 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/attached_assets/mingming.jpeg" 
              alt="Ming Ming"
              className="w-full h-full object-cover"
              style={{ imageRendering: 'crisp-edges' }}
            />

            {/* Energy indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-yellow-400"
              style={{
                width: `${mingMingState.energy}%`,
                opacity: mingMingState.isFollowing ? 0.8 : 0.3
              }}
              animate={{
                opacity: mingMingState.isFollowing ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Wing flapping effect */}
          <AnimatePresence>
            {mingMingState.isFollowing && (
              <>
                <motion.div
                  className="absolute -left-2 top-1/2 w-8 h-12 bg-gradient-to-r from-yellow-200/60 to-transparent rounded-full"
                  style={{ transformOrigin: 'right center' }}
                  animate={{
                    rotateY: [0, -30, 0, 30, 0],
                    opacity: [0.6, 0.9, 0.6, 0.9, 0.6]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                />
                
                <motion.div
                  className="absolute -right-2 top-1/2 w-8 h-12 bg-gradient-to-l from-yellow-200/60 to-transparent rounded-full"
                  style={{ transformOrigin: 'left center' }}
                  animate={{
                    rotateY: [0, 30, 0, -30, 0],
                    opacity: [0.6, 0.9, 0.6, 0.9, 0.6]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Status indicator */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: mingMingState.animationPhase === 'waking' ? 1 : 0,
              y: mingMingState.animationPhase === 'waking' ? 0 : -10
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap">
              Following Mouse!
            </div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400 mx-auto"></div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}