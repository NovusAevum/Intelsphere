import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpyModeContextType {
  isSpyMode: boolean;
  toggleSpyMode: () => void;
  activateSpyMode: () => void;
  deactivateSpyMode: () => void;
}

const SpyModeContext = createContext<SpyModeContextType | undefined>(undefined);

export const useSpyMode = () => {
  const context = useContext(SpyModeContext);
  if (!context) {
    throw new Error('useSpyMode must be used within a SpyModeProvider');
  }
  return context;
};

interface SpyModeProviderProps {
  children: React.ReactNode;
}

export function SpyModeProvider({ children }: SpyModeProviderProps) {
  const [isSpyMode, setIsSpyMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleSpyMode = async () => {
    setIsTransitioning(true);
    
    // Cinematic transition delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSpyMode(!isSpyMode);
    setIsTransitioning(false);
  };

  const activateSpyMode = async () => {
    if (!isSpyMode) {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSpyMode(true);
      setIsTransitioning(false);
    }
  };

  const deactivateSpyMode = async () => {
    if (isSpyMode) {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSpyMode(false);
      setIsTransitioning(false);
    }
  };

  // Apply spy mode styles to document
  useEffect(() => {
    if (isSpyMode) {
      document.documentElement.style.setProperty('--spy-mode-active', '1');
      document.body.classList.add('spy-mode');
    } else {
      document.documentElement.style.setProperty('--spy-mode-active', '0');
      document.body.classList.remove('spy-mode');
    }
  }, [isSpyMode]);

  return (
    <SpyModeContext.Provider value={{
      isSpyMode,
      toggleSpyMode,
      activateSpyMode,
      deactivateSpyMode
    }}>
      <div className={`spy-mode-container ${isSpyMode ? 'spy-active' : ''}`}>
        {/* Cinematic Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] pointer-events-none"
            >
              {/* Matrix-style digital rain effect */}
              <div className="absolute inset-0 bg-black">
                <div className="matrix-rain">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="matrix-column"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                      }}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: '100vh', opacity: [0, 1, 0] }}
                      transition={{ duration: 2 + Math.random() * 3, ease: 'linear' }}
                    >
                      {Array.from({ length: 20 }).map((_, j) => (
                        <span key={j} className="matrix-char">
                          {String.fromCharCode(0x30A0 + Math.random() * 96)}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scanning lines effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
                animate={{
                  y: ['-100%', '100%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  ease: 'linear',
                  repeat: 1
                }}
                style={{ height: '10%' }}
              />

              {/* Central activation message */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-4xl font-bold text-green-400 mb-4 font-mono"
                    animate={{
                      textShadow: [
                        '0 0 5px #00ff00',
                        '0 0 20px #00ff00',
                        '0 0 5px #00ff00'
                      ]
                    }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  >
                    {isSpyMode ? 'EXITING SPY MODE' : 'ENTERING SPY MODE'}
                  </motion.div>
                  <motion.div
                    className="text-green-400 font-mono text-sm"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.3, repeat: 5 }}
                  >
                    CLASSIFIED SYSTEMS LOADING...
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spy Mode Background Effects */}
        {isSpyMode && (
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Animated background grid */}
            <div className="spy-grid absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ff00" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Floating data particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                  animate={{
                    x: [
                      Math.random() * window.innerWidth,
                      Math.random() * window.innerWidth,
                      Math.random() * window.innerWidth
                    ],
                    y: [
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight
                    ],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 20,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}
            </div>

            {/* Periodic scanning effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 5
              }}
              style={{ width: '20%' }}
            />
          </div>
        )}

        {children}
      </div>


    </SpyModeContext.Provider>
  );
}